
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';
import { frontendSkills, backendSkills, frameworks, sectionMeta } from '../lib/section-data';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp, Code, Database, Layers } from 'lucide-react';

const SkillsSection: React.FC = () => {
  const [openSkills, setOpenSkills] = useState<string[]>(['frontend', 'backend']);
  
  const toggleSkill = (skill: string) => {
    setOpenSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill) 
        : [...prev, skill]
    );
  };
  
  const isOpen = (skill: string) => openSkills.includes(skill);

  return (
    <section id="skills" className="py-24 bg-background">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Moje dovednosti</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Technologie a nástroje, se kterými rád pracuji
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Frontend Skills */}
          <div className="relative">
            <motion.div 
              className="bg-card/70 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden"
              whileHover={{ y: -5, boxShadow: "0 15px 30px -10px rgba(0, 0, 0, 0.3)" }}
              transition={{ duration: 0.3 }}
            >
              <Collapsible open={isOpen('frontend')} onOpenChange={() => toggleSkill('frontend')} className="w-full">
                <CollapsibleTrigger className="w-full p-6 flex items-center justify-between text-left">
                  <div className="flex items-center">
                    <div className="bg-blue-500/20 p-3 rounded-xl mr-4">
                      <Code size={24} className="text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold">Frontend Vývoj</h3>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen('frontend') ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-muted-foreground"
                  >
                    {isOpen('frontend') ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </motion.div>
                </CollapsibleTrigger>
                
                <CollapsibleContent className="px-6 pb-6 space-y-4">
                  {frontendSkills.map((skill, index) => (
                    <div key={index} className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">
                          {skill.skill}
                        </span>
                        <span className="text-xs text-muted-foreground">{skill.percentage}%</span>
                      </div>
                      <div className="h-2 bg-blue-900/20 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-blue-500 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.percentage}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                        />
                      </div>
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            </motion.div>
          </div>
          
          {/* Backend Skills */}
          <div className="relative">
            <motion.div 
              className="bg-card/70 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden"
              whileHover={{ y: -5, boxShadow: "0 15px 30px -10px rgba(0, 0, 0, 0.3)" }}
              transition={{ duration: 0.3 }}
            >
              <Collapsible open={isOpen('backend')} onOpenChange={() => toggleSkill('backend')} className="w-full">
                <CollapsibleTrigger className="w-full p-6 flex items-center justify-between text-left">
                  <div className="flex items-center">
                    <div className="bg-purple-500/20 p-3 rounded-xl mr-4">
                      <Database size={24} className="text-purple-400" />
                    </div>
                    <h3 className="text-xl font-bold">Backend Vývoj</h3>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen('backend') ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-muted-foreground"
                  >
                    {isOpen('backend') ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </motion.div>
                </CollapsibleTrigger>
                
                <CollapsibleContent className="px-6 pb-6 space-y-4">
                  {backendSkills.map((skill, index) => (
                    <div key={index} className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">
                          {skill.skill}
                        </span>
                        <span className="text-xs text-muted-foreground">{skill.percentage}%</span>
                      </div>
                      <div className="h-2 bg-purple-900/20 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-purple-500 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.percentage}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                        />
                      </div>
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            </motion.div>
          </div>
        </div>
        
        {/* Frameworks and Tools */}
        <div className="mt-20">
          <div className="flex flex-col items-center justify-center mb-10">
            <div className="bg-gradient-to-br from-primary/20 to-accent/20 p-4 rounded-full mb-4">
              <Layers className="text-primary" size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-2">Frameworky a Nástroje</h3>
            <div className="w-20 h-1 bg-gradient-to-r from-primary/50 to-accent/50 mx-auto rounded-full"></div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            {frameworks.map((framework, index) => (
              <motion.div
                key={framework}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group"
              >
                <div className="px-4 py-2 bg-card/50 backdrop-blur-sm border border-white/5 rounded-lg transition-all duration-300 hover:border-primary/20 hover:bg-card/80">
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    {framework}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
