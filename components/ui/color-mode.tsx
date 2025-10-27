"use client"

import * as React from "react"
import type { IconButtonProps, SpanProps } from "@chakra-ui/react"
import { IconButton, Span } from "@chakra-ui/react"
import { LuMoon, LuSun } from "react-icons/lu"

export type ColorMode = "light" | "dark"

interface ColorModeContextValue {
  colorMode: ColorMode
  setColorMode: (mode: ColorMode) => void
  toggleColorMode: () => void
}

const ColorModeContext = React.createContext<ColorModeContextValue | undefined>(
  undefined,
)

function applyHtmlClass(mode: ColorMode) {
  if (typeof document === "undefined") return
  // Ensure Chakra's css-vars root class is present so its theme selectors apply
  document.documentElement.classList.add("chakra-theme")
  document.documentElement.classList.remove("light", "dark")
  document.documentElement.classList.add(mode)
}

export function ColorModeProvider({ children }: React.PropsWithChildren<{}>) {
  const [colorMode, setColorModeState] = React.useState<ColorMode>(() => {
    try {
      const stored = localStorage.getItem("chakra-color-mode") as ColorMode | null
      if (stored === "light" || stored === "dark") return stored
    } catch (e) {
      // ignore
    }
    // default to system preference
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    }
    return "light"
  })

  React.useEffect(() => {
    try {
      localStorage.setItem("chakra-color-mode", colorMode)
    } catch (e) {
      // ignore
    }
    applyHtmlClass(colorMode)
  }, [colorMode])

  const setColorMode = React.useCallback((mode: ColorMode) => {
    setColorModeState(mode)
  }, [])

  const toggleColorMode = React.useCallback(() => {
    setColorModeState((m) => (m === "dark" ? "light" : "dark"))
  }, [])

  return (
    <ColorModeContext.Provider value={{ colorMode, setColorMode, toggleColorMode }}>
      {children}
    </ColorModeContext.Provider>
  )
}

export function useColorMode() {
  const ctx = React.useContext(ColorModeContext)
  if (!ctx) throw new Error("useColorMode must be used within a ColorModeProvider")
  return ctx
}

export function useColorModeValue<T>(light: T, dark: T) {
  const { colorMode } = useColorMode()
  return colorMode === "dark" ? dark : light
}

export function ColorModeIcon() {
  const { colorMode } = useColorMode()
  return colorMode === "dark" ? <LuMoon /> : <LuSun />
}

interface ColorModeButtonProps extends Omit<IconButtonProps, "aria-label"> {}

export const ColorModeButton = React.forwardRef<HTMLButtonElement, ColorModeButtonProps>(
  function ColorModeButton(props, ref) {
    const { toggleColorMode } = useColorMode()
    return (
      <IconButton
        onClick={toggleColorMode}
        variant="ghost"
        aria-label="Toggle color mode"
        size="sm"
        ref={ref}
        {...props}
      >
        <ColorModeIcon />
      </IconButton>
    )
  },
)

export const LightMode = React.forwardRef<HTMLSpanElement, SpanProps>(function LightMode(props, ref) {
  return (
    <Span
      color="fg"
      display="contents"
      className="chakra-theme light"
      colorPalette="gray"
      colorScheme="light"
      ref={ref}
      {...props}
    />
  )
})

export const DarkMode = React.forwardRef<HTMLSpanElement, SpanProps>(function DarkMode(props, ref) {
  return (
    <Span
      color="fg"
      display="contents"
      className="chakra-theme dark"
      colorPalette="gray"
      colorScheme="dark"
      ref={ref}
      {...props}
    />
  )
})
