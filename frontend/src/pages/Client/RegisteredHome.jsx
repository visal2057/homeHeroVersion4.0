import React from 'react';
import { Link } from 'react-router-dom';
import ClientHeader from '../../components/ClientHeader';

const RegisteredHome = () => {
  const services = [
    { icon: 'potted_plant', name: 'Gardening', desc: 'Pruning, planting, and lawn maintenance.', path: '/explore/gardening' },
    { icon: 'build', name: 'Handiwork', desc: 'Mounting, fixing, and light assemblies.', path: '/explore/handiwork' },
    { icon: 'ac_unit', name: 'AC Repair', desc: 'Cooling maintenance and expert repairs.', path: '/explore/ac-repair' },
    { icon: 'cleaning_services', name: 'Cleaning', desc: 'Deep cleans and recurring home care.', path: '/explore/cleaning' },
    { icon: 'pets', name: 'Petcare', desc: 'Professional walking and home sitting.', path: '/explore/petcare' },
  ];

  return (
    <div className="bg-background font-body-md text-on-background antialiased relative min-h-screen">
      <ClientHeader pageTitle="Dashboard" />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative h-[640px] w-full flex items-center justify-center overflow-hidden">
          <img 
            alt="Professional Gardener at work" 
            className="absolute inset-0 w-full h-full object-cover object-center" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvUan3L5hh0oj9qtXcKAVjxAk5tzND6kP45QZsEKsxx2CgMflMWtsu3ZbodO3l9ow6QWHFZili1U2fJKc3_SzPkr3EutgT3GXUiJ4jb8VTFTXq9M29dzMNuFCChKI7OFsawCeJ_GrcaS_n3sIufjS85rfkngY1F1l8Zztok8y2bhBlhmtXA2QEttJ4DXj-4IO0ofO-chyyo8lVxavk1bXknEx4ETdSr2kIqQqF-GZj_-5pkSqoL3RQ0x8H5RZ1-Hf2X7fAnpUeDRU"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10"></div>
          <div className="relative z-10 w-full max-w-4xl px-6 text-center">
            <h1 className="font-h1 text-h1 text-white mb-md drop-shadow-md text-4xl md:text-5xl font-bold">Expert Care for Your Home</h1>
            <p className="max-w-2xl mx-auto text-white text-lg md:text-xl font-body-lg leading-relaxed drop-shadow-sm mb-md mt-4">
              HomeHero connects homeowners with a network of trusted and verified professionals for all your household needs.
            </p>
          </div>
        </section>

        {/* Service Grid */}
        <section className="py-xl py-16 max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-lg mb-8">
            <div>
              <h2 className="font-h2 text-h2 text-emerald-700 text-3xl font-bold mb-2">Our Services</h2>
              <p className="font-body-md text-slate-500">Professional assistance for every corner of your house.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-md gap-6">
            {services.map((service, idx) => (
              <Link
                key={idx}
                to={service.path}
                className="group bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-md transition-all"
              >
                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-emerald-600 text-3xl">{service.icon}</span>
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">{service.name}</h3>
                <p className="text-sm text-slate-500">{service.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="max-w-7xl mx-auto px-6 mb-xl pb-16">
          <div className="bg-[#006948] rounded-3xl p-12 text-center relative overflow-hidden">
            <h2 className="text-4xl font-bold text-white mb-4 relative z-10">Ready to start?</h2>
            <p className="text-emerald-100 text-body-lg mb-8 max-w-xl mx-auto opacity-90 relative z-10">
              Join thousands of homeowners who trust HomeHero for their daily maintenance.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center relative z-10">
              <Link to="/explore/gardening" className="bg-white text-[#006948] px-10 py-4 rounded-full font-semibold text-lg hover:bg-slate-50 transition-all shadow-xl block text-center">
                Explore Services
              </Link>
              <Link to="/contact" className="border border-white/30 text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all block text-center">
                Talk to an Expert
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t bg-slate-50 border-t-slate-200 text-sm text-slate-500">
        <div className="flex flex-col md:flex-row justify-between items-center py-12 px-6 max-w-7xl mx-auto gap-6">
          <div className="flex flex-col gap-2">
            <div className="text-xl font-bold text-emerald-700">HomeHero</div>
            <p>© 2026 HomeHero. Trusted Care for Every Home.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <Link to="/about" className="hover:text-emerald-600 hover:underline">About Us</Link>
            <Link to="/terms" className="hover:text-emerald-600 hover:underline">Terms of Service</Link>
            <Link to="/privacy" className="hover:text-emerald-600 hover:underline">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-emerald-600 hover:underline">Help Center</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RegisteredHome;