
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Server, Cpu, ChevronDown, RotateCw } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { statsData, techStackData, philosophyItems, hobbyItems, sectionMeta } from '../lib/section-data';
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

  // Stats data
  const stats = [
    { value: '2+', label: 'Roky zkušeností', rotation: -1, translateY: 6 },
    { value: '10+', label: 'Dokončených projektů', rotation: 0.5, translateY: 0 },
    { value: '5+', label: 'Spokojených klientů', rotation: -0.7, translateY: 4 },
    { value: '3+', label: 'Open source příspěvků', rotation: 1, translateY: 0 }
  ];

  // Tech stack data
  const techStack = [
    { 
      title: 'Frontend', 
      technologies: 'React, TypeScript, Next.js, Tailwind CSS, Framer Motion',
      icon: Code2,
      translateX: 2
    },
    { 
      title: 'Backend', 
      technologies: 'Node.js, MongoDB',
      icon: Server,
      translateX: -1
    },
    { 
      title: 'Nástroje', 
      technologies: 'Git, Figma, Linux, Bash, VS Code',
      icon: Cpu,
      translateX: 3
    }
  ];

  // Philosophy items
  const philosophyData = [
    'Píšu čistý, modulární kód, který je snadné udržovat a škálovat.',
    'Upřednostňuji přístupnost a výkon ve všem, co vytvářím.',
    'Využívám moderní nástroje a technologie pro efektivní vývoj.',
    'Neustále se učím novým technologiím, abych zůstal v popředí webového vývoje.'
  ];

  return (
    <section id="about" className="relative py-20 md:py-28 overflow-hidden bg-background">
      {/* Enhanced background elements with better performance */}
      <AnimatedSection 
        className="absolute inset-0 pointer-events-none" 
        withOverflow={true}
        direction="none"
      >
        {/* Primary background accent */}
        <motion.div 
          className="absolute top-40 left-10 w-64 h-64 rounded-full bg-primary/5 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          initial={{ opacity: 0.4, scale: 1 }}
        />
        
        {/* Secondary background accent */}
        <motion.div 
          className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-accent/5 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          initial={{ opacity: 0.3, scale: 1 }}
        />
      </AnimatedSection>
      
      <div className="container-custom relative z-10">
        {/* Enhanced section title with improved animations */}
        <div className="mb-16">
          <SectionTitle 
            title="O Mně" 
            subtitle="Student s vášní pro webový vývoj a technologie"
            alignment="left"
            accentColor="gold"
            withGradient={true}
            titleSize="lg"
          />
        </div>
        
        {/* Stats grid matching the screenshot design */}
        <AnimatedSection 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 gap-y-8 mb-16" 
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
        
        {/* Main content area with tech stack and journey */}
        <div className="flex flex-col-reverse lg:flex-row gap-12">
          {/* Left column - Tech Stack */}
          <div className="lg:w-1/2 space-y-8">
            <ScrollReveal
              animationStyle="slide"
              direction="right"
              delay={0.2}
            >
              {/* Development Stack Card */}
              <motion.div 
                className="bg-card/70 backdrop-blur-sm border border-white/5 rounded-xl p-6 shadow-sm hover:shadow-lg hover:border-gold/20 transition-all duration-500 transform rotate-[-0.5deg]"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-6 relative">
                  <motion.div 
                    className="p-3 rounded-lg bg-gold/10 mr-4"
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
                
                {/* Tech stack items */}
                <ScrollReveal
                  animationStyle="fade"
                  staggerChildren={true}
                  staggerDelay={0.1}
                >
                  {techStack.map((item, index) => (
                    <TechStackItem
                      key={index}
                      title={item.title}
                      technologies={item.technologies}
                      icon={item.icon}
                      delay={index * 0.1}
                      translateX={item.translateX}
                    />
                  ))}
                </ScrollReveal>
              </motion.div>
            </ScrollReveal>
            
            {/* Coding Philosophy Card */}
            <ScrollReveal
              animationStyle="scale"
              delay={0.3}
            >
              <motion.div 
                className="mt-6 p-6 bg-card/70 backdrop-blur-sm rounded-xl border border-gold/10 shadow-sm hover:shadow-md transition-all duration-300 transform rotate-[0.7deg]"
                whileHover={{ 
                  boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)",
                  borderColor: "hsl(var(--gold) / 0.2)"
                }}
              >
                <div className="flex items-center mb-6 relative">
                  <motion.div 
                    className="p-3 rounded-lg bg-gold/10 mr-4"
                    whileHover={{ rotate: 360, backgroundColor: "hsl(var(--gold) / 0.2)" }}
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
                  className="space-y-3.5"
                >
                  {philosophyData.map((item, index) => (
                    <PhilosophyItem 
                      key={index} 
                      text={item}
                      translateX={index % 2 === 0 ? 1 : -1}
                    />
                  ))}
                </ScrollReveal>
              </motion.div>
            </ScrollReveal>
          </div>
          
          {/* Right column - Journey */}
          <div className="lg:w-1/2 space-y-6">
            <ScrollReveal
              animationStyle="fade"
              duration={0.6}
            >
              <h3 className="text-2xl font-bold mb-2 transform -rotate-[0.5deg]">
                <TextWithGlow color="rgba(212, 175, 55, 0.8)" intensity="medium" shimmer={true} gradient={true}>
                  Moje Cesta
                </TextWithGlow>
              </h3>
            </ScrollReveal>
            
            <div className="relative">
              {/* Decorative element */}
              <motion.div
                className="absolute -left-4 top-1/2 w-1 h-20 bg-gradient-to-b from-transparent via-gold/30 to-transparent rounded-full"
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
              
              <div className="pl-4 border-l border-gold/10 space-y-6">
                <ScrollReveal
                  animationStyle="fade"
                  delay={0.15}
                  direction="left"
                  distance={20}
                >
                  <p className="text-lg text-foreground/90 leading-relaxed transform translate-x-1">
                    Jako student experimentující s webovým vývojem mám velký zájem o vytváření moderních, přístupných a vizuálně atraktivních webových aplikací. Neustále se vzdělávám a hledám nové příležitosti k rozšíření svých dovedností.
                  </p>
                </ScrollReveal>
                
                <ScrollReveal
                  animationStyle="fade"
                  delay={0.3}
                  direction="left"
                  distance={20}
                >
                  <p className="text-lg text-foreground/90 leading-relaxed transform -translate-x-1 translate-y-1">
                    Momentálně hledám zákazníky pro své první komerční projekty, kde mohu aplikovat nabyté znalosti a dále růst jako vývojář. Mým cílem je poskytovat kvalitní webové služby za dostupné ceny, zejména pro začínající podnikatele a malé firmy.
                  </p>
                </ScrollReveal>
                
                <ScrollReveal
                  animationStyle="fade"
                  delay={0.45}
                  direction="left"
                  distance={20}
                >
                  <p className="text-lg text-foreground/90 leading-relaxed transform translate-x-2">
                    Když nekóduji, najdete mě při experimentování s novým hardwarem, konfigurací síťových služeb nebo při studiu odborné literatury. Vždy hledám nové výzvy a příležitosti k osobnímu i profesnímu růstu.
                  </p>
                </ScrollReveal>
              </div>
            </div>
            
            {/* IT Hobbies Section */}
            <ScrollReveal
              animationStyle="slide"
              direction="up"
              delay={0.4}
            >
              <Collapsible 
                open={isHobbyOpen} 
                onOpenChange={setIsHobbyOpen}
                className="w-full mt-10"
              >
                <CollapsibleTrigger className="flex w-full items-center justify-between p-5 bg-card/70 backdrop-blur-sm rounded-xl border border-purple/10 hover:bg-card/90 transition-all duration-300 transform rotate-[0.4deg]">
                  <div className="flex items-center">
                    <motion.div 
                      className="p-3 rounded-lg bg-purple/10 mr-4"
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
                    className="p-5 pt-3 bg-card/60 backdrop-blur-sm rounded-b-xl border-x border-b border-purple/10 shadow-sm transform -rotate-[0.3deg]"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                  >
                    <ScrollReveal
                      animationStyle="fade"
                      staggerChildren={true}
                      staggerDelay={0.08}
                      className="space-y-3"
                    >
                      {hobbyItems.map((item, index) => (
                        <HobbyItem
                          key={index}
                          text={item}
                          index={index}
                          translateX={index % 2 === 0 ? 1 : -1}
                        />
                      ))}
                    </ScrollReveal>
                  </motion.div>
                </CollapsibleContent>
              </Collapsible>
            </ScrollReveal>
            
            {/* CTA Button */}
            <ScrollReveal
              animationStyle="bounce"
              delay={0.5}
            >
              <AnimatedLink 
                href="#contact"
                variant="gold"
                size="lg"
                withArrow={true}
                arrowAnimation="bounce"
                className="mt-8"
              >
                Spolupracujme
              </AnimatedLink>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
