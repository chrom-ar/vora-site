import React, { useEffect, useState } from "react";
import { BookOpenText, FileText, Moon, Sun, Newspaper } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "../components/ui/button"; // Assuming Button component exists

const matrixData = {
  "C": [
    [1, 1, 1, 1],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 1, 1, 1],
  ],
  "H": [
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
  ],
  "R": [
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
    [1, 0, 1, 0],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
  ],
  "O": [
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
  ],
  "M": [
    [1, 0, 0, 0, 1],
    [1, 1, 0, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
  ],
  "A": [
    [0, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
  ],
  ".": [
    [0],
    [0],
    [0],
    [0],
    [0],
    [0],
    [1],
  ],
};

// Theme Toggle Component
const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="text-foreground hover:text-primary transition-colors"
      aria-label="Toggle theme"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
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

    if (!matrix) {
      return null;
    }

    return (
      <div className="dot-matrix mx-1 sm:mx-2">
        {matrix.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-0.5 sm:gap-2">
            {row.map((dot, dotIndex) => (
              <div
                key={`${rowIndex}-${dotIndex}`}
                className={`dot transition-opacity duration-700 ${visible ? "opacity-80" : "opacity-0"}`}
                style={{
                  visibility: dot ? "visible" : "hidden",
                  transitionDelay: `${(rowIndex + dotIndex) * 50}ms`,
                }}
              />
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col p-4 sm:p-6 lg:p-8">
      {/* Menu */}
      <div className="w-full flex justify-center mb-8 mt-4">
        <div className="flex flex-col sm:flex-row sm:gap-6 gap-2 items-center">
          <a href="#" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
            <BookOpenText size={18} />
            <span className="text-xs sm:text-base">Documentation</span>
          </a>
          <a href="https://raw.githubusercontent.com/chrom-ar/solver-sdk/refs/heads/master/llms.txt" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
            <FileText size={18} />
            <span className="text-xs sm:text-base">llms.txt</span>
          </a>
          <a href="https://chromar.substack.com/" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
            <Newspaper size={18} />
            <span className="text-xs sm:text-base">Blog</span>
          </a>
          <ThemeToggle />
        </div>
      </div>

      {/* CHROM.AR matrix display */}
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-wrap justify-center items-center">
          {["C", "H", "R", "O", "M", ".", "A", "R"].map((letter, index) => (
            <React.Fragment key={index}>
              {renderDotMatrix(letter)}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
