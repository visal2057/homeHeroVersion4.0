import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/AuthContext';

const SPProfile = () => {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Profile form state
  const [profile, setProfile] = useState({
    fullName: user?.full_name || user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    city: user?.district || 'Colombo',
    jobsPerWeek: 15,
    startTime: '8:00 AM',
    endTime: '5:00 PM',
    services: ['Handiwork', 'Gardening']
  });

  const [selectedDays, setSelectedDays] = useState(['M', 'T', 'W', 'T', 'F']);
  const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  const providerName = user?.full_name || user?.name || user?.username || "Suresh Fonseka";
  const providerAvatar = user?.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80";

  // Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/auth/user/${user?.id || user?.userid}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          if (data.user) {
            setProfile(prev => ({
              ...prev,
              fullName: data.user.full_name || data.user.username || prev.fullName,
              email: data.user.email || prev.email,
              phone: data.user.phone || prev.phone,
              city: data.user.district || prev.city
            }));
          }
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id || user?.userid) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, [user, token]);

  // Logout handlers
  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    logout();
    navigate('/login');
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  const toggleDay = (day) => {
    setSelectedDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const removeService = (service) => {
    setProfile(prev => ({
      ...prev,
      services: prev.services.filter(s => s !== service)
    }));
  };

  const addService = () => {
    const newService = prompt('Enter new service name:');
    if (newService && newService.trim()) {
      setProfile(prev => ({
        ...prev,
        services: [...prev.services, newService.trim()]
      }));
    }
  };

  const handleUpdateProfile = async () => {
    setError('');
    setSuccess('');
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/update-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          full_name: profile.fullName,
          phone: profile.phone,
          district: profile.city
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Profile updated successfully!');
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.message || 'Failed to update profile');
        setTimeout(() => setError(''), 3000);
      }
    } catch (err) {
      setError('Network error. Please try again.');
      setTimeout(() => setError(''), 3000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-500">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background text-on-surface">
      
      {/* ===== LOGOUT CONFIRMATION MODAL ===== */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center px-4">
          {/* Backdrop with blur */}
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-md"
            onClick={handleCancelLogout}
          ></div>
          
          {/* Modal Card - Glassmorphism */}
          <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 max-w-md w-full p-5 animate-in fade-in zoom-in duration-300">
            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-red-500/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-red-500/10 rounded-full blur-2xl"></div>
            
            {/* Icon */}
            <div className="flex items-center justify-center mb-6">
              <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center border-4 border-red-100">
                <span className="material-symbols-outlined text-red-500 text-5xl" style={{ fontVariationSettings: '"FILL" 1' }}>
                  logout
                </span>
              </div>
            </div>
            
            {/* Title */}
            <h3 className="text-2xl font-bold text-slate-900 text-center mb-2">
              Logout Confirmation
            </h3>
            
            {/* Description */}
            <p className="text-slate-500 text-center mb-8">
              Are you sure you want to logout from your account? You will need to login again to access your dashboard.
            </p>
            
            {/* Action Buttons */}
            <div className="flex gap-4">
              <button 
                onClick={handleCancelLogout}
                className="flex-1 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-all duration-200 active:scale-95"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmLogout}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-500/25 transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-lg">logout</span>
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== SIDEBAR ===== */}
      <aside className="fixed left-0 top-0 h-full hidden lg:flex flex-col w-64 border-r border-slate-200 bg-white z-50">
        <div className="px-6 py-8">
          <Link to="/" className="text-xl font-black text-emerald-600">HomeHero</Link>
          <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mt-1">Verified Provider</p>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <Link to="/provider/dashboard" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg transition-colors">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="text-sm font-bold">Dashboard</span>
          </Link>
          <Link to="/provider/requests" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg transition-colors">
            <span className="material-symbols-outlined">pending_actions</span>
            <span className="text-sm font-bold">Requests</span>
          </Link>
          <Link to="/provider/jobs" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg transition-colors">
            <span className="material-symbols-outlined">assignment</span>
            <span className="text-sm font-bold">Jobs to do</span>
          </Link>
          <Link to="/provider/completed" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg transition-colors">
            <span className="material-symbols-outlined">task_alt</span>
            <span className="text-sm font-bold">Completed jobs</span>
          </Link>
          <Link to="/provider/subscription" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg transition-colors">
            <span className="material-symbols-outlined">credit_card</span>
            <span className="text-sm font-bold">Subscription</span>
          </Link>
          <Link to="/sprofile" className="flex items-center gap-3 px-4 py-3 text-emerald-700 font-semibold border-r-4 border-emerald-600 bg-emerald-50 rounded-lg">
            <span className="material-symbols-outlined">person</span>
            <span className="text-sm font-bold">Profile</span>
          </Link>
        </nav>
        
        {/* ===== LOGOUT BUTTON ===== */}
        <div className="p-4 border-t border-slate-200">
          <button 
            onClick={handleLogoutClick}
            className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full group"
          >
            <span className="material-symbols-outlined group-hover:scale-110 transition-transform">logout</span>
            <span className="text-sm font-bold">Logout</span>
          </button>
        </div>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <main className="lg:ml-64 min-h-screen">
        
        {/* ===== HEADER ===== */}
        <header className="sticky top-0 z-40 w-full flex justify-between items-center px-6 py-3 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-black text-slate-800">Profile Settings</h1>
            <div className="hidden md:flex relative items-center">
              <span className="material-symbols-outlined absolute left-3 text-slate-400">search</span>
              <input className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-full text-sm focus:ring-2 focus:ring-emerald-500 w-64 outline-none" placeholder="Search tasks or clients..." type="text" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-500 hover:text-emerald-600 transition-colors">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="p-2 text-slate-500 hover:text-emerald-600 transition-colors">
              <span className="material-symbols-outlined">settings</span>
            </button>
            <div className="h-8 w-px bg-slate-200 mx-2"></div>
            
            <div className="relative">
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center gap-3 focus:outline-none cursor-pointer hover:opacity-90 transition-opacity">
                <span className="text-sm font-bold text-slate-700 hidden sm:inline-block">{providerName}</span>
                <img alt="User avatar" className="w-8 h-8 rounded-full border border-slate-200 object-cover" src={providerAvatar} />
              </button>

              {isDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)}></div>
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-lg py-1 z-20 transition-all">
                    <Link to="/sprofile" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 font-medium transition-colors">
                      <span className="material-symbols-outlined text-base text-slate-400">person</span>
                      Profile Settings
                    </Link>
                    <hr className="border-slate-100" />
                    <button onClick={handleLogoutClick} className="w-full text-left flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 font-semibold transition-colors cursor-pointer">
                      <span className="material-symbols-outlined text-base text-red-400">logout</span>
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* ===== PROFILE CONTENT ===== */}
        <div className="p-6 space-y-6 max-w-4xl mx-auto">
          
          {/* Error/Success Messages */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
              <span className="material-symbols-outlined text-red-500">error</span>
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2">
              <span className="material-symbols-outlined text-green-500">check_circle</span>
              {success}
            </div>
          )}

          {/* ===== PROFILE HEADER CARD ===== */}
          <div className="flex flex-col md:flex-row md:items-center gap-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border-4 border-white shadow-md">
                <img alt={providerName} className="w-full h-full object-cover" src={providerAvatar} />
              </div>
              <button className="absolute bottom-0 right-0 bg-emerald-600 text-white p-1.5 rounded-full shadow-lg hover:bg-emerald-700 transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-sm">edit</span>
              </button>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-black text-slate-900">{profile.fullName || providerName}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="flex items-center gap-1 text-emerald-600 font-bold text-sm">
                  <span className="material-symbols-outlined text-sm">star</span> 4.9
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-500 text-sm font-medium">Professional Service Provider</span>
                <span className="text-slate-300">•</span>
                <span className="text-emerald-600 text-sm font-bold">Verified</span>
              </div>
              <p className="text-sm text-slate-500 mt-1">{profile.email}</p>
            </div>
          </div>

          {/* ===== PERSONAL INFORMATION ===== */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-emerald-600">badge</span>
              <h2 className="text-lg font-bold text-slate-900">Personal Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Full Name</label>
                <input 
                  className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 rounded-lg p-2.5 text-sm outline-none transition-all" 
                  type="text" 
                  value={profile.fullName}
                  onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Email Address</label>
                <input 
                  className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 rounded-lg p-2.5 text-sm outline-none transition-all" 
                  type="email" 
                  value={profile.email}
                  disabled
                />
                <p className="text-xs text-slate-400">Email cannot be changed</p>
              </div>
              <div className="md:col-span-2 space-y-1">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Phone Number</label>
                <input 
                  className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 rounded-lg p-2.5 text-sm outline-none transition-all" 
                  type="tel" 
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* ===== JOB DETAILS ===== */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-emerald-600">work</span>
              <h2 className="text-lg font-bold text-slate-900">Job Details</h2>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Offering Services</label>
                <div className="flex flex-wrap gap-2">
                  {profile.services.map((service, idx) => (
                    <span key={idx} className="px-3 py-1.5 bg-emerald-50 text-emerald-700 font-semibold rounded-full text-sm flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-sm">
                        {service === 'Handiwork' ? 'construction' : 
                         service === 'Gardening' ? 'yard' :
                         service === 'Cleaning' ? 'cleaning_services' :
                         service === 'AC Repair' ? 'ac_unit' :
                         service === 'Petcare' ? 'pets' : 'work'}
                      </span>
                      {service}
                      <button onClick={() => removeService(service)} className="hover:text-red-500 transition-colors">
                        <span className="material-symbols-outlined text-sm">close</span>
                      </button>
                    </span>
                  ))}
                  <button onClick={addService} className="px-3 py-1.5 border-2 border-dashed border-slate-300 text-slate-500 font-semibold rounded-full text-sm hover:border-emerald-500 hover:text-emerald-600 transition-all flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">add</span>
                    Add Service
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Operating City</label>
                  <input 
                    className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 rounded-lg p-2.5 text-sm outline-none transition-all" 
                    type="text" 
                    value={profile.city}
                    onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Jobs per Week</label>
                  <input 
                    className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 rounded-lg p-2.5 text-sm outline-none transition-all" 
                    type="number" 
                    value={profile.jobsPerWeek}
                    onChange={(e) => setProfile({ ...profile, jobsPerWeek: parseInt(e.target.value) })}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ===== WORKING HOURS ===== */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-emerald-600">schedule</span>
              <h2 className="text-lg font-bold text-slate-900">Working Hours</h2>
            </div>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {weekDays.map((day, idx) => (
                  <button
                    key={idx}
                    onClick={() => toggleDay(day)}
                    className={`w-11 h-11 rounded-full border-2 font-bold text-sm flex items-center justify-center transition-all ${
                      selectedDays.includes(day)
                        ? 'border-emerald-600 bg-emerald-600 text-white shadow-md shadow-emerald-200'
                        : 'border-slate-200 text-slate-600 hover:border-emerald-400 hover:bg-emerald-50'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Start Time</label>
                  <select 
                    className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 rounded-lg p-2.5 text-sm outline-none transition-all"
                    value={profile.startTime}
                    onChange={(e) => setProfile({ ...profile, startTime: e.target.value })}
                  >
                    <option>8:00 AM</option>
                    <option>9:00 AM</option>
                    <option>10:00 AM</option>
                    <option>11:00 AM</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">End Time</label>
                  <select 
                    className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 rounded-lg p-2.5 text-sm outline-none transition-all"
                    value={profile.endTime}
                    onChange={(e) => setProfile({ ...profile, endTime: e.target.value })}
                  >
                    <option>4:00 PM</option>
                    <option>5:00 PM</option>
                    <option>6:00 PM</option>
                    <option>7:00 PM</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* ===== ACTION BUTTONS ===== */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-2">
            <button onClick={() => navigate('/provider/dashboard')} className="px-6 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
              Cancel
            </button>
            <button onClick={handleUpdateProfile} className="px-8 py-2.5 bg-emerald-600 text-white font-bold rounded-lg shadow-md shadow-emerald-200 hover:bg-emerald-700 transition-all active:scale-95 text-sm">
              Update Profile
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SPProfile;