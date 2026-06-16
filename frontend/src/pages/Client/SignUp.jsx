import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'full_name' ? value.replace(/[0-9]/g, '') : value
    });
  };

  const validateForm = () => {
    const nameRegex = /^[a-zA-Z\s]{2,50}$/;
    if (!nameRegex.test(formData.full_name.trim())) {
      setError('Name can only contain letters (no numbers)');
      return false;
    }
    if (!formData.full_name.trim()) {
      setError('Full name is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Invalid email format');
      return false;
    }
    if (!formData.phone.trim()) {
      setError('Phone number is required');
      return false;
    }
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      setError('Phone number must be 10 digits');
      return false;
    }
    if (!formData.password) {
      setError('Password is required');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
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
        headers: {
          'Content-Type': 'application/json',
        },
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
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('loginTime', Date.now().toString());
        
        setTimeout(() => {
          navigate('/dashboard');
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
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b shadow-sm">
        <nav className="flex justify-between items-center h-16 px-4 md:px-8 max-w-7xl mx-auto">
          <Link to="/" className="text-2xl font-black tracking-tight text-emerald-700">HomeHero</Link>
        </nav>
      </header>

      <main className="flex-grow flex items-center justify-center pt-24 pb-12 px-4">
        <div className="z-10 w-full max-w-7xl grid md:grid-cols-2 gap-8 items-center">
          {/* Image Section */}
          <div className="hidden md:block h-full min-h-[500px] relative rounded-2xl overflow-hidden shadow-2xl">
            <img alt="Modern home interior" className="absolute inset-0 w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7cii9WCVLT5ASuRvbZtGy9qVF9tZAM__xJK9J3yypZXyvj4yNIyyRE22H5pZHU4pbaTy0t5Oo9C4SHvmh7uvmJ5r5I5gzdZorj5Rip7bcG3R6m7IwkIGHeJGgaTJlbWlSU8K4zEGWObs59vRzoAjmcN5JuwtwmAHIINtdVAAeNn6adbDN5zigjCuV5BLm4lu7BZR1Da7Mr95bztGPByYIrsrUg7ybXEQO-h8WnVequgGj_fDeEqSQJ4zJx86U6Cj41ibnJkfuA2U" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8">
              <h1 className="text-3xl font-bold text-white mb-2">Simplified care for your <span className="text-emerald-300">perfect home.</span></h1>
              <p className="text-white/90 max-w-md">Join thousands of homeowners who trust HomeHero.</p>
            </div>
          </div>

          {/* Sign Up Card */}
          <div className="bg-white shadow-xl rounded-xl border p-6 md:p-12 w-full max-w-[480px] mx-auto">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
              <p className="text-gray-500">Start your journey to a better home today.</p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                <input 
                  type="text" 
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border focus:border-emerald-500 outline-none" 
                  placeholder="John Doe"
                  required 
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border focus:border-emerald-500 outline-none" 
                  placeholder="john@example.com"
                  required 
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border focus:border-emerald-500 outline-none" 
                  placeholder="0771234567"
                  required 
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Create Password</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border focus:border-emerald-500 outline-none pr-12" 
                    placeholder="Minimum 6 characters"
                    required 
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)} 
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    <span className="material-symbols-outlined">{showPassword ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Confirm Password</label>
                <input 
                  type="password" 
                  name="confirm_password"
                  value={formData.confirm_password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border focus:border-emerald-500 outline-none" 
                  placeholder="Confirm your password"
                  required 
                />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-emerald-600 text-white font-semibold py-3 rounded-lg hover:bg-emerald-700 transition-all disabled:opacity-50"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t text-center">
              <p className="text-gray-500">
                Already have an account? 
                <Link to="/login" className="text-emerald-600 font-semibold hover:underline ml-1">Log in</Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full py-8 bg-gray-50 border-t">
        <div className="flex flex-col md:flex-row justify-between items-center px-6 max-w-7xl mx-auto gap-4">
          <div className="text-lg font-bold text-emerald-800">HomeHero</div>
          <span className="text-slate-500">© 2024 HomeHero Services. All rights reserved.</span>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-sm text-gray-500 hover:text-emerald-600">Privacy Policy</Link>
            <Link to="/terms" className="text-sm text-gray-500 hover:text-emerald-600">Terms of Service</Link>
            <Link to="/help" className="text-sm text-gray-500 hover:text-emerald-600">Help Center</Link>
            <Link to="/contact" className="text-sm text-gray-500 hover:text-emerald-600">Contact Us</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SignUp;