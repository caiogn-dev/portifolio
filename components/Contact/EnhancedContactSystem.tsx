'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Button,
  Grid,
  GridItem,
  Input,
  Textarea,
  Select,
  Checkbox,
  useBreakpointValue,
  IconButton,
  Tooltip
} from '@chakra-ui/react';
import { Field } from '@/components/ui/field';
import { toaster } from '@/components/ui/toaster';
import { useColorModeValue } from '@/components/ui/color-mode';
import { 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaLinkedin, 
  FaGithub, 
  FaTwitter,
  FaPaperPlane,
  FaUser,
  FaBuilding,
  FaCalendar,
  FaClock
} from 'react-icons/fa';

import { personalInfo, socialLinks } from '@/lib/data/personal';
import { useLanguage, useTheme } from '@/lib/context/AppContext';
import { useIntersectionObserver, useForm } from '@/lib/hooks';
import { validateEmail, validatePhone, sanitizeInput } from '@/lib/utils/validation';
import { 
  getAnimationVariants, 
  createSlideVariants, 
  createStaggerVariants,
  cardHoverVariants,
  fadeVariants
} from '@/lib/utils/animations';

// Enhanced motion components
const MotionBox = motion.create(Box);
const MotionGrid = motion.create(Grid);
const MotionGridItem = motion.create(GridItem);

// Form data interface
interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  projectType: string;
  budget: string;
  timeline: string;
  newsletter: boolean;
}

// Contact info card component
const ContactInfoCard: React.FC<{
  icon: React.ElementType;
  title: string;
  value: string;
  href?: string;
  index: number;
}> = ({ icon: IconComponent, title, value, href, index }) => {
  const cardBg = useColorModeValue('white', 'neutral.800');
  const borderColor = useColorModeValue('neutral.200', 'neutral.700');

  const cardVariants = getAnimationVariants({
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: 'easeOut'
      }
    }
  });

  const CardContent = (
    <MotionBox
      bg={cardBg}
      border="1px solid"
      borderColor={borderColor}
      borderRadius="xl"
      p={6}
      textAlign="center"
      variants={cardHoverVariants}
      whileHover="hover"
      _hover={{
        borderColor: 'primary.300',
        shadow: 'lg'
      }}
      transition="all 0.3s ease-in-out"
    >
      <VStack spacing={4}>
        <Box
          as={IconComponent}
          fontSize="2xl"
          color="primary.500"
          _dark={{ color: 'accent.300' }}
        />
        <Text
          fontSize="lg"
          fontWeight="semibold"
          color="neutral.800"
          _dark={{ color: 'neutral.100' }}
        >
          {title}
        </Text>
        <Text
          fontSize="sm"
          color="neutral.600"
          _dark={{ color: 'neutral.400' }}
        >
          {value}
        </Text>
      </VStack>
    </MotionBox>
  );

  return (
    <MotionGridItem variants={cardVariants}>
      {href ? (
        <Box as="a" href={href} target="_blank" rel="noopener noreferrer">
          {CardContent}
        </Box>
      ) : (
        CardContent
      )}
    </MotionGridItem>
  );
};

