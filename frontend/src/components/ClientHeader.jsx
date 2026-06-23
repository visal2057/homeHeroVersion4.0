import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ClientHeader = ({ pageTitle }) => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // ===== SCROLL DETECTION =====
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ===== CLICK OUTSIDE DROPDOWN =====
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const displayName = user?.full_name || user?.username || user?.email || 'HomeHero Client';
  const initial = displayName?.trim()?.charAt(0)?.toUpperCase() || 'H';

  // ===== GET ROLE BADGE =====
  const getRoleBadge = () => {
    const role = user?.role?.toLowerCase();
    if (role === 'provider' || role === 'service_provider') {
      return { label: 'Provider', color: 'bg-blue-100 text-blue-700' };
    }
    if (role === 'customer' || role === 'client') {
      return { label: 'Customer', color: 'bg-emerald-100 text-emerald-700' };
    }
    if (role === 'admin' || role === 'system_admin') {
      return { label: 'Admin', color: 'bg-purple-100 text-purple-700' };
    }
    return { label: 'User', color: 'bg-gray-100 text-gray-700' };
  };

  const roleBadge = getRoleBadge();

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-xl shadow-slate-200/20' 
        : 'bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm'
    }`}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 gap-3">
        
        {/* ===== LEFT: Logo + Page Title ===== */}
        <div className="flex items-center gap-3">
          <Link 
            to="/dashboard" 
            className="group flex items-center gap-2 text-xl font-black tracking-tighter text-emerald-700 hover:text-emerald-800 transition-colors"
          >
            <span className="relative">
              HomeHero
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 group-hover:w-full transition-all duration-300"></span>
            </span>
          </Link>
          
          {pageTitle && (
            <>
              <div className="hidden h-6 w-px bg-slate-300 md:block"></div>
              <span className="hidden text-sm font-medium text-slate-500 md:inline-block">
                {pageTitle}
              </span>
            </>
          )}
        </div>

      

        {/* ===== RIGHT: Actions + Profile ===== */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <button
            type="button"
            onClick={() => navigate('/dashboard/notifications')}
            className="relative hidden rounded-full p-2.5 text-slate-500 transition-all hover:bg-emerald-50 hover:text-emerald-600 sm:inline-flex group"
            aria-label="Notifications"
          >
            <span className="material-symbols-outlined text-xl group-hover:scale-110 transition-transform">notifications</span>
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
          </button>

          {/* ===== USER DROPDOWN ===== */}
          <div ref={dropdownRef} className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen((state) => !state)}
              className={`inline-flex items-center gap-2.5 rounded-full border-2 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 transition-all duration-300 hover:shadow-md ${
                menuOpen 
                  ? 'border-emerald-500 shadow-lg shadow-emerald-100' 
                  : 'border-slate-200 hover:border-emerald-300'
              }`}
            >
              {/* Avatar */}
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-sm font-bold text-white shadow-md ring-2 ring-emerald-100">
                {initial}
              </span>
              
              {/* Name & Role */}
              <div className="hidden sm:block text-left">
                <p className="text-sm font-semibold text-slate-800 leading-tight">{displayName}</p>
                <span className={`text-[10px] font-medium uppercase tracking-wider ${roleBadge.color} px-1.5 py-0.5 rounded-full`}>
                  {roleBadge.label}
                </span>
              </div>
              
              {/* Chevron */}
              <span className={`material-symbols-outlined text-base text-slate-400 transition-transform duration-300 ${
                menuOpen ? 'rotate-180' : ''
              }`}>
                expand_more
              </span>
            </button>

            {/* ===== DROPDOWN MENU ===== */}
            {menuOpen && (
              <div className="absolute right-0 mt-3 w-72 overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-2xl shadow-slate-200/30 animate-in slide-in-from-top-2 duration-200">
                {/* User Info */}
                <div className="bg-gradient-to-r from-emerald-50 to-emerald-100/50 px-5 py-5 border-b border-slate-200/50">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg ring-4 ring-white">
                      {initial}
                    </div>
                    <div>
                      <p className="text-base font-bold text-slate-900">{displayName}</p>
                      <p className="text-sm text-slate-600 truncate">{user?.email || 'No email'}</p>
                      <span className={`inline-block mt-1 text-[10px] font-bold uppercase tracking-wider ${roleBadge.color} px-2 py-0.5 rounded-full`}>
                        {roleBadge.label}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="flex flex-col gap-1 p-3">
                  <Link
                    to="/dashboard"
                    onClick={() => setMenuOpen(false)}
                    className="group flex items-center gap-3 rounded-2xl px-4 py-2.5 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-all"
                  >
                    <span className="material-symbols-outlined text-base text-slate-400 group-hover:text-emerald-500 transition-colors">dashboard</span>
                    Dashboard
                  </Link>
                  <Link
                    to="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="group flex items-center gap-3 rounded-2xl px-4 py-2.5 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-all"
                  >
                    <span className="material-symbols-outlined text-base text-slate-400 group-hover:text-emerald-500 transition-colors">person</span>
                    My Profile
                  </Link>
                  <Link
                    to="/my-bookings"
                    onClick={() => setMenuOpen(false)}
                    className="group flex items-center gap-3 rounded-2xl px-4 py-2.5 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-all"
                  >
                    <span className="material-symbols-outlined text-base text-slate-400 group-hover:text-emerald-500 transition-colors">bookmark</span>
                    My Bookings
                  </Link>
                  <Link
                    to="/information"
                    onClick={() => setMenuOpen(false)}
                    className="group flex items-center gap-3 rounded-2xl px-4 py-2.5 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-all"
                  >
                    <span className="material-symbols-outlined text-base text-slate-400 group-hover:text-emerald-500 transition-colors">info</span>
                    More Information
                  </Link>
                </div>

                {/* Logout */}
                <div className="border-t border-slate-200/50 p-3 bg-slate-50/50">
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      logout();
                    }}
                    className="group w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-red-500 to-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-md shadow-red-500/20 hover:shadow-lg hover:shadow-red-500/30 active:scale-95"
                  >
                    <span className="material-symbols-outlined text-base group-hover:rotate-180 transition-transform duration-300">logout</span>
                    Log Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default ClientHeader;