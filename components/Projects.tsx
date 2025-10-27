"use client"

import { Box, Container, Heading, Text, SimpleGrid, Link as ChakraLink } from "@chakra-ui/react"
import Link from "next/link"

const projects = [
  {
    id: "proj-1",
    title: "Projeto A",
    description: "Uma breve descrição do projeto A. Tecnologia: Next.js, Chakra UI.",
    href: "#",
  },
  {
    id: "proj-2",
    title: "Projeto B",
    description: "Uma breve descrição do projeto B. Foco em performance e acessibilidade.",
    href: "#",
  },
  {
    id: "proj-3",
    title: "Projeto C",
    description: "Protótipo de dashboard com visual rico.",
    href: "#",
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
              <Link href={p.href} passHref>
                <ChakraLink color="blue.500">Ver detalhes →</ChakraLink>
              </Link>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}
