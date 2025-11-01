import { createSystem, defaultConfig, defineConfig, defineRecipe } from "@chakra-ui/react";
import { designTokens } from "@/lib/constants/design-tokens";

// Enhanced Button recipe with variants and sizes
const buttonRecipe = defineRecipe({
  base: {
    fontWeight: "semibold",
    borderRadius: "lg",
    transition: "all 0.2s ease-in-out",
    cursor: "pointer",
    _hover: {
      transform: "translateY(-1px)",
      shadow: "md"
    },
    _active: {
      transform: "translateY(0)"
    },
    _disabled: {
      opacity: 0.6,
      cursor: "not-allowed",
      _hover: {
        transform: "none",
        shadow: "none"
      }
    }
  },
  variants: {
    variant: {
      solid: {
        bg: "primary.500",
        color: "white",
        _hover: {
          bg: "primary.600"
        }
      },
      outline: {
        borderWidth: "2px",
        borderColor: "primary.500",
        color: "primary.500",
        bg: "transparent",
        _hover: {
          bg: "primary.50",
          _dark: {
            bg: "primary.900"
          }
        }
      },
      ghost: {
        color: "primary.500",
        bg: "transparent",
        _hover: {
          bg: "primary.50",
          _dark: {
            bg: "primary.900"
          }
        }
      },
      gradient: {
        bgGradient: "linear(to-r, primary.500, accent.500)",
        color: "white",
        _hover: {
          bgGradient: "linear(to-r, primary.600, accent.600)"
        }
      }
    },
    size: {
      sm: {
        px: 3,
        py: 2,
        fontSize: "sm",
        minH: 8
      },
      md: {
        px: 4,
        py: 2.5,
        fontSize: "base",
        minH: 10
      },
      lg: {
        px: 6,
        py: 3,
        fontSize: "lg",
        minH: 12
      },
      xl: {
        px: 8,
        py: 4,
        fontSize: "xl",
        minH: 14
      }
    }
  },
  defaultVariants: {
    variant: "solid",
    size: "md"
  }
});

// Card recipe for consistent card styling
const cardRecipe = defineRecipe({
  base: {
    bg: "white",
    _dark: {
      bg: "neutral.800"
    },
    borderRadius: "xl",
    shadow: "base",
    overflow: "hidden",
    transition: "all 0.3s ease-in-out",
    _hover: {
      shadow: "lg",
      transform: "translateY(-2px)"
    }
  },
  variants: {
    variant: {
      elevated: {
        shadow: "lg",
        _hover: {
          shadow: "xl"
        }
      },
      outlined: {
        borderWidth: "1px",
        borderColor: "neutral.200",
        _dark: {
          borderColor: "neutral.700"
        },
        shadow: "none"
      },
      filled: {
        bg: "neutral.50",
        _dark: {
          bg: "neutral.900"
        }
      }
    }
  },
  defaultVariants: {
    variant: "elevated"
  }
});

// Input recipe for form inputs
const inputRecipe = defineRecipe({
  base: {
    borderRadius: "lg",
    borderWidth: "2px",
    borderColor: "neutral.200",
    _dark: {
      borderColor: "neutral.700"
    },
    _focus: {
      borderColor: "primary.500",
      shadow: "0 0 0 1px var(--chakra-colors-primary-500)"
    },
    _invalid: {
      borderColor: "error.500",
      shadow: "0 0 0 1px var(--chakra-colors-error-500)"
    },
    transition: "all 0.2s ease-in-out"
  }
});

