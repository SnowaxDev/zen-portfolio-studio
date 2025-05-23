
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
          
          {/* Mobile Menu Button */}
          {isMobile && (
            <motion.button
              className="p-3 bg-black/50 rounded-md backdrop-blur-md border border-yellow-500/20 text-foreground shadow-lg relative z-50"
              onClick={handleHamburgerClick}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle mobile menu"
              style={{ minWidth: '48px', minHeight: '48px' }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={shouldReduceAnimations ? { opacity: 0 } : { opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={shouldReduceAnimations ? { opacity: 0 } : { opacity: 0, rotate: 90 }}
                    transition={{ duration: getAnimationDuration(0.2) }}
                  >
                    <X className="h-6 w-6 text-yellow-400" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={shouldReduceAnimations ? { opacity: 0 } : { opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={shouldReduceAnimations ? { opacity: 0 } : { opacity: 0, rotate: -90 }}
                    transition={{ duration: getAnimationDuration(0.2) }}
                  >
                    <Menu className="h-6 w-6 text-yellow-400" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          )}
        </div>
      </motion.header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMobile && mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: getAnimationDuration(0.3) }}
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobile && mobileMenuOpen && (
          <motion.div
            className="fixed top-0 right-0 bottom-0 z-45 w-80 max-w-[85vw] bg-background/95 backdrop-blur-xl border-l border-white/10"
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
          >
            <div className="flex flex-col h-full pt-20 pb-6 px-6">
              <nav className="flex-1">
                <ul className="flex flex-col space-y-2">
                  {navItems.map((item, index) => {
                    const IconComponent = item.icon;
                    const active = isActive(item.href);
                    
                    return (
                      <motion.li 
                        key={item.label}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ 
                          opacity: 1, 
                          x: 0,
                          transition: { 
                            delay: shouldReduceAnimations ? 0 : index * 0.05,
                            duration: getAnimationDuration(0.2)
                          } 
                        }}
                        exit={{ 
                          opacity: 0, 
                          x: 20,
                          transition: { 
                            delay: shouldReduceAnimations ? 0 : (navItems.length - index) * 0.03,
                            duration: getAnimationDuration(0.1)
                          } 
                        }}
                      >
                        <button
                          onClick={() => handleMobileItemClick(item.href)}
                          className={`flex items-center gap-4 px-4 py-4 rounded-lg transition-all duration-200 w-full text-left ${
                            active 
                              ? 'bg-yellow-500/10 text-yellow-400 font-medium shadow-sm border border-yellow-500/20' 
                              : 'text-foreground/80 hover:bg-white/5 hover:text-yellow-300'
                          }`}
                          style={{ minHeight: '56px' }}
                        >
                          <div className={`p-2 rounded-lg ${active ? 'bg-yellow-500/10' : 'bg-white/5'}`}>
                            <IconComponent className={`h-5 w-5 ${active ? 'text-yellow-400' : ''}`} />
                          </div>
                          <span className="text-base font-medium">{item.label}</span>
                        </button>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>
              
              {/* Mobile contact button at bottom of menu */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0 
                }}
                transition={{ delay: 0.2, duration: getAnimationDuration(0.2) }}
                className="mt-6 pt-6 border-t border-white/10"
              >
                <button
                  onClick={() => handleMobileItemClick('#contact')}
                  className="flex items-center justify-center w-full py-4 bg-gradient-to-r from-yellow-500 to-yellow-400 text-background rounded-lg font-medium shadow-lg hover:shadow-xl transition-shadow"
                  style={{ minHeight: '56px' }}
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Contact Me
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
