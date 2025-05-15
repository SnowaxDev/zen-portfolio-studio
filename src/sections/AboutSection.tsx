
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Server, Cpu, ChevronDown, MoveRight, MoveUp, RotateCw } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { statsData, techStackData, philosophyItems, hobbyItems, sectionMeta } from '../lib/section-data';
import ScrollReveal from '@/components/ScrollReveal';

const AboutSection: React.FC = () => {
  const { about } = sectionMeta;
  const [isHobbyOpen, setIsHobbyOpen] = useState(false);
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);

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

  return (
    <section id="about" className="relative py-20 md:py-28 overflow-hidden bg-background">
      {/* Animated background elements */}
      <motion.div 
        className="absolute top-40 left-10 w-64 h-64 rounded-full bg-primary/5 blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.5, scale: 1 }}
        viewport={{ once: true }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-accent/5 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.4, scale: 1 }}
        viewport={{ once: true }}
      />
      
      <div className="container-custom relative z-10">
        {/* Section title with enhanced animation */}
        <div className="text-center mb-12">
          <ScrollReveal
            animationStyle="fade"
            duration={0.7}
          >
            <h2 className="text-3xl md:text-4xl font-bold relative inline-block">
              O Mně
              <motion.span 
                className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-gold to-gold-light rounded-full" 
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
              />
            </h2>
          </ScrollReveal>
          
          <ScrollReveal
            delay={0.3}
            animationStyle="fade"
          >
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Student s vášní pro webový vývoj a technologie
            </p>
          </ScrollReveal>
        </div>
        
        {/* Stats Grid */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          initial="hidden" 
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.div 
            className="bg-card/70 backdrop-blur-sm border border-gold/10 rounded-xl p-5 hover:border-gold/30 transition-all duration-300"
            variants={itemVariants}
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(212, 175, 55, 0.1)" }}
            onHoverStart={() => setHoveredStat(0)}
            onHoverEnd={() => setHoveredStat(null)}
          >
            <motion.h3 
              className="text-3xl font-bold text-gold mb-1 flex items-center"
              animate={{ y: hoveredStat === 0 ? [0, -3, 0] : 0 }}
              transition={{ duration: 0.5 }}
            >
              2+
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
          
          <motion.div 
            className="bg-card/70 backdrop-blur-sm border border-gold/10 rounded-xl p-5 hover:border-gold/30 transition-all duration-300"
            variants={itemVariants}
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(212, 175, 55, 0.1)" }}
            onHoverStart={() => setHoveredStat(1)}
            onHoverEnd={() => setHoveredStat(null)}
          >
            <motion.h3 
              className="text-3xl font-bold text-gold mb-1 flex items-center"
              animate={{ y: hoveredStat === 1 ? [0, -3, 0] : 0 }}
              transition={{ duration: 0.5 }}
            >
              10+
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
          
          <motion.div 
            className="bg-card/70 backdrop-blur-sm border border-gold/10 rounded-xl p-5 hover:border-gold/30 transition-all duration-300"
            variants={itemVariants}
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(212, 175, 55, 0.1)" }}
            onHoverStart={() => setHoveredStat(2)}
            onHoverEnd={() => setHoveredStat(null)}
          >
            <motion.h3 
              className="text-3xl font-bold text-gold mb-1 flex items-center"
              animate={{ y: hoveredStat === 2 ? [0, -3, 0] : 0 }}
              transition={{ duration: 0.5 }}
            >
              5+
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
          
          <motion.div 
            className="bg-card/70 backdrop-blur-sm border border-gold/10 rounded-xl p-5 hover:border-gold/30 transition-all duration-300"
            variants={itemVariants}
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(212, 175, 55, 0.1)" }}
            onHoverStart={() => setHoveredStat(3)}
            onHoverEnd={() => setHoveredStat(null)}
          >
            <motion.h3 
              className="text-3xl font-bold text-gold mb-1 flex items-center"
              animate={{ y: hoveredStat === 3 ? [0, -3, 0] : 0 }}
              transition={{ duration: 0.5 }}
            >
              3+
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
        </motion.div>
        
        <div className="flex flex-col-reverse lg:flex-row gap-12">
          {/* Tech Stack Column */}
          <motion.div 
            className="lg:w-1/2 space-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <ScrollReveal
              animationStyle="slide"
              direction="right"
              delay={0.2}
            >
              <motion.div 
                className="bg-card/70 backdrop-blur-sm border border-white/5 rounded-xl p-6 shadow-sm hover:shadow-lg hover:border-gold/20 transition-all duration-500"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-6">
                  <motion.div 
                    className="p-3 rounded-lg bg-gold/10 mr-4"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.7 }}
                  >
                    <RotateCw className="text-gold" size={24} />
                  </motion.div>
                  <h4 className="text-xl font-semibold">Můj Vývojový Stack</h4>
                </div>
                
                {/* Frontend Stack */}
                <motion.div 
                  className="mb-6"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center mb-2">
                    <motion.div 
                      className="p-2 rounded-md bg-gold/10 mr-3 group-hover:bg-gold/20 transition-colors duration-300"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Code2 className="text-gold" size={18} />
                    </motion.div>
                    <h5 className="font-medium">Frontend</h5>
                  </div>
                  <p className="text-sm text-foreground/80 pl-9 leading-relaxed">
                    React, TypeScript, Next.js, Tailwind CSS, Framer Motion
                  </p>
                </motion.div>
                
                {/* Backend Stack */}
                <motion.div 
                  className="mb-6"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                >
                  <div className="flex items-center mb-2">
                    <motion.div 
                      className="p-2 rounded-md bg-gold/10 mr-3 group-hover:bg-gold/20 transition-colors duration-300"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Server className="text-gold" size={18} />
                    </motion.div>
                    <h5 className="font-medium">Backend</h5>
                  </div>
                  <p className="text-sm text-foreground/80 pl-9 leading-relaxed">
                    Node.js, MongoDB
                  </p>
                </motion.div>
                
                {/* Tools Stack */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <div className="flex items-center mb-2">
                    <motion.div 
                      className="p-2 rounded-md bg-gold/10 mr-3 group-hover:bg-gold/20 transition-colors duration-300"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Cpu className="text-gold" size={18} />
                    </motion.div>
                    <h5 className="font-medium">Nástroje</h5>
                  </div>
                  <p className="text-sm text-foreground/80 pl-9 leading-relaxed">
                    Git, Figma, Linux, Bash, VS Code
                  </p>
                </motion.div>
              </motion.div>
            </ScrollReveal>
            
            {/* Coding Philosophy */}
            <ScrollReveal
              animationStyle="scale"
              delay={0.3}
            >
              <motion.div 
                className="mt-6 p-5 bg-card/70 backdrop-blur-sm rounded-xl border border-gold/10 shadow-sm hover:shadow-md transition-all duration-300"
                whileHover={{ 
                  boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)",
                  borderColor: "hsl(var(--gold) / 0.2)"
                }}
              >
                <div className="flex items-center mb-4">
                  <motion.div 
                    className="p-3 rounded-lg bg-gold/10 mr-4"
                    whileHover={{ rotate: 360, backgroundColor: "hsl(var(--gold) / 0.2)" }}
                    transition={{ duration: 0.6 }}
                  >
                    <Code2 className="text-gold" size={24} />
                  </motion.div>
                  <h4 className="text-xl font-semibold">Moje Kódovací Filosofie</h4>
                </div>
                
                <ul className="space-y-3">
                  <motion.li 
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                  >
                    <motion.span 
                      className="text-gold bg-gold/10 p-1 rounded-md flex items-center justify-center mt-0.5"
                      whileHover={{ scale: 1.2, backgroundColor: "hsl(var(--gold) / 0.2)" }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </motion.span>
                    <span className="text-foreground/90">Píšu čistý, modulární kód, který je snadné udržovat a škálovat.</span>
                  </motion.li>
                  
                  <motion.li 
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <motion.span 
                      className="text-gold bg-gold/10 p-1 rounded-md flex items-center justify-center mt-0.5"
                      whileHover={{ scale: 1.2, backgroundColor: "hsl(var(--gold) / 0.2)" }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </motion.span>
                    <span className="text-foreground/90">Upřednostňuji přístupnost a výkon ve všem, co vytvářím.</span>
                  </motion.li>
                  
                  <motion.li 
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <motion.span 
                      className="text-gold bg-gold/10 p-1 rounded-md flex items-center justify-center mt-0.5"
                      whileHover={{ scale: 1.2, backgroundColor: "hsl(var(--gold) / 0.2)" }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </motion.span>
                    <span className="text-foreground/90">Využívám moderní nástroje a technologie pro efektivní vývoj.</span>
                  </motion.li>
                  
                  <motion.li 
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                  >
                    <motion.span 
                      className="text-gold bg-gold/10 p-1 rounded-md flex items-center justify-center mt-0.5"
                      whileHover={{ scale: 1.2, backgroundColor: "hsl(var(--gold) / 0.2)" }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </motion.span>
                    <span className="text-foreground/90">Neustále se učím novým technologiím, abych zůstal v popředí webového vývoje.</span>
                  </motion.li>
                </ul>
              </motion.div>
            </ScrollReveal>
          </motion.div>
          
          {/* Journey Column */}
          <motion.div 
            className="lg:w-1/2 space-y-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <ScrollReveal
              animationStyle="fade"
              duration={0.6}
            >
              <h3 className="text-2xl font-bold mb-2 text-gradient">
                Moje Cesta
              </h3>
            </ScrollReveal>
            
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
            
            {/* IT Contacts Section */}
            <ScrollReveal
              animationStyle="slide"
              direction="up"
              delay={0.4}
            >
              <Collapsible 
                open={isHobbyOpen} 
                onOpenChange={setIsHobbyOpen}
                className="w-full mt-6"
              >
                <CollapsibleTrigger className="flex w-full items-center justify-between p-5 bg-card/70 backdrop-blur-sm rounded-xl border border-purple/10 hover:bg-card/90 transition-all duration-300">
                  <div className="flex items-center">
                    <motion.div 
                      className="p-3 rounded-lg bg-purple/10 mr-4"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.7 }}
                    >
                      <Server className="text-purple" size={24} />
                    </motion.div>
                    <h4 className="text-xl font-semibold">Moje IT Koníčky</h4>
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
                    className="p-5 pt-3 bg-card/60 backdrop-blur-sm rounded-b-xl border-x border-b border-purple/10 shadow-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <ul className="space-y-3">
                      {hobbyItems.map((item, index) => (
                        <motion.li 
                          key={index} 
                          className="flex items-start gap-3"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * index + 0.3 }}
                        >
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
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </CollapsibleContent>
              </Collapsible>
            </ScrollReveal>
            
            <ScrollReveal
              animationStyle="bounce"
              delay={0.5}
            >
              <motion.a 
                href="#contact"
                className="inline-flex items-center mt-6 px-6 py-2.5 bg-gradient-to-r from-gold to-gold-light text-background font-medium rounded-lg shadow-lg hover:shadow-gold/20 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Spolupracujme
                <motion.span
                  className="ml-2"
                  animate={{ 
                    x: [0, 5, 0], 
                  }}
                  transition={{ 
                    duration: 1.2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  <MoveRight size={18} />
                </motion.span>
              </motion.a>
            </ScrollReveal>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
