'use client';

import { motion, useInView } from 'framer-motion';
import { ReactNode, useRef } from 'react';
import { getAnimationVariants, createSlideVariants, baseTransition } from '@/lib/utils/animations';
import { AnimationProps } from '@/lib/types';

interface AnimatedSectionProps extends AnimationProps {
  children: ReactNode;
  className?: string;
  id?: string;
  threshold?: number;
  triggerOnce?: boolean;
  as?: keyof JSX.IntrinsicElements;
}

export default function AnimatedSection({ 
  children, 
  delay = 0,
  duration = 0.6,
  direction = 'up',
  distance = 30,
  once = true,
  className,
  id,
  threshold = 0.3,
  triggerOnce = true,
  as: Component = 'section'
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    threshold,
    once: triggerOnce
  });

  const variants = getAnimationVariants(
    createSlideVariants(direction, distance)
  );

  const transition = {
    ...baseTransition,
    duration,
    delay,
    type: 'spring',
    stiffness: 100,
    damping: 20
  };

  const MotionComponent = motion[Component as keyof typeof motion] as any;

  return (
    <MotionComponent
      ref={ref}
      id={id}
      className={className}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={transition}
      style={{
        willChange: 'transform, opacity'
      }}
    >
      {children}
    </MotionComponent>
  );
}