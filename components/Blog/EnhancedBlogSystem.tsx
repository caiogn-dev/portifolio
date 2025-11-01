'use client';

import React, { useState, useMemo } from 'react';
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
  Input,
  InputGroup,
  Select,
  useBreakpointValue,
  Avatar,
  Separator,
  Tag,
  TagLabel,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import {
  FaSearch,
  FaCalendar,
  FaClock,
  FaEye,
  FaHeart,
  FaArrowRight,
} from 'react-icons/fa';
import { useColorModeValue } from '@/components/ui/color-mode';
import { blogPosts, blogCategories } from '@/lib/data/personal';
import { useLanguage } from '@/lib/context/AppContext';
import { useIntersectionObserver, useDebounce } from '@/lib/hooks';
import { formatDate, calculateReadingTime } from '@/lib/utils/text';
import {
  getAnimationVariants,
  createSlideVariants,
  createStaggerVariants,
  cardHoverVariants,
  fadeVariants,
} from '@/lib/utils/animations';

// Motion wrappers (v3: sem shouldForwardProp)
const MotionBox = chakra(motion.div);
const MotionGrid = chakra(motion.div);
const MotionGridItem = chakra(motion.div);

// ------- Card de Post -------
const BlogPostCard: React.FC<{
  post: typeof blogPosts[0];
  index: number;
  featured?: boolean;
}> = ({ post, index, featured = false }) => {
  const { language } = useLanguage();

  const cardBg = useColorModeValue('white', 'neutral.800');
  const borderColor = useColorModeValue('neutral.200', 'neutral.700');

  const cardVariants = getAnimationVariants({
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: 'easeOut',
      },
    },
  });

  const readingTime = calculateReadingTime(post.content);

  return (
    <MotionGridItem
      variants={cardVariants}
      whileHover="hover"
      initial="rest"
      animate="rest"
      as={GridItem}
      colSpan={featured ? { base: 1, md: 2 } : 1}
    >
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
        {featured && (
          <Badge
            pos="absolute"
            top={4}
            left={4}
            colorScheme="yellow"
            variant="solid"
            px={3}
            py={1}
            borderRadius="full"
            fontSize="xs"
            zIndex={2}
          >
            {language === 'en' ? 'Featured' : 'Destaque'}
          </Badge>
        )}

        {/* Imagem */}
        <Box pos="relative" overflow="hidden">
          <Image
            src={post.image}
            alt={post.title}
            w="100%"
            h={featured ? '300px' : '200px'}
            objectFit="cover"
            transition="transform 0.3s ease-in-out"
            _hover={{ transform: 'scale(1.05)' }}
          />

          {/* Categoria */}
          <Badge
            pos="absolute"
            top={4}
            right={4}
            colorScheme="primary"
            variant="solid"
            px={2}
            py={1}
            borderRadius="md"
            fontSize="xs"
          >
            {post.category}
          </Badge>

          {/* Gradiente */}
          <Box
            pos="absolute"
            insetInline={0}
            bottom={0}
            h="50%"
            bgGradient="linear(to-t, blackAlpha.700, transparent)"
          />
        </Box>

        {/* Conteúdo */}
        <VStack align="stretch" p={6} spacing={4}>
          {/* Meta */}
          <HStack justify="space-between" fontSize="sm" color="neutral.500">
            <HStack spacing={4}>
              <HStack spacing={1}>
                <FaCalendar />
                <Text>{formatDate(post.publishedAt, language)}</Text>
              </HStack>

              <HStack spacing={1}>
                <FaClock />
                <Text>
                  {readingTime}{' '}
                  {language === 'en' ? 'min read' : 'min de leitura'}
                </Text>
              </HStack>
            </HStack>

            <HStack spacing={3}>
              <HStack spacing={1}>
                <FaEye />
                <Text>{post.views}</Text>
              </HStack>

              <HStack spacing={1}>
                <FaHeart />
                <Text>{post.likes}</Text>
              </HStack>
            </HStack>
          </HStack>

          {/* Título */}
          <Text
            fontSize={featured ? '2xl' : 'xl'}
            fontWeight="bold"
            color="neutral.800"
            _dark={{ color: 'neutral.100' }}
            noOfLines={2}
            lineHeight="shorter"
          >
            {post.title}
          </Text>

          {/* Excerpt */}
          <Text
            fontSize="sm"
            color="neutral.600"
            _dark={{ color: 'neutral.400' }}
            noOfLines={featured ? 4 : 3}
            lineHeight="relaxed"
          >
            {post.excerpt}
          </Text>

          {/* Tags */}
          <Box>
            <Wrap spacing={2}>
              {post.tags.slice(0, featured ? 5 : 3).map((tag) => (
                <WrapItem key={tag}>
                  <Tag size="sm" variant="subtle" colorScheme="primary">
                    <TagLabel>{tag}</TagLabel>
                  </Tag>
                </WrapItem>
              ))}
              {post.tags.length > (featured ? 5 : 3) && (
                <WrapItem>
                  <Tag size="sm" variant="subtle" colorScheme="gray">
                    <TagLabel>
                      +{post.tags.length - (featured ? 5 : 3)}
                    </TagLabel>
                  </Tag>
                </WrapItem>
              )}
            </Wrap>
          </Box>

          <Separator />

          {/* Autor / Ler mais */}
          <HStack justify="space-between" align="center">
            <HStack spacing={3}>
              <Avatar size="sm" name={post.author} src="/images/profile.jpg" />
              <VStack align="flex-start" spacing={0}>
                <Text fontSize="sm" fontWeight="medium">
                  {post.author}
                </Text>
                <Text fontSize="xs" color="neutral.500">
                  {language === 'en' ? 'Author' : 'Autor'}
                </Text>
              </VStack>
            </HStack>

            <Button
              as={Link}
              href={`/blog/${post.slug}`}
              variant="ghost"
              colorScheme="primary"
              size="sm"
              rightIcon={<FaArrowRight />}
              _hover={{ transform: 'translateX(4px)' }}
              transition="all 0.2s ease-in-out"
            >
              {language === 'en' ? 'Read More' : 'Ler Mais'}
            </Button>
          </HStack>
        </VStack>
      </MotionBox>
    </MotionGridItem>
  );
};

