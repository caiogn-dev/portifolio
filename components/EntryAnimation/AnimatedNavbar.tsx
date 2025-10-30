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
import { ColorModeButton } from "@/components/ui/color-mode";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { motion, Variants } from "framer-motion";
import { useColorModeValue } from "@/components/ui/color-mode";

const MotionBox = motion.create(Box);

// ==================================================
// 1. O COMPONENTE "NEON GLOW"
// (Sem alteração)
// ==================================================
const NeonGlow = () => {
  const neonColor = useColorModeValue("purple.400", "cyan.300");

  return (
    <MotionBox
      position="absolute"
      inset="-3px"
      borderRadius="50px"
      zIndex="-1"
      overflow="hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <MotionBox
        width="100%"
        height="100%"
        position="absolute"
        animate={{ rotate: 360 }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
        bgGradient={`conic(
          from 0deg,
          transparent 0%,
          transparent 70%, 
          ${neonColor} 95%, 
          ${neonColor} 100%
        )`}
      />
    </MotionBox>
  );
};

// ==================================================
// 2. VARIANTES (Sem alteração)
// ==================================================
const contentVariants: Variants = {
  closed: { opacity: 0 },
  open: {
    opacity: 1,
    transition: {
      delay: 0.3,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  closed: { opacity: 0 },
  open: { opacity: 1 },
};

// ==================================================
// 3. SEU COMPONENTE NAVBAR ATUALIZADO
// ==================================================
export default function AnimatedNavbar() {
  const [open, setOpen] = React.useState(false);

  // --- Cores do Tema (Lógica Oposta) ---
  const glassBg = useColorModeValue(
    "rgba(255, 255, 255, 0.6)", // Light Mode: White Glass
    "rgba(20, 20, 22, 0.6)" // Dark Mode: Black Glass
  );
  const textColor = useColorModeValue("gray.800", "white");
  const shadow = useColorModeValue("lg", "dark-lg");
  const hoverBg = useColorModeValue("blackAlpha.50", "whiteAlpha.50");

  const links = [
    { href: "#projects", label: "Projetos" },
    { href: "#about", label: "Sobre" },
    { href: "#contact", label: "Contato" },
  ];

  return (
    // 1. O CONTAINER (O "SHAPE" com layoutId)
    <MotionBox
      layoutId="navbar-container"
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
      // --- Props de Estilo ---
      height="60px"
      bg={glassBg} // O "vidro" é o fundo
      backdropFilter="blur(10px)"
      display="flex"
      justifyContent="center"
      alignItems="center"
      overflow="visible"
      position="relative" // Posição "pai"
      width="90vw"
      maxWidth="1200px"
      borderRadius="50px"
      boxShadow={shadow}
      color={textColor}
      paddingX="40px" // Padding aplicado no container principal
    >
      {/* O BRILHO NEON (NOVO) */}
      <NeonGlow />

      {/* 2. O CONTEÚDO (Links, Logo) */}
      <motion.div
        style={navContentStyle}
        variants={contentVariants}
        initial="closed"
        animate="open"
      >
        {/* ======================================================= */}
        {/* CORREÇÃO DE LAYOUT: Replicando o layout do NavBar.tsx   */}
        {/* ======================================================= */}
        <Flex
          width="100%"
          height="100%"
          alignItems="center"
          position="relative" // Garante o contexto para o 'absolute'
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

          {/* Center: nav links (desktop) - Centralizado com Posição Absoluta */}
          <Box
            position="absolute"
            left="50%"
            transform="translateX(-50%)"
            display={{ base: "none", md: "block" }}
          >
            <motion.div variants={itemVariants}>
              <HStack gap={6} justify="center">
                {links.map((l) => (
                  <Link key={l.href} href={l.href}>
                    <Button variant="ghost" size="sm" _hover={{ bg: hoverBg }}>
                      {l.label}
                    </Button>
                  </Link>
                ))}
              </HStack>
            </motion.div>
          </Box>

          {/* Right: actions - Alinhado à direita com marginLeft="auto" */}
          <Box marginLeft="auto">
            <motion.div variants={itemVariants}>
              <HStack gap={3} alignItems="center">
                <HStack
                  gap={2}
                  display={{ base: "none", md: "flex" }}
                  alignItems="center"
                >
                  <ChakraLink
                    href="https://github.com/caiogn-dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                  >
                    <Box as={FaGithub} fontSize="lg" />
                  </ChakraLink>
                  <ChakraLink
                    href="https://www.linkedin.com/in/caiogondimn/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <Box as={FaLinkedin} fontSize="lg" />
                  </ChakraLink>
                </HStack>
                <ColorModeButton />
                <Link href="#contact">
                  <Button colorScheme="blue" size="sm">
                    Contratar
                  </Button>
                </Link>
                <Box display={{ base: "block", md: "none" }}>
                  <Button variant="ghost" onClick={() => setOpen((s) => !s)}>
                    {open ? "Fechar" : "Menu"}
                  </Button>
                </Box>
              </HStack>
            </motion.div>
          </Box>
        </Flex>
      </motion.div>

      {/* ======================================================= */}
      {/* CORREÇÃO MOBILE: Botão "Contratar" removido           */}
      {/* ======================================================= */}
      {open && (
        <Box
          px={4}
          pb={4}
          position="absolute"
          top="60px"
          left={0}
          right={0}
          bg={glassBg}
          backdropFilter="blur(5px)"
          borderBottomRadius="20px"
          boxShadow={shadow}
        >
          <VStack gap={2} alignItems="stretch">
            {links.map((l) => (
              <Link key={l.href} href={l.href}>
                <Button
                  variant="ghost"
                  justifyContent="flex-start"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Button>
              </Link>
            ))}
            {/* O botão "Contratar" foi removido daqui */}
          </VStack>
        </Box>
      )}
    </MotionBox>
  );
}

// Estilo do Conteúdo (Simplificado)
const navContentStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  position: "relative",
  zIndex: 1, // Garante que o conteúdo fique NA FRENTE do brilho
  background: "transparent",
};