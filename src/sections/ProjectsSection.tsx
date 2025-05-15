
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { projects, sectionMeta } from '../lib/section-data';
import { ArrowRight, Github } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import ScrollReveal from '../components/ScrollReveal';
import ProjectTimer from '../components/ProjectTimer';

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
              <motion.h3 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="text-2xl font-bold mb-4 text-gradient-purple"
              >
                Připravované Projekty
              </motion.h3>
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: "5rem" }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="h-1 bg-gradient-to-r from-purple/50 to-gold/50 mx-auto rounded-full"
              ></motion.div>
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
                  className="mb-8 last:mb-0"
                  whileHover={{ 
                    y: -5, 
                    transition: { duration: 0.2 } 
                  }}
                >
                  <div className="bg-card/70 backdrop-blur-sm rounded-xl border border-purple/20 p-8 hover:shadow-lg hover:shadow-purple/10 transition-all duration-300 group">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-2/3">
                        <h4 className="text-2xl font-bold mb-3 text-gradient-purple group-hover:text-gold transition-colors duration-300">{project.title}</h4>
                        <p className="text-foreground/70 mb-6 leading-relaxed">{project.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.tags.map((tag, idx) => (
                            <motion.span 
                              key={idx} 
                              className="px-3 py-1 bg-purple/10 backdrop-blur-sm text-xs font-medium text-foreground/80 rounded-full border border-purple/20"
                              whileHover={{ 
                                scale: 1.05, 
                                backgroundColor: "rgba(139, 92, 246, 0.2)" 
                              }}
                              transition={{ duration: 0.2 }}
                            >
                              {tag}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="md:w-1/3 flex flex-col justify-between">
                        <ProjectTimer launchDate={project.launchDate} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}
        
        <ScrollReveal className="text-center mt-16" animationStyle="fade" direction="up" distance={30}>
          <p className="text-foreground/70 mb-5">
            Chcete vidět více mé práce?
          </p>
          <motion.a 
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gold/20 border border-gold/20 text-white hover:bg-gold/30 transition-colors px-6 py-3 rounded-lg font-medium"
            whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(212, 175, 55, 0.3)" }}
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
