
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';
import ProgressBar from '../components/ProgressBar';
import { frontendSkills, backendSkills, frameworks, sectionMeta } from '../lib/section-data';
import { Code, Database, Layers, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMobileAnimationSettings } from '@/hooks/use-mobile-animation-settings';

const SkillsSection: React.FC = () => {
  const [hoveredFramework, setHoveredFramework] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const {
    shouldReduceAnimations,
    getAnimationDuration
  } = useMobileAnimationSettings();
  
  // Container animations for frameworks
  const frameworksContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3
      }
    }
  };

  const frameworkItem = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: getAnimationDuration(0.4),
        ease: "easeOut"
      }
    }
  };

  const frameworkHover = shouldReduceAnimations ? {
    scale: 1
  } : {
    y: -8,
    scale: 1.05,
    transition: {
      duration: 0.2,
      type: "spring",
      stiffness: 400
    }
  };
  
  return (
    <section id="skills" className="py-16 md:py-24 bg-background relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Animated gradient blobs */}
        <motion.div 
          className="absolute -left-96 -top-32 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-gold/5 to-blue-900/5 opacity-30 blur-[120px]" 
          animate={shouldReduceAnimations ? {} : {
            scale: [1, 1.2, 1],
            rotate: [0, 10, 0],
            opacity: [0.3, 0.4, 0.3]
          }} 
          transition={{
            repeat: Infinity,
            duration: 25,
            ease: "easeInOut"
          }} 
        />
        
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.01)_1px,transparent_1px)] bg-[size:35px_35px] opacity-25"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        {/* Section Header */}
        <ScrollReveal animationStyle="fade" className="text-center mb-12 md:mb-16">
          <div className="flex flex-col items-center justify-center">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: getAnimationDuration(0.6) }}
            >
              <span className="text-gold">Moje </span>
              <span className="text-white">dovednosti</span>
            </motion.h2>
            
            {/* Animated underline */}
            <motion.div 
              className="h-1 bg-gradient-to-r from-gold/80 to-gold-light/80 rounded-full w-24 mt-2" 
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "6rem", opacity: 1 }}
              transition={{ delay: 0.3, duration: getAnimationDuration(0.8) }}
            />
            
            <motion.p 
              className="mt-6 text-muted-foreground max-w-2xl mx-auto text-base md:text-lg"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: getAnimationDuration(0.6) }}
            >
              Technologie a nástroje, se kterými rád pracuji
            </motion.p>
          </div>
        </ScrollReveal>
        
        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-16 max-w-5xl mx-auto">
          {/* Frontend Skills Card */}
          <motion.div 
            className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden transition-all duration-500 shadow-xl p-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: getAnimationDuration(0.6) }}
            whileHover={shouldReduceAnimations ? {} : { 
              y: -5,
              boxShadow: "0 20px 40px -10px rgba(59, 130, 246, 0.15)"
            }}
          >
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-br from-blue-600/20 to-blue-400/20 p-3 rounded-xl mr-4 backdrop-blur-md">
                <Code size={24} className="text-blue-400" />
              </div>
              <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-100">
                Frontend Vývoj
              </h3>
            </div>
            
            <div className="space-y-5">
              {frontendSkills.map((skill, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: getAnimationDuration(0.4) }}
                  onMouseEnter={() => setHoveredSkill(skill.skill)} 
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  <ProgressBar 
                    skill={skill.skill} 
                    percentage={skill.percentage} 
                    delay={index * 0.1} 
                    color="blue" 
                    isHovered={hoveredSkill === skill.skill} 
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Backend Skills Card */}
          <motion.div 
            className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden transition-all duration-500 shadow-xl p-6"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: getAnimationDuration(0.6) }}
            whileHover={shouldReduceAnimations ? {} : { 
              y: -5,
              boxShadow: "0 20px 40px -10px rgba(147, 51, 234, 0.15)"
            }}
          >
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-br from-purple-600/20 to-purple-400/20 p-3 rounded-xl mr-4 backdrop-blur-md">
                <Database size={24} className="text-purple-400" />
              </div>
              <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-purple-100">
                Backend Vývoj
              </h3>
            </div>
            
            <div className="space-y-5">
              {backendSkills.map((skill, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: getAnimationDuration(0.4) }}
                  onMouseEnter={() => setHoveredSkill(skill.skill)} 
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  <ProgressBar 
                    skill={skill.skill} 
                    percentage={skill.percentage} 
                    delay={index * 0.1} 
                    color="purple" 
                    isHovered={hoveredSkill === skill.skill} 
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Frameworks and Tools Section */}
        <ScrollReveal animationStyle="fade" className="text-center">
          <div className="flex flex-col items-center justify-center max-w-5xl mx-auto">
            {/* Central icon with enhanced animations */}
            <motion.div 
              className="relative mb-8"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: getAnimationDuration(0.8), type: "spring" }}
            >
              <div className="bg-gradient-to-br from-gold/20 to-gold-dark/20 p-4 rounded-full mb-4 ring-2 ring-gold/20 shadow-lg shadow-gold/10 flex items-center justify-center relative">
                <Layers className="text-gold" size={32} />
                
                {/* Enhanced glow effect */}
                {!shouldReduceAnimations && (
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-gold/20 to-transparent rounded-full" 
                    animate={{
                      opacity: [0.3, 0.7, 0.3],
                      scale: [1, 1.1, 1]
                    }} 
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }} 
                  />
                )}
              </div>
              
              {/* Decorative star with better animation */}
              <motion.div 
                animate={shouldReduceAnimations ? {} : {
                  rotate: [0, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute -top-2 -right-2 text-gold/80"
              >
                <Star className="w-4 h-4" fill="currentColor" />
              </motion.div>
            </motion.div>
            
            <motion.h3 
              className="text-2xl font-bold text-gold mb-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: getAnimationDuration(0.6) }}
            >
              Frameworky a Nástroje
            </motion.h3>
            
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "5rem" }}
              transition={{ delay: 0.8, duration: getAnimationDuration(0.8) }}
              className="h-1 bg-gradient-to-r from-gold/60 to-gold-light/60 rounded-full mb-10"
            />
            
            {/* Enhanced frameworks grid with slide animations */}
            <motion.div 
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 max-w-4xl mx-auto"
              variants={frameworksContainer}
              initial="hidden"
              animate="visible"
            >
              {frameworks.map((framework, index) => (
                <motion.div
                  key={framework}
                  variants={frameworkItem}
                  whileHover={frameworkHover}
                  whileTap={{ scale: 0.95 }}
                  className="flex justify-center"
                  onMouseEnter={() => setHoveredFramework(framework)}
                  onMouseLeave={() => setHoveredFramework(null)}
                >
                  <div className={cn(
                    "px-4 py-3 backdrop-blur-md rounded-xl transition-all duration-300 border text-center w-full min-h-[48px] flex items-center justify-center relative overflow-hidden",
                    hoveredFramework === framework 
                      ? "bg-black/70 border-gold/50 shadow-lg shadow-gold/20" 
                      : "bg-black/40 border-gold/15 hover:border-gold/30"
                  )}>
                    {/* Shine effect on hover */}
                    {hoveredFramework === framework && !shouldReduceAnimations && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/10 to-transparent"
                        initial={{ x: -100 }}
                        animate={{ x: 100 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                      />
                    )}
                    
                    <span className={cn(
                      "text-sm font-medium relative z-10 transition-colors duration-300",
                      hoveredFramework === framework ? "text-gold" : "text-slate-300"
                    )}>
                      {framework}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default SkillsSection;
