
import React, { useRef, useEffect, useState } from 'react';
import { motion, useAnimation, useInView, Variant } from 'framer-motion';
import { easings } from '../lib/utils';

interface ScrollRevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
  distance?: number;
  threshold?: number;
  once?: boolean;
  easing?: [number, number, number, number];
  animationStyle?: 'fade' | 'slide' | 'scale' | 'rotate' | 'shimmer' | 'bounce';
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
}) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });
  
  // Map for defining animation direction
  const directionMap: Record<string, { x: number; y: number }> = {
    up: { x: 0, y: distance },
    down: { x: 0, y: -distance },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
  };
  
  // Initial state based on animation style
  const getInitialState = () => {
    switch (animationStyle) {
      case 'fade':
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
          y: 20
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
      default:
        return { 
          opacity: 0, 
          x: directionMap[direction].x, 
          y: directionMap[direction].y 
        };
    }
  };
  
  // Animation end state based on animation style
  const getAnimateState = () => {
    switch (animationStyle) {
      case 'fade':
        return {
          opacity: 1,
          x: 0,
          y: 0,
        };
      case 'scale':
        return {
          opacity: 1,
          scale: 1,
        };
      case 'rotate':
        return {
          opacity: 1,
          rotate: 0,
          y: 0,
        };
      case 'shimmer':
        return {
          opacity: 1,
          backgroundPosition: '200% 0'
        };
      case 'bounce':
        return {
          opacity: 1,
          y: 0,
        };
      default:
        return {
          opacity: 1,
          x: 0,
          y: 0,
        };
    }
  };
  
  const initial = getInitialState();
  const animate = getAnimateState();
  
  useEffect(() => {
    if (isInView) {
      controls.start({
        ...animate,
        transition: {
          type: animationStyle === 'bounce' ? 'spring' : 'tween',
          duration: animationStyle === 'bounce' ? undefined : duration,
          delay: delay,
          ease: easing,
          damping: animationStyle === 'bounce' ? 8 : undefined,
          stiffness: animationStyle === 'bounce' ? 100 : undefined,
        },
      });
    } else if (!once) {
      controls.start(initial);
    }
  }, [isInView, controls, duration, delay, once, easing, animationStyle, animate, initial]);

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={controls}
      className={`${className} ${animationStyle === 'shimmer' ? 'overflow-hidden' : ''}`}
      style={{ width }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
