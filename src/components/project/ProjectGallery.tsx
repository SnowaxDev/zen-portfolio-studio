
import React from 'react';
import { motion } from 'framer-motion';
import { AspectRatio } from '../ui/aspect-ratio';
import ScrollReveal from '../ScrollReveal';

interface ProjectGalleryProps {
  gallery?: string[];
  title: string;
}

const ProjectGallery: React.FC<ProjectGalleryProps> = ({ gallery, title }) => {
  if (!gallery || gallery.length === 0) return null;
  
  return (
    <ScrollReveal>
      <div className="my-12">
        <h3 className="text-xl font-bold mb-6 text-gold">Galerie projektu</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {gallery.map((image, index) => (
            <motion.div 
              key={index}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <AspectRatio ratio={16/9} className="overflow-hidden rounded-lg border border-gold/10 shadow-lg">
                <img 
                  src={image} 
                  alt={`${title} screenshot ${index + 1}`} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </AspectRatio>
            </motion.div>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
};

export default ProjectGallery;
