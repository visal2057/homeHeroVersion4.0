import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const PendingVerification = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState('PENDING_REVIEW');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 font-sans relative overflow-x-hidden">
      
      {/* ===== HEADER ===== */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-outline-variant shadow-sm h-16">
        <div className="flex justify-between items-center px-4 md:px-8 h-full max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <Link to="/" className="text-xl font-black tracking-tighter text-primary">HomeHero</Link>
            <div className="h-6 w-px bg-outline-variant mx-2 hidden sm:block"></div>
            <span className="text-sm font-medium text-on-surface-variant hidden sm:block">Verification</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors">
              Login
            </Link>
          </div>
        </div>
      </header>

      {/* ===== MAIN CONTENT ===== */}
      <main className="flex-grow flex items-center justify-center pt-16 pb-12 px-4 md:px-6">
        <div className="w-full max-w-2xl mx-auto">
          
          <div className="relative">
            {/* Decorative Blobs */}
            <div className="absolute -top-12 -left-12 w-32 h-32 bg-emerald-100/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-emerald-200/30 rounded-full blur-3xl"></div>
            
            {/* ===== MAIN CARD ===== */}
            <div className="relative bg-white rounded-3xl shadow-xl border border-surface-container p-8 md:p-12 text-center">
              
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-24 h-24 bg-primary-fixed rounded-full mb-6 animate-pulse">
                <span className="material-symbols-outlined text-primary text-6xl" style={{ fontVariationSettings: '"FILL" 1' }}>
                     verified_user   
                </span>
              </div>
             <div></div>
              {/* Badge */}
              <div className="inline-block bg-primary-fixed px-4 py-1.5 rounded-full mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">     Pending Review</span>
              </div>
              <div> </div>
              <h1 className="text-3xl md:text-4xl font-black text-on-surface mb-4">
                Verification in Progress
              </h1>
              
              <p className="text-base md:text-lg text-on-surface-variant max-w">
                Thank you for joining HomeHero. Our team is currently reviewing your profile and documents. 
                We will notify you via email once your account has been verified.
              </p>
              
              {/* Info Badges */}
              <div className="mt-8 pt-6 border-t border-surface-container">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-on-surface-variant">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">schedule</span>
                    <span className="font-semibold text-sm">Estimated review: 24-48h</span>
                  </div>
                  <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-outline-variant"></div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">mail</span>
                    <span className="font-semibold text-sm">Check your inbox</span>
                  </div>
                </div>
              </div>
              
              {/* Note */}
              <p className="mt-6 text-sm text-outline italic">
                Once approved, you will be automatically redirected to your dashboard.
              </p>
              
              {/* Help Link */}
              <div className="mt-6 flex justify-center">
                <Link 
                  to="/contact" 
                  className="flex items-center gap-2 bg-surface-container-low px-4 py-2 rounded-full border border-outline-variant hover:border-primary transition-all"
                >
                  <span className="material-symbols-outlined text-on-surface-variant text-xl">help_outline</span>
                  <span className="text-xs text-on-surface-variant">
                    Need help? Visit our <span className="text-primary font-bold hover:underline">Support Center</span>
                  </span>
                </Link>
              </div>
            </div>
            
            {/* Back to Home */}
            <div className="mt-6 text-center">
              <Link to="/" className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors inline-flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                Back to Home
              </Link>
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
              <Link to="/about" className="text-on-surface-variant hover:text-primary transition-colors text-sm">About Us</Link>
              <Link to="/privacy" className="text-on-surface-variant hover:text-primary transition-colors text-sm">Privacy Policy</Link>
              <Link to="/terms" className="text-on-surface-variant hover:text-primary transition-colors text-sm">Terms of Service</Link>
              <Link to="/contact" className="text-on-surface-variant hover:text-primary transition-colors text-sm">Contact</Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PendingVerification;