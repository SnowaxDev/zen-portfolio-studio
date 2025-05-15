
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { projects, sectionMeta } from '../lib/section-data';
import { ArrowRight, Github } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
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
    <section id="projects" className="py-24 bg-background">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Moje Projekty</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
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
              className="group"
            >
              <div className="bg-card/70 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 h-full">
                <div className="relative">
                  <AspectRatio ratio={16/9} className="bg-muted">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                    />
                  </AspectRatio>
                  <div className="absolute top-3 right-3">
                    <div className="bg-accent/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                      Portfolio
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, idx) => (
                      <span key={idx} className="tech-pill">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center mt-4">
                    <Link
                      to={`/projects/${project.id}`}
                      className="text-primary hover:text-primary/80 flex items-center gap-1 group-hover:gap-2 transition-all"
                    >
                      <span>View Details</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {upcomingProjects.length > 0 && (
          <div className="mt-24">
            <div className="text-center mb-10">
              <h3 className="text-2xl font-bold mb-4 text-gradient">Připravované Projekty</h3>
              <div className="w-20 h-1 bg-gradient-to-r from-primary/50 to-accent/50 mx-auto rounded-full"></div>
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
                  <div className="bg-card/70 backdrop-blur-sm rounded-xl border border-white/10 p-6 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
                    <h4 className="text-xl font-bold mb-2">{project.title}</h4>
                    <p className="text-muted-foreground mb-4">{project.description}</p>
                    
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">Launching in:</span>
                        <div className="flex gap-4 mt-2">
                          <div className="flex flex-col items-center">
                            <span className="text-xl font-bold">91</span>
                            <span className="text-xs text-muted-foreground">Days</span>
                          </div>
                          <div className="flex flex-col items-center">
                            <span className="text-xl font-bold">08</span>
                            <span className="text-xs text-muted-foreground">Hours</span>
                          </div>
                          <div className="flex flex-col items-center">
                            <span className="text-xl font-bold">07</span>
                            <span className="text-xs text-muted-foreground">Minutes</span>
                          </div>
                          <div className="flex flex-col items-center">
                            <span className="text-xl font-bold">26</span>
                            <span className="text-xs text-muted-foreground">Seconds</span>
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
          <p className="text-muted-foreground mb-4">
            Chcete vidět více mé práce?
          </p>
          <motion.a 
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-secondary text-foreground hover:bg-secondary/80 transition-colors px-6 py-3 rounded-lg font-medium"
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
