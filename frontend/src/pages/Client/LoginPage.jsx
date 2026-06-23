import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import GoogleLogin from '../../components/GoogleLogin';
import { useAuth } from '../../components/AuthContext';
import CenteredToast from '../../components/CenteredToast';

function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState({});
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const navigate = useNavigate();

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

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        showToast(`Welcome ${data.user.username}!`, 'success');
        
        setTimeout(() => {
          login(data.token, data.user);
        }, 1500);
        
      } else {
        showToast(data.message || 'Invalid credentials', 'error');
      }
    } catch (error) {
      console.error('Login error:', error);
      showToast('Cannot connect to server', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = (data) => {
    showToast(`Welcome ${data.user.username}!`, 'success');
    
    setTimeout(() => {
      login(data.token, data.user);
    }, 1500);
  };

  const handleGoogleError = (error) => {
    showToast(error || 'Google login failed', 'error');
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 font-sans relative overflow-x-hidden">
      
      {/* ===== TOAST NOTIFICATIONS ===== */}
      <CenteredToast show={toast.show} type={toast.type} message={toast.message} onClose={() => setToast({ show: false, message: '', type: 'success' })} />

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
                <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">Welcome Back</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Elevate your <br />
                <span className="text-emerald-300">living experience.</span>
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

        {/* ===== RIGHT SIDE - LOGIN FORM ===== */}
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
                  <span className="material-symbols-outlined text-emerald-600 text-2xl">login</span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome back</h1>
                </div>
              </div>
              <p className="text-slate-500 text-sm ml-14">Step into your managed home experience.</p>
            </div>

            {/* Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-5">
              
              {/* Email */}
              <div className="group">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1.5">
                  Email or Username
                </label>
                <div className={`relative rounded-xl border-2 transition-all duration-200 ${
                  focused.email ? 'border-emerald-500 shadow-lg shadow-emerald-100' : 'border-slate-200 hover:border-emerald-300'
                }`}>
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                    <span className="material-symbols-outlined text-xl">person</span>
                  </span>
                  <input 
                    type="text" 
                    className="w-full pl-12 pr-4 py-3.5 bg-transparent rounded-xl outline-none text-slate-800 placeholder:text-slate-400" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    onFocus={() => handleFocus('email')}
                    onBlur={() => handleBlur('email')}
                    placeholder=""
                    required 
                  />
                </div>
              </div>
              
              {/* Password */}
              <div className="group">
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Password
                  </label>
                  <Link to="/auth/forgot-password" className="text-xs font-medium text-emerald-600 hover:underline hover:text-emerald-700 transition-colors">
                    Forgot password?
                  </Link>
                </div>
                <div className={`relative rounded-xl border-2 transition-all duration-200 ${
                  focused.password ? 'border-emerald-500 shadow-lg shadow-emerald-100' : 'border-slate-200 hover:border-emerald-300'
                }`}>
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                    <span className="material-symbols-outlined text-xl">lock</span>
                  </span>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    className="w-full pl-12 pr-12 py-3.5 bg-transparent rounded-xl outline-none text-slate-800 placeholder:text-slate-400" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    onFocus={() => handleFocus('password')}
                    onBlur={() => handleBlur('password')}
                    placeholder="Enter your password"
                    required 
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)} 
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <span className="material-symbols-outlined text-xl">{showPassword ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>
              </div>
              
              {/* Remember Me */}
              <div className="flex items-center gap-3 pt-1">
                <input 
                  type="checkbox" 
                  id="remember" 
                  className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 focus:ring-offset-0" 
                />
                <label htmlFor="remember" className="text-xs font-medium text-slate-600">Keep me signed in</label>
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
                    Signing in...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-xl">login</span>
                    Sign In
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
                Or continue with
              </span>
            </div>

            {/* Google Login */}
            <GoogleLogin 
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              buttonText="Sign in with Google"
            />

            {/* Sign Up Link */}
            <div className="mt-8 text-center">
              <p className="text-xs font-medium text-slate-500">
                New to HomeHero? 
                <Link to="/auth/signup-as" className="text-emerald-600 font-bold hover:underline ml-1 hover:text-emerald-700 transition-colors">
                  Create an account
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;