import { PersonalInfo, SocialLink, Skill, SkillCategory } from '@/lib/types';

// =============================
// ÍCONES (react-icons)
// =============================
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaServer,
  FaCode,
  FaDatabase,
  FaTools,
  FaMobile,
  FaCloud,
  FaReact,
  FaJs,
  FaHtml5,
  FaCss3Alt,
  FaNodeJs,
  FaPython,
  FaJava,
  FaGitAlt,
  FaDocker,
  FaAws,
} from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiChakraui,
  SiGraphql,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiPrisma,
  SiKubernetes,
  SiWebpack,
  SiVite,
  SiExpo,
  SiVercel,
  SiNetlify,
} from 'react-icons/si';
import { BsTwitterX } from 'react-icons/bs';

// =============================
// HELPERS
// =============================
type LevelName = 'beginner' | 'intermediate' | 'advanced' | 'expert';
const toLevel = (proficiency: number): LevelName => {
  if (proficiency >= 90) return 'expert';
  if (proficiency >= 80) return 'advanced';
  if (proficiency >= 65) return 'intermediate';
  return 'beginner';
};

// =============================
// PERSONAL INFO
// =============================
export const personalInfo: PersonalInfo = {
  name: 'João Silva',
  title: 'Full Stack Developer',
  subtitle: 'Building exceptional digital experiences',
  description:
    'Passionate full-stack developer with 5+ years of experience creating scalable web applications and mobile solutions. Specialized in React, Node.js, and cloud technologies. I love turning complex problems into simple, beautiful, and intuitive solutions.',
  location: 'São Paulo, Brazil',
  email: 'joao.silva@example.com',
  phone: '+55 11 99999-9999',
  avatar: '/images/avatar.jpg',
  resume: '/documents/joao-silva-resume.pdf',
};

// =============================
// SOCIAL LINKS (ícones como componentes!)
// =============================
export const socialLinks: SocialLink[] = [
  {
    id: 'github',
    platform: 'GitHub',
    url: 'https://github.com/joaosilva',
    icon: FaGithub,
    label: 'View my code repositories',
    color: '#333',
  },
  {
    id: 'linkedin',
    platform: 'LinkedIn',
    url: 'https://linkedin.com/in/joaosilva',
    icon: FaLinkedin,
    label: 'Connect with me professionally',
    color: '#0077B5',
  },
  {
    id: 'twitter',
    platform: 'Twitter',
    url: 'https://twitter.com/joaosilva',
    icon: BsTwitterX,
    label: 'Follow me on Twitter',
    color: '#1DA1F2',
  },
  {
    id: 'instagram',
    platform: 'Instagram',
    url: 'https://instagram.com/joaosilva',
    icon: FaInstagram,
    label: 'Follow my journey',
    color: '#E4405F',
  },
  {
    id: 'email',
    platform: 'Email',
    url: 'mailto:joao.silva@example.com',
    icon: MdEmail,
    label: 'Send me an email',
    color: '#EA4335',
  },
];

// =============================
// SKILL CATEGORIES (ícones como componentes!)
// =============================
export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    name: 'Frontend',
    icon: FaCode,
    color: 'blue.500',
  },
  {
    id: 'backend',
    name: 'Backend',
    icon: FaServer,
    color: 'green.500',
  },
  {
    id: 'database',
    name: 'Database',
    icon: FaDatabase,
    color: 'purple.500',
  },
  {
    id: 'tools',
    name: 'Tools & DevOps',
    icon: FaTools,
    color: 'orange.500',
  },
  {
    id: 'mobile',
    name: 'Mobile',
    icon: FaMobile,
    color: 'pink.500',
  },
  {
    id: 'cloud',
    name: 'Cloud & Infrastructure',
    icon: FaCloud,
    color: 'cyan.500',
  },
];

