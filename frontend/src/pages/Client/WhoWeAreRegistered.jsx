import React from 'react';
import { Link } from 'react-router-dom';

const WhoWeAreRegistered = () => {
  const values = [
    { icon: "verified_user", title: "Trust", desc: "Every pro on our platform undergoes a rigorous background check and skills assessment." },
    { icon: "workspace_premium", title: "Quality", desc: "We don't just fix things; we master them. Expert craftsmanship defines every HomeHero service." },
    { icon: "diversity_3", title: "Community", desc: "We are local at heart. Supporting neighborhood economies by connecting local talent." }
  ];

  const team = [
    { name: "Sarah Chen", role: "CEO & Founder", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD63ftGgptVu0cIi-9WpV78W0AygwMSa-Y3hFFrYzUKwc_Y6pB9dHphopjEWl5U0yzvHLSca7d1DVBwGt0bo9SpzMgJbSz1qHCNviO1z8xihV1Nu16NVLH0mGI-tJE0XXS2E15Uuv4mSGwko_e8ynMZBk1zuDEKbe3Jqkw7iCMek0e0FKS-Ca57XyG83-Ytbq2kMFfcTmTgKxrfvicM5Ii_-RJJdx96IvXXh--kZi7L007N_OLjylYkaGM0qH0zNb7TCWpIJxGY6KI" },
    { name: "Marcus Thorne", role: "Head of Operations", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCMz_BIPjH3SZsk4AV_2xEKF4iH3pp82Z3nXYfGabxzsx6FmSTRAgOZstIRJTMwPAqpPXw5QRreeaPhPN1tz40k9u4mshPrYrZFYCF8YFJGUgfgJ4xN1_j7YOaTn7-Q-BPt35_aI5Rm6xFeEIUDF5V_uBmX_pGwGJtmGl5S9uJnmrpqekZ0BLW5-q3p7XjyRIJL73G-d6mG6m-sC210YqdPh2jOjtDJLZcQuakrOZQ5IyplUZbCy63-INjKGmf-RpsoV9yXLNtdBWA" },
    { name: "Elena Rodriguez", role: "Chief Quality Officer", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC6MYM0jyURuM8cnpfbp3oOPlzSy9I5FnK9RAD7omHXsRSBFPLl1Nl4oVa-KYVuWut9LpZ4SrffVqsVtG8UEWZO6KSNplz4EjL_9OpO3h6hgJjhci9JtheOoRRp5zJn0I0CGSsP5hQMYKI4oIKmEoflZ9O0qiHrrKb_8prm01rX69-yIubswd6IHM6ykRHPk2T2hxp4PhZgFnFWMMfpUff81X0S8XPa6-ACyGROlD7PcyFD8Pgc0xvQtA2YehKKS96MNTPaahLbxtU" },
    { name: "David Kim", role: "VP of Engineering", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDG_G5df6tkoj2qXjE9evwF4buroRLeQ1Y2ZcG3dFVlDV4SS6rIntc-PVq3s1KFss7ML6Qx0fGfdLqKiQsgMCDTfBWdMIGbdQ3mEOYPMzpexscdvQ-09UYlRmzEr5Cw1-e1x23dM6fS0jWmkjpQM1MOtSjdUlpNJNRVtohFtZM9G7ETyMUVvPGe3Tg1WusMR0NFewdmlQZksVc9JSN9xDRywbgn-Pic6b7tPwExqWaDAwi-V7K2pXXkZi-DnpClm9VgDDUMHsFdloY" }
  ];

  return (
    <div className="min-h-screen bg-background text-on-background font-['Inter'] antialiased w-full overflow-x-hidden">
      
      {/* ===== HEADER ===== */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-outline-variant shadow-sm h-16">
        <div className="flex justify-between items-center px-4 md:px-8 h-full max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <Link to="/" className="text-xl font-black tracking-tighter text-primary">HomeHero</Link>
            <div className="h-6 w-px bg-outline-variant mx-2 hidden sm:block"></div>
            <span className="text-sm font-medium text-on-surface-variant hidden sm:block">About Us</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/about" className="text-sm font-medium text-primary border-b-2 border-primary pb-1">About us</Link>
            <Link to="/careers" className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors">Careers</Link>
            <Link to="/contact" className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors">Contact us</Link>
          </nav>
          
        </div>
      </header>

      {/* ===== MAIN CONTENT ===== */}
      <main className="w-full pt-16">
        
        {/* ===== HERO SECTION ===== */}
        <section className="relative min-h-[500px] md:min-h-[600px] w-full flex items-center justify-center overflow-hidden">
          <img 
            alt="About HomeHero" 
            className="absolute inset-0 w-full h-full object-cover object-center" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7ysCz_i9FWR-y4FqZdK7ZC-8oBIndH4IJuDctohy84gnR5O9SJVfaVnMmbrUSvTZnM_qt3WwY2125sTqqpeckI30HNPY1CVZMQuyOD_BVwTvcBQFgXNg2jjdvkkbH-32LVYcB4HUiVObDr0mxUs9nTkC55E9dGU36o0R-b6XHxTmNqatYIkGIDvIfcvaiFtrBY3cqWd-PyOJMksrsNJaC90ohgAE1lfw3KeEQvgeA3mLsZjGiAFqvAIqSCzi68znwrCB8ui0w4a8"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/20"></div>
          <div className="relative z-10 w-full max-w-4xl px-6 text-center">
            <div className="inline-block bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/20 mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-white/90">About Us</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 drop-shadow-lg">
              Empowering Homes, <br className="hidden sm:inline" />
              <span className="text-emerald-300">One Service at a Time</span>
            </h1>
            <p className="max-w-2xl mx-auto text-white/90 text-base md:text-lg leading-relaxed drop-shadow-md mb-6">
              We believe that every home deserves professional care. From gardens to gutters, we bridge the gap between quality craftsmanship and your doorstep.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <span className="text-white/90 text-xs bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
                ⭐ 4.9/5 Service Rating
              </span>
              <span className="text-white/90 text-xs bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
                ✅ Verified Professionals
              </span>
              <span className="text-white/90 text-xs bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
                🔒 Secure Payments
              </span>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                to="/"
                className="bg-primary text-on-primary px-8 py-3.5 rounded-full font-semibold hover:bg-primary-container hover:text-on-primary-container transition-all shadow-lg shadow-primary/30"
              >
                Explore Our Services
              </Link>
              <Link 
                to="/contact"
                className="bg-white/20 backdrop-blur-sm text-white px-8 py-3.5 rounded-full font-semibold hover:bg-white/30 transition-all border border-white/30"
              >
                Contact us
              </Link>
            </div>
          </div>
        </section>

        {/* ===== OUR STORY ===== */}
        <section className="py-16 max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <div className="inline-block bg-primary-fixed px-4 py-1.5 rounded-full">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">Our Journey</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-on-surface">Providing Reliability to Every Doorstep</h2>
              <p className="text-on-surface-variant leading-relaxed">
                HomeHero began with a simple observation: finding reliable, high-quality home service professionals was unnecessarily difficult. We saw homeowners struggling with inconsistent quality and pros struggling to find stable work.
              </p>
              <p className="text-on-surface-variant leading-relaxed">
                Founded in 2018, our mission was to build an ecosystem of "Trusted Care." We vet every professional, standardize pricing, and guarantee satisfaction.
              </p>
              <div className="flex gap-6 pt-4">
                <div>
                  <div className="text-2xl font-black text-primary">50k+</div>
                  <div className="text-xs text-on-surface-variant">Homes Served</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-primary">10k+</div>
                  <div className="text-xs text-on-surface-variant">Verified Pros</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-primary">4.9/5</div>
                  <div className="text-xs text-on-surface-variant">Average Rating</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-primary-fixed rounded-2xl overflow-hidden shadow-lg">
                <img 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJcoln0z1owkxo3aQoHnu1HEbsYmptKpbcEdgUDb9b3rzBjvViE6QWwK9WcNz7iSRHBflkWbmGNsZP8Lp3cFsFHiA7a7rqgcSdHg6gFZsnmAkqx-Cx42uYjUxKTvwkLNwO9wpSYxQCr-21Bfj6p2lDS3pmMLS2JoodUM5S3jetwqViZSzGzH9fo_gal5hnmQgg9lHS7fKUB8BFt4lfLiZIw5CJ0rUeVeClPUsHoHs4RPDwXgYfdAxsnU_Nfgtn84CKaZozexafBWQ" 
                  alt="Our Story"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ===== VALUES ===== */}
        <section className="bg-surface-container py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <div className="inline-block bg-primary-fixed px-4 py-1.5 rounded-full mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">Our Values</span>
              </div>
              <h2 className="text-3xl font-bold text-on-surface mb-4">Built on Shared Values</h2>
              <p className="text-on-surface-variant max-w-2xl mx-auto">
                Our commitment to excellence is guided by principles that put the homeowner and the professional first.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {values.map((value, idx) => (
                <div 
                  key={idx} 
                  className="bg-white p-6 rounded-xl shadow-sm border border-surface-container hover:border-primary/40 hover:shadow-md transition-all group text-center"
                >
                  <div className="w-16 h-16 bg-primary-fixed rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-3xl text-primary">{value.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold text-on-surface mb-3">{value.title}</h3>
                  <p className="text-on-surface-variant text-sm">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== STATS ===== */}
        <section className="py-16 max-w-7xl mx-auto px-6">
          <div className="bg-primary rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 opacity-10">
              <span className="material-symbols-outlined text-9xl text-white">trending_up</span>
            </div>
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Our Impact in Numbers</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                <div>
                  <div className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-2">50k+</div>
                  <div className="uppercase tracking-widest text-xs md:text-sm text-emerald-200">Homes Served</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-2">10k+</div>
                  <div className="uppercase tracking-widest text-xs md:text-sm text-emerald-200">Verified Pros</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-2">4.9/5</div>
                  <div className="uppercase tracking-widest text-xs md:text-sm text-emerald-200">Average Rating</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== TEAM ===== */}
        <section className="bg-surface-container py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
              <div>
                <div className="inline-block bg-primary-fixed px-4 py-1.5 rounded-full mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">Our Team</span>
                </div>
                <h2 className="text-3xl font-bold text-on-surface mb-2">Meet the Visionaries</h2>
                <p className="text-on-surface-variant">The passionate team behind the platform.</p>
              </div>
              <Link to="/careers" className="text-primary font-semibold flex items-center gap-1 hover:underline mt-4 sm:mt-0">
                View All Team <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, idx) => (
                <div key={idx} className="group bg-white rounded-xl p-4 shadow-sm border border-surface-container hover:border-primary/40 hover:shadow-md transition-all">
                  <div className="aspect-[4/5] bg-surface-container rounded-xl mb-4 overflow-hidden">
                    <img 
                      alt={member.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                      src={member.img}
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${member.name.replace(' ', '+')}&background=006948&color=fff&size=200`;
                      }}
                    />
                  </div>
                  <h4 className="text-lg font-bold text-on-surface mb-0.5">{member.name}</h4>
                  <p className="text-sm font-semibold text-primary">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section className="py-16 max-w-7xl mx-auto px-6">
          <div className="bg-primary rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 opacity-10">
              <span className="material-symbols-outlined text-9xl text-white">handshake</span>
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Join Our Mission</h2>
              <p className="text-emerald-100 text-base md:text-lg mb-8 max-w-2xl mx-auto">
                Be part of something bigger. Join us in redefining how the world takes care of their homes.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link 
                  to="/careers"
                  className="bg-white text-primary px-10 py-4 rounded-full font-semibold text-lg hover:bg-gray-50 transition-all shadow-xl"
                >
                  View Careers
                </Link>
                <Link 
                  to="/contact"
                  className="border border-white/30 text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="bg-white border-t border-outline-variant">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <Link to="/" className="text-lg font-bold text-primary">HomeHero</Link>
              <p className="text-on-surface-variant text-sm mt-1">© 2024 HomeHero. All rights reserved.</p>
            </div>
            <nav className="flex flex-wrap justify-center gap-6">
              <Link to="/about" className="text-on-surface-variant hover:text-primary transition-colors text-sm">About Us</Link>
              <Link to="/terms" className="text-on-surface-variant hover:text-primary transition-colors text-sm">Terms of Service</Link>
              <Link to="/privacy" className="text-on-surface-variant hover:text-primary transition-colors text-sm">Privacy Policy</Link>
              <Link to="/contact" className="text-on-surface-variant hover:text-primary transition-colors text-sm">Contact</Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WhoWeAreRegistered;