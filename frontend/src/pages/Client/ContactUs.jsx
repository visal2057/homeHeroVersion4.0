import React from 'react';
import { Link } from 'react-router-dom';

const ContactUs = () => {
  return (
    <div className="bg-background text-on-surface font-body-md antialiased">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b shadow-sm">
        <div className="flex justify-between items-center max-w-7xl mx-auto px-6 h-16">
          <Link to="/" className="text-2xl font-black text-emerald-600">HomeHero</Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/services" className="text-sm font-medium text-slate-600 hover:text-emerald-600">Services</Link>
            <Link to="/about" className="text-sm font-medium text-slate-600 hover:text-emerald-600">About us</Link>
            <Link to="/careers" className="text-sm font-medium text-slate-600 hover:text-emerald-600">Careers</Link>
            <Link to="/contact" className="text-sm font-bold border-b-2 border-emerald-600 pb-1 text-emerald-600">Contact us</Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link to="/" className="p-2 rounded-full hover:bg-emerald-50"><span className="material-symbols-outlined text-slate-600">home</span></Link>
            <Link to="/notifications" className="p-2 rounded-full hover:bg-emerald-50"><span className="material-symbols-outlined text-slate-600">notifications</span></Link>
            <Link to="/profile" className="p-2 rounded-full hover:bg-emerald-50"><span className="material-symbols-outlined text-slate-600">account_circle</span></Link>
          </div>
        </div>
      </header>

      <main className="pt-16">
        {/* Hero */}
        <section className="relative bg-gray-100 h-[400px] overflow-hidden flex items-center">
          <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
            <h1 className="text-5xl font-bold text-emerald-600 mb-4">We're here to help</h1>
            <p className="text-lg max-w-3xl mx-auto text-gray-600">Whether you have a question about our services, need technical support, or just want to share some feedback, our team is ready to assist you.</p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Form */}
              <div className="lg:col-span-7 bg-white p-8 rounded-2xl border shadow-sm">
                <h2 className="text-3xl font-bold mb-6">Send us a message</h2>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="block font-semibold text-sm mb-1">Full Name</label><input className="w-full p-3 border rounded-lg" placeholder="John Doe" type="text" /></div>
                    <div><label className="block font-semibold text-sm mb-1">Email Address</label><input className="w-full p-3 border rounded-lg" placeholder="john@example.com" type="email" /></div>
                  </div>
                  <div><label className="block font-semibold text-sm mb-1">Subject</label><input className="w-full p-3 border rounded-lg" placeholder="How can we help?" type="text" /></div>
                  <div><label className="block font-semibold text-sm mb-1">Message</label><textarea className="w-full p-3 border rounded-lg" placeholder="Tell us more about your inquiry..." rows="6"></textarea></div>
                  <button className="bg-emerald-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-emerald-700 flex items-center gap-2">Send Message <span className="material-symbols-outlined">send</span></button>
                </form>
              </div>
              {/* Info Cards */}
              <div className="lg:col-span-5 space-y-4">
                <div className="p-6 bg-emerald-100 rounded-2xl flex items-start gap-4">
                  <div className="bg-white p-3 rounded-xl"><span className="material-symbols-outlined text-emerald-600 text-3xl">support_agent</span></div>
                  <div><h3 className="font-semibold text-lg">Support Email</h3><p className="font-semibold">support@homehero.com</p><p className="text-xs mt-1">Response within 24 hours</p></div>
                </div>
                <div className="p-6 bg-white rounded-2xl border flex items-start gap-4">
                  <div className="bg-gray-100 p-3 rounded-xl"><span className="material-symbols-outlined text-emerald-600 text-3xl">call</span></div>
                  <div><h3 className="font-semibold text-lg">Phone Number</h3><p className="font-semibold">+94 777 000-1111</p><p className="text-xs mt-1">Mon-Fri, 9am - 6pm EST</p></div>
                </div>
                <div className="p-6 bg-white rounded-2xl border flex items-start gap-4">
                  <div className="bg-gray-100 p-3 rounded-xl"><span className="material-symbols-outlined text-emerald-600 text-3xl">location_on</span></div>
                  <div><h3 className="font-semibold text-lg">Office Address</h3><p className="text-gray-600">278, High Level Road, Maharagama, Sri Lanka</p></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xl font-bold text-emerald-700">HomeHero</div>
          <p className="text-sm text-gray-500">© 2024 HomeHero. Trusted Care for Every Home.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-sm text-gray-500 hover:text-emerald-600">Privacy Policy</Link>
            <Link to="/terms" className="text-sm text-gray-500 hover:text-emerald-600">Terms of Service</Link>
            <Link to="/help" className="text-sm text-gray-500 hover:text-emerald-600">Help Center</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContactUs;