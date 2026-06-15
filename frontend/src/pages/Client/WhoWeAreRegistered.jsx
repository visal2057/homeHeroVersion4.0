import React from 'react';
import { Link } from 'react-router-dom';

const WhoWeAreRegistered = () => {
  const values = [
    { icon: "verified_user", title: "Trust", desc: "Every pro on our platform undergoes a rigorous background check and skills assessment." },
    { icon: "workspace_premium", title: "Quality", desc: "We don't just fix things; we master them. Expert craftsmanship defines every HomeHero service." },
    { icon: "diversity_1", title: "Community", desc: "We are local at heart. Supporting neighborhood economies by connecting local talent." }
  ];
  const team = [
    { name: "Sarah Chen", role: "CEO & Founder", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD63ftGgptVu0cIi-9WpV78W0AygwMSa-Y3hFFrYzUKwc_Y6pB9dHphopjEWl5U0yzvHLSca7d1DVBwGt0bo9SpzMgJbSz1qHCNviO1z8xihV1Nu16NVLH0mGI-tJE0XXS2E15Uuv4mSGwko_e8ynMZBk1zuDEKbe3Jqkw7iCMek0e0FKS-Ca57XyG83-Ytbq2kMFfcTmTgKxrfvicM5Ii_-RJJdx96IvXXh--kZi7L007N_OLjylYkaGM0qH0zNb7TCWpIJxGY6KI" },
    { name: "Marcus Thorne", role: "Head of Operations", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCMz_BIPjH3SZsk4AV_2xEKF4iH3pp82Z3nXYfGabxzsx6FmSTRAgOZstIRJTMwPAqpPXw5QRreeaPhPN1tz40k9u4mshPrYrZFYCF8YFJGUgfgJ4xN1_j7YOaTn7-Q-BPt35_aI5Rm6xFeEIUDF5V_uBmX_pGwGJtmGl5S9uJnmrpqekZ0BLW5-q3p7XjyRIJL73G-d6mG6m-sC210YqdPh2jOjtDJLZcQuakrOZQ5IyplUZbCy63-INjKGmf-RpsoV9yXLNtdBWA" },
    { name: "Elena Rodriguez", role: "Chief Quality Officer", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC6MYM0jyURuM8cnpfbp3oOPlzSy9I5FnK9RAD7omHXsRSBFPLl1Nl4oVa-KYVuWut9LpZ4SrffVqsVtG8UEWZO6KSNplz4EjL_9OpO3h6hgJjhci9JtheOoRRp5zJn0I0CGSsP5hQMYKI4oIKmEoflZ9O0qiHrrKb_8prm01rX69-yIubswd6IHM6ykRHPk2T2hxp4PhZgFnFWMMfpUff81X0S8XPa6-ACyGROlD7PcyFD8Pgc0xvQtA2YehKKS96MNTPaahLbxtU" },
    { name: "David Kim", role: "VP of Engineering", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDG_G5df6tkoj2qXjE9evwF4buroRLeQ1Y2ZcG3dFVlDV4SS6rIntc-PVq3s1KFss7ML6Qx0fGfdLqKiQsgMCDTfBWdMIGbdQ3mEOYPMzpexscdvQ-09UYlRmzEr5Cw1-e1x23dM6fS0jWmkjpQM1MOtSjdUlpNJNRVtohFtZM9G7ETyMUVvPGe3Tg1WusMR0NFewdmlQZksVc9JSN9xDRywbgn-Pic6b7tPwExqWaDAwi-V7K2pXXkZi-DnpClm9VgDDUMHsFdloY" }
  ];

  return (
    <div className="bg-surface font-body-md text-on-surface selection:bg-secondary-container">
      {/* Header */}
      <nav className="bg-white/80 backdrop-blur-md border-b shadow-sm sticky top-0 z-50">
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          <Link to="/" className="text-2xl font-black tracking-tight text-emerald-600">HomeHero</Link>
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/services" className="text-slate-600 hover:text-emerald-600 font-semibold text-sm">Our Services</Link>
            <Link to="/about" className="text-emerald-700 border-b-2 border-emerald-600 font-semibold text-sm">About us</Link>
            <Link to="/careers" className="text-slate-600 hover:text-emerald-600 font-semibold text-sm">Careers</Link>
            <Link to="/contact" className="text-slate-600 hover:text-emerald-600 font-semibold text-sm">Contact us</Link>
          </div>
          <div className="flex items-center space-x-3">
            <Link to="/" className="p-2 text-slate-600 hover:text-emerald-600"><span className="material-symbols-outlined">home</span></Link>
            <Link to="/notifications" className="p-2 text-slate-600 hover:text-emerald-600"><span className="material-symbols-outlined">notifications</span></Link>
            <Link to="/profile" className="p-2 text-slate-600 hover:text-emerald-600"><span className="material-symbols-outlined">account_circle</span></Link>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero */}
        <section className="relative h-[500px] flex items-center overflow-hidden">
          <img className="absolute inset-0 w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7ysCz_i9FWR-y4FqZdK7ZC-8oBIndH4IJuDctohy84gnR5O9SJVfaVnMmbrUSvTZnM_qt3WwY2125sTqqpeckI30HNPY1CVZMQuyOD_BVwTvcBQFgXNg2jjdvkkbH-32LVYcB4HUiVObDr0mxUs9nTkC55E9dGU36o0R-b6XHxTmNqatYIkGIDvIfcvaiFtrBY3cqWd-PyOJMksrsNJaC90ohgAE1lfw3KeEQvgeA3mLsZjGiAFqvAIqSCzi68znwrCB8ui0w4a8" />
          <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
            <div className="max-w-2xl bg-black/40 backdrop-blur-md p-8 rounded-xl border border-white/10">
              <h1 className="text-5xl font-bold text-white mb-4">Empowering Homes, One Service at a Time</h1>
              <p className="text-lg text-white/90 mb-6">We believe that every home deserves professional care. From gardens to gutters, we bridge the gap between quality craftsmanship and your doorstep.</p>
              <button className="bg-emerald-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-emerald-700">Explore Our Services</button>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">Our Journey</span>
              <h2 className="text-3xl font-bold text-gray-900">Providing Reliability to Every Doorstep</h2>
              <p className="text-gray-600">HomeHero began with a simple observation: finding reliable, high-quality home service professionals was unnecessarily difficult. We saw homeowners struggling with inconsistent quality and pros struggling to find stable work.</p>
              <p className="text-gray-600">Founded in 2018, our mission was to build an ecosystem of "Trusted Care." We vet every professional, standardize pricing, and guarantee satisfaction.</p>
            </div>
            <div className="relative"><div className="aspect-square bg-emerald-100 rounded-xl overflow-hidden shadow-lg"><img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJcoln0z1owkxo3aQoHnu1HEbsYmptKpbcEdgUDb9b3rzBjvViE6QWwK9WcNz7iSRHBflkWbmGNsZP8Lp3cFsFHiA7a7rqgcSdHg6gFZsnmAkqx-Cx42uYjUxKTvwkLNwO9wpSYxQCr-21Bfj6p2lDS3pmMLS2JoodUM5S3jetwqViZSzGzH9fo_gal5hnmQgg9lHS7fKUB8BFt4lfLiZIw5CJ0rUeVeClPUsHoHs4RPDwXgYfdAxsnU_Nfgtn84CKaZozexafBWQ" /></div></div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 text-center mb-12"><h2 className="text-3xl font-bold mb-4">Built on Shared Values</h2><p className="text-gray-500 max-w-2xl mx-auto">Our commitment to excellence is guided by principles that put the homeowner and the professional first.</p></div>
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value, idx) => (
              <div key={idx} className="bg-white/70 backdrop-blur-sm p-6 rounded-xl text-center shadow-sm">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4"><span className="material-symbols-outlined text-3xl text-emerald-600">{value.icon}</span></div>
                <h3 className="text-2xl font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 bg-emerald-600 text-white">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div><div className="text-6xl font-black mb-2">50k+</div><div className="uppercase tracking-widest text-sm opacity-90">Homes Served</div></div>
            <div><div className="text-6xl font-black mb-2">10k+</div><div className="uppercase tracking-widest text-sm opacity-90">Verified Pros</div></div>
            <div><div className="text-6xl font-black mb-2">4.9/5</div><div className="uppercase tracking-widest text-sm opacity-90">Average Rating</div></div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex justify-between items-end mb-10">
              <div><h2 className="text-3xl font-bold mb-2">Meet the Visionaries</h2><p className="text-gray-500">The passionate team behind the platform.</p></div>
              <button className="text-emerald-600 font-semibold flex items-center hover:underline">View All Team <span className="material-symbols-outlined ml-1">arrow_forward</span></button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, idx) => (
                <div key={idx} className="group">
                  <div className="aspect-[4/5] bg-gray-100 rounded-xl mb-4 overflow-hidden"><img alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" src={member.img} /></div>
                  <h4 className="text-xl font-semibold mb-1">{member.name}</h4>
                  <p className="text-emerald-600 text-sm font-semibold">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8 max-w-7xl mx-auto">
          <div><div className="text-xl font-bold text-emerald-600 mb-4">HomeHero</div><p className="text-sm text-gray-500 mb-4">Empowering households with trusted professional care.</p><p className="text-sm text-gray-500">© 2024 HomeHero. All rights reserved.</p></div>
          <div className="grid grid-cols-2 gap-4"><div className="space-y-2"><p className="font-semibold mb-2">Company</p><Link to="/about" className="block text-gray-500 text-sm hover:text-emerald-600">About Us</Link><Link to="/careers" className="block text-gray-500 text-sm hover:text-emerald-600">Careers</Link></div><div className="space-y-2"><p className="font-semibold mb-2">Legal</p><Link to="/privacy" className="block text-gray-500 text-sm hover:text-emerald-600">Privacy Policy</Link><Link to="/terms" className="block text-gray-500 text-sm hover:text-emerald-600">Terms of Service</Link></div></div>
          <div className="space-y-4"><p className="font-semibold">Support</p><Link to="/help" className="block text-gray-500 text-sm hover:text-emerald-600">Help Center</Link><Link to="/contact" className="block text-gray-500 text-sm hover:text-emerald-600">Contact Us</Link></div>
        </div>
      </footer>
    </div>
  );
};

export default WhoWeAreRegistered;