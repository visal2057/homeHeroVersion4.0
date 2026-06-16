import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('All Users');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeDropdownUserId, setActiveDropdownUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  // Closes the ban dropdown menu if you click anywhere else on the screen
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdownUserId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchAllUsersData = useCallback(async () => {
  try {
    setLoading(true);
    setError(null);
    const response = await fetch('http://localhost:5000/api/admin/users');
    
    if (!response.ok) {
      throw new Error('Failed to retrieve system users from server');
    }
    const data = await response.json();
    setUsers(data);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
}, []); // An empty array here keeps the function completely stable

// 3. Your useEffect hook stays clean and safe
useEffect(() => {
  (async () => {
    await fetchAllUsersData();
  })();
}, [fetchAllUsersData]); // The linter is happy now because fetchAllUsersData never changes unexpectedly

  const handleBanUserAction = async (userid, duration) => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/users/ban', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userid, duration })
      });

      if (response.ok) {
        await fetchAllUsersData();
        setActiveDropdownUserId(null);
        
        // Inline modal view refresh if currently active user profile state updates
        if (selectedUser && selectedUser.userid === userid) {
          setSelectedUser((prev) => ({ ...prev, status: 'SUSPENDED' }));
        }
      }
    } catch (err) {
      console.error('Failed to process suspension request:', err);
    }
  };

  // --- RECONCILED FILTER LOGIC (Calculated directly inline during rendering) ---
  let filteredUsers = users;

  // 1. Filter by Role Distribution Tabs
  if (activeTab !== 'All Users') {
    filteredUsers = filteredUsers.filter(
      (u) => u.role && u.role.toLowerCase() === activeTab.toLowerCase()
    );
  }

  // 2. Filter by Search Query Fields (Unique Token, Name, or Email Address)
  if (searchTerm.trim() !== '') {
    const term = searchTerm.toLowerCase();
    filteredUsers = filteredUsers.filter(
      (u) =>
        (u.unique_token || '').toLowerCase().includes(term) ||
        (u.name || '').toLowerCase().includes(term) ||
        (u.email || '').toLowerCase().includes(term)
    );
  }

  // Helper helper badge styling function for corresponding user types
  const getUserTypeClass = (role) => {
    switch ((role || '').toLowerCase()) {
      case 'admin':
        return 'bg-purple-100 text-purple-800 border border-purple-200';
      case 'provider':
        return 'bg-orange-50 text-orange-700 border border-orange-200';
      case 'client':
      default:
        return 'bg-blue-50 text-blue-700 border border-blue-200';
    }
  };

  // Helper status color layout matching rule sets safely
  const getStatusClass = (status) => {
    if ((status || '').toUpperCase() === 'SUSPENDED') {
      return 'bg-[#ffdad6] text-[#93000a]';
    }
    return 'bg-[#adedd3] text-[#306d58]';
  };

  return (
    <div className="bg-[#f7f9fb] text-[#191c1e] min-h-screen font-sans antialiased flex flex-col relative">
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
            {/* Dashboard Link */}
            <Link
              to="/admin/system"
              className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all text-emerald-100 hover:text-white hover:bg-emerald-800/50"
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
            
            {/* User Management Link - ACTIVE */}
            <Link
              to="/admin/users"
              className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all bg-emerald-500 text-white shadow-sm"
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
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-emerald-800 transition-all focus:outline-none"
              >
                <div className="w-7 h-7 rounded-lg border border-emerald-400 flex items-center justify-center bg-white text-[#006948]">
                  <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    account_circle
                  </span>
                </div>
                <div className="hidden sm:block text-left max-w-[120px]">
                  <p className="text-xs font-bold text-white truncate leading-tight">sys_admin</p>
                </div>
                <span className="material-symbols-outlined text-emerald-200 text-sm">keyboard_arrow_down</span>
              </button>

              {isProfileDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsProfileDropdownOpen(false)}></div>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-1 z-20 text-[#191c1e]">
                    <div className="px-3 py-2 border-b border-slate-100">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Account:</p>
                      <p className="text-xs font-semibold text-slate-700 truncate mt-0.5">sys_admin</p>
                    </div>
                    <Link 
                      to="/login"
                      onClick={() => setIsProfileDropdownOpen(false)}
                      className="w-full flex items-center gap-2 px-3 py-2.5 text-xs font-bold text-red-600 hover:bg-red-50 transition-colors text-left"
                    >
                      <span className="material-symbols-outlined text-base">logout</span>
                      <span>Log out</span>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* --- MAIN Container Workspace (Stretched completely to full window layout width) --- */}
      <main className="flex-grow w-full max-w-[1280px] mx-auto px-6 py-8">
        <header className="flex justify-between items-end mb-12">
          <div className="flex flex-col gap-1">
            <h1 className="text-4xl font-bold tracking-tight text-[#191c1e]">User Management</h1>
            <p className="text-[#3d4a42] text-base">Oversee all registered application accounts, system parameters, and security roles.</p>
          </div>
        </header>

        {/* Data Loading and Error Screen Handlers */}
        {loading ? (
          <div className="text-center py-12 text-[#3d4a42] font-semibold">Loading system table parameters...</div>
        ) : error ? (
          <div className="text-center py-12 text-[#ba1a1a] font-semibold">Database Link Failure: {error}</div>
        ) : (
          <section className="bg-white rounded-xl shadow-sm border border-[#bccac0]/20">
            
            {/* Status Navigation Tab Filters */}
            <div className="flex border-b border-[#bccac0]/20 px-6 pt-6">
              {['All Users', 'Client', 'Provider'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 text-sm font-semibold transition-colors border-b-2 ${
                    activeTab === tab
                      ? 'border-b-2 border-[#006948] text-[#006948]'
                      : 'text-[#3d4a42] border-transparent hover:text-[#006948]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Dynamic Search Box and Functional Toolbar controls */}
            <div className="p-6 flex flex-col md:flex-row gap-3 justify-between items-start md:items-center bg-[#f2f4f6]/50">
              <div className="flex flex-col sm:flex-row gap-3 items-center w-full md:w-auto">
                <div className="relative min-w-[260px]">
                  <span className="material-symbols-outlined text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 text-lg">
                    search
                  </span>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search Token, Name, Email..."
                    className="w-full pl-9 pr-4 py-1.5 bg-white rounded-lg border border-slate-200 focus:border-[#006948] focus:ring-1 focus:ring-[#006948] text-sm placeholder:text-slate-400 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Layout wrapper altered to handle visible absolute element drop menus */}
            <div className="w-full overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#f2f4f6] text-[#3d4a42] uppercase text-[10px] font-bold tracking-widest">
                  <tr>
                    <th className="px-6 py-3">Token</th>
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Email</th>
                    <th className="px-6 py-3">Type</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3 text-right pr-6">Ban User</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#bccac0]/10">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center py-8 text-sm text-slate-400">
                        No active matching user records found.
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user, index) => (
                      <tr 
                        key={user.userid} 
                        onClick={() => setSelectedUser(user)}
                        className="hover:bg-[#f2f4f6]/30 transition-colors group cursor-pointer"
                      >
                        {/* 1. Token Column */}
                        <td className="px-6 py-4 text-sm font-semibold text-[#006948] font-mono tracking-wider">
                          {user.unique_token}
                        </td>
                        
                        {/* 2. Name Column */}
                        <td className="px-6 py-4 text-sm text-[#191c1e] font-medium whitespace-nowrap">
                          {user.name}
                        </td>
                        
                        {/* 3. Email Column */}
                        <td className="px-6 py-4 text-sm text-slate-500 whitespace-nowrap">
                          {user.email}
                        </td>
                        
                        {/* 4. Type (Role) Badge Column */}
                        <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                          <span className={`px-2 py-0.5 rounded text-xs uppercase tracking-tight font-bold ${getUserTypeClass(user.role)}`}>
                            {user.role}
                          </span>
                        </td>
                        
                        {/* 5. Status Checking Badge Column */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight ${getStatusClass(user.status)}`}>
                            {user.status || 'ACTIVE'}
                          </span>
                        </td>
                        
                        {/* 6. Action Column Dropdown Controller */}
                        <td className="px-6 py-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                          <div className="relative inline-block text-left">
                            <button 
                              onClick={() => setActiveDropdownUserId(activeDropdownUserId === user.userid ? null : user.userid)}
                              className="flex items-center gap-1 text-red-600 font-semibold hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors text-xs"
                            >
                              <span className="material-symbols-outlined text-base">block</span>
                              <span>{user.status === 'SUSPENDED' ? 'Suspended' : 'Ban User'}</span>
                            </button>

                            {activeDropdownUserId === user.userid && (
                              <div 
                                ref={dropdownRef}
                                className={`absolute right-0 w-52 bg-white shadow-xl border border-slate-200 rounded-xl overflow-hidden z-50 ${
                                  filteredUsers.length <= 2 ? 'top-full mt-1' : (index < 2 ? 'top-full mt-1' : 'bottom-full mb-1')
                                }`}
                                style={{ transform: 'translateX(0)' }}
                              >
                                <div className="p-2 bg-red-50/60 border-b border-slate-100 text-left">
                                  <span className="text-[10px] font-bold text-red-700 uppercase tracking-widest block">Select Duration</span>
                                </div>
                                <button onClick={() => handleBanUserAction(user.userid, '1 Day')} className="w-full text-left px-3 py-2 text-sm hover:bg-slate-50 text-slate-700 block font-medium">Ban for 1 Day</button>
                                <button onClick={() => handleBanUserAction(user.userid, '1 Week')} className="w-full text-left px-3 py-2 text-sm hover:bg-slate-50 text-slate-700 block font-medium">Ban for 1 Week</button>
                                <button onClick={() => handleBanUserAction(user.userid, '1 Month')} className="w-full text-left px-3 py-2 text-sm hover:bg-slate-50 text-slate-700 block font-medium">Ban for 1 Month</button>
                                <button onClick={() => handleBanUserAction(user.userid, 'Forever')} className="w-full text-left px-3 py-2 text-sm hover:bg-red-50 text-red-700 font-bold block border-t border-slate-100">Ban Forever</button>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Standard Pagination segment */}
            <div className="px-6 py-3 bg-[#f2f4f6] border-t border-[#bccac0]/10 rounded-b-xl flex justify-between items-center">
              <span className="text-xs font-medium text-[#3d4a42]">
                Showing {filteredUsers.length} of {users.length} user accounts
              </span>
            </div>
          </section>
        )}
      </main>

      {/* =========================================================================
          DETAILS MODAL CARD OVERLAY WITH TAILWIND DESIGN MAPPING
          ========================================================================= */}
      {selectedUser && (
        <div 
          onClick={() => setSelectedUser(null)}
          className="fixed inset-0 bg-black/65 backdrop-blur-[4px] flex items-center justify-center z-[9999] p-5 box-border"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white text-[#191c1e] border-3 border-[#006948] rounded-2xl w-full max-w-[460px] p-6 shadow-2xl flex flex-col gap-4 box-border"
          >
            {/* Modal Card Header */}
            <div className="flex items-center border-b border-slate-100 pb-3 justify-between">
              <span className="text-[13px] font-mono bg-slate-100 px-2 py-1 rounded font-bold color text-[#006948]">
                {selectedUser.unique_token}
              </span>
              <button 
                onClick={() => setSelectedUser(null)} 
                className="bg-none border-none cursor-pointer p-1 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>
            
            {/* Profile Overview Box */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center justify-between gap-4">
              <div className="flex-grow">
                <h3 className="m-0 mb-1 text-lg font-bold text-slate-800">{selectedUser.name}</h3>
                <p className="m-0 mb-2 text-sm text-slate-500">{selectedUser.email}</p>
                <span className={`text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded ${
                  selectedUser.status === 'SUSPENDED' ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  Status: {selectedUser.status || 'ACTIVE'}
                </span>
              </div>

              {/* Profile Image Space Placeholder */}
              <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center border-2 border-[#006948] overflow-hidden flex-shrink-0">
                {selectedUser.profile_pic ? (
                  <img src={selectedUser.profile_pic} alt={selectedUser.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="material-symbols-outlined text-slate-400 text-3xl">person</span>
                )}
              </div>
            </div>
            
            {/* Core Attributes Grid Layout */}
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex gap-3">
                <div className="flex-1 bg-slate-50/40 p-3 rounded-lg border border-slate-100">
                  <span className="text-[11px] text-slate-400 block mb-0.5">Verification</span>
                  <strong className="text-slate-700 font-semibold">{selectedUser.is_verified ? 'Verified User' : 'Unverified Account'}</strong>
                </div>
                <div className="flex-1 bg-slate-50/40 p-3 rounded-lg border border-slate-100">
                  <span className="text-[11px] text-slate-400 block mb-0.5">Connection</span>
                  <strong className="text-slate-700 font-semibold">{selectedUser.is_online ? 'Online Now' : 'Offline'}</strong>
                </div>
              </div>

              {selectedUser.role === 'Provider' && (
                <div className="bg-slate-50/40 p-3 rounded-lg border border-slate-100">
                  <span className="text-[11px] text-slate-400 block mb-0.5">Category Specialty</span>
                  <strong className="text-slate-700 font-semibold capitalize">{selectedUser.category || 'General Maintenance'}</strong>
                </div>
              )}
              
              <div className="flex gap-3">
                <div className="flex-1 bg-slate-50/40 p-3 rounded-lg border border-slate-100">
                  <span className="text-[11px] text-slate-400 block mb-0.5">Completed Jobs</span>
                  <strong className="text-slate-800 font-bold">{selectedUser.completed_jobs ?? 0} Requests</strong>
                </div>
                <div className="flex-1 bg-slate-50/40 p-3 rounded-lg border border-slate-100">
                  <span className="text-[11px] text-slate-400 block mb-0.5">Cancelled Jobs</span>
                  <strong className="text-slate-800 font-bold">{selectedUser.cancelled_jobs ?? 0} Requests</strong>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;