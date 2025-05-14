
import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../components/SectionTitle';
import ProgressBar from '../components/ProgressBar';
import { Code2, Database, Layers } from 'lucide-react';

const frontendSkills = [
  { skill: 'React / Next.js', percentage: 85 },
  { skill: 'TypeScript', percentage: 80 },
  { skill: 'Tailwind CSS', percentage: 90 },
  { skill: 'Framer Motion', percentage: 75 },
];

const backendSkills = [
  { skill: 'Node.js', percentage: 70 },
  { skill: 'MongoDB', percentage: 65 },
];

const frameworks = [
  'Vue.js',
  'Svelte',
  'Astro',
  'Remix',
  'Gatsby',
  'Nuxt.js',
  'SvelteKit',
  'Vite',
  'Webpack',
  'Babel',
  'ESLint',
  'Prettier',
  'Git'
];

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
    <section id="skills" className="section py-20 md:py-32 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container-custom max-w-6xl">
        <SectionTitle 
          title="Moje Dovednosti" 
          subtitle="Technologie a nástroje, se kterými rád pracuji"
        />
        
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
          <motion.div 
            className="p-6 rounded-xl bg-card/40 backdrop-blur-sm border border-white/5 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center mb-6">
              <Code2 className="mr-3 text-primary" size={24} />
              <h3 className="text-xl font-bold">Frontend Vývoj</h3>
            </div>
            
            <div className="space-y-5">
              {frontendSkills.map((skill) => (
                <ProgressBar 
                  key={skill.skill} 
                  skill={skill.skill} 
                  percentage={skill.percentage} 
                />
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            className="p-6 rounded-xl bg-card/40 backdrop-blur-sm border border-white/5 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center mb-6">
              <Database className="mr-3 text-primary" size={24} />
              <h3 className="text-xl font-bold">Backend Vývoj</h3>
            </div>
            
            <div className="space-y-5">
              {backendSkills.map((skill) => (
                <ProgressBar 
                  key={skill.skill} 
                  skill={skill.skill} 
                  percentage={skill.percentage} 
                />
              ))}
            </div>
          </motion.div>
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
            <h3 className="text-xl font-bold">Frameworky a Nástroje</h3>
          </div>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {frameworks.map((item) => (
              <motion.span
                key={item}
                className="px-4 py-2 bg-primary/10 hover:bg-primary/20 border border-primary/20 rounded-full transition-all duration-300"
                variants={itemVariants}
                transition={{ duration: 0.5 }}
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
