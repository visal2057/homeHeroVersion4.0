import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const BookingConfirmed = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-surface-bright text-on-surface min-h-screen flex flex-col">
      
      {/* ===== HEADER ===== */}
      <header className="bg-white/90 backdrop-blur-md border-b border-slate-100 fixed top-0 w-full z-50 shadow-[0_4px_20px_-4px_rgba(6,78,59,0.08)]">
        <div className="flex justify-between items-center h-16 px-6 md:px-12 max-w-7xl mx-auto">
          <Link to="/dashboard/account" className="text-2xl font-black tracking-tight text-emerald-600">HomeHero</Link>
          <div className="flex items-center gap-6">
            <Link to="/dashboard/account" className="text-slate-500 hover:text-emerald-700 transition-all duration-200 active:scale-95">
              <span className="material-symbols-outlined">home</span>
            </Link>
            <Link to="/notifications" className="text-slate-500 hover:text-emerald-700 transition-all duration-200 active:scale-95 relative">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 border-2 border-white"></span>
            </Link>
            <Link to="/profile" className="text-slate-500 hover:text-emerald-700 transition-all duration-200 active:scale-95">
              <span className="material-symbols-outlined">account_circle</span>
            </Link>
          </div>
        </div>
      </header>

      {/* ===== MAIN CONTENT ===== */}
      <main className="flex-grow pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          
          {/* ===== SUCCESS HEADER ===== */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-50 rounded-full mb-4">
              <span className="material-symbols-outlined text-emerald-600 text-5xl" style={{ fontVariationSettings: '"FILL" 1' }}>
                check_circle
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
            <p className="text-base md:text-lg text-gray-500 max-w-xxl mx-auto px-4">
              Aruna Perera has accepted your request. Your service is now scheduled.
            </p>
          </div>

          {/* ===== GRID ===== */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* ===== TIMELINE ===== */}
            <div className="md:col-span-5 bg-white p-4 md:p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="font-semibold text-sm uppercase text-gray-500 mb-4 tracking-wider">Booking Status</h3>
              <div className="space-y-6 relative pl-6">
                {/* Vertical Line */}
                <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-emerald-200"></div>
                
                {/* Step 1 */}
                <div className="flex gap-3 relative">
                  <div className="z-10 bg-emerald-600 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-white text-sm">check</span>
                  </div>
                  <div>
                    <p className="font-semibold text-emerald-700">Request Sent</p>
                    <p className="text-xs text-gray-500">Yesterday, 4:30 PM</p>
                  </div>
                </div>
                
                {/* Step 2 */}
                <div className="flex gap-3 relative">
                  <div className="z-10 bg-emerald-600 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-white text-sm">check</span>
                  </div>
                  <div>
                    <p className="font-semibold text-emerald-700">Provider Reviewing</p>
                    <p className="text-xs text-gray-500">Today, 9:15 AM</p>
                  </div>
                </div>
                
                {/* Step 3 - Current */}
                <div className="flex gap-3 relative">
                  <div className="z-10 bg-white border-2 border-emerald-600 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0">
                    <div className="h-2 w-2 bg-emerald-600 rounded-full animate-pulse"></div>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Booking Confirmed</p>
                    <p className="text-xs text-emerald-600 font-medium">Just now</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ===== SERVICE DETAILS ===== */}
            <div className="md:col-span-7 bg-white p-4 md:p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="font-semibold text-sm uppercase text-gray-500 mb-4 tracking-wider">Service Details</h3>
              
              <div className="space-y-4">
                {/* Provider */}
                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <div className="h-12 w-12 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-emerald-600">person</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500">Booking for</p>
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-emerald-600 text-sm">person</span>
                      <p className="font-semibold text-gray-900 truncate">Aruna Perera</p>
                    </div>
                  </div>
                </div>

                {/* Service Name */}
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-emerald-100 rounded-lg flex-shrink-0">
                    <span className="material-symbols-outlined text-emerald-600">agriculture</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500">Service Name</p>
                    <p className="font-semibold text-gray-900">General Gardening</p>
                  </div>
                </div>

                {/* Appointment */}
                <div className="flex items-start gap-4 border-t border-slate-100 pt-4">
                  <div className="p-2 bg-gray-100 rounded-lg flex-shrink-0">
                    <span className="material-symbols-outlined text-emerald-600">event</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500">Appointment Slot</p>
                    <p className="font-semibold text-gray-900">Friday, Nov 15, 2024</p>
                    <p className="text-sm text-gray-500">09:00 AM - 11:30 AM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ===== ACTIONS ===== */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <button 
              onClick={() => alert('Reminder added to calendar!')}
              className="w-full sm:w-auto bg-emerald-600 text-white px-8 py-3 rounded-full font-semibold shadow-md hover:bg-emerald-700 transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-xl">calendar_add_on</span>
              Add Reminder
            </button>
            <button 
              onClick={() => navigate('/my-bookings')}
              className="w-full sm:w-auto bg-white border border-gray-300 text-gray-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-50 transition-all duration-200 hover:-translate-y-0.5"
            >
              View All Bookings
            </button>
          </div>

          {/* ===== BACK TO HOME ===== */}
          <div className="mt-8 text-center">
            <Link to="/dashboard/account" className="text-sm text-gray-500 hover:text-emerald-600 transition-colors inline-flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookingConfirmed;