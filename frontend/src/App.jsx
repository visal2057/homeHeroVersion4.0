import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// ===== CLIENT PAGES =====
import LandingPage from './pages/Client/LandingPage';
import LoginPage from './pages/Client/LoginPage';
import SignUpAs from './pages/Client/SignUpAs';
import CustomerRegister from './pages/Client/SignUp';
import RegisteredHome from './pages/Client/RegisteredHome';
import ClientProfileManagement from './pages/Client/ClientProfileManagement';
import MyBookingsScreen from './pages/Client/MyBookingsScreen';
import CommonCheckout from './pages/Client/CommonCheckout';
import ContactUs from './pages/Client/ContactUs';
import Careers from './pages/Client/Careers';
import WhoWeAreRegistered from './pages/Client/WhoWeAreRegistered';
import Information from './pages/Client/Information';


// ===== EXPLORE PAGES =====
import Gardening from './pages/Client/Explore/Gardening';
import Cleaning from './pages/Client/Explore/Cleaning';
import Petcare from './pages/Client/Explore/Petcare';
import ACRepair from './pages/Client/Explore/ACRepair';
import Handiwork from './pages/Client/Explore/Handiwork';

// ===== AUTHENTICATION PAGES =====
import OTPVerification from './pages/Auth/OTPVerification';
import PendingVerification from './pages/Auth/PendingVerification';
import ForgotPassword from './pages/Auth/ForgotPassword';
import ResetPassword from './pages/Auth/ResetPassword';
import EmailVerified from './pages/Auth/EmailVerified';

// ===== BOOKING PAGES =====
import BookingConfirmed from './pages/Booking/BookingConfirmed';
import BookingDeclined from './pages/Booking/BookingDeclined';
import BookingRequest from './pages/Booking/BookingRequest';

// ===== ADMIN PAGES =====
import SystemAdminDashboard from './pages/Admin/SystemAdminDashboard';
import VerifyAdminDashboard from './pages/Admin/VerifyAdminDashboard';
import BookingManagement from './pages/Admin/BookingManagement';
import UserManagement from './pages/Admin/UserManagement';
import AdminAnnouncements from './pages/Admin/AdminAnnouncements';

