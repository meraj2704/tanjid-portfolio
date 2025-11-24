// This module defines and manages service data.
// In Next.js, changes made via Server Actions will persist only for the current session.
// For real persistence, integrate a database.

import { TypeIcon as type, LucideIcon, Terminal, Layers, Server, Database, GitBranch, Code, Cloud, ShieldCheck } from 'lucide-react';

export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  icon: keyof typeof LucideIcons; // Type for Lucide React icon names
}

// Map icon names to actual Lucide React components
// This must be declared before 'Service' interface is used in allServices
export const LucideIcons = {
  Terminal,
  Layers,
  Server,
  Database,
  GitBranch,
  Code,
  Cloud,
  ShieldCheck,
};


// Using a 'let' variable to allow modification via server actions within the current session
let servicesData: Service[] = [
  {
    id: 'backend-development',
    title: 'Backend Development',
    shortDescription: 'Building robust and scalable server-side applications with Node.js, Express, and Nest.js.',
    longDescription: 'I specialize in crafting high-performance and secure backend solutions using Node.js, leveraging frameworks like Express.js and Nest.js. My expertise includes designing RESTful APIs, implementing GraphQL endpoints, integrating with various databases (SQL and NoSQL), and ensuring robust authentication and authorization mechanisms. I focus on creating scalable, maintainable, and efficient server-side logic that powers complex web applications.',
    icon: 'Server',
  },
  {
    id: 'frontend-development',
    title: 'Frontend Development',
    shortDescription: 'Creating intuitive and dynamic user interfaces with React and Next.js.',
    longDescription: 'I develop engaging and responsive user interfaces using modern frontend technologies, primarily React and Next.js. My approach focuses on delivering exceptional user experiences through clean code, optimized performance, and pixel-perfect designs. I am proficient in state management, component-based architecture, and integrating with backend APIs to build seamless full-stack applications. I also ensure cross-browser compatibility and accessibility.',
    icon: 'Layers',
  },
  {
    id: 'database-management',
    title: 'Database Management',
    shortDescription: 'Designing, optimizing, and managing SQL and NoSQL databases.',
    longDescription: 'My services include comprehensive database design, optimization, and management for both SQL (PostgreSQL, MySQL) and NoSQL (MongoDB, Redis) solutions. I ensure data integrity, performance, and scalability by designing efficient schemas, writing optimized queries, and implementing proper indexing. I also handle database migrations, backups, and ensure data security, providing a reliable foundation for your applications.',
    icon: 'Database',
  },
  {
    id: 'api-integration',
    title: 'API Integration',
    shortDescription: 'Seamlessly connecting third-party services and APIs to your applications.',
    longDescription: 'I provide expert API integration services, connecting your applications with various third-party services, payment gateways, social media platforms, and other external APIs. This includes handling authentication, data mapping, error handling, and ensuring secure and efficient communication between systems. My goal is to extend your application\'s functionality and streamline workflows by leveraging existing services.',
    icon: 'Code',
  },
  {
    id: 'cloud-deployment',
    title: 'Cloud Deployment & DevOps',
    shortDescription: 'Deploying and managing applications on cloud platforms like Vercel and AWS.',
    longDescription: 'I assist with deploying and managing web applications on leading cloud platforms such as Vercel, AWS, and DigitalOcean. My services cover setting up CI/CD pipelines, configuring serverless functions, managing infrastructure as code, and monitoring application performance. I ensure your applications are highly available, scalable, and secure in a cloud environment, streamlining the deployment process and reducing operational overhead.',
    icon: 'Cloud',
  },
  {
    id: 'security-auditing',
    title: 'Security Auditing & Best Practices',
    shortDescription: 'Ensuring your applications are secure and follow industry best practices.',
    longDescription: 'I offer security auditing and consulting services to identify vulnerabilities and implement best practices in your applications. This includes reviewing code for common security flaws, implementing secure authentication and authorization flows, protecting against common web attacks (e.g., XSS, CSRF), and ensuring data encryption. My aim is to build robust and secure applications that protect sensitive user data and maintain trust.',
    icon: 'ShieldCheck',
  },
];

export function getServiceById(id: string): Service | undefined {
  return servicesData.find(service => service.id === id);
}

// Server-side functions to modify the in-memory data
export function addServiceData(service: Service) {
  servicesData.push(service);
}

export function updateServiceData(id: string, updatedService: Service) {
  const index = servicesData.findIndex(s => s.id === id);
  if (index !== -1) {
    servicesData[index] = { ...updatedService, id }; // Ensure ID remains consistent
  }
}

export function deleteServiceData(id: string) {
  servicesData = servicesData.filter(s => s.id !== id);
}

export function getAllServicesData(): Service[] {
  return [...servicesData]; // Return a copy to prevent external modification
}
