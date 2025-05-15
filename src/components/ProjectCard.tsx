import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from './ui/badge';
import { AspectRatio } from './ui/aspect-ratio';
import { ExternalLink, Github, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string | null;
  github: string | null;
  id: string;
  type?: 'client' | 'personal' | 'redesign';
  price?: string | null;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  image,
  tags,
  link,
  github,
  id,
  type = 'personal',
  price
}) => {
  return (
    
    <motion.div 
      className="group rounded-xl overflow-hidden transition-all duration-500 h-full"
      whileHover={{ y: -8 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-card/70 backdrop-blur-sm border border-gold/10 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-gold/20 transition-all duration-300 h-full flex flex-col">
        <div className="relative overflow-hidden">
          <AspectRatio ratio={16/9}>
            <img 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover transition duration-700 group-hover:scale-105 filter brightness-90" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-60" />
          </AspectRatio>
          
          {/* Badge overlay */}
          <div className="absolute top-3 right-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-purple/90 backdrop-blur-md text-xs font-bold text-white px-2.5 py-1 rounded-full shadow-lg"
            >
              Portfolio
            </motion.div>
          </div>

          {/* Project type badge */}
          {type && (
            <div className="absolute top-3 left-3">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className={`backdrop-blur-md text-xs font-bold text-white px-2.5 py-1 rounded-full shadow-lg ${
                  type === 'client' ? 'bg-gold/90' : 
                  type === 'redesign' ? 'bg-purple-dark/90' : 
                  'bg-secondary/90'
                }`}
              >
                {type === 'client' ? 'Klientský Projekt' : 
                 type === 'redesign' ? 'Redesign' : 
                 'Osobní Projekt'}
              </motion.div>
            </div>
          )}
        </div>
        
        <div className="p-6 flex flex-col flex-grow">
          <motion.h3 
            className="text-xl font-bold mb-2 text-gradient group-hover:text-gold transition-colors"
            whileHover={{ x: 2 }}
          >
            {title}
          </motion.h3>
          <p className="text-foreground/70 text-sm mb-4">{description}</p>
          
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
          
          {/* Price tag if available */}
          {price && (
            <div className="mt-auto mb-4 flex items-center gap-2">
              <span className="text-xs text-foreground/50">Cena projektu:</span>
              <span className="text-gold font-medium">{price}</span>
            </div>
          )}
          
          <div className="mt-auto pt-4 flex justify-between items-center border-t border-white/5">
            {/* Action buttons */}
            <div className="flex gap-2">
              {github && (
                <motion.a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/70 hover:text-gold transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github size={18} />
                </motion.a>
              )}
              {link && (
                <motion.a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/70 hover:text-gold transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ExternalLink size={18} />
                </motion.a>
              )}
            </div>
            
            <Link to={`/projects/${id}`} className="text-gold flex items-center gap-1 group-hover:gap-2 transition-all">
              <span className="text-sm font-medium">Detail</span>
              <ChevronRight size={18} className="transition-all duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
