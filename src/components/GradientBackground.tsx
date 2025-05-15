
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const GradientBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    container: containerRef
  });
  
  // Transform values for parallax effect
  const backgroundY1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const backgroundY2 = useTransform(scrollYProgress, [0, 1], [0, -75]);
  const backgroundX1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const backgroundX2 = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.3, 1], [0.9, 0.7, 0.5]);
  const opacity2 = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 0.5, 0.3]);
  const gridOpacity = useTransform(scrollYProgress, [0, 0.5], [0.08, 0.04]);
  
  return (
    <div ref={containerRef} className="fixed inset-0 -z-10 overflow-hidden">
      {/* Main background */}
      <div className="absolute inset-0 bg-background/95 backdrop-blur-xl" />
      
      {/* Animated gradients */}
      <motion.div 
        className="absolute top-0 right-0 w-[800px] h-[800px] opacity-20 bg-purple blur-[150px] -z-10" 
        style={{ y: backgroundY1, x: backgroundX1, opacity: opacity1 }}
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
        style={{ y: backgroundY2, x: backgroundX2, opacity: opacity2 }}
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
      
      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/5 to-gold/5 opacity-30" />
    </div>
  );
};

export default GradientBackground;
