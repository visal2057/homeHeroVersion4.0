const express = require('express');
const router = express.Router();
const {
    providerSignUp,
    customerSignUp,
    loginUser,
    googleLogin,
    healthCheck
} = require('../controllers/AuthController');

// Customer Sign Up
router.post('/signup', customerSignUp);

// Provider Sign Up
router.post('/provider/signup', providerSignUp);

// Login
router.post('/login', loginUser);

// Google OAuth Login
router.post('/google', googleLogin);

// Health check
router.get('/health', healthCheck);

module.exports = router;