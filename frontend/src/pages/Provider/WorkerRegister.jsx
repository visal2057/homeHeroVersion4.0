import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/AuthContext';
import CenteredToast from '../../components/CenteredToast';

const WorkerRegister = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [focused, setFocused] = useState({});
  
  // Form Data
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: '',
    district: '',
    categories: [],
    service_areas: [],
    nic_number: '',
    police_station: '',
    police_report_date: ''
  });

  // State for dropdown data
  const [categories, setCategories] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState({
    selfie: null,
    nic_front: null,
    nic_back: null,
    police_report: null
  });
  const [filePreviews, setFilePreviews] = useState({
    selfie: null,
    nic_front: null,
    nic_back: null,
    police_report: null
  });

  const handleFocus = (field) => {
    setFocused({ ...focused, [field]: true });
  };

  const handleBlur = (field) => {
    setFocused({ ...focused, [field]: false });
  };

  // Fetch categories and districts on load
  useEffect(() => {
    fetchCategories();
    fetchDistricts();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/worker/categories');
      const data = await response.json();
      if (data.categories) setCategories(data.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories([
        { id: 1, name: 'Gardening', icon: '🌱', description: 'Lawn care, planting, maintenance' },
        { id: 2, name: 'Pet Care', icon: '🐕', description: 'Pet grooming, walking, sitting' },
        { id: 3, name: 'Cleaning', icon: '🧹', description: 'House cleaning, deep cleaning' },
        { id: 4, name: 'AC Repair', icon: '❄️', description: 'AC servicing, repair, installation' },
        { id: 5, name: 'Handy Works', icon: '🔧', description: 'Furniture assembly, repairs' },
        { id: 6, name: 'Plumbing', icon: '🔧', description: 'Pipe repairs, leak fixes' },
        { id: 7, name: 'Electrical', icon: '⚡', description: 'Wiring, repairs, installations' },
        { id: 8, name: 'Carpentry', icon: '🪚', description: 'Furniture repair, woodworking' },
        { id: 9, name: 'Painting', icon: '🎨', description: 'Wall painting, color consulting' },
        { id: 10, name: 'Appliance Repair', icon: '🔌', description: 'Washing machine, fridge repair' }
      ]);
    }
  };

  const fetchDistricts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/worker/districts');
      const data = await response.json();
      if (data.districts) setDistricts(data.districts);
    } catch (error) {
      console.error('Error fetching districts:', error);
      setDistricts([
        { id: 1, name: 'Colombo', province: 'Western' },
        { id: 2, name: 'Gampaha', province: 'Western' },
        { id: 3, name: 'Kalutara', province: 'Western' },
        { id: 4, name: 'Kandy', province: 'Central' },
        { id: 5, name: 'Matale', province: 'Central' },
        { id: 6, name: 'Nuwara Eliya', province: 'Central' },
        { id: 7, name: 'Galle', province: 'Southern' },
        { id: 8, name: 'Matara', province: 'Southern' },
        { id: 9, name: 'Hambantota', province: 'Southern' },
        { id: 10, name: 'Jaffna', province: 'Northern' }
      ]);
    }
  };

  // ===== UPDATED VALIDATION HANDLERS =====
  
  // 1. Full Name - Letters and spaces only (no numbers, no symbols)
  const handleNameChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
    setFormData({ ...formData, full_name: value });
  };

  // 2. Email - Valid email structure (lowercase only)
  const handleEmailChange = (e) => {
    const value = e.target.value.toLowerCase();
    setFormData({ ...formData, email: value });
  };

  // 3. Phone - 10 digits only
  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setFormData({ ...formData, phone: value });
  };

  // 4. Password - No spaces
  const handlePasswordChange = (e) => {
    const value = e.target.value.replace(/\s/g, '');
    setFormData({ ...formData, password: value });
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value.replace(/\s/g, '');
    setFormData({ ...formData, confirm_password: value });
  };

  // 5. NIC - 9 digits + V (uppercase) OR 12 digits
  const handleNICChange = (e) => {
    let value = e.target.value.toUpperCase();
    value = value.replace(/[^0-9V]/g, '');
    if (value.length > 12) return;
    setFormData({ ...formData, nic_number: value });
  };

  // 6. Police Station - Letters, spaces, and hyphens only
  const handlePoliceStationChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z\s\-]/g, '');
    setFormData({ ...formData, police_station: value });
  };

  // Generic change handler for other fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Category toggle - MAX 2
  const handleCategoryToggle = (categoryId) => {
    let newCategories;
    if (formData.categories.includes(categoryId)) {
      newCategories = formData.categories.filter(id => id !== categoryId);
    } else if (formData.categories.length < 2) {
      newCategories = [...formData.categories, categoryId];
    } else {
      setError('You can select up to 2 categories only');
      setTimeout(() => setError(''), 3000);
      return;
    }
    setFormData({ ...formData, categories: newCategories });
  };

  const handleServiceAreaToggle = (districtName) => {
    let newAreas;
    if (formData.service_areas.includes(districtName)) {
      newAreas = formData.service_areas.filter(d => d !== districtName);
    } else {
      newAreas = [...formData.service_areas, districtName];
    }
    setFormData({ ...formData, service_areas: newAreas });
  };

  const handleFileChange = (type, file) => {
    if (file) {
      setSelectedFiles({ ...selectedFiles, [type]: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreviews({ ...filePreviews, [type]: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePoliceReportUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('File size exceeds 5MB limit');
        return;
      }
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        setError('Only JPG, PNG, and PDF files are allowed');
        return;
      }
      handleFileChange('police_report', file);
      setError('');
    }
  };

  // ===== UPDATED VALIDATION FUNCTIONS (Match AuthController) =====
  
  const validateStep1 = () => {
    // 1. Full Name - Letters and spaces only (2-50 chars)
    const nameRegex = /^[a-zA-Z\s]{2,50}$/;
    if (!nameRegex.test(formData.full_name.trim())) {
      setError('Name can only contain letters and spaces (min 2 characters)');
      return false;
    }

    // 2. Email - Valid email structure
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address ');
      return false;
    }

    // 3. Phone - Exactly 10 digits
    if (!formData.phone || formData.phone.length !== 10) {
      setError('Phone number must be exactly 10 digits');
      return false;
    }

    // 4. Password - Min 6 chars, no spaces
    if (!formData.password || formData.password.length < 6 || /\s/.test(formData.password)) {
      setError('Password must be at least 6 characters (no spaces allowed)');
      return false;
    }

    // 5. Confirm Password
    if (formData.password !== formData.confirm_password) {
      setError('Passwords do not match');
      return false;
    }

    // 6. District - Required
    if (!formData.district) {
      setError('Please select your district');
      return false;
    }

    // 7. Categories - At least 1, max 2
    if (formData.categories.length === 0) {
      setError('Please select at least one service category');
      return false;
    }
    if (formData.categories.length > 2) {
      setError('You can select up to 2 categories only');
      return false;
    }

    // 8. Service Areas - At least 1
    if (formData.service_areas.length === 0) {
      setError('Please select at least one service area');
      return false;
    }

    return true;
  };

  const validateStep2 = () => {
    // 1. NIC - 9 digits + V OR 12 digits
    const nicRegex = /^[0-9]{9}V$|^[0-9]{12}$/;
    if (!nicRegex.test(formData.nic_number.toUpperCase())) {
      setError('NIC must be 9 digits + V (e.g., 123456789V) or 12 digits');
      return false;
    }

    // 2. Police Station - Letters, spaces, hyphens only (2-50 chars)
    const stationRegex = /^[a-zA-Z\s\-]{2,50}$/;
    if (!stationRegex.test(formData.police_station.trim())) {
      setError('Police station can only contain letters, spaces, and hyphens');
      return false;
    }

    // 3. Police Report Date - Required
    if (!formData.police_report_date) {
      setError('Police report date is required');
      return false;
    }

    // 4. Files - All required
    if (!selectedFiles.selfie) {
      setError('Please upload a face photo');
      return false;
    }
    if (!selectedFiles.nic_front) {
      setError('Please upload NIC front side');
      return false;
    }
    if (!selectedFiles.nic_back) {
      setError('Please upload NIC back side');
      return false;
    }
    if (!selectedFiles.police_report) {
      setError('Please upload police report');
      return false;
    }

    return true;
  };

  const uploadDocument = async (docType, file, token) => {
    const formDataObj = new FormData();
    formDataObj.append('document', file);
    formDataObj.append('doc_type', docType);
    
    const response = await fetch('http://localhost:5000/api/worker/upload-document', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formDataObj
    });
    return response.json();
  };

  const handleStep1Submit = (e) => {
    e.preventDefault();
    setError('');
    if (validateStep1()) {
      setStep(2);
      window.scrollTo(0, 0);
    }
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!validateStep2()) return;
    if (!acceptTerms) {
      setError('Please accept the Terms and Conditions');
      return;
    }
    
    setLoading(true);
    
    try {
      const categoryNames = formData.categories.map((id) => {
        const cat = categories.find((c) => c.id === id);
        return cat ? cat.name : String(id);
      });

      const registerResponse = await fetch('http://localhost:5000/api/auth/provider/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: formData.full_name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          district: formData.district,
          categories: categoryNames,
          service_areas: formData.service_areas,
          nic_number: formData.nic_number,
          police_station: formData.police_station,
          police_report_date: formData.police_report_date
        })
      });
      
      const registerData = await registerResponse.json();
      
      if (!registerResponse.ok) {
        setError(registerData.message || 'Registration failed');
        setLoading(false);
        return;
      }
      
      const authToken = registerData.token;

      await fetch('http://localhost:5000/api/worker/update-details', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
          nic_number: formData.nic_number,
          police_station: formData.police_station,
          police_report_date: formData.police_report_date
        })
      });
      
      const uploadPromises = [];
      for (const [type, file] of Object.entries(selectedFiles)) {
        if (file) {
          uploadPromises.push(uploadDocument(type, file, authToken));
        }
      }
      
      await Promise.all(uploadPromises);
      
      setSuccess('Application submitted successfully! Pending verification.');
      setTimeout(() => {
        login(authToken, registerData.user, '/auth/pending');
      }, 2000);
      
    } catch (err) {
      console.error('Submission error:', err);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 font-sans relative overflow-x-hidden">
      
      {/* ===== TOAST NOTIFICATIONS ===== */}
      <CenteredToast show={Boolean(error)} type="error" message={error} onClose={() => setError('')} />
      <CenteredToast show={Boolean(success)} type="success" message={success} onClose={() => setSuccess('')} />

      {/* ===== HEADER ===== */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-outline-variant shadow-sm h-16">
        <div className="flex justify-between items-center px-4 md:px-8 h-full max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <Link to="/" className="text-xl font-black tracking-tighter text-primary">HomeHero</Link>
            <div className="h-6 w-px bg-outline-variant mx-2 hidden sm:block"></div>
            <span className="text-sm font-medium text-on-surface-variant hidden sm:block">Provider Registration</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-on-surface-variant hidden md:inline">
              Step {step}/2
            </span>
            <Link to="/login" className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors">
              Login
            </Link>
          </div>
        </div>
      </header>

      {/* ===== MAIN CONTENT ===== */}
      <main className="flex-grow pt-20 pb-12 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          
          {/* ===== PROGRESS STEPS ===== */}
          <div className="flex items-center justify-center mb-10 gap-4 md:gap-8">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                step >= 1 
                  ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/25' 
                  : 'bg-slate-200 text-slate-500'
              }`}>
                1
              </div>
              <div className="hidden sm:block">
                <p className={`text-xs font-bold uppercase tracking-wider ${step >= 1 ? 'text-emerald-600' : 'text-slate-400'}`}>
                  Basic Info
                </p>
              </div>
            </div>
            
            <div className={`flex-1 max-w-[60px] h-0.5 transition-all duration-300 ${
              step >= 2 ? 'bg-gradient-to-r from-emerald-500 to-emerald-600' : 'bg-slate-200'
            }`}></div>
            
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                step >= 2 
                  ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/25' 
                  : 'bg-slate-200 text-slate-500'
              }`}>
                2
              </div>
              <div className="hidden sm:block">
                <p className={`text-xs font-bold uppercase tracking-wider ${step >= 2 ? 'text-emerald-600' : 'text-slate-400'}`}>
                  Verification
                </p>
              </div>
            </div>
          </div>

          {/* ===== STEP 1 - BASIC INFORMATION ===== */}
          {step === 1 && (
            <div className="bg-white rounded-3xl shadow-xl border border-surface-container p-6 md:p-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-emerald-600 text-2xl">person_add</span>
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-on-surface">Basic Information</h2>
                  <p className="text-on-surface-variant text-sm">Tell us about yourself and your services</p>
                </div>
              </div>

              <form onSubmit={handleStep1Submit} className="space-y-5">
                {/* Full Name - Letters and spaces only */}
                <div className="group">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1.5">
                    Full Name *
                  </label>
                  <div className={`relative rounded-xl border-2 transition-all duration-200 ${
                    focused.full_name ? 'border-emerald-500 shadow-lg shadow-emerald-100' : 'border-slate-200 hover:border-emerald-300'
                  }`}>
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                      <span className="material-symbols-outlined text-xl">person</span>
                    </span>
                    <input 
                      type="text" 
                      name="full_name" 
                      value={formData.full_name} 
                      onChange={handleNameChange}
                      onFocus={() => handleFocus('full_name')}
                      onBlur={() => handleBlur('full_name')}
                      className="w-full pl-12 pr-4 py-3.5 bg-transparent rounded-xl outline-none text-slate-800 placeholder:text-slate-400" 
                      placeholder=""
                      required 
                    />
                  </div>
                  <p className="text-xs text-slate-400 mt-1"> </p>
                </div>

                {/* Email & Phone Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Email - Valid structure */}
                  <div className="group">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1.5">
                      Email Address *
                    </label>
                    <div className={`relative rounded-xl border-2 transition-all duration-200 ${
                      focused.email ? 'border-emerald-500 shadow-lg shadow-emerald-100' : 'border-slate-200 hover:border-emerald-300'
                    }`}>
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                        <span className="material-symbols-outlined text-xl">email</span>
                      </span>
                      <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleEmailChange}
                        onFocus={() => handleFocus('email')}
                        onBlur={() => handleBlur('email')}
                        className="w-full pl-12 pr-4 py-3.5 bg-transparent rounded-xl outline-none text-slate-800 placeholder:text-slate-400 lowercase" 
                        placeholder=""
                        required 
                      />
                    </div>
                    <p className="text-xs text-slate-400 mt-1"> </p>
                  </div>

                  {/* Phone - 10 digits only */}
                  <div className="group">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1.5">
                      Phone Number *
                    </label>
                    <div className={`relative rounded-xl border-2 transition-all duration-200 ${
                      focused.phone ? 'border-emerald-500 shadow-lg shadow-emerald-100' : 'border-slate-200 hover:border-emerald-300'
                    }`}>
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                        <span className="material-symbols-outlined text-xl">phone</span>
                      </span>
                      <input 
                        type="tel" 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handlePhoneChange}
                        onFocus={() => handleFocus('phone')}
                        onBlur={() => handleBlur('phone')}
                        className="w-full pl-12 pr-4 py-3.5 bg-transparent rounded-xl outline-none text-slate-800 placeholder:text-slate-400" 
                        placeholder=""
                        maxLength="10"
                        required 
                      />
                    </div>
                    <p className="text-xs text-slate-400 mt-1"></p>
                  </div>
                </div>

                {/* Password & Confirm Password Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Password - No spaces */}
                  <div className="group">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1.5">
                      Create Password *
                    </label>
                    <div className={`relative rounded-xl border-2 transition-all duration-200 ${
                      focused.password ? 'border-emerald-500 shadow-lg shadow-emerald-100' : 'border-slate-200 hover:border-emerald-300'
                    }`}>
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                        <span className="material-symbols-outlined text-xl">lock</span>
                      </span>
                      <input 
                        type={showPassword ? "text" : "password"} 
                        name="password" 
                        value={formData.password} 
                        onChange={handlePasswordChange}
                        onFocus={() => handleFocus('password')}
                        onBlur={() => handleBlur('password')}
                        className="w-full pl-12 pr-12 py-3.5 bg-transparent rounded-xl outline-none text-slate-800 placeholder:text-slate-400" 
                        placeholder="Min 6 characters (no spaces)"
                        required 
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowPassword(!showPassword)} 
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        <span className="material-symbols-outlined text-xl">{showPassword ? 'visibility_off' : 'visibility'}</span>
                      </button>
                    </div>
                    {formData.password && (
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex-1 h-1 bg-slate-200 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full transition-all duration-500 ${
                            formData.password.length < 4 ? 'w-1/3 bg-red-500' :
                            formData.password.length < 8 ? 'w-2/3 bg-yellow-500' :
                            'w-full bg-emerald-500'
                          }`} />
                        </div>
                        <span className={`text-xs font-medium ${
                          formData.password.length < 4 ? 'text-red-500' :
                          formData.password.length < 8 ? 'text-yellow-500' :
                          'text-emerald-500'
                        }`}>
                          {formData.password.length < 4 ? 'Weak' :
                           formData.password.length < 8 ? 'Medium' :
                           'Strong'}
                        </span>
                      </div>
                    )}
                    <p className="text-xs text-slate-400 mt-1">No spaces allowed</p>
                  </div>

                  {/* Confirm Password - No spaces */}
                  <div className="group">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1.5">
                      Confirm Password *
                    </label>
                    <div className={`relative rounded-xl border-2 transition-all duration-200 ${
                      focused.confirm_password ? 'border-emerald-500 shadow-lg shadow-emerald-100' : 'border-slate-200 hover:border-emerald-300'
                    } ${formData.confirm_password && formData.password !== formData.confirm_password ? 'border-red-400' : ''}`}>
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                        <span className="material-symbols-outlined text-xl">lock</span>
                      </span>
                      <input 
                        type={showConfirmPassword ? "text" : "password"} 
                        name="confirm_password" 
                        value={formData.confirm_password} 
                        onChange={handleConfirmPasswordChange}
                        onFocus={() => handleFocus('confirm_password')}
                        onBlur={() => handleBlur('confirm_password')}
                        className="w-full pl-12 pr-12 py-3.5 bg-transparent rounded-xl outline-none text-slate-800 placeholder:text-slate-400" 
                        placeholder="Confirm your password"
                        required 
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        <span className="material-symbols-outlined text-xl">{showConfirmPassword ? 'visibility_off' : 'visibility'}</span>
                      </button>
                    </div>
                    {formData.confirm_password && formData.password !== formData.confirm_password && (
                      <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">error</span>
                        Passwords do not match
                      </p>
                    )}
                  </div>
                </div>

                {/* District */}
                <div className="group">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1.5">
                    District *
                  </label>
                  <div className={`relative rounded-xl border-2 transition-all duration-200 ${
                    focused.district ? 'border-emerald-500 shadow-lg shadow-emerald-100' : 'border-slate-200 hover:border-emerald-300'
                  }`}>
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                      <span className="material-symbols-outlined text-xl">location_city</span>
                    </span>
                    <select 
                      name="district" 
                      value={formData.district} 
                      onChange={handleChange}
                      onFocus={() => handleFocus('district')}
                      onBlur={() => handleBlur('district')}
                      className="w-full pl-12 pr-4 py-3.5 bg-transparent rounded-xl outline-none text-slate-800 appearance-none" 
                      required
                    >
                      <option value="">Select District</option>
                      {districts.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                    </select>
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                      <span className="material-symbols-outlined text-xl">expand_more</span>
                    </span>
                  </div>
                </div>

                {/* Service Categories */}
                <div className="group">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-2">
                    Service Categories (Select up to 2) *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {categories.map(cat => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => handleCategoryToggle(cat.id)}
                        className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                          formData.categories.includes(cat.id) 
                            ? 'border-emerald-500 bg-emerald-50 shadow-lg shadow-emerald-100' 
                            : 'border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{cat.icon || '🔧'}</span>
                          <div>
                            <div className="font-semibold text-slate-800">{cat.name}</div>
                            <div className="text-xs text-slate-500">{cat.description}</div>
                          </div>
                          {formData.categories.includes(cat.id) && (
                            <span className="ml-auto text-emerald-500">
                              <span className="material-symbols-outlined text-xl">check_circle</span>
                            </span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-slate-500 mt-2">Selected: {formData.categories.length}/2 categories</p>
                </div>

                {/* Service Areas */}
                <div className="group">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-2">
                    Service Areas (Districts you serve) *
                  </label>
                  <div className="flex flex-wrap gap-2 p-4 border-2 border-slate-200 rounded-xl max-h-48 overflow-y-auto">
                    {districts.map(d => (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => handleServiceAreaToggle(d.name)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                          formData.service_areas.includes(d.name) 
                            ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/25' 
                            : 'bg-slate-100 text-slate-600 hover:bg-emerald-100 hover:text-emerald-700'
                        }`}
                      >
                        {d.name}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-slate-500 mt-2">Selected: {formData.service_areas.length} districts</p>
                </div>

                <button 
                  type="submit" 
                  className="w-full py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold rounded-2xl transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 flex items-center justify-center gap-2 text-base"
                >
                  <span className="material-symbols-outlined text-xl">arrow_forward</span>
                  Continue to Verification
                </button>
              </form>
            </div>
          )}

          {/* ===== STEP 2 - VERIFICATION DOCUMENTS ===== */}
          {step === 2 && (
            <div className="bg-white rounded-3xl shadow-xl border border-surface-container p-6 md:p-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-emerald-600 text-2xl">verified</span>
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-on-surface">Verification Documents</h2>
                  <p className="text-on-surface-variant text-sm">Upload required documents for verification</p>
                </div>
              </div>

              <form onSubmit={handleFinalSubmit} className="space-y-6">
                {/* Face Photo */}
                <div className="group">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1.5">
                    Face Photo (Clear Selfie) *
                  </label>
                  <div 
                    className={`relative rounded-xl border-2 border-dashed transition-all duration-200 p-8 text-center cursor-pointer ${
                      filePreviews.selfie 
                        ? 'border-emerald-500 bg-emerald-50/50' 
                        : 'border-slate-300 hover:border-emerald-400 hover:bg-emerald-50/30'
                    }`}
                    onClick={() => document.getElementById('selfieInput').click()}
                  >
                    {filePreviews.selfie ? (
                      <div className="flex flex-col items-center">
                        <img src={filePreviews.selfie} alt="Selfie" className="w-32 h-32 rounded-full object-cover border-4 border-emerald-200" />
                        <p className="text-sm text-emerald-600 mt-3 font-medium">✅ Photo uploaded</p>
                      </div>
                    ) : (
                      <div>
                        <div className="text-5xl mb-3">📸</div>
                        <p className="font-semibold text-slate-700">Click to upload your photo</p>
                        <p className="text-sm text-slate-500">Upload a clear selfie for identity verification</p>
                      </div>
                    )}
                    <input 
                      id="selfieInput" 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={(e) => handleFileChange('selfie', e.target.files[0])} 
                    />
                  </div>
                </div>

                {/* NIC Uploads */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="group">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1.5">
                      NIC - Front Side *
                    </label>
                    <div 
                      className={`relative rounded-xl border-2 border-dashed transition-all duration-200 p-6 text-center cursor-pointer ${
                        filePreviews.nic_front 
                          ? 'border-emerald-500 bg-emerald-50/50' 
                          : 'border-slate-300 hover:border-emerald-400 hover:bg-emerald-50/30'
                      }`}
                      onClick={() => document.getElementById('nicFrontInput').click()}
                    >
                      {filePreviews.nic_front ? (
                        <div>
                          <img src={filePreviews.nic_front} alt="NIC Front" className="max-h-24 mx-auto object-contain" />
                          <p className="text-sm text-emerald-600 mt-2 font-medium">✅ Uploaded</p>
                        </div>
                      ) : (
                        <div>
                          <div className="text-3xl mb-1">🪪</div>
                          <p className="font-medium text-slate-700">Upload Front</p>
                        </div>
                      )}
                      <input id="nicFrontInput" type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange('nic_front', e.target.files[0])} />
                    </div>
                  </div>

                  <div className="group">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1.5">
                      NIC - Back Side *
                    </label>
                    <div 
                      className={`relative rounded-xl border-2 border-dashed transition-all duration-200 p-6 text-center cursor-pointer ${
                        filePreviews.nic_back 
                          ? 'border-emerald-500 bg-emerald-50/50' 
                          : 'border-slate-300 hover:border-emerald-400 hover:bg-emerald-50/30'
                      }`}
                      onClick={() => document.getElementById('nicBackInput').click()}
                    >
                      {filePreviews.nic_back ? (
                        <div>
                          <img src={filePreviews.nic_back} alt="NIC Back" className="max-h-24 mx-auto object-contain" />
                          <p className="text-sm text-emerald-600 mt-2 font-medium">✅ Uploaded</p>
                        </div>
                      ) : (
                        <div>
                          <div className="text-3xl mb-1">🪪</div>
                          <p className="font-medium text-slate-700">Upload Back</p>
                        </div>
                      )}
                      <input id="nicBackInput" type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange('nic_back', e.target.files[0])} />
                    </div>
                  </div>
                </div>

                {/* Police Report */}
                <div className="group">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1.5">
                    Police Report * (PDF or Image)
                  </label>
                  <div 
                    className={`relative rounded-xl border-2 border-dashed transition-all duration-200 p-6 text-center cursor-pointer ${
                      filePreviews.police_report 
                        ? 'border-emerald-500 bg-emerald-50/50' 
                        : 'border-slate-300 hover:border-emerald-400 hover:bg-emerald-50/30'
                    }`}
                    onClick={() => document.getElementById('policeReportInput').click()}
                  >
                    {filePreviews.police_report ? (
                      <div>
                        <div className="text-4xl mb-2">📄</div>
                        <p className="font-semibold text-emerald-600">
                          📎 {selectedFiles.police_report?.name || 'File uploaded'}
                        </p>
                        <p className="text-xs text-slate-500">
                          {(selectedFiles.police_report?.size / 1024).toFixed(2)} KB
                        </p>
                        <button 
                          type="button" 
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedFiles({...selectedFiles, police_report: null});
                            setFilePreviews({...filePreviews, police_report: null});
                          }}
                          className="mt-2 px-4 py-1.5 bg-red-100 text-red-600 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
                        >
                          Remove File
                        </button>
                      </div>
                    ) : (
                      <div>
                        <div className="text-5xl mb-3">📋</div>
                        <p className="font-semibold text-slate-700">Click to upload Police Report</p>
                        <p className="text-sm text-slate-500">PDF or Image (Max 5MB)</p>
                      </div>
                    )}
                    <input 
                      id="policeReportInput" 
                      type="file" 
                      accept=".pdf,image/*" 
                      className="hidden" 
                      onChange={handlePoliceReportUpload} 
                    />
                  </div>
                  {filePreviews.police_report && (
                    <p className="text-xs text-emerald-600 mt-1.5 flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">check_circle</span>
                      File uploaded successfully
                    </p>
                  )}
                </div>

                {/* NIC Number - 9 digits + V OR 12 digits */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="group">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1.5">
                      NIC Number *
                    </label>
                    <div className={`relative rounded-xl border-2 transition-all duration-200 ${
                      focused.nic_number ? 'border-emerald-500 shadow-lg shadow-emerald-100' : 'border-slate-200 hover:border-emerald-300'
                    }`}>
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                        <span className="material-symbols-outlined text-xl">badge</span>
                      </span>
                      <input 
                        type="text" 
                        name="nic_number" 
                        value={formData.nic_number} 
                        onChange={handleNICChange}
                        onFocus={() => handleFocus('nic_number')}
                        onBlur={() => handleBlur('nic_number')}
                        className="w-full pl-12 pr-4 py-3.5 bg-transparent rounded-xl outline-none text-slate-800 placeholder:text-slate-400 uppercase" 
                        placeholder="123456789V"
                        maxLength="12"
                        required 
                      />
                    </div>
                    <p className="text-xs text-slate-400 mt-1"></p>
                  </div>

                  {/* Police Station - Letters, spaces, hyphens only */}
                  <div className="group">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1.5">
                      Police Station *
                    </label>
                    <div className={`relative rounded-xl border-2 transition-all duration-200 ${
                      focused.police_station ? 'border-emerald-500 shadow-lg shadow-emerald-100' : 'border-slate-200 hover:border-emerald-300'
                    }`}>
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                        <span className="material-symbols-outlined text-xl">location_on</span>
                      </span>
                      <input 
                        type="text" 
                        name="police_station" 
                        value={formData.police_station} 
                        onChange={handlePoliceStationChange}
                        onFocus={() => handleFocus('police_station')}
                        onBlur={() => handleBlur('police_station')}
                        className="w-full pl-12 pr-4 py-3.5 bg-transparent rounded-xl outline-none text-slate-800 placeholder:text-slate-400" 
                        placeholder="Colombo Central"
                        required 
                      />
                    </div>
                    <p className="text-xs text-slate-400 mt-1"></p>
                  </div>
                </div>

                <div className="group">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1.5">
                    Police Report Date *
                  </label>
                  <div className={`relative rounded-xl border-2 transition-all duration-200 ${
                    focused.police_report_date ? 'border-emerald-500 shadow-lg shadow-emerald-100' : 'border-slate-200 hover:border-emerald-300'
                  }`}>
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                      <span className="material-symbols-outlined text-xl">calendar_today</span>
                    </span>
                    <input 
                      type="date" 
                      name="police_report_date" 
                      value={formData.police_report_date} 
                      onChange={handleChange}
                      onFocus={() => handleFocus('police_report_date')}
                      onBlur={() => handleBlur('police_report_date')}
                      className="w-full pl-12 pr-4 py-3.5 bg-transparent rounded-xl outline-none text-slate-800" 
                      required 
                    />
                  </div>
                </div>

                {/* Terms */}
                <div className="flex items-start gap-3 pt-2">
                  <input 
                    type="checkbox" 
                    id="termsCheckbox" 
                    className="mt-1 w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)} 
                  />
                  <label htmlFor="termsCheckbox" className="text-xs text-slate-500 leading-relaxed">
                    I confirm that all information provided is accurate and complete. I understand that providing false information may result in account rejection or permanent ban.
                  </label>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <button 
                    type="button" 
                    onClick={() => { setStep(1); window.scrollTo(0, 0); }} 
                    className="flex-1 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-xl">arrow_back</span>
                    Back
                  </button>
                  <button 
                    type="submit" 
                    disabled={loading} 
                    className="flex-1 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold rounded-2xl transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-xl">how_to_reg</span>
                        Submit Application
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default WorkerRegister;