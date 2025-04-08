
import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';

const ContactCard = ({ icon: Icon, title, details, link }: {
  icon: React.ElementType;
  title: string;
  details: string;
  link?: string;
}) => {
  return (
    <div className="glass-card p-6 rounded-lg text-center hover-translate">
      <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
        <Icon className="h-6 w-6 text-accent" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      {link ? (
        <a href={link} className="text-muted-foreground hover:text-accent transition-colors">
          {details}
        </a>
      ) : (
        <p className="text-muted-foreground">{details}</p>
      )}
    </div>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or want to learn more about our AR solutions? We'd love to hear from you.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <ContactCard 
            icon={Mail} 
            title="Email" 
            details="hello@chromar.com" 
            link="mailto:hello@chromar.com" 
          />
          <ContactCard 
            icon={Phone} 
            title="Phone" 
            details="+1 (555) 123-4567" 
            link="tel:+15551234567" 
          />
          <ContactCard 
            icon={MapPin} 
            title="Office" 
            details="123 Tech Lane, San Francisco, CA" 
          />
        </div>
        
        <div className="glass-card rounded-lg p-8">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full bg-secondary/50 border border-border rounded-md px-4 py-2 focus:outline-hidden focus:ring-2 focus:ring-accent"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full bg-secondary/50 border border-border rounded-md px-4 py-2 focus:outline-hidden focus:ring-2 focus:ring-accent"
                  placeholder="Your email"
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-2">
                Subject
              </label>
              <input 
                type="text" 
                id="subject" 
                className="w-full bg-secondary/50 border border-border rounded-md px-4 py-2 focus:outline-hidden focus:ring-2 focus:ring-accent"
                placeholder="Subject"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </label>
              <textarea 
                id="message" 
                rows={5} 
                className="w-full bg-secondary/50 border border-border rounded-md px-4 py-2 focus:outline-hidden focus:ring-2 focus:ring-accent"
                placeholder="Your message"
              ></textarea>
            </div>
            <div>
              <button 
                type="submit" 
                className="inline-flex items-center justify-center bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-3 rounded-lg transition-all duration-200 font-medium"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
