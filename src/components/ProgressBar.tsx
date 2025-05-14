
import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

interface ProgressBarProps {
  skill: string;
  percentage: number;
  delay?: number;
  isHovered?: boolean; // Add the isHovered property as optional
  className?: string;  // Add className as optional for styling
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  skill, 
  percentage, 
  delay = 0, 
  isHovered = false,
  className = ''
}) => {
  const progressValue = useMotionValue(0);
  const progressDisplay = useTransform(progressValue, Math.round);
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate(progressValue, percentage, {
            duration: 1.5,
            ease: "easeOut"
          });
        }
      },
      { threshold: 0.2 }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [percentage, progressValue]);
  
  return (
    <div className={`group ${isHovered ? 'scale-[1.02] transition-transform' : ''}`} ref={ref}>
      <div className="flex justify-between mb-2 items-center">
        <span className="text-sm md:text-base font-medium">{skill}</span>
        <motion.span className="text-sm text-foreground/80 font-mono">
          <motion.span>{progressDisplay}</motion.span>%
        </motion.span>
      </div>
      <div className="h-2 rounded-full bg-secondary/50 overflow-hidden backdrop-blur-sm relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <motion.div 
          className={`h-full rounded-full relative ${className || 'bg-gradient-to-r from-primary/80 to-primary'}`}
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ 
            duration: 1.2, 
            ease: [0.34, 1.56, 0.64, 1],
            delay: delay
          }}
        >
          <div className="absolute top-0 right-0 h-full w-1 bg-white/30 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProgressBar;
