// Enhanced animation utilities with performance optimizations

import { Variants, Transition } from 'framer-motion';
import { designTokens } from '@/lib/constants/design-tokens';

// Animation configuration
export const animationConfig = {
  // Reduced motion support
  reducedMotion: {
    duration: 0.01,
    ease: 'linear'
  },
  
  // Standard durations
  durations: {
    instant: 0,
    fast: 0.15,
    normal: 0.3,
    slow: 0.5,
    slower: 0.75,
    slowest: 1
  },
  
  // Easing functions optimized for performance
  easings: {
    linear: [0, 0, 1, 1],
    easeIn: [0.4, 0, 1, 1],
    easeOut: [0, 0, 0.2, 1],
    easeInOut: [0.4, 0, 0.2, 1],
    bounce: [0.68, -0.55, 0.265, 1.55],
    elastic: [0.175, 0.885, 0.32, 1.275],
    anticipate: [0.175, 0.885, 0.32, 1.275]
  }
} as const;

// Base transition with performance optimizations
export const baseTransition: Transition = {
  duration: animationConfig.durations.normal,
  ease: animationConfig.easings.easeOut,
  // Enable hardware acceleration
  type: 'tween'
};

// Optimized spring transition
export const springTransition: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
  mass: 1
};

// Fade animations
export const fadeVariants: Variants = {
  hidden: {
    opacity: 0,
    transition: baseTransition
  },
  visible: {
    opacity: 1,
    transition: baseTransition
  },
  exit: {
    opacity: 0,
    transition: { ...baseTransition, duration: animationConfig.durations.fast }
  }
};

// Slide animations with direction support
export const createSlideVariants = (
  direction: 'up' | 'down' | 'left' | 'right' = 'up',
  distance: number = 30
): Variants => {
  const getInitialTransform = () => {
    switch (direction) {
      case 'up': return { y: distance };
      case 'down': return { y: -distance };
      case 'left': return { x: distance };
      case 'right': return { x: -distance };
      default: return { y: distance };
    }
  };

  const getFinalTransform = () => {
    switch (direction) {
      case 'up':
      case 'down': return { y: 0 };
      case 'left':
      case 'right': return { x: 0 };
      default: return { y: 0 };
    }
  };

  return {
    hidden: {
      opacity: 0,
      ...getInitialTransform(),
      transition: baseTransition
    },
    visible: {
      opacity: 1,
      ...getFinalTransform(),
      transition: baseTransition
    },
    exit: {
      opacity: 0,
      ...getInitialTransform(),
      transition: { ...baseTransition, duration: animationConfig.durations.fast }
    }
  };
};

// Scale animations
export const scaleVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    transition: baseTransition
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: baseTransition
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: { ...baseTransition, duration: animationConfig.durations.fast }
  }
};

// Stagger animations for lists
export const createStaggerVariants = (
  staggerDelay: number = 0.1,
  childVariants: Variants = fadeVariants
): Variants => ({
  hidden: {
    transition: {
      staggerChildren: staggerDelay,
      staggerDirection: -1
    }
  },
  visible: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: 0.1
    }
  },
  exit: {
    transition: {
      staggerChildren: staggerDelay / 2,
      staggerDirection: -1
    }
  }
});

// Page transition variants
export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98
  },
  in: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: animationConfig.durations.normal,
      ease: animationConfig.easings.easeOut
    }
  },
  out: {
    opacity: 0,
    y: -20,
    scale: 0.98,
    transition: {
      duration: animationConfig.durations.fast,
      ease: animationConfig.easings.easeIn
    }
  }
};

// Modal/Dialog animations
export const modalVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 20,
    transition: baseTransition
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      ...baseTransition,
      type: 'spring',
      stiffness: 300,
      damping: 30
    }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: 20,
    transition: { ...baseTransition, duration: animationConfig.durations.fast }
  }
};

// Backdrop variants
export const backdropVariants: Variants = {
  hidden: {
    opacity: 0,
    transition: baseTransition
  },
  visible: {
    opacity: 1,
    transition: baseTransition
  },
  exit: {
    opacity: 0,
    transition: { ...baseTransition, duration: animationConfig.durations.fast }
  }
};

