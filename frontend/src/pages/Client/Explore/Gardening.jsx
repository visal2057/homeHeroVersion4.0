import React, { useState } from 'react';
import ClientHeader from '../../../components/ClientHeader';

export default function Gardening() {
  // State for controlling the broadcast drawer visibility
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  // State for user interactions inside the drawer
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedTime, setSelectedTime] = useState('2:00');
  const [timePeriod, setTimePeriod] = useState('AM');
  const [searchQuery, setSearchQuery] = useState('');

  // Handlers
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  return (
    <div className={`bg-[#f7f9fb] text-[#191c1e] min-h-screen flex flex-col font-['Inter'] relative overflow-x-hidden ${isDrawerOpen ? 'overflow-hidden' : ''}`}>
      
      {/* Inline style definitions to match original custom background & scrollbar behaviors */}
      <style>{`
        .hero-bg {
          background-image: linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)), url(https://lh3.googleusercontent.com/aida-public/AB6AXuD2Zuc2zd3eLf39almmxEuqLCehjVt4QQvAs4NTok6uQvs1GTfr3Z7jfxcz3czL-uU0qGy3GhXSI4TBTjNY-xQ0XJorTyXqKfRwRuA5IUUyRY3Y1tstF_BHTHFotWX6p0KB9T2AMsIQFDw_CM_Gpjadg2mFahyqC6FL9sOZIil9pwn-TL_dbQjGsLsukAODBTMmDk1uLs39cK2ZJRrtRQ06BcjwzBcVcuMzG8puC5o3zPMWtkNELtwigrBwoRIllRzYcMKajn4oyM8);
          background-size: cover;
          background-position: center;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Drawer Overlay */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isDrawerOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} 
        onClick={toggleDrawer}
      />

      {/* Broadcast Request Drawer */}
      <aside className={`fixed left-0 top-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col border-r border-[#bccac0] transition-transform duration-300 ease-in-out ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 flex items-center justify-between border-b border-[#bccac0]">
          <h2 className="text-[24px] font-semibold text-[#191c1e]">Specify Request</h2>
          <button className="p-2 hover:bg-[#e0e3e5] rounded-full transition-colors" onClick={toggleDrawer}>
            <span className="material-symbols-outlined text-[#191c1e]">close</span>
          </button>
        </div>
        
        <div className="flex-grow overflow-y-auto p-6 space-y-[48px]">
          {/* Topic */}
          <div className="space-y-[4px]">
            <label className="text-[14px] font-semibold text-[#3d4a42] block">Request Topic</label>
            <div className="text-[18px] text-[#006948] font-semibold">Specify the gardening request</div>
          </div>

          {/* Message Box */}
          <div className="space-y-[4px]">
            <label className="text-[14px] font-semibold text-[#3d4a42] block" htmlFor="details">Request Details</label>
            <textarea 
              className="w-full rounded-xl border-[#bccac0] focus:border-[#006948] focus:ring-[#006948] bg-[#f2f4f6] text-[16px] p-[24px]" 
              id="details" 
              placeholder="Describe what you need help with..." 
              rows="4"
            />
          </div>

          {/* Weekday Selector */}
          <div className="space-y-[12px]">
            <label className="text-[14px] font-semibold text-[#3d4a42] block">Preferred Days</label>
            <div className="flex gap-2">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => {
                const dayId = `${day}-${idx}`;
                const isSelected = selectedDays.includes(dayId);
                return (
                  <button
                    key={dayId}
                    className={`w-10 h-10 rounded-full border border-[#bccac0] flex items-center justify-center font-semibold transition-all hover:border-[#006948] ${isSelected ? 'bg-[#006948] text-white' : ''}`}
                    onClick={() => toggleDay(dayId)}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Selector */}
          <div className="space-y-[12px]">
            <label className="text-[14px] font-semibold text-[#3d4a42] block">Preferred Time</label>
            <div className="flex items-center gap-4">
              <div className="flex-grow overflow-x-auto hide-scrollbar border border-[#bccac0] rounded-lg bg-[#f2f4f6] p-2">
                <div className="flex gap-4 min-w-max px-2">
                  {['1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00'].map((time) => (
                    <button
                      key={time}
                      className={`px-3 py-1 rounded text-[16px] ${selectedTime === time ? 'bg-[#006948] text-white' : 'hover:bg-[#006948]/10'}`}
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-col border border-[#bccac0] rounded-lg overflow-hidden flex-shrink-0">
                <button 
                  className={`px-3 py-1 text-xs font-bold ${timePeriod === 'AM' ? 'bg-[#006948] text-white' : 'hover:bg-[#e0e3e5] text-[#191c1e]'}`}
                  onClick={() => setTimePeriod('AM')}
                >
                  AM
                </button>
                <button 
                  className={`px-3 py-1 text-xs font-bold ${timePeriod === 'PM' ? 'bg-[#006948] text-white' : 'hover:bg-[#e0e3e5] text-[#191c1e]'}`}
                  onClick={() => setTimePeriod('PM')}
                >
                  PM
                </button>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="space-y-[4px]">
            <label className="text-[14px] font-semibold text-[#3d4a42] block" htmlFor="address">Service Location</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#6d7a72] text-[20px]">location_on</span>
              <input 
                className="w-full rounded-xl border-[#bccac0] focus:border-[#006948] focus:ring-[#006948] bg-[#f2f4f6] text-[16px] py-3 pl-10 pr-4" 
                id="address" 
                placeholder="Enter your address" 
                type="text"
              />
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-[#bccac0]">
          <button className="w-full bg-[#006948] text-white font-semibold py-4 rounded-xl shadow-lg shadow-[#006948]/20 hover:bg-[#00855d] transition-all active:scale-[0.98]">
            Send Request
          </button>
        </div>
      </aside>

      <ClientHeader pageTitle="Gardening" />
      
      <main className="flex-grow pt-16">
        <section className="hero-bg py-[80px] px-[32px] text-center text-white mb-[48px] min-h-[400px] flex items-center justify-center">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-[40px] font-bold mb-[12px] drop-shadow-lg leading-[1.2] tracking-[-0.02em]">Your garden is a reflection of you.</h1>
            <p className="text-[18px] max-w-2xl mx-auto drop-shadow-md opacity-95 leading-[1.6]">Find trusted, top-rated gardening professionals to bring your outdoor space to life. Expert care for your lawn, plants, and landscape.</p>
          </div>
        </section>

        {/* Search Bar */}
        <section className="mb-[80px] px-[32px] max-w-3xl mx-auto">
          <div className="relative flex items-center w-full h-14 rounded-full focus-within:shadow-lg bg-white border border-[#bccac0] overflow-hidden transition-shadow">
            <div className="grid place-items-center h-full w-12 text-[#6d7a72]">
              <span className="material-symbols-outlined">search</span>
            </div>
            <input 
              className="peer h-full w-full outline-none text-[16px] text-[#191c1e] bg-transparent pr-2 border-none focus:ring-0" 
              id="search" 
              placeholder="Search by name, specialty, or location..." 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-[32px] w-full">
          {/* Top 5 Podium */}
          <section className="mb-[80px]">
            <h2 className="text-[32px] font-semibold text-[#191c1e] mb-[24px] leading-[1.3] tracking-[-0.01em]">Featured Gardening Specialists</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-[24px]">
              
              {/* Pro 1 */}
              <div className="bg-white rounded-xl p-[24px] shadow-[0_4px_20px_-4px_rgba(6,78,59,0.05)] border-2 border-[#006948]/20 flex flex-col items-center text-center relative overflow-hidden group hover:shadow-[0_8px_30px_-4px_rgba(6,78,59,0.15)] transition-all scale-105 z-10">
                <div className="absolute top-0 left-0 w-full h-1 bg-[#006948]"></div>
                <div className="w-24 h-24 rounded-full mb-[12px] overflow-hidden border-2 border-[#006948] p-1">
                  <img alt="Aruna Perera avatar" className="w-full h-full object-cover rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBky-LCvvslIgRhze2Fq-YzzwY8rksBJvAmGjdKmgEJn2YcBSXM5u7APRuUfkoU_zjaEY8uHtsEc6Y5VM8bM3eNgjGDu2XstvBsJBChRGmz8JhTz2KiUARyEFpD8NgrrDBdQ_3hylghZUYNI5VHLK9pLaARPQ-bObR02YGTv3mXEZ4vr-DxBv0lox2BuDKFGc1quGR5aojXzYtgGB9JEDoq9u9-CTLaQHQirvIRmY50TsB3aNiVuxGWpihQYnp0OSkZ2GjiHX3n6UE" />
                </div>
                <h3 className="text-[24px] font-semibold text-[#191c1e] mb-[4px]">Aruna Perera</h3>
                <p className="text-[12px] font-medium text-[#006948] mb-[12px]">Master Landscaper</p>
                <div className="flex items-center gap-[4px] mb-[24px]">
                  <span className="material-symbols-outlined text-[#006948] text-[18px]" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                  <span className="text-[14px] font-semibold text-[#191c1e]">5.0</span>
                  <span className="text-[#3d4a42] text-sm">(124)</span>
                </div>
                <div className="text-[#006948] text-[14px] font-semibold mb-[24px]">Available</div>
                <button className="mt-auto w-full border border-[#006948] text-[#006948] text-[14px] font-semibold py-2 rounded-lg hover:bg-[#006948]/5 transition-colors">View Profile</button>
              </div>

              {/* Pro 2 */}
              <div className="bg-white rounded-xl p-[24px] shadow-[0_4px_20px_-4px_rgba(6,78,59,0.05)] border border-[#eceef0] flex flex-col items-center text-center relative overflow-hidden group hover:shadow-[0_8px_30px_-4px_rgba(6,78,59,0.1)] transition-all">
                <div className="w-20 h-20 rounded-full mb-[12px] overflow-hidden border border-[#bccac0] p-[4px]">
                  <img alt="Dinesh Silva avatar" className="w-full h-full object-cover rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB24PcYc3Z2SDHxoDL8I1DtBqZlkLjzPuruk6PNQ5biUWpxQy1rXrvDxGh04-5TWpy4CqcPj0t0R1LTBesnJGHeI_dl-Wt-xISiZdOhYtQmqw7B_G5dI2q66qKRxbUuPlofSpq0eLPq7weZt2GH0KcfAAwA08YLjuLCbl09-ZkN3tjVSSoU2pWVuzS4ct9nz2v7AyG_sviI10G8h7vzlUT_ekdh-nAqIv8kJI42btIMR61eBlH7sycsWIls6s0uNS_3XJ8qlbQjJbw" />
                </div>
                <h3 className="text-[24px] font-semibold text-[#191c1e] mb-[4px]">Dinesh Silva</h3>
                <p className="text-[12px] font-medium text-[#006948] mb-[12px]">Plant Care Expert</p>
                <div className="flex items-center gap-[4px] mb-[24px]">
                  <span className="material-symbols-outlined text-[#006948] text-[18px]" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                  <span className="text-[14px] font-semibold text-[#191c1e]">4.9</span>
                  <span className="text-[#3d4a42] text-sm">(98)</span>
                </div>
                <div className="text-[#006948] text-[14px] font-semibold mb-[24px]">Available</div>
                <button className="mt-auto w-full border border-[#006948] text-[#006948] text-[14px] font-semibold py-2 rounded-lg hover:bg-[#f2f4f6] transition-colors">View Profile</button>
              </div>

              {/* Pro 3 */}
              <div className="bg-white rounded-xl p-[24px] shadow-[0_4px_20px_-4px_rgba(6,78,59,0.05)] border border-[#eceef0] flex flex-col items-center text-center relative overflow-hidden group hover:shadow-[0_8px_30px_-4px_rgba(6,78,59,0.1)] transition-all">
                <div className="w-20 h-20 rounded-full mb-[12px] overflow-hidden border border-[#bccac0] p-[4px]">
                  <img alt="Kamal Fernando avatar" className="w-full h-full object-cover rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIJsnwE4vHyl7dHaP6aNC_g1i_LfLVe_17mkYc598q2g64CklPBAOBvL9SWiGlgZ32c-gc828KpnrO8NRGHPsqKrWibRNZqoUsVaWsZQxMbHOS0xBI9415NBKRYgdcFE3HbRtlcN5S9tXPC1NVqalgG5noPVNZjjSXd6bF1zcdmZhvq0Qs-vukWSmN97wCAWhf_OTEre2fJtVXXFZP6x9GsQREHLM5duDeoz3v_TMvzOzvlskTXjODDV0tJSB4aHmMkscd4sDogaQ" />
                </div>
                <h3 className="text-[24px] font-semibold text-[#191c1e] mb-[4px]">Kamal Fernando</h3>
                <p className="text-[12px] font-medium text-[#006948] mb-[12px]">Lawn Specialist</p>
                <div className="flex items-center gap-[4px] mb-[24px]">
                  <span className="material-symbols-outlined text-[#006948] text-[18px]" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                  <span className="text-[14px] font-semibold text-[#191c1e]">4.9</span>
                  <span className="text-[#3d4a42] text-sm">(156)</span>
                </div>
                <div className="text-[#006948] text-[14px] font-semibold mb-[24px]">Available</div>
                <button className="mt-auto w-full border border-[#006948] text-[#006948] text-[14px] font-semibold py-2 rounded-lg hover:bg-[#f2f4f6] transition-colors">View Profile</button>
              </div>

              {/* Pro 4 */}
              <div className="bg-white rounded-xl p-[24px] shadow-[0_4px_20px_-4px_rgba(6,78,59,0.05)] border border-[#eceef0] flex flex-col items-center text-center relative overflow-hidden group hover:shadow-[0_8px_30px_-4px_rgba(6,78,59,0.1)] transition-all">
                <div className="w-20 h-20 rounded-full mb-[12px] overflow-hidden border border-[#bccac0] p-[4px]">
                  <img alt="Nadeeka Peiris avatar" className="w-full h-full object-cover rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6t0J3xHoWCxWrnADgnEO8xCex9LbfrQScnR_TqXJrAQeNCNoHBzl104jUFOg3tfe2WkLJhJdLrj6RQfEN8iKSRHRQ2Nox9GmzrEr7wEbnDa7AayQ7eS57tlgr0qldNiTqbDHVpDrYFUKTH_lynMmPM-L1fw1duCI_AU2t3juMTETufrQDC5tcUoRgsvpr9vKnvf7lkmCAQ7BCILNxTqGVo6FTACPvrxZVTYqShPJGuK76Iw1zzbMdTtq3QnFUoQvbtEtMzrkxttk" />
                </div>
                <h3 className="text-[24px] font-semibold text-[#191c1e] mb-[4px]">Nadeeka Peiris</h3>
                <p className="text-[12px] font-medium text-[#006948] mb-[12px]">Garden Design</p>
                <div className="flex items-center gap-[4px] mb-[24px]">
                  <span className="material-symbols-outlined text-[#006948] text-[18px]" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                  <span className="text-[14px] font-semibold text-[#191c1e]">4.8</span>
                  <span className="text-[#3d4a42] text-sm">(87)</span>
                </div>
                <div className="text-[#ba1a1a] text-[14px] font-semibold mb-[24px]">Currently Unavailable</div>
                <button className="mt-auto w-full border border-[#006948] text-[#006948] text-[14px] font-semibold py-2 rounded-lg hover:bg-[#f2f4f6] transition-colors">View Profile</button>
              </div>

              {/* Pro 5 */}
              <div className="bg-white rounded-xl p-[24px] shadow-[0_4px_20px_-4px_rgba(6,78,59,0.05)] border border-[#eceef0] flex flex-col items-center text-center relative overflow-hidden group hover:shadow-[0_8px_30px_-4px_rgba(6,78,59,0.1)] transition-all">
                <div className="w-20 h-20 rounded-full mb-[12px] overflow-hidden border border-[#bccac0] p-[4px]">
                  <img alt="Ruwan Jay avatar" className="w-full h-full object-cover rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAfMnCs--fHLgLLQtFvN7WVnN4cXLckRT48RanKKhMFYkhanzoxtFL8NQKkrVESwY1Qr1SGy9jfzWp0oiB76uwuLQaMI3tAhNxZvUQKe9ME-pfpoQ70LRHPxqPGt5BlrXwJ6sBlOjKJe36qYPYC5Psq_mJQJxMuNLX4qGOsO_7SVKaiLvxNpYw_XvFFJra9TZ2Ef5ZJBfRKmHXOFTwtCDjjXCTufxQ-nKu4E5FT_wukEMTixnoNAyilGWf3kuInj635cRpRwkNfwM" />
                </div>
                <h3 className="text-[24px] font-semibold text-[#191c1e] mb-[4px]">Ruwan Jay</h3>
                <p className="text-[12px] font-medium text-[#006948] mb-[12px]">Tree Surgeon</p>
                <div className="flex items-center gap-[4px] mb-[24px]">
                  <span className="material-symbols-outlined text-[#006948] text-[18px]" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                  <span className="text-[14px] font-semibold text-[#191c1e]">4.8</span>
                  <span className="text-[#3d4a42] text-sm">(112)</span>
                </div>
                <div className="text-[#ba1a1a] text-[14px] font-semibold mb-[24px]">Currently Unavailable</div>
                <button className="mt-auto w-full border border-[#006948] text-[#006948] text-[14px] font-semibold py-2 rounded-lg hover:bg-[#f2f4f6] transition-colors">View Profile</button>
              </div>

            </div>
          </section>

          {/* All Active Specialists Expanded */}
          <section className="pb-[80px]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-[24px]">
              <h2 className="text-[32px] font-semibold text-[#191c1e]">Active Gardening Service Providers</h2>
              <button 
                className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#006948] text-[#006948] font-semibold hover:bg-[#006948]/5 transition-all active:scale-95 w-fit"
                onClick={toggleDrawer}
              >
                <span className="material-symbols-outlined text-[20px]">send_time_extension</span>
                Broadcast Request
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
              
              {/* Specialist 1 */}
              <div className="bg-white rounded-xl p-[24px] shadow-[0_4px_20px_-4px_rgba(6,78,59,0.05)] border border-[#eceef0] flex flex-col h-full hover:border-[#006948]/40 hover:shadow-lg transition-all group">
                <div className="flex items-center gap-[24px] mb-[24px]">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#006948]/10 flex-shrink-0 group-hover:border-[#006948]/30 transition-colors">
                    <img alt="Aruna Perera" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNUSnbHm0oPN5x4yahPKD74jsi3aOyxptHUYSDrKT9cuXSZWN6uCseyhghnBfNODt6JmR15KpD0dhxVQGx6CEilzhV14h4H32-Nt7ujFLvxwYIiQRVmaK57_SIzlMqce1fJT7DbRAeiG0GTxtIy__CD2G0a6OMwED3bkx3Bv9c0GK89XSgBER0_CQjg-uVcOW0z4yjbBZuM6i3hN-E5CvsFdOBK5z0IzQmGkJwClYvaEBnC0oJv1GG0wSf7AZA8y8Sg58edliA6eI" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="text-[24px] font-semibold text-[#191c1e]">Aruna Perera</h3>
                      <div className="flex items-center gap-[4px] bg-[#006948]/10 text-[#006948] px-3 py-1 rounded-full border border-[#006948]/20">
                        <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                        <span className="text-[14px] font-semibold">5.0</span>
                      </div>
                    </div>
                    <p className="font-semibold text-[#006948]">Master Landscaper</p>
                  </div>
                </div>
                <div className="space-y-[12px] mb-[24px] flex-grow">
                  <div className="flex items-center gap-[12px] text-sm text-[#3d4a42]">
                    <span className="material-symbols-outlined text-[18px]">location_on</span>
                    <span>Colombo</span>
                  </div>
                  <div className="flex items-center gap-[12px] text-sm text-[#191c1e]">
                    <span className="material-symbols-outlined text-[18px] text-[#006948]">calendar_month</span>
                    <span className="font-medium text-[#006948]">8/10 slots available this week</span>
                  </div>
                </div>
                <button className="w-full bg-[#006948] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#00855d] transition-colors shadow-md shadow-[#006948]/20">Book Now</button>
              </div>

              {/* Specialist 2 */}
              <div className="bg-white rounded-xl p-[24px] shadow-[0_4px_20px_-4px_rgba(6,78,59,0.05)] border border-[#eceef0] flex flex-col h-full hover:border-[#006948]/40 hover:shadow-lg transition-all group">
                <div className="flex items-center gap-[24px] mb-[24px]">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#006948]/10 flex-shrink-0 group-hover:border-[#006948]/30 transition-colors">
                    <img alt="Dinesh Silva" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxBtU6aUg4H92iD5S3Hs0QLSXOLmgAMCGZes_Zk6TY8dNmGDMLBHlK0mtJEVsP7-I_Q1TAU-p0j4He-pXa4zKLPSCJkVNNNQUIxT9zwwKrdvzFyWDNGJ1iiWOi4fNaX2hUSpO_hX-LenZcrbzzgdfFupImRPdYrDPCHITck3gvvCEZXyzeyU8bN9f6Ups5D8ktV9fsDCFzV_jMgOCXzrn71nwrrVUvsjSIbLAfJxDw0q_a-byNyzwZ8KR_6_GBQxsDyMtxSSgonI8" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="text-[24px] font-semibold text-[#191c1e]">Dinesh Silva</h3>
                      <div className="flex items-center gap-[4px] bg-[#006948]/10 text-[#006948] px-3 py-1 rounded-full border border-[#006948]/20">
                        <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                        <span className="text-[14px] font-semibold">4.9</span>
                      </div>
                    </div>
                    <p className="font-semibold text-[#006948]">Plant Care Expert</p>
                  </div>
                </div>
                <div className="space-y-[12px] mb-[24px] flex-grow">
                  <div className="flex items-center gap-[12px] text-sm text-[#3d4a42]">
                    <span className="material-symbols-outlined text-[18px]">location_on</span>
                    <span>Kandy</span>
                  </div>
                  <div className="flex items-center gap-[12px] text-sm text-[#191c1e]">
                    <span className="material-symbols-outlined text-[18px] text-[#006948]">calendar_month</span>
                    <span className="font-medium text-[#006948]">5/10 slots available this week</span>
                  </div>
                </div>
                <button className="w-full bg-[#006948] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#00855d] transition-colors shadow-md shadow-[#006948]/20">Book Now</button>
              </div>

              {/* Specialist 3 */}
              <div className="bg-white rounded-xl p-[24px] shadow-[0_4px_20px_-4px_rgba(6,78,59,0.05)] border border-[#eceef0] flex flex-col h-full hover:border-[#006948]/40 hover:shadow-lg transition-all group">
                <div className="flex items-center gap-[24px] mb-[24px]">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#006948]/10 flex-shrink-0 group-hover:border-[#006948]/30 transition-colors">
                    <img alt="Kamal Fernando" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsDtS05mWkpZyfC2Z0yz8zc2rUaD3kV8M3R3FiuiIizzFF4xMFOYbexECnlgelbJcigqwXq8RylXKqk6xAenv670gpXilk31Qb8Jpcd7cHDlnOBKIgHgROe--2R_v1T9uDlrRyIerSvo_WNMzlWKdSsNhvpO8RKzGrkHrj9WBl7g4hVTJSj6hsDcz5TLBd5rZfK7zMYs6TReB-3i9Tz3J0hWXt0TwgyQTOLQ5Zcd60IzFrZuWWJZbS6MpzCsC8CzVfAM_-6hKQb4c" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="text-[24px] font-semibold text-[#191c1e]">Kamal Fernando</h3>
                      <div className="flex items-center gap-[4px] bg-[#006948]/10 text-[#006948] px-3 py-1 rounded-full border border-[#006948]/20">
                        <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                        <span className="text-[14px] font-semibold">4.9</span>
                      </div>
                    </div>
                    <p className="font-semibold text-[#006948]">Lawn Specialist</p>
                  </div>
                </div>
                <div className="space-y-[12px] mb-[24px] flex-grow">
                  <div className="flex items-center gap-[12px] text-sm text-[#3d4a42]">
                    <span className="material-symbols-outlined text-[18px]">location_on</span>
                    <span>Negombo</span>
                  </div>
                  <div className="flex items-center gap-[12px] text-sm text-[#191c1e]">
                    <span className="material-symbols-outlined text-[18px] text-[#006948]">calendar_month</span>
                    <span className="font-medium text-[#006948]">2/10 slots available this week</span>
                  </div>
                </div>
                <button className="w-full bg-[#006948] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#00855d] transition-colors shadow-md shadow-[#006948]/20">Book Now</button>
              </div>

              {/* Specialist 4 */}
              <div className="bg-white rounded-xl p-[24px] shadow-[0_4px_20px_-4px_rgba(6,78,59,0.05)] border border-[#eceef0] flex flex-col h-full hover:border-[#006948]/40 hover:shadow-lg transition-all group">
                <div className="flex items-center gap-[24px] mb-[24px]">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#006948]/10 flex-shrink-0 group-hover:border-[#006948]/30 transition-colors">
                    <img alt="Nadeeka Peiris" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUy4FHfIYAm5qRRRiAsrak19Pi9Oj8AJ-9sqfH42ARHB5RYEH59ZUYYB8oIgFn3Mq9915Lg9Lxo2oFiSwKJiIXqbwHyqaGlb3_D0o23bxffZcyxlxiEraNY7xmS3I5jTWsCm0KIqJv-CUWaVSveeVscdQ8jRh1kgpJHwBFkLsxdd07qaU4bx4VwmsVjjoyiVgExg0VmguJO7FfiG7QZiSeRV_eGwF1wDpjzveN1QF-UqatuhISaFrH-2xGoBm5U6PDcyfu6M5bhkY" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="text-[24px] font-semibold text-[#191c1e]">Nadeeka Peiris</h3>
                      <div className="flex items-center gap-[4px] bg-[#006948]/10 text-[#006948] px-3 py-1 rounded-full border border-[#006948]/20">
                        <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                        <span className="text-[14px] font-semibold">4.8</span>
                      </div>
                    </div>
                    <p className="font-semibold text-[#006948]">Garden Design</p>
                  </div>
                </div>
                <div className="space-y-[12px] mb-[24px] flex-grow">
                  <div className="flex items-center gap-[12px] text-sm text-[#3d4a42]">
                    <span className="material-symbols-outlined text-[18px]">location_on</span>
                    <span>Galle</span>
                  </div>
                  <div className="flex items-center gap-[12px] text-sm text-[#191c1e]">
                    <span className="material-symbols-outlined text-[18px] text-[#006948]">calendar_month</span>
                    <span className="font-medium text-[#006948]">9/10 slots available this week</span>
                  </div>
                </div>
                <button className="w-full bg-[#006948] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#00855d] transition-colors shadow-md shadow-[#006948]/20">Book Now</button>
              </div>

              {/* Specialist 5 */}
              <div className="bg-white rounded-xl p-[24px] shadow-[0_4px_20px_-4px_rgba(6,78,59,0.05)] border border-[#eceef0] flex flex-col h-full hover:border-[#006948]/40 hover:shadow-lg transition-all group">
                <div className="flex items-center gap-[24px] mb-[24px]">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#006948]/10 flex-shrink-0 group-hover:border-[#006948]/30 transition-colors">
                    <img alt="Ruwan Jay" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlEJsrbqjUHNhpxxmk-QG8JVpx0dlDC7zMfC90EiN5v-jqrMAiwqgJ1PjIHSWdmA0uD61muGbLsQTJBZjVu4Sjn7HapYurBHfRUQ1R63VFHCPSBJHRCY5-iUGXbz3Z3eM5xDl3Ei0cZN8D9dC_Dd7yQQb5uYPg3OpDz3cZq_CR40AoI_CGE3bESRESI2qOAH2O79rXMKR9TZxP-sH_n2yM32RkJzYUowXvQiOTDrmewaTo2Nmw4ng4iQ_p2GQOdKq27TB-Q5lCbsM" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="text-[24px] font-semibold text-[#191c1e]">Ruwan Jay</h3>
                      <div className="flex items-center gap-[4px] bg-[#006948]/10 text-[#006948] px-3 py-1 rounded-full border border-[#006948]/20">
                        <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                        <span className="text-[14px] font-semibold">4.8</span>
                      </div>
                    </div>
                    <p className="font-semibold text-[#006948]">Tree Surgeon</p>
                  </div>
                </div>
                <div className="space-y-[12px] mb-[24px] flex-grow">
                  <div className="flex items-center gap-[12px] text-sm text-[#3d4a42]">
                    <span className="material-symbols-outlined text-[18px]">location_on</span>
                    <span>Matara</span>
                  </div>
                  <div className="flex items-center gap-[12px] text-sm text-[#191c1e]">
                    <span className="material-symbols-outlined text-[18px] text-[#006948]">calendar_month</span>
                    <span className="font-medium text-[#006948]">4/10 slots available this week</span>
                  </div>
                </div>
                <button className="w-full bg-[#006948] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#00855d] transition-colors shadow-md shadow-[#006948]/20">Book Now</button>
              </div>

              {/* Specialist 6 */}
              <div className="bg-white rounded-xl p-[24px] shadow-[0_4px_20px_-4px_rgba(6,78,59,0.05)] border border-[#eceef0] flex flex-col h-full hover:border-[#006948]/40 hover:shadow-lg transition-all group">
                <div className="flex items-center gap-[24px] mb-[24px]">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#006948]/10 flex-shrink-0 group-hover:border-[#006948]/30 transition-colors">
                    <img alt="Sarath Perera" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKUA31ZFJcWu22RE-Hi_sQzHMGFwAncx-iJP4LqoH9iIOMGRHGL_v2dIXNG9qxAUQ2TteTFLFZCm1XDULcuszc17S6R4YejSs-HyDumJscv5-1kaNcxHeOUyuWxDp0Zv4WdrH1GOXSuHeHc_RR1aDWmT6DrGbh6hrktu-pbXzhkQ_1eeocf5wu8M7z9p8l65W2LGAMv9AJJsxi_rW9zZY7fl0V7Uv7G36wZQa9iWfYcTv96LNtA6-yySMJs6QrCzojZq-FSvSecqo" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="text-[24px] font-semibold text-[#191c1e]">Sarath Perera</h3>
                      <div className="flex items-center gap-[4px] bg-[#006948]/10 text-[#006948] px-3 py-1 rounded-full border border-[#006948]/20">
                        <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                        <span className="text-[14px] font-semibold">4.9</span>
                      </div>
                    </div>
                    <p className="font-semibold text-[#006948]">Lawn Master</p>
                  </div>
                </div>
                <div className="space-y-[12px] mb-[24px] flex-grow">
                  <div className="flex items-center gap-[12px] text-sm text-[#3d4a42]">
                    <span className="material-symbols-outlined text-[18px]">location_on</span>
                    <span>Battaramulla</span>
                  </div>
                  <div className="flex items-center gap-[12px] text-sm text-[#191c1e]">
                    <span className="material-symbols-outlined text-[18px] text-[#006948]">calendar_month</span>
                    <span className="font-medium text-[#006948]">6/10 slots available this week</span>
                  </div>
                </div>
                <button className="w-full bg-[#006948] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#00855d] transition-colors shadow-md shadow-[#006948]/20">Book Now</button>
              </div>

            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 font-['Inter'] text-sm w-full rounded-t-2xl border-t border-slate-200 mt-[80px]">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 max-w-7xl mx-auto space-y-4 md:space-y-0">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-lg font-bold text-emerald-700">HomeHero</span>
            <span className="text-slate-500">© 2024 HomeHero. Trusted Care for your home.</span>
          </div>
          <nav className="flex flex-wrap justify-center gap-6">
            <a className="text-slate-500 hover:text-emerald-600 underline underline-offset-4 transition-opacity" href="#">Services</a>
            <a className="text-emerald-700 font-semibold transition-opacity" href="#">Top Providers</a>
            <a className="text-slate-500 hover:text-emerald-600 underline underline-offset-4 transition-opacity" href="#">Join as Pro</a>
            <a className="text-slate-500 hover:text-emerald-600 underline underline-offset-4 transition-opacity" href="#">Privacy Policy</a>
            <a className="text-slate-500 hover:text-emerald-600 underline underline-offset-4 transition-opacity" href="#">Terms of Service</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}