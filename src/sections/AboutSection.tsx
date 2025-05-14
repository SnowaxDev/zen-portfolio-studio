
import React from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';
import SectionTitle from '../components/SectionTitle';
import AnimatedText from '../components/AnimatedText';
import { FileCode2, Terminal, Laptop, CodeIcon, Server, Cpu, Check } from 'lucide-react';
import { cn } from '../lib/utils';

const AboutSection: React.FC = () => {
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
          title="O Mně" 
          subtitle="Student s vášní pro webový vývoj a technologie"
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
              <h3 className="text-2xl font-bold mb-2 text-gradient">Moje Cesta</h3>
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <p className="text-lg">
                Jako student experimentující s webovým vývojem mám velký zájem o vytváření 
                moderních, přístupných a vizuálně atraktivních webových
                aplikací. Neustále se vzdělávám a hledám nové příležitosti k rozšíření svých
                dovedností.
              </p>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <p className="text-lg">
                Momentálně hledám zákazníky pro své první komerční projekty, kde mohu
                aplikovat nabyté znalosti a dále růst jako vývojář. Mým cílem je poskytovat
                kvalitní webové služby za dostupné ceny, zejména pro začínající
                podnikatele a malé firmy.
              </p>
            </ScrollReveal>
            
            <ScrollReveal width="100%" delay={0.3}>
              <div className="mt-6 p-5 bg-card/80 backdrop-blur-sm rounded-lg border border-primary/10 shadow-lg hover:shadow-primary/5 transition-all duration-300">
                <div className="flex items-center mb-3">
                  <div className="p-2 rounded-md bg-primary/10 mr-3">
                    <CodeIcon className="text-primary" size={22} />
                  </div>
                  <h4 className="text-xl font-semibold">Moje Kódovací Filosofie</h4>
                </div>
                
                <ul className="space-y-3">
                  {[
                    'Píšu čistý, modulární kód, který je snadné udržovat a škálovat.',
                    'Upřednostňuji přístupnost a výkon ve všem, co vytvářím.',
                    'Využívám moderní nástroje a technologie pro efektivní vývoj.',
                    'Neustále se učím novým technologiím, abych zůstal v popředí webového vývoje.'
                  ].map((item, index) => (
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
              </div>
            </ScrollReveal>
            
            <ScrollReveal width="100%" delay={0.4}>
              <div className="mt-6 p-5 bg-card/80 backdrop-blur-sm rounded-lg border border-accent/10 shadow-lg hover:shadow-accent/5 transition-all duration-300">
                <div className="flex items-center mb-3">
                  <div className="p-2 rounded-md bg-accent/10 mr-3">
                    <Server className="text-accent" size={22} />
                  </div>
                  <h4 className="text-xl font-semibold">Moje IT Koníčky</h4>
                </div>
                
                <ul className="space-y-3">
                  {[
                    'Home labbing - experimenty s domácími servery a sítěmi',
                    'Automatizace pomocí skriptů a self-hosted aplikací',
                    'Linux systémy a open source software',
                    'Arduino a IoT projekty pro chytrou domácnost'
                  ].map((item, index) => (
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
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.5}>
              <p className="text-lg">
                Když nekóduji, najdete mě při experimentování s novým hardwarem, 
                konfigurací síťových služeb nebo při studiu odborné literatury. Vždy hledám 
                nové výzvy a příležitosti k osobnímu i profesnímu růstu.
              </p>
            </ScrollReveal>
            
            <ScrollReveal distance={30} delay={0.6}>
              <a 
                href="#contact"
                className="inline-block mt-4 px-6 py-2.5 bg-gradient-to-r from-primary to-accent text-white rounded-lg shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:scale-105"
              >
                Spolupracujme
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
              {[
                { title: '2+', subtitle: 'Roky zkušeností', delay: 0 },
                { title: '10+', subtitle: 'Dokončených projektů', delay: 0.1 },
                { title: '5+', subtitle: 'Spokojených klientů', delay: 0.2 },
                { title: '3+', subtitle: 'Open source příspěvků', delay: 0.3 },
              ].map((item, index) => (
                <ScrollReveal key={index} delay={item.delay} width="100%">
                  <motion.div 
                    className="bg-card/80 backdrop-blur-sm p-5 rounded-lg border border-border/40 shadow-md hover:border-primary/30 hover:shadow-primary/5 transition-all duration-300"
                    whileHover={{ 
                      scale: 1.03, 
                      transition: { duration: 0.2 } 
                    }}
                  >
                    <h4 className="font-bold text-3xl text-gradient mb-2">{item.title}</h4>
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
                  <h4 className="text-xl font-semibold">Můj Vývojový Stack</h4>
                </div>
                
                <div className="space-y-5">
                  <div>
                    <div className="flex items-center mb-2">
                      <div className="p-1.5 rounded-md bg-primary/10 mr-2">
                        <FileCode2 className="text-primary" size={16} />
                      </div>
                      <h5 className="font-medium">Frontend</h5>
                    </div>
                    <p className="text-sm text-foreground/80 pl-9 leading-relaxed">
                      React, TypeScript, Next.js, Tailwind CSS, Framer Motion
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-2">
                      <div className="p-1.5 rounded-md bg-accent/10 mr-2">
                        <Terminal className="text-accent" size={16} />
                      </div>
                      <h5 className="font-medium">Backend</h5>
                    </div>
                    <p className="text-sm text-foreground/80 pl-9 leading-relaxed">
                      Node.js, MongoDB
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-2">
                      <div className="p-1.5 rounded-md bg-primary/10 mr-2">
                        <Laptop className="text-primary" size={16} />
                      </div>
                      <h5 className="font-medium">Nástroje</h5>
                    </div>
                    <p className="text-sm text-foreground/80 pl-9 leading-relaxed">
                      Git, Figma, Linux, Bash, VS Code
                    </p>
                  </div>
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
