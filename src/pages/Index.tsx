
import React, { useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Header from '../components/Header';
import HeroSection from '../sections/HeroSection';
import AboutSection from '../sections/AboutSection';
import ProjectsSection from '../sections/ProjectsSection';
import MyProjectsSection from '../sections/MyProjectsSection';
import SkillsSection from '../sections/SkillsSection';
import ServicesSection from '../sections/ServicesSection';
import ContactSection from '../sections/ContactSection';
import Footer from '../components/Footer';
import { useIsMobile } from '../hooks/use-mobile';

// Enhanced page transition variants with improved timing and easing
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

// Enhanced section variants with more natural animation
const sectionVariants = {
  initial: { opacity: 0, y: 40 },
  animate: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

const Index = () => {
  const isMobile = useIsMobile();
  
  // Get scroll progress for scroll-based animations
  const { scrollYProgress } = useScroll();
  const smoothScrollProgress = useSpring(scrollYProgress, { 
    stiffness: 100, 
    damping: 30, 
    restDelta: 0.001 
  });
  
  // Update metadata to Czech
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
      
      <main className="flex-grow">
        <motion.div 
          variants={sectionVariants}
          initial="initial"
          animate="animate"
          viewport={{ once: true }}
        >
          <HeroSection />
        </motion.div>
        
        <motion.div 
          variants={sectionVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
        >
          <AboutSection />
        </motion.div>
        
        {/* Replace ProjectsSection with MyProjectsSection */}
        <motion.div 
          variants={sectionVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
        >
          <MyProjectsSection />
        </motion.div>
        
        <motion.div 
          variants={sectionVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
        >
          <SkillsSection />
        </motion.div>
        
        <motion.div 
          variants={sectionVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
        >
          <ServicesSection />
        </motion.div>
        
        <motion.div 
          variants={sectionVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
        >
          <ContactSection />
        </motion.div>
      </main>
      
      <Footer />
      
      {/* Enhanced desktop scroll indicator */}
      {!isMobile && (
        <motion.div 
          className="fixed bottom-5 right-5 flex flex-col items-center z-50"
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
      
      {/* Enhanced mobile floating buttons */}
      {isMobile && (
        <motion.div
          className="fixed bottom-5 right-5 z-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <motion.a 
            href="#contact"
            className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-gold to-gold-light rounded-full shadow-lg shadow-gold/20"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Contact Me"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-background" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </motion.a>
        </motion.div>
      )}
      
      {/* Decorative elements */}
      <div className="fixed top-20 left-10 w-32 h-32 bg-purple/10 rounded-full filter blur-3xl opacity-30 animate-pulse pointer-events-none" />
      <div className="fixed bottom-40 right-10 w-48 h-48 bg-gold/10 rounded-full filter blur-3xl opacity-20 animate-pulse pointer-events-none" />
    </motion.div>
  );
};

export default Index;
