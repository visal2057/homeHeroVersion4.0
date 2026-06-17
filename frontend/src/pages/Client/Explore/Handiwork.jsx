import React, { useState } from 'react';
import ClientHeader from '../../../components/ClientHeader';

const Handiwork = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedTime, setSelectedTime] = useState('2:00');
  const [timePeriod, setTimePeriod] = useState('AM');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  return (
    <div className={`bg-[#f7f9fb] text-[#191c1e] min-h-screen flex flex-col font-['Inter'] relative overflow-x-hidden ${isDrawerOpen ? 'overflow-hidden' : ''}`}>
      <style>{`
        .hero-bg {
          background-image: linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)), url(https://images.unsplash.com/photo-1581578731548-c64695c952952?auto=format&fit=crop&w=1350&q=80);
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
            <div className="text-[18px] text-[#006948] font-semibold">Specify the handiwork request</div>
          </div>
          <div className="space-y-[4px]">
            <label className="text-[14px] font-semibold text-[#3d4a42] block" htmlFor="details">Request Details</label>
            <textarea className="w-full rounded-xl border-[#bccac0] focus:border-[#006948] focus:ring-[#006948] bg-[#f2f4f6] text-[16px] p-[24px]" id="details" placeholder="Describe what you need help with..." rows="4" />
          </div>
          <div className="space-y-[12px]">
            <label className="text-[14px] font-semibold text-[#3d4a42] block">Preferred Days</label>
            <div className="flex gap-2">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => (<button key={`${day}-${idx}`} className={`w-10 h-10 rounded-full border border-[#bccac0] flex items-center justify-center font-semibold transition-all hover:border-[#006948] ${selectedDays.includes(`${day}-${idx}`) ? 'bg-[#006948] text-white' : ''}`} onClick={() => toggleDay(`${day}-${idx}`)}>
                {day}
              </button>))}
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
          <button className="w-full bg-[#006948] text-white font-semibold py-4 rounded-xl shadow-lg shadow-[#006948]/20 hover:bg-[#00855d] transition-all active:scale-[0.98]">Send Request</button>
        </div>
      </aside>

      <ClientHeader pageTitle="Handiwork" />
      <main className="flex-grow pt-16">
        <section className="hero-bg py-[80px] px-[32px] text-center text-white mb-[48px] min-h-[400px] flex items-center justify-center">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-[40px] font-bold mb-[12px] drop-shadow-lg leading-[1.2] tracking-[-0.02em]">Small repairs, big peace of mind.</h1>
            <p className="text-[18px] max-w-2xl mx-auto drop-shadow-md opacity-95 leading-[1.6]">Connect with skilled handymen for installations, fixes, and home improvement tasks.</p>
          </div>
        </section>

        <section className="mb-[80px] px-[32px] max-w-3xl mx-auto">
          <div className="relative flex items-center w-full h-14 rounded-full focus-within:shadow-lg bg-white border border-[#bccac0] overflow-hidden transition-shadow">
            <div className="grid place-items-center h-full w-12 text-[#6d7a72]">
              <span className="material-symbols-outlined">search</span>
            </div>
            <input className="peer h-full w-full outline-none text-[16px] text-[#191c1e] bg-transparent pr-2 border-none focus:ring-0" id="search" placeholder="Search by name, specialty, or location..." type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-[32px] w-full">
          <section className="mb-[80px]">
            <h2 className="text-[32px] font-semibold text-[#191c1e] mb-[24px]">Featured Handiwork Specialists</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-[24px] mb-8">
              {[{name:'Roshan Perera',role:'General Handyman',rating:'5.0',reviews:88,avail:'Available'},{name:'Nirosha Jay',role:'Plumber',rating:'4.9',reviews:64,avail:'Available'},{name:'Anil Kumar',role:'Electrician',rating:'4.9',reviews:72,avail:'Available'},{name:'Samanthi',role:'Carpenter',rating:'4.8',reviews:45,avail:'Unavailable'},{name:'Priyan',role:'Painter',rating:'4.7',reviews:39,avail:'Unavailable'}].map((p,idx)=>(
                <div key={idx} className={`bg-white rounded-xl p-[24px] shadow-[0_4px_20px_-4px_rgba(6,78,59,0.05)] border ${idx===0? 'border-2 border-[#006948]/20':'border-[#eceef0]'} flex flex-col items-center text-center`}>
                  <div className="w-24 h-24 rounded-full mb-[12px] overflow-hidden border-2 border-[#006948] p-1">
                    <img alt={p.name} className="w-full h-full object-cover rounded-full" src={`https://source.unsplash.com/collection/888146/200x200?sig=${idx+60}`} />
                  </div>
                  <h3 className="text-[20px] font-semibold text-[#191c1e] mb-[4px]">{p.name}</h3>
                  <p className="text-[12px] font-medium text-[#006948] mb-[12px]">{p.role}</p>
                  <div className="flex items-center gap-[4px] mb-[24px]"><span className="material-symbols-outlined text-[#006948] text-[18px]">star</span><span className="text-[14px] font-semibold">{p.rating}</span><span className="text-[#3d4a42] text-sm">({p.reviews})</span></div>
                  <div className="text-[14px] font-semibold mb-[12px]">{p.avail}</div>
                  <button className="mt-auto w-full border border-[#006948] text-[#006948] text-[14px] font-semibold py-2 rounded-lg hover:bg-[#f2f4f6] transition-colors">View Profile</button>
                </div>
              ))}
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-[24px]">
              <h2 className="text-[32px] font-semibold text-[#191c1e]">Active Handiwork Service Providers</h2>
              <button className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#006948] text-[#006948] font-semibold hover:bg-[#006948]/5 transition-all active:scale-95 w-fit" onClick={toggleDrawer}>
                <span className="material-symbols-outlined text-[20px]">send_time_extension</span>
                Broadcast Request
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
              {[{name:'Roshan',role:'Handyman',city:'Colombo',rating:'5.0',slots:'5/10'},{name:'Nirosha',role:'Plumber',city:'Kandy',rating:'4.9',slots:'3/10'},{name:'Anil',role:'Electrician',city:'Galle',rating:'4.8',slots:'4/10'},{name:'Saman',role:'Carpenter',city:'Negombo',rating:'4.7',slots:'6/10'},{name:'Priya',role:'Painter',city:'Matara',rating:'4.9',slots:'2/10'}].map((p,idx)=>(
                <div key={idx} className="bg-white rounded-xl p-[24px] shadow-[0_4px_20px_-4px_rgba(6,78,59,0.05)] border border-[#eceef0] flex flex-col h-full hover:border-[#006948]/40 hover:shadow-lg transition-all group">
                  <div className="flex items-center gap-[24px] mb-[24px]">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#006948]/10 flex-shrink-0">
                      <img alt={p.name} className="w-full h-full object-cover" src={`https://source.unsplash.com/collection/888146/100x100?sig=${idx+70}`} />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="text-[20px] font-semibold text-[#191c1e]">{p.name}</h3>
                        <div className="flex items-center gap-[4px] bg-[#006948]/10 text-[#006948] px-3 py-1 rounded-full border border-[#006948]/20">
                          <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                          <span className="text-[14px] font-semibold">{p.rating}</span>
                        </div>
                      </div>
                      <p className="font-semibold text-[#006948]">{p.role}</p>
                    </div>
                  </div>
                  <div className="space-y-[12px] mb-[24px] flex-grow">
                    <div className="flex items-center gap-[12px] text-sm text-[#3d4a42]">
                      <span className="material-symbols-outlined text-[18px]">location_on</span>
                      <span>{p.city}</span>
                    </div>
                    <div className="flex items-center gap-[12px] text-sm text-[#191c1e]">
                      <span className="material-symbols-outlined text-[18px] text-[#006948]">calendar_month</span>
                      <span className="font-medium text-[#006948]">{p.slots} slots available this week</span>
                    </div>
                  </div>
                  <button className="w-full bg-[#006948] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#00855d] transition-colors shadow-md shadow-[#006948]/20">Book Now</button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <footer className="bg-slate-50 font-['Inter'] text-sm w-full rounded-t-2xl border-t border-slate-200 mt-[80px]">
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

export default Handiwork;
