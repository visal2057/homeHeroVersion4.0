import React from 'react';
import { Link } from 'react-router-dom';

const BookingRequest = () => {
  return (
    <div className="bg-background font-body-md text-on-surface antialiased overflow-x-hidden">
      <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b shadow-sm">
        <nav className="flex justify-between items-center px-6 md:px-12 h-20 w-full max-w-7xl mx-auto">
          <Link to="/" className="text-2xl font-black tracking-tighter text-emerald-600">HomeHero</Link>
          <div className="flex items-center gap-4">
            <Link to="/" className="p-2 text-slate-600 hover:text-emerald-600"><span className="material-symbols-outlined">home</span></Link>
            <Link to="/notifications" className="p-2 text-slate-600 hover:text-emerald-600 relative"><span className="material-symbols-outlined">notifications</span><span className="absolute top-2 right-2 w-2 h-2 bg-emerald-600 rounded-full"></span></Link>
            <Link to="/profile" className="p-2 text-emerald-600 font-bold border-b-2 border-emerald-600"><span className="material-symbols-outlined">person</span></Link>
          </div>
        </nav>
      </header>

      <main className="pt-[120px] pb-20 min-h-screen flex flex-col items-center px-6 max-w-7xl mx-auto">
        <div className="text-center w-full max-w-2xl mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 mb-4 rounded-full bg-emerald-100 text-emerald-600 shadow-md">
            <span className="material-symbols-outlined text-5xl">check_circle</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Booking Request Sent!</h1>
          <p className="text-lg text-gray-500 max-w-lg mx-auto">Your request has been sent to Aruna Perera. They are currently reviewing your request.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full max-w-6xl">
          {/* Summary */}
          <div className="lg:col-span-7 bg-white border p-6 rounded-xl shadow-sm">
            <h3 className="text-2xl font-semibold mb-6">Service Details</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"><div className="w-20 h-20 rounded-lg bg-white flex items-center justify-center"><span className="material-symbols-outlined text-4xl text-emerald-600">build</span></div><div><p className="text-xs text-emerald-600 uppercase mb-1">Service Name</p><p className="text-xl font-semibold">Gardening</p></div></div>
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"><div className="w-20 h-20 rounded-lg bg-white flex items-center justify-center"><span className="material-symbols-outlined text-5xl text-emerald-600">person</span></div><div><p className="text-xs text-emerald-600 uppercase mb-1">Provider</p><p className="text-xl font-semibold">Aruna Perera</p><div className="flex items-center gap-1 mt-1 text-yellow-500"><span className="material-symbols-outlined text-sm">star</span><span className="text-sm text-gray-500">4.9 (124 reviews)</span></div></div></div>
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"><div className="w-20 h-20 rounded-lg bg-white flex items-center justify-center"><span className="material-symbols-outlined text-4xl text-emerald-600">calendar_today</span></div><div><p className="text-xs text-emerald-600 uppercase mb-1">Appointment Slot</p><p className="text-xl font-semibold">Thursday, Oct 24th, 2024</p><p className="text-sm text-gray-500 mt-1">09:00 AM - 11:30 AM</p></div></div>
            </div>
          </div>

          {/* Timeline */}
          <div className="lg:col-span-5 bg-white border p-6 rounded-xl shadow-sm">
            <h3 className="text-2xl font-semibold mb-6">Booking Status</h3>
            <div className="relative pl-10 space-y-8 py-4">
              <div className="absolute left-5 top-2 bottom-6 w-0.5 bg-gray-200"><div className="absolute top-0 w-full h-1/2 bg-emerald-600"></div></div>
              <div className="relative"><div className="absolute -left-10 w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center z-10 border-4 border-white shadow-sm"><span className="material-symbols-outlined text-sm">check</span></div><div><h4 className="font-semibold text-emerald-600 text-lg">Request Sent</h4><p className="text-sm text-gray-500 mt-1">Today, 2:45 PM</p></div></div>
              <div className="relative"><div className="absolute -left-10 w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center z-10 border-4 border-white shadow-sm animate-pulse"><span className="material-symbols-outlined text-sm">hourglass_empty</span></div><div><h4 className="font-semibold text-gray-900 text-lg">Provider Reviewing</h4><p className="text-sm text-gray-500 mt-1">Aruna is checking their availability.</p></div></div>
              <div className="relative opacity-40"><div className="absolute -left-10 w-10 h-10 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center z-10 border-4 border-white shadow-sm"><span className="material-symbols-outlined text-sm">event_available</span></div><div><h4 className="font-semibold text-gray-500 text-lg">Final Confirmation</h4><p className="text-sm text-gray-500 mt-1">Booking scheduled upon approval.</p></div></div>
            </div>
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-dashed"><p className="text-sm text-gray-500 italic flex items-center gap-2"><span className="material-symbols-outlined text-sm">info</span> Estimated response time: <span className="font-bold text-emerald-600">under 2 hours</span></p></div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-12 w-full max-w-xl mx-auto">
          <button className="flex-1 bg-emerald-600 text-white font-semibold px-6 py-4 rounded-xl hover:bg-emerald-700 shadow-md">View My Bookings</button>
          <button className="flex-1 bg-white border-2 border-emerald-600 text-emerald-600 font-semibold px-6 py-4 rounded-xl hover:bg-emerald-50">Back to Home</button>
        </div>
      </main>

      <footer className="w-full border-t bg-white mt-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-6 py-12 max-w-7xl mx-auto">
          <div><span className="text-xl font-bold text-emerald-600 mb-4 block">HomeHero</span><p className="text-gray-500">Making professional home maintenance effortless for everyone.</p></div>
          <div><h5 className="font-bold mb-4">Company</h5><ul><li><Link to="/about" className="text-gray-500 hover:text-emerald-600">About Us</Link></li><li><Link to="/careers" className="text-gray-500 hover:text-emerald-600">Careers</Link></li></ul></div>
          <div><h5 className="font-bold mb-4">Support</h5><ul><li><Link to="/help" className="text-gray-500 hover:text-emerald-600">Help Center</Link></li><li><Link to="/contact" className="text-gray-500 hover:text-emerald-600">Contact Us</Link></li></ul></div>
          <div><h5 className="font-bold mb-4">Legal</h5><ul><li><Link to="/terms" className="text-gray-500 hover:text-emerald-600">Terms of Service</Link></li><li><Link to="/privacy" className="text-gray-500 hover:text-emerald-600">Privacy Policy</Link></li></ul></div>
        </div>
        <div className="px-6 py-6 border-t text-center"><p className="text-gray-500">© 2024 HomeHero. Trusted Care for Every Home.</p></div>
      </footer>
    </div>
  );
};

export default BookingRequest;