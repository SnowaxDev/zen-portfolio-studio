
import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useMobileAnimationSettings } from '../hooks/use-mobile-animation-settings';

const GradientBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { 
    shouldReduceAnimations, 
    isMobile,
    getAnimationDuration,
    premiumEasing
  } = useMobileAnimationSettings();
  
  const { scrollYProgress } = useScroll({
    target: containerRef
  });
  
  // Optimized transform values with better performance
  const backgroundY1 = useTransform(
    scrollYProgress, 
    [0, 1], 
    [0, shouldReduceAnimations ? 0 : (isMobile ? -50 : -100)]
  );
  const backgroundY2 = useTransform(
    scrollYProgress, 
    [0, 1], 
    [0, shouldReduceAnimations ? 0 : (isMobile ? -25 : -50)]
  );
  const opacity1 = useTransform(scrollYProgress, [0, 0.3, 1], [0.8, 0.6, 0.4]);
  const opacity2 = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 0.4, 0.2]);
  
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
  
  return (
    <div ref={containerRef} className="fixed inset-0 -z-10 overflow-hidden">
      {/* Premium base background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/98 to-background/95" />
      
      {/* Subtle texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '400px 400px'
        }} 
      />
      
      {/* Interactive gradient following mouse */}
      {!shouldReduceAnimations && !isMobile && (
        <motion.div 
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(circle 800px at ${50 + mousePosition.x * 20}% ${50 + mousePosition.y * 20}%, rgba(212, 175, 55, 0.15) 0%, rgba(139, 92, 246, 0.08) 50%, transparent 100%)`,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 30 }}
        />
      )}
      
      {/* Premium animated gradients with GPU acceleration */}
      <motion.div 
        className="absolute -top-1/4 -right-1/4 w-[120vw] h-[120vh] will-change-transform"
        style={{ 
          y: backgroundY1,
          opacity: opacity1,
          background: 'radial-gradient(ellipse 80% 50% at 70% 30%, rgba(139, 92, 246, 0.12) 0%, transparent 60%)',
          filter: 'blur(80px)',
        }}
        animate={shouldReduceAnimations ? {} : { 
          rotate: [0, 1, 0],
          scale: [1, 1.02, 1],
        }}
        transition={{ 
          duration: getAnimationDuration(20),
          repeat: Infinity,
          ease: premiumEasing
        }}
      />
      
      <motion.div 
        className="absolute -bottom-1/4 -left-1/4 w-[120vw] h-[120vh] will-change-transform"
        style={{ 
          y: backgroundY2,
          opacity: opacity2,
          background: 'radial-gradient(ellipse 70% 60% at 30% 70%, rgba(212, 175, 55, 0.10) 0%, transparent 60%)',
          filter: 'blur(80px)',
        }}
        animate={shouldReduceAnimations ? {} : { 
          rotate: [0, -1, 0],
          scale: [1, 1.03, 1],
        }}
        transition={{ 
          duration: getAnimationDuration(25),
          repeat: Infinity,
          ease: premiumEasing,
          delay: 2
        }}
      />
      
      {/* Subtle accent gradients for desktop */}
      {!shouldReduceAnimations && !isMobile && (
        <>
          <motion.div 
            className="absolute top-1/3 left-1/3 w-[400px] h-[400px] will-change-transform"
            style={{
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.06) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
            animate={{ 
              x: [0, 20, 0],
              y: [0, -15, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ 
              duration: getAnimationDuration(15),
              repeat: Infinity,
              ease: premiumEasing
            }}
          />
          
          <motion.div 
            className="absolute bottom-1/3 right-1/3 w-[300px] h-[300px] will-change-transform"
            style={{
              background: 'radial-gradient(circle, rgba(212, 175, 55, 0.05) 0%, transparent 70%)',
              filter: 'blur(50px)',
            }}
            animate={{ 
              x: [0, -15, 0],
              y: [0, 10, 0],
              scale: [1, 1.08, 1],
            }}
            transition={{ 
              duration: getAnimationDuration(18),
              repeat: Infinity,
              ease: premiumEasing,
              delay: 1
            }}
          />
        </>
      )}
      
      {/* Premium vignette effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/20" />
      
      {/* Subtle overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/5 via-transparent to-background/5" />
    </div>
  );
};

export default GradientBackground;
