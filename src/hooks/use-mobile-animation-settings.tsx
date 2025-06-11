
import { useMemo } from 'react';
import { useIsMobile } from './use-mobile';
import { usePrefersReducedMotion } from './use-reduced-motion';

/**
 * Enhanced animation settings optimized for premium feel and performance
 */
export function useMobileAnimationSettings() {
  const isMobile = useIsMobile();
  const prefersReducedMotion = usePrefersReducedMotion();
  
  // Determine if animations should be reduced based on device and user preferences
  const shouldReduceAnimations = useMemo(() => {
    return prefersReducedMotion;
  }, [prefersReducedMotion]);
  
  // Animation intensity based on device capabilities
  const animationIntensity = useMemo(() => {
    if (shouldReduceAnimations) return 'minimal';
    return isMobile ? 'moderate' : 'full';
  }, [shouldReduceAnimations, isMobile]);
  
  // Premium easing curves for different animation types
  const easingCurves = useMemo(() => ({
    premium: [0.25, 0.1, 0.25, 1.0], // Premium smooth easing
    smooth: [0.4, 0.0, 0.2, 1.0], // Material design easing
    bounce: [0.68, -0.55, 0.265, 1.55], // Subtle bounce
    elastic: [0.175, 0.885, 0.32, 1.275], // Elastic feel
    quick: [0.4, 0.0, 1, 1], // Quick and snappy
  }), []);
  
  // Get optimized animation duration
  const getAnimationDuration = (baseDuration: number, type: 'fast' | 'normal' | 'slow' = 'normal') => {
    if (shouldReduceAnimations) return baseDuration * 0.3;
    
    const multipliers = {
      fast: isMobile ? 0.6 : 0.8,
      normal: isMobile ? 0.7 : 1.0,
      slow: isMobile ? 0.8 : 1.2
    };
    
    return baseDuration * multipliers[type];
  };
  
  // Get optimized animation delay
  const getAnimationDelay = (baseDelay: number) => {
    if (shouldReduceAnimations) return baseDelay * 0.2;
    return isMobile ? baseDelay * 0.7 : baseDelay;
  };
  
  // Get animation easing
  const getAnimationEasing = (type: keyof typeof easingCurves = 'premium') => {
    if (shouldReduceAnimations) return 'easeOut';
    return easingCurves[type];
  };
  
  // Get premium spring configuration
  const getSpringConfig = (type: 'gentle' | 'bouncy' | 'stiff' = 'gentle') => {
    const configs = {
      gentle: { 
        type: "spring" as const, 
        stiffness: isMobile ? 120 : 100, 
        damping: isMobile ? 20 : 15 
      },
      bouncy: { 
        type: "spring" as const, 
        stiffness: isMobile ? 200 : 300, 
        damping: isMobile ? 25 : 20 
      },
      stiff: { 
        type: "spring" as const, 
        stiffness: isMobile ? 300 : 400, 
        damping: isMobile ? 30 : 25 
      }
    };
    
    return shouldReduceAnimations 
      ? { type: "tween" as const, duration: 0.2, ease: "easeOut" }
      : configs[type];
  };
  
  // Get stagger configuration for premium feel
  const getStaggerConfig = (baseDelay: number = 0.1) => {
    return {
      staggerChildren: getAnimationDelay(baseDelay),
      delayChildren: getAnimationDelay(0.1)
    };
  };
  
  // Get smooth exit properties
  const getSmoothExitProps = () => {
    return {
      exitVariant: {
        opacity: 0,
        y: shouldReduceAnimations ? 0 : -10,
        transition: {
          duration: getAnimationDuration(0.2),
          ease: 'easeOut'
        }
      }
    };
  };
  
  // Premium viewport configuration
  const getViewportConfig = (threshold: number = 0.1) => ({
    once: true,
    margin: isMobile ? "-20px" : "-50px",
    amount: Math.max(0.05, threshold * (isMobile ? 0.5 : 1))
  });

  return {
    shouldReduceAnimations,
    isMobile,
    animationIntensity,
    easingCurves,
    getAnimationDuration,
    getAnimationDelay,
    getAnimationEasing,
    getSpringConfig,
    getStaggerConfig,
    getSmoothExitProps,
    getViewportConfig,
    // Optimized values for common use cases
    quickDuration: getAnimationDuration(0.2, 'fast'),
    normalDuration: getAnimationDuration(0.5, 'normal'),
    slowDuration: getAnimationDuration(0.8, 'slow'),
    premiumEasing: easingCurves.premium,
    smoothEasing: easingCurves.smooth
  };
}
