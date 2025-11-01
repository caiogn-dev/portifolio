import { Experience, Education, Certification } from '@/lib/types';

export const experiences: Experience[] = [
  {
    id: 'senior-dev-techcorp',
    company: 'TechCorp Solutions',
    position: 'Senior Full Stack Developer',
    location: 'São Paulo, Brazil',
    startDate: '2022-01-15',
    endDate: null,
    current: true,
    description: 'Leading development of enterprise web applications and mentoring junior developers. Responsible for architecture decisions, code reviews, and technical strategy.',
    achievements: [
      'Led development of microservices architecture serving 100K+ daily users',
      'Reduced application load time by 60% through performance optimization',
      'Mentored 5 junior developers, improving team productivity by 40%',
      'Implemented CI/CD pipeline reducing deployment time from 2 hours to 15 minutes',
      'Architected and built real-time analytics dashboard used by C-level executives'
    ],
    technologies: ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker', 'PostgreSQL', 'Redis'],
    logo: '/images/companies/techcorp.jpg'
  },
  {
    id: 'fullstack-dev-innovate',
    company: 'Innovate Digital',
    position: 'Full Stack Developer',
    location: 'São Paulo, Brazil',
    startDate: '2020-03-01',
    endDate: '2022-01-10',
    current: false,
    description: 'Developed and maintained multiple client projects ranging from e-commerce platforms to corporate websites. Collaborated with design and product teams to deliver high-quality solutions.',
    achievements: [
      'Built 15+ client projects with 100% on-time delivery rate',
      'Increased client satisfaction scores by 35% through improved communication',
      'Implemented automated testing reducing bug reports by 50%',
      'Created reusable component library used across 10+ projects',
      'Optimized database queries improving application performance by 45%'
    ],
    technologies: ['React', 'Vue.js', 'Node.js', 'Express.js', 'MongoDB', 'MySQL', 'AWS'],
    logo: '/images/companies/innovate.jpg'
  },
  {
    id: 'frontend-dev-startup',
    company: 'StartupXYZ',
    position: 'Frontend Developer',
    location: 'Remote',
    startDate: '2019-06-01',
    endDate: '2020-02-28',
    current: false,
    description: 'Joined early-stage startup to build the initial product from scratch. Worked closely with founders to define product requirements and user experience.',
    achievements: [
      'Built MVP from concept to launch in 4 months',
      'Achieved 95+ Lighthouse performance scores across all pages',
      'Implemented responsive design supporting 10+ device types',
      'Created design system and component library',
      'Contributed to product strategy and user experience decisions'
    ],
    technologies: ['React', 'JavaScript', 'CSS3', 'HTML5', 'Firebase', 'Figma'],
    logo: '/images/companies/startupxyz.jpg'
  },
  {
    id: 'junior-dev-webagency',
    company: 'Web Agency Pro',
    position: 'Junior Web Developer',
    location: 'São Paulo, Brazil',
    startDate: '2018-08-01',
    endDate: '2019-05-30',
    current: false,
    description: 'Started my professional career developing websites and web applications for small to medium businesses. Learned best practices and gained experience with various technologies.',
    achievements: [
      'Delivered 20+ websites with pixel-perfect designs',
      'Learned and applied modern web development practices',
      'Improved page load speeds by 40% through optimization techniques',
      'Collaborated with designers to implement complex UI/UX requirements',
      'Maintained and updated legacy codebases'
    ],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'jQuery', 'PHP', 'WordPress', 'MySQL'],
    logo: '/images/companies/webagency.jpg'
  }
];

export const education: Education[] = [
  {
    id: 'computer-science-usp',
    institution: 'University of São Paulo (USP)',
    degree: 'Bachelor of Science',
    field: 'Computer Science',
    location: 'São Paulo, Brazil',
    startDate: '2015-02-01',
    endDate: '2018-12-15',
    gpa: '3.8/4.0',
    honors: ['Magna Cum Laude', 'Dean\'s List (6 semesters)'],
    description: 'Comprehensive computer science education covering algorithms, data structures, software engineering, databases, and computer systems. Specialized in web technologies and software architecture.'
  },
  {
    id: 'web-dev-bootcamp',
    institution: 'Rocketseat Bootcamp',
    degree: 'Certificate',
    field: 'Full Stack Web Development',
    location: 'Online',
    startDate: '2018-01-15',
    endDate: '2018-06-30',
    description: 'Intensive bootcamp focused on modern web development technologies including React, Node.js, and mobile development with React Native.'
  }
];

export const certifications: Certification[] = [
  {
    id: 'aws-solutions-architect',
    name: 'AWS Certified Solutions Architect - Associate',
    issuer: 'Amazon Web Services',
    issueDate: '2023-03-15',
    expiryDate: '2026-03-15',
    credentialId: 'AWS-ASA-12345',
    credentialUrl: 'https://aws.amazon.com/verification/12345',
    logo: '/images/certifications/aws.jpg'
  },
  {
    id: 'react-advanced',
    name: 'Advanced React Development',
    issuer: 'Meta (Facebook)',
    issueDate: '2022-11-20',
    credentialId: 'META-REACT-67890',
    credentialUrl: 'https://coursera.org/verify/12345',
    logo: '/images/certifications/meta.jpg'
  },
  {
    id: 'typescript-expert',
    name: 'TypeScript Expert Certification',
    issuer: 'Microsoft',
    issueDate: '2022-08-10',
    credentialId: 'MS-TS-54321',
    credentialUrl: 'https://learn.microsoft.com/verify/54321',
    logo: '/images/certifications/microsoft.jpg'
  },
  {
    id: 'docker-certified',
    name: 'Docker Certified Associate',
    issuer: 'Docker Inc.',
    issueDate: '2022-05-25',
    expiryDate: '2024-05-25',
    credentialId: 'DOCKER-DCA-98765',
    credentialUrl: 'https://docker.com/verify/98765',
    logo: '/images/certifications/docker.jpg'
  },
  {
    id: 'scrum-master',
    name: 'Certified ScrumMaster (CSM)',
    issuer: 'Scrum Alliance',
    issueDate: '2021-09-12',
    expiryDate: '2023-09-12',
    credentialId: 'SA-CSM-11111',
    credentialUrl: 'https://scrumalliance.org/verify/11111',
    logo: '/images/certifications/scrum-alliance.jpg'
  }
];

export const getCurrentExperience = (): Experience | undefined => {
  return experiences.find(exp => exp.current);
};

export const getTotalExperienceYears = (): number => {
  const startDate = new Date('2018-08-01');
  const currentDate = new Date();
  const diffTime = Math.abs(currentDate.getTime() - startDate.getTime());
  const diffYears = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 365));
  return diffYears;
};

export const getActiveCertifications = (): Certification[] => {
  const currentDate = new Date();
  return certifications.filter(cert => {
    if (!cert.expiryDate) return true;
    return new Date(cert.expiryDate) > currentDate;
  });
};