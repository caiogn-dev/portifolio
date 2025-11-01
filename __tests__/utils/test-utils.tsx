import React, { ReactElement } from 'react'
import { render, RenderOptions, RenderResult } from '@testing-library/react'
import { Provider } from '@/components/ui/provider'
import { AppProvider } from '@/lib/context/AppContext'
import ErrorBoundary from '@/components/ErrorHandling/ErrorBoundary'

// Custom render function that includes providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ErrorBoundary>
      <AppProvider>
        <Provider>
          {children}
        </Provider>
      </AppProvider>
    </ErrorBoundary>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
): RenderResult => render(ui, { wrapper: AllTheProviders, ...options })

// Re-export everything
export * from '@testing-library/react'
export { customRender as render }

// Custom render without providers
export const renderWithoutProviders = (
  ui: ReactElement,
  options?: RenderOptions
): RenderResult => render(ui, options)

// Mock intersection observer
export const mockIntersectionObserver = () => {
  const mockIntersectionObserver = jest.fn()
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null
  })
  window.IntersectionObserver = mockIntersectionObserver
  window.IntersectionObserverEntry = jest.fn()
}

// Mock resize observer
export const mockResizeObserver = () => {
  const mockResizeObserver = jest.fn()
  mockResizeObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null
  })
  window.ResizeObserver = mockResizeObserver
}

// Mock match media
export const mockMatchMedia = (matches: boolean = false) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  })
}

// Mock local storage
export const mockLocalStorage = () => {
  const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  }
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock
  })
  return localStorageMock
}

// Mock fetch
export const mockFetch = (response: any, ok: boolean = true) => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok,
      json: () => Promise.resolve(response),
      text: () => Promise.resolve(JSON.stringify(response)),
    })
  ) as jest.Mock
}

// Mock console methods
export const mockConsole = () => {
  const originalConsole = { ...console }
  console.log = jest.fn()
  console.warn = jest.fn()
  console.error = jest.fn()
  console.info = jest.fn()
  
  return {
    restore: () => {
      Object.assign(console, originalConsole)
    }
  }
}

// Create mock component
export const createMockComponent = (name: string) => {
  const MockComponent = ({ children, ...props }: any) => (
    <div data-testid={`mock-${name.toLowerCase()}`} {...props}>
      {children}
    </div>
  )
  MockComponent.displayName = `Mock${name}`
  return MockComponent
}

// Wait for async operations
export const waitFor = (callback: () => void, timeout: number = 1000) => {
  return new Promise((resolve, reject) => {
    const startTime = Date.now()
    
    const check = () => {
      try {
        callback()
        resolve(true)
      } catch (error) {
        if (Date.now() - startTime >= timeout) {
          reject(error)
        } else {
          setTimeout(check, 10)
        }
      }
    }
    
    check()
  })
}

// Simulate user interaction
export const simulateUserInteraction = {
  click: (element: HTMLElement) => {
    element.click()
  },
  
  type: (element: HTMLInputElement, text: string) => {
    element.focus()
    element.value = text
    element.dispatchEvent(new Event('input', { bubbles: true }))
    element.dispatchEvent(new Event('change', { bubbles: true }))
  },
  
  keyDown: (element: HTMLElement, key: string) => {
    element.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }))
  },
  
  scroll: (element: HTMLElement, scrollTop: number) => {
    element.scrollTop = scrollTop
    element.dispatchEvent(new Event('scroll', { bubbles: true }))
  }
}

