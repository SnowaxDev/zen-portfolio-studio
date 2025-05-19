
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
    // We're being more aggressive now with animation reduction
    // Mobile devices now get more aggressive animation reduction
    setShouldReduceAnimations(isMobile || prefersReducedMotion);
    
    // Set animation intensity based on device and preferences
    if (prefersReducedMotion) {
      setAnimationIntensity('none');
    } else if (isMobile) {
      // Mobile devices now get minimal instead of moderate
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
      case 'minimal': return defaultDuration * 0.4; // Even more reduced for mobile
      case 'moderate': return defaultDuration * 0.6; // More reduced overall
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
      case 'minimal': return defaultDelay * 0.2; // Even more reduced for mobile
      case 'moderate': return defaultDelay * 0.6; // More reduced overall
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
