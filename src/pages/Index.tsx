
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import HeroSection from '../sections/HeroSection';
import AboutSection from '../sections/AboutSection';
import ProjectsSection from '../sections/ProjectsSection';
import SkillsSection from '../sections/SkillsSection';
import ServicesSection from '../sections/ServicesSection';
import ContactSection from '../sections/ContactSection';
import Footer from '../components/Footer';

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
  // Update metadata to Czech
  useEffect(() => {
    document.title = "Jan Novák | Frontend Vývojář & UI/UX Designer";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Portfolio web pro Jana Nováka, Frontend Vývojáře a UI/UX Designera specializujícího se na React a Next.js aplikace.");
    }
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
          <ServicesSection />
        </motion.div>
        
        <motion.div variants={sectionVariants}>
          <ContactSection />
        </motion.div>
      </main>
      <Footer />
      
      {/* Scroll indicator */}
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
    </motion.div>
  );
};

export default Index;