// Test data generators
export const testDataGenerators = {
  // Generate random string
  randomString: (length: number = 10) => {
    return Math.random().toString(36).substring(2, length + 2)
  },
  
  // Generate random number
  randomNumber: (min: number = 0, max: number = 100) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  },
  
  // Generate random email
  randomEmail: () => {
    return `${testDataGenerators.randomString(8)}@example.com`
  },
  
  // Generate random URL
  randomUrl: () => {
    return `https://example.com/${testDataGenerators.randomString(8)}`
  },
  
  // Generate mock user
  mockUser: () => ({
    id: testDataGenerators.randomString(8),
    name: `Test User ${testDataGenerators.randomNumber(1, 1000)}`,
    email: testDataGenerators.randomEmail(),
    avatar: testDataGenerators.randomUrl()
  }),
  
  // Generate mock project
  mockProject: () => ({
    id: testDataGenerators.randomString(8),
    title: `Test Project ${testDataGenerators.randomNumber(1, 100)}`,
    description: `This is a test project description ${testDataGenerators.randomString(20)}`,
    image: testDataGenerators.randomUrl(),
    technologies: ['React', 'TypeScript', 'Next.js'],
    githubUrl: testDataGenerators.randomUrl(),
    liveUrl: testDataGenerators.randomUrl(),
    featured: Math.random() > 0.5
  }),
  
  // Generate mock blog post
  mockBlogPost: () => ({
    id: testDataGenerators.randomString(8),
    title: `Test Blog Post ${testDataGenerators.randomNumber(1, 100)}`,
    excerpt: `This is a test blog post excerpt ${testDataGenerators.randomString(30)}`,
    content: `This is test blog post content ${testDataGenerators.randomString(100)}`,
    image: testDataGenerators.randomUrl(),
    publishedAt: new Date().toISOString(),
    author: 'Test Author',
    category: 'Technology',
    tags: ['React', 'Testing', 'JavaScript'],
    views: testDataGenerators.randomNumber(100, 10000),
    likes: testDataGenerators.randomNumber(10, 1000)
  })
}

// Accessibility testing helpers
export const a11yTestHelpers = {
  // Check for ARIA attributes
  hasAriaLabel: (element: HTMLElement) => {
    return element.hasAttribute('aria-label') || element.hasAttribute('aria-labelledby')
  },
  
  // Check for proper heading hierarchy
  checkHeadingHierarchy: (container: HTMLElement) => {
    const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6')
    const levels = Array.from(headings).map(h => parseInt(h.tagName.charAt(1)))
    
    for (let i = 1; i < levels.length; i++) {
      if (levels[i] > levels[i - 1] + 1) {
        return false
      }
    }
    return true
  },
  
  // Check for alt text on images
  checkImageAltText: (container: HTMLElement) => {
    const images = container.querySelectorAll('img')
    return Array.from(images).every(img => img.hasAttribute('alt'))
  },
  
  // Check for form labels
  checkFormLabels: (container: HTMLElement) => {
    const inputs = container.querySelectorAll('input, select, textarea')
    return Array.from(inputs).every(input => {
      const id = input.getAttribute('id')
      const ariaLabel = input.getAttribute('aria-label')
      const ariaLabelledBy = input.getAttribute('aria-labelledby')
      const label = id ? container.querySelector(`label[for="${id}"]`) : null
      
      return ariaLabel || ariaLabelledBy || label
    })
  }
}

// Performance testing helpers
export const performanceTestHelpers = {
  // Measure render time
  measureRenderTime: async (renderFn: () => void) => {
    const start = performance.now()
    await renderFn()
    const end = performance.now()
    return end - start
  },
  
  // Check for memory leaks
  checkMemoryUsage: () => {
    if ('memory' in performance) {
      return (performance as any).memory
    }
    return null
  },
  
  // Simulate slow network
  simulateSlowNetwork: () => {
    Object.defineProperty(navigator, 'connection', {
      writable: true,
      value: {
        effectiveType: '2g',
        saveData: true
      }
    })
  }
}

// Animation testing helpers
export const animationTestHelpers = {
  // Mock framer motion
  mockFramerMotion: () => {
    jest.mock('framer-motion', () => ({
      motion: {
        div: 'div',
        span: 'span',
        button: 'button',
        section: 'section',
        article: 'article',
        create: (component: any) => component
      },
      AnimatePresence: ({ children }: any) => children,
      useAnimation: () => ({
        start: jest.fn(),
        stop: jest.fn(),
        set: jest.fn()
      })
    }))
  },
  
  // Disable animations for testing
  disableAnimations: () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    })
  }
}

export default {
  mockIntersectionObserver,
  mockResizeObserver,
  mockMatchMedia,
  mockLocalStorage,
  mockFetch,
  mockConsole,
  createMockComponent,
  waitFor,
  simulateUserInteraction,
  testDataGenerators,
  a11yTestHelpers,
  performanceTestHelpers,
  animationTestHelpers
}