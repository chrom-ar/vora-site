
import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center pt-16">
      <div className="container mx-auto px-4 md:px-6 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6 md:space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tighter mb-4">
                We Create <span className="text-gradient">Augmented Reality</span> Experiences
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-lg">
                Transforming the way you interact with digital content through cutting-edge AR technology.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#projects" className="inline-flex items-center justify-center space-x-2 bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-3 rounded-lg transition-all duration-200 font-medium">
                <span>View Our Work</span>
                <ArrowRight size={16} />
              </a>
              <a href="#contact" className="inline-flex items-center justify-center bg-secondary hover:bg-secondary/90 text-secondary-foreground px-6 py-3 rounded-lg transition-all duration-200 font-medium">
                Get In Touch
              </a>
            </div>
            
            <div className="pt-4">
              <p className="text-sm text-muted-foreground">
                Trusted by innovative companies worldwide
              </p>
              <div className="flex flex-wrap gap-6 md:gap-10 items-center mt-4">
                {/* Placeholder for partner logos */}
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-8 w-24 bg-muted/20 rounded"></div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-square rounded-lg bg-linear-to-br from-accent/20 via-accent/10 to-transparent animate-pulse-glow relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-5xl font-bold text-white">AR</div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 h-24 w-24 rounded-full bg-accent/10 blur-xl"></div>
              <div className="absolute -bottom-4 -right-4 h-32 w-32 rounded-full bg-accent/20 blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
