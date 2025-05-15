
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AspectRatio } from '../ui/aspect-ratio';
import { Badge } from '../ui/badge';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '../ScrollReveal';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  type?: 'client' | 'personal' | 'redesign';
}

interface RelatedProjectsProps {
  projects: Project[];
  currentProjectId: string;
}

const RelatedProjects: React.FC<RelatedProjectsProps> = ({ projects, currentProjectId }) => {
  // Get 3 related projects (excluding the current one)
  const relatedProjects = projects
    .filter(p => p.id !== currentProjectId)
    .slice(0, 3);
    
  if (relatedProjects.length === 0) return null;
  
  return (
    <ScrollReveal>
      <div className="my-12 pt-8 border-t border-white/10">
        <h3 className="text-2xl font-bold mb-8 text-gradient">Další projekty</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedProjects.map((project, index) => (
            <motion.div 
              key={project.id}
              whileHover={{ y: -8 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group"
            >
              <Link to={`/projects/${project.id}`} className="block h-full">
                <div className="bg-card/40 backdrop-blur-sm rounded-lg overflow-hidden border border-gold/10 hover:border-gold/30 transition-all duration-300 h-full flex flex-col">
                  <div className="relative">
                    <AspectRatio ratio={16/9}>
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    </AspectRatio>
                    
                    {project.type && (
                      <div className="absolute top-2 left-2">
                        <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                          project.type === 'client' ? 'bg-gold/90 text-primary-foreground' : 
                          project.type === 'redesign' ? 'bg-purple-dark/90 text-white' : 
                          'bg-secondary/90 text-foreground'
                        }`}>
                          {project.type === 'client' ? 'Klient' : 
                          project.type === 'redesign' ? 'Redesign' : 
                          'Osobní'}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4 flex-1 flex flex-col">
                    <h4 className="font-semibold mb-2 group-hover:text-gold transition-colors">
                      {project.title}
                    </h4>
                    
                    <div className="flex flex-wrap gap-1 mt-auto">
                      {project.tags.slice(0, 3).map((tag, idx) => (
                        <Badge 
                          key={idx}
                          variant="secondary" 
                          className="text-xs bg-secondary/50"
                        >
                          {tag}
                        </Badge>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="text-xs text-foreground/60">+{project.tags.length - 3}</span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <Link to="/#projects" className="inline-flex items-center text-gold hover:text-gold-light transition-all group">
            <span>Zobrazit všechny projekty</span>
            <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </ScrollReveal>
  );
};

export default RelatedProjects;
