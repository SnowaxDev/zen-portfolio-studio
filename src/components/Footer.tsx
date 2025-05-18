
import React from 'react';
import { motion } from 'framer-motion';
import { socialLinks } from '../lib/section-data';
import { AspectRatio } from './ui/aspect-ratio';
import { ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  // Simple fade-up animation for footer elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    },
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  
  return (
    <footer className="bg-black py-12 border-t border-yellow-500/10 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
      </div>
      
      {/* Scroll to top button */}
      <div className="absolute right-8 -top-6 z-50">
        <motion.button
          onClick={scrollToTop}
          className="bg-yellow-500 text-black p-3 rounded-full hover:bg-yellow-400 transition-colors duration-300 shadow-lg"
          whileHover={{ y: -3, boxShadow: "0 8px 20px -5px rgba(234, 179, 8, 0.5)" }}
          whileTap={{ scale: 0.94 }}
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </motion.button>
      </div>
      
      <motion.div 
        className="container mx-auto px-4 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="flex flex-col md:flex-row justify-between items-start">
          {/* Logo and social links */}
          <motion.div variants={itemVariants} className="mb-8 md:mb-0">
            <a href="#hero" className="text-2xl font-bold text-yellow-400 hover:text-yellow-300 transition-colors">
              Jan.dev
            </a>
            <p className="text-foreground/70 mt-2">
              Tvořím výjimečné digitální zážitky
            </p>
            
            <div className="mt-5 flex space-x-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.url}
                    className="bg-yellow-500/5 hover:bg-yellow-500/15 p-2.5 rounded-lg text-yellow-400 hover:text-yellow-300 transition-colors duration-300"
                    whileHover={{ 
                      scale: 1.1,
                      rotate: [0, -5, 5, 0],
                      transition: { duration: 0.3 }
                    }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.name}
                    variants={itemVariants}
                  >
                    <Icon size={18} />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
          
          {/* Quick links and contact */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-2 gap-8 md:gap-12">
            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-bold mb-3 text-yellow-500">Navigace</h3>
              <ul className="space-y-2">
                {['O mně', 'Dovednosti', 'Projekty', 'Služby', 'Kontakt'].map((item, i) => (
                  <li key={i}>
                    <motion.a 
                      href={`#${item.toLowerCase().replace(' ', '-')}`}
                      className="text-foreground/70 hover:text-yellow-400 transition-colors text-sm flex items-center"
                      whileHover={{ x: 3, transition: { duration: 0.2 } }}
                    >
                      <span className="h-1 w-0 bg-yellow-500 mr-0 opacity-0 transition-all duration-300 group-hover:w-2 group-hover:mr-2 group-hover:opacity-100"></span>
                      {item}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Contact Info */}
            <div>
              <h3 className="text-sm font-bold mb-3 text-yellow-500">Kontakt</h3>
              <ul className="space-y-2">
                <li>
                  <motion.a 
                    href="mailto:info@jannovak.cz" 
                    className="text-foreground/70 hover:text-yellow-400 transition-colors text-sm flex items-center"
                    whileHover={{ x: 3, transition: { duration: 0.2 } }}
                  >
                    info@jannovak.cz
                  </motion.a>
                </li>
                <li>
                  <motion.a 
                    href="tel:+420123456789" 
                    className="text-foreground/70 hover:text-yellow-400 transition-colors text-sm flex items-center"
                    whileHover={{ x: 3, transition: { duration: 0.2 } }}
                  >
                    +420 123 456 789
                  </motion.a>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
        
        {/* Copyright */}
        <motion.div 
          className="mt-10 pt-6 text-center border-t border-yellow-500/10"
          variants={itemVariants}
        >
          <p className="text-sm text-foreground/50">
            &copy; {currentYear} Jan Novák | Všechna práva vyhrazena
          </p>
        </motion.div>
      </motion.div>
      
      {/* Yellow accent at bottom */}
      <motion.div 
        className="absolute bottom-0 left-0 w-full h-1 opacity-10"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <AspectRatio ratio={16/1}>
          <div className="w-full h-full bg-gradient-to-r from-yellow-400/0 via-yellow-400 to-yellow-400/0" />
        </AspectRatio>
      </motion.div>
    </footer>
  );
};

export default Footer;
