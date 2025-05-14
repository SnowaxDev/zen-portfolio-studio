
import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from './ui/badge';
import { AspectRatio } from './ui/aspect-ratio';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  github: string;
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
      className="group bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-border/50"
      whileHover={{ y: -5 }}
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
            className="w-full h-full object-cover transition duration-500 group-hover:scale-105" 
          />
        </AspectRatio>
        
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          <div className="p-4 flex space-x-3">
            <motion.a 
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-white px-3 py-1.5 rounded-md text-sm font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Live Demo
            </motion.a>
            <motion.a 
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-background/80 backdrop-blur-sm text-foreground px-3 py-1.5 rounded-md text-sm font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              GitHub
            </motion.a>
          </div>
        </motion.div>
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-foreground/70 text-sm mb-4">{description}</p>
        
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <Badge 
              key={index} 
              variant="secondary"
              className="text-xs font-medium"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
