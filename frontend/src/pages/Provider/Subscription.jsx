import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../components/AuthContext';
import { GlobalToast } from '../../components/GlobalToast';

// Add these utility functions right after your imports
const formatCardNumber = (value) => {
  const cleaned = value.replace(/\D/g, '');
  const limited = cleaned.slice(0, 16);
  const groups = limited.match(/.{1,4}/g) || [];
  return groups.join(' ');
};

const formatExpiryDate = (value) => {
  const cleaned = value.replace(/\D/g, '');
  const limited = cleaned.slice(0, 4);
  if (limited.length >= 3) {
    return `${limited.slice(0, 2)}/${limited.slice(2)}`;
  }
  return limited;
};



const Membership = () => {
  const { user, token } = useAuth();

  // Modal visibility state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);

  // Toast notification state
  const [toast, setToast] = useState({
    show: false,
    isVisible: false,
    type: 'success', // 'success' or 'error'
    message: ''
  });

  // Dynamic state placeholders replacing old static mock arrays
  const [membership, setMembership] = useState(null);
  const [paymentHistory, setPaymentHistory] = useState([]);
  
  // Form submission state tracking
  const [formData, setFormData] = useState({
    cardholderName: '',
    cardNumber: '',
    expiryDate: '',
    cvc: ''
  });

  // Base configurations targeting your Express backend setup
  const API_URL = 'http://localhost:5000/api/membership'; 
  const currentUserId = user?.id || user?.userid;
  const providerName = user?.full_name || user?.name || user?.username || 'Account';

  // Dynamic server dataset loading logic execution block
  const fetchMembershipData = async () => {
    if (!currentUserId) {
      setLoadingPage(false);
      return;
    }

    try {
      const response = await axios.get(`${API_URL}/my-status`, {
        params: { userid: currentUserId },
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : `Bearer ${localStorage.getItem('token')}`
        }
      });
      setMembership(response.data.membership);
      setPaymentHistory(response.data.history);
    } catch (err) {
      console.error("Error synchronizing table data vectors:", err.message);
    } finally {
      setLoadingPage(false);
    }
  };

  useEffect(() => {
    fetchMembershipData();
    return () => {
      document.body.style.overflow = 'auto'; // Cleanup guard safely
    };
  }, [currentUserId]);

  // Side Navigation items blueprint helper
  const navItems = [
    { label: 'Dashboard', icon: 'dashboard', path: '/dashboard', active: false },
    { label: 'Requests', icon: 'mail', path: '/requests', active: false },
    { label: 'Jobs to do', icon: 'event_note', path: '/jobs', active: false },
    { label: 'Completed Jobs', icon: 'check_circle', path: '/completed', active: false },
    { label: 'Membership', icon: 'card_membership', path: '/membership', active: true }
  ];

  // Helper function to control scroll lock on modal toggle
  const openModal = () => {    // Check if a plan is already active
    if (membership?.status === 'ACTIVE') {
      showToast('You already have an active subscription. Wait until it expires or contact support to upgrade.', 'error');
      return;
    }    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsProcessing(false);
    document.body.style.overflow = 'auto';
  };

  // Helper function to show toast notifications
  const showToast = (message, type = 'success') => {
    setToast({
      show: true,
      isVisible: true,
      type,
      message
    });

    // Auto-hide after 4 seconds
    const timeoutId = setTimeout(() => {
      setToast(prev => ({ ...prev, isVisible: false }));
      setTimeout(() => {
        setToast(prev => ({ ...prev, show: false }));
      }, 300);
    }, 4000);

    return () => clearTimeout(timeoutId);
  };

  // Keyboard shortcut listener to clear overlay on Escape press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Form input field generic string processor
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Add these handlers after your existing handleInputChange function
const handleCardNumberChange = (e) => {
  const rawValue = e.target.value;
  const digitsOnly = rawValue.replace(/\s/g, '');
  if (digitsOnly.length > 16) return;
  const formatted = formatCardNumber(digitsOnly);
  setFormData({
    ...formData,
    cardNumber: formatted
  });
};

