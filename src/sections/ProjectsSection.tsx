
import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../components/SectionTitle';
import ProjectCard from '../components/ProjectCard';

const projects = [
  {
    title: 'E-commerce Dashboard',
    description: 'A comprehensive admin dashboard for managing products, orders, and customers built with React and Tailwind CSS.',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&h=280&fit=crop&q=80',
    tags: ['React', 'TailwindCSS', 'Redux', 'Chart.js'],
    link: '#',
    github: '#'
  },
  {
    title: 'Task Management App',
    description: 'A productivity application for organizing tasks with drag-and-drop functionality and real-time updates.',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=500&h=280&fit=crop&q=80',
    tags: ['Next.js', 'TypeScript', 'Prisma', 'Framer Motion'],
    link: '#',
    github: '#'
  },
  {
    title: 'Fitness Tracker',
    description: 'Mobile-responsive application for tracking workouts and nutrition with data visualization and progress tracking.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&h=280&fit=crop&q=80',
    tags: ['React Native', 'Firebase', 'Expo', 'D3.js'],
    link: '#',
    github: '#'
  },
];

const ProjectsSection: React.FC = () => {
  return (
    <section id="projects" className="section">
      <div className="container-custom">
        <SectionTitle 
          title="My Projects" 
          subtitle="Check out some of my recent work"
        />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard 
              key={index}
              title={project.title}
              description={project.description}
              image={project.image}
              tags={project.tags}
              link={project.link}
              github={project.github}
            />
          ))}
        </div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-foreground/70 mb-4">
            Want to see more of my work?
          </p>
          <a 
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-secondary text-foreground hover:bg-secondary/80 transition-colors px-6 py-3 rounded-lg font-medium"
          >
            Visit My GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
