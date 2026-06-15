import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const PendingVerification = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState('PENDING_REVIEW');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="bg-[#f7f9fb] text-[#191c1e] flex flex-col min-h-screen">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="flex justify-between items-center px-8 h-20 max-w-[1280px] mx-auto">
          <div className="text-2xl font-bold text-[#006948] tracking-tight">HomeHero</div>
          <div className="flex items-center gap-6">
            <span className="material-symbols-outlined text-[#3d4a42] cursor-pointer">notifications</span>
            <span className="material-symbols-outlined text-[#3d4a42] cursor-pointer">settings</span>
            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border border-gray-300">
              <img alt="Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6l7ZYU-qMir0C46CL2KYrb8_4waFnlZBtaKuWd0hnmNRN3xIKi4HXmX8LQIK9oGCZ14b2fk00dWVf_c2vY59Q_tirPN55Tt58jtdL9j5Znw0PqLFHfb9E72vQUn4BmDVHaJpafi7ea3iKNqWX3Uf7eKTl734bhqjaS3fIN-yAAR5Bjmobn6rrmNCF847JY6fd04yXSg6d3ZgeIq0E8bYunK4MlLD4y4H73ipwc84hCKeoTBIybox9_YaoeGIpGi3Ati5cVTofe5Y" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow px-8 flex items-center justify-center min-h-[calc(100vh-80px-200px)] pt-20">
        <div className="max-w-2xl w-full text-center">
          <div className="relative">
            <div className="absolute -top-12 -left-12 w-32 h-32 bg-emerald-100/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-emerald-200/30 rounded-full blur-3xl"></div>
            
            <div className="relative bg-white rounded-xl border border-gray-200 shadow-lg backdrop-blur-sm overflow-hidden p-6 md:p-8">
              <div className="mb-4 inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-100 text-[#006948]">
                <span className="material-symbols-outlined text-4xl">verified_user</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-[#191c1e] mb-3">Verification in Progress</h1>
              
              <p className="text-lg text-[#3d4a42] max-w-lg mx-auto leading-relaxed">
                Thank you for joining HomeHero. Our team is currently reviewing your profile and documents. 
                We will notify you via email once your account has been verified.
              </p>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-[#3d4a42]">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#006948]">schedule</span>
                    <span className="font-semibold text-sm">Estimated review: 24-48h</span>
                  </div>
                  <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#006948]">mail</span>
                    <span className="font-semibold text-sm">Check your inbox</span>
                  </div>
                </div>
              </div>
              
              <p className="mt-6 text-sm text-[#6d7a72] italic">
                Once approved, you will be automatically redirected to your ProService Dashboard.
              </p>
            </div>
            
            <div className="mt-4 flex justify-center">
              <div className="flex items-center gap-2 bg-[#f2f4f6] px-4 py-2 rounded-full border border-gray-200">
                <span className="material-symbols-outlined text-[#3d4a42] text-xl">help_outline</span>
                <span className="text-xs text-[#3d4a42]">Need help? Visit our <a href="#" className="text-[#006948] font-bold hover:underline">Support Center</a></span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-[1280px] mx-auto px-8 py-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="col-span-1">
              <div className="text-2xl font-bold text-[#006948] tracking-tight mb-3">HomeHero</div>
              <p className="text-xs text-[#3d4a42]">
                Connecting trusted local professionals with homeowners since 2024. Quality service, guaranteed.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-[#191c1e] mb-3">Platform</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-xs text-[#3d4a42] hover:text-[#006948]">How it works</a></li>
                <li><a href="#" className="text-xs text-[#3d4a42] hover:text-[#006948]">For Providers</a></li>
                <li><a href="#" className="text-xs text-[#3d4a42] hover:text-[#006948]">Safety</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-[#191c1e] mb-3">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-xs text-[#3d4a42] hover:text-[#006948]">About Us</a></li>
                <li><a href="#" className="text-xs text-[#3d4a42] hover:text-[#006948]">Careers</a></li>
                <li><a href="#" className="text-xs text-[#3d4a42] hover:text-[#006948]">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-[#191c1e] mb-3">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-xs text-[#3d4a42] hover:text-[#006948]">Terms of Service</a></li>
                <li><a href="#" className="text-xs text-[#3d4a42] hover:text-[#006948]">Privacy Policy</a></li>
                <li><a href="#" className="text-xs text-[#3d4a42] hover:text-[#006948]">Cookie Settings</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-4 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 mt-4">
            <p className="text-xs text-[#6d7a72]">© 2024 HomeHero Technologies Inc. All rights reserved.</p>
            <div className="flex gap-4">
              <span className="material-symbols-outlined text-[#6d7a72] hover:text-[#006948] cursor-pointer">public</span>
              <span className="material-symbols-outlined text-[#6d7a72] hover:text-[#006948] cursor-pointer">share</span>
              <span className="material-symbols-outlined text-[#6d7a72] hover:text-[#006948] cursor-pointer">contact_support</span>
            </div>
          </div>
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

export default PendingVerification;