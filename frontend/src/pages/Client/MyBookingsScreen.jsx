import React, { useState, useEffect } from 'react';
import { useAuth } from '../../components/AuthContext';
import ClientHeader from '../../components/ClientHeader';

const MyBookingsScreen = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('upcoming');

  useEffect(() => {
    fetchBookings();
  }, [user]);

  const fetchBookings = async () => {
    if (!user || !user.userid) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/bookings?userid=${user.userid}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setBookings(data || []);
      } else {
        setError('Failed to fetch bookings');
      }
    } catch (err) {
      setError('Error fetching bookings: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const getServiceIcon = (serviceName) => {
    const iconMap = {
      gardening: 'yard',
      cleaning: 'cleaning_services',
      petcare: 'pets',
      'ac repair': 'air',
      handiwork: 'construction',
      plumbing: 'plumbing_services',
      electrical: 'bolt'
    };
    return iconMap[serviceName?.toLowerCase()] || 'construction';
  };

  const getStatusColor = (status) => {
    const statusMap = {
      confirmed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-blue-100 text-blue-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return statusMap[status?.toLowerCase()] || 'bg-gray-100 text-gray-800';
  };

  const upcomingBookings = bookings.filter(b => b.status?.toLowerCase() !== 'completed' && b.status?.toLowerCase() !== 'cancelled') || [];
  const completedBookings = bookings.filter(b => b.status?.toLowerCase() === 'completed') || [];

  return (
    <div className="bg-[#f7f9fb] text-[#191c1e] min-h-screen flex flex-col font-['Inter']">
      <ClientHeader pageTitle="My Bookings" />

      <main className="flex-grow pt-20 pb-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-[#191c1e] mb-2">My Bookings</h1>
            <p className="text-[#6d7a72]">Manage and track all your service bookings</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">error</span>
              {error}
            </div>
          )}

          {/* Tab Navigation */}
          <div className="flex gap-4 mb-8 border-b border-[#bccac0]">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`pb-4 px-2 font-semibold transition-colors ${
                activeTab === 'upcoming'
                  ? 'text-[#006948] border-b-2 border-[#006948]'
                  : 'text-[#6d7a72] hover:text-[#191c1e]'
              }`}
            >
              Upcoming ({upcomingBookings.length})
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`pb-4 px-2 font-semibold transition-colors ${
                activeTab === 'completed'
                  ? 'text-[#006948] border-b-2 border-[#006948]'
                  : 'text-[#6d7a72] hover:text-[#191c1e]'
              }`}
            >
              Completed ({completedBookings.length})
            </button>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <span className="animate-spin text-4xl text-[#006948]">⏳</span>
              <p className="text-[#6d7a72] mt-4">Loading bookings...</p>
            </div>
          ) : activeTab === 'upcoming' ? (
            <div className="space-y-4">
              {upcomingBookings.length > 0 ? (
                upcomingBookings.map((booking) => (
                  <div
                    key={booking.booking_id}
                    className="bg-white border border-[#bccac0] rounded-2xl p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                      {/* Icon */}
                      <div className="w-20 h-20 rounded-xl bg-[#006948]/10 flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined text-[#006948] text-4xl">
                          {getServiceIcon(booking.service_type)}
                        </span>
                      </div>

                      {/* Booking Details */}
                      <div className="flex-grow">
                        <h3 className="text-xl font-semibold text-[#191c1e] mb-2 capitalize">
                          {booking.service_type || 'Service Booking'}
                        </h3>
                        <div className="space-y-1 text-[#6d7a72]">
                          <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-lg">event</span>
                            <span>
                              {booking.booking_date || 'Date not specified'} {booking.booking_time || ''}
                            </span>
                          </div>
                          {booking.provider_id && (
                            <div className="flex items-center gap-2">
                              <span className="material-symbols-outlined text-lg">person</span>
                              <span>Provider: {booking.provider_name || 'Pending Assignment'}</span>
                            </div>
                          )}
                          {booking.notes && (
                            <div className="flex items-start gap-2 mt-2">
                              <span className="material-symbols-outlined text-lg">note</span>
                              <span>{booking.notes}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Status and Action */}
                      <div className="flex flex-col items-end gap-3">
                        <span className={`px-4 py-2 rounded-full text-sm font-semibold capitalize ${getStatusColor(booking.status)}`}>
                          {booking.status || 'Pending'}
                        </span>
                        <button className="px-6 py-2 bg-[#006948] text-white rounded-lg font-semibold hover:bg-[#00855d] transition-colors">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <span className="material-symbols-outlined text-6xl text-[#bccac0] mb-4 block">event_busy</span>
                  <p className="text-[#6d7a72] text-lg">No upcoming bookings</p>
                  <p className="text-[#bccac0] text-sm mt-2">Browse services to create a new booking</p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {completedBookings.length > 0 ? (
                completedBookings.map((booking) => (
                  <div
                    key={booking.booking_id}
                    className="bg-white border border-[#bccac0] rounded-2xl p-6 hover:shadow-lg transition-shadow opacity-75"
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                      {/* Icon */}
                      <div className="w-20 h-20 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined text-blue-600 text-4xl">
                          {getServiceIcon(booking.service_type)}
                        </span>
                      </div>

                      {/* Booking Details */}
                      <div className="flex-grow">
                        <h3 className="text-xl font-semibold text-[#191c1e] mb-2 capitalize">
                          {booking.service_type || 'Service Booking'}
                        </h3>
                        <div className="space-y-1 text-[#6d7a72]">
                          <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-lg">event</span>
                            <span>
                              {booking.booking_date || 'Date not specified'} {booking.booking_time || ''}
                            </span>
                          </div>
                          {booking.provider_id && (
                            <div className="flex items-center gap-2">
                              <span className="material-symbols-outlined text-lg">person</span>
                              <span>Provider: {booking.provider_name || 'Service Provider'}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Status */}
                      <div className="flex flex-col items-end gap-3">
                        <span className={`px-4 py-2 rounded-full text-sm font-semibold capitalize ${getStatusColor(booking.status)}`}>
                          {booking.status || 'Completed'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <span className="material-symbols-outlined text-6xl text-[#bccac0] mb-4 block">history</span>
                  <p className="text-[#6d7a72] text-lg">No completed bookings yet</p>
                  <p className="text-[#bccac0] text-sm mt-2">Your completed services will appear here</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 font-['Inter'] text-sm w-full rounded-t-2xl border-t border-slate-200 mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 max-w-7xl mx-auto space-y-4 md:space-y-0">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-lg font-bold text-emerald-700">HomeHero</span>
            <span className="text-slate-500">© 2024 HomeHero. Trusted Care for your home.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MyBookingsScreen;