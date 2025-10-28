"use client"

import { Box, Container, Heading, Text, SimpleGrid, Link as ChakraLink } from "@chakra-ui/react"
import Link from "next/link"

const projects = [
  {
    id: "proj-1",
    title: "Ivoneth Banqueteria",
    description: "Uma breve descrição do projeto A. Tecnologia: Next.js, Chakra UI.",
    href: "https://ivonethbanqueteria.com.br",
  },
  {
    id: "proj-2",
    title: "Mercado Livre AFL Django",
    description: "Uma breve descrição do projeto B. Foco em performance e acessibilidade.",
    href: "https://github.com/caiogn-dev/mercado-livre-afl-django",
  },
  {
    id: "proj-3",
    title: "Pastita-Land",
    description: "Landing Page moderna para a empresa Pastita, focada em conversão e captura de leads.",
    href: "https://github.com/caiogn-dev/Pastita-Land",
  },
]

export default function Projects() {
  return (
    <Box as="section" id="projects" py={{ base: 12, md: 20 }}>
      <Container maxW="container.lg">
        <Heading as="h2" size="xl" mb={6}>
          Projetos recentes
        </Heading>

        <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
          {projects.map((p) => (
            <Box key={p.id} p={4} borderWidth={1} borderRadius="md">
              <Heading size="md" mb={2}>
                {p.title}
              </Heading>
              <Text mb={4} color="muted">
                {p.description}
              </Text>
              <ChakraLink as={Link} href={p.href} color="blue.500">
                Ver detalhes →
              </ChakraLink>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}
