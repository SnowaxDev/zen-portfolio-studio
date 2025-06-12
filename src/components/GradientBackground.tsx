
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
  
  const backgroundY1 = useTransform(
    scrollYProgress, 
    [0, 1], 
    [0, shouldReduceAnimations ? 0 : (isMobile ? -30 : -60)]
  );
  const backgroundY2 = useTransform(
    scrollYProgress, 
    [0, 1], 
    [0, shouldReduceAnimations ? 0 : (isMobile ? -15 : -30)]
  );
  const opacity1 = useTransform(scrollYProgress, [0, 0.4, 1], [0.7, 0.5, 0.3]);
  const opacity2 = useTransform(scrollYProgress, [0, 0.6, 1], [0.5, 0.3, 0.2]);
  
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
      {/* Clean base background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/99 to-background/97" />
      
      {/* Refined texture */}
      <div 
        className="absolute inset-0 opacity-[0.02] mix-blend-soft-light"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px'
        }} 
      />
      
      {/* Subtle interactive gradient */}
      {!shouldReduceAnimations && !isMobile && (
        <motion.div 
          className="absolute inset-0 opacity-15"
          style={{
            background: `radial-gradient(circle 600px at ${50 + mousePosition.x * 15}% ${50 + mousePosition.y * 15}%, rgba(212, 175, 55, 0.12) 0%, rgba(139, 92, 246, 0.06) 50%, transparent 100%)`,
          }}
          transition={{ type: "spring", stiffness: 60, damping: 40 }}
        />
      )}
      
      {/* Main gradient layers - cleaner and more subtle */}
      <motion.div 
        className="absolute -top-1/4 -right-1/4 w-[100vw] h-[100vh] will-change-transform"
        style={{ 
          y: backgroundY1,
          opacity: opacity1,
          background: 'radial-gradient(ellipse 70% 40% at 65% 25%, rgba(139, 92, 246, 0.08) 0%, transparent 65%)',
          filter: 'blur(60px)',
        }}
        animate={shouldReduceAnimations ? {} : { 
          rotate: [0, 0.5, 0],
          scale: [1, 1.01, 1],
        }}
        transition={{ 
          duration: getAnimationDuration(25),
          repeat: Infinity,
          ease: premiumEasing
        }}
      />
      
      <motion.div 
        className="absolute -bottom-1/4 -left-1/4 w-[100vw] h-[100vh] will-change-transform"
        style={{ 
          y: backgroundY2,
          opacity: opacity2,
          background: 'radial-gradient(ellipse 60% 50% at 35% 75%, rgba(212, 175, 55, 0.06) 0%, transparent 65%)',
          filter: 'blur(60px)',
        }}
        animate={shouldReduceAnimations ? {} : { 
          rotate: [0, -0.5, 0],
          scale: [1, 1.02, 1],
        }}
        transition={{ 
          duration: getAnimationDuration(30),
          repeat: Infinity,
          ease: premiumEasing,
          delay: 3
        }}
      />
      
      {/* Minimal accent gradients */}
      {!shouldReduceAnimations && !isMobile && (
        <>
          <motion.div 
            className="absolute top-1/4 left-1/4 w-[300px] h-[300px] will-change-transform"
            style={{
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.04) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
            animate={{ 
              x: [0, 15, 0],
              y: [0, -10, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{ 
              duration: getAnimationDuration(20),
              repeat: Infinity,
              ease: premiumEasing
            }}
          />
          
          <motion.div 
            className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] will-change-transform"
            style={{
              background: 'radial-gradient(circle, rgba(212, 175, 55, 0.03) 0%, transparent 70%)',
              filter: 'blur(35px)',
            }}
            animate={{ 
              x: [0, -10, 0],
              y: [0, 8, 0],
              scale: [1, 1.04, 1],
            }}
            transition={{ 
              duration: getAnimationDuration(22),
              repeat: Infinity,
              ease: premiumEasing,
              delay: 2
            }}
          />
        </>
      )}
      
      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/10" />
      
      {/* Clean depth overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/3 via-transparent to-background/3" />
    </div>
  );
};

export default GradientBackground;
