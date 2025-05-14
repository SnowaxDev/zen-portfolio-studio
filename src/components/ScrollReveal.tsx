
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
}) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });
  
  // Map pro definování směru animace
  const directionMap: Record<string, { x: number; y: number }> = {
    up: { x: 0, y: distance },
    down: { x: 0, y: -distance },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
  };
  
  const initial = { 
    opacity: 0, 
    x: directionMap[direction].x, 
    y: directionMap[direction].y 
  };
  
  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
          type: "tween",
          duration: duration,
          delay: delay,
          ease: easing,
        },
      });
    } else if (!once) {
      controls.start(initial);
    }
  }, [isInView, controls, duration, delay, distance, once, easing, initial]);

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={controls}
      className={className}
      style={{ width }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
