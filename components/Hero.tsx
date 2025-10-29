"use client";

import React from "react";
import { Box, Container, chakra, Button } from "@chakra-ui/react";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  type Transition,
} from "framer-motion";
import { useColorModeValue } from "@/components/ui/color-mode";

// --- Motion Components ---
const MotionDiv = motion(chakra.div);
const MotionFigure = motion(chakra.figure);
const MotionImg = motion(chakra.img);
const MotionH1 = motion(chakra.h1);
const MotionP = motion(chakra.p);
const MotionButton = motion(Button);

// --- Variantes de animação ---
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const textVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.6, 0.05, 0.01, 0.9] as [number, number, number, number],
    },
  },
};

const imageRevealVariants = {
  hidden: { clipPath: "inset(0% 0% 100% 0%)", opacity: 0 },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: [0.45, 0, 0.55, 1] as [number, number, number, number],
    },
  },
};

export default function Hero() {
  const accent = useColorModeValue("blue.600", "blue.300");
  const shadow = useColorModeValue("lg", "dark-lg");
  const subHeadingColor = useColorModeValue("gray.700", "gray.3 00");
  const textColor = useColorModeValue("gray.600", "gray.400");

  const prefersReducedMotion = useReducedMotion();
  const buttonTransition: Transition = {
    type: "spring",
    stiffness: 400,
    damping: 17,
  };

  return (
    <Box as="section" py={{ base: 12, md: 20 }}>
      <Container maxW="container.md" textAlign="center">
        <MotionDiv
          display="flex"
          flexDirection="column"
          gap={6}
          alignItems="center"
          variants={containerVariants}
          initial={prefersReducedMotion ? "visible" : "hidden"}
          animate="visible"
        >
          <MotionFigure
            mb={2}
            borderWidth={3}
            borderColor={accent}
            borderRadius="full"
            overflow="hidden"
            boxSize={{ base: "220px", md: "360px" }}
            mx="auto"
            boxShadow={shadow}
            variants={prefersReducedMotion ? {} : imageRevealVariants}
            whileHover={prefersReducedMotion ? {} : { scale: 1.03, y: -5 }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <MotionImg
              src="/profile.png"
              alt="avatar"
              style={{ objectFit: "cover", objectPosition: "top center" }}
              width="100%"
              height="100%"
            />
          </MotionFigure>

          <MotionH1
            fontSize={{ base: "3xl", md: "5xl" }}
            lineHeight="1.05"
            variants={prefersReducedMotion ? {} : textVariants}
          >
            Caio Gonçalves Nascimento
          </MotionH1>

          <MotionP
            fontWeight="600"
            color={subHeadingColor}
            variants={prefersReducedMotion ? {} : textVariants}
          >
            Desenvolvedor Full Stack
          </MotionP>

          <MotionP
            maxW="2xl"
            color={textColor}
            variants={prefersReducedMotion ? {} : textVariants}
          >
            Eu construo aplicações web completas — front-end com React/Next.js e
            interfaces acessíveis, e back-end com Node.js, bancos relacionais, e
            APIs bem testadas. Trabalho com TypeScript, Prisma, PostgreSQL,
            Chakra UI e práticas de testes e CI/CD.
          </MotionP>

          <MotionDiv
            display="flex"
            flexDirection="row"
            gap={4}
            mt={2}
            variants={prefersReducedMotion ? {} : textVariants}
          >
            <Link href="#projects" passHref>
              <MotionButton
                colorScheme="blue"
                whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                transition={buttonTransition}
              >
                Ver projetos
              </MotionButton>
            </Link>
            <Link href="#contact" passHref>
              <MotionButton
                variant="ghost"
                whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                transition={buttonTransition}
              >
                Entrar em contato
              </MotionButton>
            </Link>
          </MotionDiv>
        </MotionDiv>
      </Container>
    </Box>
  );
}
