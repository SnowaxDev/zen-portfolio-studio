
import React, { useEffect, useState, Suspense, lazy } from 'react';
import { motion, useScroll, useSpring, useMotionTemplate, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import HeroSection from '../sections/HeroSection';
import Footer from '../components/Footer';
import { useIsMobile } from '../hooks/use-mobile';
import { useMobileOptimizations } from '../hooks/use-mobile-optimizations';
import { FloatingGrid } from '../components/DecorativeElements';
import { usePrefersReducedMotion } from '../hooks/use-reduced-motion';
import { Loader, ArrowUp } from 'lucide-react';

// Import AboutSection directly instead of lazy loading to fix the issue
import AboutSection from '../sections/AboutSection';

// Lazy load other sections for better performance
const ProjectsSection = lazy(() => import('../sections/ProjectsSection'));
const SkillsSection = lazy(() => import('../sections/SkillsSection'));
const ServicesSection = lazy(() => import('../sections/ServicesSection'));
const ContactSection = lazy(() => import('../sections/ContactSection'));

// Enhanced loading fallback for mobile
const LoadingFallback = () => {
  const { isMobile } = useMobileOptimizations();
  
  return (
    <div className={`flex items-center justify-center ${isMobile ? 'min-h-[150px]' : 'min-h-[200px]'}`}>
      <Loader className={`animate-spin text-gold ${isMobile ? 'h-6 w-6' : 'h-8 w-8'}`} />
    </div>
  );
};

// Mobile-optimized page transition variants
const getMobilePageVariants = (isMobile: boolean, isReducedMotion: boolean) => ({
  initial: {
    opacity: 0,
    ...(isMobile && !isReducedMotion ? { y: 20 } : {})
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: isMobile ? 0.4 : 0.9,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: isMobile ? 0.1 : 0.35,
      delayChildren: isMobile ? 0.1 : 0.2
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: isMobile ? 0.3 : 0.7,
      ease: [0.22, 1, 0.36, 1]
    }
  }
});

const Index = () => {
  // ALL HOOKS MUST BE CALLED BEFORE ANY CONDITIONAL RETURNS - FIXED ORDER
  const isMobile = useIsMobile();
  const prefersReducedMotion = usePrefersReducedMotion();
  const { 
    isReducedMotion, 
    getAnimationDuration,
    getTouchTargetSize 
  } = useMobileOptimizations();
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Get scroll progress for scroll-based animations
  const { scrollYProgress } = useScroll();
  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: (isMobile ?? false) ? 200 : 100,
    damping: (isMobile ?? false) ? 40 : 30,
    restDelta: 0.001
  });

  // Interactive cursor effect - disabled for mobile
  const cursorSize = useSpring(12, { stiffness: 100, damping: 25 });
  const cursorOpacity = useSpring(0, { stiffness: 100, damping: 25 });
  const cursorX = useSpring(0, { stiffness: 80, damping: 20 });
  const cursorY = useSpring(0, { stiffness: 80, damping: 20 });
  const cursorStyle = useMotionTemplate`
    radial-gradient(
      ${cursorSize}px circle,
      rgba(212, 175, 55, ${cursorOpacity}),
      transparent 60%
    )
  `;

  // Track mouse position for interactive cursor - disabled for mobile
  useEffect(() => {
    if (prefersReducedMotion || isMobile) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX - 15);
      cursorY.set(e.clientY - 15);
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };
    
    const handleMouseEnter = () => {
      cursorSize.set(40);
      cursorOpacity.set(0.3);
    };
    
    const handleMouseLeave = () => {
      cursorSize.set(12);
      cursorOpacity.set(0);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseenter', handleMouseEnter);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorX, cursorY, cursorSize, cursorOpacity, isMobile, prefersReducedMotion]);

  // Show/hide scroll-to-top button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const threshold = (isMobile ?? false) ? window.innerHeight * 0.5 : window.innerHeight;
      setShowScrollTop(window.scrollY > threshold);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  // Update metadata and preload critical assets
  useEffect(() => {
    document.title = "Dusanko.dev | Frontend Developer & UI/UX Designer";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Portfolio webu pro Dušana Kostića - Dusanko.dev, Frontend vývojáře a UI/UX designera specializujícího se na React a Next.js aplikace.");
    }

    // Ensure proper mobile viewport
    let viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) {
      viewport = document.createElement('meta');
      viewport.setAttribute('name', 'viewport');
      document.getElementsByTagName('head')[0].appendChild(viewport);
    }
    viewport.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');

    // Add theme-color for mobile browsers
    let themeColor = document.querySelector('meta[name="theme-color"]');
    if (!themeColor) {
      themeColor = document.createElement('meta');
      themeColor.setAttribute('name', 'theme-color');
      document.getElementsByTagName('head')[0].appendChild(themeColor);
    }
    themeColor.setAttribute('content', '#0A0914');

    // Optimize loading for mobile
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, (isMobile ?? false) ? 300 : 500);
    
    return () => clearTimeout(timer);
  }, [isMobile]);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // NOW we can determine variants and do conditional rendering after all hooks are called
  const pageVariants = getMobilePageVariants(isMobile || false, isReducedMotion);

  return (
    <motion.div 
      variants={pageVariants} 
      initial="initial" 
      animate="animate" 
      exit="exit" 
      className="overflow-x-hidden flex flex-col min-h-screen"
    >
      {/* Interactive cursor effect for desktop only */}
      {!isMobile && !prefersReducedMotion && (
        <motion.div 
          className="fixed inset-0 z-50 pointer-events-none" 
          style={{
            background: useMotionTemplate`
              radial-gradient(
                ${useSpring(12, { stiffness: 100, damping: 25 })}px circle,
                rgba(212, 175, 55, ${useSpring(0, { stiffness: 100, damping: 25 })}),
                transparent 60%
              )
            `,
            left: useSpring(0, { stiffness: 80, damping: 20 }),
            top: useSpring(0, { stiffness: 80, damping: 20 })
          }} 
        />
      )}
      
      {/* Mobile-optimized scroll progress indicator */}
      <motion.div 
        className={`fixed top-0 left-0 right-0 bg-gradient-to-r from-gold via-purple to-gold-light z-50 ${
          isMobile ? 'h-0.5' : 'h-1'
        }`}
        style={{
          scaleX: smoothScrollProgress,
          transformOrigin: "0%"
        }} 
      />
      
      <Header />
      
      <main className="flex-grow relative">
        <HeroSection />
        
        {/* Render AboutSection directly for better mobile performance */}
        <AboutSection />
        
        <Suspense fallback={<LoadingFallback />}>
          <ProjectsSection />
        </Suspense>
        
        <Suspense fallback={<LoadingFallback />}>
          <SkillsSection />
        </Suspense>
        
        <Suspense fallback={<LoadingFallback />}>
          <ServicesSection />
        </Suspense>
        
        <Suspense fallback={<LoadingFallback />}>
          <ContactSection />
        </Suspense>
        
        {/* Decorative elements - optimized for mobile */}
        {isLoaded && !prefersReducedMotion && !isMobile && (
          <>
            <div 
              className="fixed top-20 left-10 w-32 h-32 bg-purple/10 rounded-full filter blur-3xl opacity-30 pointer-events-none" 
              style={{
                transform: `translate(${mousePosition.x * -30}px, ${mousePosition.y * -20}px)`,
                transition: 'transform 0.3s ease-out'
              }} 
            />
            <div 
              className="fixed bottom-40 right-10 w-48 h-48 bg-gold/10 rounded-full filter blur-3xl opacity-20 pointer-events-none" 
              style={{
                transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 20}px)`,
                transition: 'transform 0.3s ease-out'
              }} 
            />
          </>
        )}
      </main>
      
      <Footer />
      
      {/* Mobile-optimized scroll-to-top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button 
            className={`fixed z-40 rounded-full bg-card/90 backdrop-blur-md border border-gold/30 shadow-lg hover:border-gold/50 transition-colors ${getTouchTargetSize()} ${
              isMobile ? 'bottom-4 right-4 p-2.5' : 'bottom-6 right-6 p-3'
            }`}
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            whileHover={{ scale: isMobile ? 1 : 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop} 
            aria-label="Scroll to top"
          >
            <ArrowUp className={`text-gold ${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />
          </motion.button>
        )}
      </AnimatePresence>
      
      {/* Mobile-specific floating contact button */}
      {isMobile && (
        <motion.div 
          className="fixed bottom-4 left-4 z-40" 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.4 }}
        >
          <motion.a 
            href="#contact" 
            className={`flex items-center justify-center bg-gradient-to-r from-gold to-gold-light rounded-full shadow-lg shadow-gold/20 ${getTouchTargetSize()}`}
            style={{ width: '44px', height: '44px' }}
            whileTap={{ scale: 0.95 }}
            aria-label="Contact Me"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 text-background" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
              />
            </svg>
          </motion.a>
        </motion.div>
      )}
      
      {/* Animated background grid - desktop only */}
      {isLoaded && !isMobile && <FloatingGrid />}
    </motion.div>
  );
};

export default Index;
