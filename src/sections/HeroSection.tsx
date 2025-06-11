
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import AnimatedText from '../components/AnimatedText';
import ParticleBackground from '../components/ParticleBackground';
import TextWithSparkles from '../components/TextWithSparkles';
import { useIsMobile } from '../hooks/use-mobile';
import { sectionMeta } from '../lib/section-data';
import { ArrowDown } from 'lucide-react';
import TextWithGlow from '../components/TextWithGlow';
import { useMobileAnimationSettings } from '../hooks/use-mobile-animation-settings';

const HeroSection: React.FC = () => {
  // ALL HOOKS MUST BE CALLED FIRST
  const isMobile = useIsMobile();
  const { hero } = sectionMeta;
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const { 
    shouldReduceAnimations,
    getAnimationDuration,
    getAnimationDelay,
    getSpringConfig,
    premiumEasing,
    smoothEasing
  } = useMobileAnimationSettings();
  
  // Scroll-based animations with optimization
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(
    scrollYProgress, 
    [0, 1], 
    [0, shouldReduceAnimations ? 0 : (isMobile ? -75 : -150)]
  );
  const profileScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const profileOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0.9]);
  
  // Optimized mouse tracking
  useEffect(() => {
    if (shouldReduceAnimations || isMobile) return;
    
    let rafId: number;
    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) cancelAnimationFrame(rafId);
      
      rafId = requestAnimationFrame(() => {
        setMousePosition({
          x: (e.clientX / window.innerWidth) - 0.5,
          y: (e.clientY / window.innerHeight) - 0.5
        });
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [shouldReduceAnimations, isMobile]);
  
  // Premium animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: getAnimationDuration(0.8),
        ease: premiumEasing,
        staggerChildren: getAnimationDelay(0.15),
        delayChildren: getAnimationDelay(0.2)
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: isMobile ? 15 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: getAnimationDuration(0.6),
        ease: smoothEasing
      }
    }
  };

  const buttonVariants = {
    initial: { opacity: 0, y: 20 },
    animate: (custom: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: getAnimationDuration(0.5), 
        delay: getAnimationDelay(0.7 + (custom * 0.1)),
        ease: premiumEasing
      } 
    }),
    hover: { 
      scale: 1.03,
      y: -2,
      transition: getSpringConfig('gentle')
    },
    tap: { scale: 0.98 }
  };

  const imageVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        duration: getAnimationDuration(0.8),
        ease: premiumEasing,
        delay: getAnimationDelay(0.3)
      } 
    }
  };

  // NOW we can do conditional rendering
  const isLoading = isMobile === undefined;
  
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden">
      {isLoading ? (
        <div className="flex items-center justify-center">
          <motion.div 
            className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>
      ) : (
        <motion.div 
          className="w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Enhanced particle background */}
          <ParticleBackground />
          
          {/* Premium floating elements */}
          <motion.div
            className="absolute top-[15%] left-[10%] w-72 h-72 rounded-full bg-purple/8 blur-3xl"
            style={{ y: backgroundY }}
            animate={shouldReduceAnimations ? {} : {
              scale: [1, 1.08, 1],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: getAnimationDuration(18),
              repeat: Infinity,
              ease: premiumEasing
            }}
          />
          
          <motion.div
            className="absolute bottom-[20%] right-[5%] w-96 h-96 rounded-full bg-gold/6 blur-3xl"
            style={{ y: backgroundY }}
            animate={shouldReduceAnimations ? {} : {
              scale: [1, 1.12, 1],
              rotate: [0, -3, 0],
            }}
            transition={{
              duration: getAnimationDuration(22),
              repeat: Infinity,
              ease: premiumEasing,
              delay: 1
            }}
          />
          
          <div className="container mx-auto px-4 lg:px-32 flex flex-col md:flex-row items-center justify-between relative z-10">
            {/* Content section */}
            <motion.div 
              className="w-full md:w-7/12 lg:w-3/5 mb-8 md:mb-0 text-center md:text-left"
              variants={itemVariants}
            >
              {/* Subtitle with premium animation */}
              <motion.div
                className="mb-6 md:mb-4 relative flex justify-center md:justify-start"
                variants={itemVariants}
                style={!shouldReduceAnimations && !isMobile ? {
                  x: mousePosition.x * -8,
                  y: mousePosition.y * -5,
                } : {}}
              >
                <motion.span 
                  className="inline-block px-4 py-2 text-sm font-medium bg-gradient-to-r from-gold/10 to-purple/10 text-gold rounded-full border border-gold/20 backdrop-blur-sm"
                  whileHover={{ 
                    scale: 1.05, 
                    borderColor: "rgba(212, 175, 55, 0.4)",
                    boxShadow: "0 0 20px rgba(212, 175, 55, 0.2)"
                  }}
                  transition={getSpringConfig('gentle')}
                >
                  {hero.subtitle}
                </motion.span>
              </motion.div>
              
              {/* Enhanced heading */}
              <motion.div
                variants={itemVariants}
                style={!shouldReduceAnimations && !isMobile ? {
                  x: mousePosition.x * -15,
                  y: mousePosition.y * -10,
                } : {}}
              >
                <h1 className={`font-bold mb-6 ${isMobile ? 'text-[28px] leading-tight px-2' : 'text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-2'}`}>
                  {!isMobile && (
                    <AnimatedText 
                      text="Dušan Kostić"
                      className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-2"
                      animation="wave"
                    />
                  )}
                  <div className={`font-semibold ${isMobile ? 'text-xl mt-2' : 'text-2xl md:text-3xl lg:text-4xl'}`}>
                    <TextWithGlow 
                      intensity="medium" 
                      pulsate={!shouldReduceAnimations}
                      gradient={true}
                      gradientColors="from-gold via-gold-light to-purple-light"
                    >
                      Dusanko.dev
                    </TextWithGlow>
                  </div>
                </h1>
              </motion.div>
              
              {/* Enhanced description */}
              <motion.p 
                className="text-foreground/80 mb-8 max-w-lg md:max-w-xl text-lg px-4 md:px-0 mx-auto md:mx-0 relative leading-relaxed"
                variants={itemVariants}
                style={!shouldReduceAnimations && !isMobile ? {
                  x: mousePosition.x * -5,
                  y: mousePosition.y * -3,
                } : {}}
              >
                {hero.description}
              </motion.p>
              
              {/* Premium buttons */}
              <motion.div 
                className={`flex ${isMobile ? 'flex-col space-y-4' : 'flex-row space-x-6'} justify-center md:justify-start relative pb-12`}
                variants={itemVariants}
                style={!shouldReduceAnimations && !isMobile ? {
                  x: mousePosition.x * -3,
                  y: mousePosition.y * -2,
                } : {}}
              >
                <motion.a 
                  href="#projects" 
                  className={`group relative overflow-hidden bg-gradient-to-r from-gold via-gold-light to-gold text-background ${isMobile ? 'w-full py-4 px-8' : 'px-10 py-4'} rounded-xl font-semibold shadow-lg shadow-gold/25 backdrop-blur-sm`}
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
                      animate={shouldReduceAnimations ? {} : { x: [0, 4, 0] }}
                      transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
                    >
                      →
                    </motion.span>
                  </span>
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-gold-light to-gold opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
                
                <motion.a 
                  href="#contact" 
                  className={`group relative border-2 border-gold/60 text-gold hover:text-background ${isMobile ? 'w-full py-4 px-8' : 'px-10 py-4'} rounded-xl font-semibold overflow-hidden backdrop-blur-sm hover:border-gold transition-colors duration-300`}
                  variants={buttonVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  whileTap="tap"
                  custom={1}
                >
                  <span className="relative z-10">Kontaktujte Mě</span>
                  <motion.span 
                    className="absolute inset-0 bg-gradient-to-r from-gold to-gold-light"
                    initial={{ y: '100%' }}
                    whileHover={{ y: 0 }}
                    transition={{ duration: 0.4, ease: premiumEasing }}
                  />
                </motion.a>
              </motion.div>
            </motion.div>
            
            {/* Enhanced profile image */}
            <motion.div 
              className="w-full md:w-5/12 lg:w-2/5 relative"
              variants={imageVariants}
              style={{ 
                scale: profileScale, 
                opacity: profileOpacity,
                ...((!shouldReduceAnimations && !isMobile) ? {
                  x: mousePosition.x * 15,
                  y: mousePosition.y * 15,
                } : {}),
                marginBottom: isMobile ? '24px' : '0',
                marginTop: isMobile ? '0' : '-30px'
              }}
            >
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 mx-auto">
                {/* Premium glow effect */}
                <motion.div 
                  className="absolute -inset-8 rounded-full bg-gradient-to-tr from-gold/20 via-purple/15 to-gold-light/20 opacity-80 blur-3xl"
                  animate={shouldReduceAnimations ? {} : { 
                    scale: [1, 1.1, 1],
                    rotate: [0, 10, 0],
                  }}
                  transition={{ 
                    duration: getAnimationDuration(12),
                    repeat: Infinity,
                    ease: premiumEasing
                  }}
                  style={!shouldReduceAnimations && !isMobile ? {
                    x: mousePosition.x * 20,
                    y: mousePosition.y * 20
                  } : {}}
                />
                
                {/* Animated rings */}
                <motion.div
                  className="absolute inset-0 rounded-full border border-dashed border-gold/30"
                  animate={shouldReduceAnimations ? {} : { rotate: 360 }}
                  transition={{ duration: getAnimationDuration(60), repeat: Infinity, ease: "linear" }}
                />
                
                <motion.div
                  className="absolute -inset-4 rounded-full border border-purple/15"
                  animate={shouldReduceAnimations ? {} : { 
                    scale: [1, 1.03, 1],
                    rotate: [0, -20, 0],
                  }}
                  transition={{ duration: getAnimationDuration(20), repeat: Infinity, ease: premiumEasing }}
                />
                
                {/* Floating elements for desktop */}
                {!isMobile && !shouldReduceAnimations && (
                  <>
                    <motion.div
                      className="absolute -right-6 -top-6 w-12 h-12 rounded-full bg-purple/15 backdrop-blur-md border border-purple/30"
                      animate={{ 
                        y: [0, -8, 0],
                        x: [0, 4, 0],
                        scale: [1, 1.1, 1], 
                      }}
                      transition={{ 
                        duration: getAnimationDuration(6), 
                        repeat: Infinity,
                        ease: premiumEasing
                      }}
                    />
                    
                    <motion.div
                      className="absolute -left-8 top-1/2 w-16 h-16 rounded-full bg-gold/10 backdrop-blur-md border border-gold/25"
                      animate={{ 
                        y: [0, 8, 0],
                        x: [0, -4, 0],
                        scale: [1, 0.95, 1], 
                      }}
                      transition={{ 
                        duration: getAnimationDuration(8), 
                        repeat: Infinity,
                        ease: premiumEasing,
                        delay: 0.5
                      }}
                    />
                  </>
                )}
                
                <motion.div
                  className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-purple-light/15 backdrop-blur-sm"
                  animate={shouldReduceAnimations ? {} : { 
                    y: [0, 6, 0],
                    x: [0, 6, 0],
                  }}
                  transition={{ 
                    duration: getAnimationDuration(5), 
                    repeat: Infinity,
                    ease: premiumEasing,
                    delay: 1
                  }}
                />
                
                {/* Premium profile image */}
                <motion.div 
                  className="relative w-full h-full rounded-full overflow-hidden border-4 border-background z-10 shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                  transition={getSpringConfig('gentle')}
                  style={{
                    boxShadow: "0 0 40px rgba(212, 175, 55, 0.15), 0 0 80px rgba(139, 92, 246, 0.1)"
                  }}
                >
                  <img 
                    src="/lovable-uploads/4675bcc5-3096-4a4e-a9ab-c69be970616b.png"
                    alt="Dušan Kostić" 
                    className="w-full h-full object-cover"
                  />
                  
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-background/60 via-background/10 to-transparent opacity-0 hover:opacity-100"
                    transition={{ duration: 0.4 }}
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
          
          {/* Premium scroll indicator */}
          <motion.div 
            className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: getAnimationDelay(1.2), duration: getAnimationDuration(0.6), ease: premiumEasing }}
            whileHover={{ scale: 1.1 }}
            style={!shouldReduceAnimations && !isMobile ? {
              x: mousePosition.x * -3,
              y: mousePosition.y * -2,
            } : {}}
          >
            <motion.p
              className="text-sm text-foreground/60 mb-3 font-medium"
              animate={shouldReduceAnimations ? {} : { y: [0, 3, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <TextWithGlow intensity="subtle" pulsate={!shouldReduceAnimations}>
                Scroll
              </TextWithGlow>
            </motion.p>
            <motion.div
              animate={shouldReduceAnimations ? {} : { y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="group bg-card/90 backdrop-blur-md p-3 rounded-full border border-gold/20 shadow-lg hover:border-gold/40 hover:shadow-xl transition-all duration-300"
            >
              <ArrowDown className="h-4 w-4 text-gold group-hover:text-gold-light transition-colors duration-300" />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default HeroSection;
