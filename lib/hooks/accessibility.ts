import { useEffect, useRef, useState, useCallback } from 'react';
import { focusUtils, keyboardUtils, screenReaderUtils, motionUtils } from '@/lib/utils/accessibility';

// Hook for managing focus trap
export const useFocusTrap = (isActive: boolean = true) => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const cleanup = focusUtils.trapFocus(containerRef.current);
    return cleanup;
  }, [isActive]);

  return containerRef;
};

// Hook for managing focus restoration
export const useFocusRestore = () => {
  const restoreFocusRef = useRef<(() => void) | null>(null);

  const saveFocus = useCallback(() => {
    restoreFocusRef.current = focusUtils.saveFocus();
  }, []);

  const restoreFocus = useCallback(() => {
    if (restoreFocusRef.current) {
      restoreFocusRef.current();
      restoreFocusRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (restoreFocusRef.current) {
        restoreFocusRef.current();
      }
    };
  }, []);

  return { saveFocus, restoreFocus };
};

// Hook for keyboard navigation
export const useKeyboardNavigation = (
  items: HTMLElement[],
  options: {
    onSelect?: (index: number) => void;
    onClose?: () => void;
    loop?: boolean;
    orientation?: 'horizontal' | 'vertical';
  } = {}
) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { onSelect, onClose, loop = true, orientation = 'vertical' } = options;

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const { key } = event;
    let newIndex = currentIndex;

    const isVertical = orientation === 'vertical';
    const nextKey = isVertical ? keyboardUtils.keys.ARROW_DOWN : keyboardUtils.keys.ARROW_RIGHT;
    const prevKey = isVertical ? keyboardUtils.keys.ARROW_UP : keyboardUtils.keys.ARROW_LEFT;

    switch (key) {
      case nextKey:
        event.preventDefault();
        newIndex = currentIndex < items.length - 1 ? currentIndex + 1 : (loop ? 0 : currentIndex);
        break;
      
      case prevKey:
        event.preventDefault();
        newIndex = currentIndex > 0 ? currentIndex - 1 : (loop ? items.length - 1 : currentIndex);
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

    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
      items[newIndex]?.focus();
    }
  }, [currentIndex, items, onSelect, onClose, loop, orientation]);

  return {
    currentIndex,
    setCurrentIndex,
    handleKeyDown
  };
};

// Hook for managing ARIA live regions
export const useAriaLive = () => {
  const [liveRegionId] = useState(() => `live-region-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    // Create live region if it doesn't exist
    if (!document.getElementById(liveRegionId)) {
      const liveRegion = document.createElement('div');
      liveRegion.id = liveRegionId;
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.className = 'sr-only';
      document.body.appendChild(liveRegion);
    }

    return () => {
      // Cleanup on unmount
      const liveRegion = document.getElementById(liveRegionId);
      if (liveRegion) {
        document.body.removeChild(liveRegion);
      }
    };
  }, [liveRegionId]);

  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const liveRegion = document.getElementById(liveRegionId);
    if (liveRegion) {
      liveRegion.setAttribute('aria-live', priority);
      liveRegion.textContent = message;
    }
  }, [liveRegionId]);

  return { announce };
};

// Hook for reduced motion preference
export const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const cleanup = motionUtils.createReducedMotionListener(setPrefersReducedMotion);
    return cleanup;
  }, []);

  return prefersReducedMotion;
};

// Hook for high contrast mode
export const useHighContrast = () => {
  const [isHighContrast, setIsHighContrast] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-contrast: high)');
    const handler = (e: MediaQueryListEvent) => setIsHighContrast(e.matches);
    
    mediaQuery.addEventListener('change', handler);
    setIsHighContrast(mediaQuery.matches);

    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return isHighContrast;
};

// Hook for managing skip links
export const useSkipLinks = () => {
  const skipLinksRef = useRef<HTMLElement>(null);

  const addSkipLink = useCallback((target: string, label: string) => {
    if (!skipLinksRef.current) return;

    const skipLink = document.createElement('a');
    skipLink.href = `#${target}`;
    skipLink.textContent = label;
    skipLink.className = 'skip-link';
    skipLink.addEventListener('click', (e) => {
      e.preventDefault();
      const targetElement = document.getElementById(target);
      if (targetElement) {
        targetElement.focus();
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });

    skipLinksRef.current.appendChild(skipLink);
  }, []);

  return { skipLinksRef, addSkipLink };
};

