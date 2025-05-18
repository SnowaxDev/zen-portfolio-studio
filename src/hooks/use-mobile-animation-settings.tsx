
import { useState, useEffect } from 'react';
import { useIsMobile } from './use-mobile';
import { usePrefersReducedMotion } from './use-reduced-motion';

/**
 * Hook to determine if animations should be reduced based on device type and user preferences
 * This combines mobile detection with reduced motion preferences
 */
export function useMobileAnimationSettings() {
  const isMobile = useIsMobile();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [shouldReduceAnimations, setShouldReduceAnimations] = useState(false);
  
  useEffect(() => {
    // Reduce animations if either on mobile or user prefers reduced motion
    setShouldReduceAnimations(isMobile || prefersReducedMotion);
  }, [isMobile, prefersReducedMotion]);
  
  return {
    isMobile,
    prefersReducedMotion,
    shouldReduceAnimations
  };
}
