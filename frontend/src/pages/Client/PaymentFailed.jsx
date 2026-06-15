import React from 'react';
import { Link } from 'react-router-dom';

const PaymentFailed = () => {
  return (
    <div className="bg-surface font-body-md text-on-surface flex flex-col min-h-screen antialiased">
      {/* Header */}
      <header className="fixed top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b shadow-sm">
        <div className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
          <Link to="/" className="text-2xl font-black text-emerald-600">HomeHero</Link>
          <div className="flex items-center gap-4">
            <Link to="/help" className="text-gray-500 font-medium hover:bg-emerald-50 px-3 py-2 rounded-lg">Help</Link>
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold">JD</div>
          </div>
        </div>
      </header>

      <main className="flex-grow pt-32 pb-20 px-6 bg-gradient-to-b from-red-50/20 to-transparent flex flex-col items-center justify-center">
        <div className="max-w-2xl w-full flex flex-col items-center text-center space-y-6">
          {/* Error Icon */}
          <div className="relative">
            <div className="absolute inset-0 bg-red-500 opacity-10 blur-3xl rounded-full"></div>
            <div className="relative w-24 h-24 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg">
              <span className="material-symbols-outlined text-5xl">error</span>
            </div>
          </div>

          {/* Headline */}
          <div className="space-y-2">
            <h1 className="text-5xl font-bold text-gray-900">Payment Failed</h1>
            <p className="text-lg text-gray-500 max-w-md mx-auto">We couldn't process your payment. Please check your details and try again.</p>
          </div>

          {/* Summary Card */}
          <div className="w-full mt-6 bg-white p-6 rounded-xl border shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
            <h3 className="font-semibold text-sm uppercase tracking-widest text-gray-500 mb-4 text-left">Transaction Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div><span className="text-sm text-gray-500">Service</span><p className="font-semibold">Home Cleaning</p></div>
              <div><span className="text-sm text-gray-500">Attempted Amount</span><p className="font-bold text-red-500 text-xl">LKR 9,350.00</p></div>
              <div><span className="text-sm text-gray-500">Transaction ID</span><p className="font-semibold">#HH-827495</p></div>
              <div><span className="text-sm text-gray-500">Date</span><p className="font-semibold">October 24, 2024</p></div>
            </div>
            <div className="mt-4 pt-4 border-t flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center"><span className="material-symbols-outlined text-red-500">report</span></div>
              <div className="text-left"><p className="font-semibold">Failure Reason</p><p className="text-sm text-red-500">Reason: Insufficient Funds</p></div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-6 w-full max-w-md">
            <button className="w-full py-4 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 flex items-center justify-center gap-2">Try Again</button>
            <button className="w-full py-4 bg-transparent border hover:bg-gray-100 text-emerald-600 font-semibold rounded-xl flex items-center justify-center gap-2">Support</button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-gray-200 mt-auto bg-gray-50">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 py-8 max-w-7xl mx-auto gap-4">
          <div className="text-lg font-bold text-emerald-900">HomeHero</div>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/services" className="text-sm text-gray-500 hover:text-emerald-600">Services</Link>
            <Link to="/help" className="text-sm text-gray-500 hover:text-emerald-600">Help Center</Link>
            <Link to="/privacy" className="text-sm text-gray-500 hover:text-emerald-600">Privacy Policy</Link>
            <Link to="/terms" className="text-sm text-gray-500 hover:text-emerald-600">Terms</Link>
          </div>
          <div className="text-sm text-gray-600">© 2024 HomeHero. Trusted Care.</div>
        </div>
      </footer>
    </div>
  );
};

export default PaymentFailed;