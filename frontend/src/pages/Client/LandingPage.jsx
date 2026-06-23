import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-on-background font-['Inter'] antialiased w-full overflow-x-hidden">
      
      {/* ===== HEADER - Enhanced ===== */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md border-b border-outline-variant shadow-lg' 
          : 'bg-white/80 backdrop-blur-md border-b border-outline-variant/30 shadow-sm'
      } h-16`}>
        <div className="flex justify-between items-center px-4 md:px-8 h-full max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <Link to="/" className="text-xl font-black tracking-tighter text-primary hover:opacity-80 transition-opacity">
              HomeHero
            </Link>
            <div className="h-6 w-px bg-outline-variant mx-2 hidden sm:block"></div>
            <span className="text-sm font-medium text-on-surface-variant hidden sm:block">Home Services</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/about" className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors relative group">
              About us
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </Link>
            <Link to="/careers" className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors relative group">
              Careers
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </Link>
            <Link to="/contact" className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors relative group">
              Contact us
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => navigate('/auth/signup-as')}
              className="px-4 py-2 text-sm font-semibold text-on-surface-variant bg-surface-container-low rounded-full hover:bg-primary hover:text-on-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
            >
              Sign Up
            </button>
            <Link to="/login" className="px-5 py-2 text-sm font-semibold text-on-primary bg-primary rounded-full hover:bg-primary-container hover:text-on-primary-container transition-all duration-300 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30">
              Log In
            </Link>
          </div>
        </div>
      </header>

      {/* ===== MAIN CONTENT ===== */}
      <main className="w-full pt-16">
        
        {/* ===== HERO SECTION - Enhanced ===== */}
        <section className="relative min-h-[600px] md:min-h-[700px] w-full flex items-center justify-center overflow-hidden">
          {/* Background Image with Parallax Effect */}
          <div className="absolute inset-0 w-full h-full">
            <img 
              alt="Professional Gardener at work" 
              className="w-full h-full object-cover object-center transform scale-105" 
              src="https://images.unsplash.com/photo-1608109704808-62aadbc33a7d?&o=100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent"></div>
          </div>
          
          {/* Animated Decorative Elements */}
          <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-emerald-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
          
          <div className="relative z-10 w-full max-w-5xl px-6 text-center">
            {/* Animated Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-5 py-2 rounded-full border border-white/20 mb-6 animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-white/90">Trusted by 50k+ Homes</span>
            </div>
            
            {/* Main Heading with Gradient */}
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-6 drop-shadow-2xl leading-tight">
              Expert Care for <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-emerald-300 to-emerald-400 bg-clip-text text-transparent">
                Your Home
              </span>
            </h1>
            
            <p className="max-w-2xl mx-auto text-white/90 text-base md:text-lg leading-relaxed drop-shadow-lg mb-8">
              HomeHero connects homeowners with a network of trusted and verified professionals for all your household needs.
            </p>
            
            {/* Trust Badges - Enhanced */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {[
                { icon: '⭐', label: '4.9/5 Service Rating' },
                { icon: '✅', label: 'Verified Professionals' },
                { icon: '🔒', label: 'Secure Payments' }
              ].map((item, idx) => (
                <span 
                  key={idx}
                  className="text-white/90 text-xs bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
                >
                  {item.icon} {item.label}
                </span>
              ))}
            </div>
            
            {/* CTA Buttons - Enhanced */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button 
                onClick={() => navigate('/auth/signup-as')}
                className="group inline-flex items-center justify-center gap-2 bg-primary text-on-primary px-10 py-4 rounded-full font-semibold text-lg hover:bg-primary-container hover:text-on-primary-container transition-all duration-300 shadow-2xl shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-1"
              >
                <span>Get Started</span>
                <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>
              
            </div>
          </div>
        </section>

        {/* ===== SERVICES SECTION - Enhanced ===== */}
        <section className="py-20 max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary-fixed px-4 py-2 rounded-full mb-4">
                <span className="material-symbols-outlined text-primary text-sm">grid_view</span>
                <span className="text-xs font-bold uppercase tracking-wider text-primary">What We Offer</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-on-surface">Our Services</h2>
              <p className="text-on-surface-variant mt-2">Professional assistance for every corner of your house.</p>
            </div>
           
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { icon: "potted_plant", name: "Gardening", desc: "Pruning, planting, and lawn maintenance.", path: "/explore/gardening", color: "from-emerald-400/20" },
              { icon: "build", name: "Handiwork", desc: "Mounting, fixing, and light assemblies.", path: "/explore/handiwork", color: "from-blue-400/20" },
              { icon: "ac_unit", name: "AC Repair", desc: "Cooling maintenance and expert repairs.", path: "/explore/ac-repair", color: "from-cyan-400/20" },
              { icon: "cleaning_services", name: "Cleaning", desc: "Deep cleans and recurring home care.", path: "/explore/cleaning", color: "from-purple-400/20" },
              { icon: "pets", name: "Petcare", desc: "Professional walking and home sitting.", path: "/explore/petcare", color: "from-amber-400/20" }
            ].map((service, idx) => (
              <Link 
                key={idx} 
                to={service.path}
                className="group relative bg-white p-8 rounded-2xl shadow-sm border border-surface-container hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-primary/30 overflow-hidden"
              >
                {/* Animated Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                {/* Icon with Pulse Effect */}
                <div className="relative">
                  <div className="w-20 h-20 bg-primary-fixed rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500 group-hover:bg-primary group-hover:text-on-primary">
                    <span className="material-symbols-outlined text-primary text-4xl group-hover:text-on-primary transition-colors duration-500">{service.icon}</span>
                  </div>
                  {/* Floating Arrow */}
                  <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-2 group-hover:translate-x-0">
                    <span className="material-symbols-outlined text-primary text-xl">arrow_forward</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-on-surface mb-2 group-hover:text-primary transition-colors duration-300">
                  {service.name}
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">{service.desc}</p>
                
                {/* Bottom Accent Line */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-primary group-hover:w-full transition-all duration-500"></div>
              </Link>
            ))}
          </div>
        </section>

        {/* ===== STATS SECTION - NEW ===== */}
        <section className="py-16 bg-primary/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: '50k+', label: 'Homes Served', icon: 'home' },
                { value: '10k+', label: 'Verified Pros', icon: 'verified' },
                { value: '4.9/5', label: 'Average Rating', icon: 'star' },
                { value: '98%', label: 'Satisfaction Rate', icon: 'sentiment_satisfied' }
              ].map((stat, idx) => (
                <div key={idx} className="text-center group">
                  <div className="text-4xl md:text-5xl font-black text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <div className="flex items-center justify-center gap-2 text-on-surface-variant text-sm font-medium">
                    <span className="material-symbols-outlined text-primary text-sm">{stat.icon}</span>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== HOW IT WORKS - Enhanced ===== */}
        <section className="bg-surface-container py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-14">
              <div className="inline-block bg-primary-fixed px-4 py-2 rounded-full mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">Simple Process</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-2">Simple steps to a better home</h2>
              <p className="text-on-surface-variant mt-1">Managing your property shouldn't be a full-time job.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
              {/* Connection Line */}
              <div className="hidden md:block absolute top-24 left-1/3 right-1/3 h-0.5 bg-primary/20"></div>
              
              {[
                { num: "01", title: "Choose Service", desc: "Select from our wide range of professional household services.", icon: "home_repair_service" },
                { num: "02", title: "Pick a Time", desc: "Schedule a visit that fits perfectly into your busy calendar.", icon: "schedule" },
                { num: "03", title: "Relaxed Results", desc: "Sit back while our vetted pros handle everything with care.", icon: "celebration" }
              ].map((step, idx) => (
                <div key={idx} className="relative flex flex-col items-center text-center px-4 group">
                  {/* Step Number with Gradient */}
                  <div className="text-6xl md:text-7xl font-black bg-gradient-to-b from-primary/20 to-primary/5 bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform duration-500">
                    {step.num}
                  </div>
                  
                  {/* Icon Circle with Pulse */}
                  <div className="relative">
                    <div className="w-20 h-20 bg-primary-fixed rounded-full flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500 group-hover:bg-primary group-hover:text-on-primary">
                      <span className="material-symbols-outlined text-primary text-3xl group-hover:text-on-primary transition-colors duration-500">
                        {step.icon}
                      </span>
                    </div>
                    {/* Decorative Ring */}
                    <div className="absolute inset-0 rounded-full border-2 border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-110"></div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-on-surface mb-2 group-hover:text-primary transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-on-surface-variant text-sm max-w-[280px] leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CTA BANNER - Enhanced ===== */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="relative bg-gradient-to-r from-primary to-primary/90 rounded-3xl p-12 md:p-16 text-center overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 opacity-10">
              <span className="material-symbols-outlined text-9xl text-white">handshake</span>
            </div>
            <div className="absolute bottom-0 left-0 opacity-5">
              <span className="material-symbols-outlined text-8xl text-white">home</span>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-5 py-2 rounded-full border border-white/20 mb-6">
                <span className="material-symbols-outlined text-emerald-200 text-sm">celebration</span>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-100">Get Started Today</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 drop-shadow-lg">
                Ready to <span className="text-emerald-200">Transform</span> Your Home?
              </h2>
              <p className="text-emerald-100 text-base md:text-lg mb-10 max-w-2xl mx-auto opacity-90">
                Join thousands of homeowners who trust HomeHero for their daily maintenance and specialized care.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => navigate('/auth/signup-as')}
                  className="group inline-flex items-center justify-center gap-2 bg-white text-primary px-12 py-4 rounded-full font-semibold text-lg hover:bg-slate-50 transition-all duration-300 shadow-2xl hover:shadow-white/20 hover:-translate-y-1"
                >
                  <span className="material-symbols-outlined text-xl">rocket_launch</span>
                  Get Started
                </button>
                
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="bg-white border-t border-outline-variant">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <Link to="/" className="text-lg font-bold text-primary">HomeHero</Link>
              <p className="text-on-surface-variant text-sm mt-1">© 2026 HomeHero. Vetted Care for Every Home.</p>
            </div>
            <nav className="flex flex-wrap justify-center gap-6">
              <Link to="/about" className="text-on-surface-variant hover:text-primary transition-colors text-sm">About Us</Link>
              <Link to="/terms" className="text-on-surface-variant hover:text-primary transition-colors text-sm">Terms of Service</Link>
              <Link to="/privacy" className="text-on-surface-variant hover:text-primary transition-colors text-sm">Privacy Policy</Link>
              <Link to="/contact" className="text-on-surface-variant hover:text-primary transition-colors text-sm">Contact</Link>
            </nav>
          </div>
        </div>
      </footer>

      {/* ===== STYLES ===== */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
}

export default LandingPage;