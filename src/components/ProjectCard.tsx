
import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from './ui/badge';
import { AspectRatio } from './ui/aspect-ratio';
import { ExternalLink, Github, ChevronRight } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string | null;
  github: string | null;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  image,
  tags,
  link,
  github
}) => {
  return (
    <motion.div 
      className="group glassmorphism rounded-xl overflow-hidden shadow-sm hover:shadow-accent/20 hover:shadow-lg transition-all duration-500"
      whileHover={{ y: -8 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative overflow-hidden">
        <AspectRatio ratio={16/9}>
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition duration-700 group-hover:scale-105 filter brightness-90" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-60" />
        </AspectRatio>
        
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          <div className="p-4 flex space-x-3">
            {link && (
              <motion.a 
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 shadow-lg shadow-primary/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
              >
                <span>Live Demo</span>
                <ExternalLink size={16} />
              </motion.a>
            )}
            {github && (
              <motion.a 
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-muted/70 backdrop-blur-sm text-foreground hover:bg-muted px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
              >
                <span>GitHub</span>
                <Github size={16} />
              </motion.a>
            )}
          </div>
        </motion.div>
        
        {/* Card badge */}
        <div className="absolute top-3 right-3">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-accent/90 backdrop-blur-md text-xs font-bold text-accent-foreground px-2.5 py-1 rounded-full shadow-lg"
          >
            Portfolio
          </motion.div>
        </div>
      </div>
      
      <div className="p-6">
        <motion.h3 
          className="text-xl font-bold mb-2 text-gradient group-hover:text-accent transition-colors"
          whileHover={{ x: 2 }}
        >
          {title}
        </motion.h3>
        <p className="text-foreground/70 text-sm mb-4 font-serif">{description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <Badge 
              key={index} 
              variant="secondary"
              className="text-xs font-medium bg-secondary/70 hover:bg-secondary/90 backdrop-blur-sm shadow-sm"
            >
              {tag}
            </Badge>
          ))}
        </div>
        
        <motion.div 
          className="mt-2 w-full h-8 flex justify-end items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div 
            className="text-primary group-hover:text-accent flex items-center gap-1 transition-all duration-300"
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-sm font-medium">View Details</span>
            <ChevronRight size={18} className="transition-all duration-300 group-hover:translate-x-1" />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
