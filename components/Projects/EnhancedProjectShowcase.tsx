'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  chakra,
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Button,
  Grid,
  GridItem,
  Image,
  Badge,
  IconButton,
  Dialog,
  useDisclosure,
  Tabs,
  useBreakpointValue,
  Tag,
  TagLabel,
  Wrap,
  WrapItem,
  Separator,
} from '@chakra-ui/react';
import {
  FaGithub,
  FaExternalLinkAlt,
  FaEye,
  FaStar,
  FaCalendar,
  FaArrowRight,
} from 'react-icons/fa';
import { useColorModeValue } from '@/components/ui/color-mode';

import { projects, projectCategories } from '@/lib/data/personal';
import { useLanguage, useTheme } from '@/lib/context/AppContext';
import { useIntersectionObserver } from '@/lib/hooks';
import {
  getAnimationVariants,
  createSlideVariants,
  createStaggerVariants,
  cardHoverVariants,
  fadeVariants,
  modalVariants,
  backdropVariants,
} from '@/lib/utils/animations';

// Motion wrappers (v3)
const MotionBox = chakra(motion.div);
const MotionGrid = chakra(motion.div);
const MotionGridItem = chakra(motion.div);

// ---------------------------------------
// Card de Projeto
// ---------------------------------------
const ProjectCard: React.FC<{
  project: typeof projects[0];
  index: number;
  onViewDetails: (project: typeof projects[0]) => void;
}> = ({ project, index, onViewDetails }) => {
  const { language } = useLanguage();
  const cardBg = useColorModeValue('white', 'neutral.800');
  const borderColor = useColorModeValue('neutral.200', 'neutral.700');

  const cardVariants = getAnimationVariants({
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, delay: index * 0.1, ease: 'easeOut' },
    },
  });

  return (
    <MotionGridItem variants={cardVariants} whileHover="hover" initial="rest" animate="rest" as={GridItem}>
      <MotionBox
        as={Box}
        bg={cardBg}
        border="1px solid"
        borderColor={borderColor}
        borderRadius="xl"
        overflow="hidden"
        h="100%"
        pos="relative"
        variants={cardHoverVariants}
        _hover={{ shadow: '2xl', borderColor: 'primary.300' }}
        transition="all 0.3s ease-in-out"
      >
        {/* Imagem */}
        <Box pos="relative" overflow="hidden">
          <Image
            src={project.image}
            alt={project.title}
            w="100%"
            h="200px"
            objectFit="cover"
            transition="transform 0.3s ease-in-out"
            _hover={{ transform: 'scale(1.05)' }}
          />

          {/* Status */}
          <Badge
            pos="absolute"
            top={3}
            right={3}
            colorScheme={
              project.status === 'completed'
                ? 'green'
                : project.status === 'in-progress'
                ? 'blue'
                : 'orange'
            }
            variant="solid"
            px={2}
            py={1}
            borderRadius="md"
            fontSize="xs"
          >
            {language === 'en'
              ? project.status
              : project.status === 'completed'
              ? 'Concluído'
              : project.status === 'in-progress'
              ? 'Em Andamento'
              : 'Planejado'}
          </Badge>

          {/* Destaque */}
          {project.featured && (
            <HStack pos="absolute" top={3} left={3} spacing={1}>
              <Badge colorScheme="yellow" variant="solid" px={2} py={1} borderRadius="md" fontSize="xs">
                <HStack spacing={1}>
                  <Box as={FaStar} aria-hidden />
                  <Text as="span"> {language === 'en' ? 'Featured' : 'Destaque'}</Text>
                </HStack>
              </Badge>
            </HStack>
          )}

          {/* Overlay com ações */}
          <MotionBox
            pos="absolute"
            inset={0}
            bg="blackAlpha.700"
            display="flex"
            alignItems="center"
            justifyContent="center"
            opacity={0}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <HStack spacing={3}>
              <IconButton
                aria-label="View Details"
                icon={<FaEye />}
                variant="solid"
                colorScheme="primary"
                size="sm"
                onClick={() => onViewDetails(project)}
              />

              {project.demoUrl && (
                <IconButton
                  aria-label="Live Demo"
                  icon={<FaExternalLinkAlt />}
                  variant="solid"
                  colorScheme="green"
                  size="sm"
                  as="a"
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              )}

              {project.githubUrl && (
                <IconButton
                  aria-label="View Code"
                  icon={<FaGithub />}
                  variant="solid"
                  colorScheme="gray"
                  size="sm"
                  as="a"
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              )}
            </HStack>
          </MotionBox>
        </Box>

        {/* Conteúdo */}
        <VStack align="stretch" p={6} spacing={4}>
          {/* Título & Categoria */}
          <VStack align="stretch" spacing={2}>
            <Text
              fontSize="xl"
              fontWeight="bold"
              color="neutral.800"
              _dark={{ color: 'neutral.100' }}
              noOfLines={1}
            >
              {project.title}
            </Text>

            <Text
              fontSize="sm"
              color="primary.500"
              fontWeight="medium"
              textTransform="uppercase"
              letterSpacing="wider"
            >
              {project.category}
            </Text>
          </VStack>

          {/* Descrição */}
          <Text
            fontSize="sm"
            color="neutral.600"
            _dark={{ color: 'neutral.400' }}
            noOfLines={3}
            lineHeight="relaxed"
          >
            {language === 'en' ? project.description : project.descriptionPt}
          </Text>

          {/* Tecnologias */}
          <Box>
            <Wrap spacing={2}>
              {project.technologies.slice(0, 4).map((tech) => (
                <WrapItem key={tech}>
                  <Tag size="sm" variant="subtle" colorScheme="primary">
                    <TagLabel>{tech}</TagLabel>
                  </Tag>
                </WrapItem>
              ))}
              {project.technologies.length > 4 && (
                <WrapItem>
                  <Tag size="sm" variant="subtle" colorScheme="gray">
                    <TagLabel>+{project.technologies.length - 4}</TagLabel>
                  </Tag>
                </WrapItem>
              )}
            </Wrap>
          </Box>

          {/* Meta / Ações */}
          <HStack justify="space-between" pt={2}>
            <HStack spacing={4} fontSize="sm" color="neutral.500">
              <HStack spacing={1}>
                <FaCalendar />
                <Text>{new Date(project.completedAt).getFullYear()}</Text>
              </HStack>
              {project.duration && (
                <HStack spacing={1}>
                  <Text>{project.duration}</Text>
                </HStack>
              )}
            </HStack>

            <Button
              size="sm"
              variant="ghost"
              colorScheme="primary"
              onClick={() => onViewDetails(project)}
              rightIcon={<FaArrowRight />}
            >
              {language === 'en' ? 'Details' : 'Detalhes'}
            </Button>
          </HStack>
        </VStack>
      </MotionBox>
    </MotionGridItem>
  );
};

