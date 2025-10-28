"use client"

import { Box } from "@chakra-ui/react"
import NavBar from "@/components/NavBar"
import Hero from "@/components/Hero"
import Tech from "@/components/Tech"
import Projects from "@/components/Projects"
import Footer from "@/components/Footer"

export default function Page() {
  return (
    <main>
      <NavBar />
      <Hero />
      <Tech />
      <Projects />
      <Footer />
    </main>
  )
};