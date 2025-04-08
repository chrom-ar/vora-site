
import React from 'react';
import { Code, Users, Lightbulb, Sparkles } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }: { 
  icon: React.ElementType; 
  title: string; 
  description: string; 
}) => {
  return (
    <div className="glass-card p-6 rounded-lg hover-translate">
      <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-accent" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

const About = () => {
  const features = [
    {
      icon: Sparkles,
      title: "Innovative AR Solutions",
      description: "We create cutting-edge augmented reality experiences using the latest technology and creative approaches."
    },
    {
      icon: Users,
      title: "User-Centered Design",
      description: "Our AR experiences are designed with the user in mind, ensuring intuitive and engaging interactions."
    },
    {
      icon: Code,
      title: "Expert Development",
      description: "Our team of skilled developers brings technical excellence to every project, from concept to deployment."
    },
    {
      icon: Lightbulb,
      title: "Creative Vision",
      description: "We combine technological expertise with creative imagination to produce unique and impactful AR solutions."
    }
  ];

  return (
    <section id="about" className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">About CHROM.AR</h2>
            <p className="text-muted-foreground mb-6">
              We are a team of passionate AR developers and designers dedicated to creating immersive and interactive experiences. At CHROM.AR, we believe in the power of augmented reality to transform how we interact with the world around us.
            </p>
            <p className="text-muted-foreground mb-6">
              Founded in 2020, we've been at the forefront of AR innovation, working with clients across various industries to bring their visions to life. Our commitment to excellence and our creative approach sets us apart in delivering AR solutions that engage, inspire, and deliver results.
            </p>
            <a href="#contact" className="inline-flex items-center justify-center bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-3 rounded-lg transition-all duration-200 font-medium">
              Work With Us
            </a>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
