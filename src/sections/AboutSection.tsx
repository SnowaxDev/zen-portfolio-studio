
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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

  const statVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)",
      borderColor: "hsl(var(--primary) / 0.3)",
      backgroundColor: "hsl(var(--card) / 0.9)",
      transition: { duration: 0.2, ease: "easeOut" }
    }
  };

  const iconAnimationVariants = {
    initial: { rotate: 0 },
    hover: { rotate: 360, transition: { duration: 1.5, ease: "easeInOut" } }
  };

  const checkmarkVariants = {
    initial: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { 
        delay: 0.2 + (i * 0.1),
        duration: 0.4,
        ease: "easeOut"
      }
    })
  };

  const bgBlobVariants = {
    initial: { scale: 0.9, opacity: 0.6 },
    animate: {
      scale: 1.1,
      opacity: 0.8,
      transition: { 
        duration: 8,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section id="about" className="relative py-20 md:py-28 overflow-hidden bg-background">
      {/* Animated background elements */}
      <motion.div 
        className="absolute top-40 left-10 w-64 h-64 rounded-full bg-primary/5 blur-3xl"
        variants={bgBlobVariants}
        initial="initial"
        animate="animate"
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-accent/5 blur-3xl"
        variants={bgBlobVariants}
        initial="initial"
        animate="animate"
        transition={{ delay: 2 }}
      />
      
      <div className="container-custom relative z-10">
        {/* Section title with enhanced animation */}
        <div className="text-center mb-12">
          <ScrollReveal
            animationStyle="fade"
            duration={0.7}
          >
            <h2 className="text-3xl md:text-4xl font-bold relative inline-block">
              {about.title}
              <motion.span 
                className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent rounded-full" 
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
              {about.subtitle}
            </p>
          </ScrollReveal>
        </div>
        
        <div className="flex flex-col-reverse lg:flex-row gap-12">
          {/* Right column with stats and tech stack */}
          <motion.div 
            className="lg:w-1/2 space-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Stats grid with hover animations */}
            <div className="grid grid-cols-2 gap-4">
              {statsData.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-card/70 backdrop-blur-sm border border-white/5 rounded-xl p-6 flex flex-col justify-center shadow-sm hover:shadow-md transition-all duration-300"
                  whileHover="hover"
                  variants={statVariants}
                  onHoverStart={() => setHoveredStat(index)}
                  onHoverEnd={() => setHoveredStat(null)}
                >
                  <motion.span 
                    className="text-3xl md:text-4xl font-bold text-gradient mb-1 flex items-center"
                    animate={{
                      y: hoveredStat === index ? [0, -5, 0] : 0
                    }}
                    transition={{
                      duration: 0.5,
                      ease: "easeOut",
                    }}
                  >
                    {stat.title}
                    <motion.span 
                      className="ml-2 text-primary inline-flex"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ 
                        opacity: hoveredStat === index ? 1 : 0,
                        scale: hoveredStat === index ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <MoveUp size={18} />
                    </motion.span>
                  </motion.span>
                  <p className="text-sm text-foreground/70">{stat.subtitle}</p>
                </motion.div>
              ))}
            </div>
            
            {/* Tech stack with rotating icons */}
            <ScrollReveal
              animationStyle="slide"
              direction="right"
              distance={30}
              delay={0.2}
            >
              <motion.div 
                className="bg-card/70 backdrop-blur-sm border border-white/5 rounded-xl p-6 shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-500"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-6">
                  <motion.div 
                    className="p-3 rounded-lg bg-primary/10 mr-4"
                    variants={iconAnimationVariants}
                    initial="initial"
                    whileHover="hover"
                  >
                    <Cpu className="text-primary" size={24} />
                  </motion.div>
                  <h4 className="text-xl font-semibold">{about.myStack.title}</h4>
                </div>
                
                <div className="space-y-6">
                  {techStackData.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.div 
                        key={index} 
                        className="group"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 * index, duration: 0.5 }}
                      >
                        <div className="flex items-center mb-2">
                          <motion.div 
                            className="p-2 rounded-md bg-primary/10 mr-3 group-hover:bg-primary/20 transition-colors duration-300"
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                          >
                            <Icon className="text-primary" size={18} />
                          </motion.div>
                          <h5 className="font-medium">{item.title}</h5>
                        </div>
                        <p className="text-sm text-foreground/80 pl-9 leading-relaxed">
                          {item.items}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </ScrollReveal>
          </motion.div>
          
          {/* Left column with journey text and philosophy */}
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
                {about.journey}
              </h3>
            </ScrollReveal>
            
            {about.journeyText.map((paragraph, index) => (
              <ScrollReveal
                key={index}
                animationStyle="fade"
                delay={0.15 * index}
                direction="left"
                distance={20}
              >
                <p className="text-lg text-foreground/90 leading-relaxed">
                  {paragraph}
                </p>
              </ScrollReveal>
            ))}
            
            {/* Philosophy with animated checkmarks */}
            <ScrollReveal
              animationStyle="scale"
              delay={0.3}
            >
              <motion.div 
                className="mt-6 p-5 bg-card/70 backdrop-blur-sm rounded-xl border border-primary/10 shadow-sm hover:shadow-md transition-all duration-300"
                whileHover={{ 
                  boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)",
                  borderColor: "hsl(var(--primary) / 0.2)"
                }}
              >
                <div className="flex items-center mb-4">
                  <motion.div 
                    className="p-3 rounded-lg bg-primary/10 mr-4"
                    whileHover={{ rotate: 360, backgroundColor: "hsl(var(--primary) / 0.2)" }}
                    transition={{ duration: 0.6 }}
                  >
                    <Code2 className="text-primary" size={24} />
                  </motion.div>
                  <h4 className="text-xl font-semibold">{about.codingPhilosophy.title}</h4>
                </div>
                
                <ul className="space-y-3">
                  {philosophyItems.map((item, index) => (
                    <motion.li 
                      key={index} 
                      className="flex items-start gap-3"
                      custom={index}
                      variants={checkmarkVariants}
                      initial="initial"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-50px" }}
                    >
                      <motion.span 
                        className="text-primary bg-primary/10 p-1 rounded-md flex items-center justify-center mt-0.5"
                        whileHover={{ scale: 1.2, backgroundColor: "hsl(var(--primary) / 0.2)" }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </motion.span>
                      <span className="text-foreground/90">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </ScrollReveal>
            
            {/* Tech Hobbies with animated collapsible */}
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
                <CollapsibleTrigger className="flex w-full items-center justify-between p-5 bg-card/70 backdrop-blur-sm rounded-xl border border-accent/10 hover:bg-card/90 transition-all duration-300">
                  <div className="flex items-center">
                    <motion.div 
                      className="p-3 rounded-lg bg-accent/10 mr-4"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.7 }}
                    >
                      <Server className="text-accent" size={24} />
                    </motion.div>
                    <h4 className="text-xl font-semibold">{about.techHobbies.title}</h4>
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
                    className="p-5 pt-3 bg-card/60 backdrop-blur-sm rounded-b-xl border-x border-b border-accent/10 shadow-sm"
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
                            className="text-accent mt-0.5"
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
                className="inline-flex items-center mt-6 px-6 py-2.5 bg-gradient-to-r from-primary to-accent text-white rounded-lg shadow-lg hover:shadow-primary/20 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {about.contact?.ctaText || "Spolupracujme"}
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