// Define the enhanced config with design tokens
const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        // Primary brand colors
        primary: {
          50: { value: designTokens.colors.primary[50] },
          100: { value: designTokens.colors.primary[100] },
          200: { value: designTokens.colors.primary[200] },
          300: { value: designTokens.colors.primary[300] },
          400: { value: designTokens.colors.primary[400] },
          500: { value: designTokens.colors.primary[500] },
          600: { value: designTokens.colors.primary[600] },
          700: { value: designTokens.colors.primary[700] },
          800: { value: designTokens.colors.primary[800] },
          900: { value: designTokens.colors.primary[900] },
          950: { value: designTokens.colors.primary[950] }
        },
        
        // Secondary colors
        secondary: {
          50: { value: designTokens.colors.secondary[50] },
          100: { value: designTokens.colors.secondary[100] },
          200: { value: designTokens.colors.secondary[200] },
          300: { value: designTokens.colors.secondary[300] },
          400: { value: designTokens.colors.secondary[400] },
          500: { value: designTokens.colors.secondary[500] },
          600: { value: designTokens.colors.secondary[600] },
          700: { value: designTokens.colors.secondary[700] },
          800: { value: designTokens.colors.secondary[800] },
          900: { value: designTokens.colors.secondary[900] },
          950: { value: designTokens.colors.secondary[950] }
        },
        
        // Accent colors
        accent: {
          50: { value: designTokens.colors.accent[50] },
          100: { value: designTokens.colors.accent[100] },
          200: { value: designTokens.colors.accent[200] },
          300: { value: designTokens.colors.accent[300] },
          400: { value: designTokens.colors.accent[400] },
          500: { value: designTokens.colors.accent[500] },
          600: { value: designTokens.colors.accent[600] },
          700: { value: designTokens.colors.accent[700] },
          800: { value: designTokens.colors.accent[800] },
          900: { value: designTokens.colors.accent[900] },
          950: { value: designTokens.colors.accent[950] }
        },
        
        // Semantic colors
        success: {
          50: { value: designTokens.colors.success[50] },
          100: { value: designTokens.colors.success[100] },
          200: { value: designTokens.colors.success[200] },
          300: { value: designTokens.colors.success[300] },
          400: { value: designTokens.colors.success[400] },
          500: { value: designTokens.colors.success[500] },
          600: { value: designTokens.colors.success[600] },
          700: { value: designTokens.colors.success[700] },
          800: { value: designTokens.colors.success[800] },
          900: { value: designTokens.colors.success[900] },
          950: { value: designTokens.colors.success[950] }
        },
        
        warning: {
          50: { value: designTokens.colors.warning[50] },
          100: { value: designTokens.colors.warning[100] },
          200: { value: designTokens.colors.warning[200] },
          300: { value: designTokens.colors.warning[300] },
          400: { value: designTokens.colors.warning[400] },
          500: { value: designTokens.colors.warning[500] },
          600: { value: designTokens.colors.warning[600] },
          700: { value: designTokens.colors.warning[700] },
          800: { value: designTokens.colors.warning[800] },
          900: { value: designTokens.colors.warning[900] },
          950: { value: designTokens.colors.warning[950] }
        },
        
        error: {
          50: { value: designTokens.colors.error[50] },
          100: { value: designTokens.colors.error[100] },
          200: { value: designTokens.colors.error[200] },
          300: { value: designTokens.colors.error[300] },
          400: { value: designTokens.colors.error[400] },
          500: { value: designTokens.colors.error[500] },
          600: { value: designTokens.colors.error[600] },
          700: { value: designTokens.colors.error[700] },
          800: { value: designTokens.colors.error[800] },
          900: { value: designTokens.colors.error[900] },
          950: { value: designTokens.colors.error[950] }
        },
        
        // Neutral colors
        neutral: {
          50: { value: designTokens.colors.neutral[50] },
          100: { value: designTokens.colors.neutral[100] },
          200: { value: designTokens.colors.neutral[200] },
          300: { value: designTokens.colors.neutral[300] },
          400: { value: designTokens.colors.neutral[400] },
          500: { value: designTokens.colors.neutral[500] },
          600: { value: designTokens.colors.neutral[600] },
          700: { value: designTokens.colors.neutral[700] },
          800: { value: designTokens.colors.neutral[800] },
          900: { value: designTokens.colors.neutral[900] },
          950: { value: designTokens.colors.neutral[950] }
        }
      },
      
      // Typography tokens
      fonts: {
        heading: { value: designTokens.typography.fontFamilies.sans.join(', ') },
        body: { value: designTokens.typography.fontFamilies.sans.join(', ') },
        mono: { value: designTokens.typography.fontFamilies.mono.join(', ') }
      },
      
      fontSizes: {
        xs: { value: designTokens.typography.fontSizes.xs },
        sm: { value: designTokens.typography.fontSizes.sm },
        md: { value: designTokens.typography.fontSizes.base },
        lg: { value: designTokens.typography.fontSizes.lg },
        xl: { value: designTokens.typography.fontSizes.xl },
        '2xl': { value: designTokens.typography.fontSizes['2xl'] },
        '3xl': { value: designTokens.typography.fontSizes['3xl'] },
        '4xl': { value: designTokens.typography.fontSizes['4xl'] },
        '5xl': { value: designTokens.typography.fontSizes['5xl'] },
        '6xl': { value: designTokens.typography.fontSizes['6xl'] },
        '7xl': { value: designTokens.typography.fontSizes['7xl'] },
        '8xl': { value: designTokens.typography.fontSizes['8xl'] },
        '9xl': { value: designTokens.typography.fontSizes['9xl'] }
      },
      
      // Spacing tokens
      spacing: {
        0: { value: designTokens.spacing[0] },
        px: { value: designTokens.spacing.px },
        0.5: { value: designTokens.spacing[0.5] },
        1: { value: designTokens.spacing[1] },
        1.5: { value: designTokens.spacing[1.5] },
        2: { value: designTokens.spacing[2] },
        2.5: { value: designTokens.spacing[2.5] },
        3: { value: designTokens.spacing[3] },
        3.5: { value: designTokens.spacing[3.5] },
        4: { value: designTokens.spacing[4] },
        5: { value: designTokens.spacing[5] },
        6: { value: designTokens.spacing[6] },
        7: { value: designTokens.spacing[7] },
        8: { value: designTokens.spacing[8] },
        9: { value: designTokens.spacing[9] },
        10: { value: designTokens.spacing[10] },
        12: { value: designTokens.spacing[12] },
        14: { value: designTokens.spacing[14] },
        16: { value: designTokens.spacing[16] },
        20: { value: designTokens.spacing[20] },
        24: { value: designTokens.spacing[24] },
        28: { value: designTokens.spacing[28] },
        32: { value: designTokens.spacing[32] },
        36: { value: designTokens.spacing[36] },
        40: { value: designTokens.spacing[40] },
        44: { value: designTokens.spacing[44] },
        48: { value: designTokens.spacing[48] },
        52: { value: designTokens.spacing[52] },
        56: { value: designTokens.spacing[56] },
        60: { value: designTokens.spacing[60] },
        64: { value: designTokens.spacing[64] },
        72: { value: designTokens.spacing[72] },
        80: { value: designTokens.spacing[80] },
        96: { value: designTokens.spacing[96] }
      },
      
      // Border radius tokens
      radii: {
        none: { value: designTokens.borderRadius.none },
        sm: { value: designTokens.borderRadius.sm },
        base: { value: designTokens.borderRadius.base },
        md: { value: designTokens.borderRadius.md },
        lg: { value: designTokens.borderRadius.lg },
        xl: { value: designTokens.borderRadius.xl },
        '2xl': { value: designTokens.borderRadius['2xl'] },
        '3xl': { value: designTokens.borderRadius['3xl'] },
        full: { value: designTokens.borderRadius.full }
      },
      
      // Shadow tokens
      shadows: {
        xs: { value: designTokens.shadows.xs },
        sm: { value: designTokens.shadows.sm },
        base: { value: designTokens.shadows.base },
        md: { value: designTokens.shadows.md },
        lg: { value: designTokens.shadows.lg },
        xl: { value: designTokens.shadows.xl },
        '2xl': { value: designTokens.shadows['2xl'] },
        inner: { value: designTokens.shadows.inner },
        none: { value: designTokens.shadows.none }
      },
      
      // Animation tokens
      durations: {
        instant: { value: designTokens.animations.durations.instant },
        fast: { value: designTokens.animations.durations.fast },
        normal: { value: designTokens.animations.durations.normal },
        slow: { value: designTokens.animations.durations.slow },
        slower: { value: designTokens.animations.durations.slower },
        slowest: { value: designTokens.animations.durations.slowest }
      },
      
      easings: {
        linear: { value: designTokens.animations.easings.linear },
        easeIn: { value: designTokens.animations.easings.easeIn },
        easeOut: { value: designTokens.animations.easings.easeOut },
        easeInOut: { value: designTokens.animations.easings.easeInOut },
        bounce: { value: designTokens.animations.easings.bounce },
        elastic: { value: designTokens.animations.easings.elastic }
      }
    },
    
    // Component recipes
    recipes: {
      Button: buttonRecipe,
      Card: cardRecipe,
      Input: inputRecipe
    },
    
    // Global styles
    globalCss: {
      '*': {
        margin: 0,
        padding: 0,
        boxSizing: 'border-box'
      },
      'html': {
        scrollBehavior: 'smooth'
      },
      'body': {
        fontFamily: 'body',
        lineHeight: 'normal',
        color: 'neutral.900',
        bg: 'white',
        _dark: {
          color: 'neutral.100',
          bg: 'neutral.900'
        }
      },
      '::selection': {
        bg: 'primary.100',
        color: 'primary.900',
        _dark: {
          bg: 'primary.800',
          color: 'primary.100'
        }
      },
      ':focus-visible': {
        outline: '2px solid',
        outlineColor: 'primary.500',
        outlineOffset: '2px'
      }
    }
  }
});

// Create the enhanced system
const system = createSystem(defaultConfig, config);

export default system;