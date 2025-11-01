'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Spinner,
  Progress,
  Skeleton,
  SkeletonText,
  SkeletonCircle,
  Grid,
  GridItem,
  useBreakpointValue
} from '@chakra-ui/react';
import { useColorModeValue } from '@/components/ui/color-mode';

// Enhanced motion components
const MotionBox = motion.create(Box);
const MotionText = motion.create(Text);

// Loading spinner variants
const spinnerVariants = {
  start: {
    rotate: 0
  },
  end: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'linear'
    }
  }
};

// Pulse animation variants
const pulseVariants = {
  start: {
    scale: 1,
    opacity: 1
  },
  end: {
    scale: 1.1,
    opacity: 0.7,
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatType: 'reverse' as const,
      ease: 'easeInOut'
    }
  }
};

// Dot loading animation
const DotLoader: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const dotSize = {
    sm: '8px',
    md: '12px',
    lg: '16px'
  };

  const dotVariants = {
    start: { y: 0 },
    end: {
      y: -10,
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatType: 'reverse' as const,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <HStack spacing={2}>
      {[0, 1, 2].map((index) => (
        <MotionBox
          key={index}
          w={dotSize[size]}
          h={dotSize[size]}
          bg="primary.500"
          borderRadius="full"
          variants={dotVariants}
          initial="start"
          animate="end"
          transition={{ delay: index * 0.1 }}
        />
      ))}
    </HStack>
  );
};

