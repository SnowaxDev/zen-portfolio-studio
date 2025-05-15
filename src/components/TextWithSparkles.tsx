
import React from 'react';
import { SparklesCore } from 'aceternity-ui';

interface TextWithSparklesProps {
  children: React.ReactNode;
  className?: string;
}

const TextWithSparkles: React.FC<TextWithSparklesProps> = ({ children, className = "" }) => {
  return (
    <div className={`relative w-full h-full ${className}`}>
      <div className="w-full h-full relative flex flex-col items-center justify-center">
        <div className="text-center z-20">{children}</div>
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={100}
          className="w-full h-full absolute inset-0 z-10"
          particleColor="#FFD700"
        />
      </div>
    </div>
  );
};

export default TextWithSparkles;