// ------- Filtros -------
const BlogFilters: React.FC<{
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedTag: string;
  onTagChange: (tag: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}> = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedTag,
  onTagChange,
  sortBy,
  onSortChange,
}) => {
  const { language } = useLanguage();

  const inputBg = useColorModeValue('white', 'neutral.800');
  const inputBorder = useColorModeValue('neutral.200', 'neutral.700');

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    blogPosts.forEach((post) => post.tags.forEach((t) => tags.add(t)));
    return Array.from(tags).sort();
  }, []);

  const filterVariants = getAnimationVariants(createStaggerVariants(0.1));
  const fieldVariants = getAnimationVariants(fadeVariants);

  return (
    <MotionBox variants={filterVariants} initial="hidden" animate="visible" as={Box}>
      <Grid
        templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
        gap={4}
        mb={8}
      >
        {/* Busca: v3 usa startElement no InputGroup */}
        <motion.div variants={fieldVariants}>
          <GridItem>
            <InputGroup
              startElement={
                <Box as={FaSearch} color="neutral.400" aria-hidden="true" />
              }
            >
              <Input
                placeholder={language === 'en' ? 'Search posts...' : 'Buscar posts...'}
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                bg={inputBg}
                border="1px solid"
                borderColor={inputBorder}
              />
            </InputGroup>
          </GridItem>
        </motion.div>

        {/* Categoria */}
        <motion.div variants={fieldVariants}>
          <GridItem>
            <Select
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              bg={inputBg}
              border="1px solid"
              borderColor={inputBorder}
            >
              <option value="">
                {language === 'en' ? 'All Categories' : 'Todas Categorias'}
              </option>
              {blogCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {language === 'en' ? category.nameEn : category.namePt}
                </option>
              ))}
            </Select>
          </GridItem>
        </motion.div>

        {/* Tag */}
        <motion.div variants={fieldVariants}>
          <GridItem>
            <Select
              value={selectedTag}
              onChange={(e) => onTagChange(e.target.value)}
              bg={inputBg}
              border="1px solid"
              borderColor={inputBorder}
            >
              <option value="">{language === 'en' ? 'All Tags' : 'Todas Tags'}</option>
              {allTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </Select>
          </GridItem>
        </motion.div>

        {/* Ordenação */}
        <motion.div variants={fieldVariants}>
          <GridItem>
            <Select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              bg={inputBg}
              border="1px solid"
              borderColor={inputBorder}
            >
              <option value="newest">
                {language === 'en' ? 'Newest First' : 'Mais Recentes'}
              </option>
              <option value="oldest">
                {language === 'en' ? 'Oldest First' : 'Mais Antigos'}
              </option>
              <option value="popular">
                {language === 'en' ? 'Most Popular' : 'Mais Populares'}
              </option>
              <option value="liked">
                {language === 'en' ? 'Most Liked' : 'Mais Curtidos'}
              </option>
            </Select>
          </GridItem>
        </motion.div>
      </Grid>
    </MotionBox>
  );
};