// Wave loading animation
const WaveLoader: React.FC<{ color?: string }> = ({ color = 'primary.500' }) => {
  const waveVariants = {
    start: { scaleY: 1 },
    end: {
      scaleY: [1, 2, 1],
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <HStack spacing={1} align="end" h="40px">
      {[0, 1, 2, 3, 4].map((index) => (
        <MotionBox
          key={index}
          w="4px"
          h="20px"
          bg={color}
          borderRadius="full"
          variants={waveVariants}
          initial="start"
          animate="end"
          transition={{ delay: index * 0.1 }}
          transformOrigin="bottom"
        />
      ))}
    </HStack>
  );
};

// Circular progress loader
const CircularLoader: React.FC<{
  progress?: number;
  size?: number;
  thickness?: number;
  color?: string;
}> = ({ progress, size = 60, thickness = 4, color = 'primary.500' }) => {
  const circumference = 2 * Math.PI * (size / 2 - thickness);
  const strokeDasharray = circumference;
  const strokeDashoffset = progress 
    ? circumference - (progress / 100) * circumference 
    : 0;

  return (
    <Box position="relative" w={`${size}px`} h={`${size}px`}>
      {/* Background circle */}
      <svg
        width={size}
        height={size}
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - thickness}
          stroke="currentColor"
          strokeWidth={thickness}
          fill="none"
          opacity={0.1}
        />
      </svg>
      
      {/* Progress circle */}
      <motion.svg
        width={size}
        height={size}
        style={{ position: 'absolute', top: 0, left: 0 }}
        initial={{ rotate: -90 }}
        animate={progress === undefined ? { rotate: 270 } : {}}
        transition={progress === undefined ? {
          duration: 2,
          repeat: Infinity,
          ease: 'linear'
        } : {}}
      >
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - thickness}
          stroke={color}
          strokeWidth={thickness}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          initial={{ strokeDashoffset: circumference }}
          animate={{ 
            strokeDashoffset: progress !== undefined ? strokeDashoffset : [circumference, 0, circumference]
          }}
          transition={progress !== undefined ? {
            duration: 0.5,
            ease: 'easeInOut'
          } : {
            duration: 2,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      </motion.svg>
      
      {/* Progress text */}
      {progress !== undefined && (
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
        >
          <Text fontSize="sm" fontWeight="bold" color={color}>
            {Math.round(progress)}%
          </Text>
        </Box>
      )}
    </Box>
  );
};

// Full page loader
export const FullPageLoader: React.FC<{
  message?: string;
  progress?: number;
  type?: 'spinner' | 'dots' | 'wave' | 'circular';
}> = ({ message = 'Loading...', progress, type = 'circular' }) => {
  const bg = useColorModeValue('white', 'neutral.900');
  
  const renderLoader = () => {
    switch (type) {
      case 'spinner':
        return <Spinner size="xl" color="primary.500" thickness="4px" />;
      case 'dots':
        return <DotLoader size="lg" />;
      case 'wave':
        return <WaveLoader />;
      case 'circular':
      default:
        return <CircularLoader progress={progress} size={80} />;
    }
  };

  return (
    <AnimatePresence>
      <MotionBox
        position="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg={bg}
        display="flex"
        alignItems="center"
        justifyContent="center"
        zIndex={9999}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <VStack spacing={6}>
          {renderLoader()}
          
          <MotionText
            fontSize="lg"
            color="neutral.600"
            _dark={{ color: 'neutral.400' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {message}
          </MotionText>
          
          {progress !== undefined && type !== 'circular' && (
            <Box w="200px">
              <Progress
                value={progress}
                colorScheme="primary"
                borderRadius="full"
                bg="neutral.200"
                _dark={{ bg: 'neutral.700' }}
              />
            </Box>
          )}
        </VStack>
      </MotionBox>
    </AnimatePresence>
  );
};

// Section loader
export const SectionLoader: React.FC<{
  height?: string;
  message?: string;
  type?: 'spinner' | 'dots' | 'wave';
}> = ({ height = '200px', message, type = 'dots' }) => {
  const renderLoader = () => {
    switch (type) {
      case 'spinner':
        return <Spinner size="lg" color="primary.500" />;
      case 'wave':
        return <WaveLoader />;
      case 'dots':
      default:
        return <DotLoader />;
    }
  };

  return (
    <Box
      height={height}
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="neutral.50"
      _dark={{ bg: 'neutral.800' }}
      borderRadius="lg"
    >
      <VStack spacing={4}>
        {renderLoader()}
        {message && (
          <Text fontSize="sm" color="neutral.600" _dark={{ color: 'neutral.400' }}>
            {message}
          </Text>
        )}
      </VStack>
    </Box>
  );
};

// Card skeleton loader
export const CardSkeleton: React.FC<{
  count?: number;
  hasImage?: boolean;
  hasAvatar?: boolean;
}> = ({ count = 1, hasImage = true, hasAvatar = false }) => {
  const skeletons = Array.from({ length: count }, (_, index) => (
    <Box
      key={index}
      bg="white"
      _dark={{ bg: 'neutral.800' }}
      borderRadius="lg"
      overflow="hidden"
      border="1px solid"
      borderColor="neutral.200"
      _dark={{ borderColor: 'neutral.700' }}
    >
      {hasImage && (
        <Skeleton height="200px" />
      )}
      
      <Box p={6}>
        <VStack align="stretch" spacing={4}>
          {hasAvatar && (
            <HStack spacing={3}>
              <SkeletonCircle size="10" />
              <VStack align="flex-start" spacing={1}>
                <Skeleton height="4" width="100px" />
                <Skeleton height="3" width="60px" />
              </VStack>
            </HStack>
          )}
          
          <Skeleton height="6" width="80%" />
          <SkeletonText noOfLines={3} spacing="2" />
          
          <HStack spacing={2}>
            <Skeleton height="6" width="60px" borderRadius="full" />
            <Skeleton height="6" width="80px" borderRadius="full" />
            <Skeleton height="6" width="70px" borderRadius="full" />
          </HStack>
        </VStack>
      </Box>
    </Box>
  ));

  return <>{skeletons}</>;
};

// Grid skeleton loader
export const GridSkeleton: React.FC<{
  columns?: number;
  rows?: number;
  hasImage?: boolean;
  gap?: number;
}> = ({ columns = 3, rows = 2, hasImage = true, gap = 6 }) => {
  const gridColumns = useBreakpointValue({
    base: '1fr',
    md: `repeat(${Math.min(columns, 2)}, 1fr)`,
    lg: `repeat(${columns}, 1fr)`
  });

  const totalItems = columns * rows;

  return (
    <Grid templateColumns={gridColumns} gap={gap}>
      {Array.from({ length: totalItems }, (_, index) => (
        <GridItem key={index}>
          <CardSkeleton hasImage={hasImage} />
        </GridItem>
      ))}
    </Grid>
  );
};

// Text skeleton loader
export const TextSkeleton: React.FC<{
  lines?: number;
  spacing?: string;
  width?: string[];
}> = ({ lines = 3, spacing = '2', width }) => {
  const defaultWidths = ['100%', '80%', '60%'];
  const lineWidths = width || defaultWidths;

  return (
    <VStack align="stretch" spacing={spacing}>
      {Array.from({ length: lines }, (_, index) => (
        <Skeleton
          key={index}
          height="4"
          width={lineWidths[index % lineWidths.length]}
        />
      ))}
    </VStack>
  );
};

// Button loader
export const ButtonLoader: React.FC<{
  isLoading: boolean;
  children: React.ReactNode;
  loadingText?: string;
  size?: 'sm' | 'md' | 'lg';
}> = ({ isLoading, children, loadingText, size = 'md' }) => {
  const spinnerSize = {
    sm: 'sm',
    md: 'md',
    lg: 'lg'
  };

  return (
    <HStack spacing={2}>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <HStack spacing={2}>
              <Spinner size={spinnerSize[size]} />
              {loadingText && <Text>{loadingText}</Text>}
            </HStack>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </HStack>
  );
};

// Lazy loading wrapper
export const LazyLoader: React.FC<{
  children: React.ReactNode;
  fallback?: React.ReactNode;
  height?: string;
  threshold?: number;
}> = ({ children, fallback, height = '200px', threshold = 0.1 }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return (
    <Box ref={ref} minHeight={height}>
      {isVisible ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      ) : (
        fallback || <SectionLoader height={height} />
      )}
    </Box>
  );
};

export {
  DotLoader,
  WaveLoader,
  CircularLoader
};