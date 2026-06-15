import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import GoogleLogin from '../../components/GoogleLogin';

function LoginPage() {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const navigate = useNavigate();

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
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
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        showToast(`Welcome ${data.user.username}!`, 'success');
        
        setTimeout(() => {
          if (data.user.role === 'SYSTEM_ADMIN') navigate('/admin/system');
          else if (data.user.role === 'VERIFICATION_ADMIN') navigate('/admin/verify');
          else if (data.user.role === 'Provider') navigate('/auth/sp-dashboard');
          else navigate('/dashboard');
        }, 1500);
      } else {
        showToast(data.message || 'Invalid credentials', 'error');
      }
    } catch (error) {
      showToast('Cannot connect to server', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = (data) => {
    console.log('Google login success:', data);
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    showToast(`Welcome ${data.user.username}!`, 'success');
    
    setTimeout(() => {
      if (data.user.role === 'SYSTEM_ADMIN') navigate('/admin/system');
      else if (data.user.role === 'VERIFICATION_ADMIN') navigate('/admin/verify');
      else if (data.user.role === 'Provider') navigate('/auth/sp-dashboard');
      else navigate('/dashboard');
    }, 1500);
  };

  const handleGoogleError = (error) => {
    showToast(error || 'Google login failed', 'error');
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-white box-border font-sans relative overflow-x-hidden">
      {toast.show && (
        <div className={`fixed top-5 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-xl shadow-lg border transition-all ${
          toast.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'
        }`}>
          {toast.message}
        </div>
      )}

      <div className="flex flex-1 w-full flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 flex flex-col justify-between py-10 bg-white">
          <div className="w-full max-w-[440px] mx-auto px-6">
            <Link to="/" className="text-2xl font-black tracking-tighter text-emerald-600 inline-block">HomeHero</Link>
          </div>
          
          <div className="w-full max-w-[440px] mx-auto my-auto p-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">Welcome back</h1>
              <p className="text-slate-500">Step into your managed home experience.</p>
            </div>
            
            <form onSubmit={handleLoginSubmit} className="space-y-5">
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase">Email or Username</label>
                <input type="text" className="w-full px-4 py-3 rounded-lg border focus:border-emerald-500 outline-none" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              
              <div>
                <div className="flex justify-between">
                  <label className="text-xs font-bold text-slate-700 uppercase">Password</label>
                  <Link to="/auth/forgot-password" className="text-xs font-bold text-emerald-600 hover:underline">Forgot password?</Link>
                </div>
                <input type="password" className="w-full px-4 py-3 rounded-lg border focus:border-emerald-500 outline-none" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              
              <div className="flex items-center gap-3">
                <input type="checkbox" id="remember" className="w-4 h-4 rounded border-slate-300 text-emerald-600" />
                <label htmlFor="remember" className="text-xs font-semibold text-slate-600">Keep me signed in</label>
              </div>
              
              <button type="submit" disabled={loading} className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition-all">
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
            
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
              <span className="relative px-4 bg-white text-[10px] uppercase tracking-widest font-bold text-slate-400">Or continue with</span>
            </div>
            
            <GoogleLogin 
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              buttonText="Sign in with Google"
            />
            
            <div className="mt-8 text-center">
              <p className="text-xs font-medium text-slate-500">
                New to HomeHero? 
                <Link to="/auth/signup-as" className="text-emerald-600 font-bold hover:underline ml-1">Create an account</Link>
              </p>
            </div>
          </div>
        </div>
        
        <div className="hidden lg:block lg:w-1/2 relative bg-slate-900">
          <img alt="Modern Interior" className="absolute inset-0 w-full h-full object-cover" src="https://images.unsplash.com/photo-1676136449197-babffb1125f0?auto=format&fit=crop&w=1200&q=80" />
          <div className="absolute inset-0 bg-black/15"></div>
          <div className="absolute bottom-20 left-16 right-16 text-white">
            <h2 className="text-4xl font-bold mb-4">Elevate your living experience.</h2>
            <p className="text-base text-white/90">Experience the gold standard in home management.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;