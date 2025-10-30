"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box } from "@chakra-ui/react";

// --- NOSSOS COMPONENTES DE ANIMAÇÃO ---
import WelcomeGate from "@/components/EntryAnimation/WelcomeGate";
import AnimatedNavbar from "@/components/EntryAnimation/AnimatedNavbar";
import AnimatedSection from "@/components/EntryAnimation/AnimatedSection";

// --- SEUS COMPONENTES DE PÁGINA ---
import Hero from "@/components/Hero";
import Tech from "@/components/Tech";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";

// Variantes para o fade-in do layout principal
const layoutVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.5,
    },
  },
};

// Estilo para o wrapper da navbar (sticky e flutuante)
const navWrapperStyle: React.CSSProperties = {
  position: "sticky",
  top: "20px",
  zIndex: 100,
  width: "100%",
  display: "flex",
  justifyContent: "center",
};

// ==========================================
// SEU app/page.tsx
// ==========================================
export default function Page() {
  const [hasEntered, setHasEntered] = useState(false);
  const handleEnter = () => setHasEntered(true);

  return (
    <main>
      <AnimatePresence mode="wait">
        {!hasEntered ? (
          // 1. O PORTÃO DE ENTRADA
          <WelcomeGate key="gate" onEnterClick={handleEnter} />
        ) : (
          // 2. A PÁGINA PRINCIPAL (Seu site)
          <div key="main-page">
            {/* 1. O Wrapper da Navbar (sticky e flutuante) */}
            <div style={navWrapperStyle}>
              <AnimatedNavbar />
            </div>

            {/* 2. O conteúdo (O "vão" está aqui) 
              Nenhum margin-top negativo é aplicado.
            */}
            <motion.div
              variants={layoutVariants}
              initial="hidden"
              animate="visible"
            >
              <AnimatedSection>
                <Hero />
              </AnimatedSection>

              <AnimatedSection>
                <Tech />
              </AnimatedSection>

              <AnimatedSection>
                <Projects />
              </AnimatedSection>

              <AnimatedSection>
                <Footer />
              </AnimatedSection>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}