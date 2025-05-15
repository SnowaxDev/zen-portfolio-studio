
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../ui/card';
import { ExternalLink, Github, Clock } from 'lucide-react';
import ScrollReveal from '../ScrollReveal';

interface ProjectSidebarProps {
  type?: string;
  price?: string;
  launchDate?: string;
  isUpcoming?: boolean;
  clientNotes?: string;
  link?: string | null;
  github?: string | null;
}

const ProjectSidebar: React.FC<ProjectSidebarProps> = ({
  type,
  price,
  launchDate,
  isUpcoming,
  clientNotes,
  link,
  github,
}) => {
  return (
    <ScrollReveal direction="left">
      <Card className="sticky top-24 bg-card/50 border-gold/10">
        <CardContent className="pt-6">
          <motion.h3 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl font-bold mb-4 text-gradient"
          >
            Detaily Projektu
          </motion.h3>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-foreground/60">Typ</p>
              <p className="font-medium capitalize">
                {type === 'client' ? 'Klientský Projekt' : 
                 type === 'redesign' ? 'Redesign' : 
                 'Osobní Projekt'}
              </p>
            </div>

            {/* Project price */}
            {price && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <p className="text-sm text-foreground/60">Cena projektu</p>
                <p className="font-bold text-gold text-xl">{price}</p>
              </motion.div>
            )}
            
            {/* Launch date */}
            {launchDate && !isUpcoming && (
              <div>
                <p className="text-sm text-foreground/60">Datum spuštění</p>
                <div className="flex items-center">
                  <Clock size={16} className="mr-1 text-foreground/60" />
                  <p className="font-medium">{launchDate}</p>
                </div>
              </div>
            )}

            {/* Client notes */}
            {clientNotes && (
              <div>
                <p className="text-sm text-foreground/60">Poznámky klienta</p>
                <p className="text-sm text-foreground/80">{clientNotes}</p>
              </div>
            )}
            
            <div className="pt-4 flex flex-col space-y-3">
              {link && (
                <motion.a 
                  href={link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-gold text-primary-foreground px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center gap-2 hover:bg-gold-light transition-colors"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span>Live Demo</span>
                  <ExternalLink size={16} />
                </motion.a>
              )}
              
              {github && (
                <motion.a 
                  href={github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-secondary/70 text-foreground px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center gap-2 hover:bg-secondary transition-colors"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span>Zdrojový kód</span>
                  <Github size={16} />
                </motion.a>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </ScrollReveal>
  );
};

export default ProjectSidebar;
