
import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../components/SectionTitle';
import ProgressBar from '../components/ProgressBar';
import ScrollReveal from '../components/ScrollReveal';
import { frontendSkills, backendSkills, frameworks, sectionMeta } from '../lib/section-data';
import { Code2, Database, Layers } from 'lucide-react';

const SkillsSection: React.FC = () => {
  const { skills } = sectionMeta;
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="skills" className="section py-20 md:py-32 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container-custom max-w-6xl">
        <SectionTitle 
          title={skills.title} 
          subtitle={skills.subtitle}
        />
        
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
          <ScrollReveal width="100%" animationStyle="fade">
            <motion.div 
              className="p-6 rounded-xl bg-card/40 backdrop-blur-sm border border-white/5 shadow-lg"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="flex items-center mb-6">
                <div className="p-2.5 rounded-md bg-primary/10 mr-3">
                  <Code2 className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-bold">{skills.frontend.title}</h3>
              </div>
              
              <div className="space-y-5">
                {frontendSkills.map((skill, index) => (
                  <ProgressBar 
                    key={skill.skill} 
                    skill={skill.skill} 
                    percentage={skill.percentage} 
                    delay={index * 0.1}
                  />
                ))}
              </div>
            </motion.div>
          </ScrollReveal>
          
          <ScrollReveal width="100%" animationStyle="fade" delay={0.2}>
            <motion.div 
              className="p-6 rounded-xl bg-card/40 backdrop-blur-sm border border-white/5 shadow-lg"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="flex items-center mb-6">
                <div className="p-2.5 rounded-md bg-accent/10 mr-3">
                  <Database className="text-accent" size={24} />
                </div>
                <h3 className="text-xl font-bold">{skills.backend.title}</h3>
              </div>
              
              <div className="space-y-5">
                {backendSkills.map((skill, index) => (
                  <ProgressBar 
                    key={skill.skill} 
                    skill={skill.skill} 
                    percentage={skill.percentage}
                    delay={index * 0.1}
                  />
                ))}
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
        
        <motion.div 
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="text-center mb-8 flex flex-col items-center">
            <div className="bg-primary/20 p-3 rounded-full mb-4">
              <Layers className="text-primary" size={28} />
            </div>
            <h3 className="text-xl font-bold">{skills.tools.title}</h3>
          </div>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {frameworks.map((item, index) => (
              <motion.span
                key={item}
                className="px-4 py-2 bg-primary/10 hover:bg-primary/20 border border-primary/20 rounded-full transition-all duration-300"
                variants={itemVariants}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ scale: 1.05, backgroundColor: "rgba(var(--primary), 0.2)" }}
              >
                {item}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
