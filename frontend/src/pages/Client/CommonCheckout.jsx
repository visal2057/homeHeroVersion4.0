import React, { useState } from 'react';

export default function MobileBooking() {
  // State definitions for handling user interaction and inputs
  const [requestDetails, setRequestDetails] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [address, setAddress] = useState('42 Emerald Lane, Green Valley, CA 90210');

  // Simple handler to print out user inputs upon booking completion
  const handleConfirmBooking = () => {
    alert(`Booking Confirmed!\nDate: ${bookingDate}\nTime: ${bookingTime}\nLocation: ${address}`);
  };

  return (
    <div className="bg-[#f7f9fb] text-[#191c1e] min-h-screen flex flex-col font-['Inter'] relative">
      
      {/* Global CSS Injector matching webkit scrollbar behaviors from the design */}
      <style>{`
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #f7f9fb;
        }
        ::-webkit-scrollbar-thumb {
          background: #bccac0;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #6d7a72;
        }
      `}</style>

      {/* Top Navigation Bar */}
      <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-[0_4px_20px_-4px_rgba(6,78,59,0.08)]">
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-emerald-700 tracking-tight">HomeHero</span>
            </div>
            <div className="h-8 w-[1px] bg-[#bccac0]/30"></div>
            <span className="text-[18px] font-medium text-[#3d4a42]">Checkout</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a className="flex items-center gap-2 text-emerald-600 border-b-2 border-emerald-600 pb-1 font-semibold text-[14px]" href="#home">
              <span className="material-symbols-outlined">home</span>
            </a>
            <a className="flex items-center gap-2 text-slate-600 hover:text-emerald-600 transition-all font-semibold text-[14px]" href="#notifications">
              <span className="material-symbols-outlined">notifications</span>
            </a>
            <a className="flex items-center gap-2 text-slate-600 hover:text-emerald-600 transition-all font-semibold text-[14px]" href="#profile">
              <span className="material-symbols-outlined">account_circle</span>
            </a>
          </nav>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-grow pt-32 pb-[80px] px-[32px] flex justify-center">
        <div className="w-full max-w-3xl">
          
          {/* Main Informational Header */}
          <div className="mb-[48px]">
            <h1 className="text-[40px] font-bold text-[#191c1e] tracking-[-0.02em] leading-[1.2] mb-2">Book Your Professional</h1>
            <p className="text-[18px] text-[#3d4a42] leading-[1.6]">Complete the details below to schedule your gardening service.</p>
          </div>

          <div className="space-y-[24px]">
            
            {/* Professional Summary Information */}
            <section className="bg-white p-[24px] rounded-xl border border-[#bccac0] shadow-sm transition-all hover:shadow-md">
              <div className="flex items-center gap-[24px]">
                <div className="w-16 h-16 bg-[#adedd3] flex items-center justify-center rounded-full">
                  <span className="material-symbols-outlined text-[#306d58] text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    person
                  </span>
                </div>
                <div>
                  <p className="text-[12px] uppercase tracking-wider text-[#3d4a42] font-medium">Booking for</p>
                  <h2 className="text-[24px] font-semibold text-[#191c1e] leading-[1.4]">Aruna Perera</h2>
                  <p className="text-[14px] font-semibold text-[#006948]">Gardening</p>
                </div>
              </div>
            </section>

            {/* Input Details Block */}
            <section className="bg-white p-[24px] rounded-xl border border-[#bccac0] shadow-sm transition-all duration-200">
              <div className="flex items-center gap-2 mb-[12px]">
                <span className="material-symbols-outlined text-[#006948]">edit_note</span>
                <h3 className="text-[24px] font-semibold text-[#191c1e]">Request Details</h3>
              </div>
              <textarea 
                className="w-full p-[24px] border border-[#bccac0] rounded-lg focus:ring-2 focus:ring-[#006948] focus:border-[#006948] bg-[#f2f4f6] transition-all outline-none" 
                id="instructions" 
                placeholder="Please describe the specifics of the job here..." 
                rows="4"
                value={requestDetails}
                onChange={(e) => setRequestDetails(e.target.value)}
              />
            </section>

            {/* DateTime Selection Blocks */}
            <section className="bg-white p-[24px] rounded-xl border border-[#bccac0] shadow-sm">
              <div className="flex items-center gap-2 mb-[12px]">
                <span className="material-symbols-outlined text-[#006948]">schedule</span>
                <h3 className="text-[24px] font-semibold text-[#191c1e]">Reserve time slot</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
                <div className="flex flex-col gap-[4px]">
                  <label className="block text-[14px] font-semibold text-[#3d4a42]" htmlFor="booking-date">
                    Select Date
                  </label>
                  <div className="relative">
                    <input 
                      className="w-full pr-10 Atlantic pl-[24px] py-3 border border-[#bccac0] rounded-lg focus:ring-2 focus:ring-[#006948] focus:border-[#006948] bg-[#f2f4f6] transition-all outline-none" 
                      id="booking-date" 
                      placeholder="MM/DD/YYYY" 
                      type="date" 
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-[4px]">
                  <label className="block text-[14px] font-semibold text-[#3d4a42]" htmlFor="booking-time">
                    Select Time
                  </label>
                  <div className="relative">
                    <input 
                      className="w-full px-[24px] py-3 border border-[#bccac0] rounded-lg focus:ring-2 focus:ring-[#006948] focus:border-[#006948] bg-[#f2f4f6] transition-all outline-none" 
                      id="booking-time" 
                      type="time"
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Address Input & Simulated Map UI */}
            <section className="bg-white p-[24px] rounded-xl border border-[#bccac0] shadow-sm overflow-hidden">
              <div className="flex items-center gap-2 mb-[12px]">
                <span className="material-symbols-outlined text-[#006948]">location_on</span>
                <h3 className="text-[24px] font-semibold text-[#191c1e]">Service Location</h3>
              </div>
              
              <div className="mb-[24px]">
                <label className="block text-[14px] font-semibold text-[#3d4a42] mb-[4px]" htmlFor="address">
                  Home Address
                </label>
                <div className="relative">
                  <input 
                    className="w-full pl-10 pr-[24px] py-3 border border-[#bccac0] rounded-lg focus:ring-2 focus:ring-[#006948] focus:border-[#006948] bg-[#f2f4f6] transition-all outline-none" 
                    id="address" 
                    type="text" 
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#6d7a72]">
                    search
                  </span>
                </div>
              </div>

              {/* Digital Map Representation Container */}
              <div className="relative h-64 w-full rounded-lg overflow-hidden bg-[#eceef0]">
                <img 
                  alt="Map preview of service location" 
                  className="w-full h-full object-cover grayscale-[20%]" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDz6UPsCtpJVd3HrpUqXLszr7UT3LRpoJYNWADOqgqleza0eyWASxBr0JiMqd0BIAsFBwcUTpbkE5zUJXgx61YduiLcgyYUWESReehYDNYUqCIFJ85jlWmuLcEPCw4JtiL7ZmHm77_2rGVT8u3X-v23YMP22xcwrbgU_gUtAK2M9dHgihYG3xI9jJK3iFb60GZv8EtWOau9uultyeSqVFRK3hyZg6dOawy61uZ_or9m2wr0x_RB-eFP9aUNYQ5onRTU8C09BPtVAxA"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="bg-[#006948] text-white p-2 rounded-full shadow-lg">
                    <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                      location_on
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Dynamic Submission Component Trigger Button */}
            <button 
              onClick={handleConfirmBooking}
              className="w-full bg-[#006948] text-white py-5 rounded-xl text-[24px] font-semibold hover:bg-[#00855d] transition-all active:scale-[0.98] duration-150 shadow-lg shadow-[#006948]/20 flex items-center justify-center gap-[24px]"
            >
              <span>Confirm Booking</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>

          </div>
        </div>
      </main>

      {/* Footer Interface Element */}
      <footer className="w-full rounded-t-2xl bg-slate-50 border-t border-slate-200">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 max-w-7xl mx-auto space-y-4 md:space-y-0">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-emerald-700">HomeHero</span>
            </div>
            <p className="text-slate-500 font-['Inter'] text-sm">
              © 2024 HomeHero Gardening. Trusted Care for your home.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <a className="text-slate-500 hover:text-emerald-600 underline underline-offset-4 transition-opacity font-['Inter'] text-sm" href="#services">Services</a>
            <a className="text-slate-500 hover:text-emerald-600 underline underline-offset-4 transition-opacity font-['Inter'] text-sm" href="#providers">Top Providers</a>
            <a className="text-slate-500 hover:text-emerald-600 underline underline-offset-4 transition-opacity font-['Inter'] text-sm" href="#pro">Join as Pro</a>
            <a className="text-slate-500 hover:text-emerald-600 underline underline-offset-4 transition-opacity font-['Inter'] text-sm" href="#privacy">Privacy Policy</a>
            <a className="text-slate-500 hover:text-emerald-600 underline underline-offset-4 transition-opacity font-['Inter'] text-sm" href="#terms">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}