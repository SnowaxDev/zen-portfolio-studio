
import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../components/SectionTitle';
import ProgressBar from '../components/ProgressBar';

const frontendSkills = [
  { skill: 'React / Next.js', percentage: 95 },
  { skill: 'TypeScript', percentage: 90 },
  { skill: 'Tailwind CSS', percentage: 95 },
  { skill: 'Framer Motion', percentage: 85 },
];

const backendSkills = [
  { skill: 'Node.js', percentage: 80 },
  { skill: 'Express', percentage: 85 },
  { skill: 'MongoDB', percentage: 75 },
  { skill: 'GraphQL', percentage: 70 },
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
          title="My Skills" 
          subtitle="Technologies and tools I love working with"
        />
        
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-bold mb-6">Frontend Development</h3>
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
            <h3 className="text-xl font-bold mb-6">Backend Development</h3>
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
          <h3 className="text-xl font-bold mb-6 text-center">Other Tools & Technologies</h3>
          
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
