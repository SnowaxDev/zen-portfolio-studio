
import React from 'react';
import ScrollReveal from '../ScrollReveal';
import { AspectRatio } from '../ui/aspect-ratio';
import { CheckCircle } from 'lucide-react';
import { BeforeAfterComparison } from '../ComparisonSlider';

interface ProjectOverviewProps {
  image: string;
  longDescription?: string;
  description: string;
  type?: 'client' | 'personal' | 'redesign';
  beforeImage?: string;
  technicalDetails?: string[];
}

const ProjectOverview: React.FC<ProjectOverviewProps> = ({
  image,
  longDescription,
  description,
  type,
  beforeImage,
  technicalDetails,
}) => {
  return (
    <div>
      <ScrollReveal>
        <AspectRatio ratio={16/9} className="overflow-hidden rounded-xl mb-8 border border-gold/10 shadow-xl shadow-black/20">
          <img 
            src={image} 
            alt="Project overview" 
            className="w-full h-full object-cover" 
          />
        </AspectRatio>
      </ScrollReveal>
      
      <ScrollReveal delay={0.2}>
        <div className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold mb-4 text-gradient">Přehled</h2>
          <p className="text-lg text-foreground/80 mb-6">
            {longDescription || description}
          </p>
          
          {type === 'redesign' && beforeImage && (
            <div className="my-8">
              <h3 className="text-xl font-bold mb-4 text-gradient">Před & Po</h3>
              <div className="h-80 w-full rounded-lg overflow-hidden border border-gold/10 shadow-lg">
                <BeforeAfterComparison 
                  beforeImage={beforeImage} 
                  afterImage={image} 
                />
              </div>
            </div>
          )}
          
          {technicalDetails && (
            <div className="my-8">
              <h3 className="text-xl font-bold mb-4 text-gold">Technické Detaily</h3>
              <ul className="space-y-2">
                {technicalDetails.map((detail: string, index: number) => (
                  <li key={index} className="flex items-start text-foreground/80">
                    <CheckCircle size={18} className="mr-2 flex-shrink-0 text-gold mt-1" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </ScrollReveal>
    </div>
  );
};

export default ProjectOverview;
