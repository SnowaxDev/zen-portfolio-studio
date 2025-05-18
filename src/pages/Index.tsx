
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

// Page transition variants
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
  const [isLoaded, setIsLoaded] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Get scroll progress for scroll-based animations
  const { scrollYProgress } = useScroll();
  const smoothScrollProgress = useSpring(scrollYProgress, { 
    stiffness: 100, 
    damping: 30, 
    restDelta: 0.001 
  });
  
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
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-5 w-5 text-gold" />
          </motion.button>
        )}
      </AnimatePresence>
      
      {/* Animated background grid - specify no props since density doesn't exist */}
      {isLoaded && <FloatingGrid />}
    </motion.div>
  );
};

export default Index;
