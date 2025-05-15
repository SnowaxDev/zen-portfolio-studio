
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-background relative">
      <div className="container-custom max-w-5xl">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 text-gold-glow"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Kontaktujte Mě
          </motion.h2>
          <div className="w-24 h-1 bg-gradient-to-r from-gold to-purple mx-auto rounded-full"></div>
          <motion.p 
            className="mt-4 text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Máte projekt na mysli? Pojďme si o tom popovídat!
          </motion.p>
        </div>
        
        <motion.div 
          className="bg-card/70 backdrop-blur-sm rounded-xl border border-gold/10 p-6 md:p-8 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-bold text-center mb-6 text-gradient">
            Často Kladené Otázky
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <motion.div 
              className="bg-background/30 rounded-lg p-5 border border-gold/5 hover:border-gold/20 transition-all"
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(212, 175, 55, 0.15)" }}
            >
              <h4 className="font-bold mb-2 text-gold-light">Jak dlouho trvá vytvořit web?</h4>
              <p className="text-sm text-muted-foreground">
                Časový plán závisí na složitosti. Základní weby dokončím do 2 týdnů, jednodušší weby a jednodušší aplikace do 3 týdnů. Komplexní projekty mohou trvat déle.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-background/30 rounded-lg p-5 border border-gold/5 hover:border-gold/20 transition-all"
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(212, 175, 55, 0.15)" }}
            >
              <h4 className="font-bold mb-2 text-gold-light">Nabízíte hosting?</h4>
              <p className="text-sm text-muted-foreground">
                Ano, poskytuji hostingová řešení přizpůsobená potřebám vašeho webu. Hostingové balíčky zahrnují úložiště, zálohy a bezpečnostní aktualizace.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-background/30 rounded-lg p-5 border border-gold/5 hover:border-gold/20 transition-all"
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(212, 175, 55, 0.15)" }}
            >
              <h4 className="font-bold mb-2 text-gold-light">Jaké technologie používáte?</h4>
              <p className="text-sm text-muted-foreground">
                Specializuji se na React, TypeScript, Tailwind CSS a Next.js pro frontend. Pro backend používám Node.js, PostgreSQL a různé cloudové služby.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-background/30 rounded-lg p-5 border border-gold/5 hover:border-gold/20 transition-all"
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(212, 175, 55, 0.15)" }}
            >
              <h4 className="font-bold mb-2 text-gold-light">Nabízíte i jednorázové úpravy?</h4>
              <p className="text-sm text-muted-foreground">
                Ano, kromě kompletních projektů nabízím i jednorázové úpravy existujících webů, redesign, optimalizaci výkonu nebo implementaci nových funkcí.
              </p>
            </motion.div>
          </div>
          
          <div className="mt-12">
            <h3 className="text-xl font-bold text-center mb-8 text-gradient-purple">
              Máte projekt na mysli? Pojďme si o tom popovídat!
            </h3>
            
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1 text-gold/80">Vaše Jméno</label>
                <Input 
                  id="name"
                  type="text"
                  placeholder="Jan Novák"
                  className="bg-background/30 border-gold/10 focus:border-gold/50 focus:ring-gold/30" 
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1 text-gold/80">Email</label>
                <Input 
                  id="email"
                  type="email"
                  placeholder="jan@priklad.cz"
                  className="bg-background/30 border-gold/10 focus:border-gold/50 focus:ring-gold/30" 
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1 text-gold/80">Zpráva</label>
                <Textarea 
                  id="message"
                  placeholder="Napište detaily vašeho projektu..."
                  className="bg-background/30 border-gold/10 focus:border-gold/50 focus:ring-gold/30 min-h-[150px]" 
                />
              </div>
              
              <div className="pt-4">
                <Button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-gold-dark to-gold text-background py-3 rounded-lg hover:shadow-lg hover:shadow-gold/30 transition-all"
                >
                  Odeslat Zprávu
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
