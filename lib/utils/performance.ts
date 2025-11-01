// Performance optimization utilities

// Lazy loading utilities
export const lazyLoadUtils = {
  // Create intersection observer for lazy loading
  createLazyObserver: (
    callback: (entry: IntersectionObserverEntry) => void,
    options: IntersectionObserverInit = {}
  ) => {
    const defaultOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '50px',
      threshold: 0.1,
      ...options
    };

    return new IntersectionObserver((entries) => {
      entries.forEach(callback);
    }, defaultOptions);
  },

  // Lazy load images
  lazyLoadImage: (img: HTMLImageElement, src: string, placeholder?: string) => {
    const observer = lazyLoadUtils.createLazyObserver((entry) => {
      if (entry.isIntersecting) {
        const image = entry.target as HTMLImageElement;
        image.src = src;
        image.classList.remove('lazy');
        image.classList.add('loaded');
        observer.unobserve(image);
      }
    });

    if (placeholder) {
      img.src = placeholder;
    }
    img.classList.add('lazy');
    observer.observe(img);

    return observer;
  },

  // Lazy load component
  lazyLoadComponent: (
    element: HTMLElement,
    loadCallback: () => void,
    options?: IntersectionObserverInit
  ) => {
    const observer = lazyLoadUtils.createLazyObserver((entry) => {
      if (entry.isIntersecting) {
        loadCallback();
        observer.unobserve(entry.target);
      }
    }, options);

    observer.observe(element);
    return observer;
  }
};

// Code splitting utilities
export const codeSplittingUtils = {
  // Dynamic import with error handling
  dynamicImport: async <T>(
    importFn: () => Promise<T>,
    fallback?: T
  ): Promise<T> => {
    try {
      return await importFn();
    } catch (error) {
      console.error('Dynamic import failed:', error);
      if (fallback) {
        return fallback;
      }
      throw error;
    }
  },

  // Preload module
  preloadModule: (moduleUrl: string) => {
    const link = document.createElement('link');
    link.rel = 'modulepreload';
    link.href = moduleUrl;
    document.head.appendChild(link);
  },

  // Prefetch module
  prefetchModule: (moduleUrl: string) => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = moduleUrl;
    document.head.appendChild(link);
  }
};

// Resource optimization utilities
export const resourceUtils = {
  // Preload critical resources
  preloadResource: (
    href: string,
    as: 'script' | 'style' | 'font' | 'image' | 'fetch',
    crossorigin?: 'anonymous' | 'use-credentials'
  ) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    if (crossorigin) {
      link.crossOrigin = crossorigin;
    }
    document.head.appendChild(link);
  },

  // Prefetch resources
  prefetchResource: (href: string) => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = href;
    document.head.appendChild(link);
  },

  // Preconnect to external domains
  preconnect: (href: string, crossorigin?: boolean) => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = href;
    if (crossorigin) {
      link.crossOrigin = 'anonymous';
    }
    document.head.appendChild(link);
  },

  // DNS prefetch
  dnsPrefetch: (href: string) => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = href;
    document.head.appendChild(link);
  }
};

// Image optimization utilities
export const imageUtils = {
  // Generate responsive image srcset
  generateSrcSet: (
    baseUrl: string,
    sizes: number[],
    format: 'webp' | 'jpg' | 'png' = 'webp'
  ): string => {
    return sizes
      .map(size => `${baseUrl}?w=${size}&f=${format} ${size}w`)
      .join(', ');
  },

  // Generate sizes attribute
  generateSizes: (breakpoints: { [key: string]: string }): string => {
    return Object.entries(breakpoints)
      .map(([breakpoint, size]) => `(max-width: ${breakpoint}) ${size}`)
      .join(', ');
  },

  // Create optimized image element
  createOptimizedImage: (
    src: string,
    alt: string,
    options: {
      sizes?: number[];
      breakpoints?: { [key: string]: string };
      format?: 'webp' | 'jpg' | 'png';
      lazy?: boolean;
      placeholder?: string;
    } = {}
  ): HTMLImageElement => {
    const {
      sizes = [320, 640, 768, 1024, 1280, 1920],
      breakpoints = {
        '768px': '100vw',
        '1024px': '50vw',
        '1280px': '33vw'
      },
      format = 'webp',
      lazy = true,
      placeholder
    } = options;

    const img = document.createElement('img');
    img.alt = alt;
    img.srcset = imageUtils.generateSrcSet(src, sizes, format);
    img.sizes = imageUtils.generateSizes(breakpoints);
    
    if (lazy) {
      img.loading = 'lazy';
      img.decoding = 'async';
    }

    if (placeholder) {
      img.src = placeholder;
      img.dataset.src = src;
    } else {
      img.src = src;
    }

    return img;
  }
};

