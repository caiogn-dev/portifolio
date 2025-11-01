import { Skill, SkillCategory, SkillLevel } from '@/lib/types';

export const skills: Skill[] = [
  // Frontend Technologies
  {
    id: 'react',
    name: 'React',
    category: SkillCategory.FRONTEND,
    level: SkillLevel.EXPERT,
    icon: 'FaReact',
    description: 'Advanced React development with hooks, context, and performance optimization',
    yearsOfExperience: 4,
    projects: ['ecommerce-platform', 'task-manager', 'portfolio-website']
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: SkillCategory.FRONTEND,
    level: SkillLevel.ADVANCED,
    icon: 'SiNextdotjs',
    description: 'Full-stack React framework with SSR, SSG, and API routes',
    yearsOfExperience: 3,
    projects: ['portfolio-website', 'blog-platform', 'corporate-website']
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: SkillCategory.FRONTEND,
    level: SkillLevel.EXPERT,
    icon: 'SiTypescript',
    description: 'Type-safe JavaScript development with advanced type system knowledge',
    yearsOfExperience: 4,
    projects: ['ecommerce-platform', 'task-manager', 'api-gateway']
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: SkillCategory.FRONTEND,
    level: SkillLevel.MASTER,
    icon: 'FaJs',
    description: 'ES6+, async programming, functional programming, and modern JavaScript patterns',
    yearsOfExperience: 6,
    projects: ['ecommerce-platform', 'task-manager', 'portfolio-website', 'mobile-app']
  },
  {
    id: 'html5',
    name: 'HTML5',
    category: SkillCategory.FRONTEND,
    level: SkillLevel.MASTER,
    icon: 'FaHtml5',
    description: 'Semantic HTML, accessibility, and modern web standards',
    yearsOfExperience: 6,
    projects: ['portfolio-website', 'corporate-website', 'blog-platform']
  },
  {
    id: 'css3',
    name: 'CSS3',
    category: SkillCategory.FRONTEND,
    level: SkillLevel.EXPERT,
    icon: 'FaCss3Alt',
    description: 'Advanced CSS, animations, grid, flexbox, and responsive design',
    yearsOfExperience: 6,
    projects: ['portfolio-website', 'corporate-website', 'ecommerce-platform']
  },
  {
    id: 'tailwindcss',
    name: 'Tailwind CSS',
    category: SkillCategory.FRONTEND,
    level: SkillLevel.ADVANCED,
    icon: 'SiTailwindcss',
    description: 'Utility-first CSS framework for rapid UI development',
    yearsOfExperience: 2,
    projects: ['task-manager', 'blog-platform']
  },
  {
    id: 'chakraui',
    name: 'Chakra UI',
    category: SkillCategory.FRONTEND,
    level: SkillLevel.ADVANCED,
    icon: 'SiChakraui',
    description: 'Component library for React with excellent accessibility',
    yearsOfExperience: 2,
    projects: ['portfolio-website', 'corporate-website']
  },

  // Backend Technologies
  {
    id: 'nodejs',
    name: 'Node.js',
    category: SkillCategory.BACKEND,
    level: SkillLevel.EXPERT,
    icon: 'FaNodeJs',
    description: 'Server-side JavaScript with Express, Fastify, and microservices architecture',
    yearsOfExperience: 4,
    projects: ['ecommerce-platform', 'api-gateway', 'task-manager']
  },
  {
    id: 'python',
    name: 'Python',
    category: SkillCategory.BACKEND,
    level: SkillLevel.ADVANCED,
    icon: 'FaPython',
    description: 'Django, FastAPI, data analysis, and automation scripts',
    yearsOfExperience: 3,
    projects: ['data-analytics', 'automation-tools']
  },
  {
    id: 'express',
    name: 'Express.js',
    category: SkillCategory.BACKEND,
    level: SkillLevel.EXPERT,
    icon: 'SiExpress',
    description: 'RESTful APIs, middleware, authentication, and server-side logic',
    yearsOfExperience: 4,
    projects: ['ecommerce-platform', 'api-gateway', 'task-manager']
  },
  {
    id: 'graphql',
    name: 'GraphQL',
    category: SkillCategory.BACKEND,
    level: SkillLevel.INTERMEDIATE,
    icon: 'SiGraphql',
    description: 'Query language for APIs with Apollo Server and Client',
    yearsOfExperience: 2,
    projects: ['ecommerce-platform', 'task-manager']
  },

  // Database Technologies
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: SkillCategory.DATABASE,
    level: SkillLevel.ADVANCED,
    icon: 'SiMongodb',
    description: 'NoSQL database design, aggregation pipelines, and performance optimization',
    yearsOfExperience: 3,
    projects: ['ecommerce-platform', 'task-manager', 'blog-platform']
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: SkillCategory.DATABASE,
    level: SkillLevel.ADVANCED,
    icon: 'SiPostgresql',
    description: 'Relational database design, complex queries, and performance tuning',
    yearsOfExperience: 3,
    projects: ['api-gateway', 'corporate-website']
  },
  {
    id: 'redis',
    name: 'Redis',
    category: SkillCategory.DATABASE,
    level: SkillLevel.INTERMEDIATE,
    icon: 'SiRedis',
    description: 'Caching, session storage, and real-time data structures',
    yearsOfExperience: 2,
    projects: ['ecommerce-platform', 'api-gateway']
  },

  // DevOps & Cloud
  {
    id: 'aws',
    name: 'AWS',
    category: SkillCategory.DEVOPS,
    level: SkillLevel.INTERMEDIATE,
    icon: 'FaAws',
    description: 'EC2, S3, Lambda, RDS, and serverless architecture',
    yearsOfExperience: 2,
    projects: ['ecommerce-platform', 'api-gateway']
  },
  {
    id: 'docker',
    name: 'Docker',
    category: SkillCategory.DEVOPS,
    level: SkillLevel.ADVANCED,
    icon: 'FaDocker',
    description: 'Containerization, multi-stage builds, and orchestration',
    yearsOfExperience: 3,
    projects: ['ecommerce-platform', 'api-gateway', 'task-manager']
  },
  {
    id: 'git',
    name: 'Git',
    category: SkillCategory.DEVOPS,
    level: SkillLevel.EXPERT,
    icon: 'FaGitAlt',
    description: 'Version control, branching strategies, and collaborative development',
    yearsOfExperience: 5,
    projects: ['ecommerce-platform', 'task-manager', 'portfolio-website', 'blog-platform']
  },

  // Mobile Development
  {
    id: 'react-native',
    name: 'React Native',
    category: SkillCategory.MOBILE,
    level: SkillLevel.INTERMEDIATE,
    icon: 'SiReact',
    description: 'Cross-platform mobile app development with native performance',
    yearsOfExperience: 2,
    projects: ['mobile-app', 'task-manager']
  },

  // Design & Tools
  {
    id: 'figma',
    name: 'Figma',
    category: SkillCategory.DESIGN,
    level: SkillLevel.INTERMEDIATE,
    icon: 'SiFigma',
    description: 'UI/UX design, prototyping, and design system creation',
    yearsOfExperience: 2,
    projects: ['portfolio-website', 'corporate-website', 'mobile-app']
  },
  {
    id: 'vscode',
    name: 'VS Code',
    category: SkillCategory.TOOLS,
    level: SkillLevel.EXPERT,
    icon: 'SiVisualstudiocode',
    description: 'Advanced IDE usage, extensions, and productivity optimization',
    yearsOfExperience: 5,
    projects: ['ecommerce-platform', 'task-manager', 'portfolio-website', 'blog-platform']
  },
  {
    id: 'webpack',
    name: 'Webpack',
    category: SkillCategory.TOOLS,
    level: SkillLevel.INTERMEDIATE,
    icon: 'SiWebpack',
    description: 'Module bundling, optimization, and build process configuration',
    yearsOfExperience: 2,
    projects: ['ecommerce-platform', 'corporate-website']
  }
];

export const skillCategories = [
  { id: SkillCategory.FRONTEND, name: 'Frontend', color: '#61DAFB' },
  { id: SkillCategory.BACKEND, name: 'Backend', color: '#68A063' },
  { id: SkillCategory.DATABASE, name: 'Database', color: '#336791' },
  { id: SkillCategory.DEVOPS, name: 'DevOps', color: '#FF6B35' },
  { id: SkillCategory.MOBILE, name: 'Mobile', color: '#A855F7' },
  { id: SkillCategory.DESIGN, name: 'Design', color: '#F59E0B' },
  { id: SkillCategory.TOOLS, name: 'Tools', color: '#6B7280' }
];

export const getSkillsByCategory = (category: SkillCategory): Skill[] => {
  return skills.filter(skill => skill.category === category);
};

export const getFeaturedSkills = (): Skill[] => {
  return skills.filter(skill => skill.level >= SkillLevel.ADVANCED);
};

export const getSkillById = (id: string): Skill | undefined => {
  return skills.find(skill => skill.id === id);
};