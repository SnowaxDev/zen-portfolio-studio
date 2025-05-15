
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AspectRatio } from '../components/ui/aspect-ratio';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollReveal from '../components/ScrollReveal';
import { ExternalLink, Github, ArrowLeft, Clock, CheckCircle } from 'lucide-react';

// Import project data from our library
import { projects as allProjects } from '../lib/section-data';

// Page transition variants
const pageVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { 
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
      delayChildren: 0.3,
      staggerChildren: 0.3
    }
  },
  exit: { 
    opacity: 0,
    transition: { 
      duration: 0.6, 
      ease: [0.22, 1, 0.36, 1] 
    }
  }
};

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<any>(undefined);
  
  useEffect(() => {
    if (id) {
      const projectData = allProjects.find(p => p.id === id);
      setProject(projectData);
      
      // Update page title
      if (projectData) {
        document.title = `${projectData.title} | Jan Novák Portfolio`;
      } else {
        // Navigate to 404 if project not found
        navigate('/404');
      }
    }
    
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, [id, navigate]);
  
  if (!project) {
    return null; // Will redirect in useEffect
  }
  
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen overflow-x-hidden"
    >
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container-custom">
          <Link to="/#projects" className="inline-flex items-center text-gold hover:text-gold-light transition-all duration-300 mb-6 group">
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
            Zpět na Projekty
          </Link>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">{project.title}</h1>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag: string, index: number) => (
                    <Badge 
                      key={index} 
                      variant="secondary"
                      className="text-sm font-medium bg-secondary/70"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {/* Project Type Badge */}
              {project.type && (
                <div className="mb-4 md:mb-0">
                  <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold shadow-lg ${
                    project.type === 'client' ? 'bg-gold/90 text-primary-foreground' : 
                    project.type === 'redesign' ? 'bg-purple-dark/90 text-white' : 
                    'bg-secondary/90 text-foreground'
                  }`}>
                    {project.type === 'client' ? 'Klientský Projekt' : 
                     project.type === 'redesign' ? 'Redesign' : 
                     'Osobní Projekt'}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <ScrollReveal>
                <AspectRatio ratio={16/9} className="overflow-hidden rounded-xl mb-8 border border-gold/10">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover" 
                  />
                </AspectRatio>
              </ScrollReveal>
              
              <ScrollReveal delay={0.2}>
                <div className="prose prose-invert max-w-none">
                  <h2 className="text-2xl font-bold mb-4 text-gradient">Přehled</h2>
                  <p className="text-lg text-foreground/80 mb-6">
                    {project.longDescription || project.description}
                  </p>
                  
                  {project.type === 'redesign' && project.beforeImage && (
                    <div className="my-8">
                      <h3 className="text-xl font-bold mb-4 text-gradient">Před & Po</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-foreground/60 mb-2">Před</p>
                          <AspectRatio ratio={16/9} className="overflow-hidden rounded-lg border border-gold/10">
                            <img 
                              src={project.beforeImage} 
                              alt={`${project.title} před redesignem`} 
                              className="w-full h-full object-cover" 
                            />
                          </AspectRatio>
                        </div>
                        <div>
                          <p className="text-sm text-foreground/60 mb-2">Po</p>
                          <AspectRatio ratio={16/9} className="overflow-hidden rounded-lg border border-gold/10">
                            <img 
                              src={project.image} 
                              alt={`${project.title} po redesignu`} 
                              className="w-full h-full object-cover" 
                            />
                          </AspectRatio>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {project.technicalDetails && (
                    <div className="my-8">
                      <h3 className="text-xl font-bold mb-4 text-gold">Technické Detaily</h3>
                      <ul className="space-y-2">
                        {project.technicalDetails.map((detail: string, index: number) => (
                          <li key={index} className="flex items-start text-foreground/80">
                            <CheckCircle size={18} className="mr-2 flex-shrink-0 text-gold mt-1" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {project.challenges && project.solutions && (
                    <div className="my-8">
                      <h3 className="text-xl font-bold mb-4 text-gold">Výzvy & Řešení</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <Card className="bg-card/50 border-gold/10 hover:border-gold/20 transition-colors">
                          <CardContent className="pt-6">
                            <h4 className="text-lg font-semibold mb-3 text-gradient">Výzvy</h4>
                            <ul className="space-y-2">
                              {project.challenges.map((challenge: string, index: number) => (
                                <li key={index} className="flex items-start text-foreground/80">
                                  <div className="mr-2 flex-shrink-0 w-5 h-5 rounded-full bg-purple/20 flex items-center justify-center text-xs font-bold text-purple">
                                    {index + 1}
                                  </div>
                                  <span>{challenge}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                        <Card className="bg-card/50 border-gold/10 hover:border-gold/20 transition-colors">
                          <CardContent className="pt-6">
                            <h4 className="text-lg font-semibold mb-3 text-gradient">Řešení</h4>
                            <ul className="space-y-2">
                              {project.solutions.map((solution: string, index: number) => (
                                <li key={index} className="flex items-start text-foreground/80">
                                  <div className="mr-2 flex-shrink-0 w-5 h-5 rounded-full bg-gold/20 flex items-center justify-center text-xs font-bold text-gold">
                                    {index + 1}
                                  </div>
                                  <span>{solution}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            </div>
            
            <div>
              <ScrollReveal direction="left">
                <Card className="sticky top-24 bg-card/50 border-gold/10">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold mb-4 text-gradient">Detaily Projektu</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-foreground/60">Typ</p>
                        <p className="font-medium capitalize">
                          {project.type === 'client' ? 'Klientský Projekt' : 
                           project.type === 'redesign' ? 'Redesign' : 
                           'Osobní Projekt'}
                        </p>
                      </div>

                      {/* Project price */}
                      {project.price && (
                        <div>
                          <p className="text-sm text-foreground/60">Cena projektu</p>
                          <p className="font-bold text-gold text-xl">{project.price}</p>
                        </div>
                      )}
                      
                      {/* Launch date */}
                      {project.launchDate && !project.isUpcoming && (
                        <div>
                          <p className="text-sm text-foreground/60">Datum spuštění</p>
                          <div className="flex items-center">
                            <Clock size={16} className="mr-1 text-foreground/60" />
                            <p className="font-medium">{project.launchDate}</p>
                          </div>
                        </div>
                      )}

                      {/* Client notes */}
                      {project.clientNotes && (
                        <div>
                          <p className="text-sm text-foreground/60">Poznámky klienta</p>
                          <p className="text-sm text-foreground/80">{project.clientNotes}</p>
                        </div>
                      )}
                      
                      <div className="pt-4 flex flex-col space-y-3">
                        {project.link && (
                          <a 
                            href={project.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-full bg-gold text-primary-foreground px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center gap-2 hover:bg-gold-light transition-colors"
                          >
                            <span>Live Demo</span>
                            <ExternalLink size={16} />
                          </a>
                        )}
                        
                        {project.github && (
                          <a 
                            href={project.github} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-full bg-secondary/70 text-foreground px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center gap-2 hover:bg-secondary transition-colors"
                          >
                            <span>Zdrojový kód</span>
                            <Github size={16} />
                          </a>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </motion.div>
  );
};

export default ProjectDetails;
