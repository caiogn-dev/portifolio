"use client";

import { motion } from "framer-motion";
import React from "react";

interface AnimatedSectionProps {
  children: React.ReactNode;
}

export default function AnimatedSection({ children }: AnimatedSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{
        once: true, // Anima apenas uma vez
        amount: 0.3, // Ativa quando 30% da seção está visível
      }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.5,
      }}
    >
      {children}
    </motion.section>
  );
}