// ---------------------------------------
// Dialog de Detalhes (v3)
// ---------------------------------------
const ProjectDetailsDialog: React.FC<{
  project: typeof projects[0] | null;
  isOpen: boolean;
  onClose: () => void;
}> = ({ project, isOpen, onClose }) => {
  const { language } = useLanguage();
  const textColor = useColorModeValue('neutral.600', 'neutral.400');

  if (!project) return null;

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(e) => {
        if (!e.open) onClose();
      }}
      size="xl" // v3: xs|sm|md|lg|xl|full|cover
    >
      <MotionBox as={Dialog.Backdrop} variants={backdropVariants} initial="hidden" animate="visible" exit="exit" />
      <MotionBox as={Dialog.Content} variants={modalVariants} initial="hidden" animate="visible" exit="exit">
        <Dialog.Header>
          <Dialog.Title>{project.title}</Dialog.Title>
        </Dialog.Header>
        <Dialog.Body pb={6}>
          <VStack spacing={6} align="stretch">
            {/* Imagem */}
            <Image
              src={project.image}
              alt={project.title}
              borderRadius="lg"
              w="100%"
              h="300px"
              objectFit="cover"
            />

            {/* Info */}
            <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={4}>
              <GridItem>
                <VStack align="stretch" spacing={2}>
                  <Text fontWeight="semibold" color="neutral.600">
                    {language === 'en' ? 'Category' : 'Categoria'}
                  </Text>
                  <Badge colorScheme="primary" w="fit-content">
                    {project.category}
                  </Badge>
                </VStack>
              </GridItem>

              <GridItem>
                <VStack align="stretch" spacing={2}>
                  <Text fontWeight="semibold" color="neutral.600">
                    {language === 'en' ? 'Status' : 'Status'}
                  </Text>
                  <Badge
                    colorScheme={
                      project.status === 'completed'
                        ? 'green'
                        : project.status === 'in-progress'
                        ? 'blue'
                        : 'orange'
                    }
                    w="fit-content"
                  >
                    {language === 'en'
                      ? project.status
                      : project.status === 'completed'
                      ? 'Concluído'
                      : project.status === 'in-progress'
                      ? 'Em Andamento'
                      : 'Planejado'}
                  </Badge>
                </VStack>
              </GridItem>

              <GridItem>
                <VStack align="stretch" spacing={2}>
                  <Text fontWeight="semibold" color="neutral.600">
                    {language === 'en' ? 'Duration' : 'Duração'}
                  </Text>
                  <Text>{project.duration || 'N/A'}</Text>
                </VStack>
              </GridItem>

              <GridItem>
                <VStack align="stretch" spacing={2}>
                  <Text fontWeight="semibold" color="neutral.600">
                    {language === 'en' ? 'Completed' : 'Concluído'}
                  </Text>
                  <Text>{new Date(project.completedAt).toLocaleDateString()}</Text>
                </VStack>
              </GridItem>
            </Grid>

            {/* Descrição */}
            <VStack align="stretch" spacing={3}>
              <Text fontWeight="semibold" fontSize="lg">
                {language === 'en' ? 'Description' : 'Descrição'}
              </Text>
              <Text lineHeight="relaxed" color={textColor}>
                {language === 'en' ? project.description : project.descriptionPt}
              </Text>
            </VStack>

            {/* Tecnologias */}
            <VStack align="stretch" spacing={3}>
              <Text fontWeight="semibold" fontSize="lg">
                {language === 'en' ? 'Technologies Used' : 'Tecnologias Utilizadas'}
              </Text>
              <Wrap spacing={2}>
                {project.technologies.map((tech) => (
                  <WrapItem key={tech}>
                    <Tag size="sm" variant="subtle" colorScheme="primary">
                      <TagLabel>{tech}</TagLabel>
                    </Tag>
                  </WrapItem>
                ))}
              </Wrap>
            </VStack>

            {/* Features */}
            {project.keyFeatures && (
              <VStack align="stretch" spacing={3}>
                <Text fontWeight="semibold" fontSize="lg">
                  {language === 'en' ? 'Key Features' : 'Principais Funcionalidades'}
                </Text>
                <VStack align="stretch" spacing={2}>
                  {project.keyFeatures.map((feature, index) => (
                    <HStack key={index} align="flex-start" spacing={3}>
                      <Box mt="6px" boxSize="6px" bg="primary.500" borderRadius="full" flexShrink={0} />
                      <Text color={textColor}>{feature}</Text>
                    </HStack>
                  ))}
                </VStack>
              </VStack>
            )}

            {/* Desafios */}
            {project.challenges && (
              <VStack align="stretch" spacing={3}>
                <Text fontWeight="semibold" fontSize="lg">
                  {language === 'en' ? 'Challenges & Solutions' : 'Desafios e Soluções'}
                </Text>
                <Text lineHeight="relaxed" color={textColor}>
                  {project.challenges}
                </Text>
              </VStack>
            )}

            <Separator />

            {/* Tabs v3 */}
            <Tabs.Root defaultValue="stack" variant="enclosed">
              <Tabs.List>
                <Tabs.Trigger value="stack">Stack</Tabs.Trigger>
                <Tabs.Trigger value="insights">Insights</Tabs.Trigger>
                <Tabs.Trigger value="links">Links</Tabs.Trigger>
              </Tabs.List>

              <Tabs.Content value="stack">
                {Array.isArray((project as any).stack) && (project as any).stack.length > 0 ? (
                  <Wrap spacing={2} mt={3}>
                    {(project as any).stack.map((s: string) => (
                      <WrapItem key={s}>
                        <Tag size="sm" variant="surface" colorScheme="gray">
                          <TagLabel>{s}</TagLabel>
                        </Tag>
                      </WrapItem>
                    ))}
                  </Wrap>
                ) : (
                  <Text color={textColor} fontSize="sm" mt={2}>
                    {language === 'en' ? 'No stack provided.' : 'Sem stack informada.'}
                  </Text>
                )}
              </Tabs.Content>

              <Tabs.Content value="insights">
                <VStack align="stretch" spacing={2} mt={3}>
                  {(project as any).highlights?.length ? (
                    (project as any).highlights.map((h: string, i: number) => (
                      <HStack key={i} align="start" spacing={3}>
                        <Box mt="6px" boxSize="6px" bg="primary.500" borderRadius="full" />
                        <Text color={textColor} fontSize="sm">
                          {h}
                        </Text>
                      </HStack>
                    ))
                  ) : (
                    <Text color={textColor} fontSize="sm">
                      {language === 'en' ? 'No insights available.' : 'Sem insights adicionais.'}
                    </Text>
                  )}
                </VStack>
              </Tabs.Content>

              <Tabs.Content value="links">
                <HStack spacing={3} mt={3} wrap="wrap">
                  {project.githubUrl && (
                    <Button
                      as={Link}
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      leftIcon={<FaGithub />}
                      variant="outline"
                      colorScheme="gray"
                      size="sm"
                    >
                      {language === 'en' ? 'Repository' : 'Repositório'}
                    </Button>
                  )}
                  {project.demoUrl && (
                    <Button
                      as={Link}
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      leftIcon={<FaExternalLinkAlt />}
                      colorScheme="primary"
                      size="sm"
                    >
                      {language === 'en' ? 'Live' : 'Acessar'}
                    </Button>
                  )}
                  {!project.githubUrl && !project.demoUrl && (
                    <Text color={textColor} fontSize="sm">
                      {language === 'en' ? 'No public links.' : 'Sem links públicos.'}
                    </Text>
                  )}
                </HStack>
              </Tabs.Content>
            </Tabs.Root>
          </VStack>
        </Dialog.Body>

        <Dialog.Footer>
          <HStack justify="flex-end" w="full">
            {project.demoUrl && (
              <Button
                as={Link}
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                leftIcon={<FaExternalLinkAlt />}
                colorScheme="primary"
              >
                {language === 'en' ? 'View project' : 'Ver projeto'}
              </Button>
            )}
            <Button variant="outline" onClick={onClose}>
              {language === 'en' ? 'Close' : 'Fechar'}
            </Button>
          </HStack>
        </Dialog.Footer>

        <Dialog.CloseTrigger />
      </MotionBox>
    </Dialog.Root>
  );
};

