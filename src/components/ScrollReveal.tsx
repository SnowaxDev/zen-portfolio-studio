
import React, { useRef, useEffect } from 'react';
import { motion, useAnimation, Variant } from 'framer-motion';
import { useInView } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
  distance?: number;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  width = "fit-content",
  delay = 0,
  duration = 0.5,
  direction = 'up',
  distance = 50,
  className = "",
}) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  // Map for defining direction of animation
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
          duration: duration,
          delay: delay,
          ease: [0.25, 0.1, 0.25, 1],
        },
      });
    }
  }, [isInView, controls, duration, delay, distance]);

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
