
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
  
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(
    scrollYProgress, 
    [0, 1], 
    [0, shouldReduceAnimations ? 0 : (isMobile ? -75 : -150)]
  );
  const profileScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const profileOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0.9]);
  
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
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: getAnimationDuration(1.2),
        ease: premiumEasing,
        staggerChildren: getAnimationDelay(0.2),
        delayChildren: getAnimationDelay(0.3)
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: isMobile ? 20 : 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: getAnimationDuration(0.8),
        ease: smoothEasing
      }
    }
  };

  const buttonVariants = {
    initial: { opacity: 0, y: 30 },
    animate: (custom: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: getAnimationDuration(0.7), 
        delay: getAnimationDelay(0.8 + (custom * 0.15)),
        ease: premiumEasing
      } 
    }),
    hover: { 
      scale: 1.02,
      y: -1,
      transition: getSpringConfig('gentle')
    },
    tap: { scale: 0.98 }
  };

  const imageVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        duration: getAnimationDuration(1.0),
        ease: premiumEasing,
        delay: getAnimationDelay(0.4)
      } 
    }
  };

  const isLoading = isMobile === undefined;
  
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
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
          <ParticleBackground />
          
          {/* Refined background elements */}
          <motion.div
            className="absolute top-[20%] left-[8%] w-80 h-80 rounded-full bg-purple/6 blur-3xl"
            style={{ y: backgroundY }}
            animate={shouldReduceAnimations ? {} : {
              scale: [1, 1.05, 1],
              opacity: [0.6, 0.8, 0.6],
            }}
            transition={{
              duration: getAnimationDuration(20),
              repeat: Infinity,
              ease: premiumEasing
            }}
          />
          
          <motion.div
            className="absolute bottom-[15%] right-[5%] w-96 h-96 rounded-full bg-gold/4 blur-3xl"
            style={{ y: backgroundY }}
            animate={shouldReduceAnimations ? {} : {
              scale: [1, 1.08, 1],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: getAnimationDuration(25),
              repeat: Infinity,
              ease: premiumEasing,
              delay: 2
            }}
          />
          
          <div className="container mx-auto px-6 lg:px-8 max-w-7xl flex flex-col md:flex-row items-center justify-between relative z-10 gap-12 md:gap-16">
            {/* Enhanced content section */}
            <motion.div 
              className="w-full md:w-7/12 lg:w-3/5 text-center md:text-left"
              variants={itemVariants}
            >
              {/* Premium subtitle badge */}
              <motion.div
                className="mb-8 relative flex justify-center md:justify-start"
                variants={itemVariants}
                style={!shouldReduceAnimations && !isMobile ? {
                  x: mousePosition.x * -6,
                  y: mousePosition.y * -4,
                } : {}}
              >
                <motion.span 
                  className="inline-flex items-center px-4 py-2.5 text-sm font-medium bg-gradient-to-r from-gold/8 to-purple/8 text-gold rounded-full border border-gold/20 backdrop-blur-md shadow-lg"
                  whileHover={{ 
                    scale: 1.05, 
                    borderColor: "rgba(212, 175, 55, 0.4)",
                    boxShadow: "0 8px 32px rgba(212, 175, 55, 0.15)"
                  }}
                  transition={getSpringConfig('gentle')}
                >
                  <span className="w-2 h-2 bg-gold rounded-full mr-2 animate-pulse"></span>
                  {hero.subtitle}
                </motion.span>
              </motion.div>
              
              {/* Cleaner typography hierarchy */}
              <motion.div
                variants={itemVariants}
                style={!shouldReduceAnimations && !isMobile ? {
                  x: mousePosition.x * -10,
                  y: mousePosition.y * -8,
                } : {}}
              >
                <h1 className={`font-bold mb-6 ${isMobile ? 'text-[32px] leading-[1.1]' : 'text-5xl md:text-6xl lg:text-7xl xl:text-8xl'} tracking-tight`}>
                  <span className="block mb-2">
                    <TextWithGlow 
                      intensity="medium" 
                      pulsate={false}
                      className="text-foreground"
                    >
                      Dušan Kostić
                    </TextWithGlow>
                  </span>
                  <div className={`font-medium ${isMobile ? 'text-2xl' : 'text-3xl md:text-4xl lg:text-5xl'} tracking-wide`}>
                    <TextWithGlow 
                      intensity="medium" 
                      pulsate={!shouldReduceAnimations}
                      gradient={true}
                      gradientColors="from-gold via-gold-light to-purple-light"
                      shimmer={!shouldReduceAnimations}
                    >
                      Dusanko.dev
                    </TextWithGlow>
                  </div>
                </h1>
              </motion.div>
              
              {/* Refined description */}
              <motion.p 
                className="text-foreground/70 mb-10 max-w-2xl text-lg md:text-xl leading-relaxed font-light tracking-wide mx-auto md:mx-0"
                variants={itemVariants}
                style={!shouldReduceAnimations && !isMobile ? {
                  x: mousePosition.x * -4,
                  y: mousePosition.y * -3,
                } : {}}
              >
                {hero.description}
              </motion.p>
              
              {/* Premium CTA buttons */}
              <motion.div 
                className={`flex ${isMobile ? 'flex-col space-y-4' : 'flex-row space-x-6'} justify-center md:justify-start`}
                variants={itemVariants}
                style={!shouldReduceAnimations && !isMobile ? {
                  x: mousePosition.x * -2,
                  y: mousePosition.y * -1,
                } : {}}
              >
                <motion.a 
                  href="#projects" 
                  className={`group relative overflow-hidden bg-gradient-to-r from-gold to-gold-light text-background ${isMobile ? 'w-full py-4 px-8' : 'px-8 py-4'} rounded-2xl font-semibold shadow-xl shadow-gold/20 backdrop-blur-sm border border-gold/30`}
                  variants={buttonVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  whileTap="tap"
                  custom={0}
                >
                  <span className="relative z-10 flex items-center justify-center gap-3 text-lg">
                    Moje Projekty
                    <motion.span
                      animate={shouldReduceAnimations ? {} : { x: [0, 6, 0] }}
                      transition={{ repeat: Infinity, duration: 2.5, repeatType: "reverse" }}
                      className="text-xl"
                    >
                      →
                    </motion.span>
                  </span>
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-gold-light to-gold opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.4 }}
                  />
                </motion.a>
                
                <motion.a 
                  href="#contact" 
                  className={`group relative border-2 border-gold/40 text-gold hover:text-background ${isMobile ? 'w-full py-4 px-8' : 'px-8 py-4'} rounded-2xl font-semibold overflow-hidden backdrop-blur-sm hover:border-gold transition-all duration-500`}
                  variants={buttonVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  whileTap="tap"
                  custom={1}
                >
                  <span className="relative z-10 text-lg">Kontaktujte Mě</span>
                  <motion.span 
                    className="absolute inset-0 bg-gradient-to-r from-gold to-gold-light"
                    initial={{ y: '100%' }}
                    whileHover={{ y: 0 }}
                    transition={{ duration: 0.5, ease: premiumEasing }}
                  />
                </motion.a>
              </motion.div>
            </motion.div>
            
            {/* Refined profile image section */}
            <motion.div 
              className="w-full md:w-5/12 lg:w-2/5 relative"
              variants={imageVariants}
              style={{ 
                scale: profileScale, 
                opacity: profileOpacity,
                ...((!shouldReduceAnimations && !isMobile) ? {
                  x: mousePosition.x * 12,
                  y: mousePosition.y * 10,
                } : {}),
              }}
            >
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 mx-auto">
                {/* Subtle glow effect */}
                <motion.div 
                  className="absolute -inset-6 rounded-full bg-gradient-to-tr from-gold/15 via-purple/10 to-gold-light/15 opacity-60 blur-2xl"
                  animate={shouldReduceAnimations ? {} : { 
                    scale: [1, 1.05, 1],
                    opacity: [0.6, 0.8, 0.6],
                  }}
                  transition={{ 
                    duration: getAnimationDuration(15),
                    repeat: Infinity,
                    ease: premiumEasing
                  }}
                />
                
                {/* Minimal floating elements */}
                {!shouldReduceAnimations && (
                  <>
                    <motion.div
                      className="absolute -right-4 -top-4 w-8 h-8 rounded-full bg-purple/20 backdrop-blur-sm border border-purple/30"
                      animate={{ 
                        y: [0, -6, 0],
                        scale: [1, 1.1, 1], 
                      }}
                      transition={{ 
                        duration: getAnimationDuration(8), 
                        repeat: Infinity,
                        ease: premiumEasing
                      }}
                    />
                    
                    <motion.div
                      className="absolute -left-6 top-1/2 w-6 h-6 rounded-full bg-gold/20 backdrop-blur-sm border border-gold/30"
                      animate={{ 
                        y: [0, 6, 0],
                        scale: [1, 0.9, 1], 
                      }}
                      transition={{ 
                        duration: getAnimationDuration(10), 
                        repeat: Infinity,
                        ease: premiumEasing,
                        delay: 0.5
                      }}
                    />
                  </>
                )}
                
                {/* Clean profile image */}
                <motion.div 
                  className="relative w-full h-full rounded-full overflow-hidden border-4 border-background/50 backdrop-blur-sm z-10 shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                  transition={getSpringConfig('gentle')}
                  style={{
                    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3), 0 0 40px rgba(212, 175, 55, 0.1)"
                  }}
                >
                  <img 
                    src="/lovable-uploads/4675bcc5-3096-4a4e-a9ab-c69be970616b.png"
                    alt="Dušan Kostić" 
                    className="w-full h-full object-cover"
                  />
                  
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent opacity-0 hover:opacity-100"
                    transition={{ duration: 0.5 }}
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
          
          {/* Minimal scroll indicator */}
          <motion.div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: getAnimationDelay(1.5), duration: getAnimationDuration(0.8), ease: premiumEasing }}
            whileHover={{ scale: 1.1 }}
          >
            <motion.p
              className="text-sm text-foreground/50 mb-3 font-light tracking-wider"
              animate={shouldReduceAnimations ? {} : { y: [0, 2, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              Scroll
            </motion.p>
            <motion.div
              animate={shouldReduceAnimations ? {} : { y: [0, 6, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="group bg-card/60 backdrop-blur-md p-3 rounded-full border border-gold/15 shadow-lg hover:border-gold/30 hover:shadow-xl transition-all duration-500"
            >
              <ArrowDown className="h-4 w-4 text-gold/70 group-hover:text-gold transition-colors duration-300" />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default HeroSection;
