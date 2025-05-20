
import { useState, useEffect } from 'react';
import { useIsMobile } from './use-mobile';
import { usePrefersReducedMotion } from './use-reduced-motion';

/**
 * Hook to determine animation settings based on device type and user preferences
 * This combines mobile detection with reduced motion preferences and provides
 * granular control over animation intensity
 */
export function useMobileAnimationSettings() {
  const isMobile = useIsMobile();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [shouldReduceAnimations, setShouldReduceAnimations] = useState(false);
  const [animationIntensity, setAnimationIntensity] = useState<'none' | 'minimal' | 'moderate' | 'full'>('full');
  
  useEffect(() => {
    // Determine if animations should be reduced based on device and preferences
    const shouldReduce = isMobile || prefersReducedMotion;
    setShouldReduceAnimations(shouldReduce);
    
    // Set animation intensity based on device and preferences
    if (prefersReducedMotion) {
      setAnimationIntensity('none');
    } else if (isMobile) {
      // Use minimal animations on mobile for better performance
      setAnimationIntensity('minimal');
    } else {
      setAnimationIntensity('full');
    }
  }, [isMobile, prefersReducedMotion]);
  
  /**
   * Get appropriate duration based on animation intensity
   */
  const getAnimationDuration = (defaultDuration: number): number => {
    switch (animationIntensity) {
      case 'none': return 0;
      case 'minimal': return defaultDuration * 0.4; // Reduced for mobile
      case 'moderate': return defaultDuration * 0.7; // Somewhat reduced
      case 'full': return defaultDuration;
      default: return defaultDuration;
    }
  };
  
  /**
   * Get appropriate delay based on animation intensity
   */
  const getAnimationDelay = (defaultDelay: number): number => {
    switch (animationIntensity) {
      case 'none': return 0;
      case 'minimal': return defaultDelay * 0.5; // Reduced for mobile
      case 'moderate': return defaultDelay * 0.7; // Somewhat reduced
      case 'full': return defaultDelay;
      default: return defaultDelay;
    }
  };
  
  /**
   * Returns an appropriate easing string based on animation intensity
   */
  const getAnimationEasing = (): [number, number, number, number] => {
    switch (animationIntensity) {
      case 'none': 
      case 'minimal': 
        return [0.25, 0.1, 0.25, 1]; // More direct easing for mobile
      case 'moderate':
      case 'full':
        return [0.34, 1.56, 0.64, 1]; // Springy easing for desktop
      default:
        return [0.25, 0.1, 0.25, 1];
    }
  };
  
  /**
   * Should disable hover effects on mobile
   */
  const shouldDisableHoverEffects = isMobile;
  
  /**
   * Should use simpler animations on mobile
   */
  const shouldUseSimpleAnimations = isMobile;
  
  return {
    isMobile,
    prefersReducedMotion,
    shouldReduceAnimations,
    animationIntensity,
    getAnimationDuration,
    getAnimationDelay,
    getAnimationEasing,
    shouldDisableHoverEffects,
    shouldUseSimpleAnimations
  };
}
