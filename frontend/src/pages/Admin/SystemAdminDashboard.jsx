import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link to connect your routing

function SystemAdminDashboard() {
  // State for dynamic admin profile data
  const [adminName, setAdminName] = useState('System Admin');

  // State for PostgreSQL records
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const handleResolve = (id) => {
    alert(`Resolving complaint ticket #${id} directly inside PostgreSQL storage...`);
  };

  return (
    <div className="bg-[#f7f9fb] text-[#191c1e] min-h-screen font-sans antialiased">
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

      {/* Side Navigation Rail */}
      <aside className="fixed left-0 top-0 h-full w-64 z-50 p-6 flex flex-col gap-4 bg-white border-r border-slate-200 shadow-sm">
        <div className="flex flex-col mb-6 px-4">
          <span className="text-3xl font-bold text-[#006948]">HomeHero</span>
          <span className="text-sm font-semibold text-slate-500">System Admin Console</span>
        </div>
        
        <nav className="flex-grow flex flex-col gap-1">
          {/* Active Dashboard Link */}
          <Link className="flex items-center gap-3 bg-emerald-50 text-[#006948] rounded-lg px-4 py-3 font-bold" to="/admin/system">
            <span className="material-symbols-outlined sidebar-active">dashboard</span>
            <span className="text-sm font-semibold">Dashboard</span>
          </Link>
          
          {/* Bookings Link - Connected to your Bookings Management page */}
          <Link className="flex items-center gap-3 text-slate-600 hover:bg-slate-100 transition-all px-4 py-3 rounded-lg" to="/admin/bookings">
            <span className="material-symbols-outlined">calendar_today</span>
            <span className="text-sm font-semibold">Bookings</span>
          </Link>
          
          {/* User Management Link */}
          <Link className="flex items-center gap-3 text-slate-600 hover:bg-slate-100 transition-all px-4 py-3 rounded-lg" to="/admin/users">
            <span className="material-symbols-outlined">engineering</span>
            <span className="text-sm font-semibold">User management</span>
          </Link>
          
          {/* Announcements Link */}
          <Link className="flex items-center gap-3 text-slate-600 hover:bg-slate-100 transition-all px-4 py-3 rounded-lg" to="/admin/announcements">
            <span className="material-symbols-outlined">campaign</span>
            <span className="text-sm font-semibold">Announcements</span>
          </Link>
        </nav>
        
        <div className="mt-auto border-t border-slate-200 pt-4 flex flex-col gap-1">
          {/* Logout Link */}
          <Link className="flex items-center gap-3 text-red-600 hover:bg-red-50 px-4 py-3 rounded-lg transition-colors" to="/login">
            <span className="material-symbols-outlined">logout</span>
            <span className="text-sm font-semibold">Log Out</span>
          </Link>
        </div>
      </aside>

      {/* Top Bar Header Area */}
      <header className="fixed top-0 right-0 w-[calc(100%-250px)] z-40 bg-[#f7f9fb]/80 backdrop-blur-md shadow-sm flex items-center px-8 py-2 h-16 justify-end">
        <div className="flex items-center gap-4">
          <button className="material-symbols-outlined text-[#005c3a] hover:bg-[#e6e8ea] p-2 rounded-full transition-colors text-2xl font-medium">
            notifications
          </button>
          
          {/* Vertical Divider line */}
          <div className="w-[1px] h-8 bg-slate-300/80 mx-1"></div>

          <div className="flex items-center gap-3 cursor-pointer hover:bg-[#e6e8ea] p-1 rounded-lg transition-colors">
            <div className="flex flex-col items-end leading-tight">
              <span className="text-base font-bold text-[#191c1e] tracking-tight">{adminName}</span>
              <span className="text-sm text-slate-500 font-medium">System Admin</span>
            </div>
            
            <div className="w-10 h-10 rounded-full border-2 border-[#005c3a] flex items-center justify-center bg-white text-[#005c3a]">
              <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                account_circle
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container Workspace */}
      <main className="ml-64 pt-16 min-h-screen p-8">
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