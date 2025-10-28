import * as React from "react"
import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiPostgresql,
  SiTailwindcss,
  SiDocker,
  SiNodedotjs,
} from "react-icons/si"
import { Center, SimpleGrid, Box, Link as ChakraLink } from "@chakra-ui/react"
import { useColorModeValue } from "@/components/ui/color-mode"

type TechItem = {
  name: string
  Icon: React.ElementType
  color?: string
  href?: string
  iconColor?: string
}

const TECHS: TechItem[] = [
  {
    name: "JavaScript",
    Icon: SiJavascript,
    color: "#F7DF1E",
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    iconColor: "#000",
  },
  {
    name: "TypeScript",
    Icon: SiTypescript,
    color: "#3178C6",
    href: "https://www.typescriptlang.org/",
    iconColor: "#fff",
  },
  {
    name: "Python",
    Icon: SiPython,
    color: "#3776AB",
    href: "https://www.python.org/",
    iconColor: "#fff",
  },
  {
    name: "PostgreSQL",
    Icon: SiPostgresql,
    color: "#336791",
    href: "https://www.postgresql.org/",
    iconColor: "#fff",
  },
  {
    name: "Tailwind CSS",
    Icon: SiTailwindcss,
    color: "#06B6D4",
    href: "https://tailwindcss.com/",
    iconColor: "#fff",
  },
  { name: "Docker", Icon: SiDocker, color: "#2496ED", href: "https://www.docker.com/", iconColor: "#fff" },
  { name: "Node.js", Icon: SiNodedotjs, color: "#83CD29", href: "https://nodejs.org/", iconColor: "#fff" },
]

export default function Tech() {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    const prefersReduced = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) {
      setMounted(true)
      return
    }

    const t = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(t)
  }, [])

  const hoverBg = useColorModeValue("gray.100", "whiteAlpha.50")

  return (
    <section aria-labelledby="tech-heading">
      <Center py={6}>
        <Box maxW="4xl" w="full">
          <Box
            as="h3"
            id="tech-heading"
            style={{
              position: "absolute",
              width: 1,
              height: 1,
              padding: 0,
              margin: -1,
              overflow: "hidden",
              clip: "rect(0, 0, 0, 0)",
              whiteSpace: "nowrap",
              border: 0,
            }}
          >
            Tecnologias
          </Box>

          <SimpleGrid columns={{ base: 3, sm: 4, md: 5, lg: 7 }} gap={6} justifyItems="center">
            {TECHS.map((t, i) => (
              <ChakraLink key={t.name} href={t.href} target="_blank" rel="noopener noreferrer" aria-label={t.name} _focus={{ boxShadow: "outline", transform: "translateY(-6px) scale(1.05)" }} style={{ textDecoration: "none" }}>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  gap={2}
                  p={3}
                  rounded="md"
                  bg="transparent"
                  transition="all 520ms cubic-bezier(0.2,0.8,0.2,1)"
                  transform={mounted ? "translateY(0)" : "translateY(12px)"}
                  opacity={mounted ? 1 : 0}
                  style={{ transitionDelay: `${i * 70}ms` }}
                >
                  <Box as={t.Icon} fontSize="6xl" aria-hidden />
                  <Box as="span" fontSize="xs" textAlign="center" mt={1} color={useColorModeValue("gray.700", "gray.300")}>{t.name}</Box>
                </Box>
              </ChakraLink>
            ))}
          </SimpleGrid>
        </Box>
      </Center>
    </section>
  )
}
