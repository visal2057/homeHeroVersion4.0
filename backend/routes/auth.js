const express = require('express');
const router = express.Router();
const {
    providerSignUp,
    customerSignUp,
    loginUser,
    googleLogin,
    healthCheck,
    getLoginAttempts,
    forgotPassword,
    resendOtp,
    verifyOtp,
    resetPassword
} = require('../controllers/AuthController');

// Customer Sign Up
router.post('/signup', customerSignUp);

// Provider Sign Up
router.post('/provider/signup', providerSignUp);

// Login
router.post('/login', loginUser);

// Google OAuth Login
router.post('/google', googleLogin);

// Password reset / OTP support
router.post('/forgot-password', forgotPassword);
router.post('/resend-otp', resendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/reset-password', resetPassword);

// Get login attempts history
router.get('/login-attempts/:userId', getLoginAttempts);

// Health check
router.get('/health', healthCheck);

module.exports = router;