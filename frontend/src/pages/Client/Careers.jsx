import React from 'react';
import { Link } from 'react-router-dom';

const Careers = () => {
  return (
    <div className="antialiased text-on-surface">
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-[0_4px_20px_-4px_rgba(6,78,59,0.08)]">
        <div className="flex justify-between items-center max-w-7xl mx-auto px-6 h-20">
          <Link to="/" className="text-2xl font-black text-emerald-600">HomeHero</Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/services" className="text-slate-600 font-medium pb-1 hover:text-emerald-700">Services</Link>
            <Link to="/about" className="text-slate-600 font-medium pb-1 hover:text-emerald-700">About us</Link>
            <Link to="/careers" className="text-emerald-600 border-b-2 border-emerald-600 font-semibold pb-1">Careers</Link>
            <Link to="/contact" className="text-slate-600 font-medium pb-1 hover:text-emerald-700">Contact us</Link>
          </div>
          <div className="flex items-center gap-6 text-slate-600">
            <Link to="/" className="hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[28px]">home</span>
            </Link>
            <Link to="/notifications" className="relative hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[28px]">notifications</span>
              <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white"></span>
            </Link>
            <Link to="/profile" className="hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[32px]">account_circle</span>
            </Link>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden bg-surface">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="z-10">
              <span className="inline-block py-1 px-3 rounded-full bg-emerald-100 text-emerald-700 text-xs mb-6 uppercase tracking-wider">Join our mission</span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Building the Future of Home Services</h1>
              <p className="text-lg text-gray-500 mb-10 max-w-lg">We're on a journey to redefine how the world takes care of their homes. Join our team of passionate service providers.</p>
              <div className="flex flex-wrap gap-4">
                <Link to="/auth/worker-register" className="bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:bg-emerald-700">Join as a Service Provider</Link>
                <Link to="/contact" className="bg-gray-100 text-emerald-600 px-8 py-4 rounded-xl font-semibold border border-gray-200 hover:bg-gray-200">Contact us</Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-emerald-100/30 rounded-full blur-3xl"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img alt="Professional HomeHero service technician" className="w-full h-[500px] object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIn4I2guqVCIMNjBJR-A79L5fHMyJ5JtkuI55z1ZHg_lesIgGV9VeoyMJ385dS6xSpicAeG5pdoUn7eXenka_WpdmNCV0PSZ_87PkfGZkKYLilt1JH3uDMlwR_eYBNbEW1_U5rp6TFNtmnQMNkZ7pyOqUNU6W_4E_Sm3-g3HVl_M2JxwJ3SPnlHZYEtYs_qsIMJ8diwVH7AfK8oKBdHWj9a-Yn2LLbxPWjbsQyoHXqNNQWJRxaZQKGQYBbdfU2jl48KX1aY43jAhc"/>
              </div>
            </div>
          </div>
        </section>

        {/* Why HomeHero */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why join HomeHero?</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">We believe that great work happens when talented people are given the trust, tools, and freedom to excel.</p>
          </div>
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "favorite", title: "Trusted Care", desc: "We extend the same care we give our customers to our team." },
              { icon: "auto_awesome", title: "Showcase your skills", desc: "We encourage you to use our platform to showcase your skills." },
              { icon: "public", title: "Real Impact", desc: "We spotlight the importance of small yet talented service providers." }
            ].map((item, idx) => (
              <div key={idx} className="p-8 rounded-2xl bg-white border border-gray-100 hover:border-emerald-200 transition-all group">
                <div className="w-14 h-14 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                </div>
                <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Open Positions */}
        <section className="py-24 bg-gray-50" id="openings">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Us As</h2>
              <p className="text-gray-500 max-w-2xl mx-auto">Choose your expertise and start your journey as a HomeHero professional.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "Gardener", desc: "Transform and maintain beautiful outdoor spaces.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBK1xX00HqqMa7yFb6nz1KnaCs6SXvOKPAhgLz-iSEBnxiu-MWcsLwpzASJvNVfSuppsD5El7K1joFP6O7Kwp5WMLCsgQN-upiMl_fWbJMA42Hf7reNyYi7tu-5b7lkLX4uiw8-QbL0Qkq0VUoUvXWPPTbTWCndjY0b7ghA8udZG9-Z64rvWSlfNcmEZ4-DWR2eOqDoBpvQvIa5qWgyCVsfPsmJH-kEpl214__Uov4FOnOckVnDYnvhV1d362IWec8Jk5D9h6decs4" },
                { title: "Cleaner", desc: "Make homes sparkle with professional cleaning services.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAyD7eRFXczTYrQw6ROcyNYfrdNVYnKa-vqb1Pv5HjwgwSUqvW-BqdqRxxtww1VL2-0j6TbrcDQ1LrX0MGkBmiPYzheaca94XUDNN9eG2K6AaI8_hw1b9TXdGC_khlW1NhIB8su0SmnxC5jR1zx2yh79sAZk315YJyOpLPlEHx7h0-vOifK7nZ4zR4IkkyzmiZ_N1TQ1tYTeNaC8NeEbZDqky9STWdCdR0PCrSsha6YQWmu5t2juj4aK_I7-gReY5hliU0sSJPQbmc" }
              ].map((job, idx) => (
                <div key={idx} className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1 group flex flex-col h-full">
                  <div className="h-64 overflow-hidden">
                    <img alt={job.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={job.img}/>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-2xl font-semibold mb-2">{job.title}</h3>
                    <p className="text-gray-500 mb-6">{job.desc}</p>
                    <button className="w-full py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-all mt-auto">Join as Pro</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-12 mt-auto bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-8">
          <div className="space-y-4">
            <div className="text-xl font-bold text-emerald-700">HomeHero</div>
            <p className="text-sm text-gray-500 max-w-xs">© 2024 HomeHero. Trusted care for your home.</p>
          </div>
          <div className="flex flex-wrap gap-8">
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Company</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-gray-500 text-sm hover:text-emerald-600">About Us</Link></li>
                <li><Link to="/careers" className="text-emerald-600 font-bold text-sm">Careers</Link></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Legal</h4>
              <ul className="space-y-2">
                <li><Link to="/privacy" className="text-gray-500 text-sm hover:text-emerald-600">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-gray-500 text-sm hover:text-emerald-600">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Careers;