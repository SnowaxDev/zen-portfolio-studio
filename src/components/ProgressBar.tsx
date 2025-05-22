
import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { usePrefersReducedMotion } from '../hooks/use-reduced-motion';
import { cn } from '@/lib/utils';
import { Progress } from './ui/progress';

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
          animate(progressValue, percentage, {
            duration: 1.2,
            ease: "easeOut",
            onUpdate: (latest) => progressValue.set(latest)
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
  
  // Custom progress bar styles
  const progressStyles = {
    primary: "bg-gold",
    secondary: "bg-purple",
    accent: "bg-accent"
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
        <Progress
          value={percentage}
          className="h-2 bg-black/50 border border-white/5"
          indicatorClassName={progressStyles[color]}
        />
      </div>
    );
  }
  
  return (
    <div 
      className={cn("relative w-full transition-all duration-300", 
        isHovered ? 'scale-[1.02]' : '',
        className
      )} 
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
      
      <Progress
        value={percentage}
        className="h-2.5 bg-black/50 border border-white/5 overflow-hidden"
        indicatorClassName={cn(
          progressStyles[color], 
          "transition-all duration-500"
        )}
      />
    </div>
  );
};

export default ProgressBar;