// Memory management utilities
export const memoryUtils = {
  // Cleanup event listeners
  cleanupEventListeners: (
    element: HTMLElement,
    events: { [event: string]: EventListener }
  ) => {
    Object.entries(events).forEach(([event, listener]) => {
      element.removeEventListener(event, listener);
    });
  },

  // Cleanup intersection observers
  cleanupObservers: (observers: IntersectionObserver[]) => {
    observers.forEach(observer => {
      observer.disconnect();
    });
  },

  // Cleanup timeouts and intervals
  cleanupTimers: (timers: (NodeJS.Timeout | number)[]) => {
    timers.forEach(timer => {
      if (typeof timer === 'number') {
        clearTimeout(timer);
        clearInterval(timer);
      } else {
        clearTimeout(timer);
        clearInterval(timer);
      }
    });
  },

  // Memory usage monitoring
  getMemoryUsage: (): MemoryInfo | null => {
    if ('memory' in performance) {
      return (performance as any).memory;
    }
    return null;
  },

  // Log memory usage
  logMemoryUsage: (label: string = 'Memory Usage') => {
    const memory = memoryUtils.getMemoryUsage();
    if (memory) {
      console.group(`📊 ${label}`);
      console.log(`Used: ${(memory.usedJSHeapSize / 1048576).toFixed(2)} MB`);
      console.log(`Total: ${(memory.totalJSHeapSize / 1048576).toFixed(2)} MB`);
      console.log(`Limit: ${(memory.jsHeapSizeLimit / 1048576).toFixed(2)} MB`);
      console.groupEnd();
    }
  }
};

// Performance monitoring utilities
export const performanceUtils = {
  // Measure function execution time
  measureTime: async <T>(
    fn: () => Promise<T> | T,
    label: string = 'Function'
  ): Promise<T> => {
    const start = performance.now();
    const result = await fn();
    const end = performance.now();
    console.log(`⏱️ ${label} took ${(end - start).toFixed(2)}ms`);
    return result;
  },

  // Create performance mark
  mark: (name: string) => {
    if ('mark' in performance) {
      performance.mark(name);
    }
  },

  // Measure between marks
  measure: (name: string, startMark: string, endMark?: string) => {
    if ('measure' in performance) {
      performance.measure(name, startMark, endMark);
    }
  },

  // Get performance entries
  getEntries: (type?: string): PerformanceEntry[] => {
    if (type) {
      return performance.getEntriesByType(type);
    }
    return performance.getEntries();
  },

  // Monitor Core Web Vitals
  monitorWebVitals: () => {
    // First Contentful Paint
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        console.log(`📈 ${entry.name}: ${entry.startTime.toFixed(2)}ms`);
      });
    });

    observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'first-input'] });

    // Cumulative Layout Shift
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
          console.log(`📊 Cumulative Layout Shift: ${clsValue.toFixed(4)}`);
        }
      });
    });

    clsObserver.observe({ entryTypes: ['layout-shift'] });

    return () => {
      observer.disconnect();
      clsObserver.disconnect();
    };
  },

  // Get navigation timing
  getNavigationTiming: () => {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigation) {
      return {
        dns: navigation.domainLookupEnd - navigation.domainLookupStart,
        tcp: navigation.connectEnd - navigation.connectStart,
        ssl: navigation.secureConnectionStart > 0 ? navigation.connectEnd - navigation.secureConnectionStart : 0,
        ttfb: navigation.responseStart - navigation.requestStart,
        download: navigation.responseEnd - navigation.responseStart,
        domParsing: navigation.domContentLoadedEventStart - navigation.responseEnd,
        resourceLoading: navigation.loadEventStart - navigation.domContentLoadedEventStart
      };
    }
    return null;
  }
};

