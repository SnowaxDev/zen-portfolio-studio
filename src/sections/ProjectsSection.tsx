
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle';
import ProjectCard from '../components/ProjectCard';
import ProjectTimer from '../components/ProjectTimer';
import ScrollReveal from '../components/ScrollReveal';
import { projects, sectionMeta } from '../lib/section-data';
import { Github } from 'lucide-react';

const ProjectsSection: React.FC = () => {
  const { projects: projectsMeta } = sectionMeta;
  
  // Separate projects into current and upcoming
  const currentProjects = projects.filter(project => !project.isUpcoming);
  const upcomingProjects = projects.filter(project => project.isUpcoming);

  return (
    <section id="projects" className="section">
      <div className="container-custom">
        <SectionTitle 
          title={projectsMeta.title} 
          subtitle={projectsMeta.subtitle}
        />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentProjects.map((project, index) => (
            <ScrollReveal 
              key={index} 
              width="100%" 
              delay={index * 0.1} 
              animationStyle="scale"
            >
              <Link 
                to={`/projects/${project.id}`}
                className="block transition-transform hover:outline-none focus:outline-none"
              >
                <ProjectCard 
                  title={project.title}
                  description={project.description}
                  image={project.image}
                  tags={project.tags}
                  link={project.link}
                  github={project.github}
                />
              </Link>
            </ScrollReveal>
          ))}
        </div>
        
        {upcomingProjects.length > 0 && (
          <div className="mt-16">
            <ScrollReveal>
              <h3 className="text-2xl font-bold mb-6 text-gradient">{projectsMeta.upcomingTitle}</h3>
            </ScrollReveal>
            
            <div className="grid md:grid-cols-2 gap-6">
              {upcomingProjects.map((project, index) => (
                <ScrollReveal key={index} width="100%" delay={index * 0.2}>
                  <motion.div 
                    className="glassmorphism rounded-xl p-6 border border-primary/20"
                    whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(var(--primary), 0.1)" }}
                  >
                    <h4 className="text-xl font-bold mb-2">{project.title}</h4>
                    <p className="text-foreground/70 mb-4">{project.description}</p>
                    <ProjectTimer launchDate={project.launchDate} />
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        )}
        
        <ScrollReveal className="text-center mt-12" delay={0.4}>
          <p className="text-foreground/70 mb-4">
            {projectsMeta.moreText}
          </p>
          <motion.a 
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-secondary text-foreground hover:bg-secondary/80 transition-colors px-6 py-3 rounded-lg font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github size={18} />
            {projectsMeta.githubText}
          </motion.a>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ProjectsSection;
