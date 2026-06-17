import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../components/AuthContext';
import ClientHeader from '../../components/ClientHeader';
import { API_BASE } from '../../config/api';

const CommonCheckout = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [jobDescription, setJobDescription] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [address, setAddress] = useState(user?.district || '');
  const [errorMessage, setErrorMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const providerId = searchParams.get('providerId') || '';
  const providerName = searchParams.get('providerName') || '';
  const serviceCategory = searchParams.get('category') || '';

  const handleConfirmBooking = async () => {
    setErrorMessage('');

    if (!providerId || !providerName || !serviceCategory) {
      setErrorMessage('Please select a provider from the service listing before continuing to checkout.');
      return;
    }

    if (!bookingDate || !bookingTime || !address || !jobDescription) {
      setErrorMessage('Please complete all fields before submitting your booking.');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setErrorMessage('Authentication error. Please log in again.');
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(`${API_BASE}/api/booking-actions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          service_provider_id: providerId,
          service_provider_name: providerName,
          service_category: serviceCategory,
          job_type: 'Direct job',
          job_description: jobDescription,
          booking_date: bookingDate,
          booking_time: bookingTime,
          address
        })
      });

      const data = await response.json();
      if (!response.ok) {
        setErrorMessage(data.error || 'Unable to create booking. Please try again.');
        setSubmitting(false);
        return;
      }

      navigate('/booking/confirmed');
    } catch (error) {
      console.error('Checkout booking error:', error);
      setErrorMessage('Unable to submit booking. Please try again later.');
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#f7f9fb] text-[#191c1e] min-h-screen flex flex-col font-['Inter'] relative overflow-x-hidden">
      <ClientHeader pageTitle="Checkout" />
      <main className="flex-grow pt-20 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-4xl">
          <section className="mb-10 rounded-[32px] border border-[#d9e3db] bg-white p-8 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.22em] text-[#006948] font-semibold">Checkout</p>
                <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#191c1e]">Confirm your booking details</h1>
                <p className="mt-2 text-base text-[#3d4a42]">Your selected service provider and category are preloaded from the previous page.</p>
              </div>
              <div className="inline-flex items-center gap-3 rounded-full border border-[#e2e8f0] bg-[#f8fafc] px-5 py-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#006948] text-white">{user?.username?.charAt(0)?.toUpperCase() || 'C'}</span>
                <div>
                  <p className="text-sm font-medium text-[#191c1e]">{user?.username || user?.email || 'HomeHero Client'}</p>
                  <p className="text-xs text-[#6b7280]">Logged in as client</p>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-8">
            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-6 rounded-[32px] border border-[#d9e3db] bg-white p-8 shadow-sm">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-[#6d7a72] font-semibold">Booking for</p>
                    <h2 className="mt-3 text-2xl font-semibold text-[#191c1e]">{providerName || 'No provider selected'}</h2>
                    <p className="text-sm text-[#006948] font-semibold">{serviceCategory || 'Unknown service category'}</p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-3xl border border-[#e2e8f0] bg-[#f8fafc] p-5">
                      <p className="text-sm text-[#6b7280]">Client</p>
                      <p className="mt-2 font-semibold text-[#191c1e]">{user?.username || user?.email || 'Client User'}</p>
                    </div>
                    <div className="rounded-3xl border border-[#e2e8f0] bg-[#f8fafc] p-5">
                      <p className="text-sm text-[#6b7280]">Booking type</p>
                      <p className="mt-2 font-semibold text-[#191c1e]">Direct job</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <label htmlFor="request-details" className="text-sm font-medium text-[#3d4a42]">Request Details</label>
                    <textarea
                      id="request-details"
                      rows={5}
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      className="mt-3 w-full rounded-3xl border border-[#d9e3db] bg-[#f8fafc] p-5 text-sm text-[#191c1e] outline-none transition focus:border-[#006948] focus:ring-2 focus:ring-[#d6f5e8]"
                      placeholder="Describe the work you want the provider to do..."
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="booking-date" className="text-sm font-medium text-[#3d4a42]">Booking Date</label>
                      <input
                        id="booking-date"
                        type="date"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="mt-3 w-full rounded-3xl border border-[#d9e3db] bg-[#f8fafc] p-4 text-sm text-[#191c1e] outline-none transition focus:border-[#006948] focus:ring-2 focus:ring-[#d6f5e8]"
                      />
                    </div>
                    <div>
                      <label htmlFor="booking-time" className="text-sm font-medium text-[#3d4a42]">Booking Time</label>
                      <input
                        id="booking-time"
                        type="time"
                        value={bookingTime}
                        onChange={(e) => setBookingTime(e.target.value)}
                        className="mt-3 w-full rounded-3xl border border-[#d9e3db] bg-[#f8fafc] p-4 text-sm text-[#191c1e] outline-none transition focus:border-[#006948] focus:ring-2 focus:ring-[#d6f5e8]"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="booking-address" className="text-sm font-medium text-[#3d4a42]">Service Address</label>
                    <input
                      id="booking-address"
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Enter your service address"
                      className="mt-3 w-full rounded-3xl border border-[#d9e3db] bg-[#f8fafc] p-4 text-sm text-[#191c1e] outline-none transition focus:border-[#006948] focus:ring-2 focus:ring-[#d6f5e8]"
                    />
                  </div>
                </div>

                {errorMessage && (
                  <div className="rounded-3xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">{errorMessage}</div>
                )}

                <button
                  type="button"
                  onClick={handleConfirmBooking}
                  disabled={submitting}
                  className="w-full rounded-3xl bg-[#006948] px-6 py-4 text-lg font-semibold text-white transition hover:bg-[#00855d] disabled:cursor-not-allowed disabled:bg-slate-400"
                >
                  {submitting ? 'Submitting booking...' : 'Confirm Booking'}
                </button>
              </div>

              <aside className="space-y-6 rounded-[32px] border border-[#d9e3db] bg-[#f6fff6] p-8 shadow-sm">
                <div className="rounded-3xl bg-white p-6 shadow-sm border border-[#e2e8f0]">
                  <p className="text-sm uppercase tracking-[0.2em] text-[#6d7a72] font-semibold">Booking Summary</p>
                  <div className="mt-6 space-y-4 text-sm text-[#3d4a42]">
                    <div className="flex justify-between gap-4">
                      <span className="font-medium">Client</span>
                      <span>{user?.username || user?.email || 'Client User'}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="font-medium">Provider</span>
                      <span>{providerName || 'Not selected'}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="font-medium">Service</span>
                      <span>{serviceCategory || 'Not selected'}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="font-medium">Job type</span>
                      <span>Direct job</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="font-medium">Status</span>
                      <span className="text-[#006948] font-semibold">Pending</span>
                    </div>
                  </div>
                </div>
                <div className="rounded-3xl border border-[#e2e8f0] bg-white p-6 text-sm text-[#3d4a42]">
                  <p className="font-semibold text-[#191c1e]">Need help?</p>
                  <p className="mt-3 leading-6">If your selected provider is unavailable, the booking can still be reviewed and reassigned by our service team. Make sure your details are accurate before confirming.</p>
                </div>
              </aside>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default CommonCheckout;
