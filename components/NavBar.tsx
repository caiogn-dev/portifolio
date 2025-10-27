"use client"

import * as React from "react"
import Link from "next/link"
import { Box, Flex, HStack, Button, VStack, Text, Spacer } from "@chakra-ui/react"
import { ColorModeButton, useColorModeValue } from "@/components/ui/color-mode"

export default function NavBar() {
  const [open, setOpen] = React.useState(false)

  const links = [
    { href: "#projects", label: "Projetos" },
    { href: "#about", label: "Sobre" },
    { href: "#contact", label: "Contato" },
  ]

  const bg = useColorModeValue("rgba(255,255,255,0.55)", "rgba(6,6,8,0.45)")
  const borderColor = useColorModeValue("blackAlpha.100", "whiteAlpha.100")

  return (
    <Box
      as="header"
      w="100%"
      position="sticky"
      top={0}
      zIndex={20}
      bg="transparent"
      style={{ WebkitBackdropFilter: "blur(6px)", backdropFilter: "blur(6px)" }}
    >
      <Flex
        align="center"
        maxW="container.lg"
        mx="auto"
        py={3}
        px={{ base: 6, md: 4 }}
        alignItems="center"
        position="relative"
      >
        {/* Left: logo / name */}
        <Box zIndex={30}>
          <Text fontWeight="700" letterSpacing="tight" fontSize={{ base: "lg", md: "xl" }}>
            Caio
          </Text>
        </Box>

        {/* Center: nav links (desktop) */}
        <Box
          position={{ base: "static", md: "absolute" }}
          left={0}
          right={0}
          mx="auto"
          display={{ base: "none", md: "block" }}
          textAlign="center"
        >
          <HStack gap={6} justify="center">
            {links.map((l) => (
              <Link key={l.href} href={l.href}>
                <Button
                  variant="ghost"
                  size="sm"
                  _hover={{ bg: useColorModeValue("blackAlpha.50", "whiteAlpha.50") }}
                >
                  {l.label}
                </Button>
              </Link>
            ))}
          </HStack>
        </Box>

        {/* Right: actions */}
        <Box marginLeft="auto" zIndex={30}>
          <HStack gap={3} alignItems="center">
            <ColorModeButton />
            <Link href="#contact">
              <Button colorScheme="blue" size="sm">
                Contratar
              </Button>
            </Link>
            {/* Mobile toggle */}
            <Box display={{ base: "block", md: "none" }}>
              <Button variant="ghost" onClick={() => setOpen((s) => !s)}>
                {open ? "Fechar" : "Menu"}
              </Button>
            </Box>
          </HStack>
        </Box>
      </Flex>

      {/* Mobile menu (simple conditional render) */}
      {open && (
        <Box px={4} pb={4}>
          <VStack gap={2} alignItems="stretch">
            {links.map((l) => (
              <Link key={l.href} href={l.href}>
                <Button variant="ghost" justifyContent="flex-start" onClick={() => setOpen(false)}>
                  {l.label}
                </Button>
              </Link>
            ))}
            <Link href="#contact" passHref>
              <Button as="a" colorScheme="blue">
                Contratar
              </Button>
            </Link>
          </VStack>
        </Box>
      )}
    </Box>
  )
}
