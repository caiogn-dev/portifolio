'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Box,
  Flex,
  HStack,
  VStack,
  Button,
  Text,
  IconButton,
  Link as ChakraLink,
  useBreakpointValue,
  Portal
} from '@chakra-ui/react';
import { ColorModeButton, useColorModeValue } from '@/components/ui/color-mode';
import { FaGithub, FaLinkedin, FaInstagram, FaBars, FaTimes } from 'react-icons/fa';
import { BsTwitterX } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';

import { personalInfo, socialLinks } from '@/lib/data/personal';
import { useTheme, useLanguage } from '@/lib/context/AppContext';
import { useScrollPosition, useMediaQuery } from '@/lib/hooks';
import { 
  getAnimationVariants, 
  createSlideVariants, 
  fadeVariants,
  createStaggerVariants,
  layoutTransition,
  layoutIds
} from '@/lib/utils/animations';

// Enhanced motion components
const MotionBox = motion.create(Box);
const MotionFlex = motion.create(Flex);

// Navigation links configuration
const navigationLinks = [
  { href: '#about', labelEn: 'About', labelPt: 'Sobre' },
  { href: '#skills', labelEn: 'Skills', labelPt: 'Habilidades' },
  { href: '#projects', labelEn: 'Projects', labelPt: 'Projetos' },
  { href: '#experience', labelEn: 'Experience', labelPt: 'Experiência' },
  { href: '#blog', labelEn: 'Blog', labelPt: 'Blog' },
  { href: '#contact', labelEn: 'Contact', labelPt: 'Contato' }
];

// Neon glow effect component
const NeonGlow: React.FC = () => {
  const { isDark } = useTheme();
  const neonColor = useColorModeValue('primary.400', 'accent.300');

  return (
    <MotionBox
      position="absolute"
      inset="-2px"
      borderRadius="full"
      zIndex={-1}
      overflow="hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: isDark ? 1 : 0.3 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <MotionBox
        width="100%"
        height="100%"
        position="absolute"
        animate={{ rotate: 360 }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear'
        }}
        bgGradient={`conic(
          from 0deg,
          transparent 0%,
          transparent 80%, 
          ${neonColor} 95%, 
          ${neonColor} 100%
        )`}
      />
    </MotionBox>
  );
};

// Social icons component
const SocialIcons: React.FC<{ variant?: 'horizontal' | 'vertical' }> = ({ 
  variant = 'horizontal' 
}) => {
  const iconMap = {
    FaGithub,
    FaLinkedin,
    FaInstagram,
    BsTwitterX,
    MdEmail
  };

  const Container = variant === 'horizontal' ? HStack : VStack;

  return (
    <Container gap={3} alignItems="center">
      {socialLinks.map((social) => {
        const IconComponent = iconMap[social.icon as keyof typeof iconMap];
        if (!IconComponent) return null;

        return (
          <ChakraLink
            key={social.id}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            _hover={{
              color: social.color,
              transform: 'translateY(-2px)'
            }}
            transition="all 0.2s ease-in-out"
          >
            <Box as={IconComponent} fontSize="lg" />
          </ChakraLink>
        );
      })}
    </Container>
  );
};

// Mobile menu component
const MobileMenu: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  links: typeof navigationLinks;
  language: 'en' | 'pt';
}> = ({ isOpen, onClose, links, language }) => {
  const glassBg = useColorModeValue(
    'rgba(255, 255, 255, 0.95)',
    'rgba(20, 20, 22, 0.95)'
  );

  const menuVariants = getAnimationVariants({
    hidden: {
      opacity: 0,
      y: -20,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        staggerChildren: 0.05
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: {
        duration: 0.15
      }
    }
  });

  const itemVariants = getAnimationVariants(createSlideVariants('up', 10));

  return (
    <Portal>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <MotionBox
              position="fixed"
              top={0}
              left={0}
              right={0}
              bottom={0}
              bg="blackAlpha.600"
              zIndex={1000}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />
            
            {/* Menu */}
            <MotionBox
              position="fixed"
              top="80px"
              left="50%"
              transform="translateX(-50%)"
              width="90vw"
              maxWidth="400px"
              bg={glassBg}
              backdropFilter="blur(20px)"
              borderRadius="2xl"
              boxShadow="2xl"
              zIndex={1001}
              p={6}
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <VStack gap={4} alignItems="stretch">
                {/* Navigation Links */}
                {links.map((link) => (
                  <motion.div key={link.href} variants={itemVariants}>
                    <Link href={link.href} onClick={onClose}>
                      <Button
                        variant="ghost"
                        justifyContent="flex-start"
                        width="100%"
                        size="lg"
                        _hover={{
                          bg: 'primary.50',
                          _dark: { bg: 'primary.900' }
                        }}
                      >
                        {language === 'en' ? link.labelEn : link.labelPt}
                      </Button>
                    </Link>
                  </motion.div>
                ))}
                
                {/* Divider */}
                <Box height="1px" bg="neutral.200" _dark={{ bg: 'neutral.700' }} />
                
                {/* Social Icons */}
                <motion.div variants={itemVariants}>
                  <Box textAlign="center">
                    <Text fontSize="sm" color="neutral.600" mb={3}>
                      {language === 'en' ? 'Connect with me' : 'Conecte-se comigo'}
                    </Text>
                    <SocialIcons variant="horizontal" />
                  </Box>
                </motion.div>
                
                {/* CTA Button */}
                <motion.div variants={itemVariants}>
                  <Link href="#contact" onClick={onClose}>
                    <Button
                      variant="gradient"
                      size="lg"
                      width="100%"
                    >
                      {language === 'en' ? 'Get In Touch' : 'Entre em Contato'}
                    </Button>
                  </Link>
                </motion.div>
              </VStack>
            </MotionBox>
          </>
        )}
      </AnimatePresence>
    </Portal>
  );
};

