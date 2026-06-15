import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function VerifyAdminDashboard() {
  // State for dynamic admin profile data
  const [adminName, setAdminName] = useState('Verification Admin');

  // Load the current admin name from storage when the dashboard mounts
  useEffect(() => {
    const savedName = localStorage.getItem('adminUsername') || 'verify_admin';
    setAdminName(savedName);
  }, []);

  // Mock action handlers for beginner-friendly event tracking
  const handleReviewDocs = (providerName) => {
    alert(`Opening background verification documentation for: ${providerName}`);
  };

  const handleResolveDispute = (disputeId) => {
    alert(`Accessing mediation terminal for Dispute Ticket ${disputeId}`);
  };

  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col font-sans">
      {/* TopNavBar */}
      <header className="bg-surface/80 backdrop-blur-md sticky top-0 z-50 border-b border-outline-variant/30 shadow-sm">
        <div className="flex justify-between items-center w-full px-margin py-base max-w-[1280px] mx-auto">
          <div className="flex items-center gap-lg">
            <span className="text-2xl font-bold text-primary">HomeHero</span>
          </div>
          
          <div className="flex items-center gap-md">
            <button className="p-2 rounded-full hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-on-surface-variant">notifications</span>
            </button>
            <button className="p-2 rounded-full hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-on-surface-variant">settings</span>
            </button>
            
            <div className="flex items-center gap-sm pl-base border-l border-outline-variant/30">
              <img 
                alt="Admin Profile Avatar" 
                className="w-8 h-8 rounded-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgOWAGhbPMBxSvMRDNdvrQyzOBooLiTycTjcgjaAXD2bGLEbyNSy-DID13amZuj5Y1BW-1YAJKiVNilWFR8U1SWZkyEt_EA-UItv4TQR6BJSQTlQ--EbRSuF6g1_4hxBHPR8JvR9QDasWYITQBCX0UohKLrdKuhCrovLB-Af74FQyIqoAOUbsoSziuVW26ap33QXGMlC9SqvKsRIRJuLm-B2VTymIOqrywOC0nkpNq7hb68W8L7b-8iKBTODxrnQp-EUOiQJVk4Gc"
              />
              <div className="hidden sm:block">
                {/* Dynamic name injected directly into the template */}
                <p className="text-sm font-semibold leading-none">{adminName}</p>
                <p className="text-xs text-outline mt-0.5">Verification Admin</p>
              </div>
            </div>

            <Link to="/login" className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors ml-2 border border-rose-100">
              <span className="material-symbols-outlined text-base">logout</span>
              <span>Log Out</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container Content */}
      <main className="flex-grow w-full max-w-[1280px] mx-auto px-margin py-lg">
        {/* Header Title Section */}
        <div className="mb-lg">
          <h1 className="text-4xl font-bold text-on-surface tracking-tight mb-1">Verification Console</h1>
          <p className="text-lg text-on-surface-variant max-w-2xl">
            Manage service provider applications, verify credentials, and resolve active platform disputes to maintain trust and safety.
          </p>
        </div>

        {/* Metrics Overview Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter mb-xl">
          <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/20 shadow-sm">
            <div className="flex items-center justify-between mb-sm">
              <span className="material-symbols-outlined text-primary text-[32px]">verified_user</span>
              <span className="text-xs font-medium px-2 py-1 bg-secondary-container text-on-secondary-container rounded-full">+12%</span>
            </div>
            <p className="text-outline text-sm font-semibold">Pending Verifications</p>
            <p className="text-3xl font-semibold text-on-surface mt-1">24</p>
          </div>

          <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/20 shadow-sm">
            <div className="flex items-center justify-between mb-sm">
              <span className="material-symbols-outlined text-error text-[32px]">gavel</span>
              <span className="text-xs font-medium px-2 py-1 bg-error-container text-on-error-container rounded-full">Urgent</span>
            </div>
            <p className="text-outline text-sm font-semibold">Open Disputes</p>
            <p className="text-3xl font-semibold text-on-surface mt-1">8</p>
          </div>

          <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/20 shadow-sm">
            <div className="flex items-center justify-between mb-sm">
              <span className="material-symbols-outlined text-tertiary text-[32px]">group</span>
            </div>
            <p className="text-outline text-sm font-semibold">Active Providers</p>
            <p className="text-3xl font-semibold text-on-surface mt-1">850</p>
          </div>

          <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/20 shadow-sm">
            <div className="flex items-center justify-between mb-sm">
              <span className="material-symbols-outlined text-primary text-[32px]">analytics</span>
            </div>
            <p className="text-outline text-sm font-semibold">Verification Rate</p>
            <p className="text-3xl font-semibold text-on-surface mt-1">92%</p>
          </div>
        </div>

        {/* Dashboard Operational Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-xl">
          
          {/* Column A: Pending Verifications Component */}
          <section>
            <div className="flex items-center justify-between mb-md">
              <h2 className="text-2xl font-semibold text-on-surface">Pending Verifications</h2>
              <button className="text-primary text-sm font-semibold hover:underline">View All</button>
            </div>

            <div className="space-y-sm">
              {/* Provider Card 1 */}
              <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/10 flex items-center gap-md group hover:border-primary/30 transition-all duration-300 shadow-sm">
                <img alt="Kasun Dissanayake avatar" className="w-14 h-14 rounded-full object-cover flex-shrink-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDV2z_XR4I31IVaxi2pn8NIIyjdMr53hrGCY8LXVZk-91YDODFMLTOUsJW4LuzidD9h0e6YNOn8M1NKSBrS76usCiR-JRYvsGwRiD8JAZk1TgtKHhtBgl83GI5h4RJd_q2SgEZpArwKU502AS_AlinmH8Du4ASerVB1vWd8n0sHbFidmYNv_fhKoTZiuDqOjibdPPYTDdY-Y8CX8IE7shwQej0du8IgE3sEJNe-89D5fexcikuD2fq7UlC1lALxL55GtiKFpm0p8GE" />
                <div className="flex-grow">
                  <h3 className="font-semibold text-on-surface">Kasun Dissanayake</h3>
                  <div className="flex items-center gap-xs text-outline text-xs my-0.5">
                    <span className="material-symbols-outlined text-[14px]">plumbing</span>
                    <span>Plumbing</span>
                  </div>
                  <p className="text-xs text-outline-variant">Applied: Oct 24, 2026</p>
                </div>
                <button onClick={() => handleReviewDocs("Kasun Dissanayake")} className="px-md py-2 bg-primary text-on-primary rounded-lg text-sm font-semibold hover:bg-primary-container transition-colors">
                  Review Docs
                </button>
              </div>

              {/* Provider Card 2 */}
              <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/10 flex items-center gap-md group hover:border-primary/30 transition-all duration-300 shadow-sm">
                <img alt="Sarah Miller avatar" className="w-14 h-14 rounded-full object-cover flex-shrink-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5WrxM7dPEnU4vx6T4o9TREd8NItYwefqLHXW2KF-t_suBKIvO90O1V0Mi3IigRbrlbvvBvsqWb0YerXoJYS3u99MuEHqiQrSHi9hg7EdvkP8hai7vnEbAual_jvzKjr1YSR58ed1ZMLs1awQE96YD7ThNLAQlfp5OWocXRm9A4BgyVenbK4lMUC1zMxXilwOXRo13hRaiLb_JzajTd5ffvGSTD4T6iSqonSz1jmYFv4Vy-TqhvRVUSdZVgagOHufQ7j_NlrfHZCw" />
                <div className="flex-grow">
                  <h3 className="font-semibold text-on-surface">Sarah Miller</h3>
                  <div className="flex items-center gap-xs text-outline text-xs my-0.5">
                    <span className="material-symbols-outlined text-[14px]">electrical_services</span>
                    <span>Electrical</span>
                  </div>
                  <p className="text-xs text-outline-variant">Applied: Oct 25, 2026</p>
                </div>
                <button onClick={() => handleReviewDocs("Sarah Miller")} className="px-md py-2 bg-primary text-on-primary rounded-lg text-sm font-semibold hover:bg-primary-container transition-colors">
                  Review Docs
                </button>
              </div>

              {/* Provider Card 3 */}
              <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/10 flex items-center gap-md group hover:border-primary/30 transition-all duration-300 shadow-sm">
                <img alt="Marcus Chen avatar" className="w-14 h-14 rounded-full object-cover flex-shrink-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDksddfQEEyYt-THfLct53EjmH71frqIDIJgYGOTyOZdbo3DaDHQs1-A31i2QAPss0khqqCpBEU6DCrVuU3BfYxG1E8MRR-LdDl-olQfTMxd2AY1DQvimJtdAY3DSfoeqSoNV3IhMXgEsEn42E1cknw7PFxT4H-fNv0tS1vhyZEllTAfb04oMFGAdToRiENAGK_PKv1RJViXPWtXEoRByIpZGCN94TAdmLlt1FHaD6vPRdD2jMu8moFcWLUaieT7CKSX6XrSevxSg" />
                <div className="flex-grow">
                  <h3 className="font-semibold text-on-surface">Marcus Chen</h3>
                  <div className="flex items-center gap-xs text-outline text-xs my-0.5">
                    <span className="material-symbols-outlined text-[14px]">cleaning_services</span>
                    <span>Deep Cleaning</span>
                  </div>
                  <p className="text-xs text-outline-variant">Applied: Oct 26, 2026</p>
                </div>
                <button onClick={() => handleReviewDocs("Marcus Chen")} className="px-md py-2 bg-primary text-on-primary rounded-lg text-sm font-semibold hover:bg-primary-container transition-colors">
                  Review Docs
                </button>
              </div>
            </div>
          </section>

          {/* Column B: Active Disputes Component */}
          <section>
            <div className="flex items-center justify-between mb-md">
              <h2 className="text-2xl font-semibold text-on-surface">Active Disputes</h2>
              <div className="flex items-center gap-sm">
                <span className="w-3 h-3 bg-error rounded-full"></span>
                <span className="text-xs text-outline font-semibold">4 High Priority</span>
              </div>
            </div>

            <div className="space-y-sm">
              {/* Dispute Card 1 */}
              <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/10 flex flex-col gap-sm hover:border-error/20 transition-all duration-300 relative overflow-hidden shadow-sm">
                <div className="absolute top-0 right-0 w-1 h-full bg-error"></div>
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-bold text-primary bg-primary-fixed px-2 py-0.5 rounded uppercase tracking-wider">#DS-9201</span>
                    <h3 className="font-semibold text-on-surface mt-1">Service Quality Issue</h3>
                  </div>
                  <span className="text-error font-bold text-xs flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">warning</span> Urgent
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-md py-xs border-y border-outline-variant/10">
                  <div>
                    <p className="text-xs text-outline">Provider</p>
                    <p className="text-sm font-semibold text-on-surface-variant">John's HVAC</p>
                  </div>
                  <div>
                    <p className="text-xs text-outline">Client</p>
                    <p className="text-sm font-semibold text-on-surface-variant">Alice Peterson</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-outline italic">"AC unit leaking after maintenance..."</p>
                  <button onClick={() => handleResolveDispute("DS-9201")} className="px-md py-2 border-2 border-secondary text-secondary rounded-lg text-sm font-semibold hover:bg-secondary hover:text-on-secondary transition-all">
                    Resolve
                  </button>
                </div>
              </div>

              {/* Dispute Card 2 */}
              <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/10 flex flex-col gap-sm hover:border-outline-variant transition-all duration-300 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-bold text-primary bg-primary-fixed px-2 py-0.5 rounded uppercase tracking-wider">#DS-8842</span>
                    <h3 className="font-semibold text-on-surface mt-1">Payment Discrepancy</h3>
                  </div>
                  <span className="text-outline font-bold text-xs flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">schedule</span> Normal
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-md py-xs border-y border-outline-variant/10">
                  <div>
                    <p className="text-xs text-outline">Provider</p>
                    <p className="text-sm font-semibold text-on-surface-variant">Green Lawn Care</p>
                  </div>
                  <div>
                    <p className="text-xs text-outline">Client</p>
                    <p className="text-sm font-semibold text-on-surface-variant">Robert Ford</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-outline italic">"Overcharged for extra hour of work..."</p>
                  <button onClick={() => handleResolveDispute("DS-8842")} className="px-md py-2 border-2 border-secondary text-secondary rounded-lg text-sm font-semibold hover:bg-secondary hover:text-on-secondary transition-all">
                    Resolve
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-low bottom-0 mt-lg border-t border-outline-variant/20">
        <div className="w-full py-md px-margin flex flex-col md:flex-row justify-between items-center max-w-[1280px] mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-md">
            <span className="text-sm font-semibold text-tertiary">HomeHero Trusted Care</span>
            <p className="text-xs text-outline text-center md:text-left">© 2026 HomeHero Trusted Care. All rights reserved.</p>
          </div>
          <nav className="flex items-center gap-md mt-md md:mt-0">
            <a className="text-xs text-outline hover:text-primary underline transition-all" href="#">Privacy Policy</a>
            <a className="text-xs text-outline hover:text-primary underline transition-all" href="#">Terms of Service</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}

export default VerifyAdminDashboard;