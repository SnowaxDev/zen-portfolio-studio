
import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { usePrefersReducedMotion } from '../hooks/use-reduced-motion';

interface ProgressBarProps {
  skill: string;
  percentage: number;
  delay?: number;
  isHovered?: boolean;
  className?: string;
  color?: 'primary' | 'secondary' | 'accent';
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
  const prefersReducedMotion = usePrefersReducedMotion();
  
  useEffect(() => {
    // Skip animation for reduced motion preference
    if (prefersReducedMotion) {
      progressValue.set(percentage);
      return;
    }
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Use a more optimized animation with lower CPU usage
          animate(progressValue, percentage, {
            duration: 1.2,
            ease: "easeOut",
            // Optimize for performance by reducing the number of updates
            driver: "motionValue"
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
  }, [percentage, progressValue, prefersReducedMotion]);

  // Colors based on the prop
  const barColors = {
    primary: "bg-gradient-to-r from-gold-dark to-gold",
    secondary: "bg-gradient-to-r from-purple-dark to-purple",
    accent: "bg-gradient-to-r from-accent to-accent-light"
  };
  
  // Simplified version for reduced motion
  if (prefersReducedMotion) {
    return (
      <div className={`relative w-full ${className}`} ref={ref}>
        <div className="flex justify-between mb-2 items-center">
          <span className="text-sm font-medium">{skill}</span>
          <div className="flex items-center">
            <span className="text-sm font-mono bg-black/40 px-2 py-0.5 rounded-md backdrop-blur-sm border border-gold/10">
              {percentage}%
            </span>
          </div>
        </div>
        <div className="h-2 rounded-full bg-black/50 overflow-hidden backdrop-blur-sm border border-white/5">
          <div 
            className={`h-full rounded-full ${barColors[color]}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  }
  
  return (
    <div 
      className={`relative w-full ${isHovered ? 'scale-[1.02] transition-transform' : ''} ${className}`} 
      ref={ref}
    >
      <div className="flex justify-between mb-2 items-center">
        <motion.span 
          className="text-sm font-medium"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: delay, duration: 0.3 }}
        >
          {skill}
        </motion.span>
        <motion.div 
          className="flex items-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: delay + 0.2 }}
        >
          <motion.span className="text-sm font-mono bg-black/40 px-2 py-0.5 rounded-md backdrop-blur-sm border border-gold/10">
            <motion.span>{progressDisplay}</motion.span>%
          </motion.span>
        </motion.div>
      </div>
      <div className="h-2 rounded-full bg-black/50 overflow-hidden backdrop-blur-sm border border-white/5">
        <motion.div 
          className={`h-full rounded-full ${barColors[color]}`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ 
            duration: 1, 
            ease: "easeOut",
            delay: delay + 0.1
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
