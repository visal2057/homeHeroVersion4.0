import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../components/AuthContext'; // Read directly from our new shared session context

const SPDashboard = () => {
  const { user, logout } = useAuth(); // Destructure state variables and utility lifecycle metrics
  const [isOnline, setIsOnline] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Fallback structural details for user attributes if fields are empty
  const providerName = user?.name || user?.username || "Suresh Fonseka";
  const providerAvatar = user?.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80";

  return (
    <div className="bg-background text-on-surface">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full hidden lg:flex flex-col w-64 border-r border-slate-200 bg-white z-50">
        <div className="px-6 py-8">
          <span className="text-xl font-black text-emerald-600">HomeHero</span>
          <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mt-1">Verified Provider</p>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-emerald-700 font-semibold border-r-4 border-emerald-600 bg-emerald-50 rounded-lg">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="text-sm font-bold">Dashboard</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg transition-colors">
            <span className="material-symbols-outlined">pending_actions</span>
            <span className="text-sm font-bold">Requests</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg transition-colors">
            <span className="material-symbols-outlined">assignment</span>
            <span className="text-sm font-bold">Jobs to do</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg transition-colors">
            <span className="material-symbols-outlined">task_alt</span>
            <span className="text-sm font-bold">Completed jobs</span>
          </a>
          <Link 
            to="/provider/subscription" 
            className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg transition-colors"
          >
            <span className="material-symbols-outlined">credit_card</span>
            <span className="text-sm font-bold">Subscription</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-40 w-full flex justify-between items-center px-6 py-3 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-black text-slate-800">Dashboard</h1>
            <div className="hidden md:flex relative items-center">
              <span className="material-symbols-outlined absolute left-3 text-slate-400">search</span>
              <input className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-full text-sm focus:ring-2 focus:ring-emerald-500 w-64 outline-none" placeholder="Search tasks or clients..." type="text" />
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
            
            {/* Account Bubble Dropdown Component */}
            <div className="relative">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-3 focus:outline-none cursor-pointer hover:opacity-90 transition-opacity"
              >
                <span className="text-sm font-bold text-slate-700 hidden sm:inline-block">{providerName}</span>
                <img alt="User avatar" className="w-8 h-8 rounded-full border border-slate-200 object-cover" src={providerAvatar} />
              </button>

              {/* Dropdown Options Menu */}
              {isDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)}></div>
                  
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-lg py-1 z-20 transition-all">
                    <a 
                      href="#profile" 
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 font-medium transition-colors"
                    >
                      <span className="material-symbols-outlined text-base text-slate-400">person</span>
                      Profile Settings
                    </a>
                    <hr className="border-slate-100" />
                    <button 
                      onClick={() => {
                        setIsDropdownOpen(false);
                        logout(); // Seamlessly clears session state data maps and redirects
                      }}
                      className="w-full text-left flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 font-semibold transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-base text-red-400">logout</span>
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {/* Profile Card Summary Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between bg-white p-6 rounded-2xl border border-slate-200 shadow-sm gap-6">
            <div className="flex items-center gap-5">
              <div className="relative">
                <img alt={providerName} className="w-20 h-20 rounded-full object-cover border-4 border-emerald-50 shadow-inner" src={providerAvatar} />
                <div className={`absolute bottom-1 right-1 w-5 h-5 border-2 border-white rounded-full ${isOnline ? 'bg-emerald-500' : 'bg-gray-400'}`}></div>
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-900">{providerName}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="flex items-center gap-1 text-emerald-600 font-bold text-sm">
                    <span className="material-symbols-outlined text-sm">star</span> 4.9
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-500 text-sm font-medium">Handywork Specialist</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-emerald-600 text-sm font-bold">Verified</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOnline(!isOnline)}
              className={`px-8 py-3 rounded-xl font-bold transition-all shadow-md flex items-center gap-2 ${isOnline ? 'bg-slate-500 hover:bg-slate-600' : 'bg-emerald-600 hover:bg-emerald-700'} text-white`}
            >
              <span className="material-symbols-outlined text-sm">{isOnline ? 'power_settings_new' : 'online_prediction'}</span>
              {isOnline ? 'Go Offline' : 'Go Online'}
            </button>
          </div>

          {/* Metrics Overview Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4 p-6 rounded-xl flex flex-col justify-between shadow-sm border border-emerald-100 bg-white">
              <h2 className="text-lg font-bold text-slate-900">Performance</h2>
              <div className="mt-8 flex items-end justify-between">
                <div>
                  <div className="flex items-center gap-1 text-emerald-600">
                    <span className="text-5xl font-black">4.9</span>
                    <span className="material-symbols-outlined text-3xl">star</span>
                  </div>
                  <p className="text-slate-600 text-sm mt-2">Average Rating</p>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-bold text-slate-800">128</span>
                  <p className="text-slate-600 text-sm">Jobs Done</p>
                </div>
              </div>
              <div className="mt-8 h-2 bg-emerald-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-600 w-[94%]"></div>
              </div>
              <p className="text-xs text-emerald-600 font-semibold mt-2">Top 5% of providers this month</p>
            </div>

            <div className="lg:col-span-8 bg-emerald-600 p-6 rounded-xl text-white relative overflow-hidden shadow-md flex flex-col justify-between">
              <div>
                <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-white w-fit">Category Spotlight</span>
                <h2 className="text-3xl font-bold mt-4 max-w-md">Featured Providers in Handywork</h2>
              </div>
            </div>
          </div>

          {/* Customer Booking Requests List Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900">New Requests</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Request Card 1 */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-start">
                  <div className="flex gap-3">
                    <img alt="Sarah J." className="w-10 h-10 rounded-full object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" />
                    <div>
                      <p className="text-sm font-bold text-slate-900">Sarah Jenkins</p>
                      <p className="text-xs text-slate-500">2.4 miles away</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-semibold text-slate-700">Door Frame Alignment</p>
                  <p className="text-xs text-slate-500 mt-1">Main entrance door is sticking at the bottom after recent rainfall transitions.</p>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-5">
                  <button className="py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 transition-colors">Accept</button>
                  <button className="py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-50 transition-colors">Decline</button>
                </div>
              </div>

              {/* Request Card 2 */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-start">
                  <div className="flex gap-3">
                    <img alt="Michael R." className="w-10 h-10 rounded-full object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" />
                    <div>
                      <p className="text-sm font-bold text-slate-900">Michael Ross</p>
                      <p className="text-xs text-slate-500">0.8 miles away</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-semibold text-slate-700">TV Wall Mounting</p>
                  <p className="text-xs text-slate-500 mt-1">Need a 65" OLED mounted clean on a target structural brick face wall.</p>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-5">
                  <button className="py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 transition-colors">Accept</button>
                  <button className="py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-50 transition-colors">Decline</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SPDashboard;