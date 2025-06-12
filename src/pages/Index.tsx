
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

import AboutSection from '../sections/AboutSection';

const ProjectsSection = lazy(() => import('../sections/ProjectsSection'));
const SkillsSection = lazy(() => import('../sections/SkillsSection'));
const ServicesSection = lazy(() => import('../sections/ServicesSection'));
const ContactSection = lazy(() => import('../sections/ContactSection'));

const LoadingFallback = () => {
  const { isMobile } = useMobileOptimizations();
  
  return (
    <div className={`flex items-center justify-center ${isMobile ? 'min-h-[120px]' : 'min-h-[160px]'}`}>
      <motion.div
        className={`border-2 border-gold border-t-transparent rounded-full ${isMobile ? 'h-6 w-6' : 'h-8 w-8'}`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

const getCleanPageVariants = (isMobile: boolean, isReducedMotion: boolean) => ({
  initial: {
    opacity: 0,
    ...(isMobile && !isReducedMotion ? { y: 15 } : {})
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: isMobile ? 0.6 : 1.2,
      ease: [0.25, 0.1, 0.25, 1.0],
      staggerChildren: isMobile ? 0.15 : 0.4,
      delayChildren: isMobile ? 0.1 : 0.2
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: isMobile ? 0.4 : 0.8,
      ease: [0.25, 0.1, 0.25, 1.0]
    }
  }
});

const Index = () => {
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

  const { scrollYProgress } = useScroll();
  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: (isMobile ?? false) ? 250 : 120,
    damping: (isMobile ?? false) ? 50 : 35,
    restDelta: 0.001
  });

  const cursorSize = useSpring(10, { stiffness: 120, damping: 30 });
  const cursorOpacity = useSpring(0, { stiffness: 120, damping: 30 });
  const cursorX = useSpring(0, { stiffness: 90, damping: 25 });
  const cursorY = useSpring(0, { stiffness: 90, damping: 25 });

  useEffect(() => {
    if (prefersReducedMotion || isMobile) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX - 12);
      cursorY.set(e.clientY - 12);
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };
    
    const handleMouseEnter = () => {
      cursorSize.set(35);
      cursorOpacity.set(0.25);
    };
    
    const handleMouseLeave = () => {
      cursorSize.set(10);
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

  useEffect(() => {
    const handleScroll = () => {
      const threshold = (isMobile ?? false) ? window.innerHeight * 0.4 : window.innerHeight * 0.8;
      setShowScrollTop(window.scrollY > threshold);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  useEffect(() => {
    document.title = "Dusanko.dev | Frontend Developer & UI/UX Designer";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Portfolio webu pro Dušana Kostića - Dusanko.dev, Frontend vývojáře a UI/UX designera specializujícího se na React a Next.js aplikace.");
    }

    let viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) {
      viewport = document.createElement('meta');
      viewport.setAttribute('name', 'viewport');
      document.getElementsByTagName('head')[0].appendChild(viewport);
    }
    viewport.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');

    let themeColor = document.querySelector('meta[name="theme-color"]');
    if (!themeColor) {
      themeColor = document.createElement('meta');
      themeColor.setAttribute('name', 'theme-color');
      document.getElementsByTagName('head')[0].appendChild(themeColor);
    }
    themeColor.setAttribute('content', '#0A0914');

    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, (isMobile ?? false) ? 400 : 600);
    
    return () => clearTimeout(timer);
  }, [isMobile]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const pageVariants = getCleanPageVariants(isMobile || false, isReducedMotion);

  return (
    <motion.div 
      variants={pageVariants} 
      initial="initial" 
      animate="animate" 
      exit="exit" 
      className="overflow-x-hidden flex flex-col min-h-screen bg-background"
    >
      {/* Refined cursor effect */}
      {!isMobile && !prefersReducedMotion && (
        <motion.div 
          className="fixed inset-0 z-50 pointer-events-none" 
          style={{
            background: useMotionTemplate`
              radial-gradient(
                ${cursorSize}px circle,
                rgba(212, 175, 55, ${cursorOpacity}),
                transparent 70%
              )
            `,
            left: cursorX,
            top: cursorY
          }} 
        />
      )}
      
      {/* Clean progress indicator */}
      <motion.div 
        className={`fixed top-0 left-0 right-0 bg-gradient-to-r from-gold via-gold-light to-gold z-50 ${
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
        
        {/* Subtle background elements */}
        {isLoaded && !prefersReducedMotion && !isMobile && (
          <>
            <div 
              className="fixed top-20 left-8 w-24 h-24 bg-purple/8 rounded-full filter blur-2xl opacity-40 pointer-events-none" 
              style={{
                transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -15}px)`,
                transition: 'transform 0.6s ease-out'
              }} 
            />
            <div 
              className="fixed bottom-32 right-8 w-32 h-32 bg-gold/6 rounded-full filter blur-2xl opacity-30 pointer-events-none" 
              style={{
                transform: `translate(${mousePosition.x * 25}px, ${mousePosition.y * 18}px)`,
                transition: 'transform 0.6s ease-out'
              }} 
            />
          </>
        )}
      </main>
      
      <Footer />
      
      {/* Refined scroll-to-top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button 
            className={`fixed z-40 rounded-full bg-card/80 backdrop-blur-lg border border-gold/25 shadow-xl hover:border-gold/40 hover:shadow-2xl transition-all duration-300 ${getTouchTargetSize()} ${
              isMobile ? 'bottom-4 right-4 p-3' : 'bottom-6 right-6 p-4'
            }`}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            whileHover={{ scale: isMobile ? 1 : 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop} 
            aria-label="Scroll to top"
          >
            <ArrowUp className={`text-gold ${isMobile ? 'h-5 w-5' : 'h-6 w-6'}`} />
          </motion.button>
        )}
      </AnimatePresence>
      
      {/* Refined mobile contact button */}
      {isMobile && (
        <motion.div 
          className="fixed bottom-4 left-4 z-40" 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <motion.a 
            href="#contact" 
            className="flex items-center justify-center bg-gradient-to-r from-gold to-gold-light rounded-full shadow-xl shadow-gold/25 backdrop-blur-sm border border-gold/30"
            style={{ width: '48px', height: '48px' }}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(212, 175, 55, 0.3)" }}
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
      
      {/* Minimal background grid */}
      {isLoaded && !isMobile && <FloatingGrid />}
    </motion.div>
  );
};

export default Index;
