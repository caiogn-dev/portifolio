"use client"

import React from "react"
import { Box, Container, Heading, Text, Button, Image, VStack, HStack } from "@chakra-ui/react"
import { useColorModeValue } from "@/components/ui/color-mode"
import Link from "next/link"

export default function Hero() {
  const accent = useColorModeValue("blue.600", "blue.300")
  const shadow = useColorModeValue("lg", "dark-lg")

  const figureRef = React.useRef<HTMLDivElement | null>(null)
  const animRef = React.useRef<Animation | null>(null)

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches

  const playHoverAnimation = React.useCallback(() => {
    if (prefersReduced) return
    const el = figureRef.current
    if (!el || typeof el.animate !== "function") return

    // Cancel any running animation so we can replay cleanly
    if (animRef.current) {
      try {
        animRef.current.cancel()
      } catch (e) {
        /* ignore */
      }
      animRef.current = null
    }

    const keyframes: Keyframe[] = [
      { transform: "translateY(-24px)", opacity: 0 },
      { transform: "translateY(6px)", opacity: 1, offset: 0.65 },
      { transform: "translateY(-6px)", opacity: 1 },
    ]

    const animation = el.animate(keyframes, {
      duration: 1600,
      easing: "cubic-bezier(.16,.84,.33,1)",
      fill: "forwards",
    })

    animRef.current = animation
    animation.onfinish = () => {
      animRef.current = null
    }
  }, [prefersReduced])

  React.useEffect(() => {
    return () => {
      if (animRef.current) {
        try {
          animRef.current.cancel()
        } catch (e) {
          /* ignore */
        }
        animRef.current = null
      }
    }
  }, [])

  // Play the initial float animation on mount (once), unless user prefers reduced motion.
  React.useEffect(() => {
    playHoverAnimation()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box as="section" py={{ base: 12, md: 20 }}>
      <Container maxW="container.md" textAlign="center">
        <VStack gap={6} align="center">
          <Box
            as="figure"
            mb={2}
            borderWidth={3}
            borderColor={accent}
            borderRadius="full"
            overflow="hidden"
            boxSize={{ base: "220px", md: "360px" }}
            mx="auto"
            className="hero-figure"
            tabIndex={0}
            boxShadow={shadow}
            ref={figureRef as any}
            onMouseEnter={playHoverAnimation}
            onTouchStart={playHoverAnimation}
            onKeyDown={(e) => {
              // allow Enter/Space to trigger animation when focused
              if (e.key === "Enter" || e.key === " ") {
                playHoverAnimation()
              }
            }}
          >
            <Image
              src="/profile.png"
              alt="avatar"
              objectFit="cover"
              objectPosition="top center"
              width="100%"
              height="100%"
            />
          </Box>

          <Heading as="h1" size={{ base: "xl", md: "2xl" }} lineHeight="1.05">
            Caio
          </Heading>

          <Text fontWeight="600" color={useColorModeValue("gray.700", "gray.300")}>
            Desenvolvedor Full Stack
          </Text>

          <Text maxW="2xl" color={useColorModeValue("gray.600", "gray.400")}>
            Eu construo aplicações web completas — front-end com React/Next.js e interfaces
            acessíveis, e back-end com Node.js, bancos relacionais, e APIs bem testadas. Trabalho
            com TypeScript, Prisma, PostgreSQL, Chakra UI e práticas de testes e CI/CD.
          </Text>

          <HStack gap={4} mt={2}>
            <Link href="#projects">
              <Button colorScheme="blue">Ver projetos</Button>
            </Link>
            <Link href="#contact">
              <Button variant="ghost">Entrar em contato</Button>
            </Link>
          </HStack>
        </VStack>
      </Container>
    </Box>
  )
}
