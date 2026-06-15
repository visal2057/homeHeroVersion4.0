import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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


function App() {
  return (
    <Router>
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
        <Route path="/dashboard" element={<RegisteredHome />} />
        <Route path="/dashboard/account" element={<RegisteredHome />} />
        <Route path="/dashboard/notifications" element={<RegisteredHome />} />
        <Route path="/profile" element={<ClientProfileManagement />} />
        <Route path="/my-bookings" element={<MyBookingsScreen />} />
        <Route path="/explore" element={<CommonExplorePage />} />
        <Route path="/checkout" element={<CommonCheckout />} />
        <Route path="/payment-failed" element={<PaymentFailed />} />
        
        {/* Booking Routes */}
        <Route path="/booking/confirmed" element={<BookingConfirmed />} />
        <Route path="/booking/declined" element={<BookingDeclined />} />
        <Route path="/booking/request" element={<BookingRequest />} />
        
        {/* Provider Routes */}
        <Route path="/auth/sp-dashboard" element={<SPDashboard />} />
        
        {/* Admin Routes */}
        <Route path="/admin/system" element={<SystemAdminDashboard />} />
        <Route path="/admin/verify" element={<VerifyAdminDashboard />} />
        <Route path="/admin/bookings" element={<BookingManagement />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/announcements" element={<AdminAnnouncements />} />
      </Routes>
    </Router>
  );
}

export default App;