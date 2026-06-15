// =========================================================================
// SECTION 1: LIBRARIES & CONFIGURATION HOOKS
// =========================================================================
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const UserManagement = () => {
  // =========================================================================
  // SECTION 2: COMPONENT STATE HOOKS
  // =========================================================================
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('All Users');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeDropdownUserId, setActiveDropdownUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // =========================================================================
  // SECTION 3: FRONTEND API FETCH CALLS (TALKING TO THE BACKEND SERVER)
  // =========================================================================
  const fetchAllUsersData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('http://localhost:5000/api/admin/users');
      
      if (!response.ok) {
        throw new Error('Failed to retrieve system users from server');
      }
      const data = await response.json();
      setUsers(data);
      setFilteredUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUsersData();
  }, []);

  // =========================================================================
  // SECTION 4: ADMINISTRATIVE API WORKFLOWS (BAN OPERATIONS)
  // =========================================================================
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

  // =========================================================================
  // SECTION 5: LIVE TEXT FILTER MATCHING LOGIC WITH NAV TABS
  // =========================================================================
  useEffect(() => {
    let result = users;

    // 1. Filter by Role Distribution Tabs
    if (activeTab !== 'All Users') {
      result = result.filter(
        (u) => u.role && u.role.toLowerCase() === activeTab.toLowerCase()
      );
    }

    // 2. Filter by Search Query Fields (Unique Token, Name, or Email Address)
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (u) =>
          (u.unique_token || '').toLowerCase().includes(term) ||
          (u.name || '').toLowerCase().includes(term) ||
          (u.email || '').toLowerCase().includes(term)
      );
    }

    setFilteredUsers(result);
  }, [activeTab, searchTerm, users]);

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
    <div className="bg-[#f7f9fb] text-[#191c1e] min-h-screen font-sans antialiased">

      {/* Side Navigation Rail */}
      <aside className="fixed left-0 top-0 h-full w-64 z-50 p-6 flex flex-col gap-4 bg-white border-r border-slate-200 shadow-sm">
        <div className="flex flex-col mb-6 px-4">
          <span className="text-3xl font-bold text-[#006948]">HomeHero</span>
          <span className="text-sm font-semibold text-slate-500">System Admin Console</span>
        </div>
        
        <nav className="flex-grow flex flex-col gap-1">
          {/* Dashboard Link */}
          <Link className="flex items-center gap-3 text-slate-600 hover:bg-slate-100 transition-all px-4 py-3 rounded-lg" to="/admin/system">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="text-sm font-semibold">Dashboard</span>
          </Link>
          
          {/* Bookings Link */}
          <Link className="flex items-center gap-3 text-slate-600 hover:bg-slate-100 transition-all px-4 py-3 rounded-lg" to="/admin/bookings">
            <span className="material-symbols-outlined">calendar_today</span>
            <span className="text-sm font-semibold">Bookings</span>
          </Link>
          
          {/* Active User Management Link */}
          <Link className="flex items-center gap-3 bg-emerald-50 text-[#006948] rounded-lg px-4 py-3 font-bold" to="/admin/users">
            <span className="material-symbols-outlined sidebar-active">engineering</span>
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
              <span className="text-base font-bold text-[#191c1e] tracking-tight">sys_admin</span>
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
        <header className="flex justify-between items-end pt-6 mb-12">
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
          /* Removed overflow-hidden to allow dropdown visibility on short lists */
          <section className="bg-white rounded-xl shadow-sm border border-[#bccac0]/20">
            
            {/* Status Navigation Tab Filters */}
            <div className="flex border-b border-[#bccac0]/20 px-6 pt-6">
              {['All Users', 'customer', 'provider'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 text-sm font-semibold transition-colors border-b-2 ${
                    activeTab === tab
                      ? 'border-b-2 border-[#006948] text-[#006948]'
                      : 'text-[#3d4a42] border-transparent hover:text-[#006948]'
                  }`}
                >
                  {tab === 'customer' ? 'Clients' : tab === 'provider' ? 'Providers' : tab}
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
            <div className="w-full">
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
                                /* Handled layout visibility cleanly by enforcing top orientation if list entries are short */
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
          DETAILS MODAL CARD OVERLAY WITH THICKER CUSTOM GREEN BORDER
          ========================================================================= */}
      {selectedUser && (
        <div 
          onClick={() => setSelectedUser(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px',
            boxSizing: 'border-box'
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#ffffff',
              color: '#191c1e',
              border: '3px solid #006948',
              borderRadius: '16px',
              width: '100%',
              maxWidth: '460px',
              padding: '24px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              boxSizing: 'border-box'
            }}
          >
            {/* Modal Card Header */}
            <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '13px', fontFamily: 'monospace', backgroundColor: '#f1f5f9', padding: '4px 8px', borderRadius: '4px', fontWeight: 'bold', color: '#006948' }}>
                {selectedUser.unique_token}
              </span>
              <button 
                onClick={() => setSelectedUser(null)} 
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>close</span>
              </button>
            </div>
            
            {/* Profile Overview Box */}
            <div style={{ backgroundColor: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: '700', color: '#1e293b' }}>{selectedUser.name}</h3>
                <p style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#64748b' }}>{selectedUser.email}</p>
                <span style={{ 
                  fontSize: '10px', 
                  fontWeight: 'bold', 
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase', 
                  padding: '4px 8px', 
                  borderRadius: '4px',
                  backgroundColor: selectedUser.status === 'SUSPENDED' ? '#fee2e2' : '#d1fae5',
                  color: selectedUser.status === 'SUSPENDED' ? '#991b1b' : '#065f46'
                }}>
                  Status: {selectedUser.status || 'ACTIVE'}
                </span>
              </div>

              {/* Profile Image Space Placeholder */}
              <div style={{ 
                width: '64px', 
                height: '64px', 
                borderRadius: '50%', 
                backgroundColor: '#e2e8f0', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                border: '2px solid #006948',
                overflow: 'hidden',
                flexShrink: 0
              }}>
                {selectedUser.profile_pic ? (
                  <img src={selectedUser.profile_pic} alt={selectedUser.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <span className="material-symbols-outlined" style={{ color: '#94a3b8', fontSize: '32px' }}>person</span>
                )}
              </div>
            </div>
            
            {/* Core Attributes Grid Layout */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ flex: 1, backgroundColor: '#fdfdfd', padding: '12px', borderRadius: '8px', border: '1px solid #f1f5f9' }}>
                  <span style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '2px' }}>Verification</span>
                  <strong style={{ color: '#334155', fontWeight: '600' }}>{selectedUser.is_verified ? 'Verified User' : 'Unverified Account'}</strong>
                </div>
                <div style={{ flex: 1, backgroundColor: '#fdfdfd', padding: '12px', borderRadius: '8px', border: '1px solid #f1f5f9' }}>
                  <span style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '2px' }}>Connection</span>
                  <strong style={{ color: '#334155', fontWeight: '600' }}>{selectedUser.is_online ? 'Online Now' : 'Offline'}</strong>
                </div>
              </div>

              {selectedUser.role === 'provider' && (
                <div style={{ backgroundColor: '#fdfdfd', padding: '12px', borderRadius: '8px', border: '1px solid #f1f5f9' }}>
                  <span style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '2px' }}>Category Specialty</span>
                  <strong style={{ color: '#334155', fontWeight: '600', textTransform: 'capitalize' }}>{selectedUser.category || 'General Maintenance'}</strong>
                </div>
              )}
              
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ flex: 1, backgroundColor: '#fdfdfd', padding: '12px', borderRadius: '8px', border: '1px solid #f1f5f9' }}>
                  <span style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '2px' }}>Completed Jobs</span>
                  <strong style={{ color: '#1e293b', fontWeight: '700' }}>{selectedUser.completed_jobs ?? 0} Requests</strong>
                </div>
                <div style={{ flex: 1, backgroundColor: '#fdfdfd', padding: '12px', borderRadius: '8px', border: '1px solid #f1f5f9' }}>
                  <span style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '2px' }}>Cancelled Jobs</span>
                  <strong style={{ color: '#1e293b', fontWeight: '700' }}>{selectedUser.cancelled_jobs ?? 0} Requests</strong>
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