// =============================
// SKILLS (compatível com seu Showcase)
// - usa proficiency (0-100)
// - level categórico calculado
// - yearsOfExperience incluído
// - ícones como componentes
// - cores como tokens do Chakra (ou nomes válidos)
// =============================
export const skills: Skill[] = [
  // Frontend
  {
    id: 'react',
    name: 'React',
    category: 'frontend',
    proficiency: 95,
    level: toLevel(95),
    yearsOfExperience: 5,
    icon: FaReact,
    color: 'cyan.400',
    description:
      'Advanced React development with hooks, context, and performance optimization',
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'frontend',
    proficiency: 90,
    level: toLevel(90),
    yearsOfExperience: 4,
    icon: SiNextdotjs,
    color: 'gray.900',
    description: 'Full-stack React framework with SSR, SSG, and API routes',
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'frontend',
    proficiency: 88,
    level: toLevel(88),
    yearsOfExperience: 4,
    icon: SiTypescript,
    color: 'blue.500',
    description:
      'Type-safe JavaScript development with advanced TypeScript features',
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'frontend',
    proficiency: 92,
    level: toLevel(92),
    yearsOfExperience: 6,
    icon: FaJs,
    color: 'yellow.400',
    description:
      'Modern ES6+ JavaScript with deep understanding of the language',
  },
  {
    id: 'html',
    name: 'HTML5',
    category: 'frontend',
    proficiency: 95,
    level: toLevel(95),
    yearsOfExperience: 7,
    icon: FaHtml5,
    color: 'orange.500',
    description: 'Semantic HTML5 with accessibility and SEO best practices',
  },
  {
    id: 'css',
    name: 'CSS3',
    category: 'frontend',
    proficiency: 90,
    level: toLevel(90),
    yearsOfExperience: 7,
    icon: FaCss3Alt,
    color: 'blue.500',
    description:
      'Advanced CSS with Flexbox, Grid, animations, and responsive design',
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'frontend',
    proficiency: 85,
    level: toLevel(85),
    yearsOfExperience: 3,
    icon: SiTailwindcss,
    color: 'cyan.400',
    description: 'Utility-first CSS framework for rapid UI development',
  },
  {
    id: 'chakra',
    name: 'Chakra UI',
    category: 'frontend',
    proficiency: 80,
    level: toLevel(80),
    yearsOfExperience: 3,
    icon: SiChakraui,
    color: 'teal.500',
    description:
      'Component library for React with excellent developer experience',
  },

  // Backend
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'backend',
    proficiency: 88,
    level: toLevel(88),
    yearsOfExperience: 5,
    icon: FaNodeJs,
    color: 'green.500',
    description:
      'Server-side JavaScript with Express, Fastify, and microservices',
  },
  {
    id: 'python',
    name: 'Python',
    category: 'backend',
    proficiency: 85,
    level: toLevel(85),
    yearsOfExperience: 5,
    icon: FaPython,
    color: 'blue.600',
    description:
      'Backend development with Django, FastAPI, and data processing',
  },
  {
    id: 'java',
    name: 'Java',
    category: 'backend',
    proficiency: 75,
    level: toLevel(75),
    yearsOfExperience: 3,
    icon: FaJava,
    color: 'orange.400',
    description:
      'Enterprise Java development with Spring Boot and microservices',
  },
  {
    id: 'graphql',
    name: 'GraphQL',
    category: 'backend',
    proficiency: 80,
    level: toLevel(80),
    yearsOfExperience: 3,
    icon: SiGraphql,
    color: 'pink.500',
    description: 'API development with GraphQL, Apollo, and schema design',
  },
  {
    id: 'rest',
    name: 'REST APIs',
    category: 'backend',
    proficiency: 92,
    level: toLevel(92),
    yearsOfExperience: 6,
    icon: FaServer,
    color: 'red.400',
    description: 'RESTful API design, documentation, and best practices',
  },

  // Database
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'database',
    proficiency: 85,
    level: toLevel(85),
    yearsOfExperience: 4,
    icon: SiPostgresql,
    color: 'blue.700',
    description: 'Advanced SQL, query optimization, and database design',
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'database',
    proficiency: 80,
    level: toLevel(80),
    yearsOfExperience: 4,
    icon: SiMongodb,
    color: 'green.600',
    description:
      'NoSQL database design, aggregation pipelines, and performance',
  },
  {
    id: 'redis',
    name: 'Redis',
    category: 'database',
    proficiency: 75,
    level: toLevel(75),
    yearsOfExperience: 3,
    icon: SiRedis,
    color: 'red.500',
    description: 'Caching, session storage, and real-time data structures',
  },
  {
    id: 'prisma',
    name: 'Prisma',
    category: 'database',
    proficiency: 82,
    level: toLevel(82),
    yearsOfExperience: 3,
    icon: SiPrisma,
    color: 'gray.700',
    description:
      'Type-safe database access with migrations and schema management',
  },

  // Tools & DevOps
  {
    id: 'git',
    name: 'Git',
    category: 'tools',
    proficiency: 90,
    level: toLevel(90),
    yearsOfExperience: 7,
    icon: FaGitAlt,
    color: 'orange.500',
    description:
      'Version control, branching strategies, and collaborative workflows',
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'tools',
    proficiency: 82,
    level: toLevel(82),
    yearsOfExperience: 4,
    icon: FaDocker,
    color: 'blue.500',
    description: 'Containerization, multi-stage builds, and orchestration',
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes',
    category: 'tools',
    proficiency: 70,
    level: toLevel(70),
    yearsOfExperience: 2,
    icon: SiKubernetes,
    color: 'blue.600',
    description:
      'Container orchestration, deployments, and cluster management',
  },
  {
    id: 'webpack',
    name: 'Webpack',
    category: 'tools',
    proficiency: 75,
    level: toLevel(75),
    yearsOfExperience: 3,
    icon: SiWebpack,
    color: 'cyan.300',
    description: 'Module bundling, optimization, and build configuration',
  },
  {
    id: 'vite',
    name: 'Vite',
    category: 'tools',
    proficiency: 85,
    level: toLevel(85),
    yearsOfExperience: 3,
    icon: SiVite,
    color: 'indigo.400',
    description:
      'Fast build tool with HMR and modern development experience',
  },

  // Mobile
  {
    id: 'react-native',
    name: 'React Native',
    category: 'mobile',
    proficiency: 78,
    level: toLevel(78),
    yearsOfExperience: 3,
    icon: FaReact,
    color: 'cyan.400',
    description:
      'Cross-platform mobile development with native performance',
  },
  {
    id: 'expo',
    name: 'Expo',
    category: 'mobile',
    proficiency: 80,
    level: toLevel(80),
    yearsOfExperience: 3,
    icon: SiExpo,
    color: 'gray.900',
    description: 'Rapid mobile app development and deployment platform',
  },

  // Cloud & Infrastructure
  {
    id: 'aws',
    name: 'AWS',
    category: 'cloud',
    proficiency: 75,
    level: toLevel(75),
    yearsOfExperience: 3,
    icon: FaAws,
    color: 'orange.400',
    description:
      'Cloud services, Lambda, S3, RDS, and infrastructure as code',
  },
  {
    id: 'vercel',
    name: 'Vercel',
    category: 'cloud',
    proficiency: 88,
    level: toLevel(88),
    yearsOfExperience: 4,
    icon: SiVercel,
    color: 'gray.900',
    description:
      'Serverless deployment platform with excellent DX',
  },
  {
    id: 'netlify',
    name: 'Netlify',
    category: 'cloud',
    proficiency: 85,
    level: toLevel(85),
    yearsOfExperience: 4,
    icon: SiNetlify,
    color: 'teal.400',
    description:
      'JAMstack deployment with continuous integration',
  },
];

// =============================
// BLOG
// =============================
export const blogCategories = [
  { id: 'tech', name: 'Technology', color: '#3182CE' },
  { id: 'web-dev', name: 'Web Development', color: '#38A169' },
  { id: 'mobile', name: 'Mobile Development', color: '#D69E2E' },
  { id: 'career', name: 'Career', color: '#9F7AEA' },
  { id: 'tutorials', name: 'Tutorials', color: '#E53E3E' },
];

export const blogPosts = [
  {
    id: '1',
    title: 'Building Scalable React Applications',
    slug: 'building-scalable-react-applications',
    excerpt:
      'Learn how to structure and build React applications that can grow with your team and requirements.',
    content: 'Full blog post content here...',
    category: 'web-dev',
    tags: ['React', 'JavaScript', 'Architecture'],
    publishedAt: '2024-01-15',
    readingTime: 8,
    featured: true,
    author: {
      name: 'João Silva',
      avatar: '/images/avatar.jpg',
    },
  },
  {
    id: '2',
    title: "Next.js 14: What's New and Exciting",
    slug: 'nextjs-14-whats-new',
    excerpt:
      'Explore the latest features and improvements in Next.js 14 and how they can benefit your projects.',
    content: 'Full blog post content here...',
    category: 'tech',
    tags: ['Next.js', 'React', 'Web Development'],
    publishedAt: '2024-01-10',
    readingTime: 6,
    featured: false,
    author: {
      name: 'João Silva',
      avatar: '/images/avatar.jpg',
    },
  },
];

