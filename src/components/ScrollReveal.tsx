import React, { useRef, useEffect } from 'react';
import { motion, useAnimation, useInView, Variant, Variants } from 'framer-motion';
import { usePrefersReducedMotion } from '../hooks/use-reduced-motion';
import { useIsMobile } from '../hooks/use-mobile';
import { easings } from '../lib/utils';

interface ScrollRevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%" | "auto";
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
  distance?: number;
  threshold?: number;
  once?: boolean;
  easing?: [number, number, number, number];
  animationStyle?: 'fade' | 'slide' | 'scale' | 'rotate' | 'shimmer' | 'bounce' | 'flip' | 'custom';
  customVariants?: Variants;
  staggerChildren?: boolean;
  staggerDelay?: number;
  as?: React.ElementType;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  width = "fit-content",
  delay = 0,
  duration = 0.5,
  direction = 'up',
  distance = 50,
  className = "",
  threshold = 0.1,
  once = true,
  easing = easings.easeOut,
  animationStyle = 'fade',
  customVariants,
  staggerChildren = false,
  staggerDelay = 0.1,
  as = 'div',
}) => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });
  const prefersReducedMotion = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const shouldReduceAnimations = prefersReducedMotion || isMobile;
  
  // Mobile-optimized distance and duration
  const optimizedDistance = isMobile ? Math.min(distance, 20) : distance;
  const optimizedDuration = isMobile ? Math.min(duration, 0.3) : duration;
  
  // Map for defining animation direction (reduced distance for mobile)
  const directionMap = {
    up: { x: 0, y: optimizedDistance },
    down: { x: 0, y: -optimizedDistance },
    left: { x: optimizedDistance, y: 0 },
    right: { x: -optimizedDistance, y: 0 },
    none: { x: 0, y: 0 },
  };
  
  // Initial state based on animation style
  const getInitialState = (): Variant => {
    // For reduced motion preference or mobile, simplify the animations
    if (shouldReduceAnimations) {
      return { opacity: 0 };
    }
    
    switch (animationStyle) {
      case 'fade':
        return { 
          opacity: 0, 
          x: directionMap[direction].x, 
          y: directionMap[direction].y 
        };
      case 'slide':
        return { 
          opacity: 0, 
          x: directionMap[direction].x, 
          y: directionMap[direction].y 
        };
      case 'scale':
        return { 
          opacity: 0, 
          scale: 0.8,
        };
      case 'rotate':
        return { 
          opacity: 0, 
          rotate: direction === 'left' ? -15 : 15,
          y: direction === 'none' ? 0 : 20
        };
      case 'shimmer':
        return { 
          opacity: 0,
          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
          backgroundSize: '200% 100%',
          backgroundPosition: '-100% 0'
        };
      case 'bounce':
        return { 
          opacity: 0, 
          y: 20,
          transition: {
            type: 'spring',
            damping: 12,
          }
        };
      case 'flip':
        return {
          opacity: 0,
          rotateX: direction === 'up' || direction === 'down' ? 90 : 0,
          rotateY: direction === 'left' || direction === 'right' ? 90 : 0,
        };
      default:
        return { 
          opacity: 0, 
          x: directionMap[direction].x, 
          y: directionMap[direction].y 
        };
    }
  };
  
  // Animation end state based on animation style
  const getAnimateState = (): Variant => {
    // Same animation end states, but simpler transitions will be applied
    return {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      rotate: 0,
      rotateX: 0,
      rotateY: 0,
      backgroundPosition: animationStyle === 'shimmer' ? '200% 0' : undefined
    };
  };
  
  // Create child variants for staggered animations
  const getChildVariants = (): Variants => {
    if (!staggerChildren) return {};
    
    return {
      hidden: { opacity: 0, y: isMobile ? 10 : 20 },
      visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
          delay: i * (isMobile ? staggerDelay * 0.5 : staggerDelay) + delay,
          duration: optimizedDuration,
          ease: easing,
        }
      })
    };
  };
  
  const variants: Variants = customVariants || {
    hidden: getInitialState(),
    visible: {
      ...getAnimateState(),
      transition: {
        type: animationStyle === 'bounce' ? 'spring' : 'tween',
        duration: animationStyle === 'bounce' ? undefined : optimizedDuration,
        delay: shouldReduceAnimations ? delay * 0.5 : delay,
        ease: animationStyle === 'bounce' ? undefined : easing,
        damping: animationStyle === 'bounce' ? (isMobile ? 10 : 8) : undefined,
        stiffness: animationStyle === 'bounce' ? (isMobile ? 120 : 100) : undefined,
        staggerChildren: staggerChildren ? (isMobile ? staggerDelay * 0.5 : staggerDelay) : 0,
        delayChildren: staggerChildren ? delay : 0,
      }
    }
  };
  
  const childVariants = getChildVariants();
  
  useEffect(() => {
    if (shouldReduceAnimations) {
      controls.start({ opacity: 1 });
      return;
    }
    
    if (isInView) {
      controls.start("visible");
    } else if (!once) {
      controls.start("hidden");
    }
  }, [isInView, controls, once, shouldReduceAnimations]);

  // Use simplified animation for reduced motion preference or mobile
  if (shouldReduceAnimations) {
    const Component = as as React.ElementType;
    return (
      <Component ref={ref} className={className} style={{ width }}>
        {children}
      </Component>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={`${className} ${animationStyle === 'shimmer' ? 'overflow-hidden' : ''}`}
      style={{ width }}
      custom={0} // Used for staggered animations
    >
      {staggerChildren ? (
        // If staggering children, wrap each child in a motion div
        React.Children.map(children, (child, i) => (
          <motion.div
            key={i}
            custom={i} // Pass index to custom prop
            variants={childVariants}
          >
            {child}
          </motion.div>
        ))
      ) : (
        // Otherwise render children directly
        children
      )}
    </motion.div>
  );
};

export default ScrollReveal;
