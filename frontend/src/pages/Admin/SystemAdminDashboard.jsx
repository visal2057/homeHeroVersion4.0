import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for handling redirect delays
import { GlobalToast } from '../../components/GlobalToast'; // Named import as requested

function SystemAdminDashboard() {
  const navigate = useNavigate();

  // State for dynamic admin profile data
  const [adminName, setAdminName] = useState('System Admin');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // State for PostgreSQL records
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State to control your global notification alert popup
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // Hook to pull data automatically from your Node server
  useEffect(() => {
    // Read the logged-in admin username from localStorage (defaults to 'sys_admin')
    const savedName = localStorage.getItem('adminUsername') || 'sys_admin';
    setAdminName(savedName);

    fetch('http://localhost:5000/api/admin/complaints')
      .then((res) => {
        if (!res.ok) throw new Error('Database server connection error');
        return res.json();
      })
      .then((data) => {
        setComplaints(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Custom handler to run smooth toast logic before routing back to sign in
  const handleLogout = () => {
    // 1. Clear any local sessions
    localStorage.removeItem('adminUsername');

    // 2. Mount the toast AND make it visible to fire the Tailwind animation
    setToast({
      show: true,
      isVisible: true,
      message: 'Logging out...',
      type: 'success'
    });

    // 3. Start fade out animation slightly before routing
    setTimeout(() => {
      setToast(prev => ({ ...prev, isVisible: false }));
    }, 2200);

    // 4. Safely route back to the login screen
    setTimeout(() => {
      navigate('/login');
    }, 2500);
  };

  const handleResolve = (id) => {
    alert(`Resolving complaint ticket #${id} directly inside PostgreSQL storage...`);
  };

  return (
    <div className="bg-[#f7f9fb] text-[#191c1e] min-h-screen font-sans antialiased flex flex-col relative">
      {/* Global Alert Notification Popup Element */}
      <GlobalToast toast={toast} />

      {/* External CSS Font & Icon Embeds */}
      <div
        dangerouslySetInnerHTML={{
          __html: `
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
            <style>
              .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
              .sidebar-active { font-variation-settings: 'FILL' 1; }
            </style>
          `,
        }}
      />

      {/* --- ADMINISTRATIVE TOP NAVIGATION BAR --- */}
      <header className="bg-[#064E3B] text-white sticky top-0 z-40 shadow-md">
        <div className="flex justify-between items-center w-full px-6 py-3 max-w-[1280px] mx-auto">
          <div className="flex items-center gap-4">
            <span className="text-lg font-black tracking-tight text-white">HomeHero</span>
            <div className="h-4 w-[1px] bg-emerald-700 hidden sm:block"></div>
            <span className="text-xs font-bold tracking-wider text-slate-200 uppercase hidden sm:block">
              System Admin Console
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {/* Dashboard Link - ACTIVE */}
            <Link
              to="/admin/system"
              className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all bg-emerald-500 text-white shadow-sm"
            >
              Dashboard
            </Link>
            
            {/* Bookings Link */}
            <Link
              to="/admin/bookings"
              className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all text-emerald-100 hover:text-white hover:bg-emerald-800/50"
            >
              Bookings
            </Link>
            
            {/* User Management Link */}
            <Link
              to="/admin/users"
              className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all text-emerald-100 hover:text-white hover:bg-emerald-800/50"
            >
              User management
            </Link>
            
            {/* Announcements Link */}
            <Link
              to="/admin/announcements"
              className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all text-emerald-100 hover:text-white hover:bg-emerald-800/50"
            >
              Announcements
            </Link>
          </nav>
          
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-lg text-white hover:bg-emerald-800 transition-colors relative">
              <span className="material-symbols-outlined text-xl">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            <div className="h-6 w-[1px] bg-emerald-800 mx-1"></div>
            
            <div className="relative">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-emerald-800 transition-all focus:outline-none"
              >
                <div className="w-7 h-7 rounded-lg border border-emerald-400 flex items-center justify-center bg-white text-[#006948]">
                  <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    account_circle
                  </span>
                </div>
                <div className="hidden sm:block text-left max-w-[120px]">
                  <p className="text-xs font-bold text-white truncate leading-tight">{adminName}</p>
                </div>
                <span className="material-symbols-outlined text-emerald-200 text-sm">keyboard_arrow_down</span>
              </button>

              {isDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)}></div>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-1 z-20 text-[#191c1e]">
                    <div className="px-3 py-2 border-b border-slate-100">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Account:</p>
                      <p className="text-xs font-semibold text-slate-700 truncate mt-0.5">{adminName}</p>
                    </div>
                    <button 
                      onClick={() => { setIsDropdownOpen(false); handleLogout(); }}
                      className="w-full flex items-center gap-2 px-3 py-2.5 text-xs font-bold text-red-600 hover:bg-red-50 transition-colors text-left"
                    >
                      <span className="material-symbols-outlined text-base">logout</span>
                      <span>Log out</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* --- MAIN PAGE CONTENT (Stretched to match full window layout) --- */}
      <main className="flex-grow w-full max-w-[1280px] mx-auto px-6 py-8">
        <div className="p-md space-y-md">
          {/* KPI Overview Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md">
            <div className="bg-surface-container-lowest p-md rounded-xl shadow-sm border border-outline-variant">
              <div className="flex justify-between items-start mb-2">
                <span className="text-on-surface-variant text-sm font-semibold">Total Revenue</span>
                <div className="p-2 bg-secondary-container text-on-secondary-container rounded-lg">
                  <span className="material-symbols-outlined">payments</span>
                </div>
              </div>
              <p className="text-2xl font-bold text-on-surface">LKR 2.4M</p>
              <p className="text-xs text-primary flex items-center gap-1 mt-2">
                <span className="material-symbols-outlined text-[16px]">trending_up</span> +12% this month
              </p>
            </div>

            <div className="bg-surface-container-lowest p-md rounded-xl shadow-sm border border-outline-variant">
              <div className="flex justify-between items-start mb-2">
                <span className="text-on-surface-variant text-sm font-semibold">Active Bookings</span>
                <div className="p-2 bg-secondary-container text-on-secondary-container rounded-lg">
                  <span className="material-symbols-outlined">calendar_month</span>
                </div>
              </div>
              <p className="text-2xl font-bold text-on-surface">142</p>
              <p className="text-xs text-on-surface-variant mt-2">Current active requests</p>
            </div>

            <div className="bg-surface-container-lowest p-md rounded-xl shadow-sm border border-outline-variant">
              <div className="flex justify-between items-start mb-2">
                <span className="text-on-surface-variant text-sm font-semibold">Verified Pros</span>
                <div className="p-2 bg-secondary-container text-on-secondary-container rounded-lg">
                  <span className="material-symbols-outlined">engineering</span>
                </div>
              </div>
              <p className="text-2xl font-bold text-on-surface">850</p>
              <p className="text-xs text-primary flex items-center gap-1 mt-2">
                <span className="material-symbols-outlined text-[16px]">verified</span> 18 pending approval
              </p>
            </div>

            <div className="bg-surface-container-lowest p-md rounded-xl shadow-sm border border-outline-variant">
              <div className="flex justify-between items-start mb-2">
                <span className="text-on-surface-variant text-sm font-semibold">New Clients</span>
                <div className="p-2 bg-secondary-container text-on-secondary-container rounded-lg">
                  <span className="material-symbols-outlined">person_add</span>
                </div>
              </div>
              <p className="text-2xl font-bold text-on-surface">42</p>
              <p className="text-xs text-primary flex items-center gap-1 mt-2">
                <span className="material-symbols-outlined text-[16px]">trending_up</span> +5% this week
              </p>
            </div>
          </section>

          {/* PostgreSQL Live Connection Container Component */}
          <section className="bg-surface-container-lowest p-md rounded-xl shadow-sm border border-outline-variant">
            <div className="flex justify-between items-center mb-md">
              <div>
                <h3 className="text-xl font-bold text-on-surface">System Conflict & Dispute Records</h3>
                <p className="text-xs text-outline mt-0.5">Streaming operations directly from local PostgreSQL instance.</p>
              </div>
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
                🟢 Node Sync Online
              </span>
            </div>

            {loading && <div className="text-center py-6 text-outline font-medium">🔄 Accessing local database rows...</div>}
            {error && <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm font-semibold rounded-lg">❌ Connection failure: {error}</div>}

            {!loading && !error && (
              <div className="border border-outline-variant/60 rounded-xl overflow-hidden divide-y divide-outline-variant/40">
                {complaints.map((ticket) => (
                  <div key={ticket.id} className="p-4 hover:bg-surface-container-low/40 transition-colors flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-0.5 rounded">ID: #{ticket.id}</span>
                        <h4 className="text-sm font-bold text-on-surface">
                          {ticket.complainant_name} <span className="font-normal text-outline">filed vs.</span> {ticket.target_name}
                        </h4>
                      </div>
                      <p className="text-sm text-on-surface-variant font-medium">"{ticket.issue_description}"</p>
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                      <span className={`text-xs font-bold uppercase px-2.5 py-1 rounded-full ${ticket.status === 'pending' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'}`}>
                        {ticket.status}
                      </span>
                      <button onClick={() => handleResolve(ticket.id)} className="px-4 py-1.5 bg-primary text-on-primary hover:bg-primary-container font-semibold text-xs rounded-lg transition-all shadow-sm">
                        Resolve Case
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Charts and Data Visualizer Split */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-md">
            <div className="lg:col-span-2 bg-surface-container-lowest p-md rounded-xl shadow-sm border border-outline-variant">
              <div className="flex justify-between items-center mb-md">
                <h3 className="text-xl font-bold">Growth Trends</h3>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-surface-container rounded-full text-xs font-semibold">6 Months</button>
                </div>
              </div>
              <div className="h-48 flex items-end justify-between px-md pb-md bg-gradient-to-b from-primary/5 to-transparent rounded-xl border border-outline-variant/30">
                <div className="w-12 bg-primary rounded-t-lg h-24"></div>
                <div className="w-12 bg-primary rounded-t-lg h-32"></div>
                <div className="w-12 bg-primary rounded-t-lg h-40"></div>
                <div className="w-12 bg-primary-container rounded-t-lg h-36"></div>
                <div className="w-12 bg-primary rounded-t-lg h-44"></div>
                <div className="w-12 bg-primary rounded-t-lg h-48"></div>
              </div>
              <div className="flex justify-between mt-3 px-md text-xs font-semibold text-outline">
                <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-md rounded-xl shadow-sm border border-outline-variant">
              <h3 className="text-xl font-bold mb-md">Service Distribution</h3>
              <div className="relative h-44 flex items-center justify-center">
                <div className="w-36 h-36 rounded-full border-[18px] border-primary flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-xl font-bold leading-none">1.2k</p>
                    <p className="text-[10px] text-outline font-semibold uppercase mt-0.5">Total Jobs</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 space-y-1.5 text-xs font-semibold">
                <div className="flex justify-between items-center"><div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-primary"></span><span>Gardening</span></div><span>35%</span></div>
                <div className="flex justify-between items-center"><div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-secondary"></span><span>Cleaning</span></div><span>25%</span></div>
                <div className="flex justify-between items-center"><div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-tertiary"></span><span>Petcare</span></div><span>15%</span></div>
              </div>
            </div>
          </section>

          {/* Activity Logs Component Footer */}
          <section className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant p-md">
            <h3 className="text-xl font-bold mb-md">Recent Activity Logs</h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-7 h-7 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center"><span className="material-symbols-outlined text-[16px]">check_circle</span></div>
                  <div className="w-px h-full bg-outline-variant/60 mt-1"></div>
                </div>
                <div><p className="text-sm font-medium"><span className="font-bold">Suresh Fonseka</span> completed a gardening job.</p><p className="text-xs text-outline">2 minutes ago</p></div>
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-7 h-7 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center"><span className="material-symbols-outlined text-[16px]">person</span></div>
                  <div className="w-px h-full bg-outline-variant/60 mt-1"></div>
                </div>
                <div><p className="text-sm font-medium"><span className="font-bold">Kasun Dissanayake</span> registered as a provider.</p><p className="text-xs text-outline">15 minutes ago</p></div>
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-7 h-7 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center"><span className="material-symbols-outlined text-[16px]">history_edu</span></div>
                </div>
                <div><p className="text-sm font-medium"><span className="font-bold">Admin</span> updated pricing structure parameters.</p><p className="text-xs text-outline">1 hour ago</p></div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default SystemAdminDashboard;