"use client";

import * as React from "react";
import Link from "next/link";
import {
  Box,
  Flex,
  HStack,
  Button,
  VStack,
  Text,
  IconButton,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { ColorModeButton, useColorModeValue } from "@/components/ui/color-mode";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { motion, Variants } from "framer-motion";

// --- NOSSAS VARIANTES DE ANIMAÇÃO ---

// Orquestra a entrada do "LOGO" e "Links"
const contentVariants: Variants = {
  closed: {
    opacity: 0,
    y: 20,
  },
  open: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
      delay: 0.3, // Atraso para aparecer DEPOIS que a barra expandir
      staggerChildren: 0.1,
    },
  },
};

// Variante para cada item (LOGO, Links)
const itemVariants: Variants = {
  closed: { opacity: 0, y: 20 },
  open: { opacity: 1, y: 0 },
};

// --- SEU COMPONENTE NAVBAR MODIFICADO ---

export default function AnimatedNavbar() {
  const [open, setOpen] = React.useState(false);

  const links = [
    { href: "#projects", label: "Projetos" },
    { href: "#about", label: "Sobre" },
    { href: "#contact", label: "Contato" },
  ];

  return (
    <motion.div // Mudamos de Box para motion.div
      // O ID MÁGICO!
      layoutId="navbar-container"
      
      // Aplicando o estilo "flutuante"
      style={navStyle}

      // Aplicando a física de "mola" da sua variante "open"
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
    >
      {/* Este wrapper usa nossas variantes para orquestrar
        a entrada do conteúdo da navbar 
      */}
      <motion.div
        style={navContentStyle}
        variants={contentVariants}
        initial="closed"
        animate="open"
      >
        {/* Left: logo / name */}
        <motion.div variants={itemVariants}>
          <Text
            fontWeight="700"
            letterSpacing="tight"
            fontSize={{ base: "lg", md: "xl" }}
          >
            Portifólio
          </Text>
        </motion.div>

        {/* Center: nav links (desktop) */}
        <Box
          display={{ base: "none", md: "block" }}
          textAlign="center"
        >
          <motion.div variants={itemVariants}>
            <HStack gap={6} justify="center">
              {links.map((l) => (
                <Link key={l.href} href={l.href}>
                  <Button
                    variant="ghost"
                    size="sm"
                    _hover={{ bg: "rgba(255, 255, 255, 0.1)" }}
                  >
                    {l.label}
                  </Button>
                </Link>
              ))}
            </HStack>
          </motion.div>
        </Box>

        {/* Right: actions */}
        <motion.div variants={itemVariants}>
          <HStack gap={3} alignItems="center">
            {/* Social links (desktop only) */}
            <HStack
              gap={2}
              display={{ base: "none", md: "flex" }}
              alignItems="center"
            >
              <ChakraLink
                href="https://github.com/your-username"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Box as={FaGithub} fontSize="lg" />
              </ChakraLink>
              {/* ...seus outros links sociais... */}
            </HStack>
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
        </motion.div>
      </motion.div>

      {/* Mobile menu (simple conditional render) */}
      {open && (
        <Box px={4} pb={4} position="absolute" top="70px" left={0} right={0} bg="rgba(153, 17, 255, 0.8)" backdropFilter="blur(5px)" borderBottomRadius="20px">
          <VStack gap={2} alignItems="stretch">
            {links.map((l) => (
              <Link key={l.href} href={l.href}>
                <Button variant="ghost" justifyContent="flex-start" onClick={() => setOpen(false)}>
                  {l.label}
                </Button>
              </Link>
            ))}
          </VStack>
        </Box>
      )}
    </motion.div>
  );
}

// =======================================================
// Estilos (CSS-in-JS) - O ESTILO "PÍLULA FLUTUANTE"
// =======================================================

const navStyle: React.CSSProperties = {
  height: 70,
  backgroundColor: "rgba(153, 17, 255, 0.6)",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "visible", // MUDADO de "hidden" para "visible" para o menu mobile
  position: "relative",
  width: "90vw",
  maxWidth: "1200px",
  borderRadius: "50px",
  padding: "0 40px",
  boxSizing: "border-box",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
  color: "white", // Adicionado para garantir que os textos fiquem brancos
};

const navContentStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  color: "white",
  position: "relative", // Mudado de "absolute" para "relative"
};