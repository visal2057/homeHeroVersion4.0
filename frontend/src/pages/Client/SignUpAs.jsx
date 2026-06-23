import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const SignUpAs = () => {
  const navigate = useNavigate();

  const handleCustomerClick = () => {
    navigate('/auth/register');
  };

  const handleProviderClick = () => {
    navigate('/auth/worker-register');
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 font-sans relative overflow-x-hidden">
      
      {/* ===== HEADER ===== */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-outline-variant shadow-sm h-16">
        <div className="flex justify-between items-center px-4 md:px-8 h-full max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <Link to="/" className="text-xl font-black tracking-tighter text-primary">HomeHero</Link>
            <div className="h-6 w-px bg-outline-variant mx-2 hidden sm:block"></div>
            <span className="text-sm font-medium text-on-surface-variant hidden sm:block">Sign up as</span>
          </div>
          
       
        </div>
      </header>

      {/* ===== MAIN CONTENT ===== */}
      <main className="flex-grow pt-20 pb-12 px-4 md:px-6 flex items-center justify-center">
        <div className="w-full max-w-6xl mx-auto">
          
          {/* ===== HEADER ===== */}
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-primary-fixed px-4 py-2 rounded-full mb-4">
              <span className="material-symbols-outlined text-primary text-sm">person_add</span>
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Join HomeHero</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-on-surface mb-4">
              Sign up as?
            </h1>
            <p className="text-base md:text-lg text-on-surface-variant max-w-2xl mx-auto">
              Choose who you want to be at HomeHero and start your journey today.
            </p>
          </div>

          {/* ===== CARDS ===== */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
            
            {/* ===== CUSTOMER CARD ===== */}
            <div 
              onClick={handleCustomerClick} 
              className="group cursor-pointer bg-white rounded-3xl border border-surface-container overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-primary/40"
            >
              <div className="aspect-[4/5] relative overflow-hidden bg-gradient-to-br from-primary-fixed/30 to-slate-50">
                <img 
                  alt="Customer profile" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80"
                />
                {/* Gradient Overlay - Using primary color */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Floating Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                  <span className="text-xs font-bold text-primary">⭐ 4.9/5</span>
                </div>

                {/* Icon Overlay */}
                <div className="absolute bottom-6 left-6 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                  <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="material-symbols-outlined text-primary text-3xl">home</span>
                  </div>
                  <span className="text-white font-semibold text-sm drop-shadow-lg">Find Professionals</span>
                </div>

                {/* Corner Accent */}
                <div className="absolute top-0 left-0 w-20 h-20 bg-primary/10 rounded-br-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              
              <div className="p-8 text-center bg-white">
                <div className="w-16 h-16 bg-primary-fixed rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 group-hover:bg-primary group-hover:text-on-primary">
                  <span className="material-symbols-outlined text-primary text-3xl group-hover:text-on-primary transition-colors duration-300">person</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-on-surface group-hover:text-primary transition-colors duration-300">
                  Customer
                </h2>
                <p className="text-on-surface-variant mt-3 leading-relaxed">
                  Find and book trusted professionals for your home maintenance and repair needs.
                </p>
                <div className="mt-4 flex items-center justify-center gap-2 text-primary font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>Get Started</span>
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </div>
              </div>
            </div>

            {/* ===== SERVICE PROVIDER CARD ===== */}
            <div 
              onClick={handleProviderClick} 
              className="group cursor-pointer bg-white rounded-3xl border border-surface-container overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-primary/40"
            >
              <div className="aspect-[4/5] relative overflow-hidden bg-gradient-to-br from-primary-fixed/30 to-slate-50">
                <img 
                  alt="Service Provider profile" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
                />
                {/* Gradient Overlay - Using primary color */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Floating Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                  <span className="text-xs font-bold text-primary">🚀 Grow Business</span>
                </div>

                {/* Icon Overlay */}
                <div className="absolute bottom-6 left-6 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                  <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="material-symbols-outlined text-primary text-3xl">handshake</span>
                  </div>
                  <span className="text-white font-semibold text-sm drop-shadow-lg">Connect with Clients</span>
                </div>

                {/* Corner Accent */}
                <div className="absolute top-0 left-0 w-20 h-20 bg-primary/10 rounded-br-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              
              <div className="p-8 text-center bg-white">
                <div className="w-16 h-16 bg-primary-fixed rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 group-hover:bg-primary group-hover:text-on-primary">
                  <span className="material-symbols-outlined text-primary text-3xl group-hover:text-on-primary transition-colors duration-300">work</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-on-surface group-hover:text-primary transition-colors duration-300">
                  Service Provider
                </h2>
                <p className="text-on-surface-variant mt-3 leading-relaxed">
                  Connect with local homeowners looking for your expertise and grow your business.
                </p>
                <div className="mt-4 flex items-center justify-center gap-2 text-primary font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>Get Started</span>
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </div>
              </div>
            </div>
          </div>

          {/* ===== SUPPORT SECTION ===== */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 bg-surface-container-low px-6 py-3 rounded-full border border-outline-variant">
              <span className="material-symbols-outlined text-on-surface-variant text-xl">help_outline</span>
              <p className="text-sm text-on-surface-variant">
                Already have an account? 
                <Link to="/login" className="text-primary font-bold hover:underline ml-1 hover:text-primary/80 transition-colors">
                  Log in here
                </Link>
              </p>
            </div>
            
            <div className="mt-6">
              <Link to="/" className="inline-flex items-center gap-2 text-on-surface-variant font-medium hover:text-primary transition-colors group">
                <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">arrow_back</span>
                Back to Home
              </Link>
            </div>
          </div>

          {/* ===== TRUST BADGES ===== */}
          <div className="mt-16 flex flex-wrap justify-center gap-8">
            <div className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-primary">verified</span>
              <span className="text-sm font-medium">50k+ Homes Served</span>
            </div>
            <div className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-primary">star</span>
              <span className="text-sm font-medium">4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-primary">security</span>
              <span className="text-sm font-medium">Secure Payments</span>
            </div>
            <div className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-primary">support_agent</span>
              <span className="text-sm font-medium">24/7 Support</span>
            </div>
          </div>
        </div>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="bg-white border-t border-outline-variant">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <Link to="/" className="text-lg font-bold text-primary">HomeHero</Link>
              <p className="text-on-surface-variant text-sm mt-1">© 2024 HomeHero. All rights reserved.</p>
            </div>
            <nav className="flex flex-wrap justify-center gap-6">
              <Link to="/privacy" className="text-on-surface-variant hover:text-primary transition-colors text-sm">Privacy Policy</Link>
              <Link to="/terms" className="text-on-surface-variant hover:text-primary transition-colors text-sm">Terms of Service</Link>
              <Link to="/contact" className="text-on-surface-variant hover:text-primary transition-colors text-sm">Contact Us</Link>
              <Link to="/help" className="text-on-surface-variant hover:text-primary transition-colors text-sm">Help Center</Link>
              <Link to="/careers" className="text-on-surface-variant hover:text-primary transition-colors text-sm">Careers</Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SignUpAs;