
import React from 'react';
import { motion } from 'framer-motion';
import AnimatedText from '../components/AnimatedText';
import ParticleBackground from '../components/ParticleBackground';
import { useIsMobile } from '../hooks/use-mobile';
import { sectionMeta } from '../lib/section-data';

const HeroSection: React.FC = () => {
  const isMobile = useIsMobile();
  const { hero } = sectionMeta;
  
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden">
      <ParticleBackground />
      
      <div className="container-custom text-center md:text-left flex flex-col md:flex-row items-center relative z-10">
        <motion.div 
          className="md:w-1/2 mb-10 md:mb-0 px-4 sm:px-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.span 
            className="inline-block text-primary font-medium mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {hero.subtitle}
          </motion.span>
          
          {isMobile ? (
            <h1 className="text-3xl font-bold mb-6 leading-tight">
              {hero.title}
            </h1>
          ) : (
            <AnimatedText 
              text={hero.title}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              animation="wave"
            />
          )}
          
          <motion.p 
            className="text-foreground/70 mb-8 max-w-lg mx-auto md:mx-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            {hero.description}
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <motion.a 
              href="#projects" 
              className="group relative btn bg-primary text-white hover:bg-primary/90 px-8 py-3 rounded-lg font-medium overflow-hidden w-full sm:w-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Moje Projekty</span>
              <motion.span 
                className="absolute inset-0 bg-gradient-to-r from-primary-foreground/20 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
            
            <motion.a 
              href="#contact" 
              className="group relative btn border border-primary text-primary hover:bg-primary/10 px-8 py-3 rounded-lg font-medium overflow-hidden w-full sm:w-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Kontaktujte Mě</span>
              <motion.span 
                className="absolute inset-0 bg-primary/5"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="md:w-1/2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="relative mx-auto w-56 h-56 md:w-80 md:h-80">
            <motion.div 
              className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary to-purple-500 opacity-20 blur-3xl"
              animate={{ 
                scale: [1, 1.05, 1],
                rotate: [0, 5, 0],
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <motion.div 
              className="relative w-full h-full rounded-full overflow-hidden border-4 border-background"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&q=80" 
                alt="Jan Novák" 
                className="w-full h-full object-cover"
              />
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ 
          y: [0, 10, 0],
        }}
        transition={{ 
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <a href="#about" className="flex flex-col items-center">
          <span className="text-sm text-foreground/50 mb-2">Scroll</span>
          <motion.div 
            className="w-6 h-10 rounded-full border-2 border-foreground/20 flex justify-center"
            whileHover={{ scale: 1.1 }}
          >
            <motion.div 
              className="w-1.5 h-1.5 bg-primary rounded-full mt-1"
              animate={{ 
                y: [0, 12, 0],
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
};

export default HeroSection;
