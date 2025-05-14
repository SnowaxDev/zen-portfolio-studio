
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../components/SectionTitle';
import ProgressBar from '../components/ProgressBar';
import ScrollReveal from '../components/ScrollReveal';
import { frontendSkills, backendSkills, frameworks, sectionMeta } from '../lib/section-data';
import { Code2, Database, Layers } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const SkillsSection: React.FC = () => {
  const { skills } = sectionMeta;
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, type: "spring", stiffness: 100 }
    },
  };

  return (
    <section id="skills" className="relative py-24 md:py-32 bg-gradient-to-b from-secondary/20 via-background to-background">
      {/* Design elements */}
      <div className="absolute top-0 left-[10%] w-40 h-40 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-0 right-[15%] w-60 h-60 rounded-full bg-accent/5 blur-3xl" />
      
      <div className="container-custom max-w-6xl relative z-10">
        <SectionTitle 
          title={skills.title} 
          subtitle={skills.subtitle}
        />
        
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <ScrollReveal width="100%" animationStyle="fade">
            <motion.div 
              className="relative p-6 rounded-xl bg-card/40 backdrop-blur-sm border border-white/10 shadow-lg hover:shadow-primary/5 transition-all duration-500"
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              initial={{ boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" }}
              whileInView={{ boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
              viewport={{ once: true }}
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl -z-10" />
              <div className="flex items-center mb-8">
                <div className="p-3 rounded-xl bg-primary/10 mr-4 shadow-sm">
                  <Code2 className="text-primary" size={28} />
                </div>
                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                  {skills.frontend.title}
                </h3>
              </div>
              
              <div className="space-y-6">
                {frontendSkills.map((skill, index) => (
                  <motion.div 
                    key={skill.skill}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                    onMouseEnter={() => setHoveredSkill(skill.skill)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className={`font-medium transition-all duration-300 ${hoveredSkill === skill.skill ? 'text-primary' : ''}`}>
                        {skill.skill}
                      </span>
                      <span className="text-sm text-foreground/70">{skill.percentage}%</span>
                    </div>
                    <ProgressBar 
                      skill={skill.skill} 
                      percentage={skill.percentage} 
                      delay={index * 0.1}
                      isHovered={hoveredSkill === skill.skill}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </ScrollReveal>
          
          <ScrollReveal width="100%" animationStyle="fade" delay={0.2}>
            <motion.div 
              className="relative p-6 rounded-xl bg-card/40 backdrop-blur-sm border border-white/10 shadow-lg hover:shadow-accent/5 transition-all duration-500"
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              initial={{ boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" }}
              whileInView={{ boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
              viewport={{ once: true }}
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-accent/5 rounded-full blur-3xl -z-10" />
              <div className="flex items-center mb-8">
                <div className="p-3 rounded-xl bg-accent/10 mr-4 shadow-sm">
                  <Database className="text-accent" size={28} />
                </div>
                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent to-accent/70">
                  {skills.backend.title}
                </h3>
              </div>
              
              <div className="space-y-6">
                {backendSkills.map((skill, index) => (
                  <motion.div 
                    key={skill.skill}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                    onMouseEnter={() => setHoveredSkill(skill.skill)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className={`font-medium transition-all duration-300 ${hoveredSkill === skill.skill ? 'text-accent' : ''}`}>
                        {skill.skill}
                      </span>
                      <span className="text-sm text-foreground/70">{skill.percentage}%</span>
                    </div>
                    <ProgressBar 
                      skill={skill.skill} 
                      percentage={skill.percentage}
                      delay={index * 0.1}
                      isHovered={hoveredSkill === skill.skill}
                      className="bg-accent"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
        
        <motion.div 
          className="mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="text-center mb-10 flex flex-col items-center">
            <motion.div 
              className="bg-gradient-to-br from-primary/20 to-accent/20 p-4 rounded-full mb-5 shadow-lg"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Layers className="text-primary" size={32} />
            </motion.div>
            <h3 className="text-2xl font-bold text-gradient">{skills.tools.title}</h3>
          </div>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-3 md:gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {frameworks.map((item, index) => (
              <motion.div
                key={item}
                className="group"
                variants={itemVariants}
                transition={{ duration: 0.4, delay: index * 0.04 }}
              >
                <Card className="bg-card/50 backdrop-blur-sm border-primary/10 hover:bg-card/80 transition-all duration-300 group-hover:shadow-primary/10">
                  <CardContent className="px-4 py-2 flex items-center justify-center h-full">
                    <motion.span 
                      className="text-foreground/80 group-hover:text-primary transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                    >
                      {item}
                    </motion.span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
