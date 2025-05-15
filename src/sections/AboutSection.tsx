
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Server, Cpu, ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { statsData, techStackData, philosophyItems, hobbyItems, sectionMeta } from '../lib/section-data';

const AboutSection: React.FC = () => {
  const { about } = sectionMeta;
  const [isHobbyOpen, setIsHobbyOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section id="about" className="relative py-20 md:py-28 overflow-hidden bg-background">
      {/* Background elements */}
      <div className="absolute top-40 left-10 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-accent/5 blur-3xl" />
      
      <div className="container-custom relative z-10">
        {/* Section title */}
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold relative inline-block"
          >
            {about.title}
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent rounded-full" />
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-muted-foreground max-w-2xl mx-auto"
          >
            {about.subtitle}
          </motion.p>
        </div>
        
        <div className="flex flex-col-reverse lg:flex-row gap-12">
          {/* Right column with stats and tech stack */}
          <motion.div 
            className="lg:w-1/2 space-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {statsData.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-card/70 backdrop-blur-sm border border-white/5 rounded-xl p-6 flex flex-col justify-center shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300"
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <span className="text-3xl md:text-4xl font-bold text-gradient mb-1">{stat.title}</span>
                  <p className="text-sm text-foreground/70">{stat.subtitle}</p>
                </motion.div>
              ))}
            </div>
            
            {/* Tech stack */}
            <motion.div 
              variants={itemVariants}
              className="bg-card/70 backdrop-blur-sm border border-white/5 rounded-xl p-6 shadow-sm"
            >
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-lg bg-primary/10 mr-4">
                  <Cpu className="text-primary" size={24} />
                </div>
                <h4 className="text-xl font-semibold">{about.myStack.title}</h4>
              </div>
              
              <div className="space-y-6">
                {techStackData.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="group">
                      <div className="flex items-center mb-2">
                        <div className="p-2 rounded-md bg-primary/10 mr-3 group-hover:bg-primary/20 transition-colors duration-300">
                          <Icon className="text-primary" size={18} />
                        </div>
                        <h5 className="font-medium">{item.title}</h5>
                      </div>
                      <p className="text-sm text-foreground/80 pl-9 leading-relaxed">
                        {item.items}
                      </p>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
          
          {/* Left column with journey text and philosophy */}
          <motion.div 
            className="lg:w-1/2 space-y-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h3 
              variants={itemVariants}
              className="text-2xl font-bold mb-2 text-gradient"
            >
              {about.journey}
            </motion.h3>
            
            {about.journeyText.map((paragraph, index) => (
              <motion.p
                key={index}
                variants={itemVariants}
                className="text-lg text-foreground/90 leading-relaxed"
              >
                {paragraph}
              </motion.p>
            ))}
            
            {/* Philosophy */}
            <motion.div 
              variants={itemVariants}
              className="mt-6 p-5 bg-card/70 backdrop-blur-sm rounded-xl border border-primary/10 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-lg bg-primary/10 mr-4">
                  <Code2 className="text-primary" size={24} />
                </div>
                <h4 className="text-xl font-semibold">{about.codingPhilosophy.title}</h4>
              </div>
              
              <ul className="space-y-3">
                {philosophyItems.map((item, index) => (
                  <li 
                    key={index} 
                    className="flex items-start gap-3"
                  >
                    <span className="text-primary bg-primary/10 p-1 rounded-md flex items-center justify-center mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    <span className="text-foreground/90">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            {/* Tech Hobbies */}
            <motion.div variants={itemVariants}>
              <Collapsible 
                open={isHobbyOpen} 
                onOpenChange={setIsHobbyOpen}
                className="w-full mt-6"
              >
                <CollapsibleTrigger className="flex w-full items-center justify-between p-5 bg-card/70 backdrop-blur-sm rounded-xl border border-accent/10 hover:bg-card/90 transition-all duration-300">
                  <div className="flex items-center">
                    <div className="p-3 rounded-lg bg-accent/10 mr-4">
                      <Server className="text-accent" size={24} />
                    </div>
                    <h4 className="text-xl font-semibold">{about.techHobbies.title}</h4>
                  </div>
                  <ChevronDown 
                    size={20} 
                    className={`transform transition-transform duration-300 ${isHobbyOpen ? 'rotate-180' : ''}`}
                  />
                </CollapsibleTrigger>
                <CollapsibleContent className="overflow-hidden">
                  <div className="p-5 pt-3 bg-card/60 backdrop-blur-sm rounded-b-xl border-x border-b border-accent/10 shadow-sm">
                    <ul className="space-y-3">
                      {hobbyItems.map((item, index) => (
                        <li 
                          key={index} 
                          className="flex items-start gap-3"
                        >
                          <span className="text-accent mt-0.5">»</span>
                          <span className="text-foreground/90">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <a 
                href="#contact"
                className="inline-block mt-6 px-6 py-2.5 bg-gradient-to-r from-primary to-accent text-white rounded-lg shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:scale-105"
              >
                {about.contact?.ctaText || "Spolupracujme"}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
