
import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../components/SectionTitle';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="section bg-secondary/30">
      <div className="container-custom">
        <SectionTitle 
          title="About Me" 
          subtitle="Learn more about my background and what drives me"
        />
        
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-4">My Journey</h3>
            <p className="mb-4">
              With over 6 years of experience in web development, I specialize in building performant, 
              accessible, and visually stunning web applications. My passion for clean code and 
              intuitive design drives me to create digital experiences that users love.
            </p>
            <p className="mb-4">
              I started my career as a UI designer before transitioning to frontend development, 
              which gives me a unique perspective on building products that look great and function 
              flawlessly. I believe in the power of design systems and component-driven development 
              to create consistent and maintainable applications.
            </p>
            <p>
              When I'm not coding, you'll find me exploring new technologies, contributing to open 
              source projects, or enjoying outdoor photography. I'm always looking for new challenges 
              and opportunities to grow as a developer.
            </p>
            
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <a 
                href="#contact"
                className="text-primary font-medium border-b-2 border-primary hover:border-transparent hover:bg-primary hover:text-white transition-all duration-300 pb-1 px-2"
              >
                Let's work together
              </a>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2 grid grid-cols-2 gap-4"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-card p-5 rounded-lg shadow-sm">
              <h4 className="font-bold text-3xl text-primary mb-2">6+</h4>
              <p className="text-sm text-foreground/70">Years of experience</p>
            </div>
            <div className="bg-card p-5 rounded-lg shadow-sm">
              <h4 className="font-bold text-3xl text-primary mb-2">50+</h4>
              <p className="text-sm text-foreground/70">Projects completed</p>
            </div>
            <div className="bg-card p-5 rounded-lg shadow-sm">
              <h4 className="font-bold text-3xl text-primary mb-2">30+</h4>
              <p className="text-sm text-foreground/70">Happy clients</p>
            </div>
            <div className="bg-card p-5 rounded-lg shadow-sm">
              <h4 className="font-bold text-3xl text-primary mb-2">12+</h4>
              <p className="text-sm text-foreground/70">Open source contributions</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
