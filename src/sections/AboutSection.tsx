
import React from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckSquare, Users, Github } from 'lucide-react';
import StatBox from '../components/about/StatBox';
import SectionWrapper from '../components/SectionWrapper';
import AnimatedSection from '../components/AnimatedSection';
import { useMobileUtils } from '../hooks/use-mobile-utils';

const AboutSection: React.FC = () => {
  const { isMobile, getMobileSpacing } = useMobileUtils();

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <SectionWrapper id="about" className="pt-24 pb-16 overflow-hidden">
      <div className={getMobileSpacing("px-4 md:px-8")}>
        {/* Section header */}
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            O mně
          </h2>
          <p className="text-muted-foreground text-sm md:text-base mx-auto max-w-2xl">
            Stručné shrnutí mé profesní cesty a dovedností.
          </p>
          
          {/* Decorative underline */}
          <motion.div 
            className="h-1 w-20 bg-gold/60 mx-auto mt-4 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: "5rem" }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
          />
        </AnimatedSection>

        {/* Stats grid with animations */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={itemVariants}>
            <StatBox 
              label="Roky zkušeností" 
              value={6} 
              icon={<Clock className="h-6 w-6" />} 
            />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <StatBox 
              label="Dokončených projektů" 
              value={48} 
              icon={<CheckSquare className="h-6 w-6" />} 
            />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <StatBox 
              label="Spokojených klientů" 
              value={32} 
              icon={<Users className="h-6 w-6" />} 
            />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <StatBox 
              label="Open source příspěvků" 
              value={93} 
              icon={<Github className="h-6 w-6" />} 
            />
          </motion.div>
        </motion.div>

        {/* About text content with staggered reveal */}
        <AnimatedSection 
          className="space-y-6 max-w-3xl mx-auto" 
          staggerChildren={true} 
          staggerDelay={0.15}
        >
          <p className="text-foreground/80 text-sm md:text-base">
            Jsem Jan Novák, frontend vývojář a UI/UX designér s {6}+ lety zkušeností v tvorbě moderních webových aplikací. 
            Specializuji se na React a Next.js, a mou vášní je vytvářet intuitivní a vizuálně přitažlivé uživatelské rozhraní.
          </p>
          
          <p className="text-foreground/80 text-sm md:text-base">
            Během své kariéry jsem úspěšně dokončil více než {48} projektů pro klienty z různých odvětví. 
            Mám hluboké znalosti v oblasti responzivního designu, optimalizace výkonu a přístupnosti webu.
          </p>
          
          <p className="text-foreground/80 text-sm md:text-base">
            Neustále se vzdělávám a sleduji nejnovější trendy v oblasti webového vývoje. 
            Mám zkušenosti s agilními metodikami a úzce spolupracuji s týmy vývojářů, designérů a produktových manažerů.
          </p>
        </AnimatedSection>
      </div>
    </SectionWrapper>
  );
};

export default AboutSection;