// Main navbar component
const EnhancedNavbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const { theme, isDark } = useTheme();
  const { language } = useLanguage();
  const scrollPosition = useScrollPosition();
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Handle scroll effect
  useEffect(() => {
    setIsScrolled(scrollPosition.y > 50);
  }, [scrollPosition.y]);

  // Theme-based styling
  const glassBg = useColorModeValue(
    isScrolled ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.6)',
    isScrolled ? 'rgba(20, 20, 22, 0.8)' : 'rgba(20, 20, 22, 0.6)'
  );

  const textColor = useColorModeValue('neutral.800', 'neutral.100');
  const shadow = useColorModeValue(
    isScrolled ? 'lg' : 'base',
    isScrolled ? 'dark-lg' : 'base'
  );

  // Animation variants
  const navbarVariants = getAnimationVariants({
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        staggerChildren: 0.1
      }
    }
  });

  const contentVariants = getAnimationVariants(createStaggerVariants(0.1));
  const itemVariants = getAnimationVariants(fadeVariants);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <MotionBox
        as="nav"
        layoutId={layoutIds.navbar}
        position="fixed"
        top={4}
        left="50%"
        transform="translateX(-50%)"
        zIndex={100}
        variants={navbarVariants}
        initial="hidden"
        animate="visible"
        transition={layoutTransition}
      >
        <MotionBox
          height={isScrolled ? '60px' : '70px'}
          width="95vw"
          maxWidth="1200px"
          bg={glassBg}
          backdropFilter="blur(20px)"
          borderRadius="full"
          boxShadow={shadow}
          border="1px solid"
          borderColor={useColorModeValue('neutral.200', 'neutral.700')}
          px={6}
          py={2}
          position="relative"
          overflow="visible"
          transition="all 0.3s ease-in-out"
        >
          {/* Neon glow effect */}
          {isDark && <NeonGlow />}
          
          <MotionFlex
            height="100%"
            alignItems="center"
            justifyContent="space-between"
            position="relative"
            zIndex={1}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Logo/Brand */}
            <motion.div variants={itemVariants}>
              <Link href="/">
                <Text
                  fontWeight="bold"
                  fontSize={{ base: 'lg', md: 'xl' }}
                  color={textColor}
                  letterSpacing="tight"
                  _hover={{
                    color: 'primary.500',
                    transform: 'scale(1.05)'
                  }}
                  transition="all 0.2s ease-in-out"
                >
                  {personalInfo.name.split(' ')[0]}
                </Text>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <Box
              display={{ base: 'none', lg: 'block' }}
              position="absolute"
              left="50%"
              transform="translateX(-50%)"
            >
              <motion.div variants={itemVariants}>
                <HStack gap={1}>
                  {navigationLinks.map((link) => (
                    <Link key={link.href} href={link.href}>
                      <Button
                        variant="ghost"
                        size="sm"
                        color={textColor}
                        _hover={{
                          bg: 'primary.50',
                          color: 'primary.600',
                          _dark: {
                            bg: 'primary.900',
                            color: 'primary.300'
                          }
                        }}
                        transition="all 0.2s ease-in-out"
                      >
                        {language === 'en' ? link.labelEn : link.labelPt}
                      </Button>
                    </Link>
                  ))}
                </HStack>
              </motion.div>
            </Box>

            {/* Right Actions */}
            <motion.div variants={itemVariants}>
              <HStack gap={3} alignItems="center">
                {/* Desktop Social Icons */}
                <Box display={{ base: 'none', md: 'block' }}>
                  <SocialIcons />
                </Box>

                {/* Theme Toggle */}
                <ColorModeButton />

                {/* CTA Button */}
                <Box display={{ base: 'none', sm: 'block' }}>
                  <Link href="#contact">
                    <Button
                      variant="gradient"
                      size="sm"
                      _hover={{
                        transform: 'translateY(-1px)',
                        shadow: 'md'
                      }}
                      transition="all 0.2s ease-in-out"
                    >
                      {language === 'en' ? 'Hire Me' : 'Contratar'}
                    </Button>
                  </Link>
                </Box>

                {/* Mobile Menu Toggle */}
                <Box display={{ base: 'block', lg: 'none' }}>
                  <IconButton
                    aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                    icon={isMobileMenuOpen ? <FaTimes /> : <FaBars />}
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    _hover={{
                      bg: 'primary.50',
                      _dark: { bg: 'primary.900' }
                    }}
                  />
                </Box>
              </HStack>
            </motion.div>
          </MotionFlex>
        </MotionBox>
      </MotionBox>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
        links={navigationLinks}
        language={language}
      />
    </>
  );
};

export default EnhancedNavbar;