// Hook for form accessibility
export const useFormAccessibility = () => {
  const generateFieldId = useCallback((name: string) => {
    return `field-${name}-${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  const associateLabel = useCallback((inputId: string, labelId: string) => {
    const input = document.getElementById(inputId);
    const label = document.getElementById(labelId);
    
    if (input && label) {
      label.setAttribute('for', inputId);
    }
  }, []);

  const setFieldError = useCallback((fieldId: string, errorMessage: string) => {
    const field = document.getElementById(fieldId);
    if (!field) return;

    const errorId = `${fieldId}-error`;
    let errorElement = document.getElementById(errorId);
    
    if (!errorElement) {
      errorElement = document.createElement('div');
      errorElement.id = errorId;
      errorElement.className = 'error-message';
      errorElement.setAttribute('role', 'alert');
      field.parentNode?.insertBefore(errorElement, field.nextSibling);
    }
    
    errorElement.textContent = errorMessage;
    field.setAttribute('aria-describedby', errorId);
    field.setAttribute('aria-invalid', 'true');
  }, []);

  const clearFieldError = useCallback((fieldId: string) => {
    const field = document.getElementById(fieldId);
    if (!field) return;

    const errorId = `${fieldId}-error`;
    const errorElement = document.getElementById(errorId);
    
    if (errorElement) {
      errorElement.remove();
    }
    
    field.removeAttribute('aria-describedby');
    field.removeAttribute('aria-invalid');
  }, []);

  return {
    generateFieldId,
    associateLabel,
    setFieldError,
    clearFieldError
  };
};

// Hook for managing modal accessibility
export const useModalAccessibility = (isOpen: boolean) => {
  const modalRef = useRef<HTMLElement>(null);
  const { saveFocus, restoreFocus } = useFocusRestore();
  const focusTrapRef = useFocusTrap(isOpen);

  useEffect(() => {
    if (isOpen) {
      saveFocus();
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
      
      // Set aria-hidden on other elements
      const otherElements = document.querySelectorAll('body > *:not([role="dialog"])');
      otherElements.forEach(el => el.setAttribute('aria-hidden', 'true'));
      
    } else {
      restoreFocus();
      
      // Restore body scroll
      document.body.style.overflow = '';
      
      // Remove aria-hidden from other elements
      const otherElements = document.querySelectorAll('[aria-hidden="true"]');
      otherElements.forEach(el => el.removeAttribute('aria-hidden'));
    }

    return () => {
      // Cleanup
      document.body.style.overflow = '';
      const otherElements = document.querySelectorAll('[aria-hidden="true"]');
      otherElements.forEach(el => el.removeAttribute('aria-hidden'));
    };
  }, [isOpen, saveFocus, restoreFocus]);

  const handleEscapeKey = useCallback((event: KeyboardEvent) => {
    if (event.key === keyboardUtils.keys.ESCAPE && isOpen) {
      event.preventDefault();
      // Modal should handle its own closing logic
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      return () => document.removeEventListener('keydown', handleEscapeKey);
    }
  }, [isOpen, handleEscapeKey]);

  return {
    modalRef: focusTrapRef,
    modalProps: {
      role: 'dialog',
      'aria-modal': true,
      tabIndex: -1
    }
  };
};

// Hook for managing roving tabindex
export const useRovingTabIndex = (items: HTMLElement[], currentIndex: number = 0) => {
  useEffect(() => {
    items.forEach((item, index) => {
      if (index === currentIndex) {
        item.setAttribute('tabindex', '0');
      } else {
        item.setAttribute('tabindex', '-1');
      }
    });
  }, [items, currentIndex]);

  const setCurrentIndex = useCallback((newIndex: number) => {
    if (newIndex >= 0 && newIndex < items.length) {
      items.forEach((item, index) => {
        if (index === newIndex) {
          item.setAttribute('tabindex', '0');
          item.focus();
        } else {
          item.setAttribute('tabindex', '-1');
        }
      });
    }
  }, [items]);

  return { setCurrentIndex };
};

// Hook for managing disclosure (collapsible content)
export const useDisclosureAccessibility = (isOpen: boolean, onToggle: () => void) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLElement>(null);
  const [buttonId] = useState(() => `disclosure-button-${Math.random().toString(36).substr(2, 9)}`);
  const [contentId] = useState(() => `disclosure-content-${Math.random().toString(36).substr(2, 9)}`);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === keyboardUtils.keys.ENTER || event.key === keyboardUtils.keys.SPACE) {
      event.preventDefault();
      onToggle();
    }
  }, [onToggle]);

  return {
    buttonRef,
    contentRef,
    buttonProps: {
      id: buttonId,
      'aria-expanded': isOpen,
      'aria-controls': contentId,
      onKeyDown: handleKeyDown
    },
    contentProps: {
      id: contentId,
      'aria-labelledby': buttonId,
      hidden: !isOpen
    }
  };
};

export {
  useFocusTrap,
  useFocusRestore,
  useKeyboardNavigation,
  useAriaLive,
  useReducedMotion,
  useHighContrast,
  useSkipLinks,
  useFormAccessibility,
  useModalAccessibility,
  useRovingTabIndex,
  useDisclosureAccessibility
};