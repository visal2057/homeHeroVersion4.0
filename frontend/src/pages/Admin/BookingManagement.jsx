import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Added Link for seamless dashboard routing

const BookingsManagement = () => {
  // Frontend component states
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [activeTab, setActiveTab] = useState('All Bookings');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('All Time'); // Added for the date-range picker constraint
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch real data from the backend table on mount
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/bookings'); 
        
        if (!response.ok) {
          throw new Error('Failed to retrieve bookings from server');
        }
        const data = await response.json();
        setBookings(data);
        setFilteredBookings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Handle client-side filtering combined with Search Inputs, Tabs, and Date Range Picker
  useEffect(() => {
    let result = bookings;

    // 1. Filter by Status Tab Selection
    if (activeTab !== 'All Bookings') {
      result = result.filter(
        (b) => b.status && b.status.toLowerCase() === activeTab.toLowerCase()
      );
    }

    // 2. Filter by Search Query (Matches Reference ID, Client Name, SP Provider Name, or Category)
    // Added null checks using '||' to prevent crashes when provider names or descriptions are null
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (b) =>
          (b.booking_reference || '').toLowerCase().includes(term) ||
          (b.client_name || '').toLowerCase().includes(term) ||
          (b.service_provider_name || '').toLowerCase().includes(term) ||
          (b.service_category || '').toLowerCase().includes(term)
      );
    }

    // 3. Filter by Operational Date Range Constraint
    if (dateRange !== 'All Time') {
      const now = new Date();
      result = result.filter((b) => {
        // Safe fallback tracking against the target execution date
        const targetBookingDate = b.booking_date ? new Date(b.booking_date) : null;
        if (!targetBookingDate) return false;
        
        if (dateRange === 'This Month') {
          const firstDayThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
          const lastDayThisMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
          return targetBookingDate >= firstDayThisMonth && targetBookingDate <= lastDayThisMonth;
        }
        if (dateRange === 'Last Month') {
          const firstDayLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
          const lastDayLastMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);
          return targetBookingDate >= firstDayLastMonth && targetBookingDate <= lastDayLastMonth;
        }
        return true;
      });
    }

    setFilteredBookings(result);
  }, [activeTab, searchTerm, dateRange, bookings]);

  // Helper helper to convert database timestamps into readable localized dates & times (with AM/PM)
  const formatBookingDateTime = (timestamp) => {
    if (!timestamp) return 'Unscheduled';
    const dateObj = new Date(timestamp);
    
    // Formats into something readable like "May 4, 2026 - 08:30 AM"
    return dateObj.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  // Dynamic Icon mapping helper function based on service category names
  const getServiceIcon = (category) => {
    const lower = (category || '').toLowerCase();
    if (lower.includes('cleaning')) return 'cleaning_services';
    if (lower.includes('garden')) return 'potted_plant';
    if (lower.includes('plumb')) return 'plumbing';
    if (lower.includes('elect')) return 'electrical_services';
    if (lower.includes('paint')) return 'format_paint';
    if (lower.includes('ac')) return 'ac_unit';
    return 'construction'; // Default fallback icon
  };

  // Helper badge color picker matching status values safely
  const getStatusBadgeClass = (status) => {
    switch ((status || '').toLowerCase()) {
      case 'completed':
        return 'bg-[#adedd3] text-[#306d58]';
      case 'cancelled':
        return 'bg-[#ffdad6] text-[#93000a]';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
      default:
        return 'bg-slate-100 text-slate-700 border border-slate-300/60';
    }
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
          {/* Dashboard Link */}
          <Link className="flex items-center gap-3 text-slate-600 hover:bg-slate-100 transition-all px-4 py-3 rounded-lg" to="/admin/system">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="text-sm font-semibold">Dashboard</span>
          </Link>
          
          {/* Active Bookings Link */}
          <Link className="flex items-center gap-3 bg-emerald-50 text-[#006948] rounded-lg px-4 py-3 font-bold" to="/admin/bookings">
            <span className="material-symbols-outlined sidebar-active">calendar_today</span>
            <span className="text-sm font-semibold">Bookings</span>
          </Link>
          
          {/* User Management Link - ROUTED PROPERLY TO YOUR USER CONSOLE ROUTE ELEMENT */}
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
        <header className="flex justify-between items-end mb-12">
          <div className="flex flex-col gap-1">
            <h1 className="text-4xl font-bold tracking-tight text-[#191c1e]">Bookings Management</h1>
            <p className="text-[#3d4a42] text-base">Oversee all home service requests and logistics tables status.</p>
          </div>
        </header>

        {/* Data Loading and Error Screen Handlers */}
        {loading ? (
          <div className="text-center py-12 text-[#3d4a42] font-semibold">Loading system table parameters...</div>
        ) : error ? (
          <div className="text-center py-12 text-[#ba1a1a] font-semibold">Database Link Failure: {error}</div>
        ) : (
          <section className="bg-white rounded-xl shadow-sm border border-[#bccac0]/20 overflow-hidden">
            
            {/* Status Navigation Tab Filters */}
            <div className="flex border-b border-[#bccac0]/20 px-6 pt-6">
              {['All Bookings', 'Pending', 'Confirmed', 'Completed', 'Cancelled'].map((tab) => (
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
                    placeholder="Search Reference, Client, Provider..."
                    className="w-full pl-9 pr-4 py-1.5 bg-white rounded-lg border border-slate-200 focus:border-[#006948] focus:ring-1 focus:ring-[#006948] text-sm placeholder:text-slate-400 outline-none transition-all"
                  />
                </div>

                {/* Operational improvement feature: Date Range Picker component filter */}
                <div className="relative">
                  <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="pl-3 pr-8 py-1.5 bg-white rounded-lg border border-slate-200 text-sm font-medium text-[#3d4a42] focus:border-[#006948] outline-none transition-all cursor-pointer appearance-none min-w-[140px]"
                  >
                    <option value="All Time">All Time</option>
                    <option value="This Month">This Month</option>
                    <option value="Last Month">Last Month</option>
                  </select>
                  <span className="material-symbols-outlined text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 text-base pointer-events-none">
                    keyboard_arrow_down
                  </span>
                </div>
              </div>
              <button className="flex items-center gap-1 text-[#006948] text-sm font-semibold hover:underline">
                <span className="material-symbols-outlined text-base">download</span>
                Export CSV
              </button>
            </div>

            {/* Live Synchronized Rows Layout */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#f2f4f6] text-[#3d4a42] uppercase text-[10px] font-bold tracking-widest">
                  <tr>
                    <th className="px-6 py-3">Booking ID</th>
                    <th className="px-6 py-3">Service</th>
                    <th className="px-6 py-3">Job Type</th>
                    <th className="px-6 py-3">Client</th>
                    <th className="px-6 py-3">Provider</th>
                    <th className="px-6 py-3">Booking Date & Time</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3 text-right pr-6">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#bccac0]/10">
                  {filteredBookings.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="text-center py-8 text-sm text-slate-400">
                        No active matching booking records found.
                      </td>
                    </tr>
                  ) : (
                    filteredBookings.map((booking) => (
                      <tr key={booking.booking_id} className="hover:bg-[#f2f4f6]/30 transition-colors group">
                        {/* Reference Num */}
                        <td className="px-6 py-4 text-sm font-semibold text-[#006948]">
                          {booking.booking_reference}
                        </td>
                        {/* Service Category */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-[#006948] text-xl">
                              {getServiceIcon(booking.service_category)}
                            </span>
                            <span className="text-sm font-semibold">{booking.service_category}</span>
                          </div>
                        </td>
                        {/* Job Type column highlighting Open Requests vs Direct requests */}
                        <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                          <span className={`px-2 py-0.5 rounded text-xs ${
                            booking.job_type === 'Direct job' 
                              ? 'bg-purple-50 text-purple-700 border border-purple-200' 
                              : 'bg-orange-50 text-orange-700 border border-orange-200'
                          }`}>
                            {booking.job_type}
                          </span>
                        </td>
                        {/* Client Name */}
                        <td className="px-6 py-4 text-sm text-[#191c1e] font-medium">
                          {booking.client_name}
                        </td>
                        {/* Service Provider Name */}
                        <td className="px-6 py-4 text-sm text-[#191c1e]">
                          {!booking.service_provider_name || booking.service_provider_name === 'Unassigned' ? (
                            <span className="text-slate-400 italic font-normal">Awaiting Pickup</span>
                          ) : (
                            booking.service_provider_name
                          )}
                        </td>
                        {/* Modified: Renders the new single combined Booking Date column */}
                        <td className="px-6 py-4 text-[#191c1e] text-sm font-medium">
                          {formatBookingDateTime(booking.booking_date)}
                        </td>
                        {/* Status Check badge */}
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight ${getStatusBadgeClass(booking.status)}`}>
                            {booking.status}
                          </span>
                        </td>
                        {/* Options trigger list */}
                        <td className="px-6 py-4 text-right whitespace-nowrap">
                          <div className="inline-flex items-center gap-2">
                            <button className="material-symbols-outlined text-[#3d4a42] hover:bg-[#e6e8ea] p-1 rounded transition-colors">
                              more_vert
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Standard Pagination segment */}
            <div className="px-6 py-3 bg-[#f2f4f6] border-t border-[#bccac0]/10 flex justify-between items-center">
              <span className="text-xs font-medium text-[#3d4a42]">
                Showing {filteredBookings.length} of {bookings.length} bookings entries
              </span>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default BookingsManagement;