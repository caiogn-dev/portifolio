import { createSystem, defaultConfig, defineConfig, defineRecipe } from "@chakra-ui/react";

// Define Button recipe for custom baseStyle
const buttonRecipe = defineRecipe({
  base: {
    fontWeight: "semibold",
  },
});

// Define the config with custom tokens
const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: "#e6f6ff" },
          100: { value: "#bae3ff" },
          200: { value: "#7cc4ff" },
          300: { value: "#47a3f3" },
          400: { value: "#2186d4" },
          500: { value: "#0967a9" },
          600: { value: "#004a8d" },
          700: { value: "#002c6c" },
          800: { value: "#000f4b" },
          900: { value: "#00002a" },
        },
      },
      fonts: {
        heading: { value: "'Inter', sans-serif" },
        body: { value: "'Inter', sans-serif" },
      },
    },
    recipes: {
      Button: buttonRecipe,
    },
  },
});

// Create the system
const system = createSystem(defaultConfig, config);

export default system;