// Card hover animations
export const cardHoverVariants: Variants = {
  rest: {
    scale: 1,
    y: 0,
    transition: baseTransition
  },
  hover: {
    scale: 1.02,
    y: -4,
    transition: {
      ...baseTransition,
      duration: animationConfig.durations.fast
    }
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: animationConfig.durations.instant
    }
  }
};

// Button animations
export const buttonVariants: Variants = {
  rest: {
    scale: 1,
    transition: baseTransition
  },
  hover: {
    scale: 1.05,
    transition: {
      ...baseTransition,
      duration: animationConfig.durations.fast
    }
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: animationConfig.durations.instant
    }
  }
};

// Loading spinner variants
export const spinnerVariants: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'linear'
    }
  }
};

// Pulse animation for loading states
export const pulseVariants: Variants = {
  animate: {
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

// Typing animation for text
export const typingVariants: Variants = {
  hidden: {
    width: 0,
    transition: baseTransition
  },
  visible: {
    width: 'auto',
    transition: {
      duration: 2,
      ease: 'easeInOut'
    }
  }
};

// Reveal animation for sections
export const revealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    clipPath: 'inset(0 0 100% 0)',
    transition: baseTransition
  },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: 'inset(0 0 0% 0)',
    transition: {
      ...baseTransition,
      duration: animationConfig.durations.slow
    }
  }
};

// Morphing animation for layout changes
export const morphVariants: Variants = {
  initial: {
    borderRadius: '50%',
    scale: 0,
    transition: baseTransition
  },
  animate: {
    borderRadius: '8px',
    scale: 1,
    transition: {
      ...baseTransition,
      duration: animationConfig.durations.slow
    }
  }
};

// Utility functions for animation optimization
export const getOptimizedTransition = (
  duration: keyof typeof animationConfig.durations = 'normal',
  easing: keyof typeof animationConfig.easings = 'easeOut'
): Transition => ({
  duration: animationConfig.durations[duration],
  ease: animationConfig.easings[easing],
  type: 'tween'
});

// Check if user prefers reduced motion
export const shouldReduceMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Get animation variants with reduced motion support
export const getAnimationVariants = (
  variants: Variants,
  respectReducedMotion: boolean = true
): Variants => {
  if (!respectReducedMotion || !shouldReduceMotion()) {
    return variants;
  }

  // Return simplified variants for reduced motion
  const reducedVariants: Variants = {};
  
  Object.keys(variants).forEach(key => {
    const variant = variants[key];
    if (typeof variant === 'object' && variant !== null) {
      reducedVariants[key] = {
        ...variant,
        transition: animationConfig.reducedMotion
      };
    } else {
      reducedVariants[key] = variant;
    }
  });

  return reducedVariants;
};

// Performance-optimized animation props
export const getAnimationProps = (
  variants: Variants,
  initial: string = 'hidden',
  animate: string = 'visible',
  exit: string = 'exit'
) => ({
  variants: getAnimationVariants(variants),
  initial,
  animate,
  exit,
  // Performance optimizations
  style: {
    willChange: 'transform, opacity'
  }
});

// Intersection observer animation trigger
export const createInViewVariants = (
  baseVariants: Variants,
  threshold: number = 0.1
): Variants => ({
  ...baseVariants,
  visible: {
    ...baseVariants.visible,
    transition: {
      ...baseTransition,
      delay: 0.1
    }
  }
});

// Layout animation utilities
export const layoutTransition: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
  mass: 1
};

// Shared layout animation IDs
export const layoutIds = {
  navbar: 'main-navbar',
  hero: 'hero-section',
  card: 'project-card',
  modal: 'modal-content',
  button: 'cta-button'
} as const;

// Animation presets for common use cases
export const animationPresets = {
  fadeIn: getAnimationProps(fadeVariants),
  slideUp: getAnimationProps(createSlideVariants('up')),
  slideDown: getAnimationProps(createSlideVariants('down')),
  slideLeft: getAnimationProps(createSlideVariants('left')),
  slideRight: getAnimationProps(createSlideVariants('right')),
  scaleIn: getAnimationProps(scaleVariants),
  reveal: getAnimationProps(revealVariants),
  modal: getAnimationProps(modalVariants),
  cardHover: {
    variants: cardHoverVariants,
    initial: 'rest',
    whileHover: 'hover',
    whileTap: 'tap'
  },
  buttonHover: {
    variants: buttonVariants,
    initial: 'rest',
    whileHover: 'hover',
    whileTap: 'tap'
  }
} as const;