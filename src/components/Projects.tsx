
import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const ProjectCard = ({ title, description, category, image, index }: { 
  title: string; 
  description: string; 
  category: string; 
  image: string;
  index: number;
}) => {
  return (
    <div 
      className="glass-card rounded-lg overflow-hidden hover-translate group"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="aspect-video bg-muted/30 relative overflow-hidden">
        <div className={`absolute inset-0 bg-linear-to-br from-accent/20 to-transparent opacity-80`}></div>
        <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold">{title[0]}</div>
      </div>
      <div className="p-6">
        <div className="mb-2">
          <span className="text-xs font-medium text-muted-foreground px-2 py-1 bg-muted/20 rounded-full">
            {category}
          </span>
        </div>
        <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4">
          {description}
        </p>
        <a 
          href="#" 
          className="inline-flex items-center text-sm font-medium text-accent"
        >
          <span>View Project</span>
          <ArrowUpRight size={14} className="ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </div>
  );
};

const Projects = () => {
  const projects = [
    {
      title: "AR Shopping Experience",
      description: "An immersive augmented reality platform for retail that allows customers to visualize products in their own space.",
      category: "E-Commerce",
      image: ""
    },
    {
      title: "Interactive Museum Guide",
      description: "AR-powered guide that brings exhibits to life with interactive 3D models and detailed information overlays.",
      category: "Education",
      image: ""
    },
    {
      title: "Virtual Try-On App",
      description: "Fashion application that lets users try on accessories and clothing virtually using advanced AR technology.",
      category: "Fashion",
      image: ""
    },
    {
      title: "Industrial Maintenance AR",
      description: "Training and maintenance solution that provides AR overlays for complex machinery and equipment.",
      category: "Industrial",
      image: ""
    }
  ];

  return (
    <section id="projects" className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our latest augmented reality solutions that are redefining digital experiences across industries.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
