import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, User, Briefcase, Code, Phone, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMobileAnimationSettings } from '@/hooks/use-mobile-animation-settings';

interface HeaderProps {
  isScrolled: boolean;
  handleNavClick: () => void;
}

const navigationItems = [
  { href: "#home", label: "Domů", icon: Home },
  { href: "#about", label: "O mně", icon: User },
  { href: "#projects", label: "Projekty", icon: Briefcase },
  { href: "#skills", label: "Dovednosti", icon: Code },
  { href: "#services", label: "Služby", icon: Settings },
  { href: "#contact", label: "Kontakt", icon: Phone },
];

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { shouldReduceAnimations } = useMobileAnimationSettings();

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 50;
      setIsScrolled(window.scrollY > scrollThreshold);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial scroll position on mount

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavClick = () => {
    // Close mobile menu after clicking a link
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <motion.header 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled 
            ? "bg-black/90 backdrop-blur-lg border-b border-gold/20 shadow-lg" 
            : "bg-transparent"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="text-xl font-bold text-white">
            <span className="text-gold">My</span>Portfolio
          </a>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigationItems.map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                className="text-white hover:text-gold transition-colors duration-300"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNavClick}
              >
                {item.label}
              </motion.a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-white hover:text-gold transition-colors duration-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </motion.header>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className={cn(
              "fixed inset-0 z-50 bg-black/95 backdrop-blur-lg",
              "flex flex-col items-center justify-center"
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                "absolute top-6 right-6 p-2 rounded-full",
                "bg-gold/20 text-gold hover:bg-gold/30 transition-colors"
              )}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={24} />
            </motion.button>

            {/* Navigation items */}
            <motion.nav className="flex flex-col items-center space-y-8">
              {navigationItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleNavClick();
                  }}
                  className="flex items-center space-x-4 text-xl text-white hover:text-gold transition-colors"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  whileHover={{ scale: 1.05, x: 10 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <item.icon size={24} className="text-gold" />
                  <span>{item.label}</span>
                </motion.a>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
