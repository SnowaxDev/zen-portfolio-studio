
import React from 'react';
import { motion } from 'framer-motion';
import { socialLinks } from '../lib/section-data';
import { AspectRatio } from './ui/aspect-ratio';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  // Simple fade-up animation for footer elements
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    },
  };
  
  return (
    <footer className="bg-black py-12 border-t border-yellow-500/10 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
      </div>
      
      <motion.div 
        className="container-custom relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div variants={itemVariants} className="mb-8 md:mb-0 text-center md:text-left">
            <a href="#hero" className="text-2xl font-bold text-yellow-400 hover:text-yellow-300 transition-colors">
              Jan.dev
            </a>
            <p className="text-foreground/70 mt-2 max-w-sm">
              Tvořím výjimečné digitální zážitky
            </p>
            
            <div className="mt-5 flex justify-center md:justify-start space-x-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.url}
                    className="bg-yellow-500/5 hover:bg-yellow-500/15 p-2.5 rounded-lg text-yellow-400 hover:text-yellow-300 transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
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
          
          <motion.div 
            variants={itemVariants}
            className="bg-black/60 backdrop-blur-md border border-yellow-500/10 rounded-lg p-5 mb-8 md:mb-0 w-full md:w-auto"
          >
            <div className="flex flex-col md:flex-row gap-8 md:gap-16">
              {/* Quick Links */}
              <div className="flex flex-col">
                <h3 className="text-sm font-bold mb-3 text-yellow-500">Navigace</h3>
                <ul className="grid grid-cols-2 md:grid-cols-1 gap-2">
                  {['O mně', 'Dovednosti', 'Projekty', 'Služby', 'Kontakt'].map((item, i) => (
                    <li key={i}>
                      <a 
                        href={`#${item.toLowerCase().replace(' ', '-')}`}
                        className="text-foreground/70 hover:text-yellow-400 transition-colors text-sm"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Contact Info */}
              <div className="flex flex-col">
                <h3 className="text-sm font-bold mb-3 text-yellow-500">Kontakt</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="mailto:info@jannovak.cz" className="text-foreground/70 hover:text-yellow-400 transition-colors text-sm">
                      info@jannovak.cz
                    </a>
                  </li>
                  <li>
                    <a href="tel:+420123456789" className="text-foreground/70 hover:text-yellow-400 transition-colors text-sm">
                      +420 123 456 789
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-8 border-t border-yellow-500/10 pt-6 text-center"
          variants={itemVariants}
        >
          <p className="text-sm text-foreground/50">
            &copy; {currentYear} Jan Novák. Všechna práva vyhrazena.
          </p>
        </motion.div>
      </motion.div>
      
      {/* Simple yellow accent at bottom */}
      <motion.div 
        className="absolute bottom-0 left-0 w-full h-10 opacity-5 overflow-hidden z-0 pointer-events-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.05 }}
        viewport={{ once: true }}
      >
        <AspectRatio ratio={16/1}>
          <div className="w-full h-full bg-gradient-to-r from-yellow-400 via-transparent to-yellow-400" />
        </AspectRatio>
      </motion.div>
    </footer>
  );
};

export default Footer;
