import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/AuthContext';

const JobsToDo = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const providerName = user?.full_name || user?.name || user?.username || "Suresh Fonseka";
  const providerAvatar = user?.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80";

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const jobs = [
    { id: 1, client: 'Sarah Mitchell', service: 'Garden Maintenance & Hedge Trimming', time: 'Today, 09:30 AM', location: 'Brookline, MA (1.2 miles away)', badge: 'Repeat Client', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5n_IzVwxcLOsvpKbrIYdoxPMg7Lg4V_364M-2EO5nIvooY2Z4Wfiz4EIxQ9iki-6XsOs_XZTfa9vIRAkhL0CCppyV1tEBo4i1tAjuhEKZSh_-AxVO_KEhLiS-XHuBVhCrFV3SbgMIJ0GWtOtX3JulQfxX860GYEDAgCBaQdAzAsUR_BZV2eFghcKGAndnDVoU2piV113_PyMANH6DB7BKGCBSCDTGbQsWn0r8YuhN2tXEF0sXGU4sH8E7pjjpa33BS0_bj4Jkj0Y' },
    { id: 2, client: 'David Chen', service: 'Furniture Assembly: Bedroom Suite', time: 'Today, 02:00 PM', location: 'Cambridge, MA (4.5 miles away)', badge: 'Priority', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArN8fycdUymYYjTbQmL1fZGQT8tYUK3DuLdxKoHQSOy2FaKD2C_doNJJzneVzke29E1n86yGv7BEMkw4uwAZl-qPSFk826Q1gz9yD1i_xFolBxVEmmq3Yiu4a6KzOBPqteeCSZonoeCNFgEc2XmR083uzdahxgubzfluSR5chcMd7ksklQkMtdc_Te_9gO5UvRiQ1JG-XPWT70rOLr0hVvO20-1D4YiT4TidREp5mbYY6K3qO0QX_fA3CNf9kx_pP7DzZJbIJebQY' },
    { id: 3, client: 'Elena Rodriguez', service: 'Kitchen Deep Clean & Sanitization', time: 'Today, 06:30 PM', location: 'Somerville, MA (3.8 miles away)', badge: '', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCS9EC9RlNKbvrtp-sKJj4Oc9b-WodNul-9MxZV0KJ0xb3RfbMqvhBf5e1Aspk141IC1gI1BrLVfPFuumTfhEA19dOCS3kpWr3KnJAY1Euru580RuiT77D_gJxlavJghD2Yr3kqRB4mEIo6fkSIwK1VQRxlZUt3rmC2r2PabS3Mc7vXIwhTJZ4Y5eiQBYT6RDsc2Hj6wxOebsJ_rqxTA4himcIUCa9aIBrGBWUo1g7Noe_-UfEumA2iZIxsa3oDghPiqdsYT3LpJQU' }
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
          <Link to="/provider/requests" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg transition-colors">
            <span className="material-symbols-outlined">pending_actions</span>
            <span className="text-sm font-bold">Requests</span>
          </Link>
          <Link to="/provider/jobs" className="flex items-center gap-3 px-4 py-3 text-emerald-700 font-semibold border-r-4 border-emerald-600 bg-emerald-50 rounded-lg">
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
            <h1 className="text-lg font-black text-slate-800">Jobs to Do</h1>
            <div className="hidden md:flex relative items-center">
              <span className="material-symbols-outlined absolute left-3 text-slate-400">search</span>
              <input className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-full text-sm focus:ring-2 focus:ring-emerald-500 w-64 outline-none" placeholder="Search jobs..." type="text" />
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
              <h2 className="text-3xl font-black text-slate-900">Jobs to Do</h2>
              <p className="text-slate-500 text-sm">Track the tasks you have accepted to do.</p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors">
                <span className="material-symbols-outlined text-lg">calendar_today</span>
                Calendar View
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors">
                <span className="material-symbols-outlined text-lg">filter_list</span>
                Filter
              </button>
            </div>
          </div>

          {/* Jobs List */}
          <div className="space-y-4">
            {jobs.map((job) => (
              <div key={job.id} className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 flex flex-col md:flex-row gap-6 items-center hover:border-emerald-200 transition-all group">
                <div className="flex-shrink-0 relative">
                  <img alt={job.client} className="w-16 h-16 rounded-full object-cover ring-4 ring-emerald-50" src={job.image} />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-xs" style={{ fontVariationSettings: '"FILL" 1' }}>verified</span>
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
                    <h3 className="text-xl font-bold text-slate-900">{job.client}</h3>
                    {job.badge && (
                      <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-wider rounded">{job.badge}</span>
                    )}
                  </div>
                  <h4 className="text-lg font-semibold text-emerald-900 mb-1">{job.service}</h4>
                  <div className="flex items-center gap-4 mt-2 justify-center md:justify-start">
                    <div className="flex items-center gap-1 text-xs text-slate-400">
                      <span className="material-symbols-outlined text-sm">location_on</span>
                      {job.location}
                    </div>
                  </div>
                </div>
                <div className="md:w-px h-12 bg-slate-100 hidden md:block mx-4"></div>
                <div className="flex flex-col items-center md:items-end gap-4 min-w-[160px]">
                  <div className="text-center md:text-right">
                    <div className="text-emerald-600 font-bold text-lg leading-tight">{job.time}</div>
                  </div>
                  <button className="w-full md:w-auto px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg shadow-md shadow-emerald-900/10 transition-all active:scale-95 flex items-center justify-center gap-2 text-sm">
                    <span className="material-symbols-outlined text-lg">play_arrow</span>
                    Finish Job
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default JobsToDo;