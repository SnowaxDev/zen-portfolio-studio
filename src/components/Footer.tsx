
import React from 'react';
import { motion } from 'framer-motion';
import { socialLinks } from '../lib/section-data';
import ScrollReveal from './ScrollReveal';
import { AspectRatio } from './ui/aspect-ratio';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    },
  };
  
  return (
    <footer className="bg-secondary/30 py-12 border-t border-gold/5">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-6 md:mb-0"
          >
            <a href="#hero" className="text-2xl font-bold text-gold">
              Jan.dev
            </a>
            <p className="text-foreground/70 mt-2">
              Tvořím výjimečné digitální zážitky
            </p>
            
            <ScrollReveal 
              className="mt-5 flex space-x-3"
              width="100%"
              delay={0.2}
              direction="up"
              distance={10}
            >
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.url}
                    className="bg-card/50 hover:bg-card p-2 rounded-lg text-foreground/60 hover:text-gold transition-colors duration-300"
                    whileHover={{ 
                      scale: 1.1,
                      boxShadow: "0 0 15px 0 rgba(212, 175, 55, 0.3)"
                    }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={social.name}
                  >
                    <Icon size={20} />
                  </motion.a>
                );
              })}
            </ScrollReveal>
          </motion.div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col items-center md:items-end"
          >
            <div className="flex flex-col md:flex-row gap-8 md:gap-16 mb-8">
              {/* Quick Links */}
              <motion.div variants={itemVariants} className="flex flex-col">
                <h3 className="text-sm uppercase font-bold mb-3 text-gold/70">Navigace</h3>
                <ul className="space-y-2">
                  {['O mně', 'Dovednosti', 'Projekty', 'Služby', 'Kontakt'].map((item, i) => (
                    <li key={i}>
                      <a 
                        href={`#${item.toLowerCase().replace(' ', '-')}`}
                        className="text-foreground/60 hover:text-gold transition-colors"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
              
              {/* Contact Info */}
              <motion.div variants={itemVariants} className="flex flex-col">
                <h3 className="text-sm uppercase font-bold mb-3 text-gold/70">Kontakt</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="mailto:info@jannovak.cz" className="text-foreground/60 hover:text-gold transition-colors">
                      info@jannovak.cz
                    </a>
                  </li>
                  <li>
                    <a href="tel:+420123456789" className="text-foreground/60 hover:text-gold transition-colors">
                      +420 123 456 789
                    </a>
                  </li>
                  <li className="text-foreground/60">
                    Praha, Česká republika
                  </li>
                </ul>
              </motion.div>
            </div>
            
            <motion.div variants={itemVariants}>
              <div className="bg-gradient-to-r from-gold/10 to-purple/10 rounded-lg p-4 backdrop-blur-sm">
                <p className="text-sm text-foreground/70">
                  &copy; {currentYear} Jan Novák. Všechna práva vyhrazena.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Footer background decoration */}
      <motion.div 
        className="absolute bottom-0 left-0 w-full h-20 opacity-5 overflow-hidden z-0 pointer-events-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.05 }}
        viewport={{ once: true }}
      >
        <AspectRatio ratio={16/1}>
          <div className="w-full h-full bg-gradient-to-r from-gold via-transparent to-purple" />
        </AspectRatio>
      </motion.div>
    </footer>
  );
};

export default Footer;
