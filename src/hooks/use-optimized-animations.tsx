
import { useState, useEffect, useRef } from 'react';
import { useAnimation, AnimationControls, Variants } from 'framer-motion';
import { usePrefersReducedMotion } from './use-reduced-motion';

// Optimized hook for animations with IntersectionObserver
export function useInViewAnimation(options?: {
  threshold?: number;
  once?: boolean;
  delay?: number;
  rootMargin?: string;
}): {
  ref: React.RefObject<HTMLElement>;
  controls: AnimationControls;
  inView: boolean;
  hasAnimated: boolean;
} {
  const { threshold = 0.1, once = true, delay = 0, rootMargin = "-50px" } = options || {};
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  
  useEffect(() => {
    // Skip for reduced motion preference
    if (prefersReducedMotion) {
      controls.start({ opacity: 1, transition: { duration: 0.3 } });
      setInView(true);
      setHasAnimated(true);
      return;
    }
    
    const currentRef = ref.current;
    
    // Only set up observer if we have a ref
    if (currentRef) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          const isVisible = entry.isIntersecting;
          setInView(isVisible);
          
          if (isVisible && (!once || !hasAnimated)) {
            // Delay the animation if specified
            setTimeout(() => {
              controls.start('visible');
              setHasAnimated(true);
            }, delay * 1000);
          } else if (!isVisible && !once && hasAnimated) {
            controls.start('hidden');
          }
        },
        {
          threshold, 
          rootMargin
        }
      );
      
      observer.observe(currentRef);
      
      return () => {
        if (currentRef) observer.unobserve(currentRef);
      };
    }
  }, [controls, threshold, once, hasAnimated, delay, rootMargin, prefersReducedMotion]);
  
  return { ref, controls, inView, hasAnimated };
}

// Custom hook for staggered children animations
export function useStaggeredAnimation(options?: {
  staggerDelay?: number;
  parentDelay?: number;
  childrenCount?: number;
}): {
  parentVariants: Variants;
  childVariants: Variants;
} {
  const { staggerDelay = 0.1, parentDelay = 0, childrenCount = 0 } = options || {};
  const prefersReducedMotion = usePrefersReducedMotion();
  
  // Create optimized variants with memoized transitions
  const parentVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: prefersReducedMotion ? 0 : parentDelay,
        staggerChildren: prefersReducedMotion ? 0 : staggerDelay,
        delayChildren: prefersReducedMotion ? 0 : parentDelay
      }
    }
  };
  
  const childVariants: Variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: (i: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: prefersReducedMotion ? 0 : i * staggerDelay,
        duration: prefersReducedMotion ? 0.1 : 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };
  
  return { parentVariants, childVariants };
}

// Reusable animation variants for common patterns
export const animationVariants = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  },
  slideUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  },
  slideDown: {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  },
  slideLeft: {
    hidden: { opacity: 0, x: 20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  },
  slideRight: {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  }
};

// Helper function to disable animations based on user preference
export const handleReducedMotion = (animations: any): any => {
  const prefersReducedMotion = usePrefersReducedMotion();
  
  if (prefersReducedMotion) {
    // Return simplified animations
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.3 }
    };
  }
  
  return animations;
};
