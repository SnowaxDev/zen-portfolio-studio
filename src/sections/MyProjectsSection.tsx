
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '@/components/SectionTitle';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import ProjectCard from '@/components/ProjectCard';
import ScrollReveal from '@/components/ScrollReveal';
import TextWithGlow from '@/components/TextWithGlow';
import { Layout, Database, Paintbrush, Code, Filter } from 'lucide-react';

// Project category types
type ProjectCategory = 'all' | 'websites' | 'design' | 'development';

// Project data interface
interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: ProjectCategory | ProjectCategory[];
  tags: string[]; // Changed from technologies to tags to match ProjectCard
  client?: string;
  link?: string;
  featured?: boolean;
}

// Sample project data
const projects: Project[] = [
  {
    id: 1,
    title: "E-commerce web pro Boutique Style",
    description: "Moderní e-shop s produktovým katalogem, nákupním košíkem a online platbou.",
    image: "/placeholder.svg",
    category: ['websites', 'development'],
    tags: ['React', 'Next.js', 'Stripe'], // Changed from technologies to tags
    client: "Boutique Style s.r.o.",
    link: "#",
    featured: true
  },
  {
    id: 2,
    title: "Portfolio web pro fotografa",
    description: "Elegantní portfolio web s galerií fotografií a rezervačním systémem.",
    image: "/placeholder.svg",
    category: ['websites', 'design'],
    tags: ['React', 'Framer Motion', 'Tailwind CSS'], // Changed from technologies to tags
    client: "Jan Novák - Fotograf",
    link: "#"
  },
  {
    id: 3,
    title: "Rezervační systém pro restauraci",
    description: "Webová aplikace pro rezervaci stolů s administračním rozhraním.",
    image: "/placeholder.svg",
    category: 'development',
    tags: ['React', 'Node.js', 'MongoDB'], // Changed from technologies to tags
    client: "Restaurace U Zlatého lva",
    link: "#"
  },
  {
    id: 4,
    title: "Corporate identity pro IT firmu",
    description: "Kompletní redesign značky včetně loga, vizuálního stylu a webových stránek.",
    image: "/placeholder.svg",
    category: 'design',
    tags: ['Figma', 'Adobe Illustrator', 'Adobe Photoshop'], // Changed from technologies to tags
    client: "IT Solutions s.r.o.",
    link: "#",
    featured: true
  },
  {
    id: 5,
    title: "Mobilní aplikace pro fitness",
    description: "Aplikace pro sledování pokroku, vytváření tréninkových plánů a sdílení s komunitou.",
    image: "/placeholder.svg",
    category: 'development',
    tags: ['React Native', 'Firebase', 'Redux'], // Changed from technologies to tags
    client: "FitLife App",
    link: "#"
  },
  {
    id: 6,
    title: "Landing page pro startup",
    description: "Konverzní landing page s animacemi a formulářem pro sběr leadů.",
    image: "/placeholder.svg",
    category: ['websites', 'design'],
    tags: ['HTML', 'CSS', 'JavaScript', 'GSAP'], // Changed from technologies to tags
    client: "InnoTech Startup",
    link: "#"
  }
];

const MyProjectsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  
  // Filter projects based on active category
  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => 
        Array.isArray(project.category) 
          ? project.category.includes(activeCategory) 
          : project.category === activeCategory
      );
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-40 -left-32 w-64 h-64 rounded-full bg-purple/5 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute bottom-40 -right-32 w-80 h-80 rounded-full bg-gold/5 blur-3xl"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>
      
      <div className="container-custom relative z-10">
        <SectionTitle 
          title="Moje projekty" 
          subtitle="Výběr z mých nejnovějších projektů a klientských zakázek"
          className="mb-16"
          size="large"
        />
        
        {/* Project filter tabs */}
        <ScrollReveal
          className="flex justify-center mb-12 w-full"
          direction="up"
          distance={20}
          delay={0.3}
        >
          <Tabs 
            defaultValue="all" 
            value={activeCategory}
            onValueChange={(value) => setActiveCategory(value as ProjectCategory)}
            className="w-full max-w-2xl"
          >
            <div className="relative mb-8">
              <motion.div 
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple/20 via-gold/40 to-purple/20 rounded-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              />
              
              <TabsList className="grid grid-cols-4 w-full bg-card/80 backdrop-blur-sm p-1 rounded-xl border border-white/10 shadow-lg">
                <TabsTrigger 
                  value="all" 
                  className="flex items-center justify-center gap-2 relative"
                >
                  {activeCategory === 'all' && (
                    <motion.div
                      className="absolute inset-0 bg-gold/10 rounded-lg"
                      layoutId="activeProjectTab"
                      transition={{ type: "spring", duration: 0.6 }}
                    />
                  )}
                  <Filter className="w-4 h-4" />
                  <span>Vše</span>
                </TabsTrigger>
                
                <TabsTrigger 
                  value="websites" 
                  className="flex items-center justify-center gap-2 relative"
                >
                  {activeCategory === 'websites' && (
                    <motion.div
                      className="absolute inset-0 bg-gold/10 rounded-lg"
                      layoutId="activeProjectTab"
                      transition={{ type: "spring", duration: 0.6 }}
                    />
                  )}
                  <Layout className="w-4 h-4" />
                  <span>Weby</span>
                </TabsTrigger>
                
                <TabsTrigger 
                  value="design" 
                  className="flex items-center justify-center gap-2 relative"
                >
                  {activeCategory === 'design' && (
                    <motion.div
                      className="absolute inset-0 bg-gold/10 rounded-lg"
                      layoutId="activeProjectTab"
                      transition={{ type: "spring", duration: 0.6 }}
                    />
                  )}
                  <Paintbrush className="w-4 h-4" />
                  <span>Design</span>
                </TabsTrigger>
                
                <TabsTrigger 
                  value="development" 
                  className="flex items-center justify-center gap-2 relative"
                >
                  {activeCategory === 'development' && (
                    <motion.div
                      className="absolute inset-0 bg-gold/10 rounded-lg"
                      layoutId="activeProjectTab"
                      transition={{ type: "spring", duration: 0.6 }}
                    />
                  )}
                  <Code className="w-4 h-4" />
                  <span>Vývoj</span>
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all" className="mt-0">
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
              >
                {filteredProjects.map((project) => (
                  <ProjectCard 
                    key={project.id}
                    id={project.id.toString()}
                    title={project.title}
                    description={project.description}
                    image={project.image}
                    tags={project.tags}
                    link={project.link || null}
                    github={null}
                    type={project.client ? 'client' : 'personal'}
                  />
                ))}
              </motion.div>
            </TabsContent>
            
            <TabsContent value="websites" className="mt-0">
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
              >
                {filteredProjects.map((project) => (
                  <ProjectCard 
                    key={project.id}
                    id={project.id.toString()}
                    title={project.title}
                    description={project.description}
                    image={project.image}
                    tags={project.tags}
                    link={project.link || null}
                    github={null}
                    type={project.client ? 'client' : 'personal'}
                  />
                ))}
              </motion.div>
            </TabsContent>
            
            <TabsContent value="design" className="mt-0">
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
              >
                {filteredProjects.map((project) => (
                  <ProjectCard 
                    key={project.id}
                    id={project.id.toString()}
                    title={project.title}
                    description={project.description}
                    image={project.image}
                    tags={project.tags}
                    link={project.link || null}
                    github={null}
                    type={project.client ? 'client' : 'personal'}
                  />
                ))}
              </motion.div>
            </TabsContent>
            
            <TabsContent value="development" className="mt-0">
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
              >
                {filteredProjects.map((project) => (
                  <ProjectCard 
                    key={project.id}
                    id={project.id.toString()}
                    title={project.title}
                    description={project.description}
                    image={project.image}
                    tags={project.tags}
                    link={project.link || null}
                    github={null}
                    type={project.client ? 'client' : 'personal'}
                  />
                ))}
              </motion.div>
            </TabsContent>
          </Tabs>
        </ScrollReveal>
        
        {/* Call to Action */}
        <ScrollReveal 
          className="text-center mt-16"
          direction="up"
          delay={0.5}
        >
          <TextWithGlow
            className="inline-block text-lg font-medium mb-4 border-b-2 border-gold/50 pb-1"
            intensity="medium"
          >
            Máte zájem o spolupráci?
          </TextWithGlow>
          
          <div className="mt-2">
            <motion.a 
              href="#contact" 
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-gold to-gold-light text-primary-foreground font-medium rounded-md shadow-lg shadow-gold/20 hover:shadow-xl hover:shadow-gold/30 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Kontaktujte mě
            </motion.a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default MyProjectsSection;
