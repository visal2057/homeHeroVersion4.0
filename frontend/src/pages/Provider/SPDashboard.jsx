import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SPDashboard = () => {
  const [isOnline, setIsOnline] = useState(false);

  return (
    <div className="bg-background text-on-surface">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full hidden lg:flex flex-col w-64 border-r border-slate-200 bg-white z-50">
        <div className="px-6 py-8">
          <span className="text-xl font-black text-primary">HomeHero</span>
          <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mt-1">Verified Provider</p>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-emerald-700 font-semibold border-r-4 border-emerald-600 bg-emerald-50 rounded-lg">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="font-label-bold text-label-bold">Dashboard</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg transition-colors">
            <span className="material-symbols-outlined">pending_actions</span>
            <span className="font-label-bold text-label-bold">Requests</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg transition-colors">
            <span className="material-symbols-outlined">assignment</span>
            <span className="font-label-bold text-label-bold">Jobs to do</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg transition-colors">
            <span className="material-symbols-outlined">task_alt</span>
            <span className="font-label-bold text-label-bold">Completed jobs</span>
          </a>
          <Link 
            to="/provider/subscription" 
            className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg transition-colors"
          >
            <span className="material-symbols-outlined">task_alt</span>
            <span className="font-label-bold text-label-bold">Subscription</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-40 w-full flex justify-between items-center px-6 py-3 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-black text-emerald-600">Dashboard</h1>
            <div className="hidden md:flex relative items-center">
              <span className="material-symbols-outlined absolute left-3 text-slate-400">search</span>
              <input className="pl-10 pr-4 py-2 bg-surface-container-low border-none rounded-full text-sm focus:ring-2 focus:ring-emerald-500 w-64" placeholder="Search tasks or clients..." type="text" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-500 hover:text-emerald-600">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="p-2 text-slate-500 hover:text-emerald-600">
              <span className="material-symbols-outlined">settings</span>
            </button>
            <div className="h-8 w-px bg-slate-200 mx-2"></div>
            <div className="flex items-center gap-3">
              <span className="font-label-bold text-label-bold text-slate-700">Suresh Fonseka</span>
              <img alt="User avatar" className="w-8 h-8 rounded-full border border-slate-200" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCj7t4yLGpVLWAuuBQV0_WTuEw_r5LDZxxescQ6tI-Tu4uf7PLAZhgwqt_PPDV0kRjSpaK6TzzwzEETsOQyx0nKNL4Dir14haPbtiIFne1Y6I5E5uNoHnG0PiMiI20kEAS4JlCuqg9Ewnc_x36szGDjJ74EZhA6veTJbCJeUdJVlP35H9vBouQB5dc9MWxY520xJgm1h3wfqgA6q87VsdbmBpHJOR6rmGGIPKPh1tE8OLSW_ePvTzQcTcUaZ9l8DJXruWJGJwQsMW0" />
            </div>
          </div>
        </header>

        <div className="p-gutter lg:p-margin space-y-md">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between bg-white p-6 rounded-2xl border border-slate-200 shadow-sm gap-6">
            <div className="flex items-center gap-5">
              <div className="relative">
                <img alt="Suresh Fonseka" className="w-20 h-20 rounded-full object-cover border-4 border-emerald-50 shadow-inner" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCj7t4yLGpVLWAuuBQV0_WTuEw_r5LDZxxescQ6tI-Tu4uf7PLAZhgwqt_PPDV0kRjSpaK6TzzwzEETsOQyx0nKNL4Dir14haPbtiIFne1Y6I5E5uNoHnG0PiMiI20kEAS4JlCuqg9Ewnc_x36szGDjJ74EZhA6veTJbCJeUdJVlP35H9vBouQB5dc9MWxY520xJgm1h3wfqgA6q87VsdbmBpHJOR6rmGGIPKPh1tE8OLSW_ePvTzQcTcUaZ9l8DJXruWJGJwQsMW0" />
                <div className={`absolute bottom-1 right-1 w-5 h-5 border-2 border-white rounded-full ${isOnline ? 'bg-emerald-500' : 'bg-gray-400'}`}></div>
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-900">Suresh Fonseka</h2>
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
              className={`px-8 py-3 rounded-xl font-bold transition-all shadow-lg flex items-center gap-2 ${isOnline ? 'bg-gray-500 hover:bg-gray-600' : 'bg-emerald-600 hover:bg-emerald-700'} text-white`}
            >
              <span className="material-symbols-outlined text-sm">{isOnline ? 'power_settings_new' : 'online_prediction'}</span>
              {isOnline ? 'Go Offline' : 'Go Online'}
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-md">
            <div className="lg:col-span-4 glass-card p-md rounded-xl flex flex-col justify-between shadow-sm border border-emerald-100 bg-white">
              <h2 className="font-h3 text-h3 text-slate-900">Performance</h2>
              <div className="mt-8 flex items-end justify-between">
                <div>
                  <div className="flex items-center gap-1 text-emerald-600">
                    <span className="text-5xl font-black">4.9</span>
                    <span className="material-symbols-outlined text-3xl">star</span>
                  </div>
                  <p className="text-slate-600 font-body-md mt-2">Average Rating</p>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-bold text-slate-800">128</span>
                  <p className="text-slate-600 font-body-md">Jobs Done</p>
                </div>
              </div>
              <div className="mt-8 h-2 bg-emerald-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-600 w-[94%]"></div>
              </div>
              <p className="text-xs text-emerald-600 font-semibold mt-2">Top 5% of providers this month</p>
            </div>

            <div className="lg:col-span-8 bg-primary p-md rounded-xl text-white relative overflow-hidden shadow-lg">
              <div className="relative z-10 h-full flex flex-col justify-between">
                <span className="bg-primary-container/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-primary-fixed w-fit">Category Spotlight</span>
                <h2 className="font-h2 text-h2 mt-4 max-w-md">Featured Providers in Handywork</h2>
              </div>
            </div>
          </div>

          {/* Requests Section */}
          <div className="lg:col-span-12 space-y-4">
            <h3 className="font-h3 text-h3 text-slate-900">New Requests</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Request Card 1 */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-start">
                  <div className="flex gap-3">
                    <img alt="Sarah J." className="w-10 h-10 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDs7HgW65-g1Oa_JOd3nNe2SYbDcUYoHefQyUWAYiujE_EsLGxiK1XA3UJAyv6LM8BJE2ZT9OXmxcQj8iPbsm50yoP_MWaL92VZep9AXfO-LBoeevwmKuqT5JL01DSONikoRIR-krj06cyfi7ryy2KKU1prpdrDaLwEYOUrjXsj3q3BBbZhphjOgKhGKBJjvZ3D-OE-g4X7QSx4V1K53Oxf4yltRML1Q6br2CBKlq9BgnW-RTevwXFbZlp1U8bcpYSG6FMAckrstPs" />
                    <div>
                      <p className="font-label-bold text-label-bold text-slate-900">Sarah Jenkins</p>
                      <p className="text-xs text-slate-500">2.4 miles away</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-semibold text-slate-700">Door Frame Alignment</p>
                  <p className="text-xs text-slate-500 mt-1">Main entrance door is sticking at the bottom after the recent rain.</p>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-5">
                  <button className="py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700">Accept</button>
                  <button className="py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-50">Decline</button>
                </div>
              </div>

              {/* Request Card 2 */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-start">
                  <div className="flex gap-3">
                    <img alt="Michael R." className="w-10 h-10 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvlt_0U6EfUaKYdgGqgMbosRUP9DeU5gCnXvxe1IwZ0Mdu3gt5F2wWrAK9-dWeBEB0jZybpIAMbIrINFdqQyq2iKvcw0-Aywno1RqdOLdK3PI56dUGkEc9iEUzr2ZFZfVjz9qBpyNw5V2sGVIh-JHK-4fvu57UqgRdvAdnmpl69eIRKW-0HsdbBtE50xFfr2PESwtwyt29ReFZIQrmxFb_RzdO7v8sjLNcsTG7WJ3eU8RjYmDtPiSdvl1ZcUrGvkDDqloJcUO0LwA" />
                    <div>
                      <p className="font-label-bold text-label-bold text-slate-900">Michael Ross</p>
                      <p className="text-xs text-slate-500">0.8 miles away</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-semibold text-slate-700">TV Wall Mounting</p>
                  <p className="text-xs text-slate-500 mt-1">Need a 65" OLED mounted on a brick wall.</p>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-5">
                  <button className="py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700">Accept</button>
                  <button className="py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-50">Decline</button>
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