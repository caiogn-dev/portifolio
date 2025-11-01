import { BlogPost, Author } from '@/lib/types';

export const author: Author = {
  id: 'joao-silva',
  name: 'João Silva',
  bio: 'Full Stack Developer passionate about creating exceptional digital experiences. I write about web development, technology trends, and software engineering best practices.',
  avatar: '/images/avatar.jpg',
  social: [
    {
      id: 'author-github',
      platform: 'GitHub',
      url: 'https://github.com/joaosilva',
      icon: 'FaGithub',
      label: 'GitHub Profile',
      color: '#333'
    },
    {
      id: 'author-twitter',
      platform: 'Twitter',
      url: 'https://twitter.com/joaosilva',
      icon: 'BsTwitterX',
      label: 'Twitter Profile',
      color: '#1DA1F2'
    },
    {
      id: 'author-linkedin',
      platform: 'LinkedIn',
      url: 'https://linkedin.com/in/joaosilva',
      icon: 'FaLinkedin',
      label: 'LinkedIn Profile',
      color: '#0077B5'
    }
  ]
};

export const blogPosts: BlogPost[] = [
  {
    id: 'building-scalable-ecommerce-platform',
    title: 'Building a Scalable E-commerce Platform: Lessons Learned',
    slug: 'building-scalable-ecommerce-platform',
    excerpt: 'A deep dive into the architecture decisions, challenges, and solutions when building a high-performance e-commerce platform that can handle thousands of concurrent users.',
    content: `
# Building a Scalable E-commerce Platform: Lessons Learned

Building an e-commerce platform that can handle thousands of concurrent users while maintaining excellent performance is no small feat. In this article, I'll share the key lessons learned during the development of a comprehensive e-commerce solution.

## Architecture Overview

The platform was built using a microservices architecture with the following key components:

- **Frontend**: React with TypeScript for type safety
- **API Gateway**: Node.js with Express for routing and authentication
- **User Service**: Handles authentication and user management
- **Product Service**: Manages product catalog and inventory
- **Order Service**: Processes orders and payments
- **Notification Service**: Handles email and push notifications

## Key Challenges and Solutions

### 1. Real-time Inventory Management

**Challenge**: Keeping inventory synchronized across multiple warehouses while preventing overselling.

**Solution**: Implemented a distributed locking mechanism using Redis with optimistic concurrency control. This ensures that inventory updates are atomic and consistent across all services.

### 2. Payment Processing

**Challenge**: Ensuring PCI compliance while providing a smooth checkout experience.

**Solution**: Integrated with Stripe for secure payment processing, implementing proper tokenization and following PCI DSS guidelines. Added comprehensive error handling and retry mechanisms for failed payments.

### 3. Performance Optimization

**Challenge**: Maintaining fast page load times with large product catalogs.

**Solution**: 
- Implemented database indexing and query optimization
- Added Redis caching for frequently accessed data
- Used CDN for static assets and images
- Implemented lazy loading and pagination

## Results

The final platform achieved:
- 95/100 Lighthouse performance score
- 1.2s average page load time
- 99.9% uptime
- 3.8% conversion rate improvement

## Conclusion

Building scalable e-commerce platforms requires careful planning, proper architecture, and continuous optimization. The key is to start with a solid foundation and iterate based on real user feedback and performance metrics.
    `,
    publishedAt: '2023-07-15T10:00:00Z',
    updatedAt: '2023-07-15T10:00:00Z',
    featured: true,
    tags: ['E-commerce', 'Scalability', 'Architecture', 'Performance'],
    category: 'Case Study',
    readingTime: 8,
    author,
    seo: {
      title: 'Building a Scalable E-commerce Platform: Architecture and Lessons Learned',
      description: 'Learn how to build a high-performance e-commerce platform with microservices architecture, real-time inventory management, and payment processing.',
      keywords: ['e-commerce', 'scalability', 'microservices', 'performance', 'architecture'],
      ogImage: '/images/blog/ecommerce-platform-og.jpg'
    }
  },
  {
    id: 'react-performance-optimization',
    title: 'React Performance Optimization: Advanced Techniques',
    slug: 'react-performance-optimization',
    excerpt: 'Explore advanced React performance optimization techniques including memoization, code splitting, and virtual scrolling to build lightning-fast applications.',
    content: `
# React Performance Optimization: Advanced Techniques

React applications can become slow as they grow in complexity. In this comprehensive guide, I'll share advanced techniques to optimize React performance and build lightning-fast applications.

## Understanding React Performance

Before diving into optimization techniques, it's crucial to understand how React works:

- **Virtual DOM**: React creates a virtual representation of the DOM
- **Reconciliation**: The process of comparing virtual DOM trees
- **Re-rendering**: When components update and re-render

## Advanced Optimization Techniques

### 1. Memoization with React.memo and useMemo

\`\`\`jsx
// Memoize expensive calculations
const ExpensiveComponent = React.memo(({ data }) => {
  const expensiveValue = useMemo(() => {
    return data.reduce((acc, item) => acc + item.value, 0);
  }, [data]);

  return <div>{expensiveValue}</div>;
});
\`\`\`

### 2. Code Splitting with React.lazy

\`\`\`jsx
// Lazy load components
const LazyComponent = React.lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
\`\`\`

### 3. Virtual Scrolling for Large Lists

For lists with thousands of items, virtual scrolling only renders visible items:

\`\`\`jsx
import { FixedSizeList as List } from 'react-window';

const VirtualizedList = ({ items }) => (
  <List
    height={600}
    itemCount={items.length}
    itemSize={50}
  >
    {({ index, style }) => (
      <div style={style}>
        {items[index].name}
      </div>
    )}
  </List>
);
\`\`\`

## Measuring Performance

Use React DevTools Profiler to identify performance bottlenecks:

1. Record a session while interacting with your app
2. Analyze component render times
3. Identify unnecessary re-renders
4. Optimize based on findings

## Conclusion

Performance optimization is an ongoing process. Start with measuring, identify bottlenecks, and apply the appropriate optimization techniques. Remember that premature optimization can be counterproductive - focus on actual performance issues rather than theoretical ones.
    `,
    publishedAt: '2023-06-20T14:30:00Z',
    updatedAt: '2023-06-20T14:30:00Z',
    featured: true,
    tags: ['React', 'Performance', 'Optimization', 'JavaScript'],
    category: 'Tutorial',
    readingTime: 12,
    author,
    seo: {
      title: 'React Performance Optimization: Advanced Techniques for Fast Apps',
      description: 'Master advanced React performance optimization techniques including memoization, code splitting, and virtual scrolling.',
      keywords: ['react', 'performance', 'optimization', 'memoization', 'code splitting'],
      ogImage: '/images/blog/react-performance-og.jpg'
    }
  },
  {
    id: 'typescript-best-practices',
    title: 'TypeScript Best Practices for Large Applications',
    slug: 'typescript-best-practices',
    excerpt: 'Discover essential TypeScript best practices for building maintainable, scalable applications with proper type safety and code organization.',
    content: `
# TypeScript Best Practices for Large Applications

TypeScript has become the go-to choice for building large-scale JavaScript applications. Here are the best practices I've learned from working on enterprise-level TypeScript projects.

## Project Structure and Organization

### 1. Organize Types and Interfaces

\`\`\`typescript
// types/index.ts
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}
\`\`\`

### 2. Use Barrel Exports

\`\`\`typescript
// utils/index.ts
export { formatDate } from './date';
export { validateEmail } from './validation';
export { apiClient } from './api';
\`\`\`

## Type Safety Best Practices

### 1. Strict TypeScript Configuration

\`\`\`json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
\`\`\`

### 2. Use Discriminated Unions

\`\`\`typescript
type LoadingState = 
  | { status: 'loading' }
  | { status: 'success'; data: User[] }
  | { status: 'error'; error: string };
\`\`\`

### 3. Leverage Utility Types

\`\`\`typescript
// Make all properties optional
type PartialUser = Partial<User>;

// Pick specific properties
type UserSummary = Pick<User, 'id' | 'name'>;

// Omit specific properties
type CreateUser = Omit<User, 'id'>;
\`\`\`

## Advanced Patterns

### 1. Generic Constraints

\`\`\`typescript
interface Identifiable {
  id: string;
}

function updateEntity<T extends Identifiable>(
  entity: T,
  updates: Partial<T>
): T {
  return { ...entity, ...updates };
}
\`\`\`

### 2. Conditional Types

\`\`\`typescript
type ApiResponse<T> = T extends string
  ? { message: T }
  : { data: T };
\`\`\`

## Testing with TypeScript

\`\`\`typescript
// Use type assertions for test data
const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com'
} as const;
\`\`\`

## Conclusion

TypeScript's power lies in its type system. By following these best practices, you can build more maintainable, scalable applications with fewer runtime errors and better developer experience.
    `,
    publishedAt: '2023-05-10T09:15:00Z',
    updatedAt: '2023-05-10T09:15:00Z',
    featured: false,
    tags: ['TypeScript', 'Best Practices', 'JavaScript', 'Development'],
    category: 'Tutorial',
    readingTime: 10,
    author,
    seo: {
      title: 'TypeScript Best Practices for Large-Scale Applications',
      description: 'Learn essential TypeScript best practices for building maintainable, scalable applications with proper type safety.',
      keywords: ['typescript', 'best practices', 'javascript', 'type safety', 'development'],
      ogImage: '/images/blog/typescript-best-practices-og.jpg'
    }
  },
  {
    id: 'modern-css-techniques',
    title: 'Modern CSS Techniques Every Developer Should Know',
    slug: 'modern-css-techniques',
    excerpt: 'Explore cutting-edge CSS features including Grid, Container Queries, and CSS Custom Properties to create responsive, maintainable stylesheets.',
    content: `
# Modern CSS Techniques Every Developer Should Know

CSS has evolved significantly in recent years. Here are the modern techniques that every developer should master to create beautiful, responsive, and maintainable stylesheets.

## CSS Grid: The Ultimate Layout Tool

CSS Grid provides powerful two-dimensional layout capabilities:

\`\`\`css
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
}

.grid-item {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
\`\`\`

## Container Queries: Responsive Components

Container queries allow components to respond to their container size:

\`\`\`css
.card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    display: flex;
    align-items: center;
  }
  
  .card-image {
    width: 150px;
    margin-right: 1rem;
  }
}
\`\`\`

## CSS Custom Properties (Variables)

Create maintainable, themeable stylesheets:

\`\`\`css
:root {
  --primary-color: #3b82f6;
  --secondary-color: #64748b;
  --border-radius: 8px;
  --spacing-unit: 1rem;
}

.button {
  background-color: var(--primary-color);
  border-radius: var(--border-radius);
  padding: calc(var(--spacing-unit) * 0.5) var(--spacing-unit);
}

/* Dark theme */
[data-theme="dark"] {
  --primary-color: #60a5fa;
  --secondary-color: #94a3b8;
}
\`\`\`

## Advanced Flexbox Patterns

### Sticky Footer

\`\`\`css
.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
}
\`\`\`

### Equal Height Cards

\`\`\`css
.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.card {
  flex: 1 1 300px;
  display: flex;
  flex-direction: column;
}

.card-content {
  flex: 1;
}
\`\`\`

## Modern Animations

### CSS Transforms and Transitions

\`\`\`css
.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}
\`\`\`

### CSS Animations

\`\`\`css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-in {
  animation: fadeInUp 0.6s ease-out;
}
\`\`\`

## Responsive Design with Modern CSS

### Fluid Typography

\`\`\`css
.heading {
  font-size: clamp(1.5rem, 4vw, 3rem);
}
\`\`\`

### Aspect Ratio

\`\`\`css
.video-container {
  aspect-ratio: 16 / 9;
  width: 100%;
}
\`\`\`

## Conclusion

Modern CSS provides powerful tools for creating responsive, maintainable, and beautiful web interfaces. By mastering these techniques, you can build better user experiences while writing cleaner, more efficient code.
    `,
    publishedAt: '2023-04-05T16:45:00Z',
    updatedAt: '2023-04-05T16:45:00Z',
    featured: false,
    tags: ['CSS', 'Web Design', 'Responsive Design', 'Frontend'],
    category: 'Tutorial',
    readingTime: 9,
    author,
    seo: {
      title: 'Modern CSS Techniques: Grid, Container Queries, and More',
      description: 'Master modern CSS techniques including Grid, Container Queries, and Custom Properties for responsive, maintainable stylesheets.',
      keywords: ['css', 'grid', 'container queries', 'responsive design', 'web design'],
      ogImage: '/images/blog/modern-css-og.jpg'
    }
  },
  {
    id: 'nodejs-microservices-architecture',
    title: 'Building Microservices with Node.js: A Complete Guide',
    slug: 'nodejs-microservices-architecture',
    excerpt: 'Learn how to design and implement a robust microservices architecture using Node.js, including service communication, data management, and deployment strategies.',
    content: `
# Building Microservices with Node.js: A Complete Guide

Microservices architecture has become the standard for building scalable, maintainable applications. In this guide, I'll walk you through designing and implementing microservices using Node.js.

## What Are Microservices?

Microservices are small, independent services that communicate over well-defined APIs. Each service:

- Has a single responsibility
- Can be developed and deployed independently
- Owns its data and business logic
- Communicates via HTTP/REST or messaging

## Architecture Overview

Our example e-commerce system consists of:

- **API Gateway**: Routes requests and handles authentication
- **User Service**: Manages user accounts and authentication
- **Product Service**: Handles product catalog
- **Order Service**: Processes orders and payments
- **Notification Service**: Sends emails and notifications

## Service Implementation

### 1. User Service

\`\`\`javascript
// user-service/src/app.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/User');

const app = express();
app.use(express.json());

// Register endpoint
app.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      email,
      password: hashedPassword,
      name
    });
    
    await user.save();
    
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.status(201).json({
      message: 'User created successfully',
      token,
      user: { id: user._id, email, name }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({
      message: 'Login successful',
      token,
      user: { id: user._id, email: user.email, name: user.name }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = app;
\`\`\`

### 2. API Gateway

\`\`\`javascript
// api-gateway/src/app.js
const express = require('express');
const httpProxy = require('http-proxy-middleware');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Route to user service
app.use('/api/users', httpProxy({
  target: process.env.USER_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: {
    '^/api/users': ''
  }
}));

// Route to product service (protected)
app.use('/api/products', authenticateToken, httpProxy({
  target: process.env.PRODUCT_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: {
    '^/api/products': ''
  }
}));

// Route to order service (protected)
app.use('/api/orders', authenticateToken, httpProxy({
  target: process.env.ORDER_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: {
    '^/api/orders': ''
  }
}));

module.exports = app;
\`\`\`

## Service Communication

### 1. Synchronous Communication (HTTP)

\`\`\`javascript
// order-service/src/services/productService.js
const axios = require('axios');

class ProductService {
  constructor() {
    this.baseURL = process.env.PRODUCT_SERVICE_URL;
  }

  async getProduct(productId) {
    try {
      const response = await axios.get(\`\${this.baseURL}/products/\${productId}\`);
      return response.data;
    } catch (error) {
      throw new Error(\`Failed to fetch product: \${error.message}\`);
    }
  }

  async updateInventory(productId, quantity) {
    try {
      await axios.patch(\`\${this.baseURL}/products/\${productId}/inventory\`, {
        quantity: -quantity
      });
    } catch (error) {
      throw new Error(\`Failed to update inventory: \${error.message}\`);
    }
  }
}

module.exports = ProductService;
\`\`\`

### 2. Asynchronous Communication (Message Queue)

\`\`\`javascript
// shared/eventBus.js
const amqp = require('amqplib');

class EventBus {
  constructor() {
    this.connection = null;
    this.channel = null;
  }

  async connect() {
    this.connection = await amqp.connect(process.env.RABBITMQ_URL);
    this.channel = await this.connection.createChannel();
  }

  async publish(exchange, routingKey, message) {
    await this.channel.assertExchange(exchange, 'topic', { durable: true });
    
    this.channel.publish(
      exchange,
      routingKey,
      Buffer.from(JSON.stringify(message)),
      { persistent: true }
    );
  }

  async subscribe(exchange, queue, routingKey, callback) {
    await this.channel.assertExchange(exchange, 'topic', { durable: true });
    await this.channel.assertQueue(queue, { durable: true });
    await this.channel.bindQueue(queue, exchange, routingKey);

    this.channel.consume(queue, (message) => {
      if (message) {
        const content = JSON.parse(message.content.toString());
        callback(content);
        this.channel.ack(message);
      }
    });
  }
}

module.exports = EventBus;
\`\`\`

## Data Management

Each service manages its own database:

\`\`\`javascript
// user-service/src/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);
\`\`\`

## Deployment with Docker

### Service Dockerfile

\`\`\`dockerfile
# user-service/Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY src/ ./src/

EXPOSE 3000

CMD ["node", "src/server.js"]
\`\`\`

### Docker Compose

\`\`\`yaml
# docker-compose.yml
version: '3.8'

services:
  api-gateway:
    build: ./api-gateway
    ports:
      - "3000:3000"
    environment:
      - USER_SERVICE_URL=http://user-service:3001
      - PRODUCT_SERVICE_URL=http://product-service:3002
      - ORDER_SERVICE_URL=http://order-service:3003
    depends_on:
      - user-service
      - product-service
      - order-service

  user-service:
    build: ./user-service
    ports:
      - "3001:3001"
    environment:
      - MONGODB_URL=mongodb://user-db:27017/users
      - JWT_SECRET=your-secret-key
    depends_on:
      - user-db

  user-db:
    image: mongo:5
    volumes:
      - user-data:/data/db

volumes:
  user-data:
\`\`\`

## Best Practices

1. **Service Independence**: Each service should be deployable independently
2. **Data Ownership**: Services should own their data and not share databases
3. **API Versioning**: Use versioning to maintain backward compatibility
4. **Circuit Breakers**: Implement circuit breakers for resilience
5. **Monitoring**: Add comprehensive logging and monitoring
6. **Security**: Implement proper authentication and authorization

## Conclusion

Microservices architecture provides scalability and maintainability benefits but comes with complexity. Start with a monolith and extract services as your application grows. Focus on proper service boundaries, communication patterns, and operational practices.
    `,
    publishedAt: '2023-03-20T11:20:00Z',
    updatedAt: '2023-03-20T11:20:00Z',
    featured: true,
    tags: ['Node.js', 'Microservices', 'Architecture', 'Backend'],
    category: 'Architecture',
    readingTime: 15,
    author,
    seo: {
      title: 'Building Microservices with Node.js: Complete Architecture Guide',
      description: 'Learn to design and implement robust microservices architecture using Node.js with service communication, data management, and deployment.',
      keywords: ['nodejs', 'microservices', 'architecture', 'backend', 'api gateway'],
      ogImage: '/images/blog/nodejs-microservices-og.jpg'
    }
  }
];

export const getFeaturedPosts = (): BlogPost[] => {
  return blogPosts.filter(post => post.featured);
};

export const getPostsByCategory = (category: string): BlogPost[] => {
  return blogPosts.filter(post => post.category.toLowerCase() === category.toLowerCase());
};

export const getPostsByTag = (tag: string): BlogPost[] => {
  return blogPosts.filter(post => 
    post.tags.some(postTag => postTag.toLowerCase() === tag.toLowerCase())
  );
};

export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

export const getRelatedPosts = (currentPost: BlogPost, limit: number = 3): BlogPost[] => {
  return blogPosts
    .filter(post => post.id !== currentPost.id)
    .filter(post => 
      post.tags.some(tag => currentPost.tags.includes(tag)) ||
      post.category === currentPost.category
    )
    .slice(0, limit);
};

export const getAllTags = (): string[] => {
  const tags = new Set<string>();
  blogPosts.forEach(post => {
    post.tags.forEach(tag => tags.add(tag));
  });
  return Array.from(tags).sort();
};

export const getAllCategories = (): string[] => {
  const categories = new Set<string>();
  blogPosts.forEach(post => {
    categories.add(post.category);
  });
  return Array.from(categories).sort();
};