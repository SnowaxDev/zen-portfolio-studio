
import { useMemo } from 'react';
import { useIsMobile } from './use-mobile';
import { usePrefersReducedMotion } from './use-reduced-motion';

/**
 * A hook that provides animation settings optimized for mobile devices
 * and respects user preferences for reduced motion
 */
export function useMobileAnimationSettings() {
  const isMobile = useIsMobile();
  const prefersReducedMotion = usePrefersReducedMotion();
  
  // Determine if animations should be reduced based on device and user preferences
  const shouldReduceAnimations = useMemo(() => {
    return isMobile || prefersReducedMotion;
  }, [isMobile, prefersReducedMotion]);
  
  // Get animation duration adjusted for device
  const getAnimationDuration = (desktopDuration: number) => {
    if (shouldReduceAnimations) {
      // Reduce animation durations on mobile or when reduced motion is preferred
      return desktopDuration * 0.6;
    }
    return desktopDuration;
  };
  
  // Get animation delay adjusted for device
  const getAnimationDelay = (desktopDelay: number) => {
    if (shouldReduceAnimations) {
      // Reduce delays on mobile
      return desktopDelay * 0.5;
    }
    return desktopDelay;
  };
  
  // Get appropriate animation easing based on device
  const getAnimationEasing = () => {
    if (shouldReduceAnimations) {
      // Simpler easing for mobile
      return "easeOut";
    }
    // More elaborate easing for desktop
    return [0.25, 0.1, 0.25, 1.0]; 
  };
  
  // Get animation intensity value (0-1)
  const animationIntensity = shouldReduceAnimations ? 0.4 : 1;
  
  // Get smooth exit animation properties
  const getSmoothExitProps = () => {
    return {
      exitVariant: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.2 }
      },
      exitTransition: {
        duration: 0.2,
        ease: "easeOut"
      }
    };
  };
  
  return {
    shouldReduceAnimations,
    isMobile,
    getAnimationDuration,
    getAnimationDelay,
    getAnimationEasing,
    animationIntensity,
    getSmoothExitProps
  };
}
