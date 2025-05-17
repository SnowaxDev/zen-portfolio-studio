
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '../hooks/use-mobile';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem } from './ui/navigation-menu';
import { Home, User, Code, Wrench, Mail, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const isMobile = useIsMobile();
  
  // Navigation items with icons
  const navItems = [
    { label: 'Home', href: '#hero', icon: Home },
    { label: 'About', href: '#about', icon: User },
    { label: 'Projects', href: '#projects', icon: Code },
    { label: 'Skills', href: '#skills', icon: Wrench },
    { label: 'Contact', href: '#contact', icon: Mail }
  ];

  // Handle scroll event for header styling and active section
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      
      // Determine active section based on scroll position
      const sections = document.querySelectorAll('section[id]');
      let currentSection = 'hero';
      
      sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionId = section.getAttribute('id');
        
        if (sectionTop < window.innerHeight / 3 && sectionId) {
          currentSection = sectionId;
        }
      });
      
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation variants
  const headerVariants = {
    initial: { y: -100 },
    animate: { y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const mobileMenuVariants = {
    closed: { opacity: 0, y: "-100%" },
    open: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } }
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0, 
      transition: { 
        delay: i * 0.1,
        duration: 0.3
      } 
    })
  };

  const isActive = (href: string) => {
    const sectionId = href.replace('#', '');
    return activeSection === sectionId;
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 py-3 md:py-4 transition-all duration-300 ${
        isScrolled ? 'glassmorphism shadow-lg' : 'bg-transparent'
      }`}
      initial="initial"
      animate="animate"
      variants={headerVariants}
    >
      <div className="container-custom flex items-center justify-between">
        <motion.a 
          href="#hero" 
          className="text-xl font-bold text-gradient relative group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>John.dev</span>
          <motion.span 
            className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent"
            initial={{ width: 0 }}
            animate={{ width: isActive('#hero') ? "100%" : 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span 
            className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary"
            initial={{ width: "0%" }}
            whileHover={{ width: "100%" }}
            transition={{ duration: 0.3 }}
          />
        </motion.a>
        
        {/* Desktop Navigation */}
        {!isMobile && (
          <NavigationMenu>
            <NavigationMenuList className="flex space-x-1">
              {navItems.map((item, index) => {
                const IconComponent = item.icon;
                const active = isActive(item.href);
                
                return (
                  <NavigationMenuItem key={item.label}>
                    <motion.div
                      custom={index}
                      initial="hidden"
                      animate="visible"
                      variants={navItemVariants}
                    >
                      <a
                        href={item.href}
                        className={`flex items-center px-4 py-2 rounded-md transition-all duration-300 ${
                          active 
                            ? 'bg-accent/10 text-accent font-medium' 
                            : 'text-foreground/80 hover:bg-accent/5 hover:text-primary'
                        }`}
                      >
                        <IconComponent className={`mr-2 h-4 w-4 ${active ? 'text-accent' : ''}`} />
                        <span>{item.label}</span>
                        {active && (
                          <motion.div
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent mx-2"
                            layoutId="activeSection"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          />
                        )}
                      </a>
                    </motion.div>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        )}
        
        {/* Mobile Menu Button - Enhanced for better visibility */}
        {isMobile && (
          <div className="flex items-center">
            <motion.button
              className="p-2 bg-card/50 rounded-md backdrop-blur-md border border-white/10 text-foreground shadow-lg"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle mobile menu"
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        )}
      </div>

      {/* Improved Mobile Navigation - Full screen with better styling */}
      <AnimatePresence>
        {isMobile && mobileMenuOpen && (
          <motion.div
            className="fixed top-[49px] left-0 right-0 bottom-0 bg-background/95 backdrop-blur-xl z-40 flex flex-col justify-start pt-6 overflow-y-auto"
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
          >
            <nav className="container-custom">
              <ul className="flex flex-col space-y-2.5">
                {navItems.map((item, index) => {
                  const IconComponent = item.icon;
                  const active = isActive(item.href);
                  
                  return (
                    <motion.li 
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ 
                        opacity: 1, 
                        x: 0,
                        transition: { delay: index * 0.08 } 
                      }}
                      exit={{ 
                        opacity: 0, 
                        x: -20,
                        transition: { delay: (navItems.length - index) * 0.05 } 
                      }}
                    >
                      <a
                        href={item.href}
                        className={`flex items-center gap-3 px-5 py-3.5 rounded-lg transition-all ${
                          active 
                            ? 'bg-gold/10 text-gold font-medium shadow-sm' 
                            : 'text-foreground/80 hover:bg-white/5'
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <div className={`p-2 rounded-lg ${active ? 'bg-gold/10' : 'bg-white/5'}`}>
                          <IconComponent className={`h-5 w-5 ${active ? 'text-gold' : ''}`} />
                        </div>
                        <span className="text-lg">{item.label}</span>
                      </a>
                    </motion.li>
                  );
                })}
              </ul>
              
              {/* Mobile contact button at bottom of menu */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-8 pt-6 border-t border-white/10"
              >
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center w-full py-3.5 bg-gradient-to-r from-gold to-gold-light text-background rounded-lg font-medium shadow-lg"
                >
                  Kontaktujte Mě
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
