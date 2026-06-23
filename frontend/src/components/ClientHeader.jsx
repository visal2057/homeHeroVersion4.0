import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ClientHeader = ({ pageTitle }) => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const displayName = user?.username || user?.full_name || user?.email || 'HomeHero Client';
  const initial = displayName?.trim()?.charAt(0)?.toUpperCase() || 'H';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 gap-3">
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="text-xl font-black tracking-tight text-emerald-700">HomeHero</Link>
          {pageTitle && <span className="hidden text-sm font-medium text-slate-600 md:inline-block">{pageTitle}</span>}
        </div>

        <nav className="hidden items-center gap-2 md:flex">
          <Link to="/dashboard" className="rounded-full px-3 py-2 text-sm font-medium text-slate-600 hover:bg-emerald-50 hover:text-slate-900 transition">Home</Link>
          <Link to="/about" className="rounded-full px-3 py-2 text-sm font-medium text-slate-600 hover:bg-emerald-50 hover:text-slate-900 transition">About Us</Link>
          <Link to="/careers" className="rounded-full px-3 py-2 text-sm font-medium text-slate-600 hover:bg-emerald-50 hover:text-slate-900 transition">Careers</Link>
          <Link to="/contact" className="rounded-full px-3 py-2 text-sm font-medium text-slate-600 hover:bg-emerald-50 hover:text-slate-900 transition">Contact Us</Link>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate('/dashboard/notifications')}
            className="hidden rounded-full p-2 text-slate-600 transition hover:bg-emerald-50 sm:inline-flex"
            aria-label="Notifications"
          >
            <span className="material-symbols-outlined">notifications</span>
          </button>

          <div ref={dropdownRef} className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen((state) => !state)}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">{initial}</span>
              <span className="hidden sm:inline-block">{displayName}</span>
              <span className="material-symbols-outlined text-base text-slate-500">expand_more</span>
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-3 w-64 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/30">
                <div className="border-b border-slate-200 px-4 py-4">
                  <p className="text-sm font-semibold text-slate-900">Signed in as</p>
                  <p className="truncate text-sm text-slate-600">{displayName}</p>
                </div>
                <div className="flex flex-col gap-1 p-3">
                  <Link
                    to="/dashboard"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-2xl px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                  >
                    
                  
                    My Profile
                  </Link>
                  <Link
                    to="/my-bookings"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-2xl px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                  >
                    My Bookings
                  </Link>
                  <Link
                    to="/about"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-2xl px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                  >
                
               
                  </Link>
                </div>
                <div className="border-t border-slate-200 p-3">
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      logout();
                    }}
                    className="w-full rounded-2xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
                  >
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
