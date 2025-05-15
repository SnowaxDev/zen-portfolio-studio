
import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

interface ProgressBarProps {
  skill: string;
  percentage: number;
  delay?: number;
  isHovered?: boolean;
  className?: string;
  color?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  skill, 
  percentage, 
  delay = 0, 
  isHovered = false,
  className = '',
  color = 'primary'
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

  // Define gradient colors based on the color prop
  const gradientClass = color === 'primary' 
    ? 'from-blue-600 to-blue-400' 
    : color === 'secondary' 
      ? 'from-purple-600 to-purple-400' 
      : 'from-gold to-gold-light';
  
  return (
    <div className={`group ${isHovered ? 'scale-[1.02] transition-transform' : ''}`} ref={ref}>
      <div className="flex justify-between mb-2 items-center">
        <span className="text-sm md:text-base font-medium">{skill}</span>
        <motion.div className="flex items-center space-x-1">
          <motion.span className="text-sm font-mono bg-black/30 px-2 py-0.5 rounded-md backdrop-blur-sm">
            <motion.span>{progressDisplay}</motion.span>%
          </motion.span>
        </motion.div>
      </div>
      <div className="h-2.5 rounded-full bg-black/30 overflow-hidden backdrop-blur-sm relative">
        <motion.div 
          className={`h-full rounded-full relative bg-gradient-to-r ${gradientClass}`}
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ 
            duration: 1.2, 
            ease: [0.34, 1.56, 0.64, 1],
            delay
          }}
        >
          <motion.div 
            className="absolute top-0 right-0 h-full w-1 bg-white/50 opacity-0 group-hover:opacity-100 transition-opacity"
            animate={{
              width: isHovered ? '3px' : '1px',
              boxShadow: isHovered ? '0 0 8px rgba(255, 255, 255, 0.5)' : 'none'
            }}
            transition={{ duration: 0.2 }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ProgressBar;