// Bundle analysis utilities
export const bundleUtils = {
  // Analyze bundle size
  analyzeBundleSize: () => {
    const scripts = Array.from(document.querySelectorAll('script[src]'));
    const styles = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
    
    console.group('📦 Bundle Analysis');
    console.log(`Scripts: ${scripts.length}`);
    console.log(`Stylesheets: ${styles.length}`);
    
    scripts.forEach((script: HTMLScriptElement) => {
      console.log(`Script: ${script.src}`);
    });
    
    styles.forEach((style: HTMLLinkElement) => {
      console.log(`Stylesheet: ${style.href}`);
    });
    
    console.groupEnd();
  },

  // Check for unused CSS
  checkUnusedCSS: () => {
    const stylesheets = Array.from(document.styleSheets);
    const usedSelectors = new Set<string>();
    
    stylesheets.forEach(stylesheet => {
      try {
        const rules = Array.from(stylesheet.cssRules || []);
        rules.forEach(rule => {
          if (rule instanceof CSSStyleRule) {
            const elements = document.querySelectorAll(rule.selectorText);
            if (elements.length > 0) {
              usedSelectors.add(rule.selectorText);
            }
          }
        });
      } catch (e) {
        // Cross-origin stylesheets may throw errors
        console.warn('Cannot analyze cross-origin stylesheet:', stylesheet.href);
      }
    });
    
    console.log(`🎨 Used CSS selectors: ${usedSelectors.size}`);
    return usedSelectors;
  }
};

// Caching utilities
export const cacheUtils = {
  // Service worker cache management
  cacheResource: async (cacheName: string, url: string) => {
    if ('caches' in window) {
      const cache = await caches.open(cacheName);
      await cache.add(url);
    }
  },

  // Get cached resource
  getCachedResource: async (cacheName: string, url: string): Promise<Response | undefined> => {
    if ('caches' in window) {
      const cache = await caches.open(cacheName);
      return await cache.match(url);
    }
    return undefined;
  },

  // Clear cache
  clearCache: async (cacheName: string) => {
    if ('caches' in window) {
      await caches.delete(cacheName);
    }
  },

  // Local storage cache with expiration
  setCache: (key: string, data: any, expirationMinutes: number = 60) => {
    const item = {
      data,
      expiration: Date.now() + (expirationMinutes * 60 * 1000)
    };
    localStorage.setItem(key, JSON.stringify(item));
  },

  // Get from local storage cache
  getCache: (key: string): any | null => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;

    try {
      const item = JSON.parse(itemStr);
      if (Date.now() > item.expiration) {
        localStorage.removeItem(key);
        return null;
      }
      return item.data;
    } catch {
      localStorage.removeItem(key);
      return null;
    }
  }
};

// Network optimization utilities
export const networkUtils = {
  // Check connection type
  getConnectionType: (): string => {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      return connection.effectiveType || 'unknown';
    }
    return 'unknown';
  },

  // Check if connection is slow
  isSlowConnection: (): boolean => {
    const connectionType = networkUtils.getConnectionType();
    return ['slow-2g', '2g'].includes(connectionType);
  },

  // Adaptive loading based on connection
  shouldLoadHighQuality: (): boolean => {
    const connection = networkUtils.getConnectionType();
    const isSlowConnection = networkUtils.isSlowConnection();
    const saveData = 'connection' in navigator && (navigator as any).connection.saveData;
    
    return !isSlowConnection && !saveData && ['4g'].includes(connection);
  },

  // Preload critical resources based on connection
  preloadCriticalResources: (resources: string[]) => {
    if (!networkUtils.isSlowConnection()) {
      resources.forEach(resource => {
        resourceUtils.preloadResource(resource, 'fetch');
      });
    }
  }
};

export default {
  lazyLoadUtils,
  codeSplittingUtils,
  resourceUtils,
  imageUtils,
  memoryUtils,
  performanceUtils,
  bundleUtils,
  cacheUtils,
  networkUtils
};