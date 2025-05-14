
import React from 'react';
import { motion } from 'framer-motion';
import { Check, Package, Rocket, Crown, Clock, ArrowRight } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';

const PricingCard = ({ 
  title, 
  price, 
  description, 
  features, 
  isPopular = false,
  callToAction = "Začít"
}: { 
  title: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  callToAction?: string;
}) => (
  <motion.div 
    className={`relative rounded-xl p-6 shadow-lg transition-all duration-300 ${
      isPopular 
        ? "bg-gradient-to-br from-primary/90 to-accent/90 text-white border-0" 
        : "bg-card border border-border hover:border-accent/50"
    }`}
    initial={{ y: 50, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    {isPopular && (
      <div className="absolute -top-4 right-4 bg-accent px-3 py-1 rounded-full text-xs font-bold">
        Nejoblíbenější
      </div>
    )}
    
    <div className="flex items-center mb-4">
      {isPopular ? <Crown className="mr-2 h-6 w-6" /> : <Package className="mr-2 h-6 w-6" />}
      <h3 className="text-xl font-bold">{title}</h3>
    </div>
    
    <div className="mb-4">
      <span className="text-3xl font-bold">{price}</span>
      {price !== "Dle nabídky" && <span className="text-sm opacity-80 ml-1">/projekt</span>}
    </div>
    
    <p className="text-sm mb-6 opacity-90">{description}</p>
    
    <ul className="space-y-3 mb-6">
      {features.map((feature, index) => (
        <li key={index} className="flex text-sm">
          <Check className="mr-2 h-5 w-5 flex-shrink-0" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
    
    <button 
      className={`w-full py-2 px-4 rounded-md flex items-center justify-center transition-all ${
        isPopular 
          ? "bg-white text-accent hover:bg-white/90" 
          : "bg-primary text-white hover:bg-primary/90"
      }`}
    >
      {callToAction} <ArrowRight className="ml-2 h-4 w-4" />
    </button>
  </motion.div>
);

const TimelineItem = ({
  title,
  description,
  duration
}: {
  title: string;
  description: string;
  duration: string;
}) => (
  <motion.div 
    className="flex gap-4"
    initial={{ x: -50, opacity: 0 }}
    whileInView={{ x: 0, opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex flex-col items-center">
      <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white">
        <Clock className="h-5 w-5" />
      </div>
      <div className="w-0.5 grow bg-border mt-2"></div>
    </div>
    <div className="pb-10">
      <h3 className="text-xl font-bold">{title}</h3>
      <span className="text-sm bg-accent/20 text-accent px-2 py-0.5 rounded-full inline-block mb-2">
        {duration}
      </span>
      <p className="text-muted-foreground">{description}</p>
    </div>
  </motion.div>
);

const ServicesSection = () => {
  return (
    <section id="services" className="section">
      <div className="container-custom">
        <SectionTitle
          title="Služby a Ceník"
          subtitle="Transparentní ceny za kvalitní webový vývoj"
        />
        
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <PricingCard
              title="Základní Web"
              price="9 999 Kč"
              description="Perfektní pro malé firmy, které chtějí vytvořit online přítomnost."
              features={[
                "5-stránkový responzivní web",
                "Design optimalizovaný pro mobily",
                "Základní SEO optimalizace",
                "Kontaktní formulář",
                "Propojení se sociálními sítěmi",
                "2 kola revizí"
              ]}
              callToAction="Objednat"
            />
            
            <PricingCard
              title="Pokročilý Web"
              price="19 999 Kč"
              description="Ideální pro firmy, které potřebují více funkcí a vlastních prvků."
              features={[
                "10-stránkový responzivní web",
                "Pokročilý UI/UX design",
                "Systém správy obsahu",
                "Pokročilý SEO balíček",
                "Integrace analytiky",
                "Optimalizace výkonu",
                "3 kola revizí"
              ]}
              isPopular={true}
              callToAction="Objednat"
            />
            
            <PricingCard
              title="Vlastní Webová Aplikace"
              price="Dle nabídky"
              description="Pro firmy vyžadující řešení na míru s pokročilými funkcemi."
              features={[
                "Vlastní webová aplikace",
                "Uživatelská autentizace",
                "Integrace databáze",
                "Integrace API třetích stran",
                "Administrátorský dashboard",
                "Balíček údržby",
                "Neomezené revize"
              ]}
              callToAction="Vyžádat nabídku"
            />
          </div>
        </div>
        
        <div className="bg-card shadow-lg rounded-lg p-8 mt-16">
          <h3 className="text-2xl font-bold mb-6 text-center">Proces Vývoje</h3>
          
          <div className="space-y-2">
            <TimelineItem
              title="Objevování a Plánování"
              description="Začínáme důkladnou konzultací, abychom pochopili vaše obchodní cíle, cílovou skupinu a požadavky projektu. Poté vytvoříme podrobný plán pro váš projekt."
              duration="1-2 týdny"
            />
            
            <TimelineItem
              title="Design a Prototypování"
              description="Na základě požadavků vytvoříme wireframy a vizuální návrhy ke schválení. Dostanete interaktivní prototypy pro vizualizaci finálního produktu."
              duration="2-3 týdny"
            />
            
            <TimelineItem
              title="Vývoj"
              description="Náš tým vytvoří váš web nebo aplikaci pomocí moderních technologií. Pravidelné aktualizace vás budou informovat o postupu."
              duration="2-6 týdnů"
            />
            
            <TimelineItem
              title="Testování a Nasazení"
              description="Důkladně testujeme na různých zařízeních a prohlížečích před spuštěním. Po vašem schválení nasadíme na produkční servery."
              duration="1-2 týdny"
            />
            
            <motion.div 
              className="flex gap-4"
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col items-center">
                <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white">
                  <Rocket className="h-5 w-5" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold">Podpora a Údržba</h3>
                <span className="text-sm bg-accent/20 text-accent px-2 py-0.5 rounded-full inline-block mb-2">
                  Průběžně
                </span>
                <p className="text-muted-foreground">Poskytujeme průběžnou podporu a údržbu, aby váš web nebo aplikace fungovaly hladce a zůstaly aktuální.</p>
              </div>
            </motion.div>
          </div>
        </div>
        
        <div className="mt-16 p-8 bg-muted rounded-xl">
          <h3 className="text-2xl font-bold mb-4 text-center">Často Kladené Otázky</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <motion.div 
              className="bg-card p-6 rounded-lg shadow-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h4 className="font-bold mb-2">Jak dlouho trvá vytvořit web?</h4>
              <p className="text-muted-foreground">Časový plán závisí na složitosti. Základní weby trvají 2-4 týdny, zatímco vlastní webové aplikace mohou trvat 1-2 měsíce od konceptu po spuštění.</p>
            </motion.div>
            
            <motion.div 
              className="bg-card p-6 rounded-lg shadow-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h4 className="font-bold mb-2">Nabízíte hosting?</h4>
              <p className="text-muted-foreground">Ano, poskytujeme hostingová řešení přizpůsobená potřebám vašeho webu. Naše hostingové balíčky zahrnují údržbu, zálohy a bezpečnostní aktualizace.</p>
            </motion.div>
            
            <motion.div 
              className="bg-card p-6 rounded-lg shadow-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h4 className="font-bold mb-2">Jaké technologie používáte?</h4>
              <p className="text-muted-foreground">Specializujeme se na React, TypeScript, Tailwind CSS a Next.js pro frontend. Pro backend používáme Node.js, PostgreSQL a různé cloudové služby.</p>
            </motion.div>
            
            <motion.div 
              className="bg-card p-6 rounded-lg shadow-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h4 className="font-bold mb-2">Nabízíte údržbu po spuštění?</h4>
              <p className="text-muted-foreground">Ano, nabízíme různé balíčky údržby, které udrží váš web zabezpečený, aktualizovaný a výkonný. Zeptejte se na naše měsíční plány údržby.</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
