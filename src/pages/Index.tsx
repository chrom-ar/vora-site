
import React, { useEffect, useState } from 'react';

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

  const renderDotMatrix = (letter: string) => {
    const matrix = matrixData[letter as keyof typeof matrixData];
    if (!matrix) return null;

    return (
      <div className="dot-matrix mx-2">
        {matrix.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-2">
            {row.map((dot, dotIndex) => (
              <div 
                key={`${rowIndex}-${dotIndex}`} 
                className={`dot transition-opacity duration-700 ${visible ? 'opacity-80' : 'opacity-0'}`}
                style={{
                  visibility: dot ? 'visible' : 'hidden',
                  transitionDelay: `${(rowIndex + dotIndex) * 50}ms`
                }}
              />
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <div className="flex flex-wrap justify-center items-center">
        {['C', 'H', 'R', 'O', 'M', '.', 'A', 'R'].map((letter, index) => (
          <React.Fragment key={index}>
            {renderDotMatrix(letter)}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Index;
