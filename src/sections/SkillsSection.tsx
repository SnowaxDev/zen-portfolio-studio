
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
    shouldReduceAnimations
  } = useMobileAnimationSettings();
  
  return (
    <section id="skills" className="py-20 md:py-24 bg-background relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Animated gradient blobs */}
        <motion.div className="absolute -left-96 -top-32 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-gold/5 to-blue-900/5 opacity-30 blur-[120px]" animate={{
        scale: [1, 1.2, 1],
        rotate: [0, 10, 0],
        opacity: [0.3, 0.4, 0.3]
      }} transition={{
        repeat: Infinity,
        duration: 25,
        ease: "easeInOut"
      }} />
        
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.01)_1px,transparent_1px)] bg-[size:35px_35px] opacity-25"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10 max-w-5xl">
        {/* Section Header */}
        <ScrollReveal animationStyle="fade" className="text-center mb-16">
          <div className="flex flex-col items-center justify-center px-0 md:px-[223px]">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              <span className="text-gold">Moje </span>
              <span className="text-white">dovednosti</span>
            </h2>
            
            {/* Animated underline */}
            <motion.div className="h-1 bg-gradient-to-r from-gold/80 to-gold-light/80 rounded-full w-24 mt-2" initial={{
            width: 0,
            opacity: 0
          }} animate={{
            width: "6rem",
            opacity: 1
          }} transition={{
            delay: 0.3,
            duration: 0.8
          }} />
            
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
              Technologie a nástroje, se kterými rád pracuji
            </p>
          </div>
        </ScrollReveal>
        
        {/* Skills Cards Grid - Centered two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16 max-w-4xl mx-auto">
          {/* Frontend Skills Card */}
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden transition-all duration-500 shadow-xl p-4 md:p-6">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-br from-blue-600/20 to-blue-400/20 p-3 rounded-xl mr-4 backdrop-blur-md">
                <Code size={24} className="text-blue-400" />
              </div>
              <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-100">
                Frontend Vývoj
              </h3>
            </div>
            
            <div className="space-y-4 md:space-y-6">
              {frontendSkills.map((skill, index) => <div key={index} onMouseEnter={() => setHoveredSkill(skill.skill)} onMouseLeave={() => setHoveredSkill(null)}>
                  <ProgressBar skill={skill.skill} percentage={skill.percentage} delay={index * 0.1} color="blue" isHovered={hoveredSkill === skill.skill} />
                </div>)}
            </div>
          </div>
          
          {/* Backend Skills Card */}
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden transition-all duration-500 shadow-xl p-4 md:p-6">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-br from-purple-600/20 to-purple-400/20 p-3 rounded-xl mr-4 backdrop-blur-md">
                <Database size={24} className="text-purple-400" />
              </div>
              <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-purple-100">
                Backend Vývoj
              </h3>
            </div>
            
            <div className="space-y-4 md:space-y-6">
              {backendSkills.map((skill, index) => <div key={index} onMouseEnter={() => setHoveredSkill(skill.skill)} onMouseLeave={() => setHoveredSkill(null)}>
                  <ProgressBar skill={skill.skill} percentage={skill.percentage} delay={index * 0.1} color="purple" isHovered={hoveredSkill === skill.skill} />
                </div>)}
            </div>
          </div>
        </div>
        
        {/* Frameworks and Tools - Centered layout */}
        <div className="flex flex-col items-center justify-center max-w-4xl mx-auto">
          {/* Central icon with glow effect */}
          <div className="relative mb-6">
            <div className="bg-gradient-to-br from-gold/20 to-gold-dark/20 p-4 rounded-full mb-4 ring-2 ring-gold/10 shadow-lg shadow-gold/5 flex items-center justify-center">
              <Layers className="text-gold" size={32} />
              
              {/* Inner glow effect */}
              <motion.div className="absolute inset-0 bg-gradient-to-r from-gold/10 to-transparent rounded-full" animate={{
              opacity: [0.3, 0.6, 0.3],
              rotate: [0, 360]
            }} transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }} />
            </div>
            
            {/* Decorative star */}
            <motion.div animate={{
            rotate: [-2, 2, -2]
          }} transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }} className="absolute -top-2 -right-2 text-gold/80">
              <Star className="w-4 h-4" fill="currentColor" />
            </motion.div>
          </div>
          
          <h3 className="text-xl font-bold text-gold mb-2">
            Frameworky a Nástroje
          </h3>
          
          <motion.div initial={{
          width: 0
        }} animate={{
          width: "5rem"
        }} transition={{
          duration: 0.8
        }} className="h-1 bg-gradient-to-r from-gold/50 to-gold-light/50 rounded-full mb-8" />
          
          {/* Frameworks grid layout - Mobile optimized */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-3 max-w-3xl mx-auto">
            {frameworks.map((framework, index) => <motion.div key={framework} initial={{
            opacity: 0,
            y: 10,
            scale: 0.9
          }} animate={{
            opacity: 1,
            y: 0,
            scale: 1
          }} transition={{
            delay: index * 0.05,
            duration: 0.3
          }} whileHover={{
            y: -5,
            scale: 1.05,
            transition: {
              duration: 0.2,
              type: "spring",
              stiffness: 400
            }
          }} whileTap={{
            scale: 0.98
          }} className="flex justify-center" onMouseEnter={() => setHoveredFramework(framework)} onMouseLeave={() => setHoveredFramework(null)}>
                <div className={cn("px-2 py-2 md:px-3 md:py-2 backdrop-blur-md rounded-lg transition-all duration-300 border text-center w-full min-h-[44px] flex items-center justify-center", hoveredFramework === framework ? "bg-black/70 border-gold/40 shadow-lg shadow-gold/10" : "bg-black/40 border-gold/10")}>
                  <span className={cn("text-xs md:text-sm font-medium", hoveredFramework === framework ? "text-gold" : "text-slate-400")}>
                    {framework}
                  </span>
                </div>
              </motion.div>)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
