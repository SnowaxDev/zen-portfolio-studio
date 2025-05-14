
import React from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';
import SectionTitle from '../components/SectionTitle';
import { Code2, Server, Cpu } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { 
  statsData, 
  techStackData, 
  philosophyItems,
  hobbyItems,
  sectionMeta
} from '../lib/section-data';

const AboutSection: React.FC = () => {
  const { about } = sectionMeta;
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
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
    <section id="about" className="relative py-24 md:py-32 overflow-hidden bg-background">
      {/* Dark design elements */}
      <div className="absolute top-40 left-10 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-accent/5 blur-3xl" />
      
      <div className="container-custom relative z-10">
        <SectionTitle 
          title={about.title} 
          subtitle={about.subtitle}
        />
        
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Left column */}
          <motion.div 
            className="lg:w-1/2 space-y-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <ScrollReveal direction="right">
              <h3 className="text-2xl font-bold mb-2 text-gradient">{about.journey}</h3>
            </ScrollReveal>
            
            {about.journeyText.map((paragraph, index) => (
              <ScrollReveal key={index} delay={index * 0.1 + 0.1} animationStyle="fade">
                <p className="text-lg text-foreground/90 leading-relaxed">
                  {paragraph}
                </p>
              </ScrollReveal>
            ))}
            
            <ScrollReveal width="100%" delay={0.3} animationStyle="scale">
              <motion.div 
                className="mt-6 p-5 bg-card/80 backdrop-blur-sm rounded-xl border border-primary/10 shadow-lg hover:shadow-primary/10 transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-lg bg-primary/10 mr-4">
                    <Code2 className="text-primary" size={24} />
                  </div>
                  <h4 className="text-xl font-semibold">{about.codingPhilosophy.title}</h4>
                </div>
                
                <ul className="space-y-4 pl-1">
                  {philosophyItems.map((item, index) => (
                    <motion.li 
                      key={index} 
                      className="flex items-start gap-3"
                      variants={itemVariants}
                      custom={index}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <span className="text-primary bg-primary/10 p-1 rounded-md flex items-center justify-center mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </span>
                      <span className="text-foreground/90">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </ScrollReveal>
            
            <ScrollReveal width="100%" delay={0.4} animationStyle="scale">
              <Collapsible className="w-full mt-6">
                <CollapsibleTrigger className="flex w-full items-center justify-between p-5 bg-card/80 backdrop-blur-sm rounded-t-xl border border-accent/10 hover:bg-card/90 transition-all duration-300">
                  <div className="flex items-center">
                    <div className="p-3 rounded-lg bg-accent/10 mr-4">
                      <Server className="text-accent" size={24} />
                    </div>
                    <h4 className="text-xl font-semibold">{about.techHobbies.title}</h4>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform transition-transform duration-300">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </CollapsibleTrigger>
                <CollapsibleContent className="overflow-hidden">
                  <div className="p-5 pt-3 bg-card/60 backdrop-blur-sm rounded-b-xl border-x border-b border-accent/10 shadow-lg">
                    <ul className="space-y-3">
                      {hobbyItems.map((item, index) => (
                        <motion.li 
                          key={index} 
                          className="flex items-start gap-3"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <span className="text-accent mt-0.5">»</span>
                          <span className="text-foreground/90">{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </ScrollReveal>
            
            <ScrollReveal distance={30} delay={0.6}>
              <a 
                href="#contact"
                className="inline-block mt-6 px-6 py-2.5 bg-gradient-to-r from-primary to-accent text-white rounded-lg shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:scale-105"
              >
                {about.contact?.ctaText || "Spolupracujme"}
              </a>
            </ScrollReveal>
          </motion.div>
          
          {/* Right column */}
          <motion.div 
            className="lg:w-1/2 space-y-8"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="grid grid-cols-2 gap-4">
              {statsData.map((item, index) => (
                <ScrollReveal key={index} delay={item.delay} width="100%" animationStyle="scale">
                  <AspectRatio ratio={1.5} className="w-full h-full">
                    <motion.div 
                      className="h-full bg-card/80 backdrop-blur-sm p-5 rounded-xl border border-border/40 shadow-md hover:border-primary/30 hover:shadow-primary/5 transition-all duration-300 flex flex-col justify-center"
                      whileHover={{ 
                        scale: 1.03, 
                        transition: { duration: 0.2 } 
                      }}
                    >
                      <motion.span
                        className="font-bold text-3xl md:text-4xl text-gradient mb-2 block"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.8 }}
                        transition={{ 
                          type: "spring",
                          stiffness: 100,
                          duration: 0.6,
                          delay: 0.2 + index * 0.1
                        }}
                      >
                        {item.title}
                      </motion.span>
                      <p className="text-sm text-foreground/70">{item.subtitle}</p>
                    </motion.div>
                  </AspectRatio>
                </ScrollReveal>
              ))}
            </div>
            
            <ScrollReveal width="100%" delay={0.4} animationStyle="fade">
              <motion.div 
                className="bg-card/80 backdrop-blur-sm p-6 rounded-xl border border-border shadow-md hover:shadow-lg transition-all duration-300"
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  transition: { duration: 0.2 }
                }}
              >
                <div className="flex items-center mb-5">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 mr-4">
                    <Cpu className="text-primary" size={24} />
                  </div>
                  <h4 className="text-xl font-semibold">{about.myStack.title}</h4>
                </div>
                
                <div className="space-y-5">
                  {techStackData.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                        className="group"
                      >
                        <div className="flex items-center mb-2">
                          <div className="p-2 rounded-md bg-primary/10 mr-3 group-hover:bg-primary/20 transition-colors duration-300">
                            <Icon className="text-primary" size={18} />
                          </div>
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
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
