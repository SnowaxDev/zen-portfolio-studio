
import React, { ReactNode } from 'react';
import { motion, Variants, AnimationProps } from 'framer-motion';
import { useMobileAnimationSettings } from '../hooks/use-mobile-animation-settings';

interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  id?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  once?: boolean;
  duration?: number;
  threshold?: number;
  staggerChildren?: boolean;
  staggerDelay?: number;
  customVariants?: Variants;
  withOverflow?: boolean;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  delay = 0,
  className = '',
  id,
  direction = 'up',
  distance = 20,
  once = true,
  duration = 0.6,
  threshold = 0.2,
  staggerChildren = false,
  staggerDelay = 0.1,
  customVariants,
  withOverflow = false,
}) => {
  const { 
    shouldReduceAnimations,
    getAnimationDuration,
    getAnimationDelay
  } = useMobileAnimationSettings();
  
  // Calculate optimized animation parameters
  const optimizedDuration = getAnimationDuration(duration);
  const optimizedDelay = getAnimationDelay(delay);
  
  // Determine the initial animation based on direction with optimized effects
  const getInitialState = () => {
    if (shouldReduceAnimations) {
      // Simplified animation for mobile/reduced motion
      return { opacity: 0 };
    }
    
    // Full animations for desktop
    switch (direction) {
      case 'up':
        return { opacity: 0, y: distance };
      case 'down':
        return { opacity: 0, y: -distance };
      case 'left':
        return { opacity: 0, x: distance };
      case 'right':
        return { opacity: 0, x: -distance };
      case 'none':
        return { opacity: 0 };
      default:
        return { opacity: 0 };
    }
  };
  
  // Enhanced animation variants with improved dynamics
  const defaultVariants = {
    hidden: getInitialState(),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: optimizedDuration,
        // More natural and smoother easing
        ease: [0.25, 0.1, 0.25, 1], 
        delay: optimizedDelay,
        staggerChildren: staggerChildren ? staggerDelay * (shouldReduceAnimations ? 0.5 : 1) : 0,
        delayChildren: staggerChildren ? optimizedDelay : 0,
      }
    }
  };

  // Choose between default and custom variants
  const variants = customVariants || defaultVariants;

  // Use simpler animation if user prefers reduced motion or is on mobile
  if (shouldReduceAnimations) {
    return (
      <motion.div
        id={id}
        className={`${className} relative ${withOverflow ? '' : 'overflow-hidden'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ 
          duration: optimizedDuration > 0 ? Math.max(0.15, optimizedDuration) : 0.15,
          ease: [0.25, 0.1, 0.25, 1]
        }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      id={id}
      className={`${className} relative ${withOverflow ? '' : 'overflow-hidden'}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-10px", amount: threshold }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
