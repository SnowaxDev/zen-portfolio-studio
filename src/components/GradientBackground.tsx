
import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const GradientBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const { scrollYProgress } = useScroll({
    target: containerRef
  });
  
  // Transform values for parallax effect
  const backgroundY1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const backgroundY2 = useTransform(scrollYProgress, [0, 1], [0, -75]);
  const backgroundX1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const backgroundX2 = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.3, 1], [0.9, 0.7, 0.5]);
  const opacity2 = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 0.5, 0.3]);
  const gridOpacity = useTransform(scrollYProgress, [0, 0.5], [0.08, 0.04]);
  
  // Mouse movement effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return (
    <div ref={containerRef} className="fixed inset-0 -z-10 overflow-hidden">
      {/* Main background */}
      <div className="absolute inset-0 bg-background/95 backdrop-blur-xl" />
      
      {/* Main noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.15]"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px'
        }} 
      />
      
      {/* Interactive gradient that follows mouse */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${50 + mousePosition.x * 30}% ${50 + mousePosition.y * 30}%, rgba(212, 175, 55, 0.2) 0%, rgba(139, 92, 246, 0.1) 40%, transparent 70%)`,
          transition: 'background 0.1s ease-out'
        }}
      />
      
      {/* Animated gradients */}
      <motion.div 
        className="absolute top-0 right-0 w-[800px] h-[800px] opacity-20 bg-purple blur-[150px] -z-10" 
        style={{ 
          y: backgroundY1, 
          x: backgroundX1, 
          opacity: opacity1,
          filter: 'hue-rotate(-10deg)'
        }}
        animate={{ 
          scale: [1, 1.05, 1],
          rotate: [0, 2, 0],
        }}
        transition={{ 
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute bottom-0 left-0 w-[800px] h-[800px] opacity-20 bg-gold blur-[150px] -z-10" 
        style={{ 
          y: backgroundY2, 
          x: backgroundX2, 
          opacity: opacity2,
          filter: 'hue-rotate(10deg)'
        }}
        animate={{ 
          scale: [1, 1.08, 1],
          rotate: [0, -2, 0],
        }}
        transition={{ 
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute top-1/3 left-1/4 w-[300px] h-[300px] opacity-20 bg-purple-light blur-[100px] -z-10" 
        animate={{ 
          scale: [1, 1.3, 1],
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{ 
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Grid overlay with animation */}
      <motion.div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#D4AF3715_1px,transparent_1px),linear-gradient(to_bottom,#D4AF3715_1px,transparent_1px)] bg-[size:50px_50px]"
        style={{ opacity: gridOpacity }}
      />
      
      {/* Vignette effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_90%)] opacity-40" />
      
      {/* Moving dots */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${i % 3 === 0 ? 'bg-gold/40' : i % 3 === 1 ? 'bg-purple/40' : 'bg-white/30'}`}
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
            }}
            animate={{
              x: [
                Math.random() * 100 + "%",
                Math.random() * 100 + "%",
                Math.random() * 100 + "%",
              ],
              y: [
                Math.random() * 100 + "%",
                Math.random() * 100 + "%",
                Math.random() * 100 + "%",
              ],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, i % 4 === 0 ? 1.5 : 1, 1],
            }}
            transition={{
              duration: 10 + Math.random() * 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>
      
      {/* Subtle glow lines */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`line-${i}`}
            className="absolute h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent"
            style={{
              width: `${Math.random() * 30 + 20}%`,
              left: `${Math.random() * 70}%`,
              top: `${(i + 1) * 18}%`,
            }}
            animate={{
              opacity: [0.1, 0.5, 0.1],
              width: [`${Math.random() * 30 + 20}%`, `${Math.random() * 30 + 25}%`, `${Math.random() * 30 + 20}%`],
              left: [`${Math.random() * 70}%`, `${Math.random() * 65}%`, `${Math.random() * 70}%`],
            }}
            transition={{
              duration: 8 + i * 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
        
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`v-line-${i}`}
            className="absolute w-[1px] bg-gradient-to-b from-transparent via-purple to-transparent"
            style={{
              height: `${Math.random() * 30 + 20}%`,
              left: `${(i + 1) * 18}%`,
              top: `${Math.random() * 70}%`,
            }}
            animate={{
              opacity: [0.1, 0.4, 0.1],
              height: [`${Math.random() * 30 + 20}%`, `${Math.random() * 30 + 25}%`, `${Math.random() * 30 + 20}%`],
              top: [`${Math.random() * 70}%`, `${Math.random() * 65}%`, `${Math.random() * 70}%`],
            }}
            transition={{
              duration: 10 + i * 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      
      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/5 to-gold/5 opacity-30" />
    </div>
  );
};

export default GradientBackground;
