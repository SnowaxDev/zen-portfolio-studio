
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AspectRatio } from '../components/ui/aspect-ratio';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollReveal from '../components/ScrollReveal';

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  tags: string[];
  link: string | null;
  github: string | null;
  isUpcoming: boolean;
  launchDate: string | null;
  type: 'client' | 'personal' | 'redesign';
  beforeImage?: string;
  clientNotes?: string;
  technicalDetails?: string[];
  challenges?: string[];
  solutions?: string[];
}

// In a real app, this would come from a database or API
const getProjectData = (id: string): Project | undefined => {
  // This is placeholder data - in a real app, you'd fetch this from an API
  const projects: Project[] = [
    {
      id: 'ecommerce-dashboard',
      title: 'E-commerce Dashboard',
      description: 'A comprehensive admin dashboard for managing products, orders, and customers built with React and Tailwind CSS.',
      longDescription: 'This e-commerce dashboard provides store owners with powerful tools to manage their online business. The dashboard includes real-time analytics, inventory management, order processing, and customer relationship management tools.',
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&h=280&fit=crop&q=80',
      tags: ['React', 'TailwindCSS', 'Redux', 'Chart.js'],
      link: 'https://example.com',
      github: 'https://github.com',
      isUpcoming: false,
      launchDate: null,
      type: 'client',
      clientNotes: 'The client needed a solution that would streamline their e-commerce operations and provide actionable insights from their sales data.',
      technicalDetails: [
        'Built with React and TypeScript for robust type safety',
        'State management with Redux for predictable state updates',
        'Chart.js for data visualization',
        'Responsive UI built with Tailwind CSS',
        'REST API integration with the backend'
      ],
      challenges: [
        'Complex data relationships between products, orders, and customers',
        'Real-time updates for order status changes',
        'Performance optimization for large datasets'
      ],
      solutions: [
        'Implemented a normalized data structure for efficient state management',
        'Used WebSockets for real-time notifications and updates',
        'Added pagination and virtualization for large data tables'
      ]
    },
    {
      id: 'task-management',
      title: 'Task Management App',
      description: 'A productivity application for organizing tasks with drag-and-drop functionality and real-time updates.',
      longDescription: 'This task management application helps teams stay organized with intuitive task boards, lists, and cards. Users can easily move tasks between different stages, set due dates, assign tasks to team members, and track progress in real-time.',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=500&h=280&fit=crop&q=80',
      tags: ['Next.js', 'TypeScript', 'Prisma', 'Framer Motion'],
      link: 'https://example.com',
      github: 'https://github.com',
      isUpcoming: false,
      launchDate: null,
      type: 'personal',
      technicalDetails: [
        'Next.js for server-side rendering and improved SEO',
        'TypeScript for type safety',
        'Prisma ORM for database operations',
        'Framer Motion for smooth animations',
        'Real-time updates with WebSockets'
      ]
    },
    // More projects would be defined here
  ];
  
  return projects.find(project => project.id === id);
};

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | undefined>(undefined);
  
  useEffect(() => {
    if (id) {
      const projectData = getProjectData(id);
      setProject(projectData);
      
      // Update page title
      if (projectData) {
        document.title = `${projectData.title} | John Doe Portfolio`;
      }
    }
  }, [id]);
  
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Project not found</h2>
          <Link to="/" className="text-primary hover:underline">
            Return to home
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen overflow-x-hidden"
    >
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container-custom">
          <Link to="/#projects" className="inline-flex items-center text-primary hover:underline mb-6">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="mr-2"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back to Projects
          </Link>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag, index) => (
                <Badge 
                  key={index} 
                  variant="secondary"
                  className="text-sm font-medium bg-secondary/70"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <ScrollReveal>
                <AspectRatio ratio={16/9} className="overflow-hidden rounded-xl mb-8">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover" 
                  />
                </AspectRatio>
              </ScrollReveal>
              
              <ScrollReveal delay={0.2}>
                <div className="prose prose-invert max-w-none">
                  <h2 className="text-2xl font-bold mb-4">Overview</h2>
                  <p className="text-lg text-foreground/80 mb-6">
                    {project.longDescription || project.description}
                  </p>
                  
                  {project.type === 'redesign' && project.beforeImage && (
                    <div className="my-8">
                      <h3 className="text-xl font-bold mb-4">Before & After</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-foreground/60 mb-2">Before</p>
                          <AspectRatio ratio={16/9} className="overflow-hidden rounded-lg">
                            <img 
                              src={project.beforeImage} 
                              alt={`${project.title} before redesign`} 
                              className="w-full h-full object-cover" 
                            />
                          </AspectRatio>
                        </div>
                        <div>
                          <p className="text-sm text-foreground/60 mb-2">After</p>
                          <AspectRatio ratio={16/9} className="overflow-hidden rounded-lg">
                            <img 
                              src={project.image} 
                              alt={`${project.title} after redesign`} 
                              className="w-full h-full object-cover" 
                            />
                          </AspectRatio>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {project.technicalDetails && (
                    <div className="my-8">
                      <h3 className="text-xl font-bold mb-4">Technical Details</h3>
                      <ul className="list-disc pl-5 space-y-2">
                        {project.technicalDetails.map((detail, index) => (
                          <li key={index} className="text-foreground/80">{detail}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {project.challenges && project.solutions && (
                    <div className="my-8">
                      <h3 className="text-xl font-bold mb-4">Challenges & Solutions</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <Card className="bg-card/50 border-primary/10">
                          <CardContent className="pt-6">
                            <h4 className="text-lg font-semibold mb-3 text-primary">Challenges</h4>
                            <ul className="list-disc pl-5 space-y-2">
                              {project.challenges.map((challenge, index) => (
                                <li key={index} className="text-foreground/80">{challenge}</li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                        <Card className="bg-card/50 border-primary/10">
                          <CardContent className="pt-6">
                            <h4 className="text-lg font-semibold mb-3 text-primary">Solutions</h4>
                            <ul className="list-disc pl-5 space-y-2">
                              {project.solutions.map((solution, index) => (
                                <li key={index} className="text-foreground/80">{solution}</li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            </div>
            
            <div>
              <ScrollReveal direction="left">
                <Card className="sticky top-24 bg-card/50 border-primary/10">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold mb-4">Project Details</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-foreground/60">Type</p>
                        <p className="font-medium capitalize">{project.type} Project</p>
                      </div>
                      
                      {project.clientNotes && (
                        <div>
                          <p className="text-sm text-foreground/60">Client Notes</p>
                          <p className="text-sm">{project.clientNotes}</p>
                        </div>
                      )}
                      
                      <div className="pt-4 flex flex-col space-y-3">
                        {project.link && (
                          <a 
                            href={project.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
                          >
                            <span>Live Demo</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                          </a>
                        )}
                        
                        {project.github && (
                          <a 
                            href={project.github} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-full bg-secondary text-foreground px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center gap-2 hover:bg-secondary/80 transition-colors"
                          >
                            <span>View Source</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </motion.div>
  );
};

export default ProjectDetails;
