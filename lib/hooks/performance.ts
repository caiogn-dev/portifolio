import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { lazyLoadUtils, performanceUtils, memoryUtils, networkUtils } from '@/lib/utils/performance';

// Hook for lazy loading components
export const useLazyLoad = (
  threshold: number = 0.1,
  rootMargin: string = '50px'
) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || hasLoaded) return;

    const observer = lazyLoadUtils.createLazyObserver(
      (entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setHasLoaded(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, hasLoaded]);

  return { elementRef, isVisible, hasLoaded };
};

// Hook for intersection observer
export const useIntersectionObserver = (
  options: IntersectionObserverInit = {}
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        setEntry(entry);
      },
      {
        threshold: 0.1,
        rootMargin: '0px',
        ...options
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [options.threshold, options.rootMargin, options.root]);

  return { elementRef, isIntersecting, entry };
};

// Hook for performance monitoring
export const usePerformanceMonitor = (componentName: string) => {
  const mountTime = useRef<number>(0);
  const renderCount = useRef<number>(0);

  useEffect(() => {
    mountTime.current = performance.now();
    performanceUtils.mark(`${componentName}-mount-start`);

    return () => {
      performanceUtils.mark(`${componentName}-unmount`);
      performanceUtils.measure(
        `${componentName}-lifecycle`,
        `${componentName}-mount-start`,
        `${componentName}-unmount`
      );
    };
  }, [componentName]);

  useEffect(() => {
    renderCount.current += 1;
    performanceUtils.mark(`${componentName}-render-${renderCount.current}`);
  });

  const measureRender = useCallback((label: string = 'render') => {
    const startMark = `${componentName}-${label}-start`;
    const endMark = `${componentName}-${label}-end`;
    
    performanceUtils.mark(startMark);
    
    return () => {
      performanceUtils.mark(endMark);
      performanceUtils.measure(`${componentName}-${label}`, startMark, endMark);
    };
  }, [componentName]);

  return {
    measureRender,
    renderCount: renderCount.current,
    mountTime: mountTime.current
  };
};

// Hook for memory monitoring
export const useMemoryMonitor = (interval: number = 5000) => {
  const [memoryInfo, setMemoryInfo] = useState<MemoryInfo | null>(null);

  useEffect(() => {
    const updateMemoryInfo = () => {
      const memory = memoryUtils.getMemoryUsage();
      setMemoryInfo(memory);
    };

    updateMemoryInfo();
    const intervalId = setInterval(updateMemoryInfo, interval);

    return () => {
      clearInterval(intervalId);
    };
  }, [interval]);

  return memoryInfo;
};

// Hook for debouncing values
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Hook for throttling functions
export const useThrottle = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T => {
  const lastRun = useRef<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const throttledCallback = useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      
      if (now - lastRun.current >= delay) {
        callback(...args);
        lastRun.current = now;
      } else {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        
        timeoutRef.current = setTimeout(() => {
          callback(...args);
          lastRun.current = Date.now();
        }, delay - (now - lastRun.current));
      }
    },
    [callback, delay]
  ) as T;

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return throttledCallback;
};

// Hook for virtual scrolling
export const useVirtualScroll = <T>(
  items: T[],
  itemHeight: number,
  containerHeight: number,
  overscan: number = 5
) => {
  const [scrollTop, setScrollTop] = useState(0);

  const visibleRange = useMemo(() => {
    const start = Math.floor(scrollTop / itemHeight);
    const end = Math.min(
      start + Math.ceil(containerHeight / itemHeight),
      items.length - 1
    );

    return {
      start: Math.max(0, start - overscan),
      end: Math.min(items.length - 1, end + overscan)
    };
  }, [scrollTop, itemHeight, containerHeight, items.length, overscan]);

  const visibleItems = useMemo(() => {
    return items.slice(visibleRange.start, visibleRange.end + 1).map((item, index) => ({
      item,
      index: visibleRange.start + index
    }));
  }, [items, visibleRange]);

  const totalHeight = items.length * itemHeight;
  const offsetY = visibleRange.start * itemHeight;

  const handleScroll = useCallback((event: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(event.currentTarget.scrollTop);
  }, []);

  return {
    visibleItems,
    totalHeight,
    offsetY,
    handleScroll
  };
};

