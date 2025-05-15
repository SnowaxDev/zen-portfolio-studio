
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { projects, sectionMeta } from '../lib/section-data';
import { ArrowRight, Github } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import ScrollReveal from '../components/ScrollReveal';

const ProjectsSection: React.FC = () => {
  const { projects: projectsMeta } = sectionMeta;
  
  // Separate projects into current and upcoming
  const currentProjects = projects.filter(project => !project.isUpcoming);
  const upcomingProjects = projects.filter(project => project.isUpcoming);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <section id="projects" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background opacity-90" />
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">Moje Projekty</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-gold to-purple mx-auto rounded-full mb-4"></div>
          <p className="mt-4 text-foreground/70 max-w-2xl mx-auto">
            Podívejte se na některé mé nedávné práce
          </p>
        </div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {currentProjects.map((project, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="h-full"
            >
              <ProjectCard
                id={project.id}
                title={project.title}
                description={project.description}
                image={project.image}
                tags={project.tags}
                link={project.link}
                github={project.github}
                type={project.type as "client" | "personal" | "redesign"}
                price={project.price}
              />
            </motion.div>
          ))}
        </motion.div>
        
        {upcomingProjects.length > 0 && (
          <div className="mt-24">
            <div className="text-center mb-10">
              <h3 className="text-2xl font-bold mb-4 text-gradient-purple">Připravované Projekty</h3>
              <div className="w-20 h-1 bg-gradient-to-r from-purple/50 to-gold/50 mx-auto rounded-full"></div>
            </div>
            
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              {upcomingProjects.map((project, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants} 
                  className="mb-6 last:mb-0"
                >
                  <div className="bg-card/70 backdrop-blur-sm rounded-xl border border-gold/10 p-6 hover:shadow-lg hover:shadow-purple/10 transition-all duration-300">
                    <h4 className="text-xl font-bold mb-2 text-gradient-purple">{project.title}</h4>
                    <p className="text-foreground/70 mb-4">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, idx) => (
                        <span key={idx} className="tech-pill">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 pt-4 border-t border-white/5">
                      <div className="flex flex-col">
                        <span className="text-xs text-foreground/50">Launching in:</span>
                        <div className="flex gap-4 mt-2">
                          <div className="flex flex-col items-center">
                            <span className="text-xl font-bold text-gold">91</span>
                            <span className="text-xs text-foreground/50">Days</span>
                          </div>
                          <div className="flex flex-col items-center">
                            <span className="text-xl font-bold text-gold">08</span>
                            <span className="text-xs text-foreground/50">Hours</span>
                          </div>
                          <div className="flex flex-col items-center">
                            <span className="text-xl font-bold text-gold">07</span>
                            <span className="text-xs text-foreground/50">Minutes</span>
                          </div>
                          <div className="flex flex-col items-center">
                            <span className="text-xl font-bold text-gold">26</span>
                            <span className="text-xs text-foreground/50">Seconds</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}
        
        <ScrollReveal className="text-center mt-12">
          <p className="text-foreground/70 mb-4">
            Chcete vidět více mé práce?
          </p>
          <motion.a 
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gold/20 border border-gold/20 text-white hover:bg-gold/30 transition-colors px-6 py-3 rounded-lg font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github size={18} />
            Navštivte Můj GitHub
          </motion.a>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ProjectsSection;