const handleExpiryChange = (e) => {
  const rawValue = e.target.value;
  const digitsOnly = rawValue.replace(/\//g, '');
  if (digitsOnly.length > 4) return;
  const formatted = formatExpiryDate(digitsOnly);
  setFormData({
    ...formData,
    expiryDate: formatted
  });
};

const handleCardNumberPaste = (e) => {
  e.preventDefault();
  const pastedData = e.clipboardData.getData('text');
  const digitsOnly = pastedData.replace(/\D/g, '');
  const limited = digitsOnly.slice(0, 16);
  const formatted = formatCardNumber(limited);
  setFormData({
    ...formData,
    cardNumber: formatted
  });
};

const handleExpiryPaste = (e) => {
  e.preventDefault();
  const pastedData = e.clipboardData.getData('text');
  const digitsOnly = pastedData.replace(/\D/g, '');
  const limited = digitsOnly.slice(0, 4);
  const formatted = formatExpiryDate(limited);
  setFormData({
    ...formData,
    expiryDate: formatted
  });
};

const handleCardNumberKeyDown = (e) => {
  const { value } = e.target;
  const cursorPosition = e.target.selectionStart;
  
  if (e.key === 'Backspace') {
    const charsBeforeCursor = value.slice(0, cursorPosition);
    if (charsBeforeCursor.endsWith(' ')) {
      e.preventDefault();
      const newValue = value.slice(0, cursorPosition - 1) + value.slice(cursorPosition);
      setFormData({
        ...formData,
        cardNumber: newValue
      });
      setTimeout(() => {
        e.target.selectionStart = cursorPosition - 1;
        e.target.selectionEnd = cursorPosition - 1;
      }, 0);
    }
  }
};

  // Submission network execution post handler logic
  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Formulate card string snapshot safely
    const cleanCard = formData.cardNumber.replace(/\s/g, '');
    const lastFourDigits = cleanCard.slice(-4) || '4242';
    const paymentMethodSnapshot = `Visa •••• ${lastFourDigits}`;

    try {
      console.log('renew payment payload', { paymentMethodSnapshot, token });
      await axios.post(`${API_URL}/renew`, {
        paymentMethod: paymentMethodSnapshot,
        payment_method: paymentMethodSnapshot
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      // Show success notification
      showToast('✓ Payment successful! Your subscription has been renewed.', 'success');
      
      closeModal();
      setFormData({ cardholderName: '', cardNumber: '', expiryDate: '', cvc: '' });
      setLoadingPage(true);
      
      // Reload and re-populate the tables dynamically 
      await fetchMembershipData();
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Unknown error occurred';
      console.error("Payment processing transaction failure:", err.response?.data || err.message);
      
      // Show error notification
      showToast(`✕ Payment failed: ${errorMessage}`, 'error');
      
      setIsProcessing(false);
    }
  };

  // Helper function to format system timestrings beautifully
  const formatDate = (isoString) => {
    if (!isoString) return 'N/A';
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' });
  };

  if (loadingPage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-primary font-bold">
        Synchronizing Account Status Profile Matrix...
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen text-on-surface antialiased flex flex-col relative">
      
      {/* Toast Notification */}
      <GlobalToast toast={toast} />
      
      {/* ── TOP NAVIGATION BAR ── */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-surface/80 border-b border-outline-variant/30 shadow-sm">
        <div className="flex justify-between items-center px-6 py-2 max-w-[1280px] mx-auto w-full h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary tracking-tight">HomeHero</Link>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <button className="p-1 text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <button className="p-1 text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
                <span className="material-symbols-outlined">settings</span>
              </button>
            </div>
            <div className="h-6 w-px bg-outline-variant/30"></div>
            <div className="relative group">
              <button className="flex items-center gap-2 hover:bg-surface-container/30 p-1 rounded-lg transition-all cursor-pointer">
                <span className="text-sm font-semibold text-on-surface">{providerName}</span>
                <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant">
                  <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAU9-57pYiU4tGXudpdS_L3BYty1utHx0DAerc1r1WNDb3NJziFvBYgGcar7DBGI6-S6yIXbDbJqXHpGZqjgoFXAp4wgorJKZK57P400mgZurlkSrLpCz2fHhrdt5JDDTWfkQHLo_ppmNYV8XFtVfhTiElSjvMrOpjOdEXU1Z8LaRpLCIEHMn60zzP06wCFXyqTp-0cMwQnqNNmu7X8DRxQjtktFkvKNaDZhYcW2TSFjj2kztvQ_aqRm23bWqwkMpKBm4SYZekqGPA" 
                    alt="User profile illustration" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </button>
              {/* Account Dropdown */}
              <div className="hidden group-focus-within:block absolute right-0 top-full mt-1 w-48 bg-white rounded-xl border border-outline-variant shadow-lg z-[60]">
                <div className="p-1">
                  <button className="w-full flex items-center gap-2 p-3 rounded-lg text-on-surface-variant hover:bg-error-container hover:text-error transition-all text-left cursor-pointer">
                    <span className="material-symbols-outlined text-sm">logout</span>
                    <span className="text-sm font-semibold">Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex flex-grow pt-16">
        {/* ── SIDE NAVIGATION PANEL ── */}
        <aside className="hidden md:flex fixed left-0 w-64 h-[calc(100vh-64px)] flex-col bg-surface-container-low border-r border-outline-variant/30 p-6">
          <div className="flex flex-col gap-2">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all text-sm font-semibold ${
                  item.active
                    ? 'bg-secondary-container text-primary font-bold'
                    : 'text-on-surface-variant hover:bg-secondary-container/30'
                }`}
              >
                <span className={`material-symbols-outlined ${item.active ? 'fill-icon' : ''}`}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </aside>

        {/* ── MAIN LAYOUT CANVAS ── */}
        <main className="flex-grow md:ml-64 px-8 py-10 min-h-screen">
          <div className="max-w-5xl mx-auto space-y-8">
            
            {/* Page Header Layout */}
            <div className="flex flex-col gap-1">
              <h1 className="text-4xl font-bold text-on-surface tracking-tight">Manage Subscription</h1>
              <p className="text-on-surface-variant text-sm">Review your current plan and view payment history.</p>
            </div>

            {/* Bento Grid Structures */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Active Plan Specifications Card */}
              <div className="lg:col-span-2 bg-white rounded-xl border border-outline-variant p-8 flex flex-col justify-between relative overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="absolute top-0 right-0 p-8 text-primary/10 select-none pointer-events-none">
                  <span className="material-symbols-outlined text-[120px] leading-none">verified_user</span>
                </div>
                
                <div className="space-y-6 relative z-10">
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider ${membership?.status === 'ACTIVE' ? 'bg-secondary-container text-primary' : 'bg-error-container text-error'}`}>
                      {membership ? membership.status : 'NO ACTIVE PLAN'}
                    </span>
                    <span className="text-on-surface-variant text-xs">ID: HH-9283-SUBS</span>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-primary">Pro Provider Monthly</h2>
                    <p className="text-on-surface-variant font-medium text-sm mt-1">
                      {membership?.status === 'ACTIVE' ? `Active until ${formatDate(membership.end_date)}` : 'Activate your premium subscription limits below.'}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-outline-variant/30">
                    <div className="flex flex-col gap-2">
                      <span className="material-symbols-outlined text-primary">verified</span>
                      <span className="text-sm font-bold text-on-surface">Lead Priority</span>
                      <p className="text-xs text-on-surface-variant leading-relaxed">Top-tier visibility for new service requests.</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="material-symbols-outlined text-primary">percent</span>
                      <span className="text-sm font-bold text-on-surface">Reduced Fees</span>
                      <p className="text-xs text-on-surface-variant leading-relaxed">Commission reduced from 15% to 8% per job.</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="material-symbols-outlined text-primary">insights</span>
                      <span className="text-sm font-bold text-on-surface">Advanced Analytics</span>
                      <p className="text-xs text-on-surface-variant leading-relaxed">Detailed market and competitor trends.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4">
                  <button 
                    onClick={openModal}
                    className="w-full md:w-auto bg-primary text-white px-8 py-3 rounded-xl font-semibold text-lg hover:bg-secondary transition-all active:scale-[0.98] shadow-lg shadow-primary/20 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined">payments</span>
                    {membership?.status === 'ACTIVE' ? 'Extend Plan Access' : 'Buy Subscription (LKR 4,999)'}
                  </button>
                </div>
              </div>

              {/* Instant Billing Statement Snapshot Card */}
              <div className="bg-primary text-white rounded-xl p-8 flex flex-col justify-center space-y-6">
                <h3 className="text-xl font-bold opacity-90">Subscription Parameter</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-end border-b border-white/10 pb-2">
                    <span className="text-sm font-medium opacity-80">Duration Term:</span>
                    <span className="text-lg font-bold">30 Days</span>
                  </div>
                  <div className="flex justify-between items-end border-b border-white/10 pb-2">
                    <span className="text-sm font-medium opacity-80">Amount Total:</span>
                    <span className="text-lg font-bold">LKR 4,999.00</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-sm font-medium opacity-80">Renewal Mode:</span>
                    <span className="text-sm font-semibold">Manual Action</span>
                  </div>
                </div>
                <p className="text-xs opacity-75 italic text-center mt-4 bg-white/10 py-2 rounded-lg">
                  Requires renewal sequence once term expiration passes.
                </p>
              </div>
            </div>

            {/* ── PAYMENT HISTORY METRIC SECTION ── */}
            <div className="bg-white rounded-xl border border-outline-variant overflow-hidden shadow-sm">
              <div className="px-8 py-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-low/50">
                <h3 className="text-lg font-bold text-on-surface">Payment History</h3>
                <button className="text-primary text-sm font-bold hover:underline flex items-center gap-1 cursor-pointer">
                  <span className="material-symbols-outlined text-[18px]">download</span>
                  Download All
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container/30 text-on-surface-variant font-bold text-xs uppercase tracking-wider border-b border-outline-variant">
                      <th className="px-8 py-3">Date</th>
                      <th className="px-8 py-3">Invoice ID</th>
                      <th className="px-8 py-3">Description</th>
                      <th className="px-8 py-3">Amount</th>
                      <th className="px-8 py-3">Status</th>
                      <th className="px-8 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/30 text-sm">
                    {paymentHistory.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="px-8 py-6 text-center text-on-surface-variant font-medium">
                          No transaction invoice items discovered for this account context.
                        </td>
                      </tr>
                    ) : (
                      paymentHistory.map((invoice, idx) => (
                        <tr key={idx} className="hover:bg-surface-container/10 transition-colors">
                          <td className="px-8 py-4 text-on-surface-variant font-medium">{formatDate(invoice.payment_date)}</td>
                          <td className="px-8 py-4 font-mono text-xs tracking-tight text-slate-600">{invoice.invoice_number}</td>
                          <td className="px-8 py-4 text-on-surface-variant">Monthly Pro Subscription</td>
                          <td className="px-8 py-4 font-bold text-on-surface">LKR {parseFloat(invoice.amount).toFixed(2)}</td>
                          <td className="px-8 py-4">
                            <span className="flex items-center gap-1 text-primary font-semibold text-xs">
                              <span className="material-symbols-outlined text-[18px] fill-icon">check_circle</span>
                              Settled
                            </span>
                          </td>
                          <td className="px-8 py-4">
                            <button className="material-symbols-outlined text-primary hover:bg-primary-container/20 p-1 rounded-md transition-colors cursor-pointer">
                              download
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </main>
      </div>

      {/* ── CONTAINER FOOTER CANVAS ── */}
      <footer className="md:ml-64 bg-surface-container-low w-full px-8 py-6 border-t border-outline-variant/20 flex flex-col md:flex-row justify-between items-center gap-4 mt-auto">
        <div className="flex flex-col gap-1 items-center md:items-start">
          <span className="text-xl font-bold text-primary">HomeHero</span>
          <p className="text-xs text-on-surface-variant">© 2026 HomeHero. Trusted Care for Every Home.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-6 text-xs font-medium text-on-surface-variant">
          <a className="hover:text-primary transition-all" href="#privacy">Privacy Policy</a>
          <a className="hover:text-primary transition-all" href="#terms">Terms of Service</a>
          <a className="hover:text-primary transition-all" href="#contact">Contact Us</a>
          <a className="hover:text-primary transition-all" href="#help">Help Center</a>
          <a className="hover:text-primary transition-all" href="#careers">Careers</a>
        </div>
      </footer>

      {/* ── TRANSACTION OVERLAY PAYMENT MODAL ── */}
      {isModalOpen && (
        <div 
          id="paymentModal"
          onClick={(e) => e.target.id === 'paymentModal' && closeModal()}
          className="fixed top-0 left-0 w-screen h-screen z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-6"
        >
          <div className="bg-white w-[512px] min-w-[320px] md:min-w-[512px] max-w-lg rounded-2xl shadow-2xl overflow-hidden relative animate-in fade-in zoom-in duration-150">
            
            {/* Close trigger button */}
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 text-on-surface-variant hover:text-error transition-colors p-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[28px]">close</span>
            </button>

            <div className="p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-on-surface">Confirm Subscription</h2>
                <p className="text-on-surface-variant text-sm mt-1">Upgrade to Pro Provider Access (LKR 4,999.00/mo)</p>
              </div>

              <form className="space-y-4" onSubmit={handlePaymentSubmit}>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-on-surface uppercase tracking-wider">Cardholder Name</label>
                  <input 
                    name="cardholderName"
                    value={formData.cardholderName}
                    onChange={handleInputChange}
                    className="w-full border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary rounded-lg p-3 text-sm transition-all" 
                    placeholder="John Doe" 
                    type="text"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-on-surface uppercase tracking-wider">Card Number</label>
                  <div className="relative">
                    <input 
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleCardNumberChange}
                    onPaste={handleCardNumberPaste}
                    onKeyDown={handleCardNumberKeyDown}
                    className="w-full border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary rounded-lg p-3 pr-10 text-sm transition-all font-mono tracking-wider" 
                    placeholder="0000 0000 0000 0000" 
                    type="text"
                    maxLength="19"
                    required
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex text-on-surface-variant opacity-60 pointer-events-none">
                      <span className="material-symbols-outlined">credit_card</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-on-surface uppercase tracking-wider">Expiry Date</label>
                    <input 
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleExpiryChange}
                    onPaste={handleExpiryPaste}
                    className="w-full border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary rounded-lg p-3 text-sm transition-all font-mono" 
                    placeholder="MM/YY" 
                    type="text"
                    maxLength="5"
                    required
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-on-surface uppercase tracking-wider">CVC</label>
                    <input 
                    name="cvc"
                    value={formData.cvc}
                    onChange={handleInputChange}
                    className="w-full border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary rounded-lg p-3 text-sm transition-all font-mono" 
                    placeholder="•••" 
                    type="password"
                    maxLength="4"
                    required
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-surface-container-low p-4 rounded-lg mt-6">
                  <div className="bg-secondary-container p-2 rounded-full text-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px]">info</span>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-normal">
                    Your account will receive exactly 30 days of standard Pro Priority access bounds immediately upon completion.
                  </p>
                </div>

                <button 
                  disabled={isProcessing}
                  className="w-full bg-primary text-white py-3 rounded-xl font-bold text-lg hover:bg-secondary transition-all shadow-lg shadow-primary/20 mt-6 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer" 
                  type="submit"
                >
                  {isProcessing ? 'Processing Transaction...' : 'Complete Payment (LKR 4,999)'}
                </button>

                <p className="text-center text-xs text-outline mt-4 flex items-center justify-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">lock</span> 
                  Secure Encrypted Payment Connection
                </p>
              </form>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Membership;