"use client"

import * as React from "react"
import Link from "next/link"
import { Box, Flex, HStack, Button, VStack, Text, Spacer } from "@chakra-ui/react"
import { ColorModeButton } from "@/components/ui/color-mode"

export default function NavBar() {
  const [open, setOpen] = React.useState(false)

  const links = [
    { href: "#projects", label: "Projetos" },
    { href: "#about", label: "Sobre" },
    { href: "#contact", label: "Contato" },
  ]

  return (
    <Box as="header" w="100%" position="sticky" top={0} zIndex={2} bg="transparent">
      <Flex
        align="center"
        maxW="container.lg"
        mx="auto"
        py={4}
        px={{ base: 4, md: 0 }}
        alignItems="center"
      >
        <HStack gap={4} alignItems="center">
          <Text fontWeight="bold">Caio</Text>
        </HStack>

        <Spacer />

        {/* Desktop links */}
        <HStack display={{ base: "none", md: "flex" }} gap={6} alignItems="center">
          {links.map((l) => (
            <Link key={l.href} href={l.href} passHref>
              <Button as="a" variant="ghost">
                {l.label}
              </Button>
            </Link>
          ))}
          <ColorModeButton />
          <Link href="#contact" passHref>
            <Button as="a" colorScheme="blue">
              Contratar
            </Button>
          </Link>
        </HStack>

        {/* Mobile toggle */}
        <Box display={{ base: "block", md: "none" }}>
          <Button variant="ghost" onClick={() => setOpen((s) => !s)}>
            {open ? "Fechar" : "Menu"}
          </Button>
        </Box>
      </Flex>

      {/* Mobile menu (simple conditional render) */}
      {open && (
        <Box px={4} pb={4}>
          <VStack gap={2} alignItems="stretch">
            {links.map((l) => (
              <Link key={l.href} href={l.href} passHref>
                <Button as="a" variant="ghost" justifyContent="flex-start">
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
