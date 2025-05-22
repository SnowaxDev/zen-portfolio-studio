
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';
import ProgressBar from '../components/ProgressBar';
import { frontendSkills, backendSkills, frameworks, sectionMeta } from '../lib/section-data';
import { Code, Database, Layers, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMobileAnimationSettings } from '@/hooks/use-mobile-animation-settings';
import { Card, CardContent, CardHeader } from '../components/ui/card';

const SkillsSection: React.FC = () => {
  const [hoveredFramework, setHoveredFramework] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const { shouldReduceAnimations } = useMobileAnimationSettings();
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.5,
        when: "beforeChildren"
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

  // Skill card variants
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        mass: 0.8
      }
    },
    hover: {
      y: -8,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 20
      }
    }
  };

  return (
    <section id="skills" className="py-20 md:py-24 bg-background relative overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Animated gradient blobs */}
        <motion.div 
          className="absolute -left-96 -top-32 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-gold/5 to-blue-900/5 opacity-30 blur-[120px]"
          animate={{ 
            scale: [1, 1.2, 1], 
            rotate: [0, 10, 0],
            opacity: [0.3, 0.4, 0.3]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 25, 
            ease: "easeInOut",
          }}
        />
        
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.01)_1px,transparent_1px)] bg-[size:35px_35px] opacity-25"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        {/* Section Header with enhanced styling */}
        <ScrollReveal animationStyle="fade" className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-32 h-32 opacity-20">
              <motion.div 
                className="absolute inset-0 rounded-full bg-gold/30 blur-3xl"
                animate={{ 
                  scale: [0.8, 1.2, 0.8], 
                  opacity: [0.1, 0.3, 0.1] 
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 7, 
                  ease: "easeInOut" 
                }}
              />
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-2">
              <span className="text-gold">Moje </span>
              <span className="text-white">dovednosti</span>
            </h2>
            
            {/* Animated underline */}
            <div className="relative flex justify-center mb-6">
              <motion.div 
                className="h-1 bg-gradient-to-r from-gold/80 to-gold-light/80 rounded-full w-24"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "6rem", opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              />
              
              {/* Star decoration */}
              <motion.div
                className="absolute -right-6 -top-1"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <Star className="w-4 h-4 text-gold/70" fill="currentColor" />
              </motion.div>
            </div>
            
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
              Technologie a nástroje, se kterými rád pracuji
            </p>
          </motion.div>
        </ScrollReveal>
        
        {/* Skills Cards Grid with improved layout */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {/* Frontend Skills Card */}
          <ScrollReveal animationStyle="slide" direction="right" className="h-full">
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover={shouldReduceAnimations ? {} : "hover"}
              className="h-full"
            >
              <Card className="bg-black/40 backdrop-blur-xl border border-white/10 overflow-hidden transition-all duration-500 shadow-xl shadow-blue-900/10 h-full">
                <CardHeader className="px-6 pt-6 pb-3">
                  <div className="flex items-center mb-4">
                    <motion.div 
                      className="bg-gradient-to-br from-blue-600/20 to-blue-400/20 p-3.5 rounded-xl mr-4 backdrop-blur-md"
                      whileHover={{ rotate: 360, scale: 1.05 }}
                      transition={{ duration: 0.7 }}
                    >
                      <Code size={26} className="text-blue-400" />
                    </motion.div>
                    <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-100">
                      Frontend Vývoj
                    </h3>
                  </div>
                </CardHeader>
                
                <CardContent className="px-6 pb-6">
                  <motion.div 
                    className="space-y-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {frontendSkills.map((skill, index) => (
                      <motion.div 
                        key={index} 
                        variants={itemVariants}
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
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </ScrollReveal>
          
          {/* Backend Skills Card */}
          <ScrollReveal animationStyle="slide" direction="left" className="h-full">
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover={shouldReduceAnimations ? {} : "hover"}
              className="h-full"
            >
              <Card className="bg-black/40 backdrop-blur-xl border border-white/10 overflow-hidden transition-all duration-500 shadow-xl shadow-purple-900/10 h-full">
                <CardHeader className="px-6 pt-6 pb-3">
                  <div className="flex items-center mb-4">
                    <motion.div 
                      className="bg-gradient-to-br from-purple-600/20 to-purple-400/20 p-3.5 rounded-xl mr-4 backdrop-blur-md"
                      whileHover={{ rotate: 360, scale: 1.05 }}
                      transition={{ duration: 0.7 }}
                    >
                      <Database size={26} className="text-purple-400" />
                    </motion.div>
                    <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-purple-100">
                      Backend Vývoj
                    </h3>
                  </div>
                </CardHeader>
                
                <CardContent className="px-6 pb-6">
                  <motion.div 
                    className="space-y-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {backendSkills.map((skill, index) => (
                      <motion.div 
                        key={index} 
                        variants={itemVariants}
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
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </ScrollReveal>
        </div>
        
        {/* Frameworks and Tools with improved layout */}
        <ScrollReveal animationStyle="fade" className="relative" delay={0.2}>
          <div className="flex flex-col items-center justify-center mb-12 relative">
            {/* Central icon with glow effect */}
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div 
                className="bg-gradient-to-br from-gold/20 to-gold-dark/20 p-6 rounded-full mb-6 ring-2 ring-gold/10 shadow-lg shadow-gold/5 relative overflow-hidden"
                animate={{ 
                  boxShadow: shouldReduceAnimations ? 
                    "0 0 20px rgba(212, 175, 55, 0.2)" : 
                    ["0 0 20px rgba(212, 175, 55, 0.2)", "0 0 30px rgba(212, 175, 55, 0.4)", "0 0 20px rgba(212, 175, 55, 0.2)"],
                }}
                transition={{ 
                  boxShadow: shouldReduceAnimations ? 
                    {} : 
                    { repeat: Infinity, duration: 3 }
                }}
              >
                <Layers className="text-gold relative z-10" size={36} />
                
                {/* Inner glow effect */}
                {!shouldReduceAnimations && (
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
                )}
              </motion.div>
              
              {/* Decorative star */}
              <motion.div
                animate={shouldReduceAnimations ? {} : {
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
          
          {/* Improved frameworks grid layout */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4 max-w-4xl mx-auto"
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
                  hidden: { opacity: 0, y: 10, scale: 0.9 },
                  visible: { opacity: 1, y: 0, scale: 1 }
                }}
                onHoverStart={() => setHoveredFramework(framework)}
                onHoverEnd={() => setHoveredFramework(null)}
                whileHover={{ 
                  y: -5, 
                  scale: 1.05,
                  transition: { duration: 0.2, type: "spring", stiffness: 400 }
                }}
                whileTap={{ scale: 0.98 }}
                className="flex justify-center"
              >
                <motion.div 
                  className={cn(
                    "px-4 py-2.5 backdrop-blur-md rounded-lg transition-all duration-300 border text-center",
                    hoveredFramework === framework
                      ? "bg-black/70 border-gold/40 shadow-lg shadow-gold/10" 
                      : "bg-black/40 border-gold/10"
                  )}
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
      </div>
    </section>
  );
};

export default SkillsSection;
