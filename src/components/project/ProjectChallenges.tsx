
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../ui/card';
import ScrollReveal from '../ScrollReveal';

interface ProjectChallengesProps {
  challenges?: string[];
  solutions?: string[];
}

const ProjectChallenges: React.FC<ProjectChallengesProps> = ({ challenges, solutions }) => {
  if (!challenges || !solutions) return null;
  
  return (
    <ScrollReveal>
      <div className="my-8">
        <h3 className="text-xl font-bold mb-4 text-gold">Výzvy & Řešení</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-card/50 border-gold/10 hover:border-gold/20 transition-colors h-full">
              <CardContent className="pt-6">
                <h4 className="text-lg font-semibold mb-3 text-gradient">Výzvy</h4>
                <ul className="space-y-2">
                  {challenges.map((challenge: string, index: number) => (
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
          </motion.div>
          <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-card/50 border-gold/10 hover:border-gold/20 transition-colors h-full">
              <CardContent className="pt-6">
                <h4 className="text-lg font-semibold mb-3 text-gradient">Řešení</h4>
                <ul className="space-y-2">
                  {solutions.map((solution: string, index: number) => (
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
          </motion.div>
        </div>
      </div>
    </ScrollReveal>
  );
};

export default ProjectChallenges;
