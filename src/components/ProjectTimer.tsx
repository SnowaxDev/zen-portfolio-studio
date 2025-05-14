
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
  
  return (
    <div className="mt-4">
      <p className="text-sm text-primary mb-2">Launching in:</p>
      <div className="flex justify-between items-center max-w-md">
        <TimeBlock label="Days" value={timeLeft.days} />
        <span className="text-foreground/30 text-2xl">:</span>
        <TimeBlock label="Hours" value={timeLeft.hours} />
        <span className="text-foreground/30 text-2xl">:</span>
        <TimeBlock label="Minutes" value={timeLeft.minutes} />
        <span className="text-foreground/30 text-2xl">:</span>
        <TimeBlock label="Seconds" value={timeLeft.seconds} />
      </div>
    </div>
  );
};

const TimeBlock: React.FC<{ label: string; value: number }> = ({ label, value }) => (
  <motion.div 
    className="flex flex-col items-center"
    animate={{ scale: [1, 1.05, 1] }}
    transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
  >
    <motion.span 
      className="text-2xl font-bold bg-secondary/40 rounded px-3 py-2 w-14 text-center"
      key={value} // This makes the component re-render when the value changes
      initial={{ opacity: 0.5, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {value.toString().padStart(2, '0')}
    </motion.span>
    <span className="text-xs text-foreground/60 mt-1">{label}</span>
  </motion.div>
);

export default ProjectTimer;
