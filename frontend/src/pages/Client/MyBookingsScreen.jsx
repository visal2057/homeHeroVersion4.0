import React from 'react';
import { Link } from 'react-router-dom';

const MyBookingsScreen = () => {
  const upcomingBookings = [
    { id: 1, service: "General Gardening", date: "Oct 24, 2024 • 09:00 AM", provider: "Aruna Perera", status: "Confirmed", icon: "yard" },
    { id: 2, service: "Leak Repair", date: "Oct 28, 2024 • 02:30 PM", provider: "Pending Assignment", status: "Pending", icon: "plumbing" }
  ];
  const recentHistory = [
    { service: "Full House Clean", date: "Oct 12 • Completed", icon: "cleaning_services" },
    { service: "Electrical Check", date: "Sept 30 • Completed", icon: "bolt" },
    { service: "Termite Inspection", date: "Sept 15 • Completed", icon: "pest_control" }
  ];

  return (
    <div className="bg-background text-on-background font-body-md">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="flex justify-between items-center px-8 h-20 w-full max-w-[1280px] mx-auto">
          <div className="flex items-center gap-2">
            <Link to="/" className="text-2xl font-bold text-emerald-600">HomeHero</Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="flex items-center gap-1 text-gray-600 hover:text-emerald-600"><span className="material-symbols-outlined">home</span></Link>
            <Link to="/notifications" className="flex items-center gap-1 text-gray-600 hover:text-emerald-600"><span className="material-symbols-outlined">notifications</span></Link>
            <Link to="/profile" className="flex items-center gap-1 text-gray-600 hover:text-emerald-600"><span className="material-symbols-outlined">account_circle</span></Link>
          </nav>
        </div>
      </header>

      <main className="pt-24 pb-12 max-w-[1280px] mx-auto px-8">
        {/* Welcome Banner */}
        <section className="flex items-center gap-4 bg-white border border-emerald-600 p-4 rounded-xl mb-6 mt-4">
          <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
            <span className="material-symbols-outlined text-emerald-600 text-3xl">person</span>
          </div>
          <h2 className="text-2xl font-semibold">Welcome Suresh Fonseka!</h2>
        </section>

        {/* My Bookings Header */}
        <section className="pb-6 pt-2">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Bookings</h1>
          <p className="text-lg text-gray-500">Manage your scheduled services and view your care history.</p>
        </section>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Upcoming Bookings */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-3xl font-bold">Upcoming Bookings</h2>
              <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-semibold">2 Active</span>
            </div>
            {upcomingBookings.map(booking => (
              <div key={booking.id} className="bg-white border rounded-xl p-4 shadow-sm hover:border-emerald-500 transition-all">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-lg bg-emerald-50 flex items-center justify-center">
                      <span className="material-symbols-outlined text-emerald-600 text-3xl">{booking.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold">{booking.service}</h3>
                      <div className="flex items-center gap-2 text-gray-500 mt-1"><span className="material-symbols-outlined text-sm">event</span> {booking.date}</div>
                      <div className="flex items-center gap-2 text-gray-500"><span className="material-symbols-outlined text-sm">person</span> Provider: {booking.provider}</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${booking.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-600'}`}>{booking.status}</span>
                    <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700">View Details</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent History */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-3xl font-bold">Recent History</h2>
              <Link to="/history" className="text-emerald-600 text-sm font-semibold hover:underline">See All</Link>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 border space-y-4">
              {recentHistory.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 pb-4 border-b last:border-0">
                  <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center">
                    <span className="material-symbols-outlined text-emerald-600">{item.icon}</span>
                  </div>
                  <div className="flex-grow">
                    <p className="font-semibold">{item.service}</p>
                    <p className="text-sm text-gray-500">{item.date}</p>
                  </div>
                  <span className="material-symbols-outlined text-emerald-600">chevron_right</span>
                </div>
              ))}
            </div>
            {/* Stats Card */}
            <div className="bg-emerald-600 p-6 rounded-xl text-white relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-sm opacity-80 uppercase tracking-wider">Completed Services</p>
                <h4 className="text-5xl font-bold mt-2">12</h4>
              </div>
              <span className="material-symbols-outlined absolute -bottom-4 -right-4 text-8xl opacity-10">task_alt</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-gray-100 border-t mt-12">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 py-6 w-full max-w-[1280px] mx-auto gap-4">
          <div className="flex flex-col gap-1 items-center md:items-start">
            <span className="text-xl font-bold text-emerald-700">HomeHero</span>
            <p className="text-sm text-gray-500">© 2024 HomeHero. Trusted Care for Every Home.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/privacy" className="text-sm text-gray-500 hover:text-emerald-600">Privacy Policy</Link>
            <Link to="/terms" className="text-sm text-gray-500 hover:text-emerald-600">Terms of Service</Link>
            <Link to="/help" className="text-sm text-gray-500 hover:text-emerald-600">Help Center</Link>
            <Link to="/contact" className="text-sm text-gray-500 hover:text-emerald-600">Contact Us</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MyBookingsScreen;