
import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../components/SectionTitle';
import { FileCode2, Terminal, Laptop, CodeIcon } from 'lucide-react';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="section bg-secondary/30">
      <div className="container-custom">
        <SectionTitle 
          title="O Mně" 
          subtitle="Dozvězte se více o mém zázemí a co mě motivuje"
        />
        
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-4">Moje Cesta</h3>
            <p className="mb-4">
              S více než 2 lety zkušeností ve webovém vývoji se specializuji na vytváření výkonných, 
              přístupných a vizuálně úchvatných webových aplikací. Moje vášeň pro čistý kód a 
              intuitivní design mě vede k vytváření digitálních zážitků, které uživatelé milují.
            </p>
            <p className="mb-4">
              Svou kariéru jsem začal jako UI designer, než jsem přešel na frontend development, 
              což mi dává jedinečnou perspektivu při vytváření produktů, které skvěle vypadají a 
              zároveň bezchybně fungují. Věřím v sílu designových systémů a komponentového vývoje 
              pro vytváření konzistentních a udržitelných aplikací.
            </p>
            
            <div className="mt-6 mb-6 p-4 bg-card rounded-lg border border-border">
              <h4 className="text-xl font-semibold mb-3 flex items-center">
                <CodeIcon className="mr-2 text-primary" size={20} />
                Moje Kódovací Filosofie
              </h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-primary mr-2">»</span> 
                  <span>Píšu čistý, modulární kód, který je snadné udržovat a škálovat.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">»</span> 
                  <span>Upřednostňuji přístupnost a výkon ve všem, co vytvářím.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">»</span> 
                  <span>Využívám test-driven development pro zajištění robustních aplikací.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">»</span> 
                  <span>Neustále se učím novým technologiím, abych zůstal v popředí webového vývoje.</span>
                </li>
              </ul>
            </div>
            
            <p>
              Když nekóduji, najdete mě při zkoumání nových technologií, přispívání do open 
              source projektů nebo při focení v přírodě. Vždy hledám nové výzvy a 
              příležitosti k růstu jako vývojář.
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
                Spolupracujme
              </a>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-card p-5 rounded-lg shadow-sm">
                <h4 className="font-bold text-3xl text-primary mb-2">2+</h4>
                <p className="text-sm text-foreground/70">Roky zkušeností</p>
              </div>
              <div className="bg-card p-5 rounded-lg shadow-sm">
                <h4 className="font-bold text-3xl text-primary mb-2">20+</h4>
                <p className="text-sm text-foreground/70">Dokončených projektů</p>
              </div>
              <div className="bg-card p-5 rounded-lg shadow-sm">
                <h4 className="font-bold text-3xl text-primary mb-2">15+</h4>
                <p className="text-sm text-foreground/70">Spokojených klientů</p>
              </div>
              <div className="bg-card p-5 rounded-lg shadow-sm">
                <h4 className="font-bold text-3xl text-primary mb-2">6+</h4>
                <p className="text-sm text-foreground/70">Open source příspěvků</p>
              </div>
            </div>
            
            <div className="bg-card p-6 rounded-lg border border-border">
              <h4 className="text-xl font-semibold mb-4">Můj Vývojový Stack</h4>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center mb-1">
                    <FileCode2 className="text-primary mr-2" size={16} />
                    <h5 className="font-medium">Frontend</h5>
                  </div>
                  <p className="text-sm text-foreground/80 pl-6">
                    React, TypeScript, Next.js, Tailwind CSS, Framer Motion
                  </p>
                </div>
                
                <div>
                  <div className="flex items-center mb-1">
                    <Terminal className="text-primary mr-2" size={16} />
                    <h5 className="font-medium">Backend</h5>
                  </div>
                  <p className="text-sm text-foreground/80 pl-6">
                    Node.js, Express, GraphQL, PostgreSQL, MongoDB
                  </p>
                </div>
                
                <div>
                  <div className="flex items-center mb-1">
                    <Laptop className="text-primary mr-2" size={16} />
                    <h5 className="font-medium">Nástroje</h5>
                  </div>
                  <p className="text-sm text-foreground/80 pl-6">
                    Git, Docker, CI/CD, AWS, Figma, Jest, Cypress
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
