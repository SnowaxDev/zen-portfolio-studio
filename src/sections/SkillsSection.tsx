
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';
import ProgressBar from '../components/ProgressBar';
import { frontendSkills, backendSkills, frameworks, sectionMeta } from '../lib/section-data';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp, Code, Database, Layers } from 'lucide-react';

const SkillsSection: React.FC = () => {
  const [openSkills, setOpenSkills] = useState<string[]>(['frontend', 'backend']);
  const [hoveredFramework, setHoveredFramework] = useState<string | null>(null);
  
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
      transition: { staggerChildren: 0.08, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 120, damping: 14 }
    }
  };

  // Animated background elements
  const BackgroundShapes = () => (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Animated gradient circles */}
      <motion.div 
        className="absolute -right-64 top-32 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-purple/10 to-gold/10 opacity-30 blur-3xl"
        animate={{ 
          x: [0, 15, 0], 
          y: [0, 10, 0],
          scale: [1, 1.05, 1] 
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 15, 
          ease: "easeInOut" 
        }}
      />
      
      <motion.div 
        className="absolute -left-96 bottom-32 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-gold/10 to-purple/10 opacity-20 blur-3xl"
        animate={{ 
          x: [0, -20, 0], 
          y: [0, -15, 0],
          scale: [1, 1.1, 1] 
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 18, 
          ease: "easeInOut",
          delay: 2
        }}
      />
      
      {/* Grid overlay for texture */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px] opacity-25"></div>
    </div>
  );

  return (
    <section id="skills" className="py-24 bg-background relative overflow-hidden">
      <BackgroundShapes />
      
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gradient"
          >
            Moje dovednosti
          </motion.h2>
          
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: "6rem", opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="h-1 bg-gradient-to-r from-gold to-purple mx-auto rounded-full mb-5"
          />
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-4 text-muted-foreground max-w-2xl mx-auto"
          >
            Technologie a nástroje, se kterými rád pracuji
          </motion.p>
        </div>
        
        {/* Skills Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {/* Frontend Skills */}
          <ScrollReveal direction="left" distance={50} className="relative">
            <motion.div 
              className="group bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden transition-all duration-500 shadow-lg shadow-blue-900/10 hover:shadow-blue-900/20"
              whileHover={{ 
                y: -5, 
                boxShadow: "0 20px 40px -20px rgba(37, 99, 235, 0.3)"
              }}
            >
              <Collapsible open={isOpen('frontend')} onOpenChange={() => toggleSkill('frontend')} className="w-full">
                <CollapsibleTrigger className="w-full p-6 flex items-center justify-between text-left group cursor-pointer">
                  <div className="flex items-center">
                    <div className="bg-gradient-to-br from-blue-600/20 to-blue-400/20 p-3.5 rounded-xl mr-4 group-hover:from-blue-600/30 group-hover:to-blue-400/30 transition-colors duration-300 backdrop-blur-md">
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
                    <motion.div 
                      key={index} 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="group"
                    >
                      <ProgressBar 
                        skill={skill.skill} 
                        percentage={skill.percentage} 
                        delay={index * 0.1} 
                        color="primary"
                        isHovered={true}
                      />
                    </motion.div>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            </motion.div>
          </ScrollReveal>
          
          {/* Backend Skills */}
          <ScrollReveal direction="right" distance={50} className="relative">
            <motion.div 
              className="group bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden transition-all duration-500 shadow-lg shadow-purple-900/10 hover:shadow-purple-900/20"
              whileHover={{ 
                y: -5, 
                boxShadow: "0 20px 40px -20px rgba(139, 92, 246, 0.3)"
              }}
            >
              <Collapsible open={isOpen('backend')} onOpenChange={() => toggleSkill('backend')} className="w-full">
                <CollapsibleTrigger className="w-full p-6 flex items-center justify-between text-left group cursor-pointer">
                  <div className="flex items-center">
                    <div className="bg-gradient-to-br from-purple-600/20 to-purple-400/20 p-3.5 rounded-xl mr-4 group-hover:from-purple-600/30 group-hover:to-purple-400/30 transition-colors duration-300 backdrop-blur-md">
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
                    <motion.div 
                      key={index} 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="group"
                    >
                      <ProgressBar 
                        skill={skill.skill} 
                        percentage={skill.percentage} 
                        delay={index * 0.1} 
                        color="secondary"
                        isHovered={true}
                      />
                    </motion.div>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            </motion.div>
          </ScrollReveal>
        </div>
        
        {/* Frameworks and Tools */}
        <div className="mt-24 relative">
          <ScrollReveal className="flex flex-col items-center justify-center mb-12" distance={30} delay={0.2}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <motion.div 
                className="bg-gradient-to-br from-gold/20 to-gold-dark/20 p-5 rounded-full mb-5 ring-2 ring-gold/10 shadow-lg shadow-gold/5 relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                animate={{ 
                  boxShadow: ["0 0 20px rgba(212, 175, 55, 0.2)", "0 0 30px rgba(212, 175, 55, 0.4)", "0 0 20px rgba(212, 175, 55, 0.2)"],
                }}
                transition={{ 
                  boxShadow: { 
                    repeat: Infinity, 
                    duration: 3 
                  }
                }}
              >
                <Layers className="text-gold relative z-10" size={32} />
                
                {/* Inner glow effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-gold/10 to-transparent rounded-full"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    rotate: [0, 360]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </motion.div>
              
              <motion.div
                animate={{
                  rotate: [-2, 2, -2]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-6 -right-6 text-gold/80"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 3L14.5 8.5L20.5 9.5L16 14L17.5 20L12 17L6.5 20L8 14L3.5 9.5L9.5 8.5L12 3Z" fill="currentColor" stroke="currentColor" strokeWidth="0.5" />
                </svg>
              </motion.div>
            </motion.div>
            
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gold to-gold-light relative mb-1">
              Frameworky a Nástroje
            </h3>
            
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "5rem" }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="h-1 bg-gradient-to-r from-gold/50 to-gold-light/50 rounded-full mt-2"
            />
          </ScrollReveal>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto"
          >
            {frameworks.map((framework, index) => (
              <motion.div
                key={framework}
                variants={itemVariants}
                onHoverStart={() => setHoveredFramework(framework)}
                onHoverEnd={() => setHoveredFramework(null)}
                whileHover={{ 
                  y: -5, 
                  transition: { duration: 0.2 }
                }}
              >
                <motion.div 
                  className="px-4 py-2.5 bg-black/40 backdrop-blur-md border border-gold/10 rounded-lg transition-all duration-300"
                  whileHover={{
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    borderColor: "rgba(212, 175, 55, 0.3)",
                    boxShadow: "0 10px 25px -5px rgba(212, 175, 55, 0.2)"
                  }}
                >
                  <motion.span 
                    className="text-sm font-medium relative"
                    animate={{ 
                      color: hoveredFramework === framework ? '#D4AF37' : '#94a3b8'
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {framework}
                    {hoveredFramework === framework && (
                      <motion.span 
                        className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-gold-light to-gold"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.span>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
