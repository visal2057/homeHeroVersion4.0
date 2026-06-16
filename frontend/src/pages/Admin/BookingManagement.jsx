import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Added Link for seamless dashboard routing

const BookingsManagement = () => {
  // Frontend component states
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState('All Bookings');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('All Time'); // Added for the date-range picker constraint
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // --- CALC FILTERED DATA ON THE FLY (Fixes React 19 Cascading Render Warning) ---
  let filteredBookings = bookings;

  // 1. Filter by Status Tab Selection
  if (activeTab !== 'All Bookings') {
    filteredBookings = filteredBookings.filter(
      (b) => b.status && b.status.toLowerCase() === activeTab.toLowerCase()
    );
  }

  // 2. Filter by Search Query (Matches Reference ID, Client Name, SP Provider Name, or Category)
  if (searchTerm.trim() !== '') {
    const term = searchTerm.toLowerCase();
    filteredBookings = filteredBookings.filter(
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
    filteredBookings = filteredBookings.filter((b) => {
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

  // Helper helper to convert database timestamps into readable localized dates & times (with AM/PM)
  const formatBookingDateTime = (timestamp) => {
    if (!timestamp) return 'Unscheduled';
    const dateObj = new Date(timestamp);
    
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
    return 'construction'; 
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
            <Link
              to="/admin/system"
              className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all text-emerald-100 hover:text-white hover:bg-emerald-800/50"
            >
              Dashboard
            </Link>
            
            <Link
              to="/admin/bookings"
              className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all bg-emerald-500 text-white shadow-sm"
            >
              Bookings
            </Link>
            
            <Link
              to="/admin/users"
              className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all text-emerald-100 hover:text-white hover:bg-emerald-800/50"
            >
              User management
            </Link>
            
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
                  <p className="text-xs font-bold text-white truncate leading-tight">sys_admin</p>
                </div>
                <span className="material-symbols-outlined text-emerald-200 text-sm">keyboard_arrow_down</span>
              </button>

              {isDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)}></div>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-1 z-20 text-[#191c1e]">
                    <div className="px-3 py-2 border-b border-slate-100">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Account:</p>
                      <p className="text-xs font-semibold text-slate-700 truncate mt-0.5">sys_admin</p>
                    </div>
                    <Link 
                      to="/login"
                      onClick={() => setIsDropdownOpen(false)}
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

      {/* --- MAIN PAGE CONTENT --- */}
      <main className="flex-grow w-full max-w-[1280px] mx-auto px-6 py-8">
        <header className="flex justify-between items-end mb-12">
          <div className="flex flex-col gap-1">
            <h1 className="text-4xl font-bold tracking-tight text-[#191c1e]">Bookings Management</h1>
            <p className="text-[#3d4a42] text-base">Oversee all home service requests and logistics tables status.</p>
          </div>
        </header>

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

            {/* Dynamic Search Box Controls */}
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

            {/* Layout Rows */}
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
                        <td className="px-6 py-4 text-sm font-semibold text-[#006948]">
                          {booking.booking_reference}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-[#006948] text-xl">
                              {getServiceIcon(booking.service_category)}
                            </span>
                            <span className="text-sm font-semibold">{booking.service_category}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                          <span className={`px-2 py-0.5 rounded text-xs ${
                            booking.job_type === 'Direct job' 
                              ? 'bg-purple-50 text-purple-700 border border-purple-200' 
                              : 'bg-orange-50 text-orange-700 border border-orange-200'
                          }`}>
                            {booking.job_type}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-[#191c1e] font-medium">
                          {booking.client_name}
                        </td>
                        <td className="px-6 py-4 text-sm text-[#191c1e]">
                          {!booking.service_provider_name || booking.service_provider_name === 'Unassigned' ? (
                            <span className="text-slate-400 italic font-normal">Awaiting Pickup</span>
                          ) : (
                            booking.service_provider_name
                          )}
                        </td>
                        <td className="px-6 py-4 text-[#191c1e] text-sm font-medium">
                          {formatBookingDateTime(booking.booking_date)}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight ${getStatusBadgeClass(booking.status)}`}>
                            {booking.status}
                          </span>
                        </td>
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