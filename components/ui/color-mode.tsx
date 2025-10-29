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

export function ColorModeScript({ initialColorMode = "system" }: { initialColorMode?: "light" | "dark" | "system" }) {
  const scriptContent = `
    (function() {
      function getInitialColorMode() {
        const persistedColorPreference = window.localStorage.getItem('chakra-color-mode');
        const hasPersistedPreference = typeof persistedColorPreference === 'string';
        if (hasPersistedPreference) {
          return persistedColorPreference;
        }
        const mql = window.matchMedia('(prefers-color-scheme: dark)');
        const hasMediaQueryPreference = typeof mql.matches === 'boolean';
        if (hasMediaQueryPreference) {
          return mql.matches ? 'dark' : 'light';
        }
        return '${initialColorMode === "system" ? "light" : initialColorMode}';
      }
      const colorMode = getInitialColorMode();
      const root = document.documentElement;
      root.classList.add("chakra-theme");
      root.classList.add(colorMode);
      root.style.setProperty('--chakra-ui-color-mode', colorMode);
    })();
  `;
  return <script dangerouslySetInnerHTML={{ __html: scriptContent }} />;
}

export function ColorModeProvider({ children }: React.PropsWithChildren<{}>) {
  const [colorMode, setColorModeState] = React.useState<ColorMode | undefined>(undefined);

  React.useEffect(() => {
    const stored = localStorage.getItem("chakra-color-mode") as ColorMode | null;
    let mode: ColorMode;
    if (stored === "light" || stored === "dark") {
      mode = stored;
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      mode = "dark";
    } else {
      mode = "light";
    }
    setColorModeState(mode);
    applyHtmlClass(mode);
  }, []);

  const setColorMode = React.useCallback((mode: ColorMode) => {
    setColorModeState(mode);
    try {
      localStorage.setItem("chakra-color-mode", mode);
    } catch (e) {
      // ignore
    }
    applyHtmlClass(mode);
  }, []);

  const toggleColorMode = React.useCallback(() => {
    setColorModeState((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      setColorMode(next);
      return next;
    });
  }, [setColorMode]);

  if (colorMode === undefined) {
    return null; // Or a loading placeholder to avoid mismatch
  }

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
        suppressHydrationWarning
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