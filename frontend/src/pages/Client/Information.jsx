import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Information = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('about');
  const [isScrolled, setIsScrolled] = useState(false);
  
  const aboutRef = useRef(null);
  const careersRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = [
        { id: 'about', ref: aboutRef },
        { id: 'careers', ref: careersRef },
        { id: 'contact', ref: contactRef }
      ];

      for (const section of sections) {
        if (section.ref.current) {
          const rect = section.ref.current.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const refs = {
      about: aboutRef,
      careers: careersRef,
      contact: contactRef
    };
    
    const targetRef = refs[sectionId];
    if (targetRef && targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
    }
  };

  const benefits = [
    { icon: "verified", title: "Trust & Transparency", description: "We believe in building trust through honest communication and transparent processes." },
    { icon: "handshake", title: "Supportive Environment", description: "Great work happens when talented people are given the trust, tools, and freedom to excel." },
    { icon: "trending_up", title: "Growth Opportunities", description: "Continuous learning and career development opportunities for all team members." },
    { icon: "diversity_3", title: "Inclusive Culture", description: "We celebrate diversity and create an environment where everyone belongs and contributes." },
    { icon: "verified", title: "Professional Development", description: "Access to training, workshops, and resources to enhance your skills." },
    { icon: "group", title: "Community Impact", description: "Be part of a mission that's making a real difference in people's lives." }
  ];

  const values = [
    { icon: "rocket_launch", title: "Innovation First", description: "We embrace new ideas and technologies to better serve our customers." },
    { icon: "security", title: "Safety Always", description: "We prioritize safety for our team members and customers above everything else." },
    { icon: "favorite", title: "Customer Obsessed", description: "We put our customers at the heart of everything we do." },
    { icon: "emoji_events", title: "Excellence Driven", description: "We strive for excellence in every service we provide." }
  ];

  const team = [
    { name: "Sarah Chen", role: "CEO & Founder", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD63ftGgptVu0cIi-9WpV78W0AygwMSa-Y3hFFrYzUKwc_Y6pB9dHphopjEWl5U0yzvHLSca7d1DVBwGt0bo9SpzMgJbSz1qHCNviO1z8xihV1Nu16NVLH0mGI-tJE0XXS2E15Uuv4mSGwko_e8ynMZBk1zuDEKbe3Jqkw7iCMek0e0FKS-Ca57XyG83-Ytbq2kMFfcTmTgKxrfvicM5Ii_-RJJdx96IvXXh--kZi7L007N_OLjylYkaGM0qH0zNb7TCWpIJxGY6KI" },
    { name: "Marcus Thorne", role: "Head of Operations", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCMz_BIPjH3SZsk4AV_2xEKF4iH3pp82Z3nXYfGabxzsx6FmSTRAgOZstIRJTMwPAqpPXw5QRreeaPhPN1tz40k9u4mshPrYrZFYCF8YFJGUgfgJ4xN1_j7YOaTn7-Q-BPt35_aI5Rm6xFeEIUDF5V_uBmX_pGwGJtmGl5S9uJnmrpqekZ0BLW5-q3p7XjyRIJL73G-d6mG6m-sC210YqdPh2jOjtDJLZcQuakrOZQ5IyplUZbCy63-INjKGmf-RpsoV9yXLNtdBWA" },
    { name: "Elena Rodriguez", role: "Chief Quality Officer", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC6MYM0jyURuM8cnpfbp3oOPlzSy9I5FnK9RAD7omHXsRSBFPLl1Nl4oVa-KYVuWut9LpZ4SrffVqsVtG8UEWZO6KSNplz4EjL_9OpO3h6hgJjhci9JtheOoRRp5zJn0I0CGSsP5hQMYKI4oIKmEoflZ9O0qiHrrKb_8prm01rX69-yIubswd6IHM6ykRHPk2T2hxp4PhZgFnFWMMfpUff81X0S8XPa6-ACyGROlD7PcyFD8Pgc0xvQtA2YehKKS96MNTPaahLbxtU" },
    { name: "David Kim", role: "VP of Engineering", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDG_G5df6tkoj2qXjE9evwF4buroRLeQ1Y2ZcG3dFVlDV4SS6rIntc-PVq3s1KFss7ML6Qx0fGfdLqKiQsgMCDTfBWdMIGbdQ3mEOYPMzpexscdvQ-09UYlRmzEr5Cw1-e1x23dM6fS0jWmkjpQM1MOtSjdUlpNJNRVtohFtZM9G7ETyMUVvPGe3Tg1WusMR0NFewdmlQZksVc9JSN9xDRywbgn-Pic6b7tPwExqWaDAwi-V7K2pXXkZi-DnpClm9VgDDUMHsFdloY" }
  ];

  return (
    <div className="min-h-screen bg-background text-on-background font-['Inter'] antialiased w-full overflow-x-hidden">
      
      {/* ===== HEADER ===== */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md border-b border-outline-variant shadow-lg' 
          : 'bg-white/80 backdrop-blur-md border-b border-outline-variant/30 shadow-sm'
      } h-16`}>
        <div className="flex justify-between items-center px-4 md:px-8 h-full max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <Link to="/dashboard" className="text-xl font-black tracking-tighter text-primary hover:opacity-80 transition-opacity">
              HomeHero
            </Link>
            <div className="h-6 w-px bg-outline-variant mx-2 hidden sm:block"></div>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('about')}
              className={`text-sm font-medium transition-colors relative group ${
                activeSection === 'about' 
                  ? 'text-primary' 
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              About us
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                activeSection === 'about' ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </button>
            <button
              onClick={() => scrollToSection('careers')}
              className={`text-sm font-medium transition-colors relative group ${
                activeSection === 'careers' 
                  ? 'text-primary' 
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              Careers
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                activeSection === 'careers' ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className={`text-sm font-medium transition-colors relative group ${
                activeSection === 'contact' 
                  ? 'text-primary' 
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              Contact us
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                activeSection === 'contact' ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </button>
          </nav>

         
        </div>
      </header>

      {/* ===== MAIN CONTENT ===== */}
      <main className="w-full pt-16">
        
        {/* ============================================================
            1. ABOUT US SECTION
            ============================================================ */}
        <section ref={aboutRef} className="scroll-mt-16">
          {/* Hero - Improved */}
          <div className="relative min-h-[500px] md:min-h-[650px] w-full flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 w-full h-full">
              <img 
                alt="About HomeHero" 
                className="w-full h-full object-cover object-center scale-105 hover:scale-100 transition-transform duration-1000" 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/20"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            </div>
            
            <div className="relative z-10 w-full max-w-5xl px-6 text-center">
              {/* Animated Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-5 py-2 rounded-full border border-white/20 mb-6 animate-fade-in">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-white/90">About Us</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-6 drop-shadow-2xl leading-tight">
                Empowering Homes, <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-emerald-300 to-emerald-400 bg-clip-text text-transparent">
                  One Service at a Time
                </span>
              </h1>
              <p className="max-w-2xl mx-auto text-white/90 text-base md:text-lg leading-relaxed drop-shadow-lg mb-8">
                We believe that every home deserves professional care. From gardens to gutters, we bridge the gap between quality craftsmanship and your doorstep.
              </p>
              
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                <span className="text-white/90 text-xs bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 hover:bg-white/20 transition-all">
                  ⭐ 4.9/5 Service Rating
                </span>
                <span className="text-white/90 text-xs bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 hover:bg-white/20 transition-all">
                  ✅ Verified Professionals
                </span>
                <span className="text-white/90 text-xs bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 hover:bg-white/20 transition-all">
                  🔒 Secure Payments
                </span>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="group inline-flex items-center justify-center gap-2 bg-primary text-on-primary px-10 py-4 rounded-full font-semibold text-lg hover:bg-primary-container hover:text-on-primary-container transition-all shadow-2xl shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-1"
                >
                  <span>Get in Touch</span>
                  <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </button>
                <button 
                  onClick={() => scrollToSection('careers')}
                  className="group inline-flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-white/30 transition-all border border-white/30 hover:-translate-y-1"
                >
                  <span className="material-symbols-outlined text-xl">work</span>
                  Join Our Team
                </button>
              </div>
            </div>
          </div>

          {/* Our Story - Improved */}
          <div className="py-20 max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <div className="inline-block bg-primary-fixed px-4 py-2 rounded-full">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">Our Journey</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-on-surface leading-tight">
                  Providing Reliability to <br className="hidden sm:inline" />
                  <span className="text-primary">Every Doorstep</span>
                </h2>
                <p className="text-on-surface-variant leading-relaxed">
                  HomeHero began with a simple observation: finding reliable, high-quality home service professionals was unnecessarily difficult. We saw homeowners struggling with inconsistent quality and pros struggling to find stable work.
                </p>
                <p className="text-on-surface-variant leading-relaxed">
                  Founded in 2018, our mission was to build an ecosystem of <span className="font-semibold text-primary">"Trusted Care."</span> We vet every professional, standardize pricing, and guarantee satisfaction.
                </p>
                <div className="flex gap-8 pt-4">
                  <div>
                    <div className="text-3xl font-black text-primary">50k+</div>
                    <div className="text-xs text-on-surface-variant font-medium">Homes Served</div>
                  </div>
                  <div className="w-px bg-outline-variant"></div>
                  <div>
                    <div className="text-3xl font-black text-primary">10k+</div>
                    <div className="text-xs text-on-surface-variant font-medium">Verified Pros</div>
                  </div>
                  <div className="w-px bg-outline-variant"></div>
                  <div>
                    <div className="text-3xl font-black text-primary">4.9/5</div>
                    <div className="text-xs text-on-surface-variant font-medium">Average Rating</div>
                  </div>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-emerald-400/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative aspect-square bg-primary-fixed rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    src="https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=800&q=80" 
                    alt="Our Story"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Values - Improved */}
          <div className="bg-gradient-to-b from-surface-container to-background py-20">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16">
                <div className="inline-block bg-primary-fixed px-4 py-2 rounded-full mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">Our Values</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-4">Built on <span className="text-primary">Shared Values</span></h2>
                <p className="text-on-surface-variant max-w-2xl mx-auto">
                  Our commitment to excellence is guided by principles that put the homeowner and the professional first.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { icon: "verified_user", title: "Trust", desc: "Every pro on our platform undergoes a rigorous background check and skills assessment.", color: "from-emerald-500/20" },
                  { icon: "workspace_premium", title: "Quality", desc: "We don't just fix things; we master them. Expert craftsmanship defines every HomeHero service.", color: "from-blue-500/20" },
                  { icon: "diversity_3", title: "Community", desc: "We are local at heart. Supporting neighborhood economies by connecting local talent.", color: "from-purple-500/20" }
                ].map((value, idx) => (
                  <div 
                    key={idx} 
                    className="group bg-white p-8 rounded-2xl shadow-sm border border-surface-container hover:border-primary/40 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 text-center"
                  >
                    <div className={`w-20 h-20 bg-gradient-to-br ${value.color} to-transparent rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-500`}>
                      <span className="material-symbols-outlined text-4xl text-primary">{value.icon}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-on-surface mb-3">{value.title}</h3>
                    <p className="text-on-surface-variant text-sm leading-relaxed">{value.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            2. CAREERS SECTION
            ============================================================ */}
        <section ref={careersRef} className="scroll-mt-16 py-20">
          <div className="max-w-7xl mx-auto px-6 w-full">
            
            {/* Careers Hero - Improved */}
            <div className="relative bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-3xl p-12 md:p-16 mb-16 text-center overflow-hidden">
              <div className="absolute top-0 right-0 opacity-5">
                <span className="material-symbols-outlined text-9xl text-primary">rocket_launch</span>
              </div>
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-emerald-400/5 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <div className="inline-block bg-primary-fixed px-4 py-2 rounded-full mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">Join Our Mission</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-on-surface mb-4">
                  Building the Future of <br className="hidden sm:inline" />
                  <span className="text-primary">Home Services</span>
                </h2>
                <p className="text-on-surface-variant max-w-2xl mx-auto mb-8 text-lg">
                  We're on a journey to redefine how the world takes care of their homes. Join our team of passionate service providers.
                </p>
                <Link 
                  to="/auth/worker-register"
                  className="group inline-flex items-center gap-2 bg-primary text-on-primary px-10 py-4 rounded-full font-semibold text-lg hover:bg-primary-container hover:text-on-primary-container transition-all shadow-2xl shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-1"
                >
                  <span>Join as a Service Provider</span>
                  <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </Link>
              </div>
            </div>

            {/* Why Join Us - Improved */}
            <div className="text-center mb-16">
              <div className="inline-block bg-primary-fixed px-4 py-2 rounded-full mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">Why Join Us</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-4">
                Why join <span className="text-primary">HomeHero</span>?
              </h2>
              <p className="text-on-surface-variant max-w-2xl mx-auto">
                We believe that great work happens when talented people are given the trust, tools, and freedom to excel.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="group bg-white rounded-2xl p-6 shadow-sm border border-surface-container hover:border-primary/40 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                    <span className="material-symbols-outlined text-primary text-3xl">{benefit.icon}</span>
                  </div>
                  <h3 className="text-lg font-bold text-on-surface mb-2 group-hover:text-primary transition-colors">{benefit.title}</h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>

            {/* Values - Improved */}
            <div className="py-16 border-t border-outline-variant mt-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-4">Our <span className="text-primary">Core Values</span></h2>
                <p className="text-on-surface-variant max-w-2xl mx-auto">
                  The principles that guide everything we do at HomeHero
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {values.map((value, index) => (
                  <div 
                    key={index}
                    className="group bg-white rounded-2xl p-6 shadow-sm border border-surface-container text-center hover:border-primary/40 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                  >
                    <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-500">
                      <span className="material-symbols-outlined text-primary text-3xl">{value.icon}</span>
                    </div>
                    <h3 className="text-lg font-bold text-on-surface mb-2 group-hover:text-primary transition-colors">{value.title}</h3>
                    <p className="text-sm text-on-surface-variant leading-relaxed">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Team - Improved */}
            <div className="pt-12">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
                <div>
                  <div className="inline-block bg-primary-fixed px-4 py-2 rounded-full mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">Our Team</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-2">Meet the <span className="text-primary">Visionaries</span></h2>
                  <p className="text-on-surface-variant">The passionate team behind the platform.</p>
                </div>
                <Link to="/auth/signup-as" className="text-primary font-semibold flex items-center gap-1 hover:underline mt-4 sm:mt-0">
                  Join Our Team <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {team.map((member, idx) => (
                  <div key={idx} className="group bg-white rounded-2xl p-4 shadow-sm border border-surface-container hover:border-primary/40 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                    <div className="aspect-[4/5] bg-gradient-to-br from-surface-container to-primary/5 rounded-xl mb-4 overflow-hidden">
                      <img 
                        alt={member.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                        src={member.img}
                        onError={(e) => {
                          e.target.src = `https://ui-avatars.com/api/?name=${member.name.replace(' ', '+')}&background=006948&color=fff&size=200`;
                        }}
                      />
                    </div>
                    <h4 className="text-lg font-bold text-on-surface mb-0.5 group-hover:text-primary transition-colors">{member.name}</h4>
                    <p className="text-sm font-semibold text-primary">{member.role}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            3. CONTACT US SECTION
            ============================================================ */}
        <section ref={contactRef} className="scroll-mt-16 py-20 bg-gradient-to-b from-surface-container/50 to-background">
          <div className="max-w-7xl mx-auto px-6">
            
            {/* Contact Header - Improved */}
            <div className="text-center mb-16">
              <div className="inline-block bg-primary-fixed px-4 py-2 rounded-full mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">Get in Touch</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-on-surface mb-4">
                We're here to <span className="text-primary">help</span>
              </h2>
              <p className="text-on-surface-variant max-w-2xl mx-auto text-lg">
                Whether you have a question about our services, need technical support, or just want to share some feedback, our team is ready to assist you.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Form - Improved */}
              <div className="lg:col-span-7 bg-white p-8 md:p-10 rounded-3xl border border-surface-container shadow-sm hover:shadow-xl transition-all duration-500">
                <h3 className="text-2xl font-bold text-on-surface mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">mail</span>
                  Send us a message
                </h3>
                <form className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-sm text-on-surface-variant mb-1.5">Full Name *</label>
                      <input 
                        className="w-full p-3.5 border border-outline-variant rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none bg-surface-container-low transition-all" 
                        placeholder=" " 
                        type="text" 
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-sm text-on-surface-variant mb-1.5">Email Address *</label>
                      <input 
                        className="w-full p-3.5 border border-outline-variant rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none bg-surface-container-low transition-all" 
                        placeholder="" 
                        type="email" 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-semibold text-sm text-on-surface-variant mb-1.5">Subject</label>
                    <input 
                      className="w-full p-3.5 border border-outline-variant rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none bg-surface-container-low transition-all" 
                      placeholder="How can we help?" 
                      type="text" 
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-sm text-on-surface-variant mb-1.5">Message *</label>
                    <textarea 
                      className="w-full p-3.5 border border-outline-variant rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none bg-surface-container-low transition-all" 
                      placeholder="Tell us more about your inquiry..." 
                      rows="6"
                    ></textarea>
                  </div>
                  <button className="group w-full md:w-auto bg-primary text-on-primary font-semibold px-10 py-3.5 rounded-xl hover:bg-primary-container hover:text-on-primary-container transition-all shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 flex items-center justify-center gap-2">
                    Send Message <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">send</span>
                  </button>
                </form>
              </div>

              {/* Info Cards - Improved */}
              <div className="lg:col-span-5 space-y-5">
                <div className="group p-6 bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl flex items-start gap-4 border border-primary/20 hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                  <div className="bg-white p-3.5 rounded-xl shadow-sm group-hover:shadow-md transition-all">
                    <span className="material-symbols-outlined text-primary text-3xl">support_agent</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-on-surface">Support Email</h3>
                    <p className="font-semibold text-primary">support@homehero.com</p>
                    <p className="text-xs text-on-surface-variant mt-1">Response within 24 hours</p>
                  </div>
                </div>

                <div className="group p-6 bg-white rounded-2xl border border-surface-container flex items-start gap-4 hover:border-primary/40 hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                  <div className="bg-surface-container-low p-3.5 rounded-xl group-hover:bg-primary/5 transition-all">
                    <span className="material-symbols-outlined text-primary text-3xl">call</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-on-surface">Phone Number</h3>
                    <p className="font-semibold text-primary">+94 777 000-1111</p>
                    <p className="text-xs text-on-surface-variant mt-1">Mon-Fri, 9am - 6pm</p>
                  </div>
                </div>

                <div className="group p-6 bg-white rounded-2xl border border-surface-container flex items-start gap-4 hover:border-primary/40 hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                  <div className="bg-surface-container-low p-3.5 rounded-xl group-hover:bg-primary/5 transition-all">
                    <span className="material-symbols-outlined text-primary text-3xl">location_on</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-on-surface">Office Address</h3>
                    <p className="text-on-surface-variant">278, High Level Road, Maharagama, Sri Lanka</p>
                  </div>
                </div>

                <div className="group p-6 bg-white rounded-2xl border border-surface-container flex items-start gap-4 hover:border-primary/40 hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                  <div className="bg-surface-container-low p-3.5 rounded-xl group-hover:bg-primary/5 transition-all">
                    <span className="material-symbols-outlined text-primary text-3xl">schedule</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-on-surface">Working Hours</h3>
                    <p className="text-on-surface-variant">Mon - Fri: 9:00 AM - 6:00 PM</p>
                    <p className="text-on-surface-variant">Sat: 10:00 AM - 2:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== FINAL CTA - Improved ===== */}
        <section className="py-20 max-w-7xl mx-auto px-6">
          <div className="relative bg-gradient-to-r from-primary to-primary/90 rounded-3xl p-12 md:p-16 text-center overflow-hidden">
            <div className="absolute top-0 right-0 opacity-5">
              <span className="material-symbols-outlined text-9xl text-white">handshake</span>
            </div>
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <div className="inline-block bg-white/10 backdrop-blur-sm px-5 py-2 rounded-full border border-white/20 mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-100">Get Started Today</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-4 drop-shadow-lg">
                Ready to <span className="text-emerald-200">Transform</span> Your Home?
              </h2>
              <p className="text-emerald-100 text-base md:text-lg mb-10 max-w-2xl mx-auto opacity-90">
                Join thousands of homeowners who trust HomeHero for their daily maintenance and specialized care.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link 
                  to="/auth/signup-as"
                  className="group inline-flex items-center justify-center gap-2 bg-white text-primary px-12 py-4 rounded-full font-semibold text-lg hover:bg-gray-50 transition-all shadow-2xl hover:shadow-white/20 hover:-translate-y-1"
                >
                  <span className="material-symbols-outlined text-xl">rocket_launch</span>
                  Get Started
                </Link>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="group inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white px-12 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all hover:-translate-y-1"
                >
                  <span className="material-symbols-outlined text-xl">chat</span>
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ===== FOOTER - Improved ===== */}
      <footer className="bg-white border-t border-outline-variant">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <Link to="/" className="text-lg font-black text-primary">HomeHero</Link>
              <p className="text-on-surface-variant text-sm mt-1">© 2024 HomeHero. All rights reserved.</p>
            </div>
            
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Information;