// ===== SERVICE PROVIDER PAGES =====
import SPProfile from './pages/Provider/SPProfile';
import SPDashboard from './pages/Provider/SPDashboard';
import Subscription from './pages/Provider/Subscription';
import WorkerRegister from './pages/Provider/WorkerRegister';
import CompletedJobs from './pages/Provider/CompletedJobs';
import JobsToDo from './pages/Provider/JobsToDo';
import Requests from './pages/Provider/Requests';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          
          {/* ============================================================
                PUBLIC ROUTES
                ============================================================ */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/about" element={<WhoWeAreRegistered />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/careers" element={<Careers />} />
          
          {/* ============================================================
                SIGN UP ROUTES
                ============================================================ */}
          <Route path="/auth/signup-as" element={<SignUpAs />} />
          <Route path="/auth/register" element={<CustomerRegister />} />
          <Route path="/auth/worker-register" element={<WorkerRegister />} />
          
          {/* ============================================================
                AUTHENTICATION ROUTES
                ============================================================ */}
          <Route path="/auth/verify-otp" element={<OTPVerification />} />
          <Route path="/auth/pending" element={<PendingVerification />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route path="/auth/reset-password" element={<ResetPassword />} />
          <Route path="/auth/email-verified" element={<EmailVerified />} />
          
          {/* ============================================================
                CLIENT DASHBOARD ROUTES
                ============================================================ */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute allowedRoles={['customer', 'client']}>
                <RegisteredHome />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard/account" 
            element={
              <ProtectedRoute allowedRoles={['customer', 'client']}>
                <RegisteredHome />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard/notifications" 
            element={
              <ProtectedRoute allowedRoles={['customer', 'client']}>
                <RegisteredHome />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute allowedRoles={['customer', 'client', 'provider', 'service_provider']}>
                <ClientProfileManagement />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/my-bookings" 
            element={
              <ProtectedRoute allowedRoles={['customer', 'client']}>
                <MyBookingsScreen />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/checkout" 
            element={
              <ProtectedRoute allowedRoles={['customer', 'client']}>
                <CommonCheckout />
              </ProtectedRoute>
            } 
          />
          <Route path="/information" element={<Information />} />
          
          {/* ============================================================
                EXPLORE ROUTES
                ============================================================ */}
          <Route 
            path="/explore/gardening" 
            element={
              <ProtectedRoute allowedRoles={['customer', 'client', 'provider', 'service_provider']}>
                <Gardening />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/explore/cleaning" 
            element={
              <ProtectedRoute allowedRoles={['customer', 'client', 'provider', 'service_provider']}>
                <Cleaning />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/explore/petcare" 
            element={
              <ProtectedRoute allowedRoles={['customer', 'client', 'provider', 'service_provider']}>
                <Petcare />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/explore/ac-repair" 
            element={
              <ProtectedRoute allowedRoles={['customer', 'client', 'provider', 'service_provider']}>
                <ACRepair />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/explore/handiwork" 
            element={
              <ProtectedRoute allowedRoles={['customer', 'client', 'provider', 'service_provider']}>
                <Handiwork />
              </ProtectedRoute>
            } 
          />
          
          {/* ============================================================
                BOOKING ROUTES
                ============================================================ */}
          <Route 
            path="/booking/confirmed" 
            element={
              <ProtectedRoute allowedRoles={['customer', 'client', 'provider', 'service_provider']}>
                <BookingConfirmed />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/booking/declined" 
            element={
              <ProtectedRoute allowedRoles={['customer', 'client', 'provider', 'service_provider']}>
                <BookingDeclined />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/booking/request" 
            element={
              <ProtectedRoute allowedRoles={['customer', 'client', 'provider', 'service_provider']}>
                <BookingRequest />
              </ProtectedRoute>
            } 
          />
          
          {/* ============================================================
                SERVICE PROVIDER ROUTES
                ============================================================ */}
          <Route 
            path="/provider/dashboard" 
            element={
              <ProtectedRoute allowedRoles={['provider', 'service_provider']}>
                <SPDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/provider/subscription" 
            element={
              <ProtectedRoute allowedRoles={['provider', 'service_provider']}>
                <Subscription />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/sprofile" 
            element={
              <ProtectedRoute allowedRoles={['provider', 'service_provider']}>
                <SPProfile />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/provider/completed" 
            element={
              <ProtectedRoute allowedRoles={['provider', 'service_provider']}>
                <CompletedJobs />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/provider/jobs" 
            element={
              <ProtectedRoute allowedRoles={['provider', 'service_provider']}>
                <JobsToDo />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/provider/requests" 
            element={
              <ProtectedRoute allowedRoles={['provider', 'service_provider']}>
                <Requests />
              </ProtectedRoute>
            } 
          />
          
          {/* ============================================================
                ADMIN ROUTES
                ============================================================ */}
          <Route 
            path="/admin/system" 
            element={
              <ProtectedRoute requiredRole="SYSTEM_ADMIN">
                <SystemAdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/verify" 
            element={
              <ProtectedRoute requiredRole="VERIFICATION_ADMIN">
                <VerifyAdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/bookings" 
            element={
              <ProtectedRoute requiredRole="SYSTEM_ADMIN">
                <BookingManagement />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/users" 
            element={
              <ProtectedRoute requiredRole="SYSTEM_ADMIN">
                <UserManagement />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/announcements" 
            element={
              <ProtectedRoute requiredRole="SYSTEM_ADMIN">
                <AdminAnnouncements />
              </ProtectedRoute>
            } 
          />
          
          {/* ============================================================
                404 NOT FOUND - Fallback Route
                ============================================================ */}
          <Route path="*" element={<LandingPage />} />
          
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;