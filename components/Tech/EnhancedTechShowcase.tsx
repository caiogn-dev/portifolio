'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Button,
  Grid,
  GridItem,
  Progress,
  Badge,
  Tooltip,
  useBreakpointValue,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Icon, // 👈 usamos o Icon do Chakra
  type IconProps,
} from '@chakra-ui/react';
import { useColorModeValue } from '@/components/ui/color-mode';
import { FaCode, FaServer, FaDatabase, FaTools, FaMobile, FaCloud } from 'react-icons/fa';

import { skills, skillCategories } from '@/lib/data/personal';
import { useLanguage, useTheme } from '@/lib/context/AppContext';
import { useIntersectionObserver } from '@/lib/hooks';
import {
  getAnimationVariants,
  createSlideVariants,
  createStaggerVariants,
  cardHoverVariants,
  fadeVariants,
} from '@/lib/utils/animations';
import type { IconType } from 'react-icons';

// === Motion helpers ===
const MotionBox = motion(Box);
const MotionGrid = motion(Grid);
const MotionGridItem = motion(GridItem);

// === Level → cores ===
const skillLevelColors: Record<
  'beginner' | 'intermediate' | 'advanced' | 'expert',
  { color: string; bg: string; _dark: { bg: string } }
> = {
  beginner: { color: 'orange.500', bg: 'orange.50', _dark: { bg: 'orange.900' } },
  intermediate: { color: 'blue.500', bg: 'blue.50', _dark: { bg: 'blue.900' } },
  advanced: { color: 'green.500', bg: 'green.50', _dark: { bg: 'green.900' } },
  expert: { color: 'purple.500', bg: 'purple.50', _dark: { bg: 'purple.900' } },
};

// === Ícones por categoria (para os filtros)
const categoryIcons: Record<string, IconType> = {
  frontend: FaCode,
  backend: FaServer,
  database: FaDatabase,
  tools: FaTools,
  mobile: FaMobile,
  cloud: FaCloud,
};

// === Skill Card ===
const SkillCard: React.FC<{
  skill: (typeof skills)[number];
  index: number;
}> = ({ skill, index }) => {
  const { language } = useLanguage();
  const cardBg = useColorModeValue('white', 'neutral.800');
  const borderColor = useColorModeValue('neutral.200', 'neutral.700');
  const levelConfig = skillLevelColors[skill.level];

  // cor do ícone (aceita token do Chakra ou qualquer string)
  const iconColor = skill.color ?? 'primary.500';

  const cardVariants = getAnimationVariants({
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.08,
        ease: 'easeOut',
      },
    },
  });

  return (
    <MotionGridItem variants={cardVariants}>
      <MotionBox
        bg={cardBg}
        border="1px solid"
        borderColor={borderColor}
        borderRadius="xl"
        p={6}
        height="100%"
        position="relative"
        overflow="hidden"
        variants={cardHoverVariants}
        _hover={{
          borderColor: levelConfig.color,
          shadow: 'lg',
        }}
        transition="all 0.3s ease-in-out"
      >
        <VStack spacing={4} align="center">
          {/* ✅ ÍCONE FORA DE PROBLEMAS: Chakra <Icon as={...} /> */}
          <Icon as={skill.icon as IconType} boxSize={9} color={iconColor as IconProps['color']} />

          {/* Nome */}
          <Text
            fontSize="lg"
            fontWeight="semibold"
            textAlign="center"
            color="neutral.800"
            _dark={{ color: 'neutral.100' }}
          >
            {skill.name}
          </Text>

          {/* Nível */}
          <Badge
            variant="subtle"
            colorScheme={levelConfig.color.split('.')[0]}
            px={3}
            py={1}
            borderRadius="full"
            fontSize="xs"
            textTransform="capitalize"
          >
            {language === 'en'
              ? skill.level
              : skill.level === 'beginner'
              ? 'Iniciante'
              : skill.level === 'intermediate'
              ? 'Intermediário'
              : skill.level === 'advanced'
              ? 'Avançado'
              : 'Especialista'}
          </Badge>

          {/* Progresso */}
          <Box width="100%">
            <Progress
              value={skill.proficiency}
              colorScheme={levelConfig.color.split('.')[0]}
              size="sm"
              borderRadius="full"
              bg="neutral.100"
              _dark={{ bg: 'neutral.700' }}
            />
            <Text fontSize="xs" color="neutral.600" _dark={{ color: 'neutral.400' }} textAlign="center" mt={1}>
              {skill.proficiency}%
            </Text>
          </Box>

          {/* Anos de experiência */}
          <Text fontSize="sm" color="neutral.600" _dark={{ color: 'neutral.400' }} textAlign="center">
            {skill.yearsOfExperience} {language === 'en' ? 'years' : 'anos'}
          </Text>
        </VStack>

        {/* Overlay de hover */}
        <MotionBox
          position="absolute"
          inset={0}
          bg={`linear-gradient(135deg, rgba(0,0,0,0.05), transparent)`}
          opacity={0}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
          pointerEvents="none"
        />
      </MotionBox>
    </MotionGridItem>
  );
};

