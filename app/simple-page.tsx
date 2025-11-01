'use client'

import React from 'react'
import { Box, Container, VStack, Text, Button, HStack } from '@chakra-ui/react'
import { motion } from 'framer-motion'

const MotionBox = motion.create(Box)
const MotionText = motion.create(Text)

export default function SimplePage() {
  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="center" minH="100vh" justify="center">
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <VStack spacing={6} textAlign="center">
            <MotionText
              fontSize={{ base: '4xl', md: '6xl' }}
              fontWeight="bold"
              bgGradient="linear(to-r, blue.400, purple.500)"
              bgClip="text"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              João Silva
            </MotionText>
            
            <Text fontSize={{ base: 'xl', md: '2xl' }} color="gray.600">
              Full Stack Developer & UI/UX Designer
            </Text>
            
            <Text fontSize="lg" maxW="600px" color="gray.500">
              Passionate about creating beautiful, functional, and user-centered digital experiences.
              Specialized in React, Next.js, TypeScript, and modern web technologies.
            </Text>
            
            <HStack spacing={4} pt={4}>
              <Button
                size="lg"
                colorScheme="blue"
                variant="solid"
                _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
                transition="all 0.2s"
              >
                View Projects
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                colorScheme="blue"
                _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
                transition="all 0.2s"
              >
                Get in Touch
              </Button>
            </HStack>
          </VStack>
        </MotionBox>
        
        <MotionBox
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          w="full"
          maxW="800px"
        >
          <VStack spacing={6}>
            <Text fontSize="2xl" fontWeight="bold" textAlign="center">
              Skills & Technologies
            </Text>
            
            <HStack spacing={4} wrap="wrap" justify="center">
              {['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL'].map((skill) => (
                <Box
                  key={skill}
                  px={4}
                  py={2}
                  bg="blue.50"
                  color="blue.700"
                  rounded="full"
                  fontSize="sm"
                  fontWeight="medium"
                  _hover={{ bg: 'blue.100', transform: 'scale(1.05)' }}
                  transition="all 0.2s"
                  cursor="pointer"
                >
                  {skill}
                </Box>
              ))}
            </HStack>
          </VStack>
        </MotionBox>
        
        <MotionBox
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          w="full"
          maxW="600px"
          textAlign="center"
        >
          <VStack spacing={4}>
            <Text fontSize="2xl" fontWeight="bold">
              Let's Work Together
            </Text>
            
            <Text color="gray.600">
              I'm always interested in new opportunities and exciting projects.
              Feel free to reach out if you'd like to collaborate!
            </Text>
            
            <Button
              size="lg"
              colorScheme="purple"
              variant="solid"
              _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
              transition="all 0.2s"
            >
              Contact Me
            </Button>
          </VStack>
        </MotionBox>
      </VStack>
    </Container>
  )
}