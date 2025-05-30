
import React from 'react';
import { motion } from 'framer-motion';
import { projects, sectionMeta, upcomingProjects } from '../lib/section-data';
import { ArrowRight, Github, Clock, Calendar, Sparkles } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import ScrollReveal from '../components/ScrollReveal';
import ProjectTimer from '../components/ProjectTimer';
import TextWithSparkles from '../components/TextWithSparkles';
import { Link } from 'react-router-dom';

const ProjectsSection: React.FC = () => {
  const { projects: projectsMeta } = sectionMeta;
  
  // Separate projects into current and upcoming
  const currentProjects = projects.filter(project => !project.isUpcoming);
  
  // Get only the first upcoming project
  const upcomingProject = upcomingProjects[0];

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
        
        {/* Upcoming Project Section - Redesigned with centered AI Assistant card */}
        {upcomingProject && (
          <div className="mt-24 relative">
            {/* Decorative background elements */}
            <motion.div 
              className="absolute -left-32 top-20 w-64 h-64 rounded-full bg-purple/5 blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.7, 0.5]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <motion.div 
              className="absolute -right-32 bottom-20 w-80 h-80 rounded-full bg-gold/5 blur-3xl"
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.4, 0.6, 0.4]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
            
            {/* Section header with sparkles */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16 relative"
            >
              <TextWithSparkles className="h-20">
                <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple via-purple-light to-gold-light">
                  Připravovaný Projekt
                </h3>
              </TextWithSparkles>
              
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: "8rem" }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="h-1 bg-gradient-to-r from-purple/50 to-gold/50 mx-auto rounded-full my-4"
              />
              
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-muted-foreground max-w-2xl mx-auto mb-8"
              >
                Projekt na kterém aktuálně pracuji a brzy bude dokončen
              </motion.p>
            </motion.div>
            
            {/* Single upcoming project with enhanced styling */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <motion.div 
                variants={itemVariants}
                className="relative"
                whileHover={{ y: -8 }}
              >
                <Link to={`/projects/${upcomingProject.id}`} className="block">
                  <motion.div 
                    className="relative bg-black/60 backdrop-blur-lg rounded-xl border border-purple/20 p-8 hover:shadow-xl hover:shadow-purple/10 transition-all duration-300 overflow-hidden"
                  >
                    {/* Background glow effect */}
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple/10 rounded-full blur-3xl group-hover:bg-purple/20 transition-colors duration-500" />
                    <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gold/10 rounded-full blur-3xl group-hover:bg-gold/20 transition-colors duration-500" />
                    
                    <div className="relative z-10">
                      {/* Label */}
                      <motion.div 
                        className="absolute -top-3 -right-3 bg-gradient-to-r from-purple to-purple-light px-3 py-1 rounded-full text-xs font-medium shadow-lg flex items-center gap-1.5"
                        animate={{
                          y: [0, -3, 0]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "mirror"
                        }}
                      >
                        <Clock size={12} />
                        Brzy
                      </motion.div>
                      
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-1/3">
                          <motion.div
                            className="rounded-lg overflow-hidden border border-purple/20"
                            whileHover={{ scale: 1.03 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <img 
                              src={upcomingProject.image} 
                              alt={upcomingProject.title} 
                              className="w-full h-48 object-cover"
                            />
                          </motion.div>
                        </div>
                        
                        <div className="md:w-2/3">
                          <motion.h4 
                            className="text-2xl font-bold mb-3 text-gradient-purple hover:text-gold transition-colors duration-300"
                            whileHover={{ x: 3 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            {upcomingProject.title}
                          </motion.h4>
                          
                          <p className="text-foreground/70 mb-6 leading-relaxed">{upcomingProject.description}</p>
                          
                          <div className="flex flex-wrap gap-2 mb-6">
                            {upcomingProject.tags.map((tag, idx) => (
                              <motion.span 
                                key={idx} 
                                className="px-3 py-1 bg-black/40 backdrop-blur-sm text-xs font-medium text-foreground/90 rounded-full border border-purple/20"
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
                      </div>
                      
                      <div className="mt-8">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar size={16} className="text-purple-light" />
                          <span className="text-sm text-foreground/70">Plánované dokončení:</span>
                        </div>
                        
                        <ProjectTimer launchDate={upcomingProject.launchDate} />
                      </div>
                    </div>
                    
                    {/* Shimmer overlay effect */}
                    <motion.div
                      className="absolute inset-0 w-full h-full pointer-events-none"
                      style={{
                        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)",
                        backgroundSize: "200% 100%",
                      }}
                      animate={{
                        backgroundPosition: ["200% 0", "-200% 0"]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
