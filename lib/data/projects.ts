import { Project, ProjectCategory, ProjectStatus } from '@/lib/types';

export const projects: Project[] = [
  {
    id: 'ecommerce-platform',
    title: 'E-commerce Platform',
    description: 'Full-stack e-commerce solution with advanced features like real-time inventory, payment processing, and analytics dashboard.',
    longDescription: 'A comprehensive e-commerce platform built with modern technologies to provide seamless shopping experience. Features include user authentication, product catalog, shopping cart, payment integration, order management, and admin dashboard with real-time analytics.',
    category: ProjectCategory.WEB_APP,
    status: ProjectStatus.COMPLETED,
    featured: true,
    images: [
      {
        id: 'ecom-1',
        url: '/images/projects/ecommerce/homepage.jpg',
        alt: 'E-commerce homepage with product grid',
        caption: 'Modern homepage design with featured products',
        type: 'screenshot'
      },
      {
        id: 'ecom-2',
        url: '/images/projects/ecommerce/dashboard.jpg',
        alt: 'Admin dashboard with analytics',
        caption: 'Real-time analytics dashboard for administrators',
        type: 'screenshot'
      },
      {
        id: 'ecom-3',
        url: '/images/projects/ecommerce/mobile.jpg',
        alt: 'Mobile responsive design',
        caption: 'Fully responsive design for mobile devices',
        type: 'mockup'
      }
    ],
    technologies: ['React', 'Node.js', 'MongoDB', 'Express.js', 'Stripe', 'AWS', 'Docker'],
    links: [
      {
        id: 'ecom-demo',
        type: 'demo',
        url: 'https://ecommerce-demo.example.com',
        label: 'Live Demo'
      },
      {
        id: 'ecom-repo',
        type: 'repository',
        url: 'https://github.com/joaosilva/ecommerce-platform',
        label: 'Source Code'
      },
      {
        id: 'ecom-case-study',
        type: 'article',
        url: '/blog/building-scalable-ecommerce-platform',
        label: 'Case Study'
      }
    ],
    timeline: {
      startDate: '2023-01-15',
      endDate: '2023-06-30',
      duration: '5.5 months',
      milestones: [
        {
          id: 'ecom-m1',
          title: 'Project Setup & Architecture',
          description: 'Initial project setup, database design, and API architecture',
          date: '2023-02-01',
          completed: true
        },
        {
          id: 'ecom-m2',
          title: 'User Authentication & Product Catalog',
          description: 'Implemented user registration, login, and product management',
          date: '2023-03-15',
          completed: true
        },
        {
          id: 'ecom-m3',
          title: 'Shopping Cart & Checkout',
          description: 'Built shopping cart functionality and payment integration',
          date: '2023-04-30',
          completed: true
        },
        {
          id: 'ecom-m4',
          title: 'Admin Dashboard & Analytics',
          description: 'Created admin panel with real-time analytics and reporting',
          date: '2023-06-01',
          completed: true
        },
        {
          id: 'ecom-m5',
          title: 'Testing & Deployment',
          description: 'Comprehensive testing, performance optimization, and production deployment',
          date: '2023-06-30',
          completed: true
        }
      ]
    },
    challenges: [
      'Implementing real-time inventory management across multiple warehouses',
      'Optimizing database queries for large product catalogs',
      'Ensuring PCI compliance for payment processing',
      'Building responsive design that works across all devices'
    ],
    solutions: [
      'Used Redis for caching and real-time inventory updates',
      'Implemented database indexing and query optimization',
      'Integrated Stripe for secure payment processing',
      'Adopted mobile-first design approach with CSS Grid and Flexbox'
    ],
    results: [
      {
        id: 'ecom-r1',
        metric: 'Performance',
        value: '95/100',
        description: 'Lighthouse performance score'
      },
      {
        id: 'ecom-r2',
        metric: 'Load Time',
        value: '1.2s',
        description: 'Average page load time'
      },
      {
        id: 'ecom-r3',
        metric: 'Conversion Rate',
        value: '3.8%',
        description: 'Improved conversion rate after optimization'
      },
      {
        id: 'ecom-r4',
        metric: 'User Satisfaction',
        value: '4.7/5',
        description: 'Average user rating from feedback'
      }
    ],
    testimonial: {
      id: 'ecom-testimonial',
      content: 'João delivered an exceptional e-commerce platform that exceeded our expectations. The attention to detail, performance optimization, and user experience are outstanding.',
      author: 'Maria Santos',
      role: 'Product Manager',
      company: 'TechCorp',
      avatar: '/images/testimonials/maria-santos.jpg'
    }
  },
  {
    id: 'task-manager',
    title: 'Task Management App',
    description: 'Collaborative task management application with real-time updates, team collaboration, and advanced project tracking features.',
    longDescription: 'A comprehensive task management solution designed for teams and individuals. Features include project organization, task assignment, real-time collaboration, time tracking, reporting, and integration with popular productivity tools.',
    category: ProjectCategory.WEB_APP,
    status: ProjectStatus.MAINTAINED,
    featured: true,
    images: [
      {
        id: 'task-1',
        url: '/images/projects/taskmanager/dashboard.jpg',
        alt: 'Task manager dashboard',
        caption: 'Clean and intuitive dashboard interface',
        type: 'screenshot'
      },
      {
        id: 'task-2',
        url: '/images/projects/taskmanager/kanban.jpg',
        alt: 'Kanban board view',
        caption: 'Drag-and-drop Kanban board for visual task management',
        type: 'screenshot'
      },
      {
        id: 'task-3',
        url: '/images/projects/taskmanager/mobile-app.jpg',
        alt: 'Mobile app interface',
        caption: 'Native mobile app for iOS and Android',
        type: 'mockup'
      }
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Socket.io', 'React Native', 'Docker'],
    links: [
      {
        id: 'task-demo',
        type: 'demo',
        url: 'https://taskmanager-demo.example.com',
        label: 'Live Demo'
      },
      {
        id: 'task-repo',
        type: 'repository',
        url: 'https://github.com/joaosilva/task-manager',
        label: 'Source Code'
      },
      {
        id: 'task-mobile',
        type: 'demo',
        url: 'https://apps.apple.com/app/taskmanager',
        label: 'Mobile App'
      }
    ],
    timeline: {
      startDate: '2022-08-01',
      endDate: '2023-01-15',
      duration: '5.5 months',
      milestones: [
        {
          id: 'task-m1',
          title: 'Core Features Development',
          description: 'Basic task creation, editing, and organization features',
          date: '2022-09-15',
          completed: true
        },
        {
          id: 'task-m2',
          title: 'Real-time Collaboration',
          description: 'Implemented real-time updates and team collaboration features',
          date: '2022-11-01',
          completed: true
        },
        {
          id: 'task-m3',
          title: 'Mobile App Development',
          description: 'Built React Native mobile app for iOS and Android',
          date: '2022-12-15',
          completed: true
        },
        {
          id: 'task-m4',
          title: 'Advanced Features & Launch',
          description: 'Added reporting, integrations, and launched to production',
          date: '2023-01-15',
          completed: true
        }
      ]
    },
    challenges: [
      'Implementing real-time synchronization across web and mobile platforms',
      'Designing intuitive drag-and-drop interfaces',
      'Optimizing performance for large datasets',
      'Creating offline functionality for mobile app'
    ],
    solutions: [
      'Used Socket.io for real-time communication and conflict resolution',
      'Implemented custom drag-and-drop library with accessibility support',
      'Added pagination, virtualization, and smart caching',
      'Built offline-first architecture with sync capabilities'
    ],
    results: [
      {
        id: 'task-r1',
        metric: 'Active Users',
        value: '2,500+',
        description: 'Monthly active users within 6 months'
      },
      {
        id: 'task-r2',
        metric: 'Task Completion',
        value: '40%',
        description: 'Increase in team task completion rate'
      },
      {
        id: 'task-r3',
        metric: 'User Retention',
        value: '85%',
        description: '30-day user retention rate'
      }
    ]
  },
  {
    id: 'portfolio-website',
    title: 'Portfolio Website',
    description: 'Modern, responsive portfolio website built with Next.js, featuring advanced animations and optimized performance.',
    longDescription: 'A showcase of my work and skills through a beautifully designed, performance-optimized portfolio website. Features include smooth animations, dark/light mode, blog integration, contact forms, and comprehensive SEO optimization.',
    category: ProjectCategory.WEBSITE,
    status: ProjectStatus.MAINTAINED,
    featured: false,
    images: [
      {
        id: 'portfolio-1',
        url: '/images/projects/portfolio/homepage.jpg',
        alt: 'Portfolio homepage',
        caption: 'Clean and modern homepage design',
        type: 'screenshot'
      },
      {
        id: 'portfolio-2',
        url: '/images/projects/portfolio/projects.jpg',
        alt: 'Projects showcase page',
        caption: 'Interactive projects showcase with filtering',
        type: 'screenshot'
      }
    ],
    technologies: ['Next.js', 'TypeScript', 'Chakra UI', 'Framer Motion', 'MDX'],
    links: [
      {
        id: 'portfolio-demo',
        type: 'demo',
        url: 'https://joaosilva.dev',
        label: 'Live Site'
      },
      {
        id: 'portfolio-repo',
        type: 'repository',
        url: 'https://github.com/joaosilva/portfolio',
        label: 'Source Code'
      }
    ],
    timeline: {
      startDate: '2023-07-01',
      endDate: '2023-08-15',
      duration: '1.5 months',
      milestones: [
        {
          id: 'portfolio-m1',
          title: 'Design & Architecture',
          description: 'Created design system and project architecture',
          date: '2023-07-10',
          completed: true
        },
        {
          id: 'portfolio-m2',
          title: 'Core Pages Development',
          description: 'Built main pages with responsive design',
          date: '2023-07-25',
          completed: true
        },
        {
          id: 'portfolio-m3',
          title: 'Animations & Optimization',
          description: 'Added smooth animations and performance optimization',
          date: '2023-08-10',
          completed: true
        },
        {
          id: 'portfolio-m4',
          title: 'Launch & SEO',
          description: 'Final testing, SEO optimization, and deployment',
          date: '2023-08-15',
          completed: true
        }
      ]
    },
    challenges: [
      'Creating smooth animations without impacting performance',
      'Implementing complex entry animations',
      'Optimizing for perfect Lighthouse scores',
      'Building accessible interactive elements'
    ],
    solutions: [
      'Used Framer Motion with performance optimizations',
      'Implemented layoutId animations for smooth transitions',
      'Applied image optimization and code splitting',
      'Added comprehensive ARIA labels and keyboard navigation'
    ],
    results: [
      {
        id: 'portfolio-r1',
        metric: 'Lighthouse Score',
        value: '100/100',
        description: 'Perfect performance, accessibility, and SEO scores'
      },
      {
        id: 'portfolio-r2',
        metric: 'Load Time',
        value: '0.8s',
        description: 'First contentful paint time'
      },
      {
        id: 'portfolio-r3',
        metric: 'Accessibility',
        value: 'WCAG 2.1 AA',
        description: 'Full accessibility compliance'
      }
    ]
  },
  {
    id: 'api-gateway',
    title: 'Microservices API Gateway',
    description: 'Scalable API gateway for microservices architecture with authentication, rate limiting, and monitoring.',
    longDescription: 'A robust API gateway solution designed to handle microservices communication, authentication, rate limiting, request routing, and comprehensive monitoring. Built with high availability and scalability in mind.',
    category: ProjectCategory.API,
    status: ProjectStatus.COMPLETED,
    featured: false,
    images: [
      {
        id: 'api-1',
        url: '/images/projects/api/architecture.jpg',
        alt: 'API Gateway architecture diagram',
        caption: 'Microservices architecture overview',
        type: 'diagram'
      },
      {
        id: 'api-2',
        url: '/images/projects/api/monitoring.jpg',
        alt: 'Monitoring dashboard',
        caption: 'Real-time monitoring and analytics dashboard',
        type: 'screenshot'
      }
    ],
    technologies: ['Node.js', 'Express.js', 'Redis', 'PostgreSQL', 'Docker', 'AWS', 'Prometheus'],
    links: [
      {
        id: 'api-repo',
        type: 'repository',
        url: 'https://github.com/joaosilva/api-gateway',
        label: 'Source Code'
      },
      {
        id: 'api-docs',
        type: 'documentation',
        url: 'https://api-gateway-docs.example.com',
        label: 'Documentation'
      }
    ],
    timeline: {
      startDate: '2022-03-01',
      endDate: '2022-07-30',
      duration: '5 months',
      milestones: [
        {
          id: 'api-m1',
          title: 'Core Gateway Features',
          description: 'Basic routing, authentication, and rate limiting',
          date: '2022-04-15',
          completed: true
        },
        {
          id: 'api-m2',
          title: 'Monitoring & Analytics',
          description: 'Added comprehensive monitoring and logging',
          date: '2022-06-01',
          completed: true
        },
        {
          id: 'api-m3',
          title: 'Production Deployment',
          description: 'Deployed to production with high availability setup',
          date: '2022-07-30',
          completed: true
        }
      ]
    },
    challenges: [
      'Handling high traffic loads with low latency',
      'Implementing secure authentication across services',
      'Creating comprehensive monitoring and alerting',
      'Ensuring high availability and fault tolerance'
    ],
    solutions: [
      'Used Redis for caching and session management',
      'Implemented JWT-based authentication with refresh tokens',
      'Added Prometheus metrics and Grafana dashboards',
      'Deployed with load balancers and auto-scaling groups'
    ],
    results: [
      {
        id: 'api-r1',
        metric: 'Throughput',
        value: '10,000 RPS',
        description: 'Requests per second handling capacity'
      },
      {
        id: 'api-r2',
        metric: 'Latency',
        value: '< 50ms',
        description: 'Average response time'
      },
      {
        id: 'api-r3',
        metric: 'Uptime',
        value: '99.9%',
        description: 'Service availability'
      }
    ]
  },
  {
    id: 'mobile-app',
    title: 'Fitness Tracking Mobile App',
    description: 'Cross-platform mobile app for fitness tracking with workout plans, progress monitoring, and social features.',
    longDescription: 'A comprehensive fitness tracking application built with React Native. Features include workout planning, exercise tracking, progress analytics, social sharing, and integration with wearable devices.',
    category: ProjectCategory.MOBILE_APP,
    status: ProjectStatus.IN_PROGRESS,
    featured: true,
    images: [
      {
        id: 'mobile-1',
        url: '/images/projects/mobile/onboarding.jpg',
        alt: 'App onboarding screens',
        caption: 'Smooth onboarding experience',
        type: 'mockup'
      },
      {
        id: 'mobile-2',
        url: '/images/projects/mobile/workout.jpg',
        alt: 'Workout tracking interface',
        caption: 'Real-time workout tracking with timer',
        type: 'screenshot'
      },
      {
        id: 'mobile-3',
        url: '/images/projects/mobile/analytics.jpg',
        alt: 'Progress analytics dashboard',
        caption: 'Detailed progress analytics and insights',
        type: 'screenshot'
      }
    ],
    technologies: ['React Native', 'TypeScript', 'Node.js', 'MongoDB', 'Firebase', 'HealthKit', 'Google Fit'],
    links: [
      {
        id: 'mobile-repo',
        type: 'repository',
        url: 'https://github.com/joaosilva/fitness-app',
        label: 'Source Code'
      },
      {
        id: 'mobile-demo',
        type: 'video',
        url: 'https://youtube.com/watch?v=demo',
        label: 'Demo Video'
      }
    ],
    timeline: {
      startDate: '2023-09-01',
      endDate: null,
      duration: 'Ongoing',
      milestones: [
        {
          id: 'mobile-m1',
          title: 'Core Features',
          description: 'Basic workout tracking and user management',
          date: '2023-10-15',
          completed: true
        },
        {
          id: 'mobile-m2',
          title: 'Analytics & Progress',
          description: 'Progress tracking and analytics dashboard',
          date: '2023-11-30',
          completed: true
        },
        {
          id: 'mobile-m3',
          title: 'Social Features',
          description: 'Social sharing and community features',
          date: '2024-01-15',
          completed: false
        },
        {
          id: 'mobile-m4',
          title: 'Wearable Integration',
          description: 'Integration with fitness wearables',
          date: '2024-02-28',
          completed: false
        }
      ]
    },
    challenges: [
      'Integrating with multiple health platforms (HealthKit, Google Fit)',
      'Creating smooth animations on mobile devices',
      'Implementing offline functionality for workouts',
      'Optimizing battery usage during workout tracking'
    ],
    solutions: [
      'Built unified health data abstraction layer',
      'Used React Native Reanimated for 60fps animations',
      'Implemented local SQLite database with sync capabilities',
      'Optimized GPS and sensor usage with smart batching'
    ],
    results: [
      {
        id: 'mobile-r1',
        metric: 'Beta Users',
        value: '500+',
        description: 'Active beta testers providing feedback'
      },
      {
        id: 'mobile-r2',
        metric: 'App Rating',
        value: '4.8/5',
        description: 'Average rating from beta users'
      },
      {
        id: 'mobile-r3',
        metric: 'Workout Sessions',
        value: '2,000+',
        description: 'Total workout sessions tracked'
      }
    ]
  }
];

export const getFeaturedProjects = (): Project[] => {
  return projects.filter(project => project.featured);
};

export const getProjectsByCategory = (category: ProjectCategory): Project[] => {
  return projects.filter(project => project.category === category);
};

export const getProjectById = (id: string): Project | undefined => {
  return projects.find(project => project.id === id);
};

export const getProjectsByStatus = (status: ProjectStatus): Project[] => {
  return projects.filter(project => project.status === status);
};

export const getProjectsByTechnology = (technology: string): Project[] => {
  return projects.filter(project => 
    project.technologies.some(tech => 
      tech.toLowerCase().includes(technology.toLowerCase())
    )
  );
};