// Accessibility utilities and helpers

// ARIA attributes and roles
export const ariaAttributes = {
  // Navigation
  navigation: {
    role: 'navigation',
    'aria-label': 'Main navigation'
  },
  
  // Skip links
  skipLink: {
    'aria-label': 'Skip to main content',
    href: '#main-content'
  },
  
  // Buttons
  menuButton: {
    'aria-expanded': false,
    'aria-haspopup': 'menu',
    'aria-controls': 'mobile-menu'
  },
  
  // Forms
  form: {
    role: 'form',
    'aria-labelledby': 'form-title'
  },
  
  // Modals
  modal: {
    role: 'dialog',
    'aria-modal': true,
    'aria-labelledby': 'modal-title',
    'aria-describedby': 'modal-description'
  },
  
  // Loading states
  loading: {
    'aria-live': 'polite',
    'aria-busy': true,
    'aria-label': 'Loading content'
  },
  
  // Error states
  error: {
    role: 'alert',
    'aria-live': 'assertive'
  },
  
  // Success states
  success: {
    role: 'status',
    'aria-live': 'polite'
  }
};

// Focus management utilities
export const focusUtils = {
  // Trap focus within an element
  trapFocus: (element: HTMLElement) => {
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    element.addEventListener('keydown', handleTabKey);
    firstElement?.focus();

    return () => {
      element.removeEventListener('keydown', handleTabKey);
    };
  },

  // Get all focusable elements within a container
  getFocusableElements: (container: HTMLElement): HTMLElement[] => {
    const selector = [
      'button:not([disabled])',
      '[href]',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]'
    ].join(', ');

    return Array.from(container.querySelectorAll(selector));
  },

  // Move focus to element
  moveFocusTo: (element: HTMLElement | null) => {
    if (element) {
      element.focus();
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  },

  // Save and restore focus
  saveFocus: () => {
    const activeElement = document.activeElement as HTMLElement;
    return () => {
      if (activeElement && activeElement.focus) {
        activeElement.focus();
      }
    };
  }
};

// Keyboard navigation utilities
export const keyboardUtils = {
  // Common key codes
  keys: {
    ENTER: 'Enter',
    SPACE: ' ',
    ESCAPE: 'Escape',
    ARROW_UP: 'ArrowUp',
    ARROW_DOWN: 'ArrowDown',
    ARROW_LEFT: 'ArrowLeft',
    ARROW_RIGHT: 'ArrowRight',
    HOME: 'Home',
    END: 'End',
    TAB: 'Tab'
  },

  // Handle keyboard navigation for menus
  handleMenuNavigation: (
    event: KeyboardEvent,
    items: HTMLElement[],
    currentIndex: number,
    onSelect?: (index: number) => void,
    onClose?: () => void
  ) => {
    const { key } = event;
    let newIndex = currentIndex;

    switch (key) {
      case keyboardUtils.keys.ARROW_DOWN:
        event.preventDefault();
        newIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
        break;
      
      case keyboardUtils.keys.ARROW_UP:
        event.preventDefault();
        newIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
        break;
      
      case keyboardUtils.keys.HOME:
        event.preventDefault();
        newIndex = 0;
        break;
      
      case keyboardUtils.keys.END:
        event.preventDefault();
        newIndex = items.length - 1;
        break;
      
      case keyboardUtils.keys.ENTER:
      case keyboardUtils.keys.SPACE:
        event.preventDefault();
        onSelect?.(currentIndex);
        break;
      
      case keyboardUtils.keys.ESCAPE:
        event.preventDefault();
        onClose?.();
        break;
    }

    if (newIndex !== currentIndex && items[newIndex]) {
      items[newIndex].focus();
    }

    return newIndex;
  },

  // Handle keyboard navigation for tabs
  handleTabNavigation: (
    event: KeyboardEvent,
    tabs: HTMLElement[],
    currentIndex: number,
    onTabChange: (index: number) => void
  ) => {
    const { key } = event;
    let newIndex = currentIndex;

    switch (key) {
      case keyboardUtils.keys.ARROW_LEFT:
        event.preventDefault();
        newIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
        break;
      
      case keyboardUtils.keys.ARROW_RIGHT:
        event.preventDefault();
        newIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
        break;
      
      case keyboardUtils.keys.HOME:
        event.preventDefault();
        newIndex = 0;
        break;
      
      case keyboardUtils.keys.END:
        event.preventDefault();
        newIndex = tabs.length - 1;
        break;
    }

    if (newIndex !== currentIndex) {
      onTabChange(newIndex);
      tabs[newIndex]?.focus();
    }
  }
};

// Screen reader utilities
export const screenReaderUtils = {
  // Announce message to screen readers
  announce: (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  },

  // Create visually hidden text for screen readers
  createScreenReaderText: (text: string): HTMLSpanElement => {
    const span = document.createElement('span');
    span.className = 'sr-only';
    span.textContent = text;
    return span;
  },

  // Update aria-live region
  updateLiveRegion: (regionId: string, message: string) => {
    const region = document.getElementById(regionId);
    if (region) {
      region.textContent = message;
    }
  }
};