// Social links component
const SocialLinks: React.FC = () => {
  const { language } = useLanguage();
  
  const socialIcons = {
    linkedin: FaLinkedin,
    github: FaGithub,
    twitter: FaTwitter,
    email: FaEnvelope
  };

  const linksVariants = getAnimationVariants(createStaggerVariants(0.1));
  const linkVariants = getAnimationVariants(fadeVariants);

  return (
    <MotionBox
      variants={linksVariants}
      initial="hidden"
      animate="visible"
    >
      <VStack spacing={4} align="center">
        <Text
          fontSize="lg"
          fontWeight="semibold"
          color="neutral.800"
          _dark={{ color: 'neutral.100' }}
        >
          {language === 'en' ? 'Connect With Me' : 'Conecte-se Comigo'}
        </Text>
        
        <HStack spacing={4}>
          {socialLinks.map((link, index) => {
            const IconComponent = socialIcons[link.platform as keyof typeof socialIcons];
            if (!IconComponent) return null;
            
            return (
              <motion.div key={link.platform} variants={linkVariants}>
                <Tooltip label={link.platform} placement="top">
                  <IconButton
                    as="a"
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.platform}
                    icon={<IconComponent />}
                    variant="ghost"
                    colorScheme="primary"
                    size="lg"
                    borderRadius="full"
                    _hover={{
                      transform: 'translateY(-2px)',
                      shadow: 'md'
                    }}
                    transition="all 0.2s ease-in-out"
                  />
                </Tooltip>
              </motion.div>
            );
          })}
        </HStack>
      </VStack>
    </MotionBox>
  );
};

