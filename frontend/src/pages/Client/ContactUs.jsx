import React from 'react';
import { Link } from 'react-router-dom';

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-background text-on-background font-['Inter'] antialiased w-full overflow-x-hidden">
      
      {/* ===== HEADER ===== */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-outline-variant shadow-sm h-16">
        <div className="flex justify-between items-center px-4 md:px-8 h-full max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <Link to="/" className="text-xl font-black tracking-tighter text-primary">HomeHero</Link>
            <div className="h-6 w-px bg-outline-variant mx-2 hidden sm:block"></div>
            <span className="text-sm font-medium text-on-surface-variant hidden sm:block">Contact Us</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/dashboard/account" className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors">Home</Link>
            <Link to="/about" className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors">About us</Link>
            <Link to="/careers" className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors">Careers</Link>
            <Link to="/contact" className="text-sm font-medium text-primary border-b-2 border-primary pb-1">Contact us</Link>
          </nav>
          
        </div>
      </header>

      {/* ===== MAIN CONTENT ===== */}
      <main className="w-full pt-16">
        
        {/* ===== HERO SECTION ===== */}
        <section className="relative min-h-[400px] md:min-h-[450px] w-full flex items-center justify-center overflow-hidden">
          <img 
            alt="Contact HomeHero" 
            className="absolute inset-0 w-full h-full object-cover object-center" 
            src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&w=1200&q=80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/20"></div>
          <div className="relative z-10 w-full max-w-4xl px-6 text-center">
            <div className="inline-block bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/20 mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-white/90">Get in Touch</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 drop-shadow-lg">
              We're here to <br className="hidden sm:inline" />
              <span className="text-emerald-300">help</span>
            </h1>
            <p className="max-w-2xl mx-auto text-white/90 text-base md:text-lg leading-relaxed drop-shadow-md">
              Whether you have a question about our services, need technical support, or just want to share some feedback, our team is ready to assist you.
            </p>
          </div>
        </section>

        {/* ===== CONTACT SECTION ===== */}
        <section className="py-16 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* ===== FORM ===== */}
            <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-2xl border border-surface-container shadow-sm">
              <h2 className="text-2xl md:text-3xl font-bold text-on-surface mb-6">Send us a message</h2>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-sm text-on-surface-variant mb-1">Full Name</label>
                    <input 
                      className="w-full p-3 border border-outline-variant rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-surface-container-low" 
                      placeholder="" 
                      type="text" 
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-sm text-on-surface-variant mb-1">Email Address</label>
                    <input 
                      className="w-full p-3 border border-outline-variant rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-surface-container-low" 
                      placeholder="" 
                      type="email" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-semibold text-sm text-on-surface-variant mb-1">Subject</label>
                  <input 
                    className="w-full p-3 border border-outline-variant rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-surface-container-low" 
                    placeholder="How can we help?" 
                    type="text" 
                  />
                </div>
                <div>
                  <label className="block font-semibold text-sm text-on-surface-variant mb-1">Message</label>
                  <textarea 
                    className="w-full p-3 border border-outline-variant rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-surface-container-low" 
                    placeholder="Tell us more about your inquiry..." 
                    rows="6"
                  ></textarea>
                </div>
                <button className="bg-primary text-on-primary font-semibold px-8 py-3 rounded-full hover:bg-primary-container hover:text-on-primary-container transition-all flex items-center gap-2 shadow-sm">
                  Send Message <span className="material-symbols-outlined text-sm">send</span>
                </button>
              </form>
            </div>

            {/* ===== INFO CARDS ===== */}
            <div className="lg:col-span-5 space-y-4">
              {/* Support Email */}
              <div className="p-6 bg-primary-fixed rounded-2xl flex items-start gap-4 border border-primary/20 hover:shadow-md transition-all">
                <div className="bg-white p-3 rounded-xl shadow-sm">
                  <span className="material-symbols-outlined text-primary text-3xl">support_agent</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-on-surface">Support Email</h3>
                  <p className="font-semibold text-primary">support@homehero.com</p>
                  <p className="text-xs text-on-surface-variant mt-1">Response within 24 hours</p>
                </div>
              </div>

              {/* Phone Number */}
              <div className="p-6 bg-white rounded-2xl border border-surface-container flex items-start gap-4 hover:border-primary/40 hover:shadow-md transition-all">
                <div className="bg-surface-container-low p-3 rounded-xl">
                  <span className="material-symbols-outlined text-primary text-3xl">call</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-on-surface">Phone Number</h3>
                  <p className="font-semibold text-primary">+94 777 000-1111</p>
                  <p className="text-xs text-on-surface-variant mt-1">Mon-Fri, 9am - 6pm EST</p>
                </div>
              </div>

              {/* Office Address */}
              <div className="p-6 bg-white rounded-2xl border border-surface-container flex items-start gap-4 hover:border-primary/40 hover:shadow-md transition-all">
                <div className="bg-surface-container-low p-3 rounded-xl">
                  <span className="material-symbols-outlined text-primary text-3xl">location_on</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-on-surface">Office Address</h3>
                  <p className="text-on-surface-variant">278, High Level Road, Maharagama, Sri Lanka</p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="p-6 bg-white rounded-2xl border border-surface-container flex items-start gap-4 hover:border-primary/40 hover:shadow-md transition-all">
                <div className="bg-surface-container-low p-3 rounded-xl">
                  <span className="material-symbols-outlined text-primary text-3xl">schedule</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-on-surface">Working Hours</h3>
                  <p className="text-on-surface-variant">Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p className="text-on-surface-variant">Saturday: 10:00 AM - 2:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="bg-white border-t border-outline-variant">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <Link to="/" className="text-lg font-bold text-primary">HomeHero</Link>
              <p className="text-on-surface-variant text-sm mt-1">© 2024 HomeHero. All rights reserved.</p>
            </div>
            <nav className="flex flex-wrap justify-center gap-6">
              <Link to="/privacy" className="text-on-surface-variant hover:text-primary transition-colors text-sm">Privacy Policy</Link>
              <Link to="/terms" className="text-on-surface-variant hover:text-primary transition-colors text-sm">Terms of Service</Link>
              <Link to="/contact" className="text-on-surface-variant hover:text-primary transition-colors text-sm">Contact</Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContactUs;