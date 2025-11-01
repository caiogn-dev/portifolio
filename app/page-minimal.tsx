'use client'

import { Box, Container, VStack, Text, Heading, Button, HStack } from '@chakra-ui/react'

export default function MinimalPage() {
  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="center" minH="100vh" justify="center">
        <Box textAlign="center">
          <Heading as="h1" size="2xl" mb={4} color="blue.500">
            João Silva
          </Heading>
          <Text fontSize="xl" color="gray.600" mb={6}>
            Full Stack Developer
          </Text>
          <Text fontSize="lg" color="gray.500" maxW="600px" mb={8}>
            Passionate full-stack developer with 5+ years of experience creating scalable web applications and mobile solutions.
          </Text>
          
          <HStack spacing={4} justify="center">
            <Button colorScheme="blue" size="lg">
              View Projects
            </Button>
            <Button variant="outline" colorScheme="blue" size="lg">
              Contact Me
            </Button>
          </HStack>
        </Box>

        <Box mt={16} textAlign="center">
          <Heading as="h2" size="lg" mb={4}>
            Skills
          </Heading>
          <HStack spacing={4} wrap="wrap" justify="center">
            <Text bg="blue.100" px={3} py={1} rounded="full">React</Text>
            <Text bg="green.100" px={3} py={1} rounded="full">Node.js</Text>
            <Text bg="purple.100" px={3} py={1} rounded="full">TypeScript</Text>
            <Text bg="orange.100" px={3} py={1} rounded="full">Next.js</Text>
            <Text bg="pink.100" px={3} py={1} rounded="full">Python</Text>
            <Text bg="cyan.100" px={3} py={1} rounded="full">PostgreSQL</Text>
          </HStack>
        </Box>

        <Box mt={16} textAlign="center">
          <Text color="gray.500">
            © 2024 João Silva. All rights reserved.
          </Text>
        </Box>
      </VStack>
    </Container>
  )
}