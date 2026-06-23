import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/AuthContext';

const CompletedJobs = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const providerName = user?.full_name || user?.name || user?.username || "Suresh Fonseka";
  const providerAvatar = user?.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80";

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const completedJobs = [
    { id: 1, client: 'Sarah Jenkins', service: 'Garden Maintenance', date: 'Oct 22, 2023', rating: 5.0, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAoVSKX3b6q1NDFwSuYoYR0zzlHHLOEzFjGiXrrL7Yuqds5fB7Wwv6o_BnYulKrGRRUy33zkv33fAhNByxPJ481NyYNTnQnnaL_3O2jJjw3dpvsroi54mjp2MTMgDs6uXLUvOBEiiABL3uPw4NBfWi3vMWGHvekQ3nBRMGysgfDtELuB93fHQ4kVNP-8dCoMaxW5Ov1H9_9Z5mdwWwnHR2LvPm88hVWZavC4D8hxvPcJMjKP2e3DQqmmY83ImWen_j5zmulRlyY-vw' },
    { id: 2, client: 'Michael Chen', service: 'Kitchen Deep Clean', date: 'Oct 19, 2023', rating: 4.8, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoydMou0JThFplzHOUywlv9nE34B2WxZfeS3orOEVCvJ9XD3o7fTtOMddyRVhVVXC12miGPH0YiAxTXlH4m-5KYOumYkkstJ8U8L_8xFqrLR4hSRDzUAGr3oEV4tGoGdhrKIgDjehRHDPE-G-eJ_V-2fXPQWhvOJWuWqVGztUkeBrBb3RK_nI6zVIkYUFVPXPh-so5oMpiS0opqIeplIdVT1yvrO4BGQOTevxsmgThxMCvE1_hBmt-v8Xd_AIls46pc0Duc9aC8mw' },
    { id: 3, client: 'Emily Rodriguez', service: 'Plumbing Repair', date: 'Oct 15, 2023', rating: 5.0, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8S3LT5DkMOMmeJPPbLmtiKDDuE3UoC3XJLt31SQlLsKQY73l9UwArCuw5dY4YZlRSI2hdf6uyPjGnXPIIeiBjmNUDq-5m9CBAMO6c-qeLsBgV2t4QlgeNMWDTOPwgy0YsVor7V15fgVtrkYn-3SS-QJVta5RWD8g1A9_60Q4E384ofvPwBe3AajdXIvh5TN4pxDfB3zmvyEm5RLe-qcB-XUX2QIzF7rH8T9gqg0mvqWk7EzKotKRgGgBgOGwLt6mSkd0xg1r_lq0' },
    { id: 4, client: 'David Miller', service: 'Electrical Setup', date: 'Oct 10, 2023', rating: 4.5, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAtEUTSW2eih9SMG7974FH6qQ8sLkFvYXwhZltvls_jWuusCyK4_qSvmozTfj5QPBLYUwnTlQWtUyBzX2qBOS9TMDyVtdTLx0rJ8BVZLpTJxpVezUsCTRuXEZADDsYZSxwYBZBkYzm9eCKmQ45JHxgzb9nnG65XRPbI-qav453PDUjMqN-qsgR4SHmHemUrJw70OvvGMuga98NIlRJ1QVF2Euj4BhemPsQcOVmmj-ZHuoQ48XvnLZoV6OJr45nWbs2b9ZpRrq5Qe8' }
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
          <Link to="/provider/jobs" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg transition-colors">
            <span className="material-symbols-outlined">calendar_month</span>
            <span className="text-sm font-bold">Jobs to do</span>
          </Link>
          <Link to="/provider/completed" className="flex items-center gap-3 px-4 py-3 text-emerald-700 font-semibold border-r-4 border-emerald-600 bg-emerald-50 rounded-lg">
            <span className="material-symbols-outlined">star</span>
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
            <h1 className="text-lg font-black text-slate-800">Completed Jobs</h1>
            <div className="hidden md:flex relative items-center">
              <span className="material-symbols-outlined absolute left-3 text-slate-400">search</span>
              <input className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-full text-sm focus:ring-2 focus:ring-emerald-500 w-64 outline-none" placeholder="Search completed jobs..." type="text" />
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
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-slate-200 shadow-sm">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Jobs Completed</p>
              <p className="text-3xl font-black text-slate-900 mt-2">154</p>
              <span className="text-slate-500 text-xs font-semibold flex items-center mt-2">Avg. 4.2 jobs per week</span>
            </div>
            <div className="bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-slate-200 shadow-sm">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Client Satisfaction</p>
              <p className="text-3xl font-black text-slate-900 mt-2">4.9/5.0</p>
              <div className="flex items-center gap-0.5 mt-2">
                {[1,2,3,4,5].map((i) => (
                  <span key={i} className="material-symbols-outlined text-amber-400 text-xl" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                ))}
              </div>
            </div>
            <div className="bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-slate-200 shadow-sm">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Earnings</p>
              <p className="text-3xl font-black text-slate-900 mt-2">LKR 45,200</p>
              <span className="text-slate-500 text-xs font-semibold flex items-center mt-2">↑ 12% from last month</span>
            </div>
          </div>

          {/* Completed Jobs List */}
          <div className="space-y-3">
            {completedJobs.map((job) => (
              <div key={job.id} className="bg-white p-4 rounded-xl border border-slate-200 hover:shadow-md transition-shadow flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4 w-full md:w-1/3">
                  <div className="h-12 w-12 rounded-full overflow-hidden flex-shrink-0">
                    <img alt={job.client} className="w-full h-full object-cover" src={job.image} />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-slate-900">{job.client}</p>
                    <p className="text-xs text-slate-500">Service: {job.service}</p>
                  </div>
                </div>
                <div className="flex flex-col items-center w-full md:w-1/3">
                  <p className="text-xs text-slate-400">Completed On</p>
                  <p className="text-sm font-medium text-slate-900">{job.date}</p>
                </div>
                <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-1/3">
                  <div className="flex items-center gap-1">
                    <p className="font-bold text-sm text-slate-900">{job.rating}</p>
                    <span className="material-symbols-outlined text-amber-400 text-xl" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                  </div>
                  <button className="px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-bold hover:bg-emerald-100 transition-colors">View Details</button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-4 pt-4">
            <button className="p-2 border border-slate-200 rounded-lg text-slate-400 hover:text-primary transition-colors">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-lg bg-primary text-white font-bold text-sm">1</button>
              <button className="w-10 h-10 rounded-lg hover:bg-slate-100 text-slate-600 font-bold text-sm">2</button>
              <button className="w-10 h-10 rounded-lg hover:bg-slate-100 text-slate-600 font-bold text-sm">3</button>
            </div>
            <button className="p-2 border border-slate-200 rounded-lg text-slate-400 hover:text-primary transition-colors">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CompletedJobs;