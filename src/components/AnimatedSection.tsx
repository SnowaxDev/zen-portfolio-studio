
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
  distance = 50,
  once = true,
  duration = 0.7,
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
  
  // Animation variants
  const defaultVariants = {
    hidden: getInitialState(),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.3 : duration,
        ease: [0.22, 1, 0.36, 1],
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
      <motion.section
        id={id}
        className={`${className} ${withOverflow ? '' : 'overflow-hidden'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.section>
    );
  }

  return (
    <motion.section
      id={id}
      className={`${className} ${withOverflow ? '' : 'overflow-hidden'}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-50px", amount: threshold }}
      variants={variants}
    >
      {children}
    </motion.section>
  );
};

export default AnimatedSection;
