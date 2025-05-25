
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '../hooks/use-mobile';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem } from './ui/navigation-menu';
import { Home, User, Code, Wrench, Mail, Menu, X } from 'lucide-react';
import { useMobileAnimationSettings } from '../hooks/use-mobile-animation-settings';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const isMobile = useIsMobile();
  const { shouldReduceAnimations, getAnimationDuration } = useMobileAnimationSettings();
  
  // Navigation items with icons
  const navItems = [
    { label: 'Home', href: '#hero', icon: Home },
    { label: 'About', href: '#about', icon: User },
    { label: 'Projects', href: '#projects', icon: Code },
    { label: 'Services', href: '#services', icon: Wrench },
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

  // Animation variants - simplified for mobile
  const headerVariants = {
    initial: shouldReduceAnimations ? { y: 0 } : { y: -100 },
    animate: { y: 0, transition: { duration: getAnimationDuration(0.5), ease: "easeOut" } }
  };

  const mobileMenuVariants = {
    closed: { 
      opacity: 0, 
      x: "100%",
      transition: { 
        duration: getAnimationDuration(0.3), 
        ease: "easeInOut" 
      } 
    },
    open: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: getAnimationDuration(0.3), 
        ease: "easeInOut" 
      } 
    }
  };

  // Simpler variant for mobile
  const navItemVariants = shouldReduceAnimations ? {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  } : {
    hidden: { opacity: 0, x: 20 },
    visible: (i: number) => ({ 
      opacity: 1, 
      x: 0, 
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
  
  // Function to handle menu item click on mobile
  const handleMobileItemClick = (href: string) => {
    setMobileMenuOpen(false);
    
    // Add a small delay before scrolling to allow menu animation to complete
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // Handle hamburger click
  const handleHamburgerClick = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 py-3 md:py-4 transition-all duration-300 ${
          isScrolled || mobileMenuOpen ? 'glassmorphism shadow-lg' : 'bg-transparent'
        }`}
        initial="initial"
        animate="animate"
        variants={headerVariants}
      >
        <div className="container-custom flex items-center justify-between">
          <motion.a 
            href="#hero" 
            className="text-xl font-bold text-gradient relative group z-10"
            whileHover={isMobile ? {} : { scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              if (isMobile) {
                e.preventDefault();
                handleMobileItemClick('#hero');
              }
            }}
          >
            <span>John.dev</span>
            <motion.span 
              className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-500"
              initial={{ width: 0 }}
              animate={{ width: isActive('#hero') ? "100%" : 0 }}
              transition={{ duration: getAnimationDuration(0.3) }}
            />
            {!isMobile && (
              <motion.span 
                className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400"
                initial={{ width: "0%" }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            )}
          </motion.a>
          
          {/* Desktop Navigation - only render when not mobile */}
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
                              ? 'bg-yellow-500/10 text-yellow-400 font-medium' 
                              : 'text-foreground/80 hover:bg-yellow-500/5 hover:text-yellow-300'
                          }`}
                        >
                          <IconComponent className={`mr-2 h-4 w-4 ${active ? 'text-yellow-400' : ''}`} />
                          <span>{item.label}</span>
                          {active && (
                            <motion.div
                              className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-500 mx-2"
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
          
          {/* Mobile Menu Button - Fixed */}
          {isMobile && (
            <motion.button
              className="p-2 bg-black/40 backdrop-blur-md rounded-lg border border-yellow-500/20 text-foreground shadow-lg relative z-50"
              onClick={handleHamburgerClick}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle mobile menu"
              style={{ minWidth: '44px', minHeight: '44px' }}
              whileTap={{ scale: 0.95 }}
              animate={mobileMenuOpen ? { rotate: 90 } : { rotate: 0 }}
              transition={{ duration: 0.2 }}
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0, rotate: -180 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 180 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-5 w-5 text-yellow-400" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0, rotate: 180 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -180 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-5 w-5 text-yellow-400" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          )}
        </div>
      </motion.header>

      {/* Mobile Navigation Overlay - Improved */}
      <AnimatePresence>
        {isMobile && mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Navigation Menu - Completely Redesigned */}
      <AnimatePresence>
        {isMobile && mobileMenuOpen && (
          <motion.div
            className="fixed top-0 right-0 bottom-0 z-45 w-72 max-w-[80vw] bg-black/95 backdrop-blur-xl border-l border-yellow-500/20"
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
          >
            <div className="flex flex-col h-full pt-20 pb-6 px-4">
              <nav className="flex-1">
                <ul className="flex flex-col space-y-1">
                  {navItems.map((item, index) => {
                    const IconComponent = item.icon;
                    const active = isActive(item.href);
                    
                    return (
                      <motion.li 
                        key={item.label}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ 
                          opacity: 1, 
                          x: 0,
                          transition: { 
                            delay: index * 0.08,
                            duration: 0.3,
                            ease: "easeOut"
                          } 
                        }}
                        exit={{ 
                          opacity: 0, 
                          x: 30,
                          transition: { 
                            delay: (navItems.length - index) * 0.05,
                            duration: 0.2
                          } 
                        }}
                      >
                        <motion.button
                          onClick={() => handleMobileItemClick(item.href)}
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 w-full text-left group ${
                            active 
                              ? 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/30 shadow-lg' 
                              : 'text-white/80 hover:bg-white/5 hover:text-yellow-300 border border-transparent'
                          }`}
                          whileHover={{ x: 4 }}
                          whileTap={{ scale: 0.96 }}
                        >
                          <div className={`p-2 rounded-lg transition-colors ${
                            active ? 'bg-yellow-500/20' : 'bg-white/5 group-hover:bg-yellow-500/10'
                          }`}>
                            <IconComponent className={`h-4 w-4 ${active ? 'text-yellow-400' : 'text-white/70'}`} />
                          </div>
                          <span className="text-sm font-medium">{item.label}</span>
                          {active && (
                            <motion.div
                              className="ml-auto w-2 h-2 bg-yellow-400 rounded-full"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 400 }}
                            />
                          )}
                        </motion.button>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>
              
              {/* Mobile contact button at bottom of menu - Improved */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="mt-6 pt-4 border-t border-white/10"
              >
                <motion.button
                  onClick={() => handleMobileItemClick('#contact')}
                  className="flex items-center justify-center w-full py-3 bg-gradient-to-r from-yellow-500 to-yellow-400 text-black rounded-xl font-medium shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Me
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
