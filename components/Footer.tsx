"use client"

import { Box, Container, HStack, Link as ChakraLink, Text } from "@chakra-ui/react"
import Link from "next/link"

export default function Footer() {
  return (
    <Box as="footer" py={8}>
      <Container maxW="container.lg">
        <Box display="flex" flexDirection={{ base: "column", md: "row" }} justifyContent="space-between" alignItems="center" gap={4}>
          <Box>
            <Text fontSize="sm">© {new Date().getFullYear()} Caio — Todos os direitos reservados</Text>
            <Text fontSize="sm" mt={2}>
              Av. Juscelino Kubitscheck, 39 - Plano Diretor Norte, Palmas - TO, 77006-120
            </Text>
          </Box>

          <Box as="nav" style={{ display: "flex", gap: 12 }}>
            <Link href="#" passHref>
              <ChakraLink>GitHub</ChakraLink>
            </Link>
            <Link href="#" passHref>
              <ChakraLink>LinkedIn</ChakraLink>
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
