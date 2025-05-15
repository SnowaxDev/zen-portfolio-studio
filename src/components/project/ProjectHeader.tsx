
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Badge } from '../ui/badge';

interface ProjectHeaderProps {
  title: string;
  tags: string[];
  type?: 'client' | 'personal' | 'redesign';
}

const ProjectHeader: React.FC<ProjectHeaderProps> = ({ title, tags, type }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Link to="/#projects" className="inline-flex items-center text-gold hover:text-gold-light transition-all duration-300 mb-6 group">
        <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
        Zpět na Projekty
      </Link>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">{title}</h1>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag: string, index: number) => (
              <Badge 
                key={index} 
                variant="secondary"
                className="text-sm font-medium bg-secondary/70"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        
        {/* Project Type Badge */}
        {type && (
          <div className="mb-4 md:mb-0">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              className={`inline-block px-3 py-1 rounded-full text-sm font-semibold shadow-lg ${
                type === 'client' ? 'bg-gold/90 text-primary-foreground' : 
                type === 'redesign' ? 'bg-purple-dark/90 text-white' : 
                'bg-secondary/90 text-foreground'
              }`}>
              {type === 'client' ? 'Klientský Projekt' : 
               type === 'redesign' ? 'Redesign' : 
               'Osobní Projekt'}
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectHeader;
