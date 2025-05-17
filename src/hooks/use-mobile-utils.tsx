
import { useState, useEffect } from 'react';
import { useIsMobile } from './use-mobile';

/**
 * A hook that provides mobile-specific utility functions and values
 */
export function useMobileUtils() {
  const isMobile = useIsMobile();
  const [touchStartY, setTouchStartY] = useState(0);
  const [touchEndY, setTouchEndY] = useState(0);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [visibleOnScroll, setVisibleOnScroll] = useState(true);

  // Handle scroll direction detection
  useEffect(() => {
    if (!isMobile) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY;
      setIsScrollingDown(isScrollingDown);
      
      // Hide/show UI elements based on scroll direction
      if (currentScrollY > 60) {
        if (isScrollingDown) {
          setVisibleOnScroll(false);
        } else {
          setVisibleOnScroll(true);
        }
      } else {
        setVisibleOnScroll(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile, lastScrollY]);

  // Handle touch events for swipe detection
  useEffect(() => {
    if (!isMobile) return;
    
    const handleTouchStart = (e: TouchEvent) => {
      setTouchStartY(e.touches[0].clientY);
    };
    
    const handleTouchEnd = (e: TouchEvent) => {
      setTouchEndY(e.changedTouches[0].clientY);
    };
    
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isMobile]);
  
  // Calculate if user has performed a meaningful swipe
  const swipeDirection = () => {
    const threshold = 50; // minimum distance for a swipe
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) < threshold) return 'none';
    return diff > 0 ? 'up' : 'down';
  };
  
  // Utility function to get appropriate size for mobile elements
  const getMobileSize = (defaultSize: number, mobileSize: number): number => {
    return isMobile ? mobileSize : defaultSize;
  };
  
  // Get appropriate spacing for mobile
  const getMobileSpacing = (spacingClass: string): string => {
    if (!isMobile) return spacingClass;
    
    // Convert padding/margin classes to mobile-friendly versions
    if (spacingClass.includes('p-') || spacingClass.includes('m-')) {
      const value = parseInt(spacingClass.split('-')[1]);
      if (value > 6) {
        return spacingClass.split('-')[0] + '-' + (value - 2);
      }
    }
    
    return spacingClass;
  };

  return {
    isMobile,
    isScrollingDown,
    visibleOnScroll,
    swipeDirection,
    getMobileSize,
    getMobileSpacing
  };
}
