// Core domain types following Domain-Driven Design principles

export interface PersonalInfo {
  name: string;
  title: string;
  subtitle: string;
  description: string;
  location: string;
  email: string;
  phone?: string;
  avatar: string;
  resume: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
  label: string;
  color: string;
}

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level: SkillLevel;
  icon: string;
  description: string;
  yearsOfExperience: number;
  projects: string[];
}

export enum SkillCategory {
  FRONTEND = 'frontend',
  BACKEND = 'backend',
  DATABASE = 'database',
  DEVOPS = 'devops',
  MOBILE = 'mobile',
  DESIGN = 'design',
  TOOLS = 'tools'
}

export enum SkillLevel {
  BEGINNER = 1,
  INTERMEDIATE = 2,
  ADVANCED = 3,
  EXPERT = 4,
  MASTER = 5
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: ProjectCategory;
  status: ProjectStatus;
  featured: boolean;
  images: ProjectImage[];
  technologies: string[];
  links: ProjectLink[];
  timeline: ProjectTimeline;
  challenges: string[];
  solutions: string[];
  results: ProjectResult[];
  testimonial?: Testimonial;
}

export enum ProjectCategory {
  WEB_APP = 'web-app',
  MOBILE_APP = 'mobile-app',
  DESKTOP_APP = 'desktop-app',
  API = 'api',
  LIBRARY = 'library',
  WEBSITE = 'website',
  GAME = 'game',
  OTHER = 'other'
}

export enum ProjectStatus {
  PLANNING = 'planning',
  IN_PROGRESS = 'in-progress',
  COMPLETED = 'completed',
  MAINTAINED = 'maintained',
  ARCHIVED = 'archived'
}

export interface ProjectImage {
  id: string;
  url: string;
  alt: string;
  caption?: string;
  type: 'screenshot' | 'mockup' | 'diagram' | 'logo';
}

export interface ProjectLink {
  id: string;
  type: 'demo' | 'repository' | 'documentation' | 'article' | 'video';
  url: string;
  label: string;
}

export interface ProjectTimeline {
  startDate: string;
  endDate?: string;
  duration: string;
  milestones: ProjectMilestone[];
}

export interface ProjectMilestone {
  id: string;
  title: string;
  description: string;
  date: string;
  completed: boolean;
}

export interface ProjectResult {
  id: string;
  metric: string;
  value: string;
  description: string;
}

export interface Testimonial {
  id: string;
  content: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  updatedAt: string;
  featured: boolean;
  tags: string[];
  category: string;
  readingTime: number;
  author: Author;
  seo: SEOData;
}

export interface Author {
  id: string;
  name: string;
  bio: string;
  avatar: string;
  social: SocialLink[];
}

export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonicalUrl?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
  company?: string;
  budget?: string;
  timeline?: string;
  projectType?: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
  logo?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  honors?: string[];
  description?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  logo?: string;
}

// UI Component Props Types
export interface AnimationProps {
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  once?: boolean;
}

export interface LoadingState {
  isLoading: boolean;
  error?: string;
  progress?: number;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  showPrevNext?: boolean;
}

// Theme and UI Types
export interface ThemeConfig {
  colors: ColorPalette;
  fonts: FontConfig;
  spacing: SpacingConfig;
  breakpoints: BreakpointConfig;
  animations: AnimationConfig;
}

export interface ColorPalette {
  primary: ColorScale;
  secondary: ColorScale;
  accent: ColorScale;
  neutral: ColorScale;
  success: ColorScale;
  warning: ColorScale;
  error: ColorScale;
}

export interface ColorScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}

export interface FontConfig {
  heading: string;
  body: string;
  mono: string;
}

export interface SpacingConfig {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  '4xl': string;
}

export interface BreakpointConfig {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

export interface AnimationConfig {
  durations: {
    fast: string;
    normal: string;
    slow: string;
  };
  easings: {
    easeIn: string;
    easeOut: string;
    easeInOut: string;
  };
}

// Application State Types
export interface AppState {
  theme: 'light' | 'dark' | 'system';
  language: 'en' | 'pt';
  isLoading: boolean;
  error?: string;
  user?: User;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'visitor';
  preferences: UserPreferences;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: 'en' | 'pt';
  animations: boolean;
  notifications: boolean;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  timestamp: string;
}

export interface ApiError {
  message: string;
  code: string;
  details?: Record<string, unknown>;
}

// Form Validation Types
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => boolean;
  message: string;
}

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'textarea' | 'select' | 'checkbox' | 'radio';
  placeholder?: string;
  required?: boolean;
  validation?: ValidationRule[];
  options?: { value: string; label: string }[];
}