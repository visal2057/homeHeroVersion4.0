import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
        // Update local storage with new user data
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

  return (
    <div className="bg-[#f7f9fb] text-[#191c1e] min-h-screen flex flex-col font-['Inter']">
      <ClientHeader pageTitle="My Profile" />

      <main className="flex-grow pt-20 pb-16 px-4 md:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Profile Header Card */}
          <div className="bg-white border border-[#bccac0] rounded-2xl p-8 mb-8 shadow-sm">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-[#006948]/10 flex items-center justify-center mb-4 border-4 border-white shadow-md">
                <span className="text-[#006948] text-5xl font-bold">
                  {user?.first_name?.charAt(0).toUpperCase()}{user?.last_name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-[#191c1e] mb-2">
                {user?.first_name} {user?.last_name}
              </h1>
              <p className="text-[#6d7a72] text-sm mb-2">{user?.email}</p>
              <p className="text-[#6d7a72] text-sm">Member ID: {user?.userid}</p>
            </div>
          </div>

          {/* Messages */}
          {message && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">check_circle</span>
              {message}
            </div>
          )}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">error</span>
              {error}
            </div>
          )}

          {/* Profile Form */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#bccac0]">
            <h2 className="text-2xl font-semibold text-[#191c1e] mb-6">Edit Profile</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="font-semibold text-sm text-[#3d4a42] block mb-2">First Name</label>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#bccac0] rounded-lg focus:ring-2 focus:ring-[#006948] focus:border-transparent bg-white text-[#191c1e]"
                    placeholder="Enter first name"
                  />
                </div>
                <div>
                  <label className="font-semibold text-sm text-[#3d4a42] block mb-2">Last Name</label>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#bccac0] rounded-lg focus:ring-2 focus:ring-[#006948] focus:border-transparent bg-white text-[#191c1e]"
                    placeholder="Enter last name"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-sm text-[#3d4a42] block mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  disabled
                  className="w-full px-4 py-3 border border-[#bccac0] rounded-lg bg-[#f2f4f6] text-[#6d7a72] cursor-not-allowed"
                  placeholder="Email cannot be changed"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="font-semibold text-sm text-[#3d4a42] block mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#bccac0] rounded-lg focus:ring-2 focus:ring-[#006948] focus:border-transparent bg-white text-[#191c1e]"
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <label className="font-semibold text-sm text-[#3d4a42] block mb-2">District</label>
                  <input
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#bccac0] rounded-lg focus:ring-2 focus:ring-[#006948] focus:border-transparent bg-white text-[#191c1e]"
                    placeholder="Enter district"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-6 gap-4">
                <button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className="px-8 py-3 border border-[#bccac0] text-[#191c1e] font-semibold rounded-lg hover:bg-[#f2f4f6] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 bg-[#006948] text-white font-semibold rounded-lg hover:bg-[#00855d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <span className="animate-spin">⏳</span>
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
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 font-['Inter'] text-sm w-full rounded-t-2xl border-t border-slate-200 mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 max-w-7xl mx-auto space-y-4 md:space-y-0">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-lg font-bold text-emerald-700">HomeHero</span>
            <span className="text-slate-500">© 2024 HomeHero. Trusted Care for your home.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ClientProfileManagement;