// Color contrast utilities
export const contrastUtils = {
  // Calculate relative luminance
  getRelativeLuminance: (color: string): number => {
    const rgb = contrastUtils.hexToRgb(color);
    if (!rgb) return 0;

    const { r, g, b } = rgb;
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  },

  // Convert hex to RGB
  hexToRgb: (hex: string): { r: number; g: number; b: number } | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  },

  // Calculate contrast ratio
  getContrastRatio: (color1: string, color2: string): number => {
    const l1 = contrastUtils.getRelativeLuminance(color1);
    const l2 = contrastUtils.getRelativeLuminance(color2);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
  },

  // Check if contrast meets WCAG standards
  meetsWCAG: (color1: string, color2: string, level: 'AA' | 'AAA' = 'AA'): boolean => {
    const ratio = contrastUtils.getContrastRatio(color1, color2);
    return level === 'AA' ? ratio >= 4.5 : ratio >= 7;
  }
};

// Reduced motion utilities
export const motionUtils = {
  // Check if user prefers reduced motion
  prefersReducedMotion: (): boolean => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },

  // Get animation duration based on user preference
  getAnimationDuration: (normalDuration: number, reducedDuration: number = 0): number => {
    return motionUtils.prefersReducedMotion() ? reducedDuration : normalDuration;
  },

  // Create media query listener for reduced motion
  createReducedMotionListener: (callback: (prefersReduced: boolean) => void) => {
    if (typeof window === 'undefined') return () => {};

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => callback(e.matches);
    
    mediaQuery.addEventListener('change', handler);
    callback(mediaQuery.matches);

    return () => mediaQuery.removeEventListener('change', handler);
  }
};

// Form accessibility utilities
export const formUtils = {
  // Generate unique IDs for form elements
  generateId: (prefix: string = 'field'): string => {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
  },

  // Associate label with input
  associateLabel: (input: HTMLInputElement, label: HTMLLabelElement) => {
    const id = input.id || formUtils.generateId();
    input.id = id;
    label.setAttribute('for', id);
  },

  // Add error message to input
  addErrorMessage: (input: HTMLInputElement, message: string) => {
    const errorId = `${input.id}-error`;
    let errorElement = document.getElementById(errorId);
    
    if (!errorElement) {
      errorElement = document.createElement('div');
      errorElement.id = errorId;
      errorElement.className = 'error-message';
      errorElement.setAttribute('role', 'alert');
      input.parentNode?.insertBefore(errorElement, input.nextSibling);
    }
    
    errorElement.textContent = message;
    input.setAttribute('aria-describedby', errorId);
    input.setAttribute('aria-invalid', 'true');
  },

  // Remove error message from input
  removeErrorMessage: (input: HTMLInputElement) => {
    const errorId = `${input.id}-error`;
    const errorElement = document.getElementById(errorId);
    
    if (errorElement) {
      errorElement.remove();
    }
    
    input.removeAttribute('aria-describedby');
    input.removeAttribute('aria-invalid');
  }
};

// High contrast mode utilities
export const highContrastUtils = {
  // Check if high contrast mode is enabled
  isHighContrastMode: (): boolean => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-contrast: high)').matches;
  },

  // Create high contrast mode listener
  createHighContrastListener: (callback: (isHighContrast: boolean) => void) => {
    if (typeof window === 'undefined') return () => {};

    const mediaQuery = window.matchMedia('(prefers-contrast: high)');
    const handler = (e: MediaQueryListEvent) => callback(e.matches);
    
    mediaQuery.addEventListener('change', handler);
    callback(mediaQuery.matches);

    return () => mediaQuery.removeEventListener('change', handler);
  }
};

// Accessibility testing utilities
export const a11yTestUtils = {
  // Check for missing alt text on images
  checkImageAltText: (): HTMLImageElement[] => {
    const images = Array.from(document.querySelectorAll('img'));
    return images.filter(img => !img.alt && !img.getAttribute('aria-label'));
  },

  // Check for missing form labels
  checkFormLabels: (): HTMLInputElement[] => {
    const inputs = Array.from(document.querySelectorAll('input, select, textarea'));
    return inputs.filter(input => {
      const hasLabel = document.querySelector(`label[for="${input.id}"]`);
      const hasAriaLabel = input.getAttribute('aria-label');
      const hasAriaLabelledBy = input.getAttribute('aria-labelledby');
      return !hasLabel && !hasAriaLabel && !hasAriaLabelledBy;
    }) as HTMLInputElement[];
  },

  // Check for missing heading hierarchy
  checkHeadingHierarchy: (): { element: HTMLHeadingElement; issue: string }[] => {
    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
    const issues: { element: HTMLHeadingElement; issue: string }[] = [];
    let previousLevel = 0;

    headings.forEach((heading) => {
      const currentLevel = parseInt(heading.tagName.charAt(1));
      
      if (currentLevel > previousLevel + 1) {
        issues.push({
          element: heading as HTMLHeadingElement,
          issue: `Heading level ${currentLevel} follows level ${previousLevel}, skipping levels`
        });
      }
      
      previousLevel = currentLevel;
    });

    return issues;
  },

  // Run all accessibility checks
  runA11yChecks: () => {
    const results = {
      missingAltText: a11yTestUtils.checkImageAltText(),
      missingFormLabels: a11yTestUtils.checkFormLabels(),
      headingIssues: a11yTestUtils.checkHeadingHierarchy()
    };

    console.group('🔍 Accessibility Check Results');
    console.log('Missing alt text:', results.missingAltText);
    console.log('Missing form labels:', results.missingFormLabels);
    console.log('Heading hierarchy issues:', results.headingIssues);
    console.groupEnd();

    return results;
  }
};

export default {
  ariaAttributes,
  focusUtils,
  keyboardUtils,
  screenReaderUtils,
  contrastUtils,
  motionUtils,
  formUtils,
  highContrastUtils,
  a11yTestUtils
};