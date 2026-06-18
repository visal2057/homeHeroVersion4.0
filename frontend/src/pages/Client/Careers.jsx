import React from 'react';
import { Link } from 'react-router-dom';

const Careers = () => {
  // Why join HomeHero - benefits data
  const benefits = [
    {
      icon: "verified",
      title: "Trust & Transparency",
      description: "We believe in building trust through honest communication and transparent processes."
    },
    {
      icon: "handshake",
      title: "Supportive Environment",
      description: "Great work happens when talented people are given the trust, tools, and freedom to excel."
    },
    {
      icon: "trending_up",
      title: "Growth Opportunities",
      description: "Continuous learning and career development opportunities for all team members."
    },
    {
      icon: "diversity_3",
      title: "Inclusive Culture",
      description: "We celebrate diversity and create an environment where everyone belongs and contributes."
    },
    {
      icon: "verified",
      title: "Professional Development",
      description: "Access to training, workshops, and resources to enhance your skills."
    },
    {
      icon: "group",
      title: "Community Impact",
      description: "Be part of a mission that's making a real difference in people's lives."
    }
  ];

  // Values data
  const values = [
    {
      icon: "rocket_launch",
      title: "Innovation First",
      description: "We embrace new ideas and technologies to better serve our customers."
    },
    {
      icon: "security",
      title: "Safety Always",
      description: "We prioritize safety for our team members and customers above everything else."
    },
    {
      icon: "favorite",
      title: "Customer Obsessed",
      description: "We put our customers at the heart of everything we do."
    },
    {
      icon: "emoji_events",
      title: "Excellence Driven",
      description: "We strive for excellence in every service we provide."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-on-background flex flex-col">
      
     <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-outline-variant shadow-sm h-16">
             <div className="flex justify-between items-center px-4 md:px-8 h-full max-w-7xl mx-auto">
               <div className="flex items-center gap-2">
                 <Link to="/" className="text-xl font-black tracking-tighter text-primary">HomeHero</Link>
                 <div className="h-6 w-px bg-outline-variant mx-2 hidden sm:block"></div>
                 <span className="text-sm font-medium text-on-surface-variant hidden sm:block">About Us</span>
               </div>
               <nav className="hidden md:flex items-center gap-8">
                 <Link to="/dashboard/account" className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors">Home</Link>
                 <Link to="/about" className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors">About us</Link>
                 <Link to="/careers" className="text-sm font-medium text-primary border-b-2 border-primary pb-1">Careers</Link>

                 
                 <Link to="/contact" className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors">Contact us</Link>

               </nav>
         
             </div>
           </header>

      {/* ===== MAIN CONTENT ===== */}
      <main className="flex-grow pt-16">
        
        {/* ===== HERO SECTION ===== */}
        <section 
          className="py-16 md:py-20 px-6 text-center text-white min-h-[400px] flex items-center justify-center relative bg-cover bg-center"
          style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80')` }}
        >
          <div className="max-w-4xl mx-auto relative z-10">
            <div className="inline-block bg-primary/20 backdrop-blur-sm px-6 py-2 rounded-full mb-6 border border-primary/30">
              <span className="text-sm font-bold uppercase tracking-wider text-emerald-300">Join Our Mission</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 drop-shadow-lg">
              Building the Future of <br className="hidden sm:inline" />
              <span className="text-emerald-300">Home Services</span>
            </h1>
            <p className="text-base md:text-lg max-w-2xl mx-auto drop-shadow-md opacity-95 mb-8">
              We're on a journey to redefine how the world takes care of their homes. 
              Join our team of passionate service providers.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                to="/auth/worker-register"
                className="bg-primary text-on-primary px-8 py-3 rounded-full font-semibold hover:bg-primary-container hover:text-on-primary-container transition-all shadow-lg shadow-primary/30"
              >
                Join as a Service Provider
              </Link>
              <Link 
                to="/contact"
                className="bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-full font-semibold hover:bg-white/30 transition-all border border-white/30"
              >
                Contact us
              </Link>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-6 w-full">
          
          {/* ===== WHY JOIN US SECTION ===== */}
          <section className="py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-4">Why join HomeHero?</h2>
              <p className="text-on-surface-variant max-w-2xl mx-auto">
                We believe that great work happens when talented people are given the trust, tools, 
                and freedom to excel in a supportive environment.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-sm border border-surface-container hover:border-primary/40 hover:shadow-md transition-all group"
                >
                  <div className="w-12 h-12 bg-primary-fixed rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-primary text-2xl">{benefit.icon}</span>
                  </div>
                  <h3 className="text-lg font-bold text-on-surface mb-2">{benefit.title}</h3>
                  <p className="text-sm text-on-surface-variant">{benefit.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ===== OUR VALUES SECTION ===== */}
          <section className="py-16 border-t border-outline-variant">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-4">Our Core Values</h2>
              <p className="text-on-surface-variant max-w-2xl mx-auto">
                The principles that guide everything we do at HomeHero
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-sm border border-surface-container text-center hover:border-primary/40 hover:shadow-md transition-all group"
                >
                  <div className="w-16 h-16 bg-primary-fixed rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-primary text-3xl">{value.icon}</span>
                  </div>
                  <h3 className="text-lg font-bold text-on-surface mb-2">{value.title}</h3>
                  <p className="text-sm text-on-surface-variant">{value.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ===== CTA SECTION ===== */}
          <section className="py-16">
            <div className="bg-primary rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 opacity-10">
                <span className="material-symbols-outlined text-9xl text-white">handshake</span>
              </div>
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Ready to Make a Difference?
                </h2>
                <p className="text-emerald-100 text-lg mb-8 max-w-2xl mx-auto">
                  Join us in building the future of home services and be part of something bigger.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link 
                    to="/provider/register"
                    className="bg-white text-primary px-10 py-4 rounded-full font-semibold text-lg hover:bg-gray-50 transition-all shadow-xl"
                  >
                    Get Started
                  </Link>
                  <Link 
                    to="/contact"
                    className="border border-white/30 text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all"
                  >
                    Talk to Us
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="bg-white border-t border-outline-variant mt-8">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <Link to="/" className="text-lg font-bold text-primary">HomeHero</Link>
              <p className="text-on-surface-variant text-sm mt-1">© 2024 HomeHero. All rights reserved.</p>
            </div>
            <nav className="flex flex-wrap justify-center gap-6">
              <Link to="/services" className="text-on-surface-variant hover:text-primary transition-colors text-sm">Services</Link>
              <Link to="/who-we-are" className="text-on-surface-variant hover:text-primary transition-colors text-sm">About us</Link>
              <Link to="/careers" className="text-primary font-semibold text-sm">Careers</Link>
              <Link to="/contact" className="text-on-surface-variant hover:text-primary transition-colors text-sm">Contact us</Link>
              <Link to="/privacy" className="text-on-surface-variant hover:text-primary transition-colors text-sm">Privacy</Link>
              <Link to="/terms" className="text-on-surface-variant hover:text-primary transition-colors text-sm">Terms</Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Careers;