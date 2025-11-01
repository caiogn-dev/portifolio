import { renderHook } from '@testing-library/react'
import { useIntersectionObserver } from '@/lib/hooks'

// Mock IntersectionObserver
const mockIntersectionObserver = jest.fn()
const mockObserve = jest.fn()
const mockUnobserve = jest.fn()
const mockDisconnect = jest.fn()

beforeEach(() => {
  mockIntersectionObserver.mockImplementation((callback) => ({
    observe: mockObserve,
    unobserve: mockUnobserve,
    disconnect: mockDisconnect,
    callback
  }))
  
  global.IntersectionObserver = mockIntersectionObserver
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('useIntersectionObserver', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useIntersectionObserver())
    
    expect(result.current.isIntersecting).toBe(false)
    expect(result.current.ref).toBeDefined()
    expect(typeof result.current.ref).toBe('object')
  })

  it('should create IntersectionObserver with default options', () => {
    renderHook(() => useIntersectionObserver())
    
    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      {
        threshold: 0.1,
        rootMargin: '0px',
        root: null
      }
    )
  })

  it('should create IntersectionObserver with custom options', () => {
    const customOptions = {
      threshold: 0.5,
      rootMargin: '10px',
      root: document.body
    }
    
    renderHook(() => useIntersectionObserver(customOptions))
    
    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      customOptions
    )
  })

  it('should observe element when ref is set', () => {
    const { result } = renderHook(() => useIntersectionObserver())
    
    // Simulate setting a ref
    const mockElement = document.createElement('div')
    result.current.ref.current = mockElement
    
    // Re-render to trigger useEffect
    renderHook(() => useIntersectionObserver())
    
    expect(mockObserve).toHaveBeenCalledWith(mockElement)
  })

  it('should update isIntersecting when intersection changes', () => {
    let observerCallback: (entries: IntersectionObserverEntry[]) => void
    
    mockIntersectionObserver.mockImplementation((callback) => {
      observerCallback = callback
      return {
        observe: mockObserve,
        unobserve: mockUnobserve,
        disconnect: mockDisconnect
      }
    })
    
    const { result } = renderHook(() => useIntersectionObserver())
    
    // Simulate intersection
    const mockEntry = {
      isIntersecting: true,
      target: document.createElement('div'),
      intersectionRatio: 0.5,
      boundingClientRect: {} as DOMRectReadOnly,
      intersectionRect: {} as DOMRectReadOnly,
      rootBounds: {} as DOMRectReadOnly,
      time: Date.now()
    } as IntersectionObserverEntry
    
    observerCallback!([mockEntry])
    
    expect(result.current.isIntersecting).toBe(true)
  })

  it('should disconnect observer on unmount', () => {
    const { unmount } = renderHook(() => useIntersectionObserver())
    
    unmount()
    
    expect(mockDisconnect).toHaveBeenCalled()
  })

  it('should handle multiple threshold values', () => {
    const options = {
      threshold: [0, 0.25, 0.5, 0.75, 1]
    }
    
    renderHook(() => useIntersectionObserver(options))
    
    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      expect.objectContaining({
        threshold: [0, 0.25, 0.5, 0.75, 1]
      })
    )
  })

  it('should handle rootMargin as string', () => {
    const options = {
      rootMargin: '10px 20px 30px 40px'
    }
    
    renderHook(() => useIntersectionObserver(options))
    
    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      expect.objectContaining({
        rootMargin: '10px 20px 30px 40px'
      })
    )
  })

  it('should not observe if ref is null', () => {
    const { result } = renderHook(() => useIntersectionObserver())
    
    // Ensure ref is null
    result.current.ref.current = null
    
    expect(mockObserve).not.toHaveBeenCalled()
  })

  it('should handle intersection ratio changes', () => {
    let observerCallback: (entries: IntersectionObserverEntry[]) => void
    
    mockIntersectionObserver.mockImplementation((callback) => {
      observerCallback = callback
      return {
        observe: mockObserve,
        unobserve: mockUnobserve,
        disconnect: mockDisconnect
      }
    })
    
    const { result } = renderHook(() => useIntersectionObserver())
    
    // Simulate different intersection ratios
    const createMockEntry = (isIntersecting: boolean, ratio: number) => ({
      isIntersecting,
      intersectionRatio: ratio,
      target: document.createElement('div'),
      boundingClientRect: {} as DOMRectReadOnly,
      intersectionRect: {} as DOMRectReadOnly,
      rootBounds: {} as DOMRectReadOnly,
      time: Date.now()
    } as IntersectionObserverEntry)
    
    // First intersection
    observerCallback!([createMockEntry(true, 0.5)])
    expect(result.current.isIntersecting).toBe(true)
    
    // No longer intersecting
    observerCallback!([createMockEntry(false, 0)])
    expect(result.current.isIntersecting).toBe(false)
  })

  it('should work with custom root element', () => {
    const customRoot = document.createElement('div')
    const options = {
      root: customRoot
    }
    
    renderHook(() => useIntersectionObserver(options))
    
    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      expect.objectContaining({
        root: customRoot
      })
    )
  })

  it('should handle edge case with zero threshold', () => {
    const options = {
      threshold: 0
    }
    
    renderHook(() => useIntersectionObserver(options))
    
    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      expect.objectContaining({
        threshold: 0
      })
    )
  })

  it('should handle edge case with threshold of 1', () => {
    const options = {
      threshold: 1
    }
    
    renderHook(() => useIntersectionObserver(options))
    
    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      expect.objectContaining({
        threshold: 1
      })
    )
  })
})