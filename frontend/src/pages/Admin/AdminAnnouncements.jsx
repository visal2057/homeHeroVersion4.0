import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {GlobalToast} from '../../components/GlobalToast';

const API_BASE_URL = 'http://localhost:5000/api/admin/announcements';

const AdminAnnouncements = () => {
  const navigate = useNavigate();
  const [announcements, setAnnouncements] = useState([]);
  const [filteredAnnouncements, setFilteredAnnouncements] = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeDropdownId, setActiveDropdownId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formSubmitLoading, setFormSubmitLoading] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [targetAudience, setTargetAudience] = useState('ALL');
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduledDateTime, setScheduledDateTime] = useState('');
  const [editStatus, setEditStatus] = useState('ACTIVE');

  // Step 2: Define Multi-Stage State Structure tracking mounting and CSS animation states
  const [toast, setToast] = useState({ 
    show: false, 
    isVisible: false, 
    type: 'success', 
    message: '' 
  });

  // Universal Call Trigger Rule matching the pipeline instructions exactly
  const triggerAlert = (type, msg, duration = 2500, callback = null) => {
    // 1. Mount to layout DOM immediately using the correct dynamic message text string
    setToast({ show: true, isVisible: false, type, message: msg });
    
    // 2. Micro-task delay: tricks rendering engine to safely apply slide/fade transitions
    setTimeout(() => {
      setToast(prev => ({ ...prev, isVisible: true }));
    }, 20);

    // 3. Delayed Teardown Pipeline
    setTimeout(() => {
      // Start exit transition animations
      setToast(prev => ({ ...prev, isVisible: false }));
      
      // Completely wipe state and unmount after CSS rules finish transition (300ms)
      setTimeout(() => {
        setToast({ show: false, isVisible: false, type: 'success', message: '' });
        if (callback) callback();
      }, 300);
    }, duration);
  };

  // Custom log out handler mapped cleanly to your pipeline rule
  const handleLogout = (e) => {
    e.preventDefault();
    setIsProfileDropdownOpen(false);
    
    triggerAlert('success', 'Logging out...', 2000, () => {
      navigate('/login');
    });
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('[data-dropdown-container]')) {
        setActiveDropdownId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchAnnouncementsData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(API_BASE_URL);
      if (!response.ok) throw new Error('Failed to download system notifications.');
      const data = await response.json();
      setAnnouncements(data);
      setFilteredAnnouncements(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncementsData();
  }, []);

  const handleCreateAnnouncement = async (e) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) return triggerAlert('error', 'Please fill out both Title and Message fields.');
    if (isScheduled && !scheduledDateTime) return triggerAlert('error', 'Please pick a valid Date and Time window.');

    try {
      setFormSubmitLoading(true);
      const bodyData = {
        title: title.trim(),
        message: message.trim(),
        target_audience: targetAudience,
        status: isScheduled ? 'SCHEDULED' : 'ACTIVE',
        published_date: isScheduled && scheduledDateTime ? scheduledDateTime : new Date().toISOString()
      };

      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData),
      });
      if (!response.ok) throw new Error('Failed to save announcement row.');

      const outputMsg = isScheduled ? 'Success! Announcement scheduled cleanly.' : 'Success! Announcement broadcasted successfully.';
      triggerAlert('success', outputMsg, 2000, async () => {
        resetFormFields();
        setIsFormOpen(false);
        await fetchAnnouncementsData();
      });
    } catch (err) {
      triggerAlert('error', `Error creating announcement: ${err.message}`);
    } finally {
      setFormSubmitLoading(false);
    }
  };

  const handleUpdateAnnouncement = async (e) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) return triggerAlert('error', 'Please fill out both Title and Message fields.');
    if (isScheduled && !scheduledDateTime) return triggerAlert('error', 'Please pick a valid Date and Time window.');

    try {
      setFormSubmitLoading(true);
      const bodyData = {
        title: title.trim(),
        message: message.trim(),
        target_audience: targetAudience,
        status: isScheduled ? 'SCHEDULED' : (editStatus === 'SCHEDULED' ? 'ACTIVE' : editStatus),
        published_date: isScheduled && scheduledDateTime ? scheduledDateTime : new Date().toISOString()
      };

      const response = await fetch(`${API_BASE_URL}/${selectedAnnouncement.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData),
      });
      if (!response.ok) throw new Error('Failed to update the notification.');

      triggerAlert('success', 'Success! System notification record adjusted cleanly.', 2000, async () => {
        setIsEditOpen(false);
        setSelectedAnnouncement(null);
        resetFormFields();
        await fetchAnnouncementsData();
      });
    } catch (err) {
      triggerAlert('error', `Error updating announcement: ${err.message}`);
    } finally {
      setFormSubmitLoading(false);
    }
  };

  const loadEditWorkspace = (announcement) => {
    setSelectedAnnouncement(announcement);
    setTitle(announcement.title || '');
    setMessage(announcement.message || '');
    setTargetAudience(announcement.target_audience || 'ALL');
    setEditStatus(announcement.status || 'ACTIVE');

    if (announcement.status === 'SCHEDULED' && announcement.published_date) {
      setIsScheduled(true);
      setScheduledDateTime(new Date(announcement.published_date).toISOString().slice(0, 16));
    } else {
      setIsScheduled(false);
      setScheduledDateTime('');
    }
    setIsEditOpen(true);
    setActiveDropdownId(null);
  };

  const resetFormFields = () => {
    setTitle('');
    setMessage('');
    setTargetAudience('ALL');
    setIsScheduled(false);
    setScheduledDateTime('');
    setEditStatus('ACTIVE');
  };

  useEffect(() => {
    let result = announcements;
    if (activeTab !== 'All') {
      result = result.filter(a => a.status && a.status.toLowerCase() === activeTab.toLowerCase());
    }
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      result = result.filter(a => 
        (a.id ?? '').toString().includes(term) ||
        (a.title || '').toLowerCase().includes(term) ||
        (a.message || '').toLowerCase().includes(term) ||
        (a.target_audience || '').toLowerCase().includes(term)
      );
    }
    setFilteredAnnouncements(result);
  }, [activeTab, searchTerm, announcements]);

  const getAudienceClass = (aud) => {
    const a = (aud || '').toUpperCase();
    if (a === 'ALL') return 'bg-purple-100 text-purple-800 border border-purple-200';
    if (a === 'PROVIDERS' || a === 'PROVIDER') return 'bg-orange-50 text-orange-700 border border-orange-200';
    return 'bg-blue-50 text-blue-700 border border-blue-200';
  };

  const getStatusClass = (status) => {
    const s = (status || '').toUpperCase();
    if (s === 'ACTIVE') return 'bg-[#adedd3] text-[#306d58]';
    if (s === 'SCHEDULED') return 'bg-amber-100 text-amber-800 border border-amber-200';
    return 'bg-slate-100 text-slate-700 border border-slate-200';
  };

  const formatDisplayDateTime = (str) => {
    if (!str) return 'Not Set';
    return new Date(str).toLocaleString('en-US', {
      year: 'numeric', month: 'numeric', day: 'numeric',
      hour: 'numeric', minute: '2-digit', hour12: true
    });
  };

  return (
    <div className="bg-[#f7f9fb] text-[#191c1e] min-h-screen font-sans antialiased flex flex-col relative">
      <div dangerouslySetInnerHTML={{ __html: `
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        <style>
          .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
          .sidebar-active { font-variation-settings: 'FILL' 1; }
        </style>` 
      }} />

      {/* Step 3: Single-point rendering layout integration hook using GlobalToast */}
      <GlobalToast toast={toast} />

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
            <Link to="/admin/system" className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all text-emerald-100 hover:text-white hover:bg-emerald-800/50">
              Dashboard
            </Link>
            <Link to="/admin/bookings" className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all text-emerald-100 hover:text-white hover:bg-emerald-800/50">
              Bookings
            </Link>
            <Link to="/admin/users" className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all text-emerald-100 hover:text-white hover:bg-emerald-800/50">
              User management
            </Link>
            <Link to="/admin/announcements" className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all bg-emerald-500 text-white shadow-sm">
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
                    <button 
                      onClick={handleLogout}
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

      {/* --- MAIN Container Workspace --- */}
      <main className="flex-grow w-full max-w-[1280px] mx-auto px-6 py-8">
        <header className="flex flex-col pt-6 mb-6 gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-[#191c1e]">Announcements</h1>
            <p className="text-[#3d4a42] text-base">Broadcast notifications directly into application interface notification bell menus.</p>
          </div>
          <div>
            <button onClick={() => { resetFormFields(); setIsFormOpen(!isFormOpen); }} className="flex items-center gap-2 bg-[#006948] text-white px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-[#005c3a]">
              <span className="material-symbols-outlined text-lg">{isFormOpen ? 'keyboard_arrow_up' : 'add'}</span>
              <span>{isFormOpen ? 'Close Panel' : 'Create Announcement'}</span>
            </button>
          </div>
        </header>

        {isFormOpen && (
          <section className="bg-white p-8 rounded-xl shadow-sm border border-slate-200/80 mb-8">
            <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-3">
              <span className="material-symbols-outlined text-xl text-[#006948]">add_circle</span>
              <h2 className="text-xl font-bold text-[#191c1e]">Create New Announcement</h2>
            </div>
            <form onSubmit={handleCreateAnnouncement} className="space-y-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-[#3d4a42]">Announcement Title</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Type summary headline..." className="w-full px-4 py-2.5 bg-white rounded-lg border border-slate-200 outline-none" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-[#3d4a42]">Announcement Message</label>
                <textarea rows="4" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type details here..." className="w-full px-4 py-2.5 bg-white rounded-lg border border-slate-200 outline-none resize-none" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-end border-t border-slate-100 pt-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-bold text-[#3d4a42]">Target Audience</label>
                  <select value={targetAudience} onChange={(e) => setTargetAudience(e.target.value)} className="w-full px-4 py-2.5 bg-white rounded-lg border border-slate-200 outline-none cursor-pointer">
                    <option value="ALL">All Users</option>
                    <option value="CLIENTS">Clients</option>
                    <option value="PROVIDERS">Providers</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5 justify-center h-11">
                  <label className="inline-flex items-center gap-3 cursor-pointer select-none">
                    <input type="checkbox" checked={isScheduled} onChange={(e) => setIsScheduled(e.target.checked)} className="w-4 h-4 text-[#006948] accent-[#006948]" />
                    <span className="text-sm font-bold text-[#3d4a42]">Schedule for later</span>
                  </label>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className={`text-sm font-bold ${isScheduled ? 'text-[#3d4a42]' : 'text-slate-300'}`}>Release Date & Time</label>
                  <input type="datetime-local" disabled={!isScheduled} value={scheduledDateTime} onChange={(e) => setScheduledDateTime(e.target.value)} className="w-full px-4 py-2 bg-white rounded-lg border border-slate-200 outline-none disabled:bg-slate-50" />
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <button type="submit" disabled={formSubmitLoading} className="flex items-center justify-center gap-2 bg-[#006948] text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-[#005c3a] disabled:opacity-50 w-full sm:w-auto">
                  <span className="material-symbols-outlined text-lg">{isScheduled ? 'calendar_month' : 'send'}</span>
                  <span>{formSubmitLoading ? 'Processing...' : isScheduled ? 'Schedule Announcement' : 'Broadcast Announcement'}</span>
                </button>
              </div>
            </form>
          </section>
        )}

        {loading ? (
          <div className="text-center py-12 text-[#3d4a42] font-semibold">Pulling announcements...</div>
        ) : error ? (
          <div className="text-center py-12 text-[#ba1a1a] font-semibold">Connection Failure: {error}</div>
        ) : (
          <section className="bg-white rounded-xl shadow-sm border border-[#bccac0]/20">
            <div className="flex border-b border-[#bccac0]/20 px-6 pt-6">
              {['All', 'Active', 'Scheduled', 'Draft'].map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`px-6 py-3 text-sm font-semibold border-b-2 ${activeTab === tab ? 'border-[#006948] text-[#006948]' : 'text-[#3d4a42] border-transparent'}`}>
                  {tab} Announcements
                </button>
              ))}
            </div>
            <div className="p-6 bg-[#f2f4f6]/50">
              <div className="relative min-w-[320px] max-w-sm">
                <span className="material-symbols-outlined text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 text-lg">search</span>
                <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Filter announcements..." className="w-full pl-9 pr-4 py-2 bg-white rounded-lg border border-slate-200 text-sm outline-none" />
              </div>
            </div>
            <div className="w-full overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#f2f4f6] text-[#3d4a42] uppercase text-[10px] font-bold tracking-widest">
                  <tr>
                    <th className="px-6 py-4 w-16">ID</th>
                    <th className="px-6 py-4 w-1/2">Message Description</th>
                    <th className="px-6 py-4">Target</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Published Date</th>
                    <th className="px-6 py-4 text-right pr-6">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#bccac0]/10">
                  {filteredAnnouncements.length === 0 ? (
                    <tr><td colSpan="6" className="text-center py-12 text-sm text-slate-400">No active records matched this query.</td></tr>
                  ) : (
                    filteredAnnouncements.map((item, idx) => (
                      <tr key={item.id || idx} className="hover:bg-[#f2f4f6]/30 transition-colors">
                        <td className="px-6 py-5 text-sm font-semibold text-[#006948] font-mono">#{item.id ? item.id.toString().padStart(3, '0') : '000'}</td>
                        <td className="px-6 py-5">
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-[#191c1e] line-clamp-1">{item.title}</span>
                            <p className="text-xs text-slate-500 line-clamp-2">{item.message}</p>
                          </div>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap"><span className={`px-2.5 py-0.5 rounded text-xs uppercase font-bold ${getAudienceClass(item.target_audience)}`}>{item.target_audience}</span></td>
                        <td className="px-6 py-5 whitespace-nowrap"><span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${getStatusClass(item.status)}`}>{item.status}</span></td>
                        <td className="px-6 py-5 text-sm text-slate-500 whitespace-nowrap">{formatDisplayDateTime(item.published_date)}</td>
                        <td className="px-6 py-5 text-right whitespace-nowrap relative">
                          <button onClick={() => setActiveDropdownId(activeDropdownId === item.id ? null : item.id)} className="text-slate-400 hover:text-slate-600 p-1.5"><span className="material-symbols-outlined text-lg">more_vert</span></button>
                          {activeDropdownId === item.id && (
                            <div data-dropdown-container className={`absolute right-6 w-44 bg-white shadow-xl border border-slate-200 rounded-xl overflow-hidden z-50 ${filteredAnnouncements.length <= 2 || idx < 2 ? 'top-full' : 'bottom-full'}`}>
                              <button type="button" onClick={() => loadEditWorkspace(item)} className="w-full text-left px-4 py-2.5 text-xs hover:bg-slate-50 text-slate-700 font-semibold flex items-center gap-2"><span className="material-symbols-outlined text-base text-slate-400">edit</span>Edit Notification</button>
                              <button type="button" className="w-full text-left px-4 py-2.5 text-xs hover:bg-red-50 text-red-600 font-bold flex items-center gap-2 border-t border-slate-100"><span className="material-symbols-outlined text-base text-red-500">delete</span>Archive Notice</button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 bg-[#f2f4f6] border-t border-[#bccac0]/10 rounded-b-xl">
              <span className="text-xs font-medium text-[#3d4a42]">Showing {filteredAnnouncements.length} of {announcements.length} active notifications logged</span>
            </div>
          </section>
        )}
      </main>

      {/* --- EDIT MODAL OVERLAY --- */}
      {isEditOpen && selectedAnnouncement && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-lg sm:min-w-[480px] flex-shrink-0 overflow-hidden">
            <header className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-[#f7f9fb]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-xl text-[#006948]">edit</span>
                <h3 className="text-lg font-bold text-[#191c1e]">Edit Announcement #{selectedAnnouncement.id}</h3>
              </div>
              <button onClick={() => { setIsEditOpen(false); setSelectedAnnouncement(null); }} className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100">
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </header>

            <form onSubmit={handleUpdateAnnouncement} className="p-6 space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#3d4a42]">Announcement Title</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-3 py-2 bg-white rounded-lg border border-slate-200 text-sm outline-none" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#3d4a42]">Announcement Message</label>
                <textarea rows="3" value={message} onChange={(e) => setMessage(e.target.value)} className="w-full px-3 py-2 bg-white rounded-lg border border-slate-200 text-sm outline-none resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#3d4a42]">Target Audience</label>
                  <select value={targetAudience} onChange={(e) => setTargetAudience(e.target.value)} className="w-full px-3 py-2 bg-white rounded-lg border border-slate-200 text-sm outline-none">
                    <option value="ALL">All Users</option>
                    <option value="CLIENTS">Clients</option>
                    <option value="PROVIDERS">Providers</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#3d4a42]">Status Override</label>
                  <select value={editStatus} onChange={(e) => setEditStatus(e.target.value)} className="w-full px-3 py-2 bg-white rounded-lg border border-slate-200 text-sm outline-none">
                    <option value="ACTIVE">Active</option>
                    <option value="SCHEDULED">Scheduled</option>
                    <option value="DRAFT">Draft</option>
                  </select>
                </div>
              </div>
              <div className="border-t border-slate-100 pt-3 flex flex-col gap-3">
                <label className="inline-flex items-center gap-3 cursor-pointer select-none">
                  <input type="checkbox" checked={isScheduled} onChange={(e) => setIsScheduled(e.target.checked)} className="w-4 h-4 text-[#006948] accent-[#006948]" />
                  <span className="text-xs font-bold text-[#3d4a42]">Adjust/Schedule Release Time</span>
                </label>
                {isScheduled && (
                  <input type="datetime-local" value={scheduledDateTime} onChange={(e) => setScheduledDateTime(e.target.value)} className="w-full px-3 py-2 bg-white rounded-lg border border-slate-200 text-sm outline-none" />
                )}
              </div>
              <footer className="flex justify-end gap-2 border-t border-slate-100 pt-4 mt-2">
                <button type="button" onClick={() => { setIsEditOpen(false); setSelectedAnnouncement(null); }} className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold hover:bg-slate-50">Cancel</button>
                <button type="submit" disabled={formSubmitLoading} className="px-4 py-2 bg-[#006948] text-white rounded-lg text-sm font-bold hover:bg-[#005c3a] disabled:opacity-50">
                  Save Changes
                </button>
              </footer>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAnnouncements;