
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
    // Determine if animations should be reduced
    setShouldReduceAnimations(isMobile || prefersReducedMotion);
    
    // Set animation intensity based on device and preferences
    if (prefersReducedMotion) {
      setAnimationIntensity('none');
    } else if (isMobile) {
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
      case 'minimal': return defaultDuration * 0.5;
      case 'moderate': return defaultDuration * 0.75;
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
      case 'minimal': return defaultDelay * 0.3;
      case 'moderate': return defaultDelay * 0.75;
      case 'full': return defaultDelay;
      default: return defaultDelay;
    }
  };
  
  return {
    isMobile,
    prefersReducedMotion,
    shouldReduceAnimations,
    animationIntensity,
    getAnimationDuration,
    getAnimationDelay
  };
}