// =============================
// PROJECTS
// =============================
export const projectCategories = [
  { id: 'web', name: 'Web Applications', color: '#3182CE' },
  { id: 'mobile', name: 'Mobile Apps', color: '#38A169' },
  { id: 'api', name: 'APIs & Backend', color: '#D69E2E' },
  { id: 'tools', name: 'Tools & Utilities', color: '#9F7AEA' },
  { id: 'open-source', name: 'Open Source', color: '#E53E3E' },
];

export const projects = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description:
      'A full-stack e-commerce solution built with Next.js, TypeScript, and Stripe integration.',
    longDescription:
      'Complete e-commerce platform with user authentication, product management, shopping cart, payment processing, and admin dashboard.',
    category: 'web',
    tags: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'],
    image: '/images/projects/ecommerce.jpg',
    images: ['/images/projects/ecommerce-1.jpg', '/images/projects/ecommerce-2.jpg'],
    demoUrl: 'https://ecommerce-demo.example.com',
    githubUrl: 'https://github.com/joaosilva/ecommerce-platform',
    featured: true,
    status: 'completed',
    startDate: '2023-06-01',
    endDate: '2023-09-15',
    technologies: [
      { name: 'Next.js', color: '#000000' },
      { name: 'TypeScript', color: '#3178C6' },
      { name: 'Tailwind CSS', color: '#06B6D4' },
      { name: 'PostgreSQL', color: '#336791' },
    ],
  },
  {
    id: '2',
    title: 'Task Management App',
    description:
      'A collaborative task management application with real-time updates and team features.',
    longDescription:
      'Modern task management app with drag-and-drop functionality, real-time collaboration, file attachments, and team management.',
    category: 'web',
    tags: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
    image: '/images/projects/taskapp.jpg',
    images: ['/images/projects/taskapp-1.jpg', '/images/projects/taskapp-2.jpg'],
    demoUrl: 'https://taskapp-demo.example.com',
    githubUrl: 'https://github.com/joaosilva/task-management',
    featured: true,
    status: 'completed',
    startDate: '2023-03-01',
    endDate: '2023-05-30',
    technologies: [
      { name: 'React', color: '#61DAFB' },
      { name: 'Node.js', color: '#339933' },
      { name: 'MongoDB', color: '#47A248' },
      { name: 'Socket.io', color: '#010101' },
    ],
  },
];