// ---------------------------------------
// Filtro por Categoria
// ---------------------------------------
const CategoryFilter: React.FC<{
  categories: typeof projectCategories;
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}> = ({ categories, activeCategory, onCategoryChange }) => {
  const { language } = useLanguage();

  const filterVariants = getAnimationVariants(createStaggerVariants(0.1));
  const buttonVariants = getAnimationVariants(fadeVariants);

  return (
    <MotionBox variants={filterVariants} initial="hidden" animate="visible" as={Box}>
      <HStack spacing={3} wrap="wrap" justify="center">
        <motion.div variants={buttonVariants}>
          <Button
            variant={activeCategory === 'all' ? 'solid' : 'outline'}
            colorScheme="primary"
            size="sm"
            onClick={() => onCategoryChange('all')}
          >
            {language === 'en' ? 'All Projects' : 'Todos'}
          </Button>
        </motion.div>

        {categories.map((category) => (
          <motion.div key={category.id} variants={buttonVariants}>
            <Button
              variant={activeCategory === category.id ? 'solid' : 'outline'}
              colorScheme="primary"
              size="sm"
              onClick={() => onCategoryChange(category.id)}
            >
              {language === 'en' ? category.nameEn : category.namePt}
            </Button>
          </motion.div>
        ))}
      </HStack>
    </MotionBox>
  );
};

