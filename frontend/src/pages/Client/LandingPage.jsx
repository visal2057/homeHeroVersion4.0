import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans antialiased text-slate-900 w-full overflow-x-hidden">
      {/* TopNavBar */}
      <header className="sticky top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full">
          <div className="text-2xl font-black tracking-tighter text-emerald-600">HomeHero</div>
          <nav className="hidden md:flex items-center space-x-8">
            <a className="text-emerald-600 border-b-2 border-emerald-600 pb-1 font-semibold" href="#">Services</a>
           <Link to="/about" className="text-slate-600 hover:text-emerald-600 transition-colors">About us</Link>
<Link to="/careers" className="text-slate-600 hover:text-emerald-600 transition-colors">Careers</Link>
<Link to="/contact" className="text-slate-600 hover:text-emerald-600 transition-colors">Contact us</Link>
          </nav>
          <div className="flex items-center gap-4">
            {/* Sign Up Button - Navigate to SignUpAs page */}
            <button 
              onClick={() => navigate('/auth/signup-as')}
              className="px-4 py-2 font-semibold text-slate-700 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
            >
              Sign Up
            </button>
            <Link to="/login" className="px-6 py-2 font-semibold text-white bg-emerald-700 rounded-full hover:bg-emerald-800 transition-colors shadow-sm text-center">
              Log In
            </Link>
          </div>
        </div>
      </header>

      <main className="w-full">
        {/* Hero Section */}
        <section className="relative h-[640px] w-full flex items-center justify-center overflow-hidden">
          <img 
            alt="Professional Gardener at work" 
            className="absolute inset-0 w-full h-full object-cover object-center" 
            src="https://images.unsplash.com/photo-1608109704808-62aadbc33a7d?&o=100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10"></div>
          <div className="relative z-10 w-full max-w-4xl px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-md">Expert Care for Your Home</h1>
            <p className="max-w-2xl mx-auto text-white text-lg md:text-xl leading-relaxed drop-shadow-sm mb-6">
              HomeHero connects homeowners with a network of trusted and verified professionals for all your household needs.
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <span className="text-white/90 text-sm bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">Trusted by 50k+ Homes</span>
              <span className="text-white/90 text-sm bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">4.9/5 Service Rating</span>
            </div>
          </div>
        </section>

        {/* Service Grid */}
        <section className="py-16 max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold text-emerald-700 mb-2">Our Services</h2>
              <p className="text-slate-500">Professional assistance for every corner of your house.</p>
            </div>
            <button className="text-emerald-600 font-semibold flex items-center gap-2 hover:underline">
              View All Services <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              { icon: "potted_plant", name: "Gardening", desc: "Pruning, planting, and lawn maintenance." },
              { icon: "build", name: "Handiwork", desc: "Mounting, fixing, and light assemblies." },
              { icon: "ac_unit", name: "AC Repair", desc: "Cooling maintenance and expert repairs." },
              { icon: "cleaning_services", name: "Cleaning", desc: "Deep cleans and recurring home care." },
              { icon: "pets", name: "Petcare", desc: "Professional walking and home sitting." }
            ].map((service, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center text-center group hover:shadow-md transition-all">
                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-emerald-600 text-3xl">{service.icon}</span>
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">{service.name}</h3>
                <p className="text-sm text-slate-500">{service.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How it Works */}
        <section className="bg-slate-100 py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-emerald-700">Simple steps to a better home</h2>
              <p className="text-slate-500 mt-2">Managing your property shouldn't be a full-time job.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { num: "01", title: "Choose Service", desc: "Select from our wide range of professional household services." },
                { num: "02", title: "Pick a Time", desc: "Schedule a visit that fits perfectly into your busy calendar." },
                { num: "03", title: "Relaxed Results", desc: "Sit back while our vetted pros handle everything with care." }
              ].map((step, idx) => (
                <div key={idx} className="flex flex-col items-center text-center px-4">
                  <div className="text-6xl font-black text-emerald-200 mb-4">{step.num}</div>
                  <h3 className="text-2xl font-semibold text-slate-800 mb-2">{step.title}</h3>
                  <p className="text-slate-600 text-sm max-w-[280px]">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="max-w-7xl mx-auto px-6 pb-16">
          <div className="bg-[#006948] rounded-3xl p-12 text-center relative overflow-hidden">
            <h2 className="text-4xl font-bold text-white mb-4">Ready to start?</h2>
            <p className="text-emerald-100 mb-8 max-w-2xl mx-auto">Join thousands of homeowners who trust HomeHero for their daily maintenance and specialized care.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigate('/auth/signup-as')}
                className="bg-white text-[#006948] px-10 py-3.5 rounded-full font-semibold hover:bg-slate-50 transition-all shadow-md"
              >
                Get Started
              </button>
              <button className="border border-white/40 text-white px-10 py-3.5 rounded-full font-semibold hover:bg-white/10 transition-all">
                Talk to an Expert
              </button>
            </div>
          </div>
        </section>
      </main>

     <footer className="w-full border-t bg-slate-50 border-t-slate-200 text-sm text-slate-500">
  <div className="flex flex-col md:flex-row justify-between items-center py-12 px-6 max-w-7xl mx-auto gap-6 w-full">
    <div className="flex flex-col gap-2">
      <div className="text-xl font-bold text-emerald-700">HomeHero</div>
      <p className="block w-full">© 2026 HomeHero. Vetted Care for Every Home.</p>
    </div>
    <div className="flex flex-wrap justify-center gap-8">
      <Link to="/about" className="hover:text-emerald-600 hover:underline transition-all">About Us</Link>
      <Link to="/terms" className="hover:text-emerald-600 hover:underline transition-all">Terms of Service</Link>
      <Link to="/privacy" className="hover:text-emerald-600 hover:underline transition-all">Privacy Policy</Link>
    </div>
  </div>
</footer>
    </div>
  );
}

export default LandingPage;