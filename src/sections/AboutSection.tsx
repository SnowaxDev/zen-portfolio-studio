
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Server, Cpu, ChevronDown, MoveRight, MoveUp, RotateCw, CheckCircle } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { statsData, techStackData, philosophyItems, hobbyItems, sectionMeta } from '../lib/section-data';
import ScrollReveal from '@/components/ScrollReveal';
import SectionTitle from '@/components/SectionTitle';
import TextWithGlow from '@/components/TextWithGlow';
import AnimatedSection from '@/components/AnimatedSection';
import AnimatedLink from '@/components/AnimatedLink';
import { usePrefersReducedMotion } from '@/hooks/use-reduced-motion';

const AboutSection: React.FC = () => {
  const { about } = sectionMeta;
  const [isHobbyOpen, setIsHobbyOpen] = useState(false);
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  // Stat animation handler
  const handleStatHover = (index: number | null) => {
    if (prefersReducedMotion) return;
    setHoveredStat(index);
  };

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
        
        {/* Diagonal line with optimized animation */}
        <motion.div
          className="absolute left-0 top-1/4 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent transform rotate-[5deg]"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
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
        
        {/* Enhanced stats grid with improved visuals and interactions */}
        <AnimatedSection 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 gap-y-8 mb-16" 
          staggerChildren={true}
          staggerDelay={0.08}
        >
          {/* First stat card with asymmetric positioning */}
          <motion.div 
            className="bg-card/70 backdrop-blur-sm border border-gold/10 rounded-xl p-5 hover:border-gold/30 transition-all duration-300 transform rotate-[-1deg] md:translate-y-6"
            variants={itemVariants}
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(212, 175, 55, 0.1)" }}
            onHoverStart={() => handleStatHover(0)}
            onHoverEnd={() => handleStatHover(null)}
          >
            <motion.h3 
              className="text-3xl font-bold mb-1 flex items-center"
              animate={{ y: hoveredStat === 0 ? [0, -3, 0] : 0 }}
              transition={{ duration: 0.5 }}
            >
              <TextWithGlow color="rgba(212, 175, 55, 0.8)" intensity="medium" gradient={true} gradientColors="from-gold to-gold-light">
                2+
              </TextWithGlow>
              
              <motion.span 
                className="ml-1 text-gold/80"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: hoveredStat === 0 ? 1 : 0,
                  scale: hoveredStat === 0 ? 1 : 0,
                }}
                transition={{ duration: 0.2 }}
              >
                <MoveUp size={16} />
              </motion.span>
            </motion.h3>
            <p className="text-sm text-foreground/70">Roky zkušeností</p>
          </motion.div>
          
          {/* Second stat card with asymmetric positioning */}
          <motion.div 
            className="bg-card/70 backdrop-blur-sm border border-gold/10 rounded-xl p-5 hover:border-gold/30 transition-all duration-300 transform rotate-[0.5deg]"
            variants={itemVariants}
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(212, 175, 55, 0.1)" }}
            onHoverStart={() => handleStatHover(1)}
            onHoverEnd={() => handleStatHover(null)}
          >
            <motion.h3 
              className="text-3xl font-bold mb-1 flex items-center"
              animate={{ y: hoveredStat === 1 ? [0, -3, 0] : 0 }}
              transition={{ duration: 0.5 }}
            >
              <TextWithGlow color="rgba(212, 175, 55, 0.8)" intensity="medium" gradient={true} gradientColors="from-gold to-gold-light">
                10+
              </TextWithGlow>
              
              <motion.span 
                className="ml-1 text-gold/80"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: hoveredStat === 1 ? 1 : 0,
                  scale: hoveredStat === 1 ? 1 : 0,
                }}
                transition={{ duration: 0.2 }}
              >
                <MoveUp size={16} />
              </motion.span>
            </motion.h3>
            <p className="text-sm text-foreground/70">Dokončených projektů</p>
          </motion.div>
          
          {/* Third stat card with asymmetric positioning */}
          <motion.div 
            className="bg-card/70 backdrop-blur-sm border border-gold/10 rounded-xl p-5 hover:border-gold/30 transition-all duration-300 transform rotate-[-0.7deg] md:translate-y-4"
            variants={itemVariants}
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(212, 175, 55, 0.1)" }}
            onHoverStart={() => handleStatHover(2)}
            onHoverEnd={() => handleStatHover(null)}
          >
            <motion.h3 
              className="text-3xl font-bold mb-1 flex items-center"
              animate={{ y: hoveredStat === 2 ? [0, -3, 0] : 0 }}
              transition={{ duration: 0.5 }}
            >
              <TextWithGlow color="rgba(212, 175, 55, 0.8)" intensity="medium" gradient={true} gradientColors="from-gold to-gold-light">
                5+
              </TextWithGlow>
              
              <motion.span 
                className="ml-1 text-gold/80"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: hoveredStat === 2 ? 1 : 0,
                  scale: hoveredStat === 2 ? 1 : 0,
                }}
                transition={{ duration: 0.2 }}
              >
                <MoveUp size={16} />
              </motion.span>
            </motion.h3>
            <p className="text-sm text-foreground/70">Spokojených klientů</p>
          </motion.div>
          
          {/* Fourth stat card with asymmetric positioning */}
          <motion.div 
            className="bg-card/70 backdrop-blur-sm border border-gold/10 rounded-xl p-5 hover:border-gold/30 transition-all duration-300 transform rotate-[1deg]"
            variants={itemVariants}
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(212, 175, 55, 0.1)" }}
            onHoverStart={() => handleStatHover(3)}
            onHoverEnd={() => handleStatHover(null)}
          >
            <motion.h3 
              className="text-3xl font-bold mb-1 flex items-center"
              animate={{ y: hoveredStat === 3 ? [0, -3, 0] : 0 }}
              transition={{ duration: 0.5 }}
            >
              <TextWithGlow color="rgba(212, 175, 55, 0.8)" intensity="medium" gradient={true} gradientColors="from-gold to-gold-light">
                3+
              </TextWithGlow>
              
              <motion.span 
                className="ml-1 text-gold/80"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: hoveredStat === 3 ? 1 : 0,
                  scale: hoveredStat === 3 ? 1 : 0,
                }}
                transition={{ duration: 0.2 }}
              >
                <MoveUp size={16} />
              </motion.span>
            </motion.h3>
            <p className="text-sm text-foreground/70">Open source příspěvků</p>
          </motion.div>
        </AnimatedSection>
        
        <div className="flex flex-col-reverse lg:flex-row gap-12">
          {/* Enhanced Tech Stack Column with better animations */}
          <div className="lg:w-1/2 space-y-8">
            <ScrollReveal
              animationStyle="slide"
              direction="right"
              delay={0.2}
            >
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
                  
                  {/* Enhanced decorative element */}
                  <motion.div
                    className="absolute -top-4 right-4 w-12 h-12 rounded-full bg-gradient-to-br from-purple/10 to-gold/10 blur-xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>
                
                {/* Frontend Stack with enhanced animations */}
                <ScrollReveal
                  animationStyle="fade"
                  direction="right"
                  delay={0.1}
                  className="mb-6 transform translate-x-2"
                >
                  <div className="flex items-center mb-2 group">
                    <motion.div 
                      className="p-2 rounded-md bg-gold/10 mr-3 group-hover:bg-gold/20 transition-colors duration-300"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Code2 className="text-gold" size={18} />
                    </motion.div>
                    <TextWithGlow color="rgba(212, 175, 55, 0.8)" intensity="medium" pulsate={false} hover={true}>
                      <h5 className="font-medium">Frontend</h5>
                    </TextWithGlow>
                  </div>
                  <p className="text-sm text-foreground/80 pl-9 leading-relaxed">
                    React, TypeScript, Next.js, Tailwind CSS, Framer Motion
                  </p>
                </ScrollReveal>
                
                {/* Backend Stack with enhanced animations */}
                <ScrollReveal
                  animationStyle="fade"
                  direction="right"
                  delay={0.2}
                  className="mb-6 transform -translate-x-1"
                >
                  <div className="flex items-center mb-2 group">
                    <motion.div 
                      className="p-2 rounded-md bg-gold/10 mr-3 group-hover:bg-gold/20 transition-colors duration-300"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Server className="text-gold" size={18} />
                    </motion.div>
                    <TextWithGlow color="rgba(212, 175, 55, 0.8)" intensity="medium" pulsate={false} hover={true}>
                      <h5 className="font-medium">Backend</h5>
                    </TextWithGlow>
                  </div>
                  <p className="text-sm text-foreground/80 pl-9 leading-relaxed">
                    Node.js, MongoDB
                  </p>
                </ScrollReveal>
                
                {/* Tools Stack with enhanced animations */}
                <ScrollReveal
                  animationStyle="fade"
                  direction="right"
                  delay={0.3}
                  className="transform translate-x-3"
                >
                  <div className="flex items-center mb-2 group">
                    <motion.div 
                      className="p-2 rounded-md bg-gold/10 mr-3 group-hover:bg-gold/20 transition-colors duration-300"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Cpu className="text-gold" size={18} />
                    </motion.div>
                    <TextWithGlow color="rgba(212, 175, 55, 0.8)" intensity="medium" pulsate={false} hover={true}>
                      <h5 className="font-medium">Nástroje</h5>
                    </TextWithGlow>
                  </div>
                  <p className="text-sm text-foreground/80 pl-9 leading-relaxed">
                    Git, Figma, Linux, Bash, VS Code
                  </p>
                </ScrollReveal>
              </motion.div>
            </ScrollReveal>
            
            {/* Enhanced Coding Philosophy with better animations */}
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
                  
                  {/* Enhanced decorative element */}
                  <motion.div
                    className="absolute -bottom-3 right-10 w-16 h-16 rounded-full bg-gradient-to-br from-gold/5 to-gold/15 blur-xl"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>
                
                <ScrollReveal
                  animationStyle="fade"
                  staggerChildren={true}
                  staggerDelay={0.1}
                  className="space-y-3.5"
                >
                  {/* Philosophy items with enhanced animations */}
                  <div className="flex items-start gap-3 transform translate-x-1">
                    <motion.div 
                      className="text-gold bg-gold/10 p-1 rounded-md flex items-center justify-center mt-0.5 h-6 w-6"
                      whileHover={{ scale: 1.2, backgroundColor: "hsl(var(--gold) / 0.2)" }}
                    >
                      <CheckCircle size={16} />
                    </motion.div>
                    <span className="text-foreground/90">Píšu čistý, modulární kód, který je snadné udržovat a škálovat.</span>
                  </div>
                  
                  <div className="flex items-start gap-3 transform -translate-x-1">
                    <motion.div 
                      className="text-gold bg-gold/10 p-1 rounded-md flex items-center justify-center mt-0.5 h-6 w-6"
                      whileHover={{ scale: 1.2, backgroundColor: "hsl(var(--gold) / 0.2)" }}
                    >
                      <CheckCircle size={16} />
                    </motion.div>
                    <span className="text-foreground/90">Upřednostňuji přístupnost a výkon ve všem, co vytvářím.</span>
                  </div>
                  
                  <div className="flex items-start gap-3 transform translate-x-2">
                    <motion.div 
                      className="text-gold bg-gold/10 p-1 rounded-md flex items-center justify-center mt-0.5 h-6 w-6"
                      whileHover={{ scale: 1.2, backgroundColor: "hsl(var(--gold) / 0.2)" }}
                    >
                      <CheckCircle size={16} />
                    </motion.div>
                    <span className="text-foreground/90">Využívám moderní nástroje a technologie pro efektivní vývoj.</span>
                  </div>
                  
                  <div className="flex items-start gap-3 transform -translate-x-1">
                    <motion.div 
                      className="text-gold bg-gold/10 p-1 rounded-md flex items-center justify-center mt-0.5 h-6 w-6"
                      whileHover={{ scale: 1.2, backgroundColor: "hsl(var(--gold) / 0.2)" }}
                    >
                      <CheckCircle size={16} />
                    </motion.div>
                    <span className="text-foreground/90">Neustále se učím novým technologiím, abych zůstal v popředí webového vývoje.</span>
                  </div>
                </ScrollReveal>
              </motion.div>
            </ScrollReveal>
          </div>
          
          {/* Enhanced Journey Column with better visual design */}
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
              {/* Enhanced decorative element */}
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
            
            {/* Enhanced IT Contacts Section with better interactions */}
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
                    
                    {/* Enhanced decorative element */}
                    <motion.div
                      className="absolute top-2 right-14 w-8 h-8 rounded-full bg-purple/10 blur-lg"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.2, 0.4, 0.2]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
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
                      {hobbyItems.map((item, index) => {
                        // Add asymmetric positioning to each item
                        const transformX = index % 2 === 0 ? 'translate-x-1' : '-translate-x-1';
                        
                        return (
                          <div key={index} className={`flex items-start gap-3 transform ${transformX}`}>
                            <motion.span 
                              className="text-purple mt-0.5"
                              animate={{ 
                                x: [0, 5, 0],
                              }}
                              transition={{ 
                                duration: 1.5,
                                repeat: Infinity,
                                repeatDelay: index * 0.5,
                              }}
                            >»</motion.span>
                            <span className="text-foreground/90">{item}</span>
                          </div>
                        );
                      })}
                    </ScrollReveal>
                  </motion.div>
                </CollapsibleContent>
              </Collapsible>
            </ScrollReveal>
            
            {/* Enhanced CTA with better interaction */}
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
