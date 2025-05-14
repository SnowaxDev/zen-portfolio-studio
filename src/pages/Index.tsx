
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import HeroSection from '../sections/HeroSection';
import AboutSection from '../sections/AboutSection';
import ProjectsSection from '../sections/ProjectsSection';
import SkillsSection from '../sections/SkillsSection';
import ContactSection from '../sections/ContactSection';
import Footer from '../components/Footer';
import { useIsMobile } from '../hooks/use-mobile';

// Page transition variants
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8, 
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.2
    }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: { 
      duration: 0.6, 
      ease: [0.22, 1, 0.36, 1] 
    }
  }
};

const sectionVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: {
      duration: 0.6,
    }
  }
};

const Index = () => {
  const isMobile = useIsMobile();
  
  // Update metadata
  useEffect(() => {
    document.title = "Jan Novák | Frontend Vývojář & UI/UX Designer";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Portfolio web Jana Nováka, Frontend Vývojáře a UI/UX Designera specializujícího se na React a Next.js aplikace.");
    }
    
    // Add viewport meta tag to ensure proper mobile rendering
    let viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) {
      viewport = document.createElement('meta');
      viewport.setAttribute('name', 'viewport');
      document.getElementsByTagName('head')[0].appendChild(viewport);
    }
    viewport.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=5');
    
    // Preload key resources
    const preloadLinks = [
      { rel: 'preload', as: 'image', href: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d' },
      { rel: 'preload', as: 'font', href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;700&display=swap' }
    ];
    
    preloadLinks.forEach(linkData => {
      const link = document.createElement('link');
      Object.entries(linkData).forEach(([key, value]) => {
        link.setAttribute(key, value);
      });
      document.head.appendChild(link);
    });
  }, []);

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="overflow-x-hidden"
    >
      <Header />
      <main>
        <motion.div variants={sectionVariants}>
          <HeroSection />
        </motion.div>
        
        <motion.div variants={sectionVariants}>
          <AboutSection />
        </motion.div>
        
        <motion.div variants={sectionVariants}>
          <ProjectsSection />
        </motion.div>
        
        <motion.div variants={sectionVariants}>
          <SkillsSection />
        </motion.div>
        
        <motion.div variants={sectionVariants}>
          <ContactSection />
        </motion.div>
      </main>
      <Footer />
      
      {/* Scroll indicator - shows only on desktop */}
      {!isMobile && (
        <motion.div 
          className="fixed bottom-5 right-5 flex flex-col items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <div className="bg-card/80 backdrop-blur-sm p-2.5 rounded-full border border-white/10 shadow-lg">
            <motion.div 
              className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"
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
          </div>
        </motion.div>
      )}
      
      {/* Mobile-specific floating buttons */}
      {isMobile && (
        <motion.div
          className="fixed bottom-5 right-5 z-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <a 
            href="#contact"
            className="flex items-center justify-center w-12 h-12 bg-primary rounded-full shadow-lg"
            aria-label="Kontaktujte mě"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Index;
