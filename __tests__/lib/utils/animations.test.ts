import {
  getAnimationVariants,
  createSlideVariants,
  createStaggerVariants,
  createScaleVariants,
  createRotateVariants,
  fadeVariants,
  slideVariants,
  scaleVariants,
  rotateVariants,
  cardHoverVariants,
  buttonHoverVariants
} from '@/lib/utils/animations'

describe('Animation Utils', () => {
  describe('getAnimationVariants', () => {
    it('returns the provided variants object', () => {
      const testVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
      }
      
      const result = getAnimationVariants(testVariants)
      expect(result).toEqual(testVariants)
    })

    it('handles empty variants object', () => {
      const result = getAnimationVariants({})
      expect(result).toEqual({})
    })
  })

  describe('createSlideVariants', () => {
    it('creates slide variants for up direction', () => {
      const variants = createSlideVariants('up', 20)
      
      expect(variants).toHaveProperty('hidden')
      expect(variants).toHaveProperty('visible')
      expect(variants.hidden).toHaveProperty('y', 20)
      expect(variants.visible).toHaveProperty('y', 0)
    })

    it('creates slide variants for down direction', () => {
      const variants = createSlideVariants('down', 30)
      
      expect(variants.hidden).toHaveProperty('y', -30)
      expect(variants.visible).toHaveProperty('y', 0)
    })

    it('creates slide variants for left direction', () => {
      const variants = createSlideVariants('left', 40)
      
      expect(variants.hidden).toHaveProperty('x', 40)
      expect(variants.visible).toHaveProperty('x', 0)
    })

    it('creates slide variants for right direction', () => {
      const variants = createSlideVariants('right', 50)
      
      expect(variants.hidden).toHaveProperty('x', -50)
      expect(variants.visible).toHaveProperty('x', 0)
    })

    it('uses default distance when not provided', () => {
      const variants = createSlideVariants('up')
      
      expect(variants.hidden).toHaveProperty('y', 20)
    })
  })

  describe('createStaggerVariants', () => {
    it('creates stagger variants with specified delay', () => {
      const variants = createStaggerVariants(0.2)
      
      expect(variants).toHaveProperty('hidden')
      expect(variants).toHaveProperty('visible')
      expect(variants.visible).toHaveProperty('transition')
      expect(variants.visible.transition).toHaveProperty('staggerChildren', 0.2)
    })

    it('uses default delay when not provided', () => {
      const variants = createStaggerVariants()
      
      expect(variants.visible.transition).toHaveProperty('staggerChildren', 0.1)
    })

    it('includes delayChildren property', () => {
      const variants = createStaggerVariants(0.3)
      
      expect(variants.visible.transition).toHaveProperty('delayChildren', 0.1)
    })
  })

  describe('createScaleVariants', () => {
    it('creates scale variants with specified scale', () => {
      const variants = createScaleVariants(0.8)
      
      expect(variants.hidden).toHaveProperty('scale', 0.8)
      expect(variants.visible).toHaveProperty('scale', 1)
    })

    it('uses default scale when not provided', () => {
      const variants = createScaleVariants()
      
      expect(variants.hidden).toHaveProperty('scale', 0.9)
    })

    it('includes opacity changes', () => {
      const variants = createScaleVariants(0.5)
      
      expect(variants.hidden).toHaveProperty('opacity', 0)
      expect(variants.visible).toHaveProperty('opacity', 1)
    })
  })

  describe('createRotateVariants', () => {
    it('creates rotate variants with specified angle', () => {
      const variants = createRotateVariants(45)
      
      expect(variants.hidden).toHaveProperty('rotate', 45)
      expect(variants.visible).toHaveProperty('rotate', 0)
    })

    it('uses default angle when not provided', () => {
      const variants = createRotateVariants()
      
      expect(variants.hidden).toHaveProperty('rotate', 180)
    })

    it('includes opacity changes', () => {
      const variants = createRotateVariants(90)
      
      expect(variants.hidden).toHaveProperty('opacity', 0)
      expect(variants.visible).toHaveProperty('opacity', 1)
    })
  })

  describe('Pre-defined variants', () => {
    it('fadeVariants has correct structure', () => {
      expect(fadeVariants).toHaveProperty('hidden')
      expect(fadeVariants).toHaveProperty('visible')
      expect(fadeVariants.hidden).toHaveProperty('opacity', 0)
      expect(fadeVariants.visible).toHaveProperty('opacity', 1)
    })

    it('slideVariants has correct structure', () => {
      expect(slideVariants).toHaveProperty('hidden')
      expect(slideVariants).toHaveProperty('visible')
      expect(slideVariants.hidden).toHaveProperty('y')
      expect(slideVariants.visible).toHaveProperty('y', 0)
    })

    it('scaleVariants has correct structure', () => {
      expect(scaleVariants).toHaveProperty('hidden')
      expect(scaleVariants).toHaveProperty('visible')
      expect(scaleVariants.hidden).toHaveProperty('scale')
      expect(scaleVariants.visible).toHaveProperty('scale', 1)
    })

    it('rotateVariants has correct structure', () => {
      expect(rotateVariants).toHaveProperty('hidden')
      expect(rotateVariants).toHaveProperty('visible')
      expect(rotateVariants.hidden).toHaveProperty('rotate')
      expect(rotateVariants.visible).toHaveProperty('rotate', 0)
    })
  })

  describe('Hover variants', () => {
    it('cardHoverVariants has correct structure', () => {
      expect(cardHoverVariants).toHaveProperty('rest')
      expect(cardHoverVariants).toHaveProperty('hover')
      expect(cardHoverVariants.hover).toHaveProperty('scale')
      expect(cardHoverVariants.hover).toHaveProperty('y')
    })

    it('buttonHoverVariants has correct structure', () => {
      expect(buttonHoverVariants).toHaveProperty('rest')
      expect(buttonHoverVariants).toHaveProperty('hover')
      expect(buttonHoverVariants).toHaveProperty('tap')
      expect(buttonHoverVariants.hover).toHaveProperty('scale')
      expect(buttonHoverVariants.tap).toHaveProperty('scale')
    })
  })

  describe('Animation properties', () => {
    it('includes transition properties in visible states', () => {
      const slideVars = createSlideVariants('up')
      const scaleVars = createScaleVariants()
      const rotateVars = createRotateVariants()
      
      expect(slideVars.visible).toHaveProperty('transition')
      expect(scaleVars.visible).toHaveProperty('transition')
      expect(rotateVars.visible).toHaveProperty('transition')
    })

    it('has reasonable transition durations', () => {
      const variants = createSlideVariants('up')
      
      expect(variants.visible.transition).toHaveProperty('duration')
      expect(typeof variants.visible.transition.duration).toBe('number')
      expect(variants.visible.transition.duration).toBeGreaterThan(0)
      expect(variants.visible.transition.duration).toBeLessThan(2)
    })

    it('uses appropriate easing functions', () => {
      const variants = createSlideVariants('up')
      
      expect(variants.visible.transition).toHaveProperty('ease')
      expect(typeof variants.visible.transition.ease).toBe('string')
    })
  })

  describe('Edge cases', () => {
    it('handles zero distance for slide variants', () => {
      const variants = createSlideVariants('up', 0)
      
      expect(variants.hidden).toHaveProperty('y', 0)
      expect(variants.visible).toHaveProperty('y', 0)
    })

    it('handles negative distance for slide variants', () => {
      const variants = createSlideVariants('up', -10)
      
      expect(variants.hidden).toHaveProperty('y', -10)
    })

    it('handles zero scale for scale variants', () => {
      const variants = createScaleVariants(0)
      
      expect(variants.hidden).toHaveProperty('scale', 0)
    })

    it('handles zero angle for rotate variants', () => {
      const variants = createRotateVariants(0)
      
      expect(variants.hidden).toHaveProperty('rotate', 0)
      expect(variants.visible).toHaveProperty('rotate', 0)
    })

    it('handles zero delay for stagger variants', () => {
      const variants = createStaggerVariants(0)
      
      expect(variants.visible.transition).toHaveProperty('staggerChildren', 0)
    })
  })

  describe('Type safety', () => {
    it('returns objects with correct property types', () => {
      const slideVars = createSlideVariants('up', 20)
      
      expect(typeof slideVars.hidden.opacity).toBe('number')
      expect(typeof slideVars.hidden.y).toBe('number')
      expect(typeof slideVars.visible.opacity).toBe('number')
      expect(typeof slideVars.visible.y).toBe('number')
    })

    it('transition properties have correct types', () => {
      const variants = createSlideVariants('up')
      const transition = variants.visible.transition
      
      expect(typeof transition.duration).toBe('number')
      expect(typeof transition.ease).toBe('string')
    })
  })
})