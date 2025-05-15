
import React from 'react';
import { motion } from 'framer-motion';
import AnimatedText from '../components/AnimatedText';
import ParticleBackground from '../components/ParticleBackground';
import TextWithSparkles from '../components/TextWithSparkles';
import { useIsMobile } from '../hooks/use-mobile';
import { sectionMeta } from '../lib/section-data';
import { ArrowDown } from 'lucide-react';

const HeroSection: React.FC = () => {
  const isMobile = useIsMobile();
  const { hero } = sectionMeta;
  
  // Enhanced animation variants
  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.3
      } 
    }
  };
  
  const buttonVariants = {
    initial: { opacity: 0, y: 20 },
    animate: (custom: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        delay: 0.7 + (custom * 0.1)
      } 
    }),
    hover: { 
      scale: 1.05,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      } 
    },
    tap: { scale: 0.95 }
  };
  
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden">
      <ParticleBackground />
      
      <div className="container-custom text-center md:text-left flex flex-col md:flex-row items-center justify-between relative z-10">
        <motion.div 
          className="md:w-1/2 mb-10 md:mb-0 px-4 sm:px-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-2"
          >
            <span className="inline-block px-3 py-1 text-sm font-medium bg-gold/10 text-gold rounded-full border border-gold/20">
              {hero.subtitle}
            </span>
          </motion.div>
          
          {isMobile ? (
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
              <TextWithSparkles>{hero.title}</TextWithSparkles>
            </h1>
          ) : (
            <AnimatedText 
              text={hero.title}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6"
              animation="wave"
            />
          )}
          
          <motion.p 
            className="text-foreground/80 mb-8 max-w-lg mx-auto md:mx-0 text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            {hero.description}
          </motion.p>
          
          <div className="flex flex-col sm:flex-row gap-5 justify-center md:justify-start">
            <motion.a 
              href="#projects" 
              className="group relative overflow-hidden bg-gradient-to-r from-gold to-gold-light text-background px-8 py-3.5 rounded-lg font-medium shadow-lg shadow-gold/20"
              variants={buttonVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              whileTap="tap"
              custom={0}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Moje Projekty
                <motion.span
                  initial={{ x: -4, opacity: 0.5 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ repeat: Infinity, duration: 1, repeatType: "reverse" }}
                >
                  →
                </motion.span>
              </span>
              <motion.span 
                className="absolute inset-0 bg-gradient-to-r from-purple/80 to-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ x: '100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.4 }}
              />
            </motion.a>
            
            <motion.a 
              href="#contact" 
              className="group relative border-2 border-gold text-gold hover:text-background px-8 py-3.5 rounded-lg font-medium overflow-hidden"
              variants={buttonVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              whileTap="tap"
              custom={1}
            >
              <span className="relative z-10">Kontaktujte Mě</span>
              <motion.span 
                className="absolute inset-0 bg-gold"
                initial={{ y: '100%' }}
                whileHover={{ y: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          </div>
        </motion.div>
        
        <motion.div 
          className="md:w-5/12 relative"
          variants={imageVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 mx-auto">
            {/* Animated background elements */}
            <motion.div 
              className="absolute -inset-6 rounded-full bg-gradient-to-tr from-gold/30 to-purple/30 opacity-70 blur-3xl"
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
            
            {/* Circular animated border */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-dashed border-gold/30"
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Secondary decorative elements */}
            <motion.div
              className="absolute -right-6 -top-6 w-12 h-12 rounded-full bg-purple/20 backdrop-blur-md border border-purple/40"
              animate={{ 
                y: [0, -10, 0],
                x: [0, 5, 0],
                scale: [1, 1.1, 1], 
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            />
            
            <motion.div
              className="absolute -left-4 -bottom-4 w-16 h-16 rounded-full bg-gold/10 backdrop-blur-md border border-gold/30"
              animate={{ 
                y: [0, 10, 0],
                x: [0, -5, 0],
                scale: [1, 0.9, 1], 
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            />
            
            {/* Profile image */}
            <motion.div 
              className="relative w-full h-full rounded-full overflow-hidden border-4 border-background z-10"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=500&fit=crop&q=80" 
                alt="Jan Novák" 
                className="w-full h-full object-cover"
              />
              
              {/* Image overlay */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      {/* Enhanced scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <motion.p
          className="text-sm text-foreground/50 mb-2 font-medium"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          Scroll
        </motion.p>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="bg-card/80 backdrop-blur-sm p-2 rounded-full border border-white/10 shadow-lg"
        >
          <ArrowDown className="h-4 w-4 text-gold" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
