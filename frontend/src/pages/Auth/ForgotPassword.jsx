import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

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
      } else {
        setError(data.error || 'Failed to send reset link');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-emerald-600">
            HomeHero
          </Link>
          <Link to="/login" className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors">
            <span className="text-xl">←</span>
            Back to Login
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row min-h-[calc(100vh-73px)]">
        {/* Left Side - Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-12">
          <div className="max-w-md w-full">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">Forgot Password?</h1>
            <p className="text-gray-600 mb-6">
              No worries, it happens. Enter the email address associated with your account and we'll send you a link to reset your password.
            </p>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}

            {!submitted ? (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      📧
                    </span>
                    <input 
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                      placeholder="name@company.com"
                      required
                    />
                  </div>
                </div>
                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? 'Sending...' : 'Send Reset Link'}
                  <span>→</span>
                </button>
              </form>
            ) : (
              <div className="p-6 bg-green-50 border border-green-200 rounded-lg text-center">
                <div className="text-5xl mb-3">✅</div>
                <h3 className="text-xl font-semibold text-green-800 mb-2">Check your inbox!</h3>
                <p className="text-green-700">
                  We've sent a password reset link to <strong>{email}</strong>
                </p>
                <p className="text-green-600 text-sm mt-2">
                  Didn't receive it? Check your spam folder.
                </p>
              </div>
            )}

            <p className="text-center text-sm text-gray-500 mt-6">
              Still having trouble? 
              <a href="#" className="text-emerald-600 font-semibold hover:underline ml-1">Contact Support</a>
            </p>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="hidden md:block md:w-1/2 relative bg-emerald-900 min-h-[500px]">
          <img 
            className="absolute inset-0 w-full h-full object-cover opacity-70"
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800"
            alt="Modern home interior"
          />
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="absolute bottom-12 left-8 right-8 text-white">
            <div className="inline-block px-3 py-1 bg-emerald-500/30 rounded-full text-sm mb-4">
              🔒 Trusted by 10k+ Families
            </div>
            <h2 className="text-3xl font-bold mb-3">Peace of mind for your most valuable asset.</h2>
            <p className="text-white/90">HomeHero ensures your sanctuary stays safe and sound, even when you're locked out of your account.</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">© 2024 HomeHero. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-gray-500 hover:text-emerald-600">Terms of Service</a>
            <a href="#" className="text-sm text-gray-500 hover:text-emerald-600">Privacy Policy</a>
            <a href="#" className="text-sm text-gray-500 hover:text-emerald-600">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ForgotPassword;