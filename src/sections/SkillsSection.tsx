
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';
import { frontendSkills, backendSkills, frameworks, sectionMeta } from '../lib/section-data';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp, Code, Database, Layers } from 'lucide-react';

const SkillsSection: React.FC = () => {
  const [openSkills, setOpenSkills] = useState<string[]>(['frontend', 'backend']);
  
  const toggleSkill = (skill: string) => {
    setOpenSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill) 
        : [...prev, skill]
    );
  };
  
  const isOpen = (skill: string) => openSkills.includes(skill);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 120 }
    }
  };

  // Animated background shape
  const AnimatedShape = () => (
    <motion.div 
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.05 }}
      transition={{ duration: 1.5 }}
    >
      <motion.div 
        className="absolute -right-64 top-32 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-purple to-gold opacity-20 blur-3xl"
        animate={{ 
          x: [0, 10, 0], 
          y: [0, 15, 0],
          scale: [1, 1.05, 1] 
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 10, 
          ease: "easeInOut" 
        }}
      />
      <motion.div 
        className="absolute -left-96 bottom-32 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-gold to-purple opacity-10 blur-3xl"
        animate={{ 
          x: [0, -20, 0], 
          y: [0, -15, 0],
          scale: [1, 1.1, 1] 
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 12, 
          ease: "easeInOut",
          delay: 1 
        }}
      />
    </motion.div>
  );

  return (
    <section id="skills" className="py-24 bg-background relative">
      <AnimatedShape />
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4 text-gradient"
          >
            Moje dovednosti
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "6rem" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"
          ></motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-5 text-muted-foreground max-w-2xl mx-auto"
          >
            Technologie a nástroje, se kterými rád pracuji
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Frontend Skills */}
          <ScrollReveal direction="left" distance={50} className="relative">
            <motion.div 
              className="bg-card/60 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden transition-all duration-500"
              whileHover={{ 
                y: -5, 
                boxShadow: "0 15px 30px -15px rgba(139, 92, 246, 0.3)"
              }}
            >
              <Collapsible open={isOpen('frontend')} onOpenChange={() => toggleSkill('frontend')} className="w-full">
                <CollapsibleTrigger className="w-full p-6 flex items-center justify-between text-left group">
                  <div className="flex items-center">
                    <div className="bg-blue-500/20 p-3 rounded-xl mr-4 group-hover:bg-blue-500/30 transition-colors duration-300">
                      <Code size={24} className="text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold group-hover:text-blue-400 transition-colors duration-300">Frontend Vývoj</h3>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen('frontend') ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-muted-foreground"
                  >
                    {isOpen('frontend') ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </motion.div>
                </CollapsibleTrigger>
                
                <CollapsibleContent className="px-6 pb-6 space-y-6">
                  {frontendSkills.map((skill, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">
                          {skill.skill}
                        </span>
                        <span className="text-xs font-semibold bg-blue-500/20 px-2 py-1 rounded-full text-blue-300">
                          {skill.percentage}%
                        </span>
                      </div>
                      <div className="h-2 bg-blue-900/20 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.percentage}%` }}
                          viewport={{ once: true }}
                          transition={{ 
                            duration: 1.2, 
                            delay: index * 0.1,
                            ease: [0.34, 1.56, 0.64, 1]
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            </motion.div>
          </ScrollReveal>
          
          {/* Backend Skills */}
          <ScrollReveal direction="right" distance={50} className="relative">
            <motion.div 
              className="bg-card/60 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden transition-all duration-500"
              whileHover={{ 
                y: -5, 
                boxShadow: "0 15px 30px -15px rgba(212, 175, 55, 0.3)"
              }}
            >
              <Collapsible open={isOpen('backend')} onOpenChange={() => toggleSkill('backend')} className="w-full">
                <CollapsibleTrigger className="w-full p-6 flex items-center justify-between text-left group">
                  <div className="flex items-center">
                    <div className="bg-purple-500/20 p-3 rounded-xl mr-4 group-hover:bg-purple-500/30 transition-colors duration-300">
                      <Database size={24} className="text-purple-400" />
                    </div>
                    <h3 className="text-xl font-bold group-hover:text-purple-400 transition-colors duration-300">Backend Vývoj</h3>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen('backend') ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-muted-foreground"
                  >
                    {isOpen('backend') ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </motion.div>
                </CollapsibleTrigger>
                
                <CollapsibleContent className="px-6 pb-6 space-y-6">
                  {backendSkills.map((skill, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">
                          {skill.skill}
                        </span>
                        <span className="text-xs font-semibold bg-purple-500/20 px-2 py-1 rounded-full text-purple-300">
                          {skill.percentage}%
                        </span>
                      </div>
                      <div className="h-2 bg-purple-900/20 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-purple-600 to-purple-400 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.percentage}%` }}
                          viewport={{ once: true }}
                          transition={{ 
                            duration: 1.2, 
                            delay: index * 0.1,
                            ease: [0.34, 1.56, 0.64, 1]
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            </motion.div>
          </ScrollReveal>
        </div>
        
        {/* Frameworks and Tools */}
        <div className="mt-24">
          <ScrollReveal className="flex flex-col items-center justify-center mb-12" distance={30} delay={0.2}>
            <motion.div 
              className="bg-gradient-to-br from-primary/30 to-accent/30 p-5 rounded-full mb-5 ring-2 ring-white/10 shadow-lg shadow-purple/10"
              whileHover={{ scale: 1.05 }}
              animate={{ 
                boxShadow: ["0 0 10px rgba(139, 92, 246, 0.3)", "0 0 20px rgba(139, 92, 246, 0.5)", "0 0 10px rgba(139, 92, 246, 0.3)"],
                rotate: [0, 5, 0, -5, 0]
              }}
              transition={{ 
                boxShadow: { 
                  repeat: Infinity, 
                  duration: 3 
                },
                rotate: { 
                  repeat: Infinity, 
                  duration: 8,
                  ease: "easeInOut"
                }
              }}
            >
              <Layers className="text-gold" size={32} />
            </motion.div>
            <h3 className="text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary/90 to-accent/90">Frameworky a Nástroje</h3>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "5rem" }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="h-1 bg-gradient-to-r from-primary/50 to-accent/50 rounded-full"
            ></motion.div>
          </ScrollReveal>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto"
          >
            {frameworks.map((framework, index) => (
              <motion.div
                key={framework}
                variants={itemVariants}
                className="group"
                whileHover={{ 
                  y: -5, 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
              >
                <motion.div 
                  className="px-4 py-2 bg-card/70 backdrop-blur-sm border border-white/10 rounded-lg transition-all duration-300 hover:border-gold/30 hover:bg-card/90"
                  whileHover={{
                    boxShadow: "0 10px 25px -5px rgba(212, 175, 55, 0.25)"
                  }}
                >
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    {framework}
                  </span>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="w-full max-w-3xl mx-auto mt-16 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          />
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
