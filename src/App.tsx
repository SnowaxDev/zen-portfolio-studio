
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Index from './pages/Index';
import ProjectDetails from './pages/ProjectDetails';
import NotFound from './pages/NotFound';
import GradientBackground from './components/GradientBackground';
import { Toaster } from "./components/ui/toaster";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading time and then set loading to false
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Increased to make animation more noticeable
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        // Enhanced loading animation with more dynamic elements
        <motion.div 
          key="loader"
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Main spinner */}
            <motion.div 
              className="w-20 h-20 relative"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            >
              <motion.div 
                className="absolute inset-0 rounded-full border-4 border-t-gold border-r-gold/40 border-b-gold/20 border-l-gold/5"
                animate={{ scale: [0.9, 1.1, 0.9] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              />
            </motion.div>
            
            {/* Secondary elements */}
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
            
            {/* Text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap text-foreground/80 text-sm"
            >
              Načítání...
            </motion.p>
          </motion.div>
        </motion.div>
      ) : (
        // Main application with enhanced enter animation
        <motion.div
          key="app"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
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
