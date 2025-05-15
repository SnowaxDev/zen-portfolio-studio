
import React, { useEffect, useState, useRef } from 'react';

interface TextWithSparklesProps {
  children: React.ReactNode;
  className?: string;
}

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
}

const TextWithSparkles: React.FC<TextWithSparklesProps> = ({ children, className = "" }) => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Generate a new sparkle
  const generateSparkle = (width: number, height: number): Sparkle => ({
    id: Math.random(),
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 8 + 4, // Sizes between 4 and 12
    rotation: Math.random() * 360
  });
  
  // Create initial set of sparkles
  useEffect(() => {
    if (!containerRef.current) return;
    
    const { width, height } = containerRef.current.getBoundingClientRect();
    const newSparkles = [];
    
    // Create 15 random sparkles
    for (let i = 0; i < 15; i++) {
      newSparkles.push(generateSparkle(width, height));
    }
    
    setSparkles(newSparkles);
    
    // Animation interval to update sparkles
    const interval = setInterval(() => {
      setSparkles((currentSparkles) => {
        // Update some sparkles
        return currentSparkles.map(sparkle => {
          // 8% chance to update a sparkle
          if (Math.random() > 0.92 && containerRef.current) {
            const { width, height } = containerRef.current.getBoundingClientRect();
            return generateSparkle(width, height);
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
        {/* Actual content */}
        <div className="text-center z-20">{children}</div>
        
        {/* Sparkles container */}
        <div className="w-full h-full absolute inset-0 z-10 pointer-events-none overflow-hidden">
          {sparkles.map((sparkle) => (
            <div
              key={sparkle.id}
              className="absolute animate-pulse"
              style={{
                top: `${sparkle.y}px`,
                left: `${sparkle.x}px`,
                transform: `rotate(${sparkle.rotation}deg)`,
              }}
            >
              <svg
                width={sparkle.size}
                height={sparkle.size}
                viewBox="0 0 160 160"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M80 0C80 0 84.2846 41.2925 101.496 58.504C118.707 75.7154 160 80 160 80C160 80 118.707 84.2846 101.496 101.496C84.2846 118.707 80 160 80 160C80 160 75.7154 118.707 58.504 101.496C41.2925 84.2846 0 80 0 80C0 80 41.2925 75.7154 58.504 58.504C75.7154 41.2925 80 0 80 0Z"
                  fill="#FFD700"
                />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TextWithSparkles;
