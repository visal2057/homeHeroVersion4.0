import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/AuthContext';

const Requests = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const providerName = user?.full_name || user?.name || user?.username || "Suresh Fonseka";
  const providerAvatar = user?.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80";

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const requests = [
    { id: 1, client: 'Sarah Jenkins', service: 'Gardening', date: 'Oct 24, 2023', time: '10:00 AM - 12:30 PM', location: 'Brookside, Riverside Dr.', rating: 4.9, bookings: 24, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxxTNBcjK5Gl5LUna32MCU2xosZ7-03vsRZbHHR3T7264xY1smt2ppFNTYN_a9-XCBRVNi6TeI0smywNq8jSJg2LH_N0yuZbItGNeLLyC0SrS-ao5poscKNvHHSIKX9eUDtZvapqNnEjOplSDr5NDmt7i9R3dsx69i4uu7wCTz4VMSwN3LLA0vW0a2zgcrLNQ4FQdnUAMx9bOyLy6dBn0wT_exZlzfgA7e26p8sj2--nv7PNfp7NSd5YGa1muw744y-chdFr7qab0', details: 'Looking for lawn mowing and hedge trimming for our front yard. We have a medium-sized lawn and some flowering bushes.' },
    { id: 2, client: 'Michael Chen', service: 'Deep Cleaning', date: 'Oct 25, 2023', time: '02:00 PM - 05:00 PM', location: 'Oakwood Tower, Apt 4C', rating: 5.0, bookings: 8, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKhZ9IyntShM8fRcdV_fceRszQ7IL6L7rJbjsrodyea4_JD1P5UHzushuBVar1u6kPnkmB0gfXy0S9fa_BlQN7zxVjEs8M55dfnIERry0xYxH3Kj4aZ7jmOgacegvDTG5xh_--1gk7FVLCJVp0U0YjRljscICr9IYBVUZ39cA3ZJRcRaI8njZxcf_hD8llWLony1N2rgToqk09ELpQPBXXrCi236yWmcspld8jILkJlkWhPOEW7aQwO9D_GED7EzyXUbJOZvasLjE', details: 'Full apartment deep clean including windows and kitchen appliances. We have a small dog, so eco-friendly products are preferred.' },
    { id: 3, client: 'Elena Rodriguez', service: 'Gardening', date: 'Oct 26, 2023', time: '08:00 AM - 09:30 AM', location: '72 Garden Villas', rating: 0, bookings: 0, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpLyYqy7NwViZrBty8YGdL2XSWjVfww4GdtBzEUA9Vyad4aQ3WcDHhnO8yH5sGTq3n-fegTigxVAMg56JpC3Co2uA5YVG8NU6o6sZlkH50K_U-AKt0CLIUaxavU4EEWjYNLq4cbTnIjFW56-bWFJ7xeWEcv_kSBfXX31eqCSSpYZNj6AZCwPTRDCwaRT2z6feteucsuDt3G8NLoxIVrfh3Yr8_jiHTVmqVLCrE2nYpJbYO7iuGO5owFeGR4yFlNwkJiLgqngvmyLs', details: 'Need help with regular patio plant maintenance and some soil revitalization for indoor palms. First time using the service!' }
  ];

  return (
    <div className="bg-background text-on-surface">
      {/* ===== SIDEBAR ===== */}
      <aside className="fixed left-0 top-0 h-full hidden lg:flex flex-col w-64 border-r border-slate-200 bg-white z-50">
        <div className="px-6 py-8">
          <Link to="/provider/dashboard" className="text-xl font-black text-emerald-600">HomeHero</Link>
          <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mt-1">Verified Provider</p>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <Link to="/provider/dashboard" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg transition-colors">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="text-sm font-bold">Dashboard</span>
          </Link>
          <Link to="/provider/requests" className="flex items-center gap-3 px-4 py-3 text-emerald-700 font-semibold border-r-4 border-emerald-600 bg-emerald-50 rounded-lg">
            <span className="material-symbols-outlined">pending_actions</span>
            <span className="text-sm font-bold">Requests</span>
          </Link>
          <Link to="/provider/jobs" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg transition-colors">
            <span className="material-symbols-outlined">calendar_month</span>
            <span className="text-sm font-bold">Jobs to do</span>
          </Link>
          <Link to="/provider/completed" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg transition-colors">
            <span className="material-symbols-outlined">assignment_turned_in</span>
            <span className="text-sm font-bold">Completed jobs</span>
          </Link>
          <Link to="/provider/subscription" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg transition-colors">
            <span className="material-symbols-outlined">credit_card</span>
            <span className="text-sm font-bold">Subscription</span>
          </Link>
          <Link 
             to="/sprofile" 
                      className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg transition-colors"
                    >
                      <span className="material-symbols-outlined">person</span>
                      <span className="text-sm font-bold">Profile</span>
                    </Link>
        </nav>
        <div className="p-4 border-t border-slate-200">
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full">
            <span className="material-symbols-outlined">logout</span>
            <span className="text-sm font-bold">Logout</span>
          </button>
        </div>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <main className="lg:ml-64 min-h-screen">
        {/* ===== HEADER ===== */}
        <header className="sticky top-0 z-40 w-full flex justify-between items-center px-6 py-3 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-black text-slate-800">Pending Requests</h1>
            <div className="hidden md:flex relative items-center">
              <span className="material-symbols-outlined absolute left-3 text-slate-400">search</span>
              <input className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-full text-sm focus:ring-2 focus:ring-emerald-500 w-64 outline-none" placeholder="Search requests..." type="text" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-500 hover:text-emerald-600 transition-colors">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="p-2 text-slate-500 hover:text-emerald-600 transition-colors">
              <span className="material-symbols-outlined">settings</span>
            </button>
            <div className="h-8 w-px bg-slate-200 mx-2"></div>
            
            <div className="relative">
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center gap-3 focus:outline-none cursor-pointer hover:opacity-90 transition-opacity">
                <span className="text-sm font-bold text-slate-700 hidden sm:inline-block">{providerName}</span>
                <img alt="User avatar" className="w-8 h-8 rounded-full border border-slate-200 object-cover" src={providerAvatar} />
              </button>
              {isDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)}></div>
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-lg py-1 z-20 transition-all">
                    <Link to="/sprofile" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 font-medium transition-colors">
                      <span className="material-symbols-outlined text-base text-slate-400">person</span>
                      Profile Settings
                    </Link>
                    <hr className="border-slate-100" />
                    <button onClick={handleLogout} className="w-full text-left flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 font-semibold transition-colors cursor-pointer">
                      <span className="material-symbols-outlined text-base text-red-400">logout</span>
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* ===== CONTENT ===== */}
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-black text-slate-900">Pending Requests</h2>
              <p className="text-slate-500 text-sm">Review and manage your incoming service bookings.</p>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full">4 New Requests</span>
              <span className="px-3 py-1 bg-slate-100 text-slate-500 text-xs font-bold rounded-full">Updated 2m ago</span>
            </div>
          </div>

          {/* Requests List */}
          <div className="space-y-4">
            {requests.map((req) => (
              <div key={req.id} className="relative bg-white rounded-xl border border-slate-200 p-6 flex flex-col md:flex-row items-start md:items-center gap-6 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/5 hover:border-emerald-200 overflow-hidden group">
                <div className="flex items-center gap-4 flex-1">
                  <div className="relative">
                    <img alt={req.client} className="w-14 h-14 rounded-full object-cover" src={req.image} />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-600 border-2 border-white rounded-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-[10px] text-white" style={{ fontVariationSettings: '"FILL" 1' }}>check_circle</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900">{req.client}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 font-bold text-xs rounded">{req.service}</span>
                      {req.rating > 0 && (
                        <span className="text-slate-500 text-xs flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm">star</span> {req.rating} ({req.bookings} bookings)
                        </span>
                      )}
                      {req.rating === 0 && (
                        <span className="text-slate-500 text-xs flex items-center gap-1">New Client</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-6 flex-[2]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-emerald-600">
                      <span className="material-symbols-outlined">calendar_today</span>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wider">Date</p>
                      <p className="font-bold text-sm">{req.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-emerald-600">
                      <span className="material-symbols-outlined">schedule</span>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wider">Time</p>
                      <p className="font-bold text-sm">{req.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-emerald-600">
                      <span className="material-symbols-outlined">location_on</span>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wider">Location</p>
                      <p className="font-bold text-sm">{req.location}</p>
                    </div>
                  </div>
                </div>
                {/* Hover Actions */}
                <div className="absolute inset-0 bg-white/95 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-between px-10 pointer-events-none group-hover:pointer-events-auto">
                  <div className="max-w-md">
                    <p className="font-bold text-emerald-600 mb-1">Request Details</p>
                    <p className="text-slate-500 text-sm italic">"{req.details}"</p>
                  </div>
                  <div className="flex gap-4">
                    <button className="px-6 py-2.5 rounded-xl border-2 border-red-500 text-red-500 font-bold hover:bg-red-50 transition-colors">Reject</button>
                    <button className="px-8 py-2.5 rounded-xl bg-emerald-600 text-white font-bold shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all">Approve</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200">
            <p className="text-xs text-slate-500">Showing 3 of 4 pending requests</p>
            <div className="flex gap-2">
              <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-emerald-600 text-white font-bold">1</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Requests;