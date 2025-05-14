
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle';
import ProjectCard from '../components/ProjectCard';
import ProjectTimer from '../components/ProjectTimer';

// Enhanced project data with additional fields
const projects = [
  {
    id: 'ecommerce-dashboard',
    title: 'E-commerce Dashboard',
    description: 'Komplexní administrační rozhraní pro správu produktů, objednávek a zákazníků vytvořené s React a Tailwind CSS.',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&h=280&fit=crop&q=80',
    tags: ['React', 'TailwindCSS', 'Redux', 'Chart.js'],
    link: '#',
    github: '#',
    isUpcoming: false,
    launchDate: null,
    type: 'client'
  },
  {
    id: 'task-management',
    title: 'Aplikace pro Správu Úkolů',
    description: 'Produktivní aplikace pro organizaci úkolů s funkcí drag-and-drop a aktualizacemi v reálném čase.',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=500&h=280&fit=crop&q=80',
    tags: ['Next.js', 'TypeScript', 'Prisma', 'Framer Motion'],
    link: '#',
    github: '#',
    isUpcoming: false,
    launchDate: null,
    type: 'personal'
  },
  {
    id: 'fitness-tracker',
    title: 'Fitness Tracker',
    description: 'Mobilně responzivní aplikace pro sledování tréninků a výživy s vizualizací dat a sledováním pokroku.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&h=280&fit=crop&q=80',
    tags: ['React Native', 'Firebase', 'Expo', 'D3.js'],
    link: '#',
    github: '#',
    isUpcoming: false,
    launchDate: null,
    type: 'client'
  },
  {
    id: 'ai-assistant',
    title: 'AI Asistent Platforma',
    description: 'Připravovaná platforma AI asistenta, která pomáhá firmám automatizovat zákaznickou podporu pokročilým zpracováním přirozeného jazyka.',
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500&h=280&fit=crop&q=80',
    tags: ['React', 'Node.js', 'Machine Learning', 'WebSockets'],
    link: null,
    github: null,
    isUpcoming: true,
    launchDate: '2025-08-15',
    type: 'personal'
  },
];

const ProjectsSection: React.FC = () => {
  // Separate projects into current and upcoming
  const currentProjects = projects.filter(project => !project.isUpcoming);
  const upcomingProjects = projects.filter(project => project.isUpcoming);

  return (
    <section id="projects" className="section">
      <div className="container-custom">
        <SectionTitle 
          title="Moje Projekty" 
          subtitle="Podívejte se na některé mé nedávné práce"
        />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentProjects.map((project, index) => (
            <Link 
              to={`/projects/${project.id}`}
              key={index}
              className="block transition-transform hover:outline-none focus:outline-none"
            >
              <ProjectCard 
                title={project.title}
                description={project.description}
                image={project.image}
                tags={project.tags}
                link={project.link}
                github={project.github}
              />
            </Link>
          ))}
        </div>
        
        {upcomingProjects.length > 0 && (
          <div className="mt-16">
            <h3 className="text-2xl font-bold mb-6 text-gradient">Připravované Projekty</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {upcomingProjects.map((project, index) => (
                <div key={index} className="glassmorphism rounded-xl p-6 border border-primary/20">
                  <h4 className="text-xl font-bold mb-2">{project.title}</h4>
                  <p className="text-foreground/70 mb-4">{project.description}</p>
                  <ProjectTimer launchDate={project.launchDate} />
                </div>
              ))}
            </div>
          </div>
        )}
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-foreground/70 mb-4">
            Chcete vidět více mé práce?
          </p>
          <a 
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-secondary text-foreground hover:bg-secondary/80 transition-colors px-6 py-3 rounded-lg font-medium"
          >
            Navštivte Můj GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
