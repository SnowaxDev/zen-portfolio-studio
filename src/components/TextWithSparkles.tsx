
import React, { useEffect, useState, useRef } from 'react';

interface TextWithSparklesProps {
  children: React.ReactNode;
  className?: string;
}

// Custom sparkle component
interface SparkleProps {
  size: number;
  color: string;
  style: React.CSSProperties;
}

const Sparkle: React.FC<SparkleProps> = ({ size, color, style }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      className="animate-pulse absolute"
    >
      <path
        d="M80 0C80 0 84.2846 41.2925 101.496 58.504C118.707 75.7154 160 80 160 80C160 80 118.707 84.2846 101.496 101.496C84.2846 118.707 80 160 80 160C80 160 75.7154 118.707 58.504 101.496C41.2925 84.2846 0 80 0 80C0 80 41.2925 75.7154 58.504 58.504C75.7154 41.2925 80 0 80 0Z"
        fill={color}
      />
    </svg>
  );
};

const TextWithSparkles: React.FC<TextWithSparklesProps> = ({ children, className = "" }) => {
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number; size: number; }>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Create initial sparkles
    if (containerRef.current) {
      const width = containerRef.current.offsetWidth;
      const height = containerRef.current.offsetHeight;
      const newSparkles = [];
      
      // Create 15 random sparkles
      for (let i = 0; i < 15; i++) {
        newSparkles.push({
          id: i,
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 8 + 4, // Sizes between 4 and 12
        });
      }
      
      setSparkles(newSparkles);
    }
    
    // Animation interval to update sparkles
    const interval = setInterval(() => {
      setSparkles((currentSparkles) => {
        // Randomly change some sparkles
        return currentSparkles.map(sparkle => {
          if (Math.random() > 0.92) {
            if (containerRef.current) {
              const width = containerRef.current.offsetWidth;
              const height = containerRef.current.offsetHeight;
              
              return {
                ...sparkle,
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 8 + 4,
              };
            }
          }
          return sparkle;
        });
      });
    }, 500);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative w-full h-full ${className}`} ref={containerRef}>
      <div className="w-full h-full relative flex flex-col items-center justify-center">
        <div className="text-center z-20">{children}</div>
        
        {/* Sparkles container */}
        <div className="w-full h-full absolute inset-0 z-10 pointer-events-none overflow-hidden">
          {sparkles.map((sparkle) => (
            <Sparkle
              key={sparkle.id}
              size={sparkle.size}
              color="#FFD700"
              style={{
                top: `${sparkle.y}px`,
                left: `${sparkle.x}px`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TextWithSparkles;
