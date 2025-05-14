
import React from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';
import SectionTitle from '../components/SectionTitle';
import AnimatedText from '../components/AnimatedText';
import { 
  Check,
  CodeIcon,
  Server,
  Cpu,
} from 'lucide-react';
import { 
  statsData, 
  techStackData, 
  philosophyItems,
  hobbyItems,
  sectionMeta
} from '../lib/section-data';

const AboutSection: React.FC = () => {
  const { about } = sectionMeta;
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    <section id="about" className="section py-24 md:py-32 overflow-hidden">
      <div className="container-custom">
        <SectionTitle 
          title={about.title} 
          subtitle={about.subtitle}
        />
        
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <motion.div 
            className="lg:w-1/2 space-y-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <ScrollReveal direction="right">
              <h3 className="text-2xl font-bold mb-2 text-gradient">{about.journey}</h3>
            </ScrollReveal>
            
            {about.journeyText.map((paragraph, index) => (
              <ScrollReveal key={index} delay={index * 0.1 + 0.1}>
                <p className="text-lg">
                  {paragraph}
                </p>
              </ScrollReveal>
            ))}
            
            <ScrollReveal width="100%" delay={0.3}>
              <motion.div 
                className="mt-6 p-5 bg-card/80 backdrop-blur-sm rounded-lg border border-primary/10 shadow-lg hover:shadow-primary/5 transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-3">
                  <div className="p-2 rounded-md bg-primary/10 mr-3">
                    <CodeIcon className="text-primary" size={22} />
                  </div>
                  <h4 className="text-xl font-semibold">{about.codingPhilosophy.title}</h4>
                </div>
                
                <ul className="space-y-3">
                  {philosophyItems.map((item, index) => (
                    <motion.li 
                      key={index} 
                      className="flex items-start"
                      variants={itemVariants}
                    >
                      <Check className="text-primary shrink-0 mt-1 mr-2" size={18} />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </ScrollReveal>
            
            <ScrollReveal width="100%" delay={0.4}>
              <motion.div 
                className="mt-6 p-5 bg-card/80 backdrop-blur-sm rounded-lg border border-accent/10 shadow-lg hover:shadow-accent/5 transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-3">
                  <div className="p-2 rounded-md bg-accent/10 mr-3">
                    <Server className="text-accent" size={22} />
                  </div>
                  <h4 className="text-xl font-semibold">{about.techHobbies.title}</h4>
                </div>
                
                <ul className="space-y-3">
                  {hobbyItems.map((item, index) => (
                    <motion.li 
                      key={index} 
                      className="flex items-start"
                      variants={itemVariants}
                    >
                      <span className="text-accent mr-2">»</span> 
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </ScrollReveal>
            
            <ScrollReveal distance={30} delay={0.6}>
              <a 
                href="#contact"
                className="inline-block mt-4 px-6 py-2.5 bg-gradient-to-r from-primary to-accent text-white rounded-lg shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:scale-105"
              >
                {about.contact?.ctaText || "Spolupracujme"}
              </a>
            </ScrollReveal>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2 space-y-8"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="grid grid-cols-2 gap-4">
              {statsData.map((item, index) => (
                <ScrollReveal key={index} delay={item.delay} width="100%">
                  <motion.div 
                    className="bg-card/80 backdrop-blur-sm p-5 rounded-lg border border-border/40 shadow-md hover:border-primary/30 hover:shadow-primary/5 transition-all duration-300"
                    whileHover={{ 
                      scale: 1.03, 
                      transition: { duration: 0.2 } 
                    }}
                  >
                    <AnimatedText 
                      text={item.title}
                      className="font-bold text-3xl text-gradient mb-2"
                      animation="scale"
                      once={false}
                      threshold={0.5}
                    />
                    <p className="text-sm text-foreground/70">{item.subtitle}</p>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
            
            <ScrollReveal width="100%" delay={0.4}>
              <motion.div 
                className="bg-card/80 backdrop-blur-sm p-6 rounded-lg border border-border shadow-md hover:shadow-lg transition-all duration-300"
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  transition: { duration: 0.2 }
                }}
              >
                <div className="flex items-center mb-5">
                  <div className="p-2.5 rounded-md bg-gradient-to-br from-primary/20 to-accent/20 mr-3">
                    <Cpu className="text-primary" size={24} />
                  </div>
                  <h4 className="text-xl font-semibold">{about.myStack.title}</h4>
                </div>
                
                <div className="space-y-5">
                  {techStackData.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                      >
                        <div className="flex items-center mb-2">
                          <div className={`p-1.5 rounded-md bg-${item.color}/10 mr-2`}>
                            <Icon className={`text-${item.color}`} size={16} />
                          </div>
                          <h5 className="font-medium">{item.title}</h5>
                        </div>
                        <p className="text-sm text-foreground/80 pl-9 leading-relaxed">
                          {item.items}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </ScrollReveal>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