// === Filtro de categorias ===
const CategoryFilter: React.FC<{
  categories: typeof skillCategories;
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}> = ({ categories, activeCategory, onCategoryChange }) => {
  const { language } = useLanguage();

  const filterVariants = getAnimationVariants(createStaggerVariants(0.08));
  const buttonVariants = getAnimationVariants(fadeVariants);

  return (
    <MotionBox variants={filterVariants} initial="hidden" animate="visible">
      <HStack spacing={3} wrap="wrap" justify="center">
        <motion.div variants={buttonVariants}>
          <Button
            variant={activeCategory === 'all' ? 'solid' : 'outline'}
            colorScheme="primary"
            size="sm"
            onClick={() => onCategoryChange('all')}
            leftIcon={<FaCode />}
          >
            {language === 'en' ? 'All Skills' : 'Todas'}
          </Button>
        </motion.div>

        {categories.map((category) => {
          const IconComponent = categoryIcons[category.id as keyof typeof categoryIcons];
          return (
            <motion.div key={category.id} variants={buttonVariants}>
              <Button
                variant={activeCategory === category.id ? 'solid' : 'outline'}
                colorScheme="primary"
                size="sm"
                onClick={() => onCategoryChange(category.id)}
                leftIcon={IconComponent ? <IconComponent /> : undefined}
              >
                {category.name}
              </Button>
            </motion.div>
          );
        })}
      </HStack>
    </MotionBox>
  );
};

// === Estatísticas do topo ===
const SkillStats: React.FC = () => {
  const { language } = useLanguage();

  const total = skills.length || 1;
  const avgYears = Math.round(
    skills.reduce((acc, s) => acc + (s.yearsOfExperience ?? 0), 0) / total
  );

  const expertCount = skills.filter((s) => s.level === 'expert' || s.level === 'advanced').length;

  const stats = [
    { value: skills.length, labelEn: 'Technologies', labelPt: 'Tecnologias' },
    { value: skillCategories.length, labelEn: 'Categories', labelPt: 'Categorias' },
    { value: isFinite(avgYears) ? avgYears : 0, labelEn: 'Avg. Experience', labelPt: 'Exp. Média' },
    { value: expertCount, labelEn: 'Expert Level', labelPt: 'Nível Expert' },
  ];

  const statsVariants = getAnimationVariants(createStaggerVariants(0.15));
  const statVariants = getAnimationVariants(createSlideVariants('up', 20));

  return (
    <MotionBox variants={statsVariants} initial="hidden" animate="visible">
      <Grid templateColumns="repeat(4, 1fr)" gap={6} maxW="600px" mx="auto">
        {stats.map((stat, index) => (
          <motion.div key={index} variants={statVariants}>
            <GridItem textAlign="center">
              <VStack spacing={1}>
                <Text fontSize="2xl" fontWeight="bold" color="primary.600" _dark={{ color: 'accent.300' }}>
                  {stat.value}
                </Text>
                <Text fontSize="sm" color="neutral.600" _dark={{ color: 'neutral.400' }}>
                  {language === 'en' ? stat.labelEn : stat.labelPt}
                </Text>
              </VStack>
            </GridItem>
          </motion.div>
        ))}
      </Grid>
    </MotionBox>
  );
};

