
import React, { ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';
import { useMobileAnimationSettings } from '../hooks/use-mobile-animation-settings';

interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  id?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale';
  distance?: number;
  duration?: number;
  threshold?: number;
  staggerChildren?: boolean;
  staggerDelay?: number;
  customVariants?: Variants;
  animationType?: 'premium' | 'smooth' | 'elastic' | 'quick';
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  delay = 0,
  className = '',
  id,
  direction = 'up',
  distance = 30,
  duration = 0.6,
  threshold = 0.1,
  staggerChildren = false,
  staggerDelay = 0.1,
  customVariants,
  animationType = 'premium',
}) => {
  const { 
    shouldReduceAnimations,
    isMobile,
    easingCurves,
    getAnimationDuration,
    getAnimationDelay,
    getSpringConfig,
    getStaggerConfig,
    getViewportConfig
  } = useMobileAnimationSettings();
  
  // Optimized parameters
  const optimizedDuration = getAnimationDuration(duration);
  const optimizedDelay = getAnimationDelay(delay);
  const optimizedDistance = isMobile ? Math.min(distance, 20) : distance;
  
  // Premium animation variants
  const getInitialState = () => {
    if (shouldReduceAnimations) {
      return { opacity: 0 };
    }
    
    switch (direction) {
      case 'up':
        return { opacity: 0, y: optimizedDistance };
      case 'down':
        return { opacity: 0, y: -optimizedDistance };
      case 'left':
        return { opacity: 0, x: optimizedDistance };
      case 'right':
        return { opacity: 0, x: -optimizedDistance };
      case 'scale':
        return { opacity: 0, scale: 0.9 };
      case 'fade':
      default:
        return { opacity: 0 };
    }
  };

  const variants: Variants = customVariants || {
    hidden: getInitialState(),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        duration: optimizedDuration,
        ease: easingCurves[animationType] || easingCurves.premium,
        delay: optimizedDelay,
        ...(staggerChildren ? getStaggerConfig(staggerDelay) : {})
      }
    }
  };

  // Simplified animation for reduced motion
  if (shouldReduceAnimations) {
    return (
      <motion.div
        id={id}
        className={className}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ 
          duration: 0.2,
          ease: "easeOut"
        }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={getViewportConfig(threshold)}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
