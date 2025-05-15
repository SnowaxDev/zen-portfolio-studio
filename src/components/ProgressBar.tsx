
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
    ? 'from-gold-dark via-gold to-gold-light' 
    : color === 'secondary' 
      ? 'from-purple-dark via-purple to-purple-light' 
      : 'from-accent via-accent to-accent';
  
  return (
    <div className={`relative ${isHovered ? 'scale-[1.02] transition-transform' : ''}`} ref={ref}>
      <div className="flex justify-between mb-2 items-center">
        <motion.span 
          className="text-sm md:text-base font-medium relative inline-block"
          whileHover={{ x: 3 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {skill}
          <motion.span 
            className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-gold to-gold-light"
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
          />
        </motion.span>
        <motion.div 
          className="flex items-center space-x-1"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: delay + 0.8 }}
        >
          <motion.span className="text-sm font-mono bg-black/40 px-2 py-0.5 rounded-md backdrop-blur-sm border border-gold/10 shadow-lg">
            <motion.span>{progressDisplay}</motion.span>%
          </motion.span>
        </motion.div>
      </div>
      <div className="h-3 rounded-full bg-black/40 overflow-hidden backdrop-blur-sm border border-gold/5 relative">
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
            className="absolute inset-0 backdrop-blur-sm opacity-0 group-hover:opacity-100"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent)",
              backgroundSize: "200% 100%",
            }}
            animate={{
              backgroundPosition: ["200% 0", "-200% 0"],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          {/* Animated glow effect on hover */}
          <motion.div 
            className="absolute top-0 right-0 h-full w-1 bg-white/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 0.8 : 0 }}
            transition={{ duration: 0.2 }}
            style={{
              boxShadow: isHovered ? '0 0 8px rgba(255, 255, 255, 0.5)' : 'none'
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ProgressBar;
