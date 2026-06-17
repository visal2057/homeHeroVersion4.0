import React, { useMemo, useState } from 'react';
import ClientHeader from './ClientHeader';
import useServiceProviders from '../hooks/useServiceProviders';
import ServiceProviderCard from './ServiceProviderCard';

const ServiceExplorePage = ({ categoryKey, pageTitle, heroTitle, heroSubtitle, bannerImage }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { providers, loadingProviders, providerError } = useServiceProviders(categoryKey);

  const filteredProviders = useMemo(() => {
    if (!searchQuery.trim()) return providers;
    const query = searchQuery.toLowerCase();
    return providers.filter((provider) => {
      return (
        provider.username?.toLowerCase().includes(query) ||
        provider.district?.toLowerCase().includes(query) ||
        provider.category?.toLowerCase().includes(query)
      );
    });
  }, [providers, searchQuery]);

  const featuredProviders = useMemo(() => {
    return providers
      .filter(Boolean)
      .sort((a, b) => {
        if (a.is_online === b.is_online) {
          return (b.completed_jobs || 0) - (a.completed_jobs || 0);
        }
        return a.is_online ? -1 : 1;
      })
      .slice(0, 3);
  }, [providers]);

  const toggleDrawer = () => setIsDrawerOpen((value) => !value);
  const toggleDay = (day) => {
    setSelectedDays((current) =>
      current.includes(day) ? current.filter((item) => item !== day) : [...current, day]
    );
  };

  return (
    <div className={`bg-[#f7f9fb] text-[#191c1e] min-h-screen flex flex-col font-['Inter'] relative overflow-x-hidden ${isDrawerOpen ? 'overflow-hidden' : ''}`}>
      <style>{`
        .hero-bg {
          background-image: linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)), url(${bannerImage});
          background-size: cover;
          background-position: center;
        }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isDrawerOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={toggleDrawer} />

      <aside className={`fixed left-0 top-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col border-r border-[#bccac0] transition-transform duration-300 ease-in-out ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 flex items-center justify-between border-b border-[#bccac0]">
          <h2 className="text-[24px] font-semibold text-[#191c1e]">Specify Request</h2>
          <button className="p-2 hover:bg-[#e0e3e5] rounded-full transition-colors" onClick={toggleDrawer}>
            <span className="material-symbols-outlined text-[#191c1e]">close</span>
          </button>
        </div>
        <div className="flex-grow overflow-y-auto p-6 space-y-[48px]">
          <div className="space-y-[4px]">
            <label className="text-[14px] font-semibold text-[#3d4a42] block">Request Topic</label>
            <div className="text-[18px] text-[#006948] font-semibold">Specify your request details</div>
          </div>
          <div className="space-y-[4px]">
            <label className="text-[14px] font-semibold text-[#3d4a42] block" htmlFor="details">Request Details</label>
            <textarea className="w-full rounded-xl border-[#bccac0] focus:border-[#006948] focus:ring-[#006948] bg-[#f2f4f6] text-[16px] p-[24px]" id="details" placeholder="Describe what you need help with..." rows="4" />
          </div>
          <div className="space-y-[12px]">
            <label className="text-[14px] font-semibold text-[#3d4a42] block">Preferred Days</label>
            <div className="flex gap-2 flex-wrap">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => {
                const id = `${day}-${idx}`;
                const active = selectedDays.includes(id);
                return (
                  <button
                    key={id}
                    className={`w-10 h-10 rounded-full border border-[#bccac0] flex items-center justify-center font-semibold transition-all hover:border-[#006948] ${active ? 'bg-[#006948] text-white' : ''}`}
                    onClick={() => toggleDay(id)}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="space-y-[4px]">
            <label className="text-[14px] font-semibold text-[#3d4a42] block" htmlFor="address">Service Location</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#6d7a72] text-[20px]">location_on</span>
              <input className="w-full rounded-xl border-[#bccac0] focus:border-[#006948] focus:ring-[#006948] bg-[#f2f4f6] text-[16px] py-3 pl-10 pr-4" id="address" placeholder="Enter your address" type="text" />
            </div>
          </div>
        </div>
        <div className="p-6 border-t border-[#bccac0]">
          <button className="w-full bg-[#006948] text-white font-semibold py-4 rounded-xl shadow-lg shadow-[#006948]/20 hover:bg-[#00855d] transition-all active:scale-[0.98]">
            Send Request
          </button>
        </div>
      </aside>

      <ClientHeader pageTitle={pageTitle} />

      <main className="flex-grow pt-16">
        <section className="hero-bg py-[80px] px-[32px] text-center text-white mb-[48px] min-h-[400px] flex items-center justify-center">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-[40px] font-bold mb-[12px] drop-shadow-lg leading-[1.2] tracking-[-0.02em]">{heroTitle}</h1>
            <p className="text-[18px] max-w-2xl mx-auto drop-shadow-md opacity-95 leading-[1.6]">{heroSubtitle}</p>
          </div>
        </section>

        <section className="mb-[48px] px-[32px] max-w-3xl mx-auto">
          <div className="relative flex items-center w-full h-14 rounded-full focus-within:shadow-lg bg-white border border-[#bccac0] overflow-hidden transition-shadow">
            <div className="grid place-items-center h-full w-12 text-[#6d7a72]">
              <span className="material-symbols-outlined">search</span>
            </div>
            <input
              className="peer h-full w-full outline-none text-[16px] text-[#191c1e] bg-transparent pr-2 border-none focus:ring-0"
              id="search"
              placeholder="Search by provider name, category, or location..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </section>

        {featuredProviders.length > 0 && (
          <section className="max-w-7xl mx-auto px-[32px] w-full pb-[56px]">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-[24px]">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-[#6d7a72] font-semibold">Featured specialists</p>
                <h2 className="text-[32px] font-semibold text-[#191c1e]">Top {categoryKey} specialists</h2>
              </div>
              <p className="max-w-2xl text-sm text-[#5c6b5f]">These specialists are selected from verified providers with strong availability and high completion counts.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px] mb-[48px]">
              {featuredProviders.map((provider) => (
                <div key={provider.userid} className="rounded-[28px] border border-[#d9e3db] bg-white p-6 shadow-sm transition hover:shadow-lg">
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#006948]/15 flex-shrink-0">
                      <img
                        alt={provider.username}
                        className="w-full h-full object-cover"
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(provider.username)}&background=006948&color=ffffff`}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[20px] font-semibold text-[#191c1e]">{provider.username}</h3>
                      <p className="text-sm text-[#006948] font-semibold mt-1">{provider.category}</p>
                      <div className="mt-3 flex flex-wrap gap-2 text-[13px] text-[#334136]">
                        <span className="rounded-full bg-[#e8faf0] px-3 py-1 text-[#006948]">{provider.is_online ? 'Online now' : 'Offline'}</span>
                        <span className="rounded-full bg-[#f2f5f1] px-3 py-1">{provider.completed_jobs || 0} completed jobs</span>
                        <span className="rounded-full bg-[#f2f5f1] px-3 py-1">{provider.district || 'Unknown location'}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const query = new URLSearchParams({
                        providerId: provider.userid,
                        providerName: provider.username,
                        category: provider.category || categoryKey
                      }).toString();
                      window.location.href = `/checkout?${query}`;
                    }}
                    className="w-full rounded-3xl bg-[#006948] px-5 py-3 text-sm font-semibold text-white hover:bg-[#00855d] transition-colors"
                  >
                    Book Now
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="max-w-7xl mx-auto px-[32px] w-full pb-[80px]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-[24px]">
            <div>
              <h2 className="text-[32px] font-semibold text-[#191c1e]">Available {categoryKey} Providers</h2>
              <p className="text-slate-600 mt-2">Browse real verified providers matching the selected service category.</p>
            </div>
            <button
              className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#006948] text-[#006948] font-semibold hover:bg-[#006948]/5 transition-all active:scale-95 w-fit"
              onClick={toggleDrawer}
            >
              <span className="material-symbols-outlined text-[20px]">send_time_extension</span>
              Broadcast Request
            </button>
          </div>

          {loadingProviders && (
            <div className="rounded-3xl border border-dashed border-[#006948]/40 bg-white p-12 text-center text-[#3d4a42] font-medium">
              Loading providers for {categoryKey}...
            </div>
          )}

          {providerError && (
            <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center text-red-700 font-medium">
              {providerError}
            </div>
          )}

          {!loadingProviders && !providerError && filteredProviders.length === 0 && (
            <div className="rounded-3xl border border-[#006948]/40 bg-white p-12 text-center text-[#3d4a42] font-medium">
              No providers match your search at the moment. Try another keyword or check back later.
            </div>
          )}

          {!loadingProviders && !providerError && filteredProviders.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
              {filteredProviders.map((provider) => (
                <ServiceProviderCard key={provider.userid} provider={provider} category={categoryKey} />
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="bg-slate-50 font-['Inter'] text-sm w-full rounded-t-2xl border-t border-slate-200">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 max-w-7xl mx-auto space-y-4 md:space-y-0">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-lg font-bold text-emerald-700">HomeHero</span>
            <span className="text-slate-500">� 2024 HomeHero. Trusted care for your home.</span>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <a className="text-slate-500 hover:text-emerald-600 underline underline-offset-4 transition-opacity text-sm" href="#services">Services</a>
            <a className="text-slate-500 hover:text-emerald-600 underline underline-offset-4 transition-opacity text-sm" href="#providers">Providers</a>
            <a className="text-slate-500 hover:text-emerald-600 underline underline-offset-4 transition-opacity text-sm" href="#pro">Join as Pro</a>
            <a className="text-slate-500 hover:text-emerald-600 underline underline-offset-4 transition-opacity text-sm" href="#privacy">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ServiceExplorePage;
