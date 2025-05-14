
import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const GradientBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: document.body,
    offset: ["start", "end"]
  });
  
  // Transformace hodnot pro parallax efekt
  const backgroundY1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const backgroundY2 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 0.7, 0.5]);
  
  return (
    <div ref={containerRef} className="fixed inset-0 -z-10 overflow-hidden">
      {/* Hlavní pozadí */}
      <div className="absolute inset-0 bg-background/95 backdrop-blur-3xl" />
      
      {/* Animované gradienty */}
      <motion.div 
        className="absolute top-0 right-0 w-[600px] h-[600px] opacity-20 bg-primary blur-[120px] -z-10" 
        style={{ y: backgroundY1 }}
      />
      <motion.div 
        className="absolute bottom-0 left-0 w-[600px] h-[600px] opacity-30 bg-accent blur-[120px] -z-10" 
        style={{ y: backgroundY2, opacity }}
      />
      
      {/* Grid overlay s animací */}
      <motion.div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:50px_50px]"
        style={{ opacity: useTransform(scrollYProgress, [0, 0.5], [0.08, 0.04]) }}
      />
      
      {/* Pohybující se tečky */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-accent/30"
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
            }}
            transition={{
              duration: 10 + Math.random() * 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default GradientBackground;
