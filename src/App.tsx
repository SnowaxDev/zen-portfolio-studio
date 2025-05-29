
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
    
    // Optimize loading time based on device
    const loadingTime = isMobile ? 800 : 1200;
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, loadingTime);
    
    return () => clearTimeout(timer);
  }, [isMobile]);
  
  // Ensure mobile optimization meta tags are set
  useEffect(() => {
    // Add viewport meta tag to ensure proper mobile rendering
    let viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) {
      viewport = document.createElement('meta');
      viewport.setAttribute('name', 'viewport');
      document.getElementsByTagName('head')[0].appendChild(viewport);
    }
    viewport.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');
    
    // Add theme-color meta tag for mobile browser UI
    let themeColor = document.querySelector('meta[name="theme-color"]');
    if (!themeColor) {
      themeColor = document.createElement('meta');
      themeColor.setAttribute('name', 'theme-color');
      document.getElementsByTagName('head')[0].appendChild(themeColor);
    }
    themeColor.setAttribute('content', '#0A0914');
  }, []);
  
  const loadingVariants = {
    initial: { opacity: 1 },
    exit: { 
      opacity: 0,
      transition: {
        duration: getAnimationDuration(0.6),
        ease: "easeInOut"
      }
    }
  };

  const mainContentVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        duration: getAnimationDuration(0.6),
        ease: "easeOut"
      }
    }
  };

  // Enhanced loading screen with better mobile performance
  if (isLoading) {
    return (
      <motion.div 
        key="loader"
        className="fixed inset-0 z-50 flex items-center justify-center bg-background"
        variants={loadingVariants}
        initial="initial"
        exit="exit"
      >
        <motion.div 
          className="relative flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Modern loading spinner */}
          <div className="relative w-16 h-16 mb-6">
            <motion.div 
              className="absolute inset-0 rounded-full border-4 border-transparent border-t-gold border-r-gold/60"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />
            <motion.div 
              className="absolute inset-2 rounded-full border-2 border-transparent border-b-purple border-l-purple/60"
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            />
          </div>
          
          {/* Loading text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-xl font-semibold text-gold mb-2">Dusanko.dev</h2>
            <p className="text-foreground/60 text-sm">Loading portfolio...</p>
          </motion.div>
          
          {/* Progress dots */}
          <motion.div 
            className="flex space-x-1 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-gold/40 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.4, 1, 0.4]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    );
  }
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="app"
        variants={mainContentVariants}
        initial="initial"
        animate="animate"
        className="relative z-10"
      >
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
    </AnimatePresence>
  );
}

export default App;
