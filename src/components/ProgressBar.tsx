
import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { usePrefersReducedMotion } from '../hooks/use-reduced-motion';
import { cn } from '@/lib/utils';
import { Progress } from './ui/progress';
import { useMobileAnimationSettings } from '@/hooks/use-mobile-animation-settings';

interface ProgressBarProps {
  skill: string;
  percentage: number;
  delay?: number;
  isHovered?: boolean;
  className?: string;
  color?: 'gold' | 'purple' | 'blue'; 
  bgColor?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  skill, 
  percentage, 
  delay = 0, 
  isHovered = false,
  className = '',
  color = 'gold',
  bgColor
}) => {
  const progressValue = useMotionValue(0);
  const progressDisplay = useTransform(progressValue, Math.round);
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { getAnimationDuration, getAnimationDelay } = useMobileAnimationSettings();
  
  // Define gradient colors based on selected color
  const gradientColors = {
    gold: 'linear-gradient(to right, rgb(171, 148, 54) 0%, rgb(212, 175, 55) 100%)',
    purple: 'linear-gradient(to right, rgb(88, 28, 135) 0%, rgb(139, 92, 246) 100%)',
    blue: 'linear-gradient(to right, rgb(29, 78, 216) 0%, rgb(59, 130, 246) 100%)'
  };

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
            duration: getAnimationDuration(1.2),
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
  }, [percentage, progressValue, prefersReducedMotion, getAnimationDuration]);
  
  // Simplified version for reduced motion
  if (prefersReducedMotion) {
    return (
      <div className={`relative w-full ${className}`} ref={ref}>
        <div className="flex justify-between mb-2 items-center">
          <span className="text-sm font-medium text-white/90">{skill}</span>
          <div className="flex items-center">
            <span className="text-sm font-mono bg-black/60 px-2 py-0.5 rounded-md border border-white/10">
              {percentage}%
            </span>
          </div>
        </div>
        <Progress
          value={percentage}
          indicatorColor={gradientColors[color]}
        />
      </div>
    );
  }
  
  return (
    <motion.div 
      className={cn(
        "relative w-full transition-all duration-300", 
        isHovered ? 'scale-[1.01]' : '',
        className
      )} 
      ref={ref}
      initial={{ opacity: 0.5, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: getAnimationDelay(delay), 
        duration: getAnimationDuration(0.5) 
      }}
    >
      <div className="flex justify-between mb-2 items-center">
        <motion.span 
          className="text-sm font-medium"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: getAnimationDelay(delay), duration: getAnimationDuration(0.3) }}
        >
          {skill}
        </motion.span>
        <motion.div 
          className="flex items-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: getAnimationDuration(0.4), delay: getAnimationDelay(delay) + 0.2 }}
        >
          <motion.span 
            className={cn(
              "text-sm font-mono bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-sm border",
              color === 'gold' ? "border-gold/10" : 
              color === 'purple' ? "border-purple/10" : "border-blue/10"
            )}
            whileHover={{ y: -1 }}
          >
            <motion.span>{progressDisplay}</motion.span>%
          </motion.span>
        </motion.div>
      </div>
      
      <Progress
        value={percentage}
        className="h-2.5 overflow-hidden"
        indicatorColor={gradientColors[color]}
      />
      
      {/* Animated highlight when hovered */}
      {isHovered && (
        <motion.div 
          className="absolute -inset-1 rounded-lg z-[-1] opacity-20"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0.05, 0.15, 0.05],
            transition: { duration: 1.5, repeat: Infinity }
          }}
          style={{ background: gradientColors[color] }}
        />
      )}
    </motion.div>
  );
};

export default ProgressBar;
