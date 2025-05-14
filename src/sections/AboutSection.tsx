
import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../components/SectionTitle';
import { FileCode2, Terminal, Laptop, CodeIcon, Server, Cpu } from 'lucide-react';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="section bg-secondary/30">
      <div className="container-custom">
        <SectionTitle 
          title="O Mně" 
          subtitle="Student s vášní pro webový vývoj a technologie"
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
              Jako student experimentující s webovým vývojem mám velký zájem o vytváření 
              moderních, přístupných a vizuálně atraktivních webových aplikací. Neustále se 
              vzdělávám a hledám nové příležitosti k rozšíření svých dovedností.
            </p>
            <p className="mb-4">
              Momentálně hledám zákazníky pro své první komerční projekty, kde mohu aplikovat 
              nabyté znalosti a dále růst jako vývojář. Mým cílem je poskytovat kvalitní 
              webové služby za dostupné ceny, zejména pro začínající podnikatele a malé firmy.
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
                  <span>Využívám moderní nástroje a technologie pro efektivní vývoj.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">»</span> 
                  <span>Neustále se učím novým technologiím, abych zůstal v popředí webového vývoje.</span>
                </li>
              </ul>
            </div>
            
            <div className="mt-6 mb-6 p-4 bg-card rounded-lg border border-border">
              <h4 className="text-xl font-semibold mb-3 flex items-center">
                <Server className="mr-2 text-primary" size={20} />
                Moje IT Koníčky
              </h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-primary mr-2">»</span> 
                  <span>Home labbing - experimenty s domácími servery a sítěmi</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">»</span> 
                  <span>Automatizace pomocí skriptů a self-hosted aplikací</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">»</span> 
                  <span>Linux systémy a open source software</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">»</span> 
                  <span>Arduino a IoT projekty pro chytrou domácnost</span>
                </li>
              </ul>
            </div>
            
            <p>
              Když nekóduji, najdete mě při experimentování s novým hardwarem, 
              konfigurací síťových služeb nebo při studiu odborné literatury. Vždy hledám 
              nové výzvy a příležitosti k osobnímu i profesnímu růstu.
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
              <div className="bg-card p-5 rounded-lg shadow-sm border border-border/40 hover:border-primary/30 transition-all duration-300">
                <h4 className="font-bold text-3xl text-primary mb-2">2+</h4>
                <p className="text-sm text-foreground/70">Roky zkušeností</p>
              </div>
              <div className="bg-card p-5 rounded-lg shadow-sm border border-border/40 hover:border-primary/30 transition-all duration-300">
                <h4 className="font-bold text-3xl text-primary mb-2">10+</h4>
                <p className="text-sm text-foreground/70">Dokončených projektů</p>
              </div>
              <div className="bg-card p-5 rounded-lg shadow-sm border border-border/40 hover:border-primary/30 transition-all duration-300">
                <h4 className="font-bold text-3xl text-primary mb-2">5+</h4>
                <p className="text-sm text-foreground/70">Spokojených klientů</p>
              </div>
              <div className="bg-card p-5 rounded-lg shadow-sm border border-border/40 hover:border-primary/30 transition-all duration-300">
                <h4 className="font-bold text-3xl text-primary mb-2">3+</h4>
                <p className="text-sm text-foreground/70">Open source příspěvků</p>
              </div>
            </div>
            
            <div className="bg-card p-6 rounded-lg border border-border shadow-md hover:shadow-lg transition-all duration-300">
              <h4 className="text-xl font-semibold mb-4 flex items-center">
                <Cpu className="text-primary mr-2" size={20} />
                Můj Vývojový Stack
              </h4>
              
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
                    Node.js, MongoDB
                  </p>
                </div>
                
                <div>
                  <div className="flex items-center mb-1">
                    <Laptop className="text-primary mr-2" size={16} />
                    <h5 className="font-medium">Nástroje</h5>
                  </div>
                  <p className="text-sm text-foreground/80 pl-6">
                    Git, Figma, Linux, Bash, VS Code
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