// Hook for image lazy loading
export const useImageLazyLoad = (src: string, placeholder?: string) => {
  const [imageSrc, setImageSrc] = useState(placeholder || '');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const { elementRef, isVisible } = useLazyLoad();

  useEffect(() => {
    if (!isVisible || isLoaded) return;

    const img = new Image();
    img.onload = () => {
      setImageSrc(src);
      setIsLoaded(true);
    };
    img.onerror = () => {
      setIsError(true);
    };
    img.src = src;
  }, [isVisible, src, isLoaded]);

  return {
    elementRef,
    imageSrc,
    isLoaded,
    isError,
    isVisible
  };
};

// Hook for connection type
export const useConnectionType = () => {
  const [connectionType, setConnectionType] = useState<string>('unknown');
  const [isSlowConnection, setIsSlowConnection] = useState(false);

  useEffect(() => {
    const updateConnectionInfo = () => {
      const type = networkUtils.getConnectionType();
      const isSlow = networkUtils.isSlowConnection();
      
      setConnectionType(type);
      setIsSlowConnection(isSlow);
    };

    updateConnectionInfo();

    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      connection.addEventListener('change', updateConnectionInfo);
      
      return () => {
        connection.removeEventListener('change', updateConnectionInfo);
      };
    }
  }, []);

  return { connectionType, isSlowConnection };
};

// Hook for adaptive loading
export const useAdaptiveLoading = () => {
  const { isSlowConnection } = useConnectionType();
  const [shouldLoadHighQuality, setShouldLoadHighQuality] = useState(true);

  useEffect(() => {
    setShouldLoadHighQuality(networkUtils.shouldLoadHighQuality());
  }, [isSlowConnection]);

  return {
    shouldLoadHighQuality,
    isSlowConnection,
    loadStrategy: isSlowConnection ? 'minimal' : 'full'
  };
};

// Hook for resource preloading
export const useResourcePreload = (resources: string[], condition: boolean = true) => {
  useEffect(() => {
    if (!condition) return;

    const { isSlowConnection } = networkUtils;
    if (!isSlowConnection()) {
      networkUtils.preloadCriticalResources(resources);
    }
  }, [resources, condition]);
};

// Hook for cleanup management
export const useCleanup = () => {
  const cleanupFunctions = useRef<(() => void)[]>([]);

  const addCleanup = useCallback((cleanupFn: () => void) => {
    cleanupFunctions.current.push(cleanupFn);
  }, []);

  const runCleanup = useCallback(() => {
    cleanupFunctions.current.forEach(fn => fn());
    cleanupFunctions.current = [];
  }, []);

  useEffect(() => {
    return () => {
      runCleanup();
    };
  }, [runCleanup]);

  return { addCleanup, runCleanup };
};

// Hook for measuring component performance
export const useComponentPerformance = (componentName: string) => {
  const renderStartTime = useRef<number>(0);
  const renderCount = useRef<number>(0);
  const [performanceData, setPerformanceData] = useState({
    averageRenderTime: 0,
    totalRenders: 0,
    lastRenderTime: 0
  });

  useEffect(() => {
    renderStartTime.current = performance.now();
  });

  useEffect(() => {
    const renderEndTime = performance.now();
    const renderTime = renderEndTime - renderStartTime.current;
    renderCount.current += 1;

    setPerformanceData(prev => ({
      averageRenderTime: (prev.averageRenderTime * (renderCount.current - 1) + renderTime) / renderCount.current,
      totalRenders: renderCount.current,
      lastRenderTime: renderTime
    }));

    if (process.env.NODE_ENV === 'development' && renderTime > 16) {
      console.warn(`⚠️ ${componentName} render took ${renderTime.toFixed(2)}ms (>16ms)`);
    }
  });

  return performanceData;
};

// Hook for batch updates
export const useBatchUpdates = <T>(
  initialValue: T,
  batchDelay: number = 100
) => {
  const [value, setValue] = useState<T>(initialValue);
  const pendingUpdates = useRef<((prev: T) => T)[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const batchUpdate = useCallback((updater: (prev: T) => T) => {
    pendingUpdates.current.push(updater);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setValue(prev => {
        let newValue = prev;
        pendingUpdates.current.forEach(update => {
          newValue = update(newValue);
        });
        pendingUpdates.current = [];
        return newValue;
      });
    }, batchDelay);
  }, [batchDelay]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return [value, batchUpdate] as const;
};

export {
  useLazyLoad,
  useIntersectionObserver,
  usePerformanceMonitor,
  useMemoryMonitor,
  useDebounce,
  useThrottle,
  useVirtualScroll,
  useImageLazyLoad,
  useConnectionType,
  useAdaptiveLoading,
  useResourcePreload,
  useCleanup,
  useComponentPerformance,
  useBatchUpdates
};