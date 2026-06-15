import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const SignUpAs = () => {
  const navigate = useNavigate();

  const handleCustomerClick = () => {
    navigate('/auth/register');
  };

  const handleProviderClick = () => {
    navigate('/auth/worker-register');
  };

  return (
    <div className="bg-[#f7f9fb] text-[#191c1e] font-body-md min-h-screen flex flex-col">
      {/* TopNavBar */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="flex justify-between items-center px-6 py-2 max-w-[1280px] mx-auto w-full">
          {/* Brand Logo */}
          <Link to="/" className="text-3xl font-bold text-[#006948]">
            HomeHero
          </Link>
          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6"></nav>
          {/* Trailing Action */}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-[120px] pb-20 max-w-[1280px] mx-auto px-6 w-full flex flex-col items-center">
        {/* Selection Heading */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-[#191c1e] mb-3">Sign up as?</h1>
          <p className="text-[#3d4a42] text-lg max-w-2xl mx-auto">
            Choose who you want to be at HomeHero.
          </p>
        </div>

        {/* Selection Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-5xl">
          {/* Customer Card */}
          <div onClick={handleCustomerClick} className="group cursor-pointer">
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="aspect-[4/5] relative overflow-hidden">
                <img 
                  alt="Customer profile" 
                  className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8Mrb9nDtYFycWGfC2IiasAXchRKCy2CCHEDn2mliGm0pBhKzkG_ktq0BG0eB_SPW-07K3tsOStgAybZUZyyV4f6TJTY2l1Es4tFIXf_e310D6Fukmi7LXCYaL5bdDhBFXqlSRjq7Z46SfmkQBv_HqvNl6rVfbZxvCMOPTDc8t0pufRxtjd4DaEqHOgKxpOmio67csiUerAi2J4XON_85-dssH6dHRa49DI1cGp3Ip9emyRco_7jfpMTNuitPUhylpMsL3hQJLO1A"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="p-8 text-center bg-white">
                <h2 className="text-3xl font-bold text-[#191c1e] group-hover:text-[#006948] transition-colors">Customer</h2>
                <p className="text-[#3d4a42] mt-3">
                  Find and book trusted professionals for your home maintenance and repair needs.
                </p>
              </div>
            </div>
          </div>

          {/* Service Provider Card */}
          <div onClick={handleProviderClick} className="group cursor-pointer">
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="aspect-[4/5] relative overflow-hidden">
                <img 
                  alt="Service Provider profile" 
                  className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAO1sY7eOV7z3Kpi2a7O-nZ4lJdKVtk9Anq-iGvIIs0gYcbJXNHHS5fGF4NMbKeh6rmVDFZYtCEdpxWZdPp31lJRGkp1nbDgehjRCYiEuttSj2RH4-ryvr1sSqYqQatQeV703ql67M5DDtnPwkvBxQIDP0aOXQ0sfFnPUbhphZ33Oa4zYdngy3zgLckAUy2K_H2ef1Shnyi4Fy8Y_ins8SKOEmae8sw7Ch-e75mDSnxWfLaosECkW_F9-iU60xXXVX5GZZC7ScZfF8"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="p-8 text-center bg-white">
                <h2 className="text-3xl font-bold text-[#191c1e] group-hover:text-[#006948] transition-colors">Service Provider</h2>
                <p className="text-[#3d4a42] mt-3">
                  Connect with local homeowners looking for your expertise and grow your business.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Support Section */}
        <div className="mt-12 text-center">
          <p className="text-[#3d4a42] font-semibold">
            Already have an account? 
            <Link to="/login" className="text-[#006948] hover:underline ml-1">Log in here</Link>
          </p>
          <div className="mt-6">
            <Link to="/" className="inline-flex items-center gap-2 text-[#006948] font-semibold hover:underline">
              <span className="material-symbols-outlined">arrow_back</span> Back to Home
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full px-8 py-6 mt-12 flex flex-col md:flex-row justify-between items-center gap-4 bg-[#f2f4f6]">
        {/* Footer Logo and Copyright */}
        <div className="flex flex-col items-center md:items-start">
          <span className="text-2xl font-bold text-[#006948]">HomeHero</span>
          <p className="text-[#3d4a42] mt-1">© 2024 HomeHero. Trusted Care for Every Home.</p>
        </div>
        {/* Footer Links */}
        <div className="flex flex-wrap justify-center gap-6">
          <a href="#" className="text-sm text-[#3d4a42] hover:text-[#006948] underline">Privacy Policy</a>
          <a href="#" className="text-sm text-[#3d4a42] hover:text-[#006948] underline">Terms of Service</a>
          <a href="#" className="text-sm text-[#3d4a42] hover:text-[#006948] underline">Contact Us</a>
          <a href="#" className="text-sm text-[#3d4a42] hover:text-[#006948] underline">Help Center</a>
          <a href="#" className="text-sm text-[#3d4a42] hover:text-[#006948] underline">Careers</a>
        </div>
      </footer>

      <style>{`
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
      `}</style>
    </div>
  );
};

export default SignUpAs;