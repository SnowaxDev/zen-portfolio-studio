
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ProgressBarProps {
  skill: string;
  percentage: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ skill, percentage }) => {
  // Animation controls
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium">{skill}</span>
        <span className="text-sm text-foreground/70">{percentage}%</span>
      </div>
      <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-primary"
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