// ---------------------------------------
// Componente Principal
// ---------------------------------------
const EnhancedProjectShowcase: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { language } = useLanguage();
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });

  const gridColumns = useBreakpointValue({
    base: '1fr',
    md: 'repeat(2, 1fr)',
    lg: 'repeat(3, 1fr)',
  });

  const filteredProjects =
    activeCategory === 'all'
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  const handleViewDetails = (project: typeof projects[0]) => {
    setSelectedProject(project);
    onOpen();
  };

  const sectionVariants = getAnimationVariants(createStaggerVariants(0.3));
  const titleVariants = getAnimationVariants(createSlideVariants('up', 30));
  const gridVariants = getAnimationVariants(createStaggerVariants(0.1));

  return (
    <>
      <Box as="section" id="projects" py={20} ref={ref}>
        <Container maxW="7xl">
          <MotionBox variants={sectionVariants} initial="hidden" animate={isIntersecting ? 'visible' : 'hidden'} as={Box}>
            {/* Cabeçalho */}
            <motion.div variants={titleVariants}>
              <VStack spacing={6} textAlign="center" mb={16}>
                <Text
                  fontSize="sm"
                  fontWeight="semibold"
                  color="primary.500"
                  textTransform="uppercase"
                  letterSpacing="wider"
                >
                  {language === 'en' ? 'Portfolio' : 'Portfólio'}
                </Text>

                <Text
                  fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
                  fontWeight="bold"
                  color="neutral.800"
                  _dark={{ color: 'neutral.100' }}
                  lineHeight="shorter"
                >
                  {language === 'en' ? 'Featured Projects' : 'Projetos em Destaque'}
                </Text>

                <Text
                  fontSize={{ base: 'md', md: 'lg' }}
                  color="neutral.600"
                  _dark={{ color: 'neutral.400' }}
                  maxW="600px"
                  lineHeight="relaxed"
                >
                  {language === 'en'
                    ? 'A showcase of my recent work, featuring web applications, mobile apps, and innovative solutions.'
                    : 'Uma vitrine dos meus trabalhos recentes, apresentando aplicações web, apps mobile e soluções inovadoras.'}
                </Text>
              </VStack>
            </motion.div>

            {/* Filtro */}
            <Box mb={12}>
              <CategoryFilter
                categories={projectCategories}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />
            </Box>

            {/* Grid de projetos */}
            <AnimatePresence mode="wait">
              <MotionGrid
                key={activeCategory}
                as={Grid}
                templateColumns={gridColumns}
                gap={8}
                variants={gridVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {filteredProjects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </MotionGrid>
            </AnimatePresence>

            {/* CTA */}
            <motion.div variants={titleVariants}>
              <VStack spacing={6} textAlign="center" mt={16}>
                <Text fontSize="lg" color="neutral.600" _dark={{ color: 'neutral.400' }}>
                  {language === 'en' ? 'Have a project in mind?' : 'Tem um projeto em mente?'}
                </Text>

                <Button
                  variant="gradient"
                  size="lg"
                  as="a"
                  href="#contact"
                  _hover={{ transform: 'translateY(-2px)', shadow: 'xl' }}
                  transition="all 0.3s ease-in-out"
                >
                  {language === 'en' ? "Let's Work Together" : 'Vamos Trabalhar Juntos'}
                </Button>
              </VStack>
            </motion.div>
          </MotionBox>
        </Container>
      </Box>

      {/* Dialog de detalhes */}
      <ProjectDetailsDialog project={selectedProject} isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default EnhancedProjectShowcase;
