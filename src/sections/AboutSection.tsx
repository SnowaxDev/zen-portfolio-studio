
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Server, Cpu, ChevronDown, RotateCw } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import ScrollReveal from '@/components/ScrollReveal';
import SectionTitle from '@/components/SectionTitle';
import TextWithGlow from '@/components/TextWithGlow';
import AnimatedSection from '@/components/AnimatedSection';
import AnimatedLink from '@/components/AnimatedLink';
import { usePrefersReducedMotion } from '@/hooks/use-reduced-motion';
import StatBox from '@/components/about/StatBox';
import TechStackItem from '@/components/about/TechStackItem';
import PhilosophyItem from '@/components/about/PhilosophyItem';
import HobbyItem from '@/components/about/HobbyItem';

const AboutSection: React.FC = () => {
  const [isHobbyOpen, setIsHobbyOpen] = useState(false);
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Stat animation handler
  const handleStatHover = (index: number | null) => {
    if (prefersReducedMotion) return;
    setHoveredStat(index);
  };

  // Stats data - fixed with correct numbers as requested previously
  const stats = [
    { value: '2+', label: 'Roky zkušeností', rotation: 0, translateY: 0 },
    { value: '5+', label: 'Dokončených projektů', rotation: 0, translateY: 0 },
    { value: '5+', label: 'Spokojených klientů', rotation: 0, translateY: 0 },
    { value: '10+', label: 'Open source příspěvků', rotation: 0, translateY: 0 }
  ];

  // Tech stack data
  const techStack = [
    { 
      title: 'Frontend', 
      technologies: 'React, TypeScript, Next.js, Tailwind CSS, Framer Motion',
      icon: Code2
    },
    { 
      title: 'Backend', 
      technologies: 'Node.js, MongoDB',
      icon: Server
    },
    { 
      title: 'Nástroje', 
      technologies: 'Git, Figma, Linux, Bash, VS Code',
      icon: Cpu
    }
  ];

  // Philosophy items
  const philosophyData = [
    'Píšu čistý, modulární kód, který je snadné udržovat a škálovat.',
    'Upřednostňuji přístupnost a výkon ve všem, co vytvářím.',
    'Využívám moderní nástroje a technologie pro efektivní vývoj.',
    'Neustále se učím novým technologiím, abych zůstal v popředí webového vývoje.'
  ];
  
  // Hobby items
  const hobbyItems = [
    'Konfigurace vlastních serverů a self-hosted služeb',
    'Experimentování s IoT zařízeními a mikrokontrolery',
    'Studium kyberbezpečnosti a etického hackování',
    'Tvorba open-source nástrojů pro vývojáře',
    'Optimalizace Linuxových systémů'
  ];

  return (
    <section id="about" className="relative py-16 md:py-20 overflow-hidden bg-background">
      {/* Background elements with improved aesthetics */}
      <AnimatedSection 
        className="absolute inset-0 pointer-events-none" 
        withOverflow={true}
        direction="none"
      >
        {/* Subtle background accents */}
        <motion.div 
          className="absolute top-40 left-10 w-64 h-64 rounded-full bg-primary/5 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          initial={{ opacity: 0.3, scale: 1 }}
        />
        
        {/* Secondary background accent */}
        <motion.div 
          className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-accent/5 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          initial={{ opacity: 0.2, scale: 1 }}
        />
      </AnimatedSection>
      
      <div className="container-custom relative z-10">
        {/* Section title */}
        <div className="mb-12 md:mb-16 text-center md:text-left">
          <SectionTitle 
            title="O Mně" 
            subtitle="Student s vášní pro webový vývoj a technologie"
            alignment="left"
            accentColor="gold"
            withGradient={true}
            titleSize="lg"
          />
        </div>
        
        {/* Stats grid - more symmetric and evenly spaced */}
        <AnimatedSection 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14" 
          staggerChildren={true}
          staggerDelay={0.08}
        >
          {stats.map((stat, index) => (
            <StatBox 
              key={index}
              value={stat.value}
              label={stat.label}
              index={index}
              hoveredStat={hoveredStat}
              handleStatHover={handleStatHover}
              rotationDegree={stat.rotation}
              translateY={stat.translateY}
            />
          ))}
        </AnimatedSection>
        
        {/* Main content in a symmetric layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left column - Tech information */}
          <div className="space-y-8">
            <ScrollReveal
              animationStyle="slide"
              direction="right"
              delay={0.1}
            >
              <motion.div 
                className="bg-card/50 backdrop-blur-sm border border-white/5 rounded-xl p-6 shadow-sm hover:shadow-lg hover:border-gold/20 transition-all duration-500"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-6">
                  <motion.div 
                    className="p-3 rounded-lg bg-gold/5 mr-4"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.7 }}
                  >
                    <RotateCw className="text-gold" size={24} />
                  </motion.div>
                  <h4 className="text-xl font-semibold">
                    <TextWithGlow intensity="light" pulsate={false}>
                      Můj Vývojový Stack
                    </TextWithGlow>
                  </h4>
                </div>
                
                <ScrollReveal
                  animationStyle="fade"
                  staggerChildren={true}
                  staggerDelay={0.1}
                  className="space-y-2"
                >
                  {techStack.map((item, index) => (
                    <TechStackItem
                      key={index}
                      title={item.title}
                      technologies={item.technologies}
                      icon={item.icon}
                      delay={index * 0.1}
                    />
                  ))}
                </ScrollReveal>
              </motion.div>
            </ScrollReveal>
            
            {/* My Coding Philosophy */}
            <ScrollReveal
              animationStyle="scale"
              delay={0.2}
            >
              <motion.div 
                className="p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-gold/5 shadow-sm hover:shadow-md transition-all duration-300"
                whileHover={{ 
                  boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)",
                  borderColor: "hsl(var(--gold) / 0.2)"
                }}
              >
                <div className="flex items-center mb-6">
                  <motion.div 
                    className="p-3 rounded-lg bg-gold/5 mr-4"
                    whileHover={{ rotate: 360, backgroundColor: "hsl(var(--gold) / 0.15)" }}
                    transition={{ duration: 0.6 }}
                  >
                    <Code2 className="text-gold" size={24} />
                  </motion.div>
                  <h4 className="text-xl font-semibold">
                    <TextWithGlow intensity="light" gradient={true} gradientColors="from-gold to-gold-light">
                      Moje Kódovací Filosofie
                    </TextWithGlow>
                  </h4>
                </div>
                
                <ScrollReveal
                  animationStyle="fade"
                  staggerChildren={true}
                  staggerDelay={0.1}
                  className="space-y-2"
                >
                  {philosophyData.map((item, index) => (
                    <PhilosophyItem 
                      key={index} 
                      text={item}
                    />
                  ))}
                </ScrollReveal>
              </motion.div>
            </ScrollReveal>
          </div>
          
          {/* Right column - My Journey and Hobbies */}
          <div className="space-y-6">
            <ScrollReveal
              animationStyle="fade"
              duration={0.6}
            >
              <h3 className="text-2xl font-bold mb-3">
                <TextWithGlow color="rgba(212, 175, 55, 0.8)" intensity="medium" shimmer={true} gradient={true}>
                  Moje Cesta
                </TextWithGlow>
              </h3>
            </ScrollReveal>
            
            <div className="relative">
              {/* Decorative accent */}
              <motion.div
                className="absolute -left-4 top-0 h-full w-1 bg-gradient-to-b from-transparent via-gold/20 to-transparent rounded-full"
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
              
              <div className="pl-4 border-l border-gold/5 space-y-6">
                <ScrollReveal
                  animationStyle="fade"
                  delay={0.15}
                  direction="left"
                  distance={20}
                >
                  <p className="text-lg text-foreground/90 leading-relaxed">
                    Jako student experimentující s webovým vývojem mám velký zájem o vytváření moderních, přístupných a vizuálně atraktivních webových aplikací. Neustále se vzdělávám a hledám nové příležitosti k rozšíření svých dovedností.
                  </p>
                </ScrollReveal>
                
                <ScrollReveal
                  animationStyle="fade"
                  delay={0.3}
                  direction="left"
                  distance={20}
                >
                  <p className="text-lg text-foreground/90 leading-relaxed">
                    Momentálně hledám zákazníky pro své první komerční projekty, kde mohu aplikovat nabyté znalosti a dále růst jako vývojář. Mým cílem je poskytovat kvalitní webové služby za dostupné ceny, zejména pro začínající podnikatele a malé firmy.
                  </p>
                </ScrollReveal>
                
                <ScrollReveal
                  animationStyle="fade"
                  delay={0.45}
                  direction="left"
                  distance={20}
                >
                  <p className="text-lg text-foreground/90 leading-relaxed">
                    Když nekóduji, najdete mě při experimentování s novým hardwarem, konfigurací síťových služeb nebo při studiu odborné literatury. Vždy hledám nové výzvy a příležitosti k osobnímu i profesnímu růstu.
                  </p>
                </ScrollReveal>
              </div>
            </div>
            
            {/* IT Hobbies Section */}
            <ScrollReveal
              animationStyle="slide"
              direction="up"
              delay={0.3}
            >
              <Collapsible 
                open={isHobbyOpen} 
                onOpenChange={setIsHobbyOpen}
                className="w-full mt-8"
              >
                <CollapsibleTrigger className="flex w-full items-center justify-between p-5 bg-card/50 backdrop-blur-sm rounded-xl border border-purple/5 hover:bg-card/80 transition-all duration-300">
                  <div className="flex items-center">
                    <motion.div 
                      className="p-3 rounded-lg bg-purple/5 mr-4"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.7 }}
                    >
                      <Server className="text-purple" size={24} />
                    </motion.div>
                    <h4 className="text-xl font-semibold">
                      <TextWithGlow color="rgba(139, 92, 246, 0.8)" intensity="light">
                        Moje IT Koníčky
                      </TextWithGlow>
                    </h4>
                  </div>
                  <motion.div
                    animate={{ rotate: isHobbyOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown size={20} />
                  </motion.div>
                </CollapsibleTrigger>
                <CollapsibleContent className="overflow-hidden">
                  <motion.div 
                    className="p-5 pt-3 bg-card/40 backdrop-blur-sm rounded-b-xl border-x border-b border-purple/5 shadow-sm"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                  >
                    <ScrollReveal
                      animationStyle="fade"
                      staggerChildren={true}
                      staggerDelay={0.08}
                      className="space-y-1 pt-2"
                    >
                      {hobbyItems.map((item, index) => (
                        <HobbyItem
                          key={index}
                          text={item}
                          index={index}
                        />
                      ))}
                    </ScrollReveal>
                  </motion.div>
                </CollapsibleContent>
              </Collapsible>
            </ScrollReveal>
            
            {/* CTA Button - Perfectly centered */}
            <ScrollReveal
              animationStyle="bounce"
              delay={0.4}
            >
              <div className="flex justify-center md:justify-start mt-8">
                <AnimatedLink 
                  href="#contact"
                  variant="gold"
                  size="lg"
                  withArrow={true}
                  arrowAnimation="bounce"
                >
                  Spolupracujme
                </AnimatedLink>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
