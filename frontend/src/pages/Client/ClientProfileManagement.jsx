import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/AuthContext';
import ClientHeader from '../../components/ClientHeader';

const ClientProfileManagement = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    district: '',
    email: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        phone: user.phone || '',
        district: user.district || '',
        email: user.email || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const response = await fetch(`/api/users/${user.userid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          first_name: formData.first_name,
          last_name: formData.last_name,
          phone: formData.phone,
          district: formData.district
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Profile updated successfully!');
        const updatedUser = { ...user, ...formData };
        localStorage.setItem('user_data', JSON.stringify(updatedUser));
        setTimeout(() => setMessage(''), 3000);
      } else {
        setError(data.message || 'Failed to update profile');
      }
    } catch (err) {
      setError('Error updating profile: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const getUserInitials = () => {
    const first = formData.first_name?.charAt(0) || '';
    const last = formData.last_name?.charAt(0) || '';
    return `${first}${last}`.toUpperCase() || 'U';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/20 text-on-background font-['Inter'] flex flex-col">
      <ClientHeader pageTitle="My Profile" />

      <main className="flex-grow pt-20 pb-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          
          {/* ===== PROFILE HEADER CARD ===== */}
          <div className="relative bg-white rounded-3xl border border-surface-container shadow-sm hover:shadow-2xl transition-all duration-500 p-6 md:p-8 lg:p-10 mb-8 overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-emerald-100/30 to-emerald-50/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gradient-to-tr from-emerald-100/20 to-transparent rounded-full blur-3xl"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-8">
              {/* Avatar with Ring */}
              <div className="relative group">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center border-4 border-white shadow-2xl shadow-emerald-200 group-hover:scale-105 transition-transform duration-500">
                  <span className="text-4xl md:text-5xl font-bold text-white">{getUserInitials()}</span>
                </div>
                <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-1.5 border-2 border-white shadow-lg">
                  <span className="material-symbols-outlined text-white text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>verified</span>
                </div>
                {/* Edit Avatar Button */}
                <button className="absolute bottom-0 right-8 bg-white rounded-full p-1.5 shadow-md hover:shadow-lg transition-all hover:scale-110">
                  <span className="material-symbols-outlined text-emerald-600 text-sm">edit</span>
                </button>
              </div>
              
              {/* User Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-on-surface mb-1">
                  {formData.first_name} {formData.last_name}
                </h1>
                <p className="text-on-surface-variant text-sm md:text-base mb-2">{formData.email}</p>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-100">
                    <span className="material-symbols-outlined text-sm">verified</span>
                    Verified Account
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-600 text-xs font-bold rounded-full border border-slate-200">
                    <span className="material-symbols-outlined text-sm">badge</span>
                    ID: {user?.userid || 'N/A'}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-100">
                    <span className="material-symbols-outlined text-sm">stars</span>
                    Member since 2026
                  </span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-col gap-2">
                <button 
                  onClick={() => navigate('/my-bookings')}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-emerald-600 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-all"
                >
                  <span className="material-symbols-outlined text-sm">bookmark</span>
                  My Bookings
                </button>
                <button 
                  onClick={() => navigate('/dashboard')}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all"
                >
                  <span className="material-symbols-outlined text-sm">dashboard</span>
                  Dashboard
                </button>
              </div>
            </div>
          </div>

          {/* ===== MESSAGES ===== */}
          {message && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-5 py-4 rounded-2xl mb-6 flex items-center gap-3 animate-in slide-in-from-top-2 duration-300 shadow-sm">
              <span className="material-symbols-outlined text-emerald-500 text-2xl">check_circle</span>
              <span className="font-medium flex-1">{message}</span>
              <button onClick={() => setMessage('')} className="text-emerald-400 hover:text-emerald-600 transition-colors">
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>
          )}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-2xl mb-6 flex items-center gap-3 animate-in slide-in-from-top-2 duration-300 shadow-sm">
              <span className="material-symbols-outlined text-red-500 text-2xl">error</span>
              <span className="font-medium flex-1">{error}</span>
              <button onClick={() => setError('')} className="text-red-400 hover:text-red-600 transition-colors">
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>
          )}

          {/* ===== PROFILE FORM ===== */}
          <div className="bg-white rounded-3xl border border-surface-container shadow-sm hover:shadow-2xl transition-all duration-500 p-6 md:p-8 lg:p-10">
            {/* Form Header */}
            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-surface-container">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-2xl flex items-center justify-center">
                <span className="material-symbols-outlined text-emerald-600 text-2xl">edit_note</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-on-surface">Edit Profile</h2>
                <p className="text-sm text-on-surface-variant">Update your personal information</p>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="font-semibold text-sm text-on-surface-variant block mb-1.5">First Name</label>
                  <div className="relative group">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                      <span className="material-symbols-outlined text-xl">person</span>
                    </span>
                    <input
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3.5 border-2 border-outline-variant rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none bg-surface-container-low text-on-surface transition-all hover:border-primary/30"
                      placeholder="Enter first name"
                    />
                  </div>
                </div>
                <div>
                  <label className="font-semibold text-sm text-on-surface-variant block mb-1.5">Last Name</label>
                  <div className="relative group">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                      <span className="material-symbols-outlined text-xl">person</span>
                    </span>
                    <input
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3.5 border-2 border-outline-variant rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none bg-surface-container-low text-on-surface transition-all hover:border-primary/30"
                      placeholder="Enter last name"
                    />
                  </div>
                </div>
              </div>

              {/* Email - Disabled */}
              <div>
                <label className="font-semibold text-sm text-on-surface-variant block mb-1.5">Email Address</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <span className="material-symbols-outlined text-xl">email</span>
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    disabled
                    className="w-full pl-12 pr-4 py-3.5 border-2 border-outline-variant rounded-xl bg-surface-container-low text-on-surface-variant cursor-not-allowed opacity-60"
                    placeholder="Email cannot be changed"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <span className="material-symbols-outlined text-sm">lock</span>
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant mt-1.5 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">info</span>
                  Email address cannot be changed
                </p>
              </div>

              {/* Phone & District */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="font-semibold text-sm text-on-surface-variant block mb-1.5">Phone Number</label>
                  <div className="relative group">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                      <span className="material-symbols-outlined text-xl">phone</span>
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3.5 border-2 border-outline-variant rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none bg-surface-container-low text-on-surface transition-all hover:border-primary/30"
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>
                <div>
                  <label className="font-semibold text-sm text-on-surface-variant block mb-1.5">District</label>
                  <div className="relative group">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                      <span className="material-symbols-outlined text-xl">location_on</span>
                    </span>
                    <input
                      type="text"
                      name="district"
                      value={formData.district}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3.5 border-2 border-outline-variant rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none bg-surface-container-low text-on-surface transition-all hover:border-primary/30"
                      placeholder="Enter district"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t-2 border-surface-container mt-8">
                <button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className="px-8 py-3.5 border-2 border-outline-variant text-on-surface-variant font-semibold rounded-xl hover:bg-surface-container hover:border-primary/40 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3.5 bg-gradient-to-r from-emerald-600 to-emerald-700 text-on-primary font-semibold rounded-xl hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-lg">save</span>
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* ===== ACCOUNT ACTIONS ===== */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-surface-container hover:border-primary/40 hover:shadow-md transition-all group">
              <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center group-hover:bg-emerald-50 transition-colors">
                <span className="material-symbols-outlined text-slate-500 group-hover:text-emerald-600 text-xl">security</span>
              </div>
              <div className="text-left">
                <p className="font-semibold text-sm text-on-surface">Security</p>
                <p className="text-xs text-on-surface-variant">Change password, 2FA</p>
              </div>
              <span className="ml-auto text-slate-300 group-hover:text-emerald-500 transition-colors">
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </span>
            </button>

            <button className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-surface-container hover:border-primary/40 hover:shadow-md transition-all group">
              <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center group-hover:bg-emerald-50 transition-colors">
                <span className="material-symbols-outlined text-slate-500 group-hover:text-emerald-600 text-xl">notifications</span>
              </div>
              <div className="text-left">
                <p className="font-semibold text-sm text-on-surface">Notifications</p>
                <p className="text-xs text-on-surface-variant">Email, SMS preferences</p>
              </div>
              <span className="ml-auto text-slate-300 group-hover:text-emerald-500 transition-colors">
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </span>
            </button>

            <button className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-surface-container hover:border-primary/40 hover:shadow-md transition-all group">
              <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center group-hover:bg-emerald-50 transition-colors">
                <span className="material-symbols-outlined text-slate-500 group-hover:text-emerald-600 text-xl">help</span>
              </div>
              <div className="text-left">
                <p className="font-semibold text-sm text-on-surface">Help & Support</p>
                <p className="text-xs text-on-surface-variant">FAQ, contact support</p>
              </div>
              <span className="ml-auto text-slate-300 group-hover:text-emerald-500 transition-colors">
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </span>
            </button>
          </div>
        </div>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="bg-white border-t border-outline-variant mt-8">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <Link to="/" className="text-lg font-bold text-primary">HomeHero</Link>
              <p className="text-on-surface-variant text-sm mt-1">© 2024 HomeHero. All rights reserved.</p>
            </div>
           
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ClientProfileManagement;