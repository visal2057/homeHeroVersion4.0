import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CenteredToast from '../../components/CenteredToast';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [focused, setFocused] = useState({});
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const handleFocus = (field) => {
    setFocused({ ...focused, [field]: true });
  };

  const handleBlur = (field) => {
    setFocused({ ...focused, [field]: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSubmitted(true);
        showToast('Reset link sent successfully!', 'success');
      } else {
        showToast(data.error || 'Failed to send reset link', 'error');
        setError(data.error || 'Failed to send reset link');
      }
    } catch (err) {
      showToast('Network error. Please try again.', 'error');
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 font-sans relative overflow-x-hidden">
      
      {/* ===== TOAST NOTIFICATIONS ===== */}
      <CenteredToast 
        show={toast.show} 
        type={toast.type} 
        message={toast.message} 
        onClose={() => setToast({ show: false, message: '', type: 'success' })} 
      />

      <div className="flex flex-1 w-full min-h-screen">
        
        {/* ===== LEFT SIDE - IMAGE SECTION ===== */}
        <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 overflow-hidden">
          <img 
            alt="Modern Interior" 
            className="absolute inset-0 w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-700" 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80" 
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>
          
          <div className="relative z-10 flex flex-col justify-between w-full h-full p-12">
            <div>
              <span className="text-2xl font-black tracking-tighter text-white/90">HomeHero</span>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-12 h-1 bg-emerald-400 rounded-full"></div>
                <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">Reset Password</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Don't worry, <br />
                <span className="text-emerald-300">we've got you covered.</span>
              </h2>
             
              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400 text-sm">⭐</span>
                  <span className="text-white/70 text-sm">4.9/5</span>
                </div>
                <div className="w-px h-6 bg-white/20"></div>
                <span className="text-white/70 text-sm">50k+ Homes</span>
                <div className="w-px h-6 bg-white/20"></div>
                <span className="text-white/70 text-sm">10k+ Pros</span>
              </div>
            </div>
          </div>
        </div>

        {/* ===== RIGHT SIDE - RESET FORM ===== */}
        <div className="w-full lg:w-1/2 flex items-center justify-center bg-gradient-to-br from-white via-white to-emerald-50/20 p-6 lg:p-12">
          <div className="w-full max-w-[480px]">
            
            {/* Logo (Mobile) */}
            <Link to="/" className="lg:hidden text-2xl font-black tracking-tighter text-emerald-600 inline-block mb-8">
              HomeHero
            </Link>

            {/* Header */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-2xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-emerald-600 text-2xl">lock_reset</span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Forgot Password?</h1>
                </div>
              </div>
              <p className="text-slate-500 text-sm ml-14">
                No worries! Enter your email and we'll send you a reset link.
              </p>
            </div>

            {!submitted ? (
              <>
                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  {/* Email */}
                  <div className="group">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1.5">
                      Email Address
                    </label>
                    <div className={`relative rounded-xl border-2 transition-all duration-200 ${
                      focused.email ? 'border-emerald-500 shadow-lg shadow-emerald-100' : 'border-slate-200 hover:border-emerald-300'
                    }`}>
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                        <span className="material-symbols-outlined text-xl">email</span>
                      </span>
                      <input 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-12 pr-4 py-3.5 bg-transparent rounded-xl outline-none text-slate-800 placeholder:text-slate-400" 
                        placeholder="name@company.com"
                        onFocus={() => handleFocus('email')}
                        onBlur={() => handleBlur('email')}
                        required 
                      />
                    </div>
                  </div>
                  
                  {/* Submit Button */}
                  <button 
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold rounded-2xl transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2 text-base"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-xl">send</span>
                        Send Reset Link
                      </>
                    )}
                  </button>
                </form>

                {/* Divider */}
                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200"></div>
                  </div>
                  <span className="relative px-6 bg-white text-[10px] uppercase tracking-widest font-bold text-slate-400">
                    Remember your password?
                  </span>
                </div>

                {/* Back to Login Button */}
                <Link 
                  to="/login" 
                  className="w-full py-4 bg-white border-2 border-slate-200 hover:border-emerald-300 text-slate-700 font-bold rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-emerald-100 hover:-translate-y-0.5 flex items-center justify-center gap-2 text-base"
                >
                  <span className="material-symbols-outlined text-xl">arrow_back</span>
                  Back to Login
                </Link>

                {/* Sign Up Link */}
                <div className="mt-8 text-center">
                  <p className="text-xs font-medium text-slate-500">
                    Don't have an account? 
                    <Link to="/auth/signup-as" className="text-emerald-600 font-bold hover:underline ml-1 hover:text-emerald-700 transition-colors">
                      Sign up now
                    </Link>
                  </p>
                </div>

                {/* Back to Home */}
                <div className="mt-6 text-center">
                  <Link to="/" className="text-xs font-medium text-slate-400 hover:text-emerald-600 transition-colors inline-flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">arrow_back</span>
                    Back to Home
                  </Link>
                </div>
              </>
            ) : (
              /* ===== SUCCESS STATE ===== */
              <div className="space-y-6">
                <div className="p-8 bg-gradient-to-br from-green-50 to-emerald-50/50 border-2 border-green-200 rounded-2xl text-center">
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl">✅</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Check your inbox!</h3>
                  <p className="text-slate-600 text-sm">
                    We've sent a password reset link to <br />
                    <strong className="text-emerald-600">{email}</strong>
                  </p>
                  <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl">
                    <p className="text-amber-700 text-xs flex items-center justify-center gap-2">
                      <span>💡</span>
                      Didn't receive it? Check your spam folder.
                    </p>
                  </div>
                </div>

                {/* Back to Login Button */}
                <Link 
                  to="/login" 
                  className="w-full py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold rounded-2xl transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 flex items-center justify-center gap-2 text-base"
                >
                  <span className="material-symbols-outlined text-xl">login</span>
                  Back to Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;