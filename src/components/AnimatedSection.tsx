
import React, { ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';
import { usePrefersReducedMotion } from '../hooks/use-reduced-motion';

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
  distance = 30,
  once = true,
  duration = 0.5,
  threshold = 0.1,
  staggerChildren = false,
  staggerDelay = 0.1,
  customVariants,
  withOverflow = false,
}) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  
  // Determine the initial animation based on direction
  const getInitialState = () => {
    if (prefersReducedMotion) {
      return { opacity: 0 };
    }
    
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
  
  // Animation variants with improved dynamics
  const defaultVariants = {
    hidden: getInitialState(),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.15 : duration,
        ease: [0.25, 0.1, 0.25, 1], // Improved cubic bezier curve
        delay: prefersReducedMotion ? 0 : delay,
        staggerChildren: staggerChildren ? staggerDelay : 0,
        delayChildren: staggerChildren ? delay : 0,
      }
    }
  };

  // Choose between default and custom variants
  const variants = customVariants || defaultVariants;

  // Use simpler animation if user prefers reduced motion
  if (prefersReducedMotion) {
    return (
      <motion.div
        id={id}
        className={`${className} relative ${withOverflow ? '' : 'overflow-hidden'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.15 }}
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
      viewport={{ once, margin: "-5px", amount: threshold }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
