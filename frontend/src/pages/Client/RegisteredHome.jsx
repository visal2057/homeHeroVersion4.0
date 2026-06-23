import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ClientHeader from '../../components/ClientHeader';

const RegisteredHome = () => {
  const [hoveredService, setHoveredService] = useState(null);

  const services = [
    { icon: 'potted_plant', name: 'Gardening', desc: 'Pruning, planting, and lawn maintenance.', path: '/explore/gardening', color: 'from-emerald-500 to-emerald-700' },
    { icon: 'build', name: 'Handiwork', desc: 'Mounting, fixing, and light assemblies.', path: '/explore/handiwork', color: 'from-blue-500 to-blue-700' },
    { icon: 'ac_unit', name: 'AC Repair', desc: 'Cooling maintenance and expert repairs.', path: '/explore/ac-repair', color: 'from-cyan-500 to-cyan-700' },
    { icon: 'cleaning_services', name: 'Cleaning', desc: 'Deep cleans and recurring home care.', path: '/explore/cleaning', color: 'from-purple-500 to-purple-700' },
    { icon: 'pets', name: 'Petcare', desc: 'Professional walking and home sitting.', path: '/explore/petcare', color: 'from-amber-500 to-amber-700' },
  ];

  const stats = [
    { value: '50k+', label: 'Homes Served', icon: 'home' },
    { value: '10k+', label: 'Verified Pros', icon: 'verified' },
    { value: '4.9/5', label: 'Average Rating', icon: 'star' },
    { value: '98%', label: 'Satisfaction Rate', icon: 'sentiment_satisfied' },
  ];

  return (
    <div className="bg-background text-on-background font-['Inter'] antialiased relative min-h-screen">
      <ClientHeader pageTitle="Dashboard" />
      
      <main className="pt-16">
        
        {/* ===== HERO SECTION - IMPROVED ===== */}
        <section className="relative min-h-[500px] md:min-h-[600px] w-full flex items-center justify-center overflow-hidden">
          <img 
            alt="Professional Gardener at work" 
            className="absolute inset-0 w-full h-full object-cover object-center scale-105" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvUan3L5hh0oj9qtXcKAVjxAk5tzND6kP45QZsEKsxx2CgMflMWtsu3ZbodO3l9ow6QWHFZili1U2fJKc3_SzPkr3EutgT3GXUiJ4jb8VTFTXq9M29dzMNuFCChKI7OFsawCeJ_GrcaS_n3sIufjS85rfkngY1F1l8Zztok8y2bhBlhmtXA2QEttJ4DXj-4IO0ofO-chyyo8lVxavk1bXknEx4ETdSr2kIqQqF-GZj_-5pkSqoL3RQ0x8H5RZ1-Hf2X7fAnpUeDRU"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 via-transparent to-transparent"></div>
          
          <div className="relative z-10 w-full max-w-5xl px-6 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-white/90">Welcome to HomeHero</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 drop-shadow-lg leading-tight">
              Expert Care for <br className="hidden sm:inline" />
              <span className="text-emerald-300">Your Home</span>
            </h1>
            
            <p className="max-w-2xl mx-auto text-white/90 text-base md:text-lg leading-relaxed drop-shadow-md">
              HomeHero connects homeowners with a network of trusted and verified professionals for all your household needs.
            </p>
            
            {/* Stats */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:bg-white/20 transition-all">
                  <div className="text-2xl md:text-3xl font-black text-white">{stat.value}</div>
                  <div className="text-xs text-white/70 mt-0.5 flex items-center justify-center gap-1">
                    <span className="material-symbols-outlined text-sm">{stat.icon}</span>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
            
            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                to="/contact" 
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-700 text-white px-8 py-3.5 rounded-full font-semibold hover:from-emerald-600 hover:to-emerald-800 transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5"
              >
                <span className="material-symbols-outlined text-xl">headset_mic</span>
               Talk to an Expert
              </Link>
             
            </div>
          </div>
        </section>

        {/* ===== SERVICES SECTION - IMPROVED ===== */}
        <section className="py-20 max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-2xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-emerald-600 text-2xl">grid_view</span>
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Our Services</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-on-surface">What We Offer</h2>
              <p className="text-on-surface-variant mt-2">Professional assistance for every corner of your house.</p>
            </div>
           
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {services.map((service, idx) => (
              <Link
                key={idx}
                to={service.path}
                onMouseEnter={() => setHoveredService(idx)}
                onMouseLeave={() => setHoveredService(null)}
                className={`group relative bg-white rounded-2xl p-8 shadow-sm border-2 transition-all duration-500 overflow-hidden ${
                  hoveredService === idx 
                    ? 'border-emerald-400 shadow-xl -translate-y-2' 
                    : 'border-transparent hover:border-emerald-200 hover:shadow-lg hover:-translate-y-1'
                }`}
              >
                {/* Animated Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                {/* Icon with Pulse Animation */}
                <div className="relative">
                  <div className={`w-20 h-20 bg-emerald-50 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 ${
                    hoveredService === idx ? 'bg-emerald-100' : ''
                  }`}>
                    <span className={`material-symbols-outlined text-4xl ${
                      hoveredService === idx ? 'text-emerald-600' : 'text-emerald-500'
                    } transition-colors duration-300`}>
                      {service.icon}
                    </span>
                  </div>
                  {hoveredService === idx && (
                    <div className="absolute -top-1 -right-1 animate-bounce">
                      <span className="material-symbols-outlined text-emerald-500 text-xl">arrow_forward</span>
                    </div>
                  )}
                </div>
                
                <h3 className="text-lg font-bold text-on-surface mb-2 group-hover:text-emerald-700 transition-colors">
                  {service.name}
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">{service.desc}</p>
                
                {/* Learn More Link */}
                <div className="mt-4 flex items-center gap-1 text-emerald-600 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Learn More
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ===== FEATURES SECTION - NEW ===== */}
        <section className="py-20 bg-surface-container">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 bg-emerald-100 px-4 py-2 rounded-full mb-4">
                <span className="material-symbols-outlined text-emerald-600 text-sm">stars</span>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Why HomeHero</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-on-surface">Built for Your Peace of Mind</h2>
              <p className="text-on-surface-variant mt-2 max-w-2xl mx-auto">We make home maintenance simple, reliable, and stress-free.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-surface-container hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-5">
                  <span className="material-symbols-outlined text-3xl text-emerald-600">verified</span>
                </div>
                <h3 className="text-xl font-bold text-on-surface mb-2">Verified Professionals</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Every pro on our platform undergoes a rigorous background check and skills assessment.
                </p>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-surface-container hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-5">
                  <span className="material-symbols-outlined text-3xl text-emerald-600">security</span>
                </div>
                <h3 className="text-xl font-bold text-on-surface mb-2">Secure Payments</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Safe and secure payment processing with full transaction protection.
                </p>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-surface-container hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-5">
                  <span className="material-symbols-outlined text-3xl text-emerald-600">support_agent</span>
                </div>
                <h3 className="text-xl font-bold text-on-surface mb-2">24/7 Support</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Round-the-clock customer support to help you with any questions or concerns.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== CTA BANNER - IMPROVED ===== */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="bg-gradient-to-r from-emerald-700 to-emerald-600 rounded-3xl p-12 text-center relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 opacity-10">
              <span className="material-symbols-outlined text-9xl text-white">handshake</span>
            </div>
            <div className="absolute bottom-0 left-0 opacity-5">
              <span className="material-symbols-outlined text-8xl text-white">home</span>
            </div>
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-6">
                <span className="material-symbols-outlined text-emerald-200 text-sm">celebration</span>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-100">Get Started Today</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                Ready to Transform Your Home?
              </h2>
              <p className="text-emerald-100 text-base md:text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of homeowners who trust HomeHero for their daily maintenance and specialized care.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/explore" 
                  className="inline-flex items-center justify-center gap-2 bg-white text-emerald-700 px-10 py-4 rounded-full font-semibold text-lg hover:bg-slate-50 transition-all duration-300 shadow-xl hover:-translate-y-0.5"
                >
                  <span className="material-symbols-outlined text-xl">rocket_launch</span>
                  Get Started
                </Link>
                <Link 
                  to="/contact" 
                  className="inline-flex items-center justify-center gap-2 border border-white/30 text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <span className="material-symbols-outlined text-xl">chat</span>
                  Talk to an Expert
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ===== FOOTER - IMPROVED ===== */}
      <footer className="w-full border-t border-outline-variant bg-white text-sm text-on-surface-variant">
        <div className="flex flex-col md:flex-row justify-between items-center py-12 px-6 max-w-7xl mx-auto gap-6">
          <div className="flex flex-col gap-2 text-center md:text-left">
            <div className="text-xl font-black text-emerald-700">HomeHero</div>
            <p className="text-on-surface-variant">© 2026 HomeHero. Trusted Care for Every Home.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <Link to="/about" className="hover:text-emerald-600 hover:underline transition-all">About Us</Link>
            <Link to="/terms" className="hover:text-emerald-600 hover:underline transition-all">Terms of Service</Link>
            <Link to="/privacy" className="hover:text-emerald-600 hover:underline transition-all">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-emerald-600 hover:underline transition-all">Help Center</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RegisteredHome;