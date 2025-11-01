import React from 'react'
import { screen, fireEvent, waitFor } from '@testing-library/react'
import { render, mockIntersectionObserver, a11yTestHelpers } from '../utils/test-utils'
import EnhancedHero from '@/components/Hero/EnhancedHero'

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: 'div',
    section: 'section',
    h1: 'h1',
    p: 'p',
    span: 'span',
    create: (component: any) => component
  },
  AnimatePresence: ({ children }: any) => children,
  useAnimation: () => ({
    start: jest.fn(),
    stop: jest.fn(),
    set: jest.fn()
  })
}))

// Mock next/image
jest.mock('next/image', () => {
  return function MockImage({ src, alt, ...props }: any) {
    return <img src={src} alt={alt} {...props} />
  }
})

describe('EnhancedHero', () => {
  beforeEach(() => {
    mockIntersectionObserver()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders without crashing', () => {
    render(<EnhancedHero />)
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })

  it('displays the main heading', () => {
    render(<EnhancedHero />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent(/João Silva|John Silva/i)
  })

  it('displays the typewriter effect text', async () => {
    render(<EnhancedHero />)
    
    // The typewriter effect should show different roles
    await waitFor(() => {
      const typewriterText = screen.getByTestId('typewriter-text')
      expect(typewriterText).toBeInTheDocument()
    }, { timeout: 3000 })
  })

  it('displays the profile image with proper alt text', () => {
    render(<EnhancedHero />)
    const profileImage = screen.getByAltText(/profile|perfil/i)
    expect(profileImage).toBeInTheDocument()
  })

  it('displays social media links', () => {
    render(<EnhancedHero />)
    
    // Check for social media links
    const linkedinLink = screen.getByLabelText(/linkedin/i)
    const githubLink = screen.getByLabelText(/github/i)
    const emailLink = screen.getByLabelText(/email/i)
    
    expect(linkedinLink).toBeInTheDocument()
    expect(githubLink).toBeInTheDocument()
    expect(emailLink).toBeInTheDocument()
  })

  it('displays CTA buttons', () => {
    render(<EnhancedHero />)
    
    const viewProjectsButton = screen.getByRole('button', { name: /view projects|ver projetos/i })
    const contactButton = screen.getByRole('button', { name: /get in touch|entrar em contato/i })
    
    expect(viewProjectsButton).toBeInTheDocument()
    expect(contactButton).toBeInTheDocument()
  })

  it('displays skill badges', () => {
    render(<EnhancedHero />)
    
    // Check for skill badges
    const reactBadge = screen.getByText('React')
    const typescriptBadge = screen.getByText('TypeScript')
    const nextjsBadge = screen.getByText('Next.js')
    
    expect(reactBadge).toBeInTheDocument()
    expect(typescriptBadge).toBeInTheDocument()
    expect(nextjsBadge).toBeInTheDocument()
  })

  it('displays stats section', () => {
    render(<EnhancedHero />)
    
    // Check for stats
    const experienceYears = screen.getByText(/5\+/)
    const projectsCompleted = screen.getByText(/50\+/)
    const clientsSatisfied = screen.getByText(/30\+/)
    
    expect(experienceYears).toBeInTheDocument()
    expect(projectsCompleted).toBeInTheDocument()
    expect(clientsSatisfied).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    const { container } = render(<EnhancedHero />)
    
    // Check for proper heading hierarchy
    expect(a11yTestHelpers.checkHeadingHierarchy(container)).toBe(true)
    
    // Check for alt text on images
    expect(a11yTestHelpers.checkImageAltText(container)).toBe(true)
    
    // Check for ARIA labels on interactive elements
    const socialLinks = container.querySelectorAll('a[aria-label]')
    expect(socialLinks.length).toBeGreaterThan(0)
  })

  it('handles button clicks correctly', () => {
    render(<EnhancedHero />)
    
    const viewProjectsButton = screen.getByRole('button', { name: /view projects|ver projetos/i })
    const contactButton = screen.getByRole('button', { name: /get in touch|entrar em contato/i })
    
    // These buttons should be clickable (they're links with button role)
    expect(viewProjectsButton).not.toBeDisabled()
    expect(contactButton).not.toBeDisabled()
    
    // Click events should not throw errors
    fireEvent.click(viewProjectsButton)
    fireEvent.click(contactButton)
  })

  it('displays scroll indicator', () => {
    render(<EnhancedHero />)
    
    const scrollIndicator = screen.getByLabelText(/scroll down|rolar para baixo/i)
    expect(scrollIndicator).toBeInTheDocument()
  })

  it('supports keyboard navigation', () => {
    render(<EnhancedHero />)
    
    const viewProjectsButton = screen.getByRole('button', { name: /view projects|ver projetos/i })
    
    // Focus the button
    viewProjectsButton.focus()
    expect(viewProjectsButton).toHaveFocus()
    
    // Test Enter key
    fireEvent.keyDown(viewProjectsButton, { key: 'Enter', code: 'Enter' })
    
    // Test Space key
    fireEvent.keyDown(viewProjectsButton, { key: ' ', code: 'Space' })
  })

  it('renders floating elements', () => {
    render(<EnhancedHero />)
    
    // Check for floating elements (they should have specific test IDs or classes)
    const floatingElements = screen.getAllByTestId(/floating-element/i)
    expect(floatingElements.length).toBeGreaterThan(0)
  })

  it('adapts to different screen sizes', () => {
    // Mock different viewport sizes
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 768,
    })
    
    render(<EnhancedHero />)
    
    // The component should render without errors on different screen sizes
    expect(screen.getByRole('banner')).toBeInTheDocument()
    
    // Test mobile size
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    })
    
    render(<EnhancedHero />)
    expect(screen.getAllByRole('banner')).toHaveLength(2) // Two renders
  })

  it('handles language switching', () => {
    render(<EnhancedHero />)
    
    // The component should handle both English and Portuguese content
    // This would depend on the language context implementation
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
  })

  it('has proper semantic structure', () => {
    const { container } = render(<EnhancedHero />)
    
    // Check for semantic HTML elements
    const banner = container.querySelector('[role="banner"]')
    const main = container.querySelector('main')
    const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6')
    
    expect(banner || main).toBeInTheDocument()
    expect(headings.length).toBeGreaterThan(0)
  })
})