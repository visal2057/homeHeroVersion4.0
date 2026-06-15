import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const RegisteredHome = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [notifDrawerOpen, setNotifDrawerOpen] = useState(false);
  const [displayName, setDisplayName] = useState('Valued Client');

  useEffect(() => {
    try {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const userObj = JSON.parse(userStr);
        if (userObj && userObj.username) {
          setDisplayName(userObj.username);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const notifications = [
    { icon: "event_available", title: "Booking Confirmed", message: "Your gardening session with Aruna is set for tomorrow.", time: "2 mins ago", unread: true },
    { icon: "chat_bubble", title: "New Message", message: "Suresh has sent you a message regarding your AC repair.", time: "1 hour ago", unread: true },
    { icon: "alarm", title: "Reminder", message: "Your petcare booking is starting in 2 hours.", time: "1 hour ago", unread: false }
  ];

  return (
    <div className="bg-background font-body-md text-on-background antialiased relative min-h-screen">
      {/* Header */}
      <header className="sticky top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          <Link to="/" className="text-2xl font-black tracking-tighter text-emerald-600">HomeHero</Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/explore" className="text-emerald-600 border-b-2 border-emerald-600 pb-1 font-semibold">Services</Link>
            <Link to="/about" className="text-slate-600 hover:text-emerald-600 transition-colors">About us</Link>
            <Link to="/careers" className="text-slate-600 hover:text-emerald-600 transition-colors">Careers</Link>
            <Link to="/contact" className="text-slate-600 hover:text-emerald-600 transition-colors">Contact us</Link>
          </nav>
          <div className="flex items-center gap-4 relative">
            <Link to="/dashboard" className="p-2 text-slate-600 hover:text-emerald-600 transition-colors">
              <span className="material-symbols-outlined">home</span>
            </Link>
            
            <div className="relative">
              <button 
                onClick={() => { setNotifDrawerOpen(!notifDrawerOpen); setDrawerOpen(false); }} 
                className="p-2 text-slate-600 hover:text-emerald-600 transition-colors relative flex items-center"
              >
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              
              {/* Notification Dropdown */}
              {notifDrawerOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl border shadow-2xl z-[70] flex flex-col overflow-hidden text-left">
                  <div className="p-4 border-b">
                    <h3 className="text-sm font-bold text-slate-800">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    <ul className="divide-y">
                      {notifications.map((notif, idx) => (
                        <li key={idx} className={`p-4 hover:bg-gray-50 cursor-pointer flex gap-3 ${notif.unread ? 'bg-emerald-50/30' : ''}`}>
                          <span className="material-symbols-outlined text-emerald-600 shrink-0">{notif.icon}</span>
                          <div>
                            <p className="text-sm text-slate-700"><span className="font-semibold">{notif.title}:</span> {notif.message}</p>
                            <p className="text-[11px] text-slate-400 mt-1">{notif.time}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <button 
              onClick={() => { setDrawerOpen(!drawerOpen); setNotifDrawerOpen(false); }} 
              className="p-2 text-slate-600 hover:text-emerald-600 transition-colors flex items-center"
            >
              <span className="material-symbols-outlined">account_circle</span>
            </button>
          </div>
        </div>
      </header>

      {/* Account Drawer */}
      {drawerOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-[60]" onClick={() => setDrawerOpen(false)}></div>
          <aside className="fixed right-6 top-20 w-72 bg-white rounded-2xl border shadow-2xl z-[60] flex flex-col">
            <div className="p-6 flex flex-col items-start gap-3 border-b">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <span className="material-symbols-outlined text-2xl">account_circle</span>
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-800">{displayName}</h2>
                  <p className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">PREMIUM MEMBER</p>
                </div>
              </div>
            </div>
            <nav className="py-4">
              <ul>
                <li className="px-3">
                  <Link to="/profile" onClick={() => setDrawerOpen(false)} className="flex items-center gap-3 px-4 py-3 text-emerald-700 bg-emerald-50 font-medium rounded-xl">
                    <span className="material-symbols-outlined text-sm">person</span>
                    <span className="text-sm">My Profile</span>
                  </Link>
                </li>
                <li className="px-3">
                  <Link to="/my-bookings" onClick={() => setDrawerOpen(false)} className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl">
                    <span className="material-symbols-outlined text-sm">calendar_today</span>
                    <span className="text-sm">My Bookings</span>
                  </Link>
                </li>
                <li className="px-3">
                  <Link to="/checkout" onClick={() => setDrawerOpen(false)} className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl">
                    <span className="material-symbols-outlined text-sm">payments</span>
                    <span className="text-sm">Payment Methods</span>
                  </Link>
                </li>
                <li className="px-3 mt-4 border-t pt-4">
                  <Link to="/login" onClick={() => { localStorage.clear(); setDrawerOpen(false); }} className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl">
                    <span className="material-symbols-outlined text-sm">logout</span>
                    <span className="text-sm font-semibold">Log Out</span>
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="p-4 border-t text-center">
              <p className="text-[10px] font-medium text-slate-400 uppercase">HOMEHERO V2.4.0</p>
            </div>
          </aside>
        </>
      )}

      <main>
        {/* Hero Section */}
        <section className="relative h-[640px] w-full flex items-center justify-center overflow-hidden">
          <img 
            alt="Professional Gardener at work" 
            className="absolute inset-0 w-full h-full object-cover object-center" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvUan3L5hh0oj9qtXcKAVjxAk5tzND6kP45QZsEKsxx2CgMflMWtsu3ZbodO3l9ow6QWHFZili1U2fJKc3_SzPkr3EutgT3GXUiJ4jb8VTFTXq9M29dzMNuFCChKI7OFsawCeJ_GrcaS_n3sIufjS85rfkngY1F1l8Zztok8y2bhBlhmtXA2QEttJ4DXj-4IO0ofO-chyyo8lVxavk1bXknEx4ETdSr2kIqQqF-GZj_-5pkSqoL3RQ0x8H5RZ1-Hf2X7fAnpUeDRU"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10"></div>
          <div className="relative z-10 w-full max-w-4xl px-6 text-center">
            <h1 className="font-h1 text-h1 text-white mb-md drop-shadow-md text-4xl md:text-5xl font-bold">Expert Care for Your Home</h1>
            <p className="max-w-2xl mx-auto text-white text-lg md:text-xl font-body-lg leading-relaxed drop-shadow-sm mb-md mt-4">
              HomeHero connects homeowners with a network of trusted and verified professionals for all your household needs.
            </p>
          </div>
        </section>

        {/* Service Grid */}
        <section className="py-xl py-16 max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-lg mb-8">
            <div>
              <h2 className="font-h2 text-h2 text-emerald-700 text-3xl font-bold mb-2">Our Services</h2>
              <p className="font-body-md text-slate-500">Professional assistance for every corner of your house.</p>
            </div>
            <Link to="/explore" className="text-emerald-600 font-label-bold flex items-center gap-2 hover:underline">
              View All Services <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-md gap-6">
            {[
              { icon: "potted_plant", name: "Gardening", desc: "Pruning, planting, and lawn maintenance." },
              { icon: "build", name: "Handiwork", desc: "Mounting, fixing, and light assemblies." },
              { icon: "ac_unit", name: "AC Repair", desc: "Cooling maintenance and expert repairs." },
              { icon: "cleaning_services", name: "Cleaning", desc: "Deep cleans and recurring home care." },
              { icon: "pets", name: "Petcare", desc: "Professional walking and home sitting." }
            ].map((service, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center text-center group hover:shadow-md transition-all">
                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-emerald-600 text-3xl">{service.icon}</span>
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">{service.name}</h3>
                <p className="text-sm text-slate-500">{service.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="max-w-7xl mx-auto px-6 mb-xl pb-16">
          <div className="bg-[#006948] rounded-3xl p-12 text-center relative overflow-hidden">
            <h2 className="text-4xl font-bold text-white mb-4 relative z-10">Ready to start?</h2>
            <p className="text-emerald-100 text-body-lg mb-8 max-w-xl mx-auto opacity-90 relative z-10">
              Join thousands of homeowners who trust HomeHero for their daily maintenance.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center relative z-10">
              <Link to="/explore" className="bg-white text-[#006948] px-10 py-4 rounded-full font-semibold text-lg hover:bg-slate-50 transition-all shadow-xl block text-center">
                Get Started
              </Link>
              <Link to="/contact" className="border border-white/30 text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all block text-center">
                Talk to an Expert
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t bg-slate-50 border-t-slate-200 text-sm text-slate-500">
        <div className="flex flex-col md:flex-row justify-between items-center py-12 px-6 max-w-7xl mx-auto gap-6">
          <div className="flex flex-col gap-2">
            <div className="text-xl font-bold text-emerald-700">HomeHero</div>
            <p>© 2026 HomeHero. Trusted Care for Every Home.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <Link to="/about" className="hover:text-emerald-600 hover:underline">About Us</Link>
            <Link to="/terms" className="hover:text-emerald-600 hover:underline">Terms of Service</Link>
            <Link to="/privacy" className="hover:text-emerald-600 hover:underline">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-emerald-600 hover:underline">Help Center</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RegisteredHome;