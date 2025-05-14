
import React from 'react';
import { motion } from 'framer-motion';
import { socialLinks } from '../lib/section-data';
import ScrollReveal from './ScrollReveal';
import { AspectRatio } from './ui/aspect-ratio';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

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
    <footer className="relative">
      {/* Newsletter Section */}
      <div className="bg-card/90 py-12 border-t border-white/5 relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5" />
        <div className="container-custom relative z-10">
          <ScrollReveal direction="up" threshold={0.2} className="max-w-2xl mx-auto text-center">
            <h3 className="text-xl md:text-2xl font-bold mb-3 text-gradient">
              Odebírat novinky
            </h3>
            <p className="text-foreground/70 mb-6 max-w-xl mx-auto text-sm">
              Přihlaste se k odběru novinek o webových technologiích a mých projektech.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Váš email"
                className="px-4 py-2 bg-background/50 border border-white/10 rounded-lg flex-grow text-sm"
              />
              <Button className="whitespace-nowrap text-sm flex items-center">
                Odebírat <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </div>
      
      {/* Main Footer */}
      <div className="bg-background py-10 border-t border-primary/5">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {/* Brand and description */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-1"
            >
              <a href="#hero" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                Jan<span className="font-light">.dev</span>
              </a>
              <p className="text-foreground/70 mt-2 mb-3 text-sm">
                Vytvářím výjimečné digitální zážitky pro klienty, kteří chtějí vyniknout.
              </p>
              
              <ScrollReveal 
                className="mt-4 flex space-x-2"
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
                      className="bg-card/50 hover:bg-card p-1.5 rounded-md text-foreground/60 hover:text-primary transition-colors duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label={social.name}
                    >
                      <Icon size={16} />
                    </motion.a>
                  );
                })}
              </ScrollReveal>
            </motion.div>
            
            {/* Quick Links */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col"
            >
              <motion.h4 variants={itemVariants} className="text-base font-bold mb-3">Rychlé odkazy</motion.h4>
              <motion.ul variants={containerVariants} className="space-y-1.5 text-sm">
                {['O mně', 'Služby', 'Dovednosti', 'Projekty', 'Kontakt'].map((item, i) => (
                  <motion.li key={i} variants={itemVariants}>
                    <a 
                      href={`#${item.toLowerCase().replace(' ', '-')}`}
                      className="text-foreground/60 hover:text-primary transition-colors flex items-center"
                    >
                      <span className="bg-primary/20 h-1 w-1 rounded-full mr-1.5"></span>
                      {item}
                    </a>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
            
            {/* Services */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col"
            >
              <motion.h4 variants={itemVariants} className="text-base font-bold mb-3">Služby</motion.h4>
              <motion.ul variants={containerVariants} className="space-y-1.5 text-sm">
                {['Webové aplikace', 'UI/UX Design', 'E-commerce řešení', 'SEO optimalizace', 'Webhosting'].map((item, i) => (
                  <motion.li key={i} variants={itemVariants}>
                    <a 
                      href="#services"
                      className="text-foreground/60 hover:text-primary transition-colors flex items-center"
                    >
                      <span className="bg-accent/20 h-1 w-1 rounded-full mr-1.5"></span>
                      {item}
                    </a>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
            
            {/* Contact Info */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col"
            >
              <motion.h4 variants={itemVariants} className="text-base font-bold mb-3">Kontakt</motion.h4>
              <motion.div variants={containerVariants} className="space-y-3 text-sm">
                <motion.div variants={itemVariants} className="flex items-start">
                  <div>
                    <p className="text-foreground/60">Email:</p>
                    <a href="mailto:info@jannovak.cz" className="hover:text-primary transition-colors">
                      info@jannovak.cz
                    </a>
                  </div>
                </motion.div>
                
                <motion.div variants={itemVariants} className="flex items-start">
                  <div>
                    <p className="text-foreground/60">Telefon:</p>
                    <a href="tel:+420123456789" className="hover:text-primary transition-colors">
                      +420 123 456 789
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Copyright bar */}
          <div className="mt-10 pt-5 border-t border-white/5 flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-foreground/50 mb-3 md:mb-0">
              &copy; {currentYear} Jan Novák. Všechna práva vyhrazena.
            </p>
            
            <div className="flex space-x-4 text-xs">
              <a href="#" className="text-foreground/50 hover:text-primary transition-colors">
                Zásady ochrany soukromí
              </a>
              <span className="text-foreground/20">|</span>
              <a href="#" className="text-foreground/50 hover:text-primary transition-colors">
                Obchodní podmínky
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer background decoration */}
      <motion.div 
        className="absolute bottom-0 left-0 w-full h-10 opacity-5 overflow-hidden z-0 pointer-events-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.05 }}
        viewport={{ once: true }}
      >
        <AspectRatio ratio={16/1}>
          <div className="w-full h-full bg-gradient-to-r from-primary via-transparent to-accent" />
        </AspectRatio>
      </motion.div>
    </footer>
  );
};

export default Footer;
