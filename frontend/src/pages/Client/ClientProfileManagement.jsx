import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ClientProfileManagement = () => {
  const [profile, setProfile] = useState({
    full_name: 'Suresh Fonseka',
    email: 'suresh.fonseka@example.com',
    phone: '+61 412 345 678',
    address: '123 Serenity Lane, Melbourne, VIC 3000, Australia'
  });

  return (
    <div className="flex flex-col min-h-screen text-on-surface">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm h-16">
        <div className="flex justify-between items-center h-full px-8 max-w-[1280px] mx-auto">
          <Link to="/" className="text-xl font-black text-emerald-600 tracking-tighter">HomeHero</Link>
          <nav className="flex items-center space-x-6">
            <Link to="/" className="p-2 rounded-full hover:bg-slate-50 text-slate-600">
              <span className="material-symbols-outlined">home</span>
            </Link>
            <Link to="/notifications" className="p-2 rounded-full hover:bg-slate-50 text-slate-600">
              <span className="material-symbols-outlined">notifications</span>
            </Link>
            <Link to="/profile" className="p-2 rounded-full bg-emerald-600/10 text-emerald-600 border border-emerald-600/20">
              <span className="material-symbols-outlined">account_circle</span>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow pt-16 pb-20">
        {/* Profile Header */}
        <section className="max-w-[1280px] mx-auto px-8 mt-6">
          <div className="bg-white border-2 border-emerald-600 rounded-xl p-8 flex flex-col items-center text-center shadow-sm">
            <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center mb-4 border-4 border-white shadow-md">
              <span className="material-symbols-outlined text-emerald-600 text-5xl">person</span>
            </div>
            <button className="text-emerald-600 text-sm mt-2 mb-3 hover:underline flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">edit</span> Edit Picture
            </button>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{profile.full_name}</h1>
            <p className="text-gray-500">Member since October 2025</p>
          </div>
        </section>

        {/* Two Column Layout */}
        <section className="max-w-[1280px] mx-auto px-8 mt-6 flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <aside className="w-full md:w-1/3 flex flex-col space-y-2">
            <Link to="#" className="flex items-center gap-3 px-4 py-3 bg-emerald-600 text-white rounded-lg font-semibold shadow-md">
              <span className="material-symbols-outlined">person</span> Personal Info
            </Link>
            <Link to="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg font-semibold">
              <span className="material-symbols-outlined">lock</span> Password & Security
            </Link>
            <Link to="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg font-semibold">
              <span className="material-symbols-outlined">notifications_active</span> Notification Settings
            </Link>
            <Link to="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg font-semibold">
              <span className="material-symbols-outlined">event_available</span> My Bookings
            </Link>
          </aside>

          {/* Form */}
          <div className="w-full md:w-2/3 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
              <span className="text-emerald-600 text-xs px-3 py-1 bg-emerald-100 rounded-full">Primary Profile</span>
            </div>
            <form className="space-y-4">
              <div>
                <label className="font-semibold text-sm text-gray-700 block mb-1">Full Name</label>
                <input className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500" type="text" value={profile.full_name} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-sm text-gray-700 block mb-1">Email Address</label>
                  <input className="w-full px-4 py-2 border border-gray-200 rounded-lg" type="email" value={profile.email} />
                </div>
                <div>
                  <label className="font-semibold text-sm text-gray-700 block mb-1">Phone Number</label>
                  <input className="w-full px-4 py-2 border border-gray-200 rounded-lg" type="tel" value={profile.phone} />
                </div>
              </div>
              <div>
                <label className="font-semibold text-sm text-gray-700 block mb-1">Home Address</label>
                <textarea className="w-full px-4 py-2 border border-gray-200 rounded-lg" rows="3" value={profile.address}></textarea>
              </div>
              <div className="flex justify-end pt-4">
                <button className="px-8 py-2 bg-emerald-600 text-white font-semibold rounded-full hover:bg-emerald-700 shadow-md active:scale-95" type="submit">Update Profile</button>
              </div>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full mt-auto py-8 bg-gray-50 border-t border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 max-w-[1280px] mx-auto gap-4">
          <div className="text-lg font-bold text-emerald-800">HomeHero</div>
          <nav className="flex flex-wrap justify-center gap-6">
            <Link to="/privacy" className="text-sm text-gray-500 hover:text-emerald-600">Privacy Policy</Link>
            <Link to="/terms" className="text-sm text-gray-500 hover:text-emerald-600">Terms of Service</Link>
            <Link to="/faq" className="text-sm text-gray-500 hover:text-emerald-600">FAQ</Link>
            <Link to="/support" className="text-sm text-gray-500 hover:text-emerald-600">Support</Link>
          </nav>
          <div className="text-sm text-gray-500">© 2024 HomeHero. Trusted home-focused care.</div>
        </div>
      </footer>
    </div>
  );
};

export default ClientProfileManagement;