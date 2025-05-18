
import React from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckSquare, Users, Github } from 'lucide-react';
import StatBox from '../components/about/StatBox';
import SectionWrapper from '../components/SectionWrapper';
import { useMobileUtils } from '../hooks/use-mobile-utils';
import ScrollReveal from '../components/ScrollReveal';

const AboutSection: React.FC = () => {
  const { isMobile, getMobileSpacing } = useMobileUtils();

  return (
    <SectionWrapper id="about" className="pt-24 pb-16">
      <div className={getMobileSpacing()}>
        <div className="text-center mb-12">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              O mně
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-muted-foreground text-sm md:text-base">
              Stručné shrnutí mé profesní cesty a dovedností.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <StatBox 
            label="Roky zkušeností" 
            value={6} 
            icon={<Clock className="h-6 w-6" />} 
          />
          <StatBox 
            label="Dokončených projektů" 
            value={48} 
            icon={<CheckSquare className="h-6 w-6" />} 
          />
          <StatBox 
            label="Spokojených klientů" 
            value={32} 
            icon={<Users className="h-6 w-6" />} 
          />
          <StatBox 
            label="Open source příspěvků" 
            value={93} 
            icon={<Github className="h-6 w-6" />} 
          />
        </div>

        <div className="space-y-6">
          <ScrollReveal delay={0.4}>
            <p className="text-foreground/80 text-sm md:text-base">
              Jsem Jan Novák, frontend vývojář a UI/UX designér s {6}+ lety zkušeností v tvorbě moderních webových aplikací. Specializuji se na React a Next.js, a mou vášní je vytvářet intuitivní a vizuálně přitažlivé uživatelské rozhraní.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.6}>
            <p className="text-foreground/80 text-sm md:text-base">
              Během své kariéry jsem úspěšně dokončil více než {45} projektů pro klienty z různých odvětví. Mám hluboké znalosti v oblasti responzivního designu, optimalizace výkonu a přístupnosti webu.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.8}>
            <p className="text-foreground/80 text-sm md:text-base">
              Neustále se vzdělávám a sleduji nejnovější trendy v oblasti webového vývoje. Mám zkušenosti s agilními metodikami a úzce spolupracuji s týmy vývojářů, designérů a produktových manažerů.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default AboutSection;
