
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Index from './pages/Index';
import ProjectDetails from './pages/ProjectDetails';
import NotFound from './pages/NotFound';
import GradientBackground from './components/GradientBackground';
import { Toaster } from "./components/ui/toaster";
import { initEmailJS } from './utils/emailHelpers';
import { usePrefersReducedMotion } from './hooks/use-reduced-motion';
import { useIsMobile } from './hooks/use-mobile';
import { useMobileAnimationSettings } from './hooks/use-mobile-animation-settings';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const { getAnimationDuration } = useMobileAnimationSettings();
  
  useEffect(() => {
    // Initialize EmailJS for contact form
    initEmailJS();
    
    // Simulate loading time and then set loading to false
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, isMobile || prefersReducedMotion ? 300 : 1500);
    
    return () => clearTimeout(timer);
  }, [prefersReducedMotion, isMobile]);
  
  // Ensure mobile optimization meta tags are set
  useEffect(() => {
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
    
    // Add preload for critical fonts
    const fontPreload = document.createElement('link');
    fontPreload.rel = 'preload';
    fontPreload.href = '/fonts/inter-var.woff2'; // Adjust to your actual font path
    fontPreload.as = 'font';
    fontPreload.type = 'font/woff2';
    fontPreload.crossOrigin = 'anonymous';
    document.head.appendChild(fontPreload);
  }, []);
  
  const loadingVariants = {
    initial: { opacity: 1 },
    exit: { 
      opacity: 0,
      transition: {
        duration: getAnimationDuration(0.8),
        ease: "easeInOut"
      }
    }
  };

  const mainContentVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        duration: getAnimationDuration(0.8),
        ease: "easeOut"
      }
    }
  };

  // Simplified loading animation for reduced motion or mobile
  if ((prefersReducedMotion || isMobile) && isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-t-gold border-r-gold/40 border-b-gold/20 border-l-gold/5 rounded-full animate-spin"></div>
          <p className="mt-4 text-foreground/80">Loading...</p>
        </div>
      </div>
    );
  }
  
  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        // Enhanced loading animation with more dynamic elements
        <motion.div 
          key="loader"
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
          variants={loadingVariants}
          initial="initial"
          exit="exit"
        >
          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: getAnimationDuration(0.6), ease: "easeOut" }}
          >
            {/* Main spinner */}
            <motion.div 
              className="w-20 h-20 relative"
              animate={isMobile ? {} : { rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            >
              <motion.div 
                className="absolute inset-0 rounded-full border-4 border-t-gold border-r-gold/40 border-b-gold/20 border-l-gold/5"
                animate={isMobile ? {} : { scale: [0.9, 1.1, 0.9] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              />
            </motion.div>
            
            {/* Only show decorative elements on desktop */}
            {!isMobile && !prefersReducedMotion && (
              <>
                <motion.div 
                  className="absolute -top-4 -right-4 w-10 h-10 rounded-full border-2 border-purple/60"
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 0.3 }}
                />
                
                <motion.div 
                  className="absolute -bottom-2 -left-2 w-6 h-6 rounded-full bg-gold/20 backdrop-blur-sm"
                  animate={{ x: [0, 5, -5, 0], y: [0, -5, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                />
              </>
            )}
            
            {/* Text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap text-foreground/80 text-sm"
            >
              Loading...
            </motion.p>
          </motion.div>
        </motion.div>
      ) : (
        // Main application with enhanced enter animation
        <motion.div
          key="app"
          variants={mainContentVariants}
          initial="initial"
          animate="animate"
          className="relative z-10"
        >
          {/* Apply gradient background to the entire app */}
          <GradientBackground />
          
          <Router>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/projects/:id" element={<ProjectDetails />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
          
          <Toaster />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App;
