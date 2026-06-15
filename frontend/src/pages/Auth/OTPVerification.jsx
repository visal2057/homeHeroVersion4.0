import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const OTPVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const inputRefs = useRef([]);
  
  const email = location.state?.email || localStorage.getItem('pendingVerificationEmail');
  const type = location.state?.type || 'email_verification';

  useEffect(() => {
    if (!email) {
      navigate('/auth/register');
    }
  }, [email, navigate]);

  const handleChange = (index, value) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      setError('Please enter the 6-digit code');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: otpCode, type })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        if (type === 'password_reset') {
          navigate('/auth/reset-password', { state: { resetToken: data.resetToken } });
        } else {
          localStorage.removeItem('pendingVerificationEmail');
          navigate('/auth/email-verified');
        }
      } else {
        setError(data.error || 'Verification failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/resend-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, type })
      });
      
      if (response.ok) {
        alert('New OTP sent to your email');
      } else {
        alert('Failed to resend OTP');
      }
    } catch (err) {
      alert('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f7f9fb] text-[#191c1e] font-body-md min-h-screen flex flex-col">
      <main className="flex-grow flex flex-col md:flex-row">
        {/* Left Side */}
        <section className="w-full md:w-1/2 flex flex-col px-6 md:px-8 py-8 relative">
          <div className="flex justify-between items-center mb-12">
            <div className="text-2xl font-bold text-[#006948]">HomeHero</div>
            <Link to="/login" className="flex items-center gap-1 text-[#3d4a42] hover:text-[#006948] transition-colors font-semibold text-sm">
              <span>Back to Login</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
          
          <div className="max-w-md mx-auto w-full flex-grow flex flex-col justify-center py-20">
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-[#191c1e] mb-2">Verify your identity</h1>
              <p className="text-lg text-[#3d4a42]">We've sent a 6-digit code to your email. Please enter it below to continue.</p>
            </div>
            
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex justify-between gap-2 md:gap-4">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 md:w-16 md:h-16 text-center text-2xl md:text-3xl font-semibold border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#006948] focus:border-transparent transition-all"
                  />
                ))}
              </div>
              
              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-4 bg-[#006948] text-white font-semibold rounded-lg shadow-sm hover:bg-[#00855d] transition-all active:scale-[0.98]"
              >
                {loading ? 'Verifying...' : 'Verify Code'}
              </button>
              
              <div className="text-center">
                <p className="text-[#3d4a42]">
                  Didn't receive a code? 
                  <button type="button" onClick={handleResend} className="text-[#006948] font-bold hover:underline ml-1">
                    Resend OTP
                  </button>
                </p>
              </div>
            </form>
          </div>
        </section>

        {/* Right Side - Image */}
        <section className="hidden md:block md:w-1/2 relative overflow-hidden h-screen sticky top-0">
          <div className="absolute inset-0 bg-[#006948]/10 mix-blend-multiply z-10"></div>
          <img 
            className="absolute inset-0 w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4rSwreLm5GNR_k6WZ5wtuxaYI4OtKKupT8BFkRuNgmtZoLDeZPOHyaUWfT2YsESqsMgLa_yfF4JN5fPTSPANW_HReZc5kVE7CbVHdsI8YJysSZxiDtLGOw1YXuwuC1djD2ItF7e1MEmaWunD0PCTLKO9R6LNWmGQMJW-y1DWFg4EKWT32NSv0n0pMNFP4uh18dQ8RKKVkikw_CF-9VXO0oV0xeEppn27hofTuYSLdXey21PvExI2Qgldgoa-aI-jK8-eRR96-lD0"
            alt="Secure verification"
          />
          <div className="absolute bottom-12 left-12 z-20 bg-white/90 backdrop-blur-md p-6 rounded-xl shadow-lg border border-gray-200 max-w-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-[#006948]">verified_user</span>
              </div>
              <span className="font-semibold text-sm">Secure Verification</span>
            </div>
            <p className="text-sm text-[#3d4a42]">
              Your account security is our priority. HomeHero uses industry-standard encryption to protect your home and data.
            </p>
          </div>
        </section>
      </main>

      <footer className="w-full py-4 bg-[#f2f4f6] border-t border-gray-200">
        <div className="max-w-[1280px] mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-xs text-[#3d4a42]">© 2024 HomeHero. Trusted professional care for your home.</p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-[#3d4a42] hover:text-[#006948] hover:underline">Privacy Policy</a>
            <a href="#" className="text-xs text-[#3d4a42] hover:text-[#006948] hover:underline">Terms of Service</a>
            <a href="#" className="text-xs text-[#3d4a42] hover:text-[#006948] hover:underline">Help Center</a>
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

export default OTPVerification;