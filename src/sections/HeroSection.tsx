
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import AnimatedText from '../components/AnimatedText';
import ParticleBackground from '../components/ParticleBackground';
import TextWithSparkles from '../components/TextWithSparkles';
import { useIsMobile } from '../hooks/use-mobile';
import { sectionMeta } from '../lib/section-data';
import { ArrowDown } from 'lucide-react';
import TextWithGlow from '../components/TextWithGlow';

const HeroSection: React.FC = () => {
  const isMobile = useIsMobile();
  const { hero } = sectionMeta;
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // ALL HOOKS MUST BE CALLED BEFORE ANY CONDITIONAL RETURNS
  // Scroll progress for parallax effects
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const profileScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);
  const profileOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0.85]);
  
  // Track mouse position for interactive elements
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) - 0.5,
        y: (e.clientY / window.innerHeight) - 0.5
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
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

  // NOW we can do conditional rendering after all hooks are called
  if (isMobile === undefined) {
    return (
      <section id="hero" className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold"></div>
        </div>
      </section>
    );
  }
  
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden">
      {/* Enhanced particle background with fewer particles on mobile */}
      <ParticleBackground />
      
      {/* Asymmetric background elements */}
      <motion.div
        className="absolute top-[15%] left-[10%] w-72 h-72 rounded-full bg-purple/5 blur-3xl opacity-40"
        style={{ y: backgroundY }}
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-[20%] right-[5%] w-96 h-96 rounded-full bg-gold/5 blur-3xl opacity-30"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]) }}
        animate={{
          scale: [1, 1.15, 1],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      
      <div className="container mx-auto px-4 lg:px-32 flex flex-col md:flex-row items-center justify-between relative z-10">
        {/* Desktop & Mobile responsive text content */}
        <motion.div 
          className="w-full md:w-7/12 lg:w-3/5 mb-8 md:mb-0 text-center md:text-left"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-6 md:mb-4 relative flex justify-center md:justify-start"
            style={{
              x: isMobile ? 0 : mousePosition.x * -15,
              y: isMobile ? 0 : mousePosition.y * -10,
            }}
          >
            <motion.span 
              className="inline-block px-3 py-1 text-sm font-medium bg-gold/10 text-gold rounded-full border border-gold/20"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(212, 175, 55, 0.15)" }}
            >
              {hero.subtitle}
            </motion.span>
          </motion.div>
          
          {/* Consistent heading rendering for both mobile and desktop */}
          <motion.div
            style={{
              x: isMobile ? 0 : mousePosition.x * -25,
              y: isMobile ? 0 : mousePosition.y * -15,
            }}
            transition={{ type: "spring", stiffness: 75, damping: 30 }}
          >
            <h1 className={`font-bold mb-6 ${isMobile ? 'text-[28px] leading-tight px-2' : 'text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-2'}`}>
              {!isMobile && (
                <AnimatedText 
                  text="Dušan Kostić"
                  className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-2"
                  animation="wave"
                />
              )}
              <div className={`text-gold font-semibold ${isMobile ? 'text-xl mt-2' : 'text-2xl md:text-3xl lg:text-4xl'}`}>
                Dusanko.dev
              </div>
            </h1>
          </motion.div>
          
          <motion.p 
            className="text-foreground/80 mb-8 max-w-lg md:max-w-xl text-lg px-4 md:px-0 mx-auto md:mx-0 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            style={{
              x: isMobile ? 0 : mousePosition.x * -10,
              y: isMobile ? 0 : mousePosition.y * -5,
            }}
          >
            {hero.description}
          </motion.p>
          
          {/* Fixed button layout - mobile stacked with proper spacing */}
          <motion.div 
            className={`flex ${isMobile ? 'flex-col space-y-3' : 'flex-row space-x-4'} justify-center md:justify-start relative pb-12`}
            style={{
              x: isMobile ? 0 : mousePosition.x * -5,
              y: isMobile ? 0 : mousePosition.y * -3,
            }}
          >
            <motion.a 
              href="#projects" 
              className={`group relative overflow-hidden bg-gradient-to-r from-gold to-gold-light text-background ${isMobile ? 'w-full py-4 px-6' : 'px-8 py-3.5'} rounded-lg font-medium shadow-lg shadow-gold/20`}
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
            </motion.a>
            
            <motion.a 
              href="#contact" 
              className={`group relative border-2 border-gold text-gold hover:text-background ${isMobile ? 'w-full py-4 px-6' : 'px-8 py-3.5'} rounded-lg font-medium overflow-hidden`}
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
          </motion.div>
        </motion.div>
        
        {/* Fixed profile image positioning */}
        <motion.div 
          className="w-full md:w-5/12 lg:w-2/5 relative"
          variants={imageVariants}
          initial="hidden"
          animate="visible"
          style={{ 
            scale: profileScale, 
            opacity: profileOpacity,
            x: isMobile ? 0 : mousePosition.x * 20,
            y: isMobile ? 0 : mousePosition.y * 20,
            marginBottom: isMobile ? '24px' : '0',
            marginTop: isMobile ? '0' : '-30px'
          }}
        >
          <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 mx-auto">
            {/* Animated background glow with parallax */}
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
              style={{
                x: isMobile ? 0 : mousePosition.x * 30,
                y: isMobile ? 0 : mousePosition.y * 30
              }}
            />
            
            {/* Animated circular effects */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-dashed border-gold/30"
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            />
            
            <motion.div
              className="absolute -inset-3 rounded-full border border-purple/20"
              animate={{ 
                scale: [1, 1.05, 1],
                rotate: [0, -15, 0],
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* Decorative orbiting elements - reduced for mobile */}
            {!isMobile && (
              <>
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
                  className="absolute -left-8 top-1/2 w-16 h-16 rounded-full bg-gold/10 backdrop-blur-md border border-gold/30"
                  animate={{ 
                    y: [0, 10, 0],
                    x: [0, -5, 0],
                    scale: [1, 0.9, 1], 
                  }}
                  transition={{ 
                    duration: 7, 
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                />
              </>
            )}
            
            <motion.div
              className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-purple-light/20 backdrop-blur-sm"
              animate={{ 
                y: [0, 8, 0],
                x: [0, 8, 0],
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
            
            {/* Profile image with hover effect */}
            <motion.div 
              className="relative w-full h-full rounded-full overflow-hidden border-4 border-background z-10"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
              style={{
                boxShadow: "0 0 30px rgba(212, 175, 55, 0.15)"
              }}
            >
              <img 
                src="/lovable-uploads/4675bcc5-3096-4a4e-a9ab-c69be970616b.png"
                alt="Dušan Kostić" 
                className="w-full h-full object-cover"
              />
              
              {/* Interactive image overlay */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      {/* Enhanced scroll indicator */}
      <motion.div 
        className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        whileHover={{ scale: 1.1 }}
        style={{
          x: mousePosition.x * -5,
          y: mousePosition.y * -3,
        }}
      >
        <motion.p
          className="text-sm text-foreground/60 mb-2 font-medium"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <TextWithGlow intensity="light" pulsate={true}>Scroll</TextWithGlow>
        </motion.p>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="group bg-card/80 backdrop-blur-sm p-2.5 rounded-full border border-white/10 shadow-lg hover:border-gold/30 transition-all duration-300"
        >
          <ArrowDown className="h-4 w-4 text-gold group-hover:text-gold-light transition-colors duration-300" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
