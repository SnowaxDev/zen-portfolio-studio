
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';
import ProgressBar from '../components/ProgressBar';
import { frontendSkills, backendSkills, frameworks, sectionMeta } from '../lib/section-data';
import { Code, Database, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';

const SkillsSection: React.FC = () => {
  const [hoveredFramework, setHoveredFramework] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  
  // Page entrance animation variants
  const pageEntranceVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="skills" className="py-24 bg-background relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
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
      
      <motion.div 
        className="container-custom relative z-10"
        variants={pageEntranceVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Section Header */}
        <ScrollReveal
          animationStyle="fade"
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="text-gradient">Moje </span>
            <span className="text-gold">dovednosti</span>
          </h2>
          
          <motion.div 
            className="h-1 bg-gradient-to-r from-gold to-gold-light mx-auto rounded-full mt-2 w-24"
          />
          
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            {sectionMeta.skills.subtitle}
          </p>
        </ScrollReveal>
        
        {/* Skills Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {/* Frontend Skills */}
          <ScrollReveal
            animationStyle="slide"
            direction="right"
            className="h-full"
          >
            <motion.div 
              className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden transition-all duration-500 shadow-lg shadow-blue-900/10 p-6 h-full"
              whileHover={{ 
                y: -5, 
                boxShadow: "0 20px 40px -20px rgba(37, 99, 235, 0.3)"
              }}
            >
              <div className="flex items-center mb-8">
                <div className="bg-gradient-to-br from-blue-600/20 to-blue-400/20 p-3.5 rounded-xl mr-4 backdrop-blur-md">
                  <Code size={24} className="text-blue-400" />
                </div>
                <h3 className="text-xl font-bold">Frontend Vývoj</h3>
              </div>
              
              <div className="space-y-6">
                {frontendSkills.map((skill, index) => (
                  <motion.div 
                    key={index} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    onMouseEnter={() => setHoveredSkill(skill.skill)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    <ProgressBar 
                      skill={skill.skill} 
                      percentage={skill.percentage} 
                      delay={index * 0.1} 
                      color="primary"
                      isHovered={hoveredSkill === skill.skill}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </ScrollReveal>
          
          {/* Backend Skills */}
          <ScrollReveal
            animationStyle="slide"
            direction="left"
            className="h-full"
          >
            <motion.div 
              className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden transition-all duration-500 shadow-lg shadow-purple-900/10 p-6 h-full"
              whileHover={{ 
                y: -5, 
                boxShadow: "0 20px 40px -20px rgba(139, 92, 246, 0.3)"
              }}
            >
              <div className="flex items-center mb-8">
                <div className="bg-gradient-to-br from-purple-600/20 to-purple-400/20 p-3.5 rounded-xl mr-4 backdrop-blur-md">
                  <Database size={24} className="text-purple-400" />
                </div>
                <h3 className="text-xl font-bold">Backend Vývoj</h3>
              </div>
              
              <div className="space-y-6">
                {backendSkills.map((skill, index) => (
                  <motion.div 
                    key={index} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    onMouseEnter={() => setHoveredSkill(skill.skill)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    <ProgressBar 
                      skill={skill.skill} 
                      percentage={skill.percentage} 
                      delay={index * 0.1} 
                      color="secondary"
                      isHovered={hoveredSkill === skill.skill}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
        
        {/* Frameworks and Tools */}
        <ScrollReveal
          animationStyle="fade"
          className="mt-24 relative"
          delay={0.2}
        >
          <div className="flex flex-col items-center justify-center mb-12">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div 
                className="bg-gradient-to-br from-gold/20 to-gold-dark/20 p-5 rounded-full mb-5 ring-2 ring-gold/10 shadow-lg shadow-gold/5 relative overflow-hidden"
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
            
            <h3 className="text-2xl font-bold text-gold relative mb-1">
              Frameworky a Nástroje
            </h3>
            
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "5rem" }}
              transition={{ duration: 0.8 }}
              className="h-1 bg-gradient-to-r from-gold/50 to-gold-light/50 rounded-full mt-2"
            />
          </div>
          
          <motion.div
            className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.05 }
              }
            }}
          >
            {frameworks.map((framework, index) => (
              <motion.div
                key={framework}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 }
                }}
                onHoverStart={() => setHoveredFramework(framework)}
                onHoverEnd={() => setHoveredFramework(null)}
                whileHover={{ 
                  y: -5, 
                  transition: { duration: 0.2 }
                }}
              >
                <motion.div 
                  className={cn(
                    "px-4 py-2.5 backdrop-blur-md rounded-lg transition-all duration-300 border",
                    hoveredFramework === framework
                      ? "bg-black/60 border-gold/30" 
                      : "bg-black/40 border-gold/10"
                  )}
                  whileHover={{
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
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
        </ScrollReveal>
      </motion.div>
    </section>
  );
};

export default SkillsSection;
