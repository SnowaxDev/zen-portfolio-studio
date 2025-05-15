
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
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        // Loading animation
        <motion.div 
          key="loader"
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="w-16 h-16 relative"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          >
            <motion.div 
              className="absolute inset-0 rounded-full border-4 border-t-gold border-r-gold/40 border-b-gold/20 border-l-gold/5"
              animate={{ scale: [0.8, 1, 0.8] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      ) : (
        // Main application
        <motion.div
          key="app"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
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
