
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ProjectTimerProps {
  launchDate: string | null;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const ProjectTimer: React.FC<ProjectTimerProps> = ({ launchDate }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  
  useEffect(() => {
    if (!launchDate) return;
    
    const calculateTimeLeft = () => {
      const difference = +new Date(launchDate) - +new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };
    
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(timer);
  }, [launchDate]);
  
  // Parent container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
  // Child animation for each time block
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300 }
    }
  };
  
  return (
    <motion.div 
      className="w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex justify-between items-center gap-2">
        <TimeBlock label="Dny" value={timeLeft.days} variants={itemVariants} />
        <span className="text-gold/80 text-2xl font-thin">:</span>
        <TimeBlock label="Hodiny" value={timeLeft.hours} variants={itemVariants} />
        <span className="text-gold/80 text-2xl font-thin">:</span>
        <TimeBlock label="Minuty" value={timeLeft.minutes} variants={itemVariants} />
        <span className="text-gold/80 text-2xl font-thin">:</span>
        <TimeBlock label="Sekundy" value={timeLeft.seconds} variants={itemVariants} />
      </div>
    </motion.div>
  );
};

const TimeBlock: React.FC<{ 
  label: string; 
  value: number;
  variants: any;
}> = ({ label, value, variants }) => (
  <motion.div 
    className="flex flex-col items-center"
    variants={variants}
    whileHover={{ y: -2 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <motion.div 
      className="relative"
      whileHover={{ scale: 1.05 }}
    >
      <motion.div 
        className="flex items-center justify-center bg-black/50 border border-gold/20 backdrop-blur-md rounded-lg px-3 py-2 w-16 h-16 text-center relative overflow-hidden"
      >
        <motion.span
          className="text-2xl font-bold text-gold"
          key={value} // This makes the component re-render when the value changes
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 10, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {value.toString().padStart(2, '0')}
        </motion.span>
        
        {/* Bottom highlight */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent"
        />
      </motion.div>
    </motion.div>
    <span className="text-xs text-foreground/60 mt-2">{label}</span>
  </motion.div>
);

export default ProjectTimer;
