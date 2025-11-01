'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Box,
  Container,
  Flex,
  VStack,
  HStack,
  Text,
  Button,
  Image,
  Badge,
  useBreakpointValue,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { useColorModeValue } from '@/components/ui/color-mode';
import { FaDownload, FaArrowRight, FaCode, FaRocket } from 'react-icons/fa';
import { MdWavingHand } from 'react-icons/md';

import { personalInfo, skills } from '@/lib/data/personal';
import { useTheme, useLanguage } from '@/lib/context/AppContext';
import { useTypewriter, useScrollPosition } from '@/lib/hooks';
import {
  getAnimationVariants,
  createSlideVariants,
  createStaggerVariants,
  revealVariants,
} from '@/lib/utils/animations';

// Motion components (v3: use motion.create)
const MotionBox = motion.create(Box);
const MotionFlex = motion.create(Flex);
const MotionText = motion.create(Text);
const MotionButton = motion.create(Button);

// ---------- Floating elements ----------
const FloatingElements: React.FC = () => {
  const { isDark } = useTheme();

  const elements = [
    { icon: '⚡', delay: 0, x: '10%', y: '20%' },
    { icon: '🚀', delay: 0.5, x: '80%', y: '15%' },
    { icon: '💡', delay: 1, x: '15%', y: '70%' },
    { icon: '🎯', delay: 1.5, x: '85%', y: '75%' },
    { icon: '✨', delay: 2, x: '50%', y: '10%' },
  ];

  return (
    <Box position="absolute" inset={0} overflow="hidden" pointerEvents="none">
      {elements.map((element, index) => (
        <MotionBox
          key={index}
          position="absolute"
          left={element.x}
          top={element.y}
          fontSize="2xl"
          opacity={isDark ? 0.3 : 0.2}
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{
            opacity: isDark ? 0.3 : 0.2,
            scale: 1,
            rotate: 0,
            y: [0, -20, 0],
          }}
          transition={{
            delay: element.delay,
            duration: 0.8,
            y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          {element.icon}
        </MotionBox>
      ))}
    </Box>
  );
};

// ---------- Skill badges ----------
const SkillBadges: React.FC = () => {
  const topSkills = skills.slice(0, 6);

  const badgeVariants = getAnimationVariants({
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  });

  return (
    <MotionBox
      variants={getAnimationVariants(createStaggerVariants(0.1))}
      initial="hidden"
      animate="visible"
    >
      <Flex wrap="wrap" gap={3} justify="center">
        {topSkills.map((skill) => (
          <motion.div key={skill.id} variants={badgeVariants}>
            <Badge
              variant="subtle"
              colorScheme="primary"
              px={3}
              py={1}
              borderRadius="full"
              fontSize="sm"
              _hover={{ transform: 'translateY(-2px)', shadow: 'md' }}
              transition="all 0.2s ease-in-out"
            >
              {skill.name}
            </Badge>
          </motion.div>
        ))}
      </Flex>
    </MotionBox>
  );
};

// ---------- Stats ----------
const StatsSection: React.FC = () => {
  const { language } = useLanguage();

  const stats = [
    { value: '5+', labelEn: 'Years Experience', labelPt: 'Anos de Experiência', icon: FaCode },
    { value: '50+', labelEn: 'Projects Completed', labelPt: 'Projetos Concluídos', icon: FaRocket },
    { value: '100%', labelEn: 'Client Satisfaction', labelPt: 'Satisfação do Cliente', icon: MdWavingHand },
  ];

  const statsVariants = getAnimationVariants(createStaggerVariants(0.2));
  const statItemVariants = getAnimationVariants(createSlideVariants('up', 30));

  return (
    <MotionBox variants={statsVariants} initial="hidden" animate="visible">
      <Grid templateColumns="repeat(3, 1fr)" gap={6} maxW="400px" mx="auto">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <motion.div key={index} variants={statItemVariants}>
              <GridItem textAlign="center">
                <VStack spacing={2}>
                  <Box as={IconComponent} fontSize="2xl" color="primary.500" _dark={{ color: 'accent.300' }} />
                  <Text fontSize="2xl" fontWeight="bold" color="primary.600" _dark={{ color: 'accent.300' }}>
                    {stat.value}
                  </Text>
                  <Text fontSize="sm" color="neutral.600" _dark={{ color: 'neutral.400' }} textAlign="center">
                    {language === 'en' ? stat.labelEn : stat.labelPt}
                  </Text>
                </VStack>
              </GridItem>
            </motion.div>
          );
        })}
      </Grid>
    </MotionBox>
  );
};

