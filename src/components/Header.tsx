
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '../hooks/use-mobile';
import { useMobileOptimizations } from '../hooks/use-mobile-optimizations';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem } from './ui/navigation-menu';
import { Home, User, Code, Wrench, Mail, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const isMobile = useIsMobile();
  const { 
    isReducedMotion, 
    getAnimationDuration, 
    getMobileSpacing,
    getTouchTargetSize 
  } = useMobileOptimizations();
  
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

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mobile-optimized animation variants
  const headerVariants = {
    initial: isReducedMotion ? { y: 0 } : { y: isMobile ? -50 : -100 },
    animate: { 
      y: 0, 
      transition: { 
        duration: getAnimationDuration(isMobile ? 0.3 : 0.5), 
        ease: "easeOut" 
      } 
    }
  };

  const mobileMenuVariants = {
    closed: { 
      opacity: 0, 
      height: 0,
      transition: { 
        duration: getAnimationDuration(0.2),
        ease: "easeOut" 
      }
    },
    open: { 
      opacity: 1, 
      height: "auto",
      transition: { 
        duration: getAnimationDuration(0.3), 
        ease: "easeOut" 
      } 
    }
  };

  const navItemVariants = isReducedMotion ? {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  } : {
    hidden: { opacity: 0, y: -5 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0, 
      transition: { 
        delay: i * (isMobile ? 0.05 : 0.1),
        duration: getAnimationDuration(0.2)
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
    }, isMobile ? 200 : 300);
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${getMobileSpacing('py-3')} md:py-4 ${
        isScrolled || mobileMenuOpen ? 'glassmorphism shadow-lg' : 'bg-transparent'
      }`}
      initial="initial"
      animate="animate"
      variants={headerVariants}
    >
      <div className="container-custom flex items-center justify-between">
        <motion.a 
          href="#hero" 
          className="text-lg md:text-xl font-bold text-gradient relative group z-10"
          whileHover={isMobile ? {} : { scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
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
          <div className="flex items-center">
            <motion.button
              className={`bg-black/60 rounded-lg backdrop-blur-md border border-yellow-500/20 text-foreground shadow-lg transition-colors ${getTouchTargetSize()}`}
              style={{ minWidth: '48px', minHeight: '48px', padding: '12px' }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle mobile menu"
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={isReducedMotion ? { opacity: 0 } : { opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={isReducedMotion ? { opacity: 0 } : { opacity: 0, rotate: 90 }}
                    transition={{ duration: getAnimationDuration(0.15) }}
                  >
                    <X className="h-5 w-5 text-yellow-400" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={isReducedMotion ? { opacity: 0 } : { opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={isReducedMotion ? { opacity: 0 } : { opacity: 0, rotate: -90 }}
                    transition={{ duration: getAnimationDuration(0.15) }}
                  >
                    <Menu className="h-5 w-5 text-yellow-400" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        )}
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobile && mobileMenuOpen && (
          <motion.div
            className="fixed top-[60px] left-0 right-0 bottom-0 bg-background/96 backdrop-blur-xl z-40 overflow-hidden"
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
          >
            <nav className="container-custom pt-4">
              <ul className="flex flex-col space-y-2">
                {navItems.map((item, index) => {
                  const IconComponent = item.icon;
                  const active = isActive(item.href);
                  
                  return (
                    <motion.li 
                      key={item.label}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ 
                        opacity: 1, 
                        x: 0,
                        transition: { 
                          delay: isReducedMotion ? 0 : index * 0.03,
                          duration: getAnimationDuration(0.15)
                        } 
                      }}
                      exit={{ 
                        opacity: 0, 
                        x: -10,
                        transition: { 
                          delay: isReducedMotion ? 0 : (navItems.length - index) * 0.02,
                          duration: getAnimationDuration(0.1)
                        } 
                      }}
                    >
                      <a
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-4 rounded-lg transition-all mobile-touch-target ${
                          active 
                            ? 'bg-yellow-500/10 text-yellow-400 font-medium shadow-sm' 
                            : 'text-foreground/80 hover:bg-white/5'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleMobileItemClick(item.href);
                        }}
                      >
                        <div className={`p-2 rounded-lg ${active ? 'bg-yellow-500/10' : 'bg-white/5'}`}>
                          <IconComponent className={`h-5 w-5 ${active ? 'text-yellow-400' : ''}`} />
                        </div>
                        <span className="text-base">{item.label}</span>
                      </a>
                    </motion.li>
                  );
                })}
              </ul>
              
              {/* Mobile contact button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: getAnimationDuration(0.15), duration: getAnimationDuration(0.2) }}
                className="mt-6 pt-4 border-t border-white/10"
              >
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    handleMobileItemClick('#contact');
                  }}
                  className="flex items-center justify-center w-full py-4 bg-gradient-to-r from-yellow-500 to-yellow-400 text-background rounded-lg font-medium shadow-lg mobile-touch-target"
                >
                  Contact Me
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