// === Componente principal ===
const EnhancedTechShowcase: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const { language } = useLanguage();
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });

  const gridColumns = useBreakpointValue({
    base: 'repeat(2, 1fr)',
    md: 'repeat(3, 1fr)',
    lg: 'repeat(4, 1fr)',
    xl: 'repeat(5, 1fr)',
  });

  const filteredSkills = activeCategory === 'all' ? skills : skills.filter((s) => s.category === activeCategory);

  const sectionVariants = getAnimationVariants(createStaggerVariants(0.25));
  const titleVariants = getAnimationVariants(createSlideVariants('up', 30));
  const gridVariants = getAnimationVariants(createStaggerVariants(0.1));

  return (
    <Box as="section" id="skills" py={20} bg="neutral.50" _dark={{ bg: 'neutral.900' }} ref={ref}>
      <Container maxW="7xl">
        <MotionBox variants={sectionVariants} initial="hidden" animate={isIntersecting ? 'visible' : 'hidden'}>
          {/* Cabeçalho */}
          <motion.div variants={titleVariants}>
            <VStack spacing={6} textAlign="center" mb={16}>
              <Text fontSize="sm" fontWeight="semibold" color="primary.500" textTransform="uppercase" letterSpacing="wider">
                {language === 'en' ? 'Technical Skills' : 'Habilidades Técnicas'}
              </Text>

              <Text
                fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
                fontWeight="bold"
                color="neutral.800"
                _dark={{ color: 'neutral.100' }}
                lineHeight="shorter"
              >
                {language === 'en' ? 'Technologies I Work With' : 'Tecnologias que Domino'}
              </Text>

              <Text fontSize={{ base: 'md', md: 'lg' }} color="neutral.600" _dark={{ color: 'neutral.400' }} maxW="600px" lineHeight="relaxed">
                {language === 'en'
                  ? 'A comprehensive overview of my technical expertise across different domains of software development.'
                  : 'Uma visão abrangente da minha expertise técnica em diferentes domínios do desenvolvimento de software.'}
              </Text>
            </VStack>
          </motion.div>

          {/* Stats */}
          <Box mb={12}>
            <SkillStats />
          </Box>

          {/* Filtro */}
          <Box mb={12}>
            <CategoryFilter categories={skillCategories} activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
          </Box>

          {/* Grid de skills */}
          <AnimatePresence mode="wait">
            <MotionGrid
              key={activeCategory}
              templateColumns={gridColumns}
              gap={6}
              variants={gridVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {filteredSkills.map((skill, index) => (
                <SkillCard key={skill.id} skill={skill} index={index} />
              ))}
            </MotionGrid>
          </AnimatePresence>

          {/* CTA */}
          <motion.div variants={titleVariants}>
            <VStack spacing={6} textAlign="center" mt={16}>
              <Text fontSize="lg" color="neutral.600" _dark={{ color: 'neutral.400' }}>
                {language === 'en' ? 'Interested in working together?' : 'Interessado em trabalhar juntos?'}
              </Text>

              <Button
                variant="gradient"
                size="lg"
                as="a"
                href="#contact"
                _hover={{ transform: 'translateY(-2px)', shadow: 'xl' }}
                transition="all 0.3s ease-in-out"
              >
                {language === 'en' ? "Let's Talk" : 'Vamos Conversar'}
              </Button>
            </VStack>
          </motion.div>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default EnhancedTechShowcase;