// ------- Stats -------
const BlogStats: React.FC = () => {
  const { language } = useLanguage();

  const stats = [
    { value: blogPosts.length, labelEn: 'Articles', labelPt: 'Artigos' },
    { value: blogCategories.length, labelEn: 'Categories', labelPt: 'Categorias' },
    {
      value: blogPosts.reduce((acc, post) => acc + post.views, 0),
      labelEn: 'Total Views',
      labelPt: 'Visualizações',
    },
    {
      value: blogPosts.reduce((acc, post) => acc + post.likes, 0),
      labelEn: 'Total Likes',
      labelPt: 'Curtidas',
    },
  ];

  const statsVariants = getAnimationVariants(createStaggerVariants(0.2));
  const statVariants = getAnimationVariants(createSlideVariants('up', 20));

  return (
    <MotionBox variants={statsVariants} initial="hidden" animate="visible" as={Box}>
      <Grid templateColumns="repeat(4, 1fr)" gap={6} maxW="600px" mx="auto" mb={12}>
        {stats.map((stat, index) => (
          <motion.div key={index} variants={statVariants}>
            <GridItem textAlign="center">
              <VStack spacing={1}>
                <Text
                  fontSize="2xl"
                  fontWeight="bold"
                  color="primary.600"
                  _dark={{ color: 'accent.300' }}
                >
                  {stat.value.toLocaleString()}
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

// ------- Componente principal -------
const EnhancedBlogSystem: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const { language } = useLanguage();
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const gridColumns = useBreakpointValue({
    base: '1fr',
    md: 'repeat(2, 1fr)',
    lg: 'repeat(3, 1fr)',
  });

  const filteredAndSortedPosts = useMemo(() => {
    let filtered = blogPosts.filter((post) => {
      const q = debouncedSearchTerm.toLowerCase();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q));

      const matchesCategory = !selectedCategory || post.category === selectedCategory;
      const matchesTag = !selectedTag || post.tags.includes(selectedTag);

      return matchesSearch && matchesCategory && matchesTag;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
        case 'popular':
          return b.views - a.views;
        case 'liked':
          return b.likes - a.likes;
        case 'newest':
        default:
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      }
    });

    return filtered;
  }, [debouncedSearchTerm, selectedCategory, selectedTag, sortBy]);

  const featuredPost = filteredAndSortedPosts[0];
  const regularPosts = filteredAndSortedPosts.slice(1);

  const sectionVariants = getAnimationVariants(createStaggerVariants(0.3));
  const titleVariants = getAnimationVariants(createSlideVariants('up', 30));
  const gridVariants = getAnimationVariants(createStaggerVariants(0.1));

  return (
    <Box as="section" id="blog" py={20} ref={ref}>
      <Container maxW="7xl">
        <MotionBox
          variants={sectionVariants}
          initial="hidden"
          animate={isIntersecting ? 'visible' : 'hidden'}
          as={Box}
        >
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
                {language === 'en' ? 'Blog' : 'Blog'}
              </Text>

              <Text
                fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
                fontWeight="bold"
                color="neutral.800"
                _dark={{ color: 'neutral.100' }}
                lineHeight="shorter"
              >
                {language === 'en' ? 'Latest Articles & Insights' : 'Últimos Artigos e Insights'}
              </Text>

              <Text
                fontSize={{ base: 'md', md: 'lg' }}
                color="neutral.600"
                _dark={{ color: 'neutral.400' }}
                maxW="600px"
                lineHeight="relaxed"
              >
                {language === 'en'
                  ? 'Sharing knowledge, experiences, and insights about web development, technology trends, and best practices.'
                  : 'Compartilhando conhecimento, experiências e insights sobre desenvolvimento web, tendências tecnológicas e melhores práticas.'}
              </Text>
            </VStack>
          </motion.div>

          {/* Stats */}
          <BlogStats />

          {/* Filtros */}
          <BlogFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedTag={selectedTag}
            onTagChange={setSelectedTag}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />

          {/* Contagem */}
          <motion.div variants={titleVariants}>
            <Text fontSize="sm" color="neutral.600" _dark={{ color: 'neutral.400' }} mb={8}>
              {language === 'en'
                ? `Showing ${filteredAndSortedPosts.length} article${
                    filteredAndSortedPosts.length !== 1 ? 's' : ''
                  }`
                : `Mostrando ${filteredAndSortedPosts.length} artigo${
                    filteredAndSortedPosts.length !== 1 ? 's' : ''
                  }`}
            </Text>
          </motion.div>

          {/* Grid de posts */}
          <AnimatePresence mode="wait">
            {filteredAndSortedPosts.length > 0 ? (
              <MotionGrid
                key={`${selectedCategory}-${selectedTag}-${sortBy}`}
                variants={gridVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                as={Grid}
                templateColumns={gridColumns}
                gap={8}
              >
                {featuredPost && (
                  <BlogPostCard post={featuredPost} index={0} featured={true} />
                )}

                {regularPosts.map((post, index) => (
                  <BlogPostCard key={post.id} post={post} index={index + 1} />
                ))}
              </MotionGrid>
            ) : (
              <motion.div variants={titleVariants}>
                <VStack spacing={6} py={16} textAlign="center">
                  <Text fontSize="xl" color="neutral.600" _dark={{ color: 'neutral.400' }}>
                    {language === 'en'
                      ? 'No articles found matching your criteria.'
                      : 'Nenhum artigo encontrado com os critérios selecionados.'}
                  </Text>

                  <Button
                    variant="outline"
                    colorScheme="primary"
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('');
                      setSelectedTag('');
                      setSortBy('newest');
                    }}
                  >
                    {language === 'en' ? 'Clear Filters' : 'Limpar Filtros'}
                  </Button>
                </VStack>
              </motion.div>
            )}
          </AnimatePresence>

          {/* CTA */}
          <motion.div variants={titleVariants}>
            <VStack spacing={6} textAlign="center" mt={16}>
              <Text fontSize="lg" color="neutral.600" _dark={{ color: 'neutral.400' }}>
                {language === 'en'
                  ? 'Want to stay updated with my latest articles?'
                  : 'Quer ficar atualizado com meus últimos artigos?'}
              </Text>

              <Button
                variant="gradient"
                size="lg"
                as="a"
                href="#contact"
                _hover={{ transform: 'translateY(-2px)', shadow: 'xl' }}
                transition="all 0.3s ease-in-out"
              >
                {language === 'en' ? 'Subscribe to Newsletter' : 'Inscrever-se na Newsletter'}
              </Button>
            </VStack>
          </motion.div>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default EnhancedBlogSystem;
