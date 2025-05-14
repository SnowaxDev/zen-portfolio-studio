
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import HeroSection from '../sections/HeroSection';
import AboutSection from '../sections/AboutSection';
import ProjectsSection from '../sections/ProjectsSection';
import SkillsSection from '../sections/SkillsSection';
import ServicesSection from '../sections/ServicesSection';
import ContactSection from '../sections/ContactSection';
import Footer from '../components/Footer';

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
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="overflow-x-hidden"
      >
        <Header />
        <main>
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <SkillsSection />
          <ServicesSection />
          <ContactSection />
        </main>
        <Footer />
      </motion.div>
    </AnimatePresence>
  );
};

export default Index;
