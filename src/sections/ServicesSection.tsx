
import React from 'react';
import { motion } from 'framer-motion';
import { Check, Package, Rocket, Crown, Clock, ArrowRight, Layout, Zap, Code } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import ScrollReveal from '../components/ScrollReveal';
import { Card, CardContent } from '../components/ui/card';
import { cn } from '@/lib/utils';

const PricingCard = ({ 
  title, 
  price, 
  description, 
  features, 
  isPopular = false,
  icon: Icon = Package,
  callToAction = "Objednat"
}: { 
  title: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  icon?: React.ElementType;
  callToAction?: string;
}) => (
  <motion.div 
    className={`relative rounded-xl p-6 shadow-lg transition-all duration-300 h-full ${
      isPopular 
        ? "bg-gradient-to-br from-primary/90 to-accent/90 text-white border-0" 
        : "bg-card border border-border hover:border-accent/50"
    }`}
    initial={{ y: 50, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
  >
    {isPopular && (
      <div className="absolute -top-4 right-4 bg-accent px-3 py-1 rounded-full text-xs font-bold">
        Nejoblíbenější
      </div>
    )}
    
    <div className="flex items-center mb-4">
      <div className={cn(
        "flex items-center justify-center w-10 h-10 rounded-full mr-3",
        isPopular ? "bg-white/20" : "bg-primary/10"
      )}>
        <Icon className={cn("h-5 w-5", isPopular ? "text-white" : "text-primary")} />
      </div>
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

const ProcessStep = ({
  number,
  title,
  duration,
  description,
  isLast = false
}: {
  number: number;
  title: string;
  duration: string;
  description: string;
  isLast?: boolean;
}) => (
  <ScrollReveal 
    direction="left"
    className="flex gap-4 relative"
    delay={number * 0.1}
  >
    <div className="flex flex-col items-center">
      <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white z-10">
        <span className="font-bold">{number}</span>
      </div>
      {!isLast && <div className="w-0.5 grow bg-border mt-2 ml-[1px]"></div>}
    </div>
    <div className="pb-10 pt-1">
      <div className="flex items-center mb-1">
        <h3 className="text-xl font-bold mr-2">{title}</h3>
        <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded-full inline-block">
          {duration}
        </span>
      </div>
      <p className="text-muted-foreground">{description}</p>
    </div>
  </ScrollReveal>
);

const AdditionalServiceCard = ({
  icon: Icon,
  title,
  description
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) => (
  <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
    <CardContent className="p-6">
      <div className="mb-4 bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </CardContent>
  </Card>
);

const ServicesSection = () => {
  return (
    <section id="services" className="section py-20 md:py-28 relative">
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
              icon={Layout}
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
              icon={Rocket}
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
              icon={Code}
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

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-16 mb-16">
          <div className="md:col-span-4">
            <ScrollReveal>
              <h3 className="text-2xl font-bold mb-4">Další služby</h3>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={0.1}>
            <AdditionalServiceCard
              icon={Layout}
              title="Redesign webu"
              description="Oživte svůj stávající web moderním designem, který zvýší konverze a zapůsobí na návštěvníky."
            />
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <AdditionalServiceCard
              icon={Zap}
              title="Optimalizace rychlosti"
              description="Zrychlete svůj web pro lepší uživatelský zážitek a vyšší pozice ve vyhledávačích."
            />
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <AdditionalServiceCard
              icon={Crown}
              title="SEO konzultace"
              description="Analýza a implementace strategií pro lepší viditelnost ve vyhledávačích."
            />
          </ScrollReveal>
          <ScrollReveal delay={0.4}>
            <AdditionalServiceCard
              icon={Code}
              title="Jednorázové úpravy"
              description="Potřebujete rychlou změnu nebo opravu na vašem webu? Nabízím i jednorázové úpravy."
            />
          </ScrollReveal>
        </div>
        
        <div className="bg-card shadow-lg rounded-lg p-8 mt-16 overflow-hidden">
          <ScrollReveal>
            <h3 className="text-2xl font-bold mb-6 text-center">Proces Vývoje</h3>
            <p className="text-center text-muted-foreground mb-10">Maximální doba realizace: <span className="text-primary font-bold">3 týdny</span> (závisí na rozsahu projektu)</p>
          </ScrollReveal>
          
          <div className="space-y-2 relative">
            <ProcessStep
              number={1}
              title="Objevování a Plánování"
              duration="2-3 dny"
              description="Začínáme důkladnou konzultací, abychom pochopili vaše obchodní cíle, cílovou skupinu a požadavky projektu. Poté vytvoříme podrobný plán pro váš projekt."
            />
            
            <ProcessStep
              number={2}
              title="Design a Prototypování"
              duration="3-5 dnů"
              description="Na základě požadavků vytvoříme wireframy a vizuální návrhy ke schválení. Dostanete interaktivní prototypy pro vizualizaci finálního produktu."
            />
            
            <ProcessStep
              number={3}
              title="Vývoj"
              duration="7-10 dnů"
              description="Náš tým vytvoří váš web nebo aplikaci pomocí moderních technologií. Pravidelné aktualizace vás budou informovat o postupu."
            />
            
            <ProcessStep
              number={4}
              title="Testování a Nasazení"
              duration="2-3 dny"
              description="Důkladně testujeme na různých zařízeních a prohlížečích před spuštěním. Po vašem schválení nasadíme na produkční servery."
            />
            
            <ProcessStep
              number={5}
              title="Podpora a Údržba"
              duration="Průběžně"
              description="Poskytujeme průběžnou podporu a údržbu, aby váš web nebo aplikace fungovaly hladce a zůstaly aktuální."
              isLast={true}
            />
          </div>
        </div>
        
        <div className="mt-16 p-8 bg-muted rounded-xl">
          <ScrollReveal>
            <h3 className="text-2xl font-bold mb-4 text-center">Často Kladené Otázky</h3>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <motion.div 
              className="bg-card p-6 rounded-lg shadow-sm hover:shadow-md transition-all"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -3 }}
            >
              <h4 className="font-bold mb-2">Jak dlouho trvá vytvořit web?</h4>
              <p className="text-muted-foreground">Časový plán závisí na složitosti. Základní weby dokončím do 2 týdnů, pokročilé weby a jednodušší aplikace do 3 týdnů. Komplexní projekty mohou trvat déle.</p>
            </motion.div>
            
            <motion.div 
              className="bg-card p-6 rounded-lg shadow-sm hover:shadow-md transition-all"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -3 }}
            >
              <h4 className="font-bold mb-2">Nabízíte hosting?</h4>
              <p className="text-muted-foreground">Ano, poskytuji hostingová řešení přizpůsobená potřebám vašeho webu. Hostingové balíčky zahrnují údržbu, zálohy a bezpečnostní aktualizace.</p>
            </motion.div>
            
            <motion.div 
              className="bg-card p-6 rounded-lg shadow-sm hover:shadow-md transition-all"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -3 }}
            >
              <h4 className="font-bold mb-2">Jaké technologie používáte?</h4>
              <p className="text-muted-foreground">Specializuji se na React, TypeScript, Tailwind CSS a Next.js pro frontend. Pro backend používám Node.js, PostgreSQL a různé cloudové služby.</p>
            </motion.div>
            
            <motion.div 
              className="bg-card p-6 rounded-lg shadow-sm hover:shadow-md transition-all"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -3 }}
            >
              <h4 className="font-bold mb-2">Nabízíte i jednorázové úpravy?</h4>
              <p className="text-muted-foreground">Ano, kromě kompletních projektů nabízím i jednorázové úpravy existujících webů, redesign, optimalizaci výkonu nebo implementaci nových funkcí.</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
