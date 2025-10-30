"use client";

import { motion, Variants } from "framer-motion";
import { Box } from "@chakra-ui/react";
import React from "react";
import { useColorModeValue } from "@/components/ui/color-mode";

const MotionBox = motion(Box);

// Variantes para o texto "ENTRAR"
const textVariants: Variants = {
  closed: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
  open: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.2 },
  },
};

interface WelcomeGateProps {
  onEnterClick: () => void;
}

export default function WelcomeGate({ onEnterClick }: WelcomeGateProps) {
  // LÓGICA DE CORES (PRETO/BRANCO) - Está correta
  const bgColor = useColorModeValue("gray.900", "white");
  const textColor = useColorModeValue("white", "gray.900");

  return (
    <div className="gate-container">
      <MotionBox
        layoutId="navbar-container"
        onClick={onEnterClick}
        whileHover={{ scale: 1.1 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 20,
        }}
        // --- Props de Estilo do Chakra UI ---
        width="150px"
        height="150px"
        borderRadius="80px"
        bg={bgColor} // COR: Sólida (Preto/BrANCO)
        color={textColor} // COR DO TEXTO: Contraste (Branco/Preto)
        display="flex"
        justifyContent="center"
        alignItems="center"
        cursor="pointer"
        overflow="hidden"
        position="relative"
        boxShadow="xl"
      >
        <motion.span
          variants={textVariants}
          initial="closed"
          exit="open"
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            position: "absolute",
          }}
        >
          ENTRAR
        </motion.span>
      </MotionBox>
    </div>
  );
}