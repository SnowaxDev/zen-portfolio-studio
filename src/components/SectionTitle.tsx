import React from 'react';
import { motion } from 'framer-motion';
interface SectionTitleProps {
  title: string;
  subtitle?: string;
}
const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle
}) => {
  return <div className="mb-16 text-center">
      <motion.div className="inline-block" initial={{
      opacity: 0,
      y: 20
    }} whileInView={{
      opacity: 1,
      y: 0
    }} viewport={{
      once: true,
      margin: "-100px"
    }} transition={{
      duration: 0.5
    }}>
        <h2 className="text-3xl md:text-4xl font-bold mb-2 relative inline-block">
          {title}
          <motion.span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent rounded-full" initial={{
          width: "0%"
        }} whileInView={{
          width: "100%"
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.5,
          delay: 0.2
        }} />
        </h2>
      </motion.div>
      
      {subtitle && <motion.p className="text-foreground/70 max-w-2xl mx-auto mt-4 font-serif" initial={{
      opacity: 0,
      y: 20
    }} whileInView={{
      opacity: 1,
      y: 0
    }} viewport={{
      once: true,
      margin: "-100px"
    }} transition={{
      duration: 0.5,
      delay: 0.3
    }}>
          {subtitle}
        </motion.p>}
      
      {/* Decorative element */}
      
    </div>;
};
export default SectionTitle;