
import React from 'react';
import { ComparisonSlider } from 'aceternity-ui';

interface BeforeAfterComparisonProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

const BeforeAfterComparison: React.FC<BeforeAfterComparisonProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = "Před",
  afterLabel = "Po"
}) => {
  return (
    <div className="w-full h-full">
      <ComparisonSlider
        className="h-full w-full rounded-lg overflow-hidden"
        handleClassName="h-full w-1 bg-white group-hover:scale-y-125 transition-transform"
        handleButtonClassName="bg-white h-8 w-8 border-2 border-white rounded-full flex justify-center items-center group-hover:scale-110 transition-transform"
        hover={true}
        contentAfter={
          <div className="relative w-full h-full">
            <img 
              src={afterImage} 
              alt="After redesign" 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-3 right-3 px-2 py-1 bg-background/80 backdrop-blur-sm rounded-md text-xs font-medium">
              {afterLabel}
            </div>
          </div>
        }
        contentBefore={
          <div className="relative w-full h-full">
            <img 
              src={beforeImage} 
              alt="Before redesign" 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-3 left-3 px-2 py-1 bg-background/80 backdrop-blur-sm rounded-md text-xs font-medium">
              {beforeLabel}
            </div>
          </div>
        }
      />
    </div>
  );
};

export default BeforeAfterComparison;
