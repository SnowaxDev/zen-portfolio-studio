
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Import components
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProjectHeader from '../components/project/ProjectHeader';
import ProjectOverview from '../components/project/ProjectOverview';
import ProjectChallenges from '../components/project/ProjectChallenges';
import ProjectSidebar from '../components/project/ProjectSidebar';
import ProjectGallery from '../components/project/ProjectGallery';
import ProjectReviews from '../components/project/ProjectReviews';
import RelatedProjects from '../components/project/RelatedProjects';

// Import project data
import { projects as allProjects } from '../lib/section-data';

// Define Project interface to match what's in section-data.ts
interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  type?: 'client' | 'personal' | 'redesign';
  link?: string | null;
  github?: string | null;
  price?: string | null;
  longDescription?: string;
  isUpcoming?: boolean;
  launchDate?: string;
  clientNotes?: string;
  technicalDetails?: string[];
  challenges?: string[];
  solutions?: string[];
  beforeImage?: string;
  gallery?: string[];
  reviews?: any[];
}

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
  const [project, setProject] = useState<Project | undefined>(undefined);
  
  useEffect(() => {
    if (id) {
      // Ensure the type-casting here
      const projectData = allProjects.find(p => p.id === id) as Project | undefined;
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
      className="min-h-screen overflow-x-hidden flex flex-col"
    >
      <Header />
      
      <main className="pt-24 pb-16 flex-grow">
        <div className="container-custom">
          {/* Project Header */}
          <ProjectHeader 
            title={project.title} 
            tags={project.tags} 
            type={project.type}
          />
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              {/* Project Overview Section */}
              <ProjectOverview 
                image={project.image}
                longDescription={project.longDescription}
                description={project.description}
                type={project.type}
                beforeImage={project.beforeImage}
                technicalDetails={project.technicalDetails}
              />
              
              {/* Challenges & Solutions Section */}
              <ProjectChallenges 
                challenges={project.challenges}
                solutions={project.solutions}
              />
              
              {/* Project Gallery Section */}
              <ProjectGallery 
                gallery={project.gallery}
                title={project.title}
              />
              
              {/* Client Reviews Section */}
              <ProjectReviews 
                reviews={project.reviews}
              />
              
              {/* Related Projects Section */}
              <RelatedProjects 
                projects={allProjects as Project[]}
                currentProjectId={project.id}
              />
            </div>
            
            <div>
              {/* Project Sidebar */}
              <ProjectSidebar 
                type={project.type}
                price={project.price}
                launchDate={project.launchDate}
                isUpcoming={project.isUpcoming}
                clientNotes={project.clientNotes}
                link={project.link}
                github={project.github}
              />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </motion.div>
  );
};

export default ProjectDetails;
