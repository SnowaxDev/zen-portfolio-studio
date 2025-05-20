
import { useState, useEffect } from 'react';
import { useIsMobile } from './use-mobile';

/**
 * A hook that provides mobile-specific utility functions and values
 * to optimize the mobile experience without affecting desktop
 */
export function useMobileUtils() {
  const isMobile = useIsMobile();
  const [touchStartY, setTouchStartY] = useState(0);
  const [touchEndY, setTouchEndY] = useState(0);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [visibleOnScroll, setVisibleOnScroll] = useState(true);
  const [viewportHeight, setViewportHeight] = useState(0);

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
  
  // Fix for mobile viewport height issues with browser chrome
  useEffect(() => {
    if (!isMobile) return;
    
    const setVhProperty = () => {
      // First get the viewport height and multiply by 1% to get a value for a vh unit
      const vh = window.innerHeight * 0.01;
      // Set the value in the --vh custom property to the root of the document
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      setViewportHeight(window.innerHeight);
    };
    
    setVhProperty();
    
    window.addEventListener('resize', setVhProperty);
    window.addEventListener('orientationchange', setVhProperty);
    
    return () => {
      window.removeEventListener('resize', setVhProperty);
      window.removeEventListener('orientationchange', setVhProperty);
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
  
  // Fix for 100vh on mobile browsers by using the --vh CSS variable
  const getFullHeight = (): string => {
    return isMobile ? 'calc(var(--vh, 1vh) * 100)' : '100vh';
  };

  return {
    isMobile,
    isScrollingDown,
    visibleOnScroll,
    swipeDirection,
    getMobileSize,
    getMobileSpacing,
    getFullHeight,
    viewportHeight
  };
}
