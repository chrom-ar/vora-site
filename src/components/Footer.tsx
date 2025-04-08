
import React from 'react';
import { Github, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Instagram, href: "#", label: "Instagram" }
  ];

  return (
    <footer className="bg-background py-12 border-t border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <a href="#home" className="text-2xl font-bold text-gradient mb-4 inline-block">
              CHROM.AR
            </a>
            <p className="text-muted-foreground max-w-md mb-6">
              Creating immersive augmented reality experiences that transform how we interact with the digital world.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.href}
                  aria-label={link.label}
                  className="h-10 w-10 rounded-full bg-secondary hover:bg-accent/20 flex items-center justify-center transition-colors"
                >
                  <link.icon className="h-5 w-5 text-muted-foreground hover:text-accent" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Links</h3>
            <ul className="space-y-2">
              {["Home", "Projects", "About", "Contact"].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`}
                    className="text-muted-foreground hover:text-accent transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {["AR Development", "UI/UX Design", "3D Modeling", "App Development"].map((item) => (
                <li key={item}>
                  <a 
                    href="#"
                    className="text-muted-foreground hover:text-accent transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} CHROM.AR. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
