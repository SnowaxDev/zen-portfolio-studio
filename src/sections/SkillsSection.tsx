
import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../components/SectionTitle';
import ProgressBar from '../components/ProgressBar';

const frontendSkills = [
  { skill: 'React / Next.js', percentage: 85 },
  { skill: 'TypeScript', percentage: 80 },
  { skill: 'Tailwind CSS', percentage: 90 },
  { skill: 'Framer Motion', percentage: 75 },
];

const backendSkills = [
  { skill: 'Node.js', percentage: 70 },
  { skill: 'Express', percentage: 75 },
  { skill: 'MongoDB', percentage: 65 },
  { skill: 'GraphQL', percentage: 60 },
];

const otherSkills = ['Git', 'Figma', 'Jest', 'CI/CD', 'Docker', 'AWS', 'Firebase', 'Vercel'];

const SkillsSection: React.FC = () => {
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
    <section id="skills" className="section bg-secondary/30">
      <div className="container-custom">
        <SectionTitle 
          title="Moje Dovednosti" 
          subtitle="Technologie a nástroje, se kterými rád pracuji"
        />
        
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-bold mb-6">Frontend Vývoj</h3>
            {frontendSkills.map((skill) => (
              <ProgressBar 
                key={skill.skill} 
                skill={skill.skill} 
                percentage={skill.percentage} 
              />
            ))}
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-6">Backend Vývoj</h3>
            {backendSkills.map((skill) => (
              <ProgressBar 
                key={skill.skill} 
                skill={skill.skill} 
                percentage={skill.percentage} 
              />
            ))}
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-xl font-bold mb-6 text-center">Další Nástroje a Technologie</h3>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {otherSkills.map((skill) => (
              <motion.span
                key={skill}
                className="px-4 py-2 bg-card rounded-full"
                variants={itemVariants}
                transition={{ duration: 0.5 }}
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