// ---------- Hero ----------
const EnhancedHero: React.FC = () => {
  const { language } = useLanguage();
  const { isDark } = useTheme();
  const scrollPosition = useScrollPosition();

  // Textos do typewriter
  const dynamicTexts =
    language === 'en'
      ? ['Full Stack Developer', 'React Specialist', 'UI/UX Enthusiast', 'Problem Solver']
      : ['Desenvolvedor Full Stack', 'Especialista React', 'Entusiasta UI/UX', 'Solucionador de Problemas'];

  // ⚠️ O hook retorna { displayText, isComplete }. Desestruture:
  const typewriterResult = useTypewriter(dynamicTexts, {
    typeSpeed: 100,
    deleteSpeed: 50,
    delayBetweenWords: 2000,
  });
  const dynamicText =
    typeof typewriterResult === 'string'
      ? typewriterResult
      : (typewriterResult?.displayText ?? '');

  // Responsivo
  const heroHeight = useBreakpointValue({ base: '100vh', md: '100vh' });
  const titleSize = useBreakpointValue({ base: '3xl', md: '5xl', lg: '6xl' });
  const subtitleSize = useBreakpointValue({ base: 'lg', md: 'xl', lg: '2xl' });

  // Gradiente
  const bgGradient = useColorModeValue(
    'linear(to-br, primary.50, accent.50, primary.100)',
    'linear(to-br, neutral.900, primary.900, accent.900)'
  );

  // Animações
  const containerVariants = getAnimationVariants(createStaggerVariants(0.3));
  const titleVariants = getAnimationVariants(createSlideVariants('up', 50));
  const subtitleVariants = getAnimationVariants(createSlideVariants('up', 30));
  const buttonVariants = getAnimationVariants(createSlideVariants('up', 20));
  const imageVariants = getAnimationVariants(revealVariants);

  // Parallax
  const parallaxY = scrollPosition.y * 0.5;

  return (
    <Box
      as="section"
      id="hero"
      minHeight={heroHeight}
      position="relative"
      overflow="hidden"
      bgGradient={bgGradient}
      display="flex"
      alignItems="center"
    >
      {/* Background elements */}
      <FloatingElements />

      {/* Parallax layer */}
      <MotionBox
        position="absolute"
        inset={0}
        bgGradient="radial(circle at 30% 20%, primary.200, transparent 50%)"
        _dark={{ bgGradient: 'radial(circle at 30% 20%, primary.800, transparent 50%)' }}
        style={{ y: parallaxY }}
      />

      <Container maxW="7xl" position="relative" zIndex={1}>
        <MotionFlex
          direction={{ base: 'column', lg: 'row' }}
          align="center"
          justify="space-between"
          gap={12}
          minHeight="80vh"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left */}
          <VStack
            align={{ base: 'center', lg: 'flex-start' }}
            spacing={8}
            flex={1}
            textAlign={{ base: 'center', lg: 'left' }}
            maxW={{ base: 'full', lg: '600px' }}
          >
            {/* Greeting */}
            <motion.div variants={titleVariants}>
              <HStack spacing={3} justify={{ base: 'center', lg: 'flex-start' }}>
                <MotionBox
                  as={MdWavingHand}
                  fontSize="2xl"
                  color="primary.500"
                  animate={{ rotate: [0, 20, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
                />
                <Text fontSize="xl" color="neutral.600" _dark={{ color: 'neutral.400' }} fontWeight="medium">
                  {language === 'en' ? "Hello, I'm" : 'Olá, eu sou'}
                </Text>
              </HStack>
            </motion.div>

            {/* Name */}
            <motion.div variants={titleVariants}>
              <MotionText
                fontSize={titleSize}
                fontWeight="bold"
                bgGradient="linear(to-r, primary.500, accent.500)"
                bgClip="text"
                lineHeight="shorter"
                letterSpacing="tight"
              >
                {personalInfo.name}
              </MotionText>
            </motion.div>

            {/* Dynamic Title (typewriter) */}
            <motion.div variants={subtitleVariants}>
              <MotionText
                fontSize={subtitleSize}
                color="neutral.700"
                _dark={{ color: 'neutral.300' }}
                fontWeight="medium"
                minHeight="1.5em"
              >
                {dynamicText}
                <Box
                  as="span"
                  display="inline-block"
                  w="2px"
                  h="1em"
                  bg="primary.500"
                  ml={1}
                  animation="blink 1s infinite"
                  sx={{
                    '@keyframes blink': {
                      '0%, 50%': { opacity: 1 },
                      '51%, 100%': { opacity: 0 },
                    },
                  }}
                />
              </MotionText>
            </motion.div>

            {/* Description */}
            <motion.div variants={subtitleVariants}>
              <Text
                fontSize={{ base: 'md', md: 'lg' }}
                color="neutral.600"
                _dark={{ color: 'neutral.400' }}
                maxW="500px"
                lineHeight="relaxed"
              >
                {language === 'en'
                  ? personalInfo.description
                  : 'Desenvolvedor apaixonado por criar experiências digitais incríveis e soluções inovadoras que fazem a diferença.'}
              </Text>
            </motion.div>

            {/* Skills */}
            <SkillBadges />

            {/* Actions */}
            <motion.div variants={buttonVariants}>
              <HStack spacing={4} wrap="wrap" justify={{ base: 'center', lg: 'flex-start' }}>
                <Link href="#contact">
                  <MotionButton
                    variant="gradient"
                    size="lg"
                    rightIcon={<FaArrowRight />}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    _hover={{ shadow: 'xl' }}
                  >
                    {language === 'en' ? 'Get In Touch' : 'Entre em Contato'}
                  </MotionButton>
                </Link>

                <Link href="/resume.pdf" target="_blank">
                  <MotionButton
                    variant="outline"
                    size="lg"
                    leftIcon={<FaDownload />}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {language === 'en' ? 'Download CV' : 'Baixar CV'}
                  </MotionButton>
                </Link>
              </HStack>
            </motion.div>

            {/* Stats */}
            <Box pt={8}>
              <StatsSection />
            </Box>
          </VStack>

          {/* Right - Avatar */}
          <Box flex={1} display="flex" justifyContent="center" alignItems="center" position="relative">
            <motion.div variants={imageVariants}>
              <MotionBox
                position="relative"
                w={{ base: '280px', md: '350px', lg: '400px' }}
                h={{ base: '280px', md: '350px', lg: '400px' }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                {/* Glow */}
                <Box
                  position="absolute"
                  inset="-20px"
                  borderRadius="full"
                  bgGradient="conic(from 0deg, primary.400, accent.400, primary.400)"
                  opacity={isDark ? 0.3 : 0.1}
                  filter="blur(20px)"
                  animation="spin 10s linear infinite"
                  sx={{
                    '@keyframes spin': {
                      '0%': { transform: 'rotate(0deg)' },
                      '100%': { transform: 'rotate(360deg)' },
                    },
                  }}
                />

                {/* Image */}
                <Image
                  src="/images/profile.jpg"
                  alt={personalInfo.name}
                  borderRadius="full"
                  objectFit="cover"
                  w="100%"
                  h="100%"
                  border="4px solid"
                  borderColor="white"
                  _dark={{ borderColor: 'neutral.800' }}
                  shadow="2xl"
                  fallbackSrc="https://via.placeholder.com/400x400/3B82F6/FFFFFF?text=Profile"
                />

                {/* Status */}
                <Badge
                  position="absolute"
                  bottom={4}
                  right={4}
                  colorScheme="green"
                  variant="solid"
                  px={3}
                  py={1}
                  borderRadius="full"
                  fontSize="sm"
                  shadow="lg"
                >
                  <Box
                    as="span"
                    display="inline-block"
                    w={2}
                    h={2}
                    bg="green.300"
                    borderRadius="full"
                    mr={2}
                    animation="pulse 2s infinite"
                  />
                  {language === 'en' ? 'Available' : 'Disponível'}
                </Badge>
              </MotionBox>
            </motion.div>
          </Box>
        </MotionFlex>
      </Container>

      {/* Scroll hint */}
      <MotionBox
        position="absolute"
        bottom={8}
        left="50%"
        transform="translateX(-50%)"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <VStack spacing={2}>
          <Text fontSize="sm" color="neutral.500" _dark={{ color: 'neutral.400' }}>
            {language === 'en' ? 'Scroll to explore' : 'Role para explorar'}
          </Text>
          <MotionBox
            w={1}
            h={8}
            bg="neutral.400"
            borderRadius="full"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </VStack>
      </MotionBox>
    </Box>
  );
};

export default EnhancedHero;
