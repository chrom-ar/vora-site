
import React, { useEffect, useState } from 'react';
import { BookOpenText, FileText } from 'lucide-react';

const matrixData = {
  'C': [
    [1, 1, 1, 1],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 1, 1, 1]
  ],
  'H': [
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1]
  ],
  'R': [
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
    [1, 0, 1, 0],
    [1, 0, 0, 1],
    [1, 0, 0, 1]
  ],
  'O': [
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 1]
  ],
  'M': [
    [1, 0, 0, 0, 1],
    [1, 1, 0, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1]
  ],
  'A': [
    [0, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1]
  ],
  '.': [
    [0],
    [0],
    [0],
    [0],
    [0],
    [0],
    [1]
  ],
  // Adding additional letters for "Agent Settlement Layer"
  'G': [
    [1, 1, 1, 1],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 0, 1, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 1]
  ],
  'E': [
    [1, 1, 1, 1],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 1, 1, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 1, 1, 1]
  ],
  'N': [
    [1, 0, 0, 1],
    [1, 1, 0, 1],
    [1, 1, 0, 1],
    [1, 0, 1, 1],
    [1, 0, 1, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1]
  ],
  'T': [
    [1, 1, 1, 1, 1],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0]
  ],
  'S': [
    [1, 1, 1, 1],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 1],
    [0, 0, 0, 1],
    [1, 1, 1, 1]
  ],
  'L': [
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 1, 1, 1]
  ],
  'Y': [
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0]
  ],
  ' ': [
    [0],
    [0],
    [0],
    [0],
    [0],
    [0],
    [0]
  ]
};

const Index = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const renderDotMatrix = (letter: string, isSmaller: boolean = false) => {
    const matrix = matrixData[letter as keyof typeof matrixData];
    if (!matrix) return null;

    return (
      <div className={`dot-matrix mx-${isSmaller ? '1' : '2'}`}>
        {matrix.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-2">
            {row.map((dot, dotIndex) => (
              <div 
                key={`${rowIndex}-${dotIndex}`} 
                className={`dot transition-opacity duration-700 ${visible ? 'opacity-80' : 'opacity-0'}`}
                style={{
                  visibility: dot ? 'visible' : 'hidden',
                  transitionDelay: `${(rowIndex + dotIndex) * 50}ms`,
                  width: isSmaller ? '2px' : '12px',
                  height: isSmaller ? '2px' : '12px'
                }}
              />
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col p-4">
      {/* Menu */}
      <div className="w-full flex justify-center mb-8 mt-4">
        <div className="flex gap-6">
          <a href="#" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
            <BookOpenText size={18} />
            <span>Documentation</span>
          </a>
          <a href="#" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
            <FileText size={18} />
            <span>llms.txt</span>
          </a>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center">
        {/* CHROM.AR matrix display */}
        <div className="flex flex-wrap justify-center items-center mb-8">
          {['C', 'H', 'R', 'O', 'M', '.', 'A', 'R'].map((letter, index) => (
            <React.Fragment key={index}>
              {renderDotMatrix(letter)}
            </React.Fragment>
          ))}
        </div>
        
        {/* Agent Settlement Layer text */}
        <div className="flex flex-wrap justify-center items-center mt-4">
          {['A', 'G', 'E', 'N', 'T', ' ', 'S', 'E', 'T', 'T', 'L', 'E', 'M', 'E', 'N', 'T', ' ', 'L', 'A', 'Y', 'E', 'R'].map((letter, index) => (
            <React.Fragment key={index}>
              {renderDotMatrix(letter, true)}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