// Contact form component
const ContactForm: React.FC = () => {
  const { language } = useLanguage();
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm
  } = useForm<ContactFormData>({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      subject: '',
      message: '',
      projectType: '',
      budget: '',
      timeline: '',
      newsletter: false
    },
    validate: (values) => {
      const errors: Partial<ContactFormData> = {};
      
      if (!values.name.trim()) {
        errors.name = language === 'en' ? 'Name is required' : 'Nome é obrigatório';
      }
      
      if (!values.email.trim()) {
        errors.email = language === 'en' ? 'Email is required' : 'Email é obrigatório';
      } else if (!validateEmail(values.email)) {
        errors.email = language === 'en' ? 'Invalid email format' : 'Formato de email inválido';
      }
      
      if (values.phone && !validatePhone(values.phone)) {
        errors.phone = language === 'en' ? 'Invalid phone format' : 'Formato de telefone inválido';
      }
      
      if (!values.subject.trim()) {
        errors.subject = language === 'en' ? 'Subject is required' : 'Assunto é obrigatório';
      }
      
      if (!values.message.trim()) {
        errors.message = language === 'en' ? 'Message is required' : 'Mensagem é obrigatória';
      } else if (values.message.trim().length < 10) {
        errors.message = language === 'en' 
          ? 'Message must be at least 10 characters' 
          : 'Mensagem deve ter pelo menos 10 caracteres';
      }
      
      return errors;
    },
    onSubmit: async (values) => {
      setIsSubmitting(true);
      setSubmitStatus('idle');
      
      try {
        // Sanitize inputs
        const sanitizedData = {
          ...values,
          name: sanitizeInput(values.name),
          email: sanitizeInput(values.email),
          phone: values.phone ? sanitizeInput(values.phone) : '',
          company: values.company ? sanitizeInput(values.company) : '',
          subject: sanitizeInput(values.subject),
          message: sanitizeInput(values.message)
        };

        // Simulate API call (replace with actual implementation)
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // In a real implementation, you would send the data to your backend
        console.log('Contact form submitted:', sanitizedData);
        
        setSubmitStatus('success');
        resetForm();
        
        toast({
          title: language === 'en' ? 'Message Sent!' : 'Mensagem Enviada!',
          description: language === 'en' 
            ? 'Thank you for your message. I\'ll get back to you soon!'
            : 'Obrigado pela sua mensagem. Entrarei em contato em breve!',
          status: 'success',
          duration: 5000,
          isClosable: true
        });
        
      } catch (error) {
        setSubmitStatus('error');
        toast({
          title: language === 'en' ? 'Error' : 'Erro',
          description: language === 'en' 
            ? 'Failed to send message. Please try again.'
            : 'Falha ao enviar mensagem. Tente novamente.',
          status: 'error',
          duration: 5000,
          isClosable: true
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  });

  const formVariants = getAnimationVariants(createStaggerVariants(0.1));
  const fieldVariants = getAnimationVariants(createSlideVariants('up', 20));

  return (
    <MotionBox
      variants={formVariants}
      initial="hidden"
      animate="visible"
    >
      <Box
        as="form"
        onSubmit={handleSubmit}
        bg={useColorModeValue('white', 'neutral.800')}
        border="1px solid"
        borderColor={useColorModeValue('neutral.200', 'neutral.700')}
        borderRadius="xl"
        p={8}
        shadow="lg"
      >
        <VStack spacing={6} align="stretch">
          {/* Form Header */}
          <motion.div variants={fieldVariants}>
            <VStack spacing={2} textAlign="center">
              <Text
                fontSize="2xl"
                fontWeight="bold"
                color="neutral.800"
                _dark={{ color: 'neutral.100' }}
              >
                {language === 'en' ? 'Let\'s Work Together' : 'Vamos Trabalhar Juntos'}
              </Text>
              <Text
                fontSize="md"
                color="neutral.600"
                _dark={{ color: 'neutral.400' }}
              >
                {language === 'en' 
                  ? 'Tell me about your project and I\'ll get back to you within 24 hours.'
                  : 'Conte-me sobre seu projeto e entrarei em contato em até 24 horas.'
                }
              </Text>
            </VStack>
          </motion.div>

          {/* Success/Error Messages */}
          {submitStatus === 'success' && (
            <motion.div variants={fieldVariants}>
              <Alert status="success" borderRadius="md">
                <AlertIcon />
                <Box>
                  <AlertTitle>
                    {language === 'en' ? 'Success!' : 'Sucesso!'}
                  </AlertTitle>
                  <AlertDescription>
                    {language === 'en' 
                      ? 'Your message has been sent successfully.'
                      : 'Sua mensagem foi enviada com sucesso.'
                    }
                  </AlertDescription>
                </Box>
              </Alert>
            </motion.div>
          )}

          {submitStatus === 'error' && (
            <motion.div variants={fieldVariants}>
              <Alert status="error" borderRadius="md">
                <AlertIcon />
                <Box>
                  <AlertTitle>
                    {language === 'en' ? 'Error!' : 'Erro!'}
                  </AlertTitle>
                  <AlertDescription>
                    {language === 'en' 
                      ? 'Failed to send your message. Please try again.'
                      : 'Falha ao enviar sua mensagem. Tente novamente.'
                    }
                  </AlertDescription>
                </Box>
              </Alert>
            </motion.div>
          )}

          {/* Personal Information */}
          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
            <motion.div variants={fieldVariants}>
              <GridItem>
                <FormControl isInvalid={!!(errors.name && touched.name)} isRequired>
                  <FormLabel>
                    {language === 'en' ? 'Full Name' : 'Nome Completo'}
                  </FormLabel>
                  <Input
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={language === 'en' ? 'John Doe' : 'João Silva'}
                    leftElement={<FaUser />}
                  />
                  <FormErrorMessage>{errors.name}</FormErrorMessage>
                </FormControl>
              </GridItem>
            </motion.div>

            <motion.div variants={fieldVariants}>
              <GridItem>
                <FormControl isInvalid={!!(errors.email && touched.email)} isRequired>
                  <FormLabel>
                    {language === 'en' ? 'Email Address' : 'Endereço de Email'}
                  </FormLabel>
                  <Input
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={language === 'en' ? 'john@example.com' : 'joao@exemplo.com'}
                    leftElement={<FaEnvelope />}
                  />
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>
              </GridItem>
            </motion.div>

            <motion.div variants={fieldVariants}>
              <GridItem>
                <FormControl isInvalid={!!(errors.phone && touched.phone)}>
                  <FormLabel>
                    {language === 'en' ? 'Phone Number' : 'Número de Telefone'}
                  </FormLabel>
                  <Input
                    name="phone"
                    type="tel"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={language === 'en' ? '+1 (555) 123-4567' : '+55 (11) 99999-9999'}
                    leftElement={<FaPhone />}
                  />
                  <FormErrorMessage>{errors.phone}</FormErrorMessage>
                </FormControl>
              </GridItem>
            </motion.div>

            <motion.div variants={fieldVariants}>
              <GridItem>
                <FormControl>
                  <FormLabel>
                    {language === 'en' ? 'Company' : 'Empresa'}
                  </FormLabel>
                  <Input
                    name="company"
                    value={values.company}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={language === 'en' ? 'Your Company' : 'Sua Empresa'}
                    leftElement={<FaBuilding />}
                  />
                </FormControl>
              </GridItem>
            </motion.div>
          </Grid>

          {/* Project Information */}
          <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={4}>
            <motion.div variants={fieldVariants}>
              <GridItem>
                <FormControl>
                  <FormLabel>
                    {language === 'en' ? 'Project Type' : 'Tipo de Projeto'}
                  </FormLabel>
                  <Select
                    name="projectType"
                    value={values.projectType}
                    onChange={handleChange}
                    placeholder={language === 'en' ? 'Select type' : 'Selecione o tipo'}
                  >
                    <option value="web-app">
                      {language === 'en' ? 'Web Application' : 'Aplicação Web'}
                    </option>
                    <option value="mobile-app">
                      {language === 'en' ? 'Mobile App' : 'App Mobile'}
                    </option>
                    <option value="website">
                      {language === 'en' ? 'Website' : 'Site'}
                    </option>
                    <option value="ecommerce">
                      {language === 'en' ? 'E-commerce' : 'E-commerce'}
                    </option>
                    <option value="consulting">
                      {language === 'en' ? 'Consulting' : 'Consultoria'}
                    </option>
                    <option value="other">
                      {language === 'en' ? 'Other' : 'Outro'}
                    </option>
                  </Select>
                </FormControl>
              </GridItem>
            </motion.div>

            <motion.div variants={fieldVariants}>
              <GridItem>
                <FormControl>
                  <FormLabel>
                    {language === 'en' ? 'Budget Range' : 'Faixa de Orçamento'}
                  </FormLabel>
                  <Select
                    name="budget"
                    value={values.budget}
                    onChange={handleChange}
                    placeholder={language === 'en' ? 'Select budget' : 'Selecione orçamento'}
                  >
                    <option value="under-5k">
                      {language === 'en' ? 'Under $5,000' : 'Abaixo de R$ 25.000'}
                    </option>
                    <option value="5k-15k">
                      {language === 'en' ? '$5,000 - $15,000' : 'R$ 25.000 - R$ 75.000'}
                    </option>
                    <option value="15k-50k">
                      {language === 'en' ? '$15,000 - $50,000' : 'R$ 75.000 - R$ 250.000'}
                    </option>
                    <option value="over-50k">
                      {language === 'en' ? 'Over $50,000' : 'Acima de R$ 250.000'}
                    </option>
                  </Select>
                </FormControl>
              </GridItem>
            </motion.div>

            <motion.div variants={fieldVariants}>
              <GridItem>
                <FormControl>
                  <FormLabel>
                    {language === 'en' ? 'Timeline' : 'Prazo'}
                  </FormLabel>
                  <Select
                    name="timeline"
                    value={values.timeline}
                    onChange={handleChange}
                    placeholder={language === 'en' ? 'Select timeline' : 'Selecione prazo'}
                  >
                    <option value="asap">
                      {language === 'en' ? 'ASAP' : 'O mais rápido possível'}
                    </option>
                    <option value="1-month">
                      {language === 'en' ? '1 Month' : '1 Mês'}
                    </option>
                    <option value="2-3-months">
                      {language === 'en' ? '2-3 Months' : '2-3 Meses'}
                    </option>
                    <option value="3-6-months">
                      {language === 'en' ? '3-6 Months' : '3-6 Meses'}
                    </option>
                    <option value="flexible">
                      {language === 'en' ? 'Flexible' : 'Flexível'}
                    </option>
                  </Select>
                </FormControl>
              </GridItem>
            </motion.div>
          </Grid>

          {/* Subject and Message */}
          <motion.div variants={fieldVariants}>
            <FormControl isInvalid={!!(errors.subject && touched.subject)} isRequired>
              <FormLabel>
                {language === 'en' ? 'Subject' : 'Assunto'}
              </FormLabel>
              <Input
                name="subject"
                value={values.subject}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={language === 'en' ? 'Project inquiry' : 'Consulta sobre projeto'}
              />
              <FormErrorMessage>{errors.subject}</FormErrorMessage>
            </FormControl>
          </motion.div>

          <motion.div variants={fieldVariants}>
            <FormControl isInvalid={!!(errors.message && touched.message)} isRequired>
              <FormLabel>
                {language === 'en' ? 'Message' : 'Mensagem'}
              </FormLabel>
              <Textarea
                name="message"
                value={values.message}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={language === 'en' 
                  ? 'Tell me about your project, goals, and requirements...'
                  : 'Conte-me sobre seu projeto, objetivos e requisitos...'
                }
                rows={6}
                resize="vertical"
              />
              <FormErrorMessage>{errors.message}</FormErrorMessage>
            </FormControl>
          </motion.div>

          {/* Newsletter Checkbox */}
          <motion.div variants={fieldVariants}>
            <Checkbox
              name="newsletter"
              isChecked={values.newsletter}
              onChange={handleChange}
              colorScheme="primary"
            >
              <Text fontSize="sm" color="neutral.600" _dark={{ color: 'neutral.400' }}>
                {language === 'en' 
                  ? 'Subscribe to my newsletter for updates and tech insights'
                  : 'Inscreva-se na minha newsletter para atualizações e insights de tecnologia'
                }
              </Text>
            </Checkbox>
          </motion.div>

          {/* Submit Button */}
          <motion.div variants={fieldVariants}>
            <Button
              type="submit"
              variant="gradient"
              size="lg"
              width="100%"
              isLoading={isSubmitting}
              loadingText={language === 'en' ? 'Sending...' : 'Enviando...'}
              leftIcon={<FaPaperPlane />}
              _hover={{
                transform: 'translateY(-2px)',
                shadow: 'xl'
              }}
              transition="all 0.3s ease-in-out"
            >
              {language === 'en' ? 'Send Message' : 'Enviar Mensagem'}
            </Button>
          </motion.div>
        </VStack>
      </Box>
    </MotionBox>
  );
};

// Main component
const EnhancedContactSystem: React.FC = () => {
  const { language } = useLanguage();
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });
  
  // Responsive grid columns
  const gridColumns = useBreakpointValue({ 
    base: '1fr', 
    md: 'repeat(3, 1fr)'
  });

  // Contact information
  const contactInfo = [
    {
      icon: FaEnvelope,
      title: language === 'en' ? 'Email' : 'Email',
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`
    },
    {
      icon: FaPhone,
      title: language === 'en' ? 'Phone' : 'Telefone',
      value: personalInfo.phone,
      href: `tel:${personalInfo.phone}`
    },
    {
      icon: FaMapMarkerAlt,
      title: language === 'en' ? 'Location' : 'Localização',
      value: personalInfo.location
    }
  ];

  // Animation variants
  const sectionVariants = getAnimationVariants(createStaggerVariants(0.3));
  const titleVariants = getAnimationVariants(createSlideVariants('up', 30));
  const gridVariants = getAnimationVariants(createStaggerVariants(0.1));

  return (
    <Box
      as="section"
      id="contact"
      py={20}
      bg="neutral.50"
      _dark={{ bg: 'neutral.900' }}
      ref={ref}
    >
      <Container maxW="7xl">
        <MotionBox
          variants={sectionVariants}
          initial="hidden"
          animate={isIntersecting ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={titleVariants}>
            <VStack spacing={6} textAlign="center" mb={16}>
              <Text
                fontSize="sm"
                fontWeight="semibold"
                color="primary.500"
                textTransform="uppercase"
                letterSpacing="wider"
              >
                {language === 'en' ? 'Get In Touch' : 'Entre em Contato'}
              </Text>
              
              <Text
                fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
                fontWeight="bold"
                color="neutral.800"
                _dark={{ color: 'neutral.100' }}
                lineHeight="shorter"
              >
                {language === 'en' 
                  ? 'Let\'s Build Something Amazing'
                  : 'Vamos Construir Algo Incrível'
                }
              </Text>
              
              <Text
                fontSize={{ base: 'md', md: 'lg' }}
                color="neutral.600"
                _dark={{ color: 'neutral.400' }}
                maxW="600px"
                lineHeight="relaxed"
              >
                {language === 'en'
                  ? 'Ready to turn your ideas into reality? Let\'s discuss your project and create something extraordinary together.'
                  : 'Pronto para transformar suas ideias em realidade? Vamos discutir seu projeto e criar algo extraordinário juntos.'
                }
              </Text>
            </VStack>
          </motion.div>

          {/* Contact Information Cards */}
          <MotionGrid
            templateColumns={gridColumns}
            gap={6}
            mb={16}
            variants={gridVariants}
            initial="hidden"
            animate={isIntersecting ? "visible" : "hidden"}
          >
            {contactInfo.map((info, index) => (
              <ContactInfoCard
                key={index}
                icon={info.icon}
                title={info.title}
                value={info.value}
                href={info.href}
                index={index}
              />
            ))}
          </MotionGrid>

          {/* Contact Form and Social Links */}
          <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={12} alignItems="start">
            <GridItem>
              <ContactForm />
            </GridItem>
            
            <GridItem>
              <VStack spacing={8} align="stretch">
                <SocialLinks />
                
                {/* Additional Info */}
                <motion.div variants={titleVariants}>
                  <Box
                    bg={useColorModeValue('white', 'neutral.800')}
                    border="1px solid"
                    borderColor={useColorModeValue('neutral.200', 'neutral.700')}
                    borderRadius="xl"
                    p={6}
                  >
                    <VStack spacing={4} align="stretch">
                      <Text
                        fontSize="lg"
                        fontWeight="semibold"
                        color="neutral.800"
                        _dark={{ color: 'neutral.100' }}
                      >
                        {language === 'en' ? 'Quick Info' : 'Informações Rápidas'}
                      </Text>
                      
                      <VStack spacing={3} align="stretch">
                        <HStack>
                          <FaClock color="var(--chakra-colors-primary-500)" />
                          <Text fontSize="sm" color="neutral.600" _dark={{ color: 'neutral.400' }}>
                            {language === 'en' 
                              ? 'Response time: Within 24 hours'
                              : 'Tempo de resposta: Em até 24 horas'
                            }
                          </Text>
                        </HStack>
                        
                        <HStack>
                          <FaCalendar color="var(--chakra-colors-primary-500)" />
                          <Text fontSize="sm" color="neutral.600" _dark={{ color: 'neutral.400' }}>
                            {language === 'en' 
                              ? 'Available for new projects'
                              : 'Disponível para novos projetos'
                            }
                          </Text>
                        </HStack>
                        
                        <HStack>
                          <FaMapMarkerAlt color="var(--chakra-colors-primary-500)" />
                          <Text fontSize="sm" color="neutral.600" _dark={{ color: 'neutral.400' }}>
                            {language === 'en' 
                              ? 'Remote work worldwide'
                              : 'Trabalho remoto mundial'
                            }
                          </Text>
                        </HStack>
                      </VStack>
                    </VStack>
                  </Box>
                </motion.div>
              </VStack>
            </GridItem>
          </Grid>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default EnhancedContactSystem;