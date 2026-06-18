import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/AuthContext';

const SignUp = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [focused, setFocused] = useState({});
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: ''
  });

  // ===== VALIDATION RULES =====
  // Full Name: Only letters and spaces (no numbers, no symbols)
  const handleNameChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
    setFormData({ ...formData, full_name: value });
  };

  // Email: Only lowercase, letters, numbers, @, ., _, -, +
  const handleEmailChange = (e) => {
    const value = e.target.value.toLowerCase();
    setFormData({ ...formData, email: value });
  };

  // Phone: Only numbers (max 10 digits)
  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setFormData({ ...formData, phone: value });
  };

  // Password: No spaces allowed
  const handlePasswordChange = (e) => {
    const value = e.target.value.replace(/\s/g, '');
    setFormData({ ...formData, password: value });
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value.replace(/\s/g, '');
    setFormData({ ...formData, confirm_password: value });
  };

  const handleFocus = (field) => {
    setFocused({ ...focused, [field]: true });
  };

  const handleBlur = (field) => {
    setFocused({ ...focused, [field]: false });
  };

  const validateForm = () => {
    // 1. Full Name - Only letters and spaces (2-50 characters)
    const nameRegex = /^[a-zA-Z\s]{2,50}$/;
    if (!nameRegex.test(formData.full_name.trim())) {
      setError('Name can only contain letters and spaces (min 2 characters)');
      return false;
    }

    // 2. Email - Valid email structure (lowercase only)
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address (e.g., john@example.com)');
      return false;
    }

    // 3. Phone - 10 digits only
    if (!formData.phone || formData.phone.length !== 10) {
      setError('Phone number must be exactly 10 digits');
      return false;
    }

    // 4. Password - Min 6 characters, no spaces
    if (!formData.password || formData.password.length < 6) {
      setError('Password must be at least 6 characters (no spaces allowed)');
      return false;
    }

    // 5. Confirm Password
    if (formData.password !== formData.confirm_password) {
      setError('Passwords do not match');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: formData.full_name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Account created successfully!');
        setTimeout(() => {
          login(data.token, data.user, '/dashboard');
        }, 2000);
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 font-sans relative overflow-x-hidden">
      
      {/* Toast Notifications */}
      {error && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 px-6 py-4 rounded-2xl shadow-2xl border border-red-200 bg-white/95 backdrop-blur-sm text-red-700 flex items-center gap-3 animate-in slide-in-from-top-5 duration-300 max-w-md w-full">
          <span className="material-symbols-outlined text-red-500 flex-shrink-0">error</span>
          <span className="font-medium flex-1">{error}</span>
          <button onClick={() => setError('')} className="text-red-400 hover:text-red-600 flex-shrink-0">
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>
      )}
      
      {success && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 px-6 py-4 rounded-2xl shadow-2xl border border-green-200 bg-white/95 backdrop-blur-sm text-green-700 flex items-center gap-3 animate-in slide-in-from-top-5 duration-300 max-w-md w-full">
          <span className="material-symbols-outlined text-green-500 flex-shrink-0">check_circle</span>
          <span className="font-medium flex-1">{success}</span>
          <button onClick={() => setSuccess('')} className="text-green-400 hover:text-green-600 flex-shrink-0">
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>
      )}

      <div className="flex flex-1 w-full min-h-screen">
        
        {/* Left Side - Image Section */}
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
                <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">Join Us</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Simplified care for your <br />
                <span className="text-emerald-300">perfect home.</span>
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

        {/* Right Side - Sign Up Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center bg-gradient-to-br from-white via-white to-emerald-50/20 p-6 lg:p-12">
          <div className="w-full max-w-[480px]">
            
            <Link to="/" className="lg:hidden text-2xl font-black tracking-tighter text-emerald-600 inline-block mb-8">
              HomeHero
            </Link>

            <div className="mb-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-2xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-emerald-600 text-2xl">person_add</span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Create Account</h1>
                </div>
              </div>
              <p className="text-slate-500 text-sm ml-14">Start your journey to a better home today.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Full Name - Letters and spaces only */}
              <div className="group">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1.5">
                  Full Name
                </label>
                <div className={`relative rounded-xl border-2 transition-all duration-200 ${
                  focused.full_name ? 'border-emerald-500 shadow-lg shadow-emerald-100' : 'border-slate-200 hover:border-emerald-300'
                }`}>
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                    <span className="material-symbols-outlined text-xl">person</span>
                  </span>
                  <input 
                    type="text" 
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleNameChange}
                    onFocus={() => handleFocus('full_name')}
                    onBlur={() => handleBlur('full_name')}
                    className="w-full pl-12 pr-4 py-3.5 bg-transparent rounded-xl outline-none text-slate-800 placeholder:text-slate-400" 
                    placeholder=""
                    required 
                  />
                </div>
                <p className="text-xs text-slate-400 mt-1"></p>
              </div>

              {/* Email - Valid email structure, lowercase only */}
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
                    name="email"
                    value={formData.email}
                    onChange={handleEmailChange}
                    onFocus={() => handleFocus('email')}
                    onBlur={() => handleBlur('email')}
                    className="w-full pl-12 pr-4 py-3.5 bg-transparent rounded-xl outline-none text-slate-800 placeholder:text-slate-400 lowercase" 
                    placeholder=""
                    required 
                  />
                </div>
                <p className="text-xs text-slate-400 mt-1"></p>
              </div>

              {/* Phone - 10 digits only */}
              <div className="group">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1.5">
                  Phone Number
                </label>
                <div className={`relative rounded-xl border-2 transition-all duration-200 ${
                  focused.phone ? 'border-emerald-500 shadow-lg shadow-emerald-100' : 'border-slate-200 hover:border-emerald-300'
                }`}>
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                    <span className="material-symbols-outlined text-xl">phone</span>
                  </span>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    onFocus={() => handleFocus('phone')}
                    onBlur={() => handleBlur('phone')}
                    className="w-full pl-12 pr-4 py-3.5 bg-transparent rounded-xl outline-none text-slate-800 placeholder:text-slate-400" 
                    placeholder=""
                    maxLength="10"
                    required 
                  />
                </div>
                <p className="text-xs text-slate-400 mt-1"></p>
              </div>

              {/* Password - No spaces */}
              <div className="group">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1.5">
                  Create Password
                </label>
                <div className={`relative rounded-xl border-2 transition-all duration-200 ${
                  focused.password ? 'border-emerald-500 shadow-lg shadow-emerald-100' : 'border-slate-200 hover:border-emerald-300'
                }`}>
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                    <span className="material-symbols-outlined text-xl">lock</span>
                  </span>
                  <input 
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handlePasswordChange}
                    onFocus={() => handleFocus('password')}
                    onBlur={() => handleBlur('password')}
                    className="w-full pl-12 pr-12 py-3.5 bg-transparent rounded-xl outline-none text-slate-800 placeholder:text-slate-400" 
                    placeholder="Minimum 6 characters (no spaces)"
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
                {formData.password && (
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex-1 h-1 bg-slate-200 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all duration-500 ${
                        formData.password.length < 4 ? 'w-1/3 bg-red-500' :
                        formData.password.length < 8 ? 'w-2/3 bg-yellow-500' :
                        'w-full bg-emerald-500'
                      }`} />
                    </div>
                    <span className={`text-xs font-medium ${
                      formData.password.length < 4 ? 'text-red-500' :
                      formData.password.length < 8 ? 'text-yellow-500' :
                      'text-emerald-500'
                    }`}>
                      {formData.password.length < 4 ? 'Weak' :
                       formData.password.length < 8 ? 'Medium' :
                       'Strong'}
                    </span>
                  </div>
                )}
                <p className="text-xs text-slate-400 mt-1">No spaces allowed</p>
              </div>

              {/* Confirm Password - No spaces */}
              <div className="group">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1.5">
                  Confirm Password
                </label>
                <div className={`relative rounded-xl border-2 transition-all duration-200 ${
                  focused.confirm_password ? 'border-emerald-500 shadow-lg shadow-emerald-100' : 'border-slate-200 hover:border-emerald-300'
                } ${formData.confirm_password && formData.password !== formData.confirm_password ? 'border-red-400' : ''}`}>
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                    <span className="material-symbols-outlined text-xl">lock</span>
                  </span>
                  <input 
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirm_password"
                    value={formData.confirm_password}
                    onChange={handleConfirmPasswordChange}
                    onFocus={() => handleFocus('confirm_password')}
                    onBlur={() => handleBlur('confirm_password')}
                    className="w-full pl-12 pr-12 py-3.5 bg-transparent rounded-xl outline-none text-slate-800 placeholder:text-slate-400" 
                    placeholder="Confirm your password"
                    required 
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <span className="material-symbols-outlined text-xl">{showConfirmPassword ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>
                {formData.confirm_password && formData.password !== formData.confirm_password && (
                  <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">error</span>
                    Passwords do not match
                  </p>
                )}
              </div>

              {/* Terms */}
              <div className="flex items-start gap-3 pt-1">
                <input 
                  type="checkbox" 
                  id="terms" 
                  className="mt-1 w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                  required
                />
                <label htmlFor="terms" className="text-xs text-slate-500 leading-relaxed">
                  I agree to the <Link to="/terms" className="text-emerald-600 hover:underline font-medium">Terms of Service</Link> and <Link to="/privacy" className="text-emerald-600 hover:underline font-medium">Privacy Policy</Link>
                </label>
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
                    Creating Account...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-xl">how_to_reg</span>
                    Create Account
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
                Already have an account?
              </span>
            </div>

            {/* Login Link */}
            <Link 
              to="/login" 
              className="flex items-center justify-center gap-2 w-full py-3.5 border-2 border-emerald-600 text-emerald-600 font-bold rounded-2xl hover:bg-emerald-50 transition-all duration-300 hover:-translate-y-0.5 group"
            >
              <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">arrow_forward</span>
              Log In
            </Link>

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
};

export default SignUp;