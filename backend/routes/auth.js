const express = require('express');
const router = express.Router();
const {
    providerSignUp,
    customerSignUp,
    loginUser,
    googleLogin,
    healthCheck,
    getLoginAttempts
} = require('../controllers/AuthController');

// Customer Sign Up
router.post('/signup', customerSignUp);

// Provider Sign Up
router.post('/provider/signup', providerSignUp);

// Login
router.post('/login', loginUser);

// Google OAuth Login
router.post('/google', googleLogin);

// Get login attempts history
router.get('/login-attempts/:userId', getLoginAttempts);

// Health check
router.get('/health', healthCheck);

module.exports = router;