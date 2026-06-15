import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CommonCheckout = () => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const timeSlots = [
    { time: "Morning: 09:00 AM - 12:00 PM", value: "morning" },
    { time: "Afternoon: 01:00 PM - 04:00 PM", value: "afternoon" },
    { time: "Evening: 04:00 PM - 07:00 PM", value: "evening" },
    { time: "Full Day: 09:00 AM - 05:00 PM", value: "full" }
  ];

  const selectTimeSlot = (slotValue) => {
    setSelectedSlot(slotValue);
  };

  return (
    <div className="bg-surface font-body-md text-on-surface min-h-screen flex flex-col">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-2xl font-bold text-emerald-700">HomeHero</Link>
            <div className="h-8 w-px bg-gray-300"></div>
            <span className="text-lg font-medium text-gray-600">Gardening</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 text-emerald-600 border-b-2 border-emerald-600 pb-1">
              <span className="material-symbols-outlined">home</span>
            </Link>
            <Link to="/notifications" className="flex items-center gap-2 text-slate-600 hover:text-emerald-600">
              <span className="material-symbols-outlined">notifications</span>
            </Link>
            <Link to="/profile" className="flex items-center gap-2 text-slate-600 hover:text-emerald-600">
              <span className="material-symbols-outlined">account_circle</span>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow pt-32 pb-20 px-6 flex justify-center">
        <div className="w-full max-w-3xl">
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Book Your Professional</h1>
            <p className="text-lg text-gray-500">Complete the details below to schedule your gardening service.</p>
          </div>

          <div className="space-y-6">
            {/* Booking For */}
            <section className="bg-white p-6 rounded-xl border shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-emerald-100 flex items-center justify-center rounded-full">
                  <span className="material-symbols-outlined text-emerald-600 text-4xl">person</span>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-500">Booking for</p>
                  <h2 className="text-2xl font-semibold text-gray-900">Aruna Perera</h2>
                  <p className="font-semibold text-emerald-600">Senior Landscape Architect</p>
                </div>
              </div>
            </section>

            {/* Request Details */}
            <section className="bg-white p-6 rounded-xl border shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-emerald-600">edit_note</span>
                <h3 className="text-2xl font-semibold">Request Details</h3>
              </div>
              <textarea className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-emerald-500" placeholder="Please describe the specifics of the job here..." rows="4"></textarea>
            </section>

            {/* Time Slots */}
            <section className="bg-white p-6 rounded-xl border shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-emerald-600">schedule</span>
                <h3 className="text-2xl font-semibold">Reserve time slot</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {timeSlots.map((slot) => (
                  <button key={slot.value} onClick={() => selectTimeSlot(slot.value)} className={`flex items-center justify-between p-4 border rounded-lg hover:border-emerald-500 transition-all group ${selectedSlot === slot.value ? 'bg-emerald-600 text-white border-emerald-600' : ''}`}>
                    <span className="font-semibold">{slot.time}</span>
                    <span className="material-symbols-outlined text-gray-400 group-hover:text-emerald-500">check_circle</span>
                  </button>
                ))}
              </div>
            </section>

            {/* Service Location */}
            <section className="bg-white p-6 rounded-xl border shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-emerald-600">location_on</span>
                <h3 className="text-2xl font-semibold">Service Location</h3>
              </div>
              <div className="mb-4">
                <label className="block font-semibold text-gray-700 mb-1">Home Address</label>
                <div className="relative">
                  <input className="w-full pl-10 pr-4 py-3 border rounded-lg" type="text" value="42 Emerald Lane, Green Valley, CA 90210" />
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                </div>
              </div>
              <div className="relative h-64 w-full rounded-lg overflow-hidden bg-gray-100">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-emerald-600 text-white p-2 rounded-full shadow-lg">
                    <span className="material-symbols-outlined text-4xl">location_on</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Confirm Button */}
            <button className="w-full bg-emerald-600 text-white py-5 rounded-xl font-semibold hover:bg-emerald-700 transition-all shadow-lg flex items-center justify-center gap-4">
              Confirm Booking <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="rounded-t-2xl bg-gray-50 border-t border-gray-200 py-8 mt-8">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 max-w-7xl mx-auto gap-4">
          <div>
            <span className="text-lg font-bold text-emerald-700">HomeHero</span>
            <p className="text-gray-500 text-sm">© 2024 HomeHero Gardening. Trusted Care for your home.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/services" className="text-gray-500 text-sm hover:text-emerald-600">Services</Link>
            <Link to="/providers" className="text-gray-500 text-sm hover:text-emerald-600">Top Providers</Link>
            <Link to="/join" className="text-gray-500 text-sm hover:text-emerald-600">Join as Pro</Link>
            <Link to="/privacy" className="text-gray-500 text-sm hover:text-emerald-600">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-500 text-sm hover:text-emerald-600">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CommonCheckout;