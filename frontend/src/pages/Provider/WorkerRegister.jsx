import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/AuthContext';

const WorkerRegister = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  
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

  // Name validation - Letters only (no numbers)
  const handleNameChange = (e) => {
    const value = e.target.value.replace(/[0-9]/g, '');
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleChange = (e) => {
    if (e.target.name === 'full_name') {
      handleNameChange(e);
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    }
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

  // Police Report File Upload with Name Display
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

  const validateStep1 = () => {
    // Name validation - Letters only
    const nameRegex = /^[a-zA-Z\s]{2,50}$/;
    if (!nameRegex.test(formData.full_name.trim())) {
      setError('Name can only contain letters (no numbers)');
      return false;
    }
    if (!formData.full_name.trim()) {
      setError('Full name is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Invalid email format');
      return false;
    }
    if (!formData.phone.trim()) {
      setError('Phone number is required');
      return false;
    }
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      setError('Phone number must be 10 digits');
      return false;
    }
    if (!formData.password) {
      setError('Password is required');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    if (formData.password !== formData.confirm_password) {
      setError('Passwords do not match');
      return false;
    }
    if (!formData.district) {
      setError('Please select your district');
      return false;
    }
    if (formData.categories.length === 0) {
      setError('Please select at least one service category');
      return false;
    }
    if (formData.service_areas.length === 0) {
      setError('Please select at least one service area');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.nic_number) {
      setError('NIC number is required');
      return false;
    }
    if (!formData.police_station) {
      setError('Police station is required');
      return false;
    }
    if (!formData.police_report_date) {
      setError('Police report date is required');
      return false;
    }
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

      // Update worker details
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
      
      // Step 4: Upload documents
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
    <div style={{ minHeight: '100vh', backgroundColor: '#f7f9fb' }}>
      {/* Header */}
      <div style={{
        backgroundColor: 'white',
        padding: '16px 24px',
        borderBottom: '1px solid #e2e8f0',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" style={{ fontSize: '20px', fontWeight: 'bold', color: '#059669' }}>HomeHero</Link>
          <Link to="/login" style={{ color: '#475569', textDecoration: 'none' }}>Login</Link>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>
        {/* Progress Steps */}
        <div style={{ display: 'flex', marginBottom: '40px', justifyContent: 'center' }}>
          <div style={{ flex: 1, textAlign: 'center', maxWidth: '200px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              margin: '0 auto',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              backgroundColor: step >= 1 ? '#059669' : '#e5e7eb',
              color: step >= 1 ? 'white' : '#9ca3af'
            }}>1</div>
            <p style={{ fontSize: '14px', marginTop: '8px', fontWeight: step >= 1 ? 600 : 400, color: step >= 1 ? '#059669' : '#6b7280' }}>Basic Info</p>
          </div>
          <div style={{ flex: 1, textAlign: 'center', maxWidth: '200px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              margin: '0 auto',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              backgroundColor: step >= 2 ? '#059669' : '#e5e7eb',
              color: step >= 2 ? 'white' : '#9ca3af'
            }}>2</div>
            <p style={{ fontSize: '14px', marginTop: '8px', fontWeight: step >= 2 ? 600 : 400, color: step >= 2 ? '#059669' : '#6b7280' }}>Verification</p>
          </div>
        </div>

        {error && (
          <div style={{ marginBottom: '20px', padding: '12px', backgroundColor: '#fee2e2', border: '1px solid #fecaca', borderRadius: '8px', color: '#dc2626', fontSize: '14px' }}>
            {error}
          </div>
        )}

        {success && (
          <div style={{ marginBottom: '20px', padding: '12px', backgroundColor: '#dcfce7', border: '1px solid #bbf7d0', borderRadius: '8px', color: '#059669', fontSize: '14px' }}>
            {success}
          </div>
        )}

        {/* Step 1 - Basic Information */}
        {step === 1 && (
          <form onSubmit={handleStep1Submit} style={{ backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px', color: '#1e293b' }}>Basic Information</h2>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#334155', marginBottom: '8px' }}>Full Name *</label>
              <input 
                type="text" 
                name="full_name" 
                value={formData.full_name} 
                onChange={handleChange} 
                style={{ width: '100%', padding: '12px 16px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '16px' }} 
                placeholder="John Doe" 
                required 
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#334155', marginBottom: '8px' }}>Email Address *</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} style={{ width: '100%', padding: '12px 16px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '16px' }} placeholder="john@example.com" required />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#334155', marginBottom: '8px' }}>Phone Number *</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} style={{ width: '100%', padding: '12px 16px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '16px' }} placeholder="0771234567" required />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#334155', marginBottom: '8px' }}>Password *</label>
                <div style={{ position: 'relative' }}>
                  <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} style={{ width: '100%', padding: '12px 16px', border: '1px solid #d1d5db', borderRadius: '8px', paddingRight: '48px' }} placeholder="Min 6 characters" required />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px' }}>
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#334155', marginBottom: '8px' }}>Confirm Password *</label>
                <input type="password" name="confirm_password" value={formData.confirm_password} onChange={handleChange} style={{ width: '100%', padding: '12px 16px', border: '1px solid #d1d5db', borderRadius: '8px' }} placeholder="Confirm password" required />
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#334155', marginBottom: '8px' }}>District *</label>
              <select name="district" value={formData.district} onChange={handleChange} style={{ width: '100%', padding: '12px 16px', border: '1px solid #d1d5db', borderRadius: '8px', backgroundColor: 'white' }} required>
                <option value="">Select District</option>
                {districts.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
              </select>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#334155', marginBottom: '8px' }}>Service Categories (Select up to 2) *</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleCategoryToggle(cat.id)}
                    style={{
                      padding: '12px',
                      border: `2px solid ${formData.categories.includes(cat.id) ? '#059669' : '#e5e7eb'}`,
                      borderRadius: '8px',
                      backgroundColor: formData.categories.includes(cat.id) ? '#ecfdf5' : 'white',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s'
                    }}
                  >
                    <span style={{ fontSize: '24px', marginRight: '8px' }}>{cat.icon || '🔧'}</span>
                    <span style={{ fontWeight: 600 }}>{cat.name}</span>
                    <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>{cat.description}</p>
                  </button>
                ))}
              </div>
              <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '8px' }}>Selected: {formData.categories.length}/2 categories</p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#334155', marginBottom: '8px' }}>Service Areas (Districts you serve) *</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '8px', maxHeight: '200px', overflowY: 'auto', padding: '12px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
                {districts.map(d => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => handleServiceAreaToggle(d.name)}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '8px',
                      backgroundColor: formData.service_areas.includes(d.name) ? '#059669' : '#f3f4f6',
                      color: formData.service_areas.includes(d.name) ? 'white' : '#374151',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '14px',
                      transition: 'all 0.2s'
                    }}
                  >
                    {d.name}
                  </button>
                ))}
              </div>
              <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '8px' }}>Selected: {formData.service_areas.length} districts</p>
            </div>

            <button type="submit" style={{ width: '100%', padding: '14px', backgroundColor: '#059669', color: 'white', fontWeight: '600', border: 'none', borderRadius: '8px', fontSize: '16px', cursor: 'pointer' }}>
              Continue to Verification →
            </button>
          </form>
        )}

        {/* Step 2 - Verification Documents */}
        {step === 2 && (
          <form onSubmit={handleFinalSubmit} style={{ backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px', color: '#1e293b' }}>Verification Documents</h2>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#334155', marginBottom: '8px' }}>Face Photo (Clear Selfie) *</label>
              <div 
                style={{ border: '2px dashed #d1d5db', borderRadius: '12px', padding: '20px', textAlign: 'center', cursor: 'pointer', backgroundColor: '#f8fafc' }} 
                onClick={() => document.getElementById('selfieInput').click()}
              >
                {filePreviews.selfie ? (
                  <img src={filePreviews.selfie} alt="Selfie" style={{ width: '128px', height: '128px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto' }} />
                ) : (
                  <>
                    <div style={{ fontSize: '48px', marginBottom: '8px' }}>📸</div>
                    <p style={{ fontWeight: '600' }}>Click to upload your photo</p>
                    <p style={{ fontSize: '14px', color: '#6b7280' }}>Upload a clear selfie for identity verification</p>
                  </>
                )}
                <input id="selfieInput" type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleFileChange('selfie', e.target.files[0])} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#334155', marginBottom: '8px' }}>NIC - Front Side *</label>
                <div 
                  style={{ border: '2px dashed #d1d5db', borderRadius: '12px', padding: '20px', textAlign: 'center', cursor: 'pointer', backgroundColor: '#f8fafc' }} 
                  onClick={() => document.getElementById('nicFrontInput').click()}
                >
                  {filePreviews.nic_front ? (
                    <img src={filePreviews.nic_front} alt="NIC Front" style={{ maxWidth: '100%', maxHeight: '100px', objectFit: 'contain' }} />
                  ) : (
                    <div><div style={{ fontSize: '32px' }}>🪪</div><p>Upload Front</p></div>
                  )}
                  <input id="nicFrontInput" type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleFileChange('nic_front', e.target.files[0])} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#334155', marginBottom: '8px' }}>NIC - Back Side *</label>
                <div 
                  style={{ border: '2px dashed #d1d5db', borderRadius: '12px', padding: '20px', textAlign: 'center', cursor: 'pointer', backgroundColor: '#f8fafc' }} 
                  onClick={() => document.getElementById('nicBackInput').click()}
                >
                  {filePreviews.nic_back ? (
                    <img src={filePreviews.nic_back} alt="NIC Back" style={{ maxWidth: '100%', maxHeight: '100px', objectFit: 'contain' }} />
                  ) : (
                    <div><div style={{ fontSize: '32px' }}>🪪</div><p>Upload Back</p></div>
                  )}
                  <input id="nicBackInput" type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleFileChange('nic_back', e.target.files[0])} />
                </div>
              </div>
            </div>

            {/* Police Report with File Name Display */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#334155', marginBottom: '8px' }}>Police Report * (PDF or Image)</label>
              <div 
                style={{ border: '2px dashed #d1d5db', borderRadius: '12px', padding: '20px', textAlign: 'center', cursor: 'pointer', backgroundColor: '#f8fafc' }} 
                onClick={() => document.getElementById('policeReportInput').click()}
              >
                {filePreviews.police_report ? (
                  <div>
                    <div style={{ fontSize: '32px' }}>📄</div>
                    <p style={{ fontWeight: '600', color: '#059669' }}>
                      📎 {selectedFiles.police_report?.name || 'File uploaded'}
                    </p>
                    <p style={{ fontSize: '12px', color: '#6b7280' }}>
                      {(selectedFiles.police_report?.size / 1024).toFixed(2)} KB
                    </p>
                    <button 
                      type="button" 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFiles({...selectedFiles, police_report: null});
                        setFilePreviews({...filePreviews, police_report: null});
                      }}
                      style={{ 
                        marginTop: '8px', 
                        padding: '4px 12px', 
                        backgroundColor: '#fee2e2', 
                        color: '#dc2626',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Remove File
                    </button>
                  </div>
                ) : (
                  <div>
                    <div style={{ fontSize: '48px' }}>📋</div>
                    <p style={{ fontWeight: '600' }}>Click to upload Police Report</p>
                    <p style={{ fontSize: '12px', color: '#6b7280' }}>PDF or Image (Max 5MB)</p>
                  </div>
                )}
                <input 
                  id="policeReportInput" 
                  type="file" 
                  accept=".pdf,image/*" 
                  style={{ display: 'none' }} 
                  onChange={handlePoliceReportUpload}
                />
              </div>
              {filePreviews.police_report && (
                <p style={{ fontSize: '12px', color: '#059669', marginTop: '4px' }}>
                  ✅ File uploaded: {selectedFiles.police_report?.name}
                </p>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#334155', marginBottom: '8px' }}>NIC Number *</label>
                <input type="text" name="nic_number" value={formData.nic_number} onChange={handleChange} style={{ width: '100%', padding: '12px 16px', border: '1px solid #d1d5db', borderRadius: '8px' }} placeholder="123456789V" required />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#334155', marginBottom: '8px' }}>Police Station *</label>
                <input type="text" name="police_station" value={formData.police_station} onChange={handleChange} style={{ width: '100%', padding: '12px 16px', border: '1px solid #d1d5db', borderRadius: '8px' }} placeholder="e.g., Colombo Central" required />
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#334155', marginBottom: '8px' }}>Police Report Date *</label>
              <input type="date" name="police_report_date" value={formData.police_report_date} onChange={handleChange} style={{ width: '100%', padding: '12px 16px', border: '1px solid #d1d5db', borderRadius: '8px' }} required />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <input 
                  type="checkbox" 
                  id="termsCheckbox" 
                  style={{ marginTop: '4px' }} 
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)} 
                />
                <label htmlFor="termsCheckbox" style={{ fontSize: '14px', color: '#475569' }}>
                  I confirm that all information provided is accurate and complete. I understand that providing false information may result in account rejection or permanent ban.
                </label>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <button 
                type="button" 
                onClick={() => { setStep(1); window.scrollTo(0, 0); }} 
                style={{ flex: 1, padding: '14px', backgroundColor: '#e5e7eb', color: '#374151', fontWeight: '600', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
              >
                Back
              </button>
              <button 
                type="submit" 
                disabled={loading} 
                style={{ flex: 1, padding: '14px', backgroundColor: '#059669', color: 'white', fontWeight: '600', border: 'none', borderRadius: '8px', cursor: 'pointer', opacity: loading ? 0.5 : 1 }}
              >
                {loading ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default WorkerRegister;