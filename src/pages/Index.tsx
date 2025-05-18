
import React, { useEffect, useState, Suspense, lazy } from 'react';
import { motion, useScroll, useSpring, useMotionTemplate, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import HeroSection from '../sections/HeroSection';
import Footer from '../components/Footer';
import { useIsMobile } from '../hooks/use-mobile';
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

// Enhanced loading fallback with better error handling
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[200px]">
    <Loader className="h-8 w-8 animate-spin text-gold" />
  </div>
);

// Page transition variants - simplified for mobile
const pageVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { 
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.35,
      delayChildren: 0.2
    }
  },
  exit: { 
    opacity: 0,
    transition: { 
      duration: 0.7, 
      ease: [0.22, 1, 0.36, 1] 
    }
  }
};

const Index = () => {
  const isMobile = useIsMobile();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Get scroll progress for scroll-based animations
  const { scrollYProgress } = useScroll();
  const smoothScrollProgress = useSpring(scrollYProgress, { 
    stiffness: 100, 
    damping: 30, 
    restDelta: 0.001 
  });
  
  // Interactive cursor effect - only enabled for desktop
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
      if (window.scrollY > window.innerHeight) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  // Update metadata to Czech and preload critical assets
  useEffect(() => {
    document.title = "Jan Novák | Frontend Vývojář & UI/UX Designer";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Portfolio web pro Jana Nováka, Frontend Vývojáře a UI/UX Designera specializujícího se na React a Next.js aplikace.");
    }
    
    // Add viewport meta tag to ensure proper mobile rendering
    let viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) {
      viewport = document.createElement('meta');
      viewport.setAttribute('name', 'viewport');
      document.getElementsByTagName('head')[0].appendChild(viewport);
    }
    viewport.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1');
    
    // Add theme-color meta tag for mobile browser UI
    let themeColor = document.querySelector('meta[name="theme-color"]');
    if (!themeColor) {
      themeColor = document.createElement('meta');
      themeColor.setAttribute('name', 'theme-color');
      document.getElementsByTagName('head')[0].appendChild(themeColor);
    }
    themeColor.setAttribute('content', '#1A1F2C');
    
    // Simulate asset loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

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
            background: cursorStyle,
            left: cursorX,
            top: cursorY,
          }}
        />
      )}
      
      {/* Scroll progress indicator */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold via-purple to-gold-light z-50"
        style={{ scaleX: smoothScrollProgress, transformOrigin: "0%" }}
      />
      
      <Header />
      
      <main className="flex-grow relative">
        <HeroSection />
        
        {/* Directly render AboutSection without Suspense to fix loading issue */}
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
        
        {/* Dynamic decorative elements that respond to mouse position - disabled on mobile */}
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
      
      {/* Enhanced scroll-to-top button - better for mobile */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-card/80 backdrop-blur-md border border-gold/20 shadow-lg hover:border-gold/50 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: isMobile ? 1 : 1.1 }}
            whileTap={{ scale: isMobile ? 0.95 : 0.9 }}
            onClick={scrollToTop}
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-5 w-5 text-gold" />
          </motion.button>
        )}
      </AnimatePresence>
      
      {/* Enhanced desktop scroll indicator - hide on mobile */}
      {!isMobile && !prefersReducedMotion && (
        <motion.div 
          className="fixed bottom-5 right-5 flex flex-col items-center z-40"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.8, duration: 0.5 }}
        >
          <motion.div 
            className="bg-card/80 backdrop-blur-sm p-3 rounded-full border border-gold/20 shadow-lg hover:border-gold/50 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div 
              className="w-1 h-8 bg-gradient-to-b from-gold to-purple rounded-full"
              animate={{ 
                scaleY: [1, 0.3, 1],
                opacity: [1, 0.6, 1],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </motion.div>
      )}
      
      {/* Enhanced mobile floating contact button - only on mobile */}
      {isMobile && (
        <motion.div
          className="fixed bottom-5 right-5 z-40"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <motion.a 
            href="#contact"
            className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-gold to-gold-light rounded-full shadow-lg shadow-gold/20"
            whileTap={{ scale: 0.95 }}
            aria-label="Contact Me"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-background" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </motion.a>
        </motion.div>
      )}
      
      {/* Animated background grid - only show on non-mobile devices */}
      {isLoaded && !isMobile && <FloatingGrid />}
    </motion.div>
  );
};

export default Index;
