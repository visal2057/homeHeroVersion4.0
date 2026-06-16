import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext'; // Import our new core provider
import ProtectedRoute from './components/ProtectedRoute';

// Client Pages
import LandingPage from './pages/Client/LandingPage';
import LoginPage from './pages/Client/LoginPage';
import SignUpAs from './pages/Client/SignUpAs';
import CustomerRegister from './pages/Client/SignUp';
import WorkerRegister from './pages/Provider/WorkerRegister';
import RegisteredHome from './pages/Client/RegisteredHome';
import ClientProfileManagement from './pages/Client/ClientProfileManagement';
import MyBookingsScreen from './pages/Client/MyBookingsScreen';
import CommonCheckout from './pages/Client/CommonCheckout';
import CommonExplorePage from './pages/Client/CommonExplorePage';
import PaymentFailed from './pages/Client/PaymentFailed';
import ContactUs from './pages/Client/ContactUs';
import Careers from './pages/Client/Careers';
import WhoWeAreRegistered from './pages/Client/WhoWeAreRegistered';

// Authentication Pages
import OTPVerification from './pages/Auth/OTPVerification';
import PendingVerification from './pages/Auth/PendingVerification';
import ForgotPassword from './pages/Auth/ForgotPassword';
import ResetPassword from './pages/Auth/ResetPassword';
import EmailVerified from './pages/Auth/EmailVerified';

// Booking Pages
import BookingConfirmed from './pages/Booking/BookingConfirmed';
import BookingDeclined from './pages/Booking/BookingDeclined';
import BookingRequest from './pages/Booking/BookingRequest';

// Admin Pages
import SystemAdminDashboard from './pages/Admin/SystemAdminDashboard';
import VerifyAdminDashboard from './pages/Admin/VerifyAdminDashboard';
import BookingManagement from './pages/Admin/BookingManagement';
import UserManagement from './pages/Admin/UserManagement';
import AdminAnnouncements from './pages/Admin/AdminAnnouncements';
import SPDashboard from './pages/Provider/SPDashboard';
import Subscription from './pages/Provider/Subscription';

function App() {
  return (
    <Router>
      {/* 1. AuthProvider wraps everything inside the router context */}
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/about" element={<WhoWeAreRegistered />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/careers" element={<Careers />} />
          
          {/* Sign Up Routes */}
          <Route path="/auth/signup-as" element={<SignUpAs />} />
          <Route path="/auth/register" element={<CustomerRegister />} />
          <Route path="/auth/worker-register" element={<WorkerRegister />} />
          
          {/* Authentication Routes */}
          <Route path="/auth/verify-otp" element={<OTPVerification />} />
          <Route path="/auth/pending" element={<PendingVerification />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route path="/auth/reset-password" element={<ResetPassword />} />
          <Route path="/auth/email-verified" element={<EmailVerified />} />
          
          {/* Client Dashboard Routes */}
          <Route path="/dashboard" element={<ProtectedRoute requiredRole="customer"><RegisteredHome /></ProtectedRoute>} />
          <Route path="/dashboard/account" element={<ProtectedRoute requiredRole="customer"><RegisteredHome /></ProtectedRoute>} />
          <Route path="/dashboard/notifications" element={<ProtectedRoute requiredRole="customer"><RegisteredHome /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute requiredRole="customer"><ClientProfileManagement /></ProtectedRoute>} />
          <Route path="/my-bookings" element={<ProtectedRoute requiredRole="customer"><MyBookingsScreen /></ProtectedRoute>} />
          <Route path="/explore" element={<ProtectedRoute requiredRole="customer"><CommonExplorePage /></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute requiredRole="customer"><CommonCheckout /></ProtectedRoute>} />
          <Route path="/payment-failed" element={<ProtectedRoute requiredRole="customer"><PaymentFailed /></ProtectedRoute>} />
          
          {/* Booking Routes */}
          <Route path="/booking/confirmed" element={<ProtectedRoute requiredRole="customer"><BookingConfirmed /></ProtectedRoute>} />
          <Route path="/booking/declined" element={<ProtectedRoute requiredRole="customer"><BookingDeclined /></ProtectedRoute>} />
          <Route path="/booking/request" element={<ProtectedRoute requiredRole="customer"><BookingRequest /></ProtectedRoute>} />
          
          {/* Provider Routes (Standardized from allowRoles to optionally support multiple service provider roles) */}
          <Route path="/provider/dashboard" element={<ProtectedRoute allowRoles={['provider','service_provider']}><SPDashboard /></ProtectedRoute>} />
          <Route path="/provider/subscription" element={<ProtectedRoute allowRoles={['provider','service_provider']}><Subscription /></ProtectedRoute>} />
          
          {/* Admin Routes */}
          <Route path="/admin/system" element={<ProtectedRoute requiredRole="SYSTEM_ADMIN"><SystemAdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/verify" element={<ProtectedRoute requiredRole="VERIFICATION_ADMIN"><VerifyAdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/bookings" element={<ProtectedRoute requiredRole="SYSTEM_ADMIN"><BookingManagement /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute requiredRole="SYSTEM_ADMIN"><UserManagement /></ProtectedRoute>} />
          <Route path="/admin/announcements" element={<ProtectedRoute requiredRole="SYSTEM_ADMIN"><AdminAnnouncements /></ProtectedRoute>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;