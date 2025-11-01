"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box } from "@chakra-ui/react";

// --- ENHANCED COMPONENTS ---
import WelcomeGate from "@/components/EntryAnimation/WelcomeGate";
import EnhancedNavbar from "@/components/Navigation/EnhancedNavbar";
import AnimatedSection from "@/components/EntryAnimation/AnimatedSection";

// --- PAGE COMPONENTS ---
import EnhancedHero from "@/components/Hero/EnhancedHero";
import EnhancedTechShowcase from "@/components/Tech/EnhancedTechShowcase";
import EnhancedProjectShowcase from "@/components/Projects/EnhancedProjectShowcase";
import EnhancedBlogSystem from "@/components/Blog/EnhancedBlogSystem";
import EnhancedContactSystem from "@/components/Contact/EnhancedContactSystem";
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
            {/* 1. Enhanced Navbar */}
            <EnhancedNavbar />

            {/* 2. O conteúdo (O "vão" está aqui) 
              Nenhum margin-top negativo é aplicado.
            */}
            <motion.div
              variants={layoutVariants}
              initial="hidden"
              animate="visible"
            >
              <EnhancedHero />

              <EnhancedTechShowcase />

              <EnhancedProjectShowcase />

              <EnhancedBlogSystem />

              <EnhancedContactSystem />

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