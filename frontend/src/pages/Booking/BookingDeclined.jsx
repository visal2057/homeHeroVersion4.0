import React from 'react';
import { Link } from 'react-router-dom';

const BookingDeclined = () => {
  return (
    <div className="bg-surface-bright text-on-surface min-h-screen flex flex-col">
      {/* TopAppBar */}
      <header className="bg-white/90 backdrop-blur-md border-b border-slate-100 fixed top-0 w-full z-50 shadow-[0_4px_20px_-4px_rgba(6,78,59,0.08)]">
        <div className="flex justify-between items-center h-16 px-6 md:px-12 max-w-7xl mx-auto">
          <Link to="/" className="text-2xl font-black tracking-tight text-emerald-600">HomeHero</Link>
          <div className="flex items-center gap-6">
            <Link to="/" className="text-slate-500 hover:text-emerald-700 transition-all duration-200 active:scale-95">
              <span className="material-symbols-outlined">home</span>
            </Link>
            <Link to="/notifications" className="text-slate-500 hover:text-emerald-700 transition-all duration-200 active:scale-95 relative">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-error border-2 border-white"></span>
            </Link>
            <Link to="/profile" className="text-slate-500 hover:text-emerald-700 transition-all duration-200 active:scale-95">
              <span className="material-symbols-outlined">account_circle</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Decline Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-4">
              <span className="material-symbols-outlined text-red-500 text-5xl">cancel</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Booking Declined</h1>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">
              Unfortunately, Aruna Perera is unable to fulfill your request at this time. Don't worry—there are many other pros ready to help!
            </p>
          </div>

          {/* Bento Grid Content */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Booking Status Timeline */}
            <div className="md:col-span-5 bg-white p-4 rounded-xl border shadow-sm">
              <h3 className="font-semibold text-sm uppercase text-gray-500 mb-4">Booking Status</h3>
              <div className="space-y-6 relative">
                <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-gray-100"></div>
                {/* Step 1 */}
                <div className="flex gap-3 relative">
                  <div className="z-10 bg-emerald-600 rounded-full h-6 w-6 flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-sm">check</span>
                  </div>
                  <div>
                    <p className="font-semibold text-emerald-700">Request Sent</p>
                    <p className="text-xs text-gray-500">Yesterday, 4:30 PM</p>
                  </div>
                </div>
                {/* Step 2 (Declined) */}
                <div className="flex gap-3 relative">
                  <div className="z-10 bg-red-500 rounded-full h-6 w-6 flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-sm">close</span>
                  </div>
                  <div>
                    <p className="font-semibold text-red-500">Declined</p>
                    <p className="text-xs text-gray-500">Today, 10:45 AM</p>
                  </div>
                </div>
                {/* Step 3 (Locked) */}
                <div className="flex gap-3 relative">
                  <div className="z-10 bg-gray-200 rounded-full h-6 w-6 flex items-center justify-center">
                    <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-500">Booking Confirmed</p>
                    <p className="text-xs text-gray-500">Unavailable</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Details Card */}
            <div className="md:col-span-7 bg-white p-4 rounded-xl border shadow-sm">
              <h3 className="font-semibold text-sm uppercase text-gray-500 mb-4">Service Details</h3>
              <div className="space-y-4">
                {/* Provider */}
                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <div className="h-12 w-12 rounded-full flex-shrink-0 bg-emerald-50 flex items-center justify-center">
                    <span className="material-symbols-outlined text-emerald-600 text-2xl">person</span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Booking for</p>
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-emerald-600 text-sm">person</span>
                      <p className="font-semibold text-gray-900">Aruna Perera</p>
                    </div>
                  </div>
                </div>

                {/* Service Type */}
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <span className="material-symbols-outlined text-emerald-600">agriculture</span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Service Name</p>
                    <p className="font-semibold text-gray-900">Gardening</p>
                  </div>
                </div>

                {/* Schedule */}
                <div className="flex items-start gap-4 border-t pt-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <span className="material-symbols-outlined text-emerald-600">event</span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Appointment Slot</p>
                    <p className="font-semibold text-gray-900">Friday, Nov 15, 2024</p>
                    <p className="text-sm text-gray-500">09:00 AM - 11:30 AM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Banner Image Section */}
            <div className="md:col-span-12 h-32 rounded-xl relative group bg-emerald-600">
              <div className="absolute inset-0 flex items-center px-4">
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-white text-4xl">security</span>
                  <div>
                    <p className="font-semibold text-white">Safety Guarantee</p>
                    <p className="text-white text-sm">All our services are insured and background-checked for your peace of mind.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="md:col-span-12 flex flex-col md:flex-row gap-4 justify-center items-center mt-4">
              <button className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-full font-semibold flex items-center justify-center gap-2 transition-all shadow-md">
                <span className="material-symbols-outlined">search</span>
                Find Another Pro
              </button>
              <button className="w-full md:w-auto bg-white border text-gray-700 hover:bg-gray-50 px-8 py-3 rounded-full font-semibold flex items-center justify-center gap-2 transition-all">
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-200 bg-slate-50 mt-8">
        <div className="flex flex-col md:flex-row justify-between items-start py-8 px-6 md:px-12 max-w-7xl mx-auto gap-6">
          <div className="flex flex-col gap-2 max-w-xs">
            <div className="text-lg font-bold text-emerald-700">HomeHero</div>
            <p className="text-sm text-slate-500 leading-relaxed">
              Connecting homeowners with trusted local professionals for a better, more comfortable home.
            </p>
            <p className="text-sm text-slate-400 mt-2">
              © 2024 HomeHero Trusted Care. Secure SSL Encrypted.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full md:w-auto">
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-gray-900">Company</p>
              <Link to="/about" className="text-sm text-slate-500 hover:text-emerald-600">About Us</Link>
              <Link to="/careers" className="text-sm text-slate-500 hover:text-emerald-600">Careers</Link>
              <Link to="/safety" className="text-sm text-slate-500 hover:text-emerald-600">Safety Guarantee</Link>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-gray-900">Legal</p>
              <Link to="/privacy" className="text-sm text-slate-500 hover:text-emerald-600">Privacy Policy</Link>
              <Link to="/terms" className="text-sm text-slate-500 hover:text-emerald-600">Terms of Service</Link>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-gray-900">Support</p>
              <Link to="/help" className="text-sm text-slate-500 hover:text-emerald-600">Help Center</Link>
              <Link to="/contact" className="text-sm text-slate-500 hover:text-emerald-600">Contact Support</Link>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          vertical-align: middle;
        }
      `}</style>
    </div>
  );
};

export default BookingDeclined;