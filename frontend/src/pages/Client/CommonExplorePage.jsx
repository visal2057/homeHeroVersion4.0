import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CommonExplorePage = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const specialists = [
    { name: "Aruna Perera", role: "Master Landscaper", rating: 5.0, reviews: 124, location: "Colombo", slots: "8/10", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBky-LCvvslIgRhze2Fq-YzzwY8rksBJvAmGjdKmgEJn2YcBSXM5u7APRuUfkoU_zjaEY8uHtsEc6Y5VM8bM3eNgjGDu2XstvBsJBChRGmz8JhTz2KiUARyEFpD8NgrrDBdQ_3hylghZUYNI5VHLK9pLaARPQ-bObR02YGTv3mXEZ4vr-DxBv0lox2BuDKFGc1quGR5aojXzYtgGB9JEDoq9u9-CTLaQHQirvIRmY50TsB3aNiVuxGWpihQYnp0OSkZ2GjiHX3n6UE" },
    { name: "Dinesh Silva", role: "Plant Care Expert", rating: 4.9, reviews: 98, location: "Kandy", slots: "5/10", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB24PcYc3Z2SDHxoDL8I1DtBqZlkLjzPuruk6PNQ5biUWpxQy1rXrvDxGh04-5TWpy4CqcPj0t0R1LTBesnJGHeI_dl-Wt-xISiZdOhYtQmqw7B_G5dI2q66qKRxbUuPlofSpq0eLPq7weZt2GH0KcfAAwA08YLjuLCbl09-ZkN3tjVSSoU2pWVuzS4ct9nz2v7AyG_sviI10G8h7vzlUT_ekdh-nAqIv8kJI42btIMR61eBlH7sycsWIls6s0uNS_3XJ8qlbQjJbw" },
    { name: "Kamal Fernando", role: "Lawn Specialist", rating: 4.9, reviews: 156, location: "Negombo", slots: "2/10", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDIJsnwE4vHyl7dHaP6aNC_g1i_LfLVe_17mkYc598q2g64CklPBAOBvL9SWiGlgZ32c-gc828KpnrO8NRGHPsqKrWibRNZqoUsVaWsZQxMbHOS0xBI9415NBKRYgdcFE3HbRtlcN5S9tXPC1NVqalgG5noPVNZjjSXd6bF1zcdmZhvq0Qs-vukWSmN97wCAWhf_OTEre2fJtVXXFZP6x9GsQREHLM5duDeoz3v_TMvzOzvlskTXjODDV0tJSB4aHmMkscd4sDogaQ" }
  ];

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col font-body-md relative overflow-x-hidden">
      {/* Drawer */}
      <div className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] ${drawerOpen ? 'block' : 'hidden'}`} onClick={() => setDrawerOpen(false)}></div>
      <aside className={`fixed left-0 top-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col border-r transform transition-transform duration-300 ${drawerOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 flex items-center justify-between border-b">
          <h2 className="text-2xl font-semibold">Specify Request</h2>
          <button onClick={() => setDrawerOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          <div>
            <label className="font-semibold block mb-1">Request Topic</label>
            <div className="text-emerald-600 font-semibold">Specify the gardening request</div>
          </div>
          <div>
            <label className="font-semibold block mb-1">Request Details</label>
            <textarea className="w-full rounded-xl border p-3" placeholder="Describe what you need help with..." rows="4"></textarea>
          </div>
          <div>
            <label className="font-semibold block mb-2">Preferred Days</label>
            <div className="flex gap-2">
              {['M','T','W','T','F','S','S'].map(day => (
                <button key={day} className="w-10 h-10 rounded-full border hover:border-emerald-500 transition-all"> {day} </button>
              ))}
            </div>
          </div>
          <div>
            <label className="font-semibold block mb-2">Service Location</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">location_on</span>
              <input className="w-full rounded-xl border py-3 pl-10 pr-4" placeholder="Enter your address" type="text" />
            </div>
          </div>
        </div>
        <div className="p-6 border-t">
          <button className="w-full bg-emerald-600 text-white font-semibold py-4 rounded-xl shadow-lg hover:bg-emerald-700">Send Request</button>
        </div>
      </aside>

      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b shadow-sm h-16">
        <div className="flex justify-between items-center px-8 h-full max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <Link to="/" className="text-xl font-bold text-emerald-600">HomeHero</Link>
            <div className="h-6 w-px bg-gray-300 mx-2"></div>
            <span className="text-gray-600 font-medium">Gardening</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/" className="p-2 rounded-full hover:bg-emerald-50"><span className="material-symbols-outlined text-gray-600">home</span></Link>
            <Link to="/notifications" className="p-2 rounded-full hover:bg-emerald-50"><span className="material-symbols-outlined text-gray-600">notifications</span></Link>
            <Link to="/profile" className="p-2 rounded-full hover:bg-emerald-50"><span className="material-symbols-outlined text-gray-600">account_circle</span></Link>
          </div>
        </div>
      </header>

      <main className="flex-grow pt-16">
        {/* Hero */}
        <section className="hero-bg py-20 px-6 text-center text-white min-h-[400px] flex items-center justify-center" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(https://lh3.googleusercontent.com/aida-public/AB6AXuD2Zuc2zd3eLf39almmxEuqLCehjVt4QQvAs4NTok6uQvs1GTfr3Z7jfxcz3czL-uU0qGy3GhXSI4TBTjNY-xQ0XJorTyXqKfRwRuA5IUUyRY3Y1tstF_BHTHFotWX6p0KB9T2AMsIQFDw_CM_Gpjadg2mFahyqC6FL9sOZIil9pwn-TL_dbQjGsLsukAODBTMmDk1uLs39cK2ZJRrtRQ06BcjwzBcVcuMzG8puC5o3zPMWtkNELtwigrBwoRIllRzYcMKajn4oyM8)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">Your garden is a reflection of you.</h1>
            <p className="text-lg max-w-2xl mx-auto drop-shadow-md">Find trusted, top-rated gardening professionals to bring your outdoor space to life.</p>
          </div>
        </section>

        {/* Search */}
        <section className="mb-8 px-6 max-w-3xl mx-auto">
          <div className="relative flex items-center w-full h-14 rounded-full shadow-sm bg-white border overflow-hidden">
            <div className="grid place-items-center h-full w-12 text-gray-400"><span className="material-symbols-outlined">search</span></div>
            <input className="peer h-full w-full outline-none text-gray-900 bg-transparent pr-2" placeholder="Search by name, specialty, or location..." type="text" />
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-6 w-full">
          {/* Featured Specialists */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Featured Gardening Specialists</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {specialists.map((pro, idx) => (
                <div key={idx} className="bg-white rounded-xl p-4 shadow-sm border-2 border-emerald-200 flex flex-col items-center text-center relative hover:shadow-lg transition-all">
                  <div className="w-24 h-24 rounded-full mb-3 overflow-hidden border-2 border-emerald-600 p-1">
                    <img alt={pro.name} className="w-full h-full object-cover rounded-full" src={pro.img} />
                  </div>
                  <h3 className="text-xl font-semibold mb-1">{pro.name}</h3>
                  <p className="text-sm text-emerald-600 mb-2">{pro.role}</p>
                  <div className="flex items-center gap-1 mb-3">
                    <span className="material-symbols-outlined text-emerald-600 text-sm">star</span>
                    <span className="font-semibold">{pro.rating}</span>
                    <span className="text-gray-500 text-sm">({pro.reviews})</span>
                  </div>
                  <button className="mt-auto w-full border border-emerald-600 text-emerald-600 font-semibold py-2 rounded-lg hover:bg-emerald-50">View Profile</button>
                </div>
              ))}
            </div>
          </section>

          {/* All Providers */}
          <section className="pb-12">
            <div className="flex justify-between items-center gap-4 mb-6">
              <h2 className="text-3xl font-bold text-gray-900">Active Gardening Service Providers</h2>
              <button onClick={() => setDrawerOpen(true)} className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-emerald-600 text-emerald-600 font-semibold hover:bg-emerald-50">
                <span className="material-symbols-outlined text-sm">send_time_extension</span> Broadcast Request
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {specialists.map((pro, idx) => (
                <div key={idx} className="bg-white rounded-xl p-4 shadow-sm border flex flex-col h-full hover:border-emerald-400 hover:shadow-lg transition-all">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-emerald-100 flex-shrink-0">
                      <img alt={pro.name} className="w-full h-full object-cover" src={pro.img} />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="text-xl font-semibold">{pro.name}</h3>
                        <div className="flex items-center gap-1 bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded-full">
                          <span className="material-symbols-outlined text-sm">star</span>
                          <span className="font-semibold text-sm">{pro.rating}</span>
                        </div>
                      </div>
                      <p className="text-emerald-600 font-semibold text-sm">{pro.role}</p>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4 flex-grow">
                    <div className="flex items-center gap-2 text-sm text-gray-500"><span className="material-symbols-outlined text-sm">location_on</span> {pro.location}</div>
                    <div className="flex items-center gap-2 text-sm"><span className="material-symbols-outlined text-sm text-emerald-600">calendar_month</span> <span className="font-medium text-emerald-600">{pro.slots} slots available this week</span></div>
                  </div>
                  <button className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 shadow-md">Book Now</button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 font-['Inter'] text-sm w-full rounded-t-2xl border-t mt-12">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 max-w-7xl mx-auto gap-4">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-lg font-bold text-emerald-700">HomeHero</span>
            <span className="text-gray-500">© 2024 HomeHero. Trusted Care for your home.</span>
          </div>
          <nav className="flex flex-wrap justify-center gap-6">
            <Link to="/services" className="text-gray-500 hover:text-emerald-600">Services</Link>
            <Link to="/providers" className="text-emerald-700 font-semibold">Top Providers</Link>
            <Link to="/join" className="text-gray-500 hover:text-emerald-600">Join as Pro</Link>
            <Link to="/privacy" className="text-gray-500 hover:text-emerald-600">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-500 hover:text-emerald-600">Terms of Service</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default CommonExplorePage;