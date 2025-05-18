
import React from 'react';
import { cn } from '../lib/utils';

interface SectionWrapperProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ 
  id, 
  className, 
  children 
}) => {
  return (
    <section id={id} className={cn("relative py-16", className)}>
      {children}
    </section>
  );
};

export default SectionWrapper;
