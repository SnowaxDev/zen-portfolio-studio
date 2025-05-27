
import { useState, useEffect } from 'react';
import { useIsMobile } from './use-mobile';

export function useMobileOptimizations() {
  const isMobile = useIsMobile();
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(0);

  useEffect(() => {
    if (!isMobile) return;

    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    // Set viewport height for mobile browsers
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      setViewportHeight(window.innerHeight);
    };

    setVh();
    window.addEventListener('resize', setVh);
    window.addEventListener('orientationchange', setVh);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      window.removeEventListener('resize', setVh);
      window.removeEventListener('orientationchange', setVh);
    };
  }, [isMobile]);

  const getMobileSpacing = (defaultSpacing: string) => {
    if (!isMobile) return defaultSpacing;
    
    // Reduce spacing for mobile
    const spacingMap: Record<string, string> = {
      'py-24': 'py-12',
      'py-20': 'py-10',
      'py-16': 'py-8',
      'mb-16': 'mb-8',
      'mb-12': 'mb-6',
      'gap-8': 'gap-4',
      'gap-6': 'gap-3',
      'px-8': 'px-4',
      'px-6': 'px-4',
    };
    
    return spacingMap[defaultSpacing] || defaultSpacing;
  };

  const getMobileFontSize = (defaultSize: string) => {
    if (!isMobile) return defaultSize;
    
    const fontMap: Record<string, string> = {
      'text-5xl': 'text-3xl',
      'text-4xl': 'text-2xl',
      'text-3xl': 'text-xl',
      'text-2xl': 'text-lg',
      'text-xl': 'text-base',
    };
    
    return fontMap[defaultSize] || defaultSize;
  };

  return {
    isMobile,
    isReducedMotion,
    viewportHeight,
    getMobileSpacing,
    getMobileFontSize,
    // Animation durations optimized for mobile
    getAnimationDuration: (duration: number) => isReducedMotion ? 0 : duration * 0.7,
    // Touch-friendly minimum sizes
    getTouchTargetSize: () => isMobile ? 'min-h-[44px] min-w-[44px]' : '',
  };
}
