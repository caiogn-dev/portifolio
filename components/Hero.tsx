"use client"

import { Box, Container, Heading, Text, Button, Image, VStack, HStack } from "@chakra-ui/react"
import { useColorModeValue } from "@/components/ui/color-mode"
import Link from "next/link"

export default function Hero() {
  const accent = useColorModeValue("blue.600", "blue.300")
  const shadow = useColorModeValue("lg", "dark-lg")

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
            boxSize={{ base: "220px", md: "300px" }}
            mx="auto"
            className="float-down"
            boxShadow={shadow}
          >
            <Image src="/chef.png" alt="avatar" objectFit="cover" width="100%" height="100%" />
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
