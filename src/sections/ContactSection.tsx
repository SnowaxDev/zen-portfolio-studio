
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Kontaktujte Mě</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Máte projekt na mysli? Pojďme si o tom popovídat!
          </p>
        </div>
        
        <div className="bg-card/70 backdrop-blur-sm rounded-xl border border-white/10 p-6 md:p-8 shadow-lg">
          <h3 className="text-xl font-bold text-center mb-6 text-gradient">
            Často Kladené Otázky
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-background/30 rounded-lg p-5 border border-white/5">
              <h4 className="font-bold mb-2">Jak dlouho trvá vytvořit web?</h4>
              <p className="text-sm text-muted-foreground">
                Časový plán závisí na složitosti. Základní weby dokončím do 2 týdnů, jednodušší weby a jednodušší aplikace do 3 týdnů. Komplexní projekty mohou trvat déle.
              </p>
            </div>
            
            <div className="bg-background/30 rounded-lg p-5 border border-white/5">
              <h4 className="font-bold mb-2">Nabízíte hosting?</h4>
              <p className="text-sm text-muted-foreground">
                Ano, poskytuji hostingová řešení přizpůsobená potřebám vašeho webu. Hostingové balíčky zahrnují úložiště, zálohy a bezpečnostní aktualizace.
              </p>
            </div>
            
            <div className="bg-background/30 rounded-lg p-5 border border-white/5">
              <h4 className="font-bold mb-2">Jaké technologie používáte?</h4>
              <p className="text-sm text-muted-foreground">
                Specializuji se na React, TypeScript, Tailwind CSS a Next.js pro frontend. Pro backend používám Node.js, PostgreSQL a různé cloudové služby.
              </p>
            </div>
            
            <div className="bg-background/30 rounded-lg p-5 border border-white/5">
              <h4 className="font-bold mb-2">Nabízíte i jednorázové úpravy?</h4>
              <p className="text-sm text-muted-foreground">
                Ano, kromě kompletních projektů nabízím i jednorázové úpravy existujících webů, redesign, optimalizaci výkonu nebo implementaci nových funkcí.
              </p>
            </div>
          </div>
          
          <div className="mt-12">
            <h3 className="text-xl font-bold text-center mb-8">
              Máte projekt na mysli? Pojďme si o tom popovídat!
            </h3>
            
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Vaše Jméno</label>
                <Input 
                  id="name"
                  type="text"
                  placeholder="Jan Novák"
                  className="bg-background/30 border-white/10 focus:border-primary/50" 
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                <Input 
                  id="email"
                  type="email"
                  placeholder="jan@priklad.cz"
                  className="bg-background/30 border-white/10 focus:border-primary/50" 
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">Zpráva</label>
                <Textarea 
                  id="message"
                  placeholder="Napište detaily vašeho projektu..."
                  className="bg-background/30 border-white/10 focus:border-primary/50 min-h-[150px]" 
                />
              </div>
              
              <div className="pt-4">
                <Button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-accent text-white py-3 rounded-lg hover:shadow-lg hover:shadow-primary/30 transition-all"
                >
                  Odeslat Zprávu
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
