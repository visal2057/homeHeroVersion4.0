const { pool } = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const JWT_SECRET = process.env.JWT_SECRET || 'homehero_secret_key_2026';
const MAX_LOGIN_ATTEMPTS = 3;
const LOCK_TIME_MINUTES = 30;

const otpStore = new Map();
const resetTokenStore = new Map();

const generateOtpCode = () => Math.floor(100000 + Math.random() * 900000).toString();
const generateResetToken = () => crypto.randomBytes(20).toString('hex');

// ============================================
// LOG LOGIN ATTEMPTS
// ============================================
const logLoginAttempt = async (userId, email, success, ipAddress) => {
    try {
        await pool.query(
            `INSERT INTO login_attempts (user_id, email, ip_address, success, attempted_at)
             VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP)`,
            [userId, email, ipAddress, success]
        );
    } catch (err) {
        console.error('Log login attempt error:', err);
    }
};

// ============================================
// GET LOGIN ATTEMPTS HISTORY
// ============================================
const getLoginAttempts = async (req, res) => {
    const { userId } = req.params;

    try {
        const result = await pool.query(
            `SELECT email, ip_address, success, attempted_at 
             FROM login_attempts 
             WHERE user_id = $1 
             ORDER BY attempted_at DESC 
             LIMIT 20`,
            [userId]
        );
        res.json({ attempts: result.rows });
    } catch (error) {
        console.error('Get login attempts error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// ============================================
// LOGIN USER WITH ATTEMPT LIMIT
// ============================================
const loginUser = async (req, res) => {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
        return res.status(400).json({ message: 'Please provide both username/email and a password.' });
    }

    try {
        const cleanIdentifier = identifier.toLowerCase().trim();
        const result = await pool.query(
            `SELECT userid, username, email, password, role, status, failed_login_attempts, locked_until
             FROM users WHERE (LOWER(username) = $1 OR LOWER(email) = $1) LIMIT 1`,
            [cleanIdentifier]
        );

        if (result.rows.length === 0) {
            await logLoginAttempt(null, identifier, false, req.ip);
            return res.status(401).json({ message: 'Invalid username/email or password.' });
        }

        const user = result.rows[0];

        // Check if account is locked
        if (user.locked_until && new Date() < new Date(user.locked_until)) {
            const remaining = Math.ceil((new Date(user.locked_until) - new Date()) / 60000);
            return res.status(403).json({ 
                message: `Account locked. Try again in ${remaining} minutes` 
            });
        }

        // Check account status
        if (user.status === 'PENDING_OTP') {
            return res.status(403).json({ message: 'Please verify your email first.' });
        }

        if (user.status === 'PENDING_REVIEW') {
            return res.status(403).json({ message: 'Your account is pending verification. Please wait for admin approval.' });
        }

        if (user.status !== 'ACTIVE' && user.status !== 'APPROVED') {
            return res.status(403).json({ message: 'Your account is not active. Please contact support.' });
        }

        // Verify password
        let isValidPassword = false;
        try {
            if (user.password && (user.password.startsWith('$2a$') || user.password.startsWith('$2b$') || user.password.startsWith('$2y$'))) {
                isValidPassword = await bcrypt.compare(password, user.password);
            } else {
                isValidPassword = (user.password === password);
            }
        } catch (err) {
            isValidPassword = (user.password === password);
        }

        if (!isValidPassword) {
            const attempts = (user.failed_login_attempts || 0) + 1;
            let locked_until = null;

            if (attempts >= MAX_LOGIN_ATTEMPTS) {
                locked_until = new Date();
                locked_until.setMinutes(locked_until.getMinutes() + LOCK_TIME_MINUTES);
                
                await pool.query(
                    'UPDATE users SET failed_login_attempts = $1, locked_until = $2 WHERE userid = $3',
                    [0, locked_until, user.userid]
                );
                
                await logLoginAttempt(user.userid, identifier, false, req.ip);
                
                return res.status(403).json({ 
                    message: `Too many failed attempts. Account locked for ${LOCK_TIME_MINUTES} minutes.` 
                });
            }

            await pool.query(
                'UPDATE users SET failed_login_attempts = $1 WHERE userid = $2',
                [attempts, user.userid]
            );
            
            await logLoginAttempt(user.userid, identifier, false, req.ip);

            return res.status(401).json({ 
                message: `Invalid credentials. ${MAX_LOGIN_ATTEMPTS - attempts} attempts remaining.` 
            });
        }

        // Reset attempts on successful login
        await pool.query(
            'UPDATE users SET failed_login_attempts = 0, locked_until = NULL WHERE userid = $1',
            [user.userid]
        );

        await logLoginAttempt(user.userid, identifier, true, req.ip);

        const token = jwt.sign(
            { userId: user.userid, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        return res.status(200).json({
            message: 'Authentication successful!',
            token: token,
            user: {
                id: user.userid,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    try {
        const userResult = await pool.query('SELECT userid FROM users WHERE LOWER(email) = LOWER($1)', [email]);
        if (userResult.rows.length === 0) {
            return res.status(404).json({ error: 'Email not found' });
        }

        const otp = generateOtpCode();
        otpStore.set(`${email}:password_reset`, {
            code: otp,
            expiresAt: Date.now() + 10 * 60 * 1000
        });

        return res.status(200).json({ message: 'Password reset OTP sent to email', otp });
    } catch (error) {
        console.error('Forgot password error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const resendOtp = async (req, res) => {
    const { email, type } = req.body;
    if (!email || !type) {
        return res.status(400).json({ error: 'Email and type are required' });
    }

    const otp = generateOtpCode();
    otpStore.set(`${email}:${type}`, {
        code: otp,
        expiresAt: Date.now() + 10 * 60 * 1000
    });

    return res.status(200).json({ message: 'OTP resent successfully', otp });
};

const verifyOtp = async (req, res) => {
    const { email, otp, type } = req.body;
    if (!email || !otp || !type) {
        return res.status(400).json({ error: 'Email, OTP, and type are required' });
    }

    const entry = otpStore.get(`${email}:${type}`);
    if (!entry || entry.code !== otp || Date.now() > entry.expiresAt) {
        return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    otpStore.delete(`${email}:${type}`);

    if (type === 'password_reset') {
        const resetToken = generateResetToken();
        resetTokenStore.set(resetToken, {
            email,
            expiresAt: Date.now() + 30 * 60 * 1000
        });
        return res.status(200).json({ message: 'OTP verified', resetToken });
    }

    try {
        await pool.query(
            'UPDATE users SET status = $1 WHERE LOWER(email) = LOWER($2)',
            ['ACTIVE', email]
        );
        return res.status(200).json({ message: 'OTP verified successfully' });
    } catch (error) {
        console.error('Verify OTP update error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const resetPassword = async (req, res) => {
    const { resetToken, new_password } = req.body;
    if (!resetToken || !new_password) {
        return res.status(400).json({ error: 'Reset token and new password are required' });
    }

    const entry = resetTokenStore.get(resetToken);
    if (!entry || Date.now() > entry.expiresAt) {
        return res.status(400).json({ error: 'Invalid or expired reset token' });
    }

    try {
        const hashedPassword = await bcrypt.hash(new_password, 10);
        await pool.query(
            'UPDATE users SET password = $1, status = $2 WHERE LOWER(email) = LOWER($3)',
            [hashedPassword, 'ACTIVE', entry.email]
        );
        resetTokenStore.delete(resetToken);
        return res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        console.error('Reset password error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

// ============================================
// SERVICE PROVIDER SIGN UP (MAX 2 CATEGORIES)
// ============================================
const providerSignUp = async (req, res) => {
    const {
        full_name, email, phone, password, district,
        categories, service_areas, nic_number,
        police_station, police_report_date
    } = req.body;

    console.log('📝 Provider Signup:', { full_name, email, phone, categories });

    // ===== VALIDATIONS =====
    // 1. Name - Letters only (no numbers)
    const nameRegex = /^[a-zA-Z\s]{2,50}$/;
    if (!nameRegex.test(full_name.trim())) {
        return res.status(400).json({ 
            success: false, 
            message: 'Name can only contain letters (no numbers)' 
        });
    }

    // 2. Categories - Max 2
    if (!categories || categories.length === 0 || categories.length > 2) {
        return res.status(400).json({ 
            success: false, 
            message: 'Please select 1-2 categories only' 
        });
    }

    // 3. Required fields
    if (!full_name || !email || !phone || !password || !district) {
        return res.status(400).json({ success: false, message: 'All required fields are required' });
    }

    try {
        const emailCheck = await pool.query('SELECT userid FROM users WHERE email = $1', [email.toLowerCase()]);
        if (emailCheck.rows.length > 0) {
            return res.status(400).json({ success: false, message: 'Email already registered' });
        }

        const nameParts = full_name.trim().split(' ');
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';
        const username = email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '');

        const hashedPassword = await bcrypt.hash(password, 10);
        const uniqueToken = Math.random().toString(36).substring(2, 8).toUpperCase();

        await pool.query('BEGIN');

        const userResult = await pool.query(
            `INSERT INTO users (username, email, password, role, status, unique_token, phone, first_name, last_name, district, created_at, updated_at)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
             RETURNING userid, username, email, role`,
            [username, email.toLowerCase(), hashedPassword, 'provider', 'PENDING_REVIEW', uniqueToken, phone, firstName, lastName, district]
        );

        const newUser = userResult.rows[0];

        await pool.query(
            `INSERT INTO worker_profiles (user_id, nic_number, police_station, police_report_date, verification_status, created_at, updated_at)
             VALUES ($1, $2, $3, $4, 'PENDING_REVIEW', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
            [newUser.userid, nic_number, police_station, police_report_date]
        );

        const categoryStr = (categories && categories.length > 0) ? categories.join(', ') : 'General';
        await pool.query(
            `INSERT INTO service_providers (userid, category, is_verified, is_online, rejected_requests, completed_jobs, cancelled_jobs)
             VALUES ($1, $2, false, false, 0, 0, 0)`,
            [newUser.userid, categoryStr]
        );

        await pool.query('COMMIT');

        const token = jwt.sign(
            { userId: newUser.userid, email: newUser.email, role: newUser.role },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        return res.status(201).json({
            success: true,
            message: 'Provider registration successful! Pending verification.',
            token: token,
            user: {
                id: newUser.userid,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role,
                full_name: full_name
            }
        });

    } catch (error) {
        await pool.query('ROLLBACK');
        console.error('Provider signup error:', error);
        return res.status(500).json({ success: false, message: 'Database error: ' + error.message });
    }
};

// ============================================
// CUSTOMER SIGN UP
// ============================================
const customerSignUp = async (req, res) => {
    const { full_name, email, phone, password } = req.body;

    // Name validation - Letters only
    const nameRegex = /^[a-zA-Z\s]{2,50}$/;
    if (!nameRegex.test(full_name.trim())) {
        return res.status(400).json({ 
            success: false, 
            message: 'Name can only contain letters (no numbers)' 
        });
    }

    if (!full_name || !email || !phone || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    try {
        const emailCheck = await pool.query('SELECT userid FROM users WHERE email = $1', [email.toLowerCase()]);
        if (emailCheck.rows.length > 0) {
            return res.status(400).json({ success: false, message: 'Email already registered' });
        }

        const username = email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '');
        const hashedPassword = await bcrypt.hash(password, 10);
        const uniqueToken = Math.random().toString(36).substring(2, 8).toUpperCase();

        await pool.query('BEGIN');

        const userResult = await pool.query(
            `INSERT INTO users (username, email, password, role, status, unique_token, created_at, updated_at)
             VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
             RETURNING userid, username, email, role`,
            [username, email.toLowerCase(), hashedPassword, 'customer', 'ACTIVE', uniqueToken]
        );

        const newUser = userResult.rows[0];

        await pool.query(
            `INSERT INTO clients (userid, is_verified, is_online, completed_jobs, cancelled_jobs)
             VALUES ($1, false, false, 0, 0)`,
            [newUser.userid]
        );

        await pool.query('COMMIT');

        const token = jwt.sign(
            { userId: newUser.userid, email: newUser.email, role: newUser.role },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        return res.status(201).json({
            success: true,
            message: 'Account created successfully!',
            token: token,
            user: {
                id: newUser.userid,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role,
                full_name: full_name
            }
        });

    } catch (error) {
        await pool.query('ROLLBACK');
        console.error('Customer signup error:', error);
        return res.status(500).json({ success: false, message: 'Database error: ' + error.message });
    }
};

// ============================================
// GET USER PROFILE
// ============================================
const getUserProfile = async (req, res) => {
    const { userId } = req.params;

    try {
        const result = await pool.query(
            'SELECT userid, username, email, role, status, created_at FROM users WHERE userid = $1',
            [userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ user: result.rows[0] });

    } catch (error) {
        console.error('Error fetching user profile:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// ============================================
// GET ALL CLIENTS
// ============================================
const getAllClients = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT u.userid, u.username, u.email, u.status,
                   c.is_verified, c.is_online, c.completed_jobs, c.cancelled_jobs
            FROM users u
            JOIN clients c ON u.userid = c.userid
            WHERE u.role = 'customer'
            ORDER BY u.userid DESC
        `);
        return res.status(200).json({ clients: result.rows });

    } catch (error) {
        console.error('Error fetching clients:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// ============================================
// GET ALL PROVIDERS
// ============================================
const getAllProviders = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT u.userid, u.username, u.email, u.status,
                   sp.category, sp.is_verified, sp.is_online,
                   sp.completed_jobs, sp.cancelled_jobs, sp.rejected_requests
            FROM users u
            JOIN service_providers sp ON u.userid = sp.userid
            WHERE u.role = 'provider'
            ORDER BY u.userid DESC
        `);
        return res.status(200).json({ providers: result.rows });

    } catch (error) {
        console.error('Error fetching providers:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// ============================================
// REGISTER CLIENT (Admin)
// ============================================
const registerClient = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const uniqueToken = Math.random().toString(36).substring(2, 8).toUpperCase();

        const userResult = await pool.query(
            `INSERT INTO users (username, email, password, role, status, unique_token, created_at, updated_at)
             VALUES ($1, $2, $3, 'customer', 'ACTIVE', $4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
             RETURNING userid, username, email, role`,
            [username, email, hashedPassword, uniqueToken]
        );
        const newUser = userResult.rows[0];

        await pool.query(
            `INSERT INTO clients (userid, is_verified, is_online, completed_jobs, cancelled_jobs)
             VALUES ($1, false, false, 0, 0)`,
            [newUser.userid]
        );

        return res.status(201).json({ message: 'Client registered successfully', user: newUser });

    } catch (error) {
        console.error('Error registering client:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// ============================================
// REGISTER PROVIDER (Admin)
// ============================================
const registerProvider = async (req, res) => {
    const { username, email, password, category } = req.body;

    if (!username || !email || !password || !category) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const uniqueToken = Math.random().toString(36).substring(2, 8).toUpperCase();

        const userResult = await pool.query(
            `INSERT INTO users (username, email, password, role, status, unique_token, created_at, updated_at)
             VALUES ($1, $2, $3, 'provider', 'ACTIVE', $4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
             RETURNING userid, username, email, role`,
            [username, email, hashedPassword, uniqueToken]
        );
        const newUser = userResult.rows[0];

        await pool.query(
            `INSERT INTO service_providers (userid, category, is_verified, is_online, rejected_requests, completed_jobs, cancelled_jobs)
             VALUES ($1, $2, false, false, 0, 0, 0)`,
            [newUser.userid, category]
        );

        return res.status(201).json({ message: 'Service provider registered successfully', user: newUser });

    } catch (error) {
        console.error('Error registering provider:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// ============================================
// GET DASHBOARD STATS
// ============================================
const getDashboardStats = async (req, res) => {
    try {
        const stats = {};

        const usersResult = await pool.query('SELECT COUNT(*) FROM users');
        stats.totalUsers = parseInt(usersResult.rows[0].count);

        const clientsResult = await pool.query('SELECT COUNT(*) FROM clients');
        stats.totalClients = parseInt(clientsResult.rows[0].count);

        const providersResult = await pool.query('SELECT COUNT(*) FROM service_providers');
        stats.totalProviders = parseInt(providersResult.rows[0].count);

        const bookingsResult = await pool.query('SELECT COUNT(*) FROM bookings');
        stats.totalBookings = parseInt(bookingsResult.rows[0].count);

        const pendingResult = await pool.query("SELECT COUNT(*) FROM service_providers WHERE is_verified = false");
        stats.pendingVerifications = parseInt(pendingResult.rows[0].count);

        return res.status(200).json(stats);

    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// ============================================
// GET SERVICE CATEGORIES
// ============================================
const getServiceCategories = async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT id, name, description, icon FROM service_categories WHERE is_active = true ORDER BY name'
        );
        res.json({ categories: result.rows });
    } catch (error) {
        console.error('Categories error:', error);
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
};

// ============================================
// GET DISTRICTS
// ============================================
const getDistricts = async (req, res) => {
    try {
        const result = await pool.query('SELECT id, name, province FROM districts ORDER BY name');
        res.json({ districts: result.rows });
    } catch (error) {
        console.error('Districts error:', error);
        res.status(500).json({ error: 'Failed to fetch districts' });
    }
};

// ============================================
// UPDATE WORKER DETAILS
// ============================================
const updateWorkerDetails = async (req, res) => {
    try {
        const userId = req.user.id;
        const { nic_number, police_station, police_report_date } = req.body;

        await pool.query(
            `UPDATE worker_profiles
             SET nic_number = $1, police_station = $2, police_report_date = $3
             WHERE user_id = $4`,
            [nic_number, police_station, police_report_date, userId]
        );

        res.json({ success: true, message: 'Worker details updated successfully' });

    } catch (error) {
        console.error('Update error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// ============================================
// UPLOAD DOCUMENT
// ============================================
const uploadDocument = async (req, res) => {
    try {
        const userId = req.user.id;
        const { doc_type } = req.body;

        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        await pool.query(
            `INSERT INTO documents (user_id, doc_type, file_path, status, uploaded_at)
             VALUES ($1, $2, $3, 'PENDING', CURRENT_TIMESTAMP)`,
            [userId, doc_type, req.file.path]
        );

        res.json({ success: true, message: 'Document uploaded successfully' });

    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// ============================================
// GET VERIFICATION STATUS
// ============================================
const getVerificationStatus = async (req, res) => {
    try {
        const userId = req.user.id;

        const userResult = await pool.query('SELECT status FROM users WHERE userid = $1', [userId]);
        const workerResult = await pool.query('SELECT verification_status FROM worker_profiles WHERE user_id = $1', [userId]);

        res.json({
            status: userResult.rows[0]?.status || 'UNKNOWN',
            verification_status: workerResult.rows[0]?.verification_status || 'PENDING',
            days_remaining: 7
        });

    } catch (error) {
        console.error('Status error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// ============================================
// GOOGLE LOGIN
// ============================================
const googleLogin = async (req, res) => {
    const { email, name, googleId, picture } = req.body;

    try {
        let userQuery = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (userQuery.rows.length === 0) {
            const username = email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '');
            const uniqueToken = Math.random().toString(36).substring(2, 8).toUpperCase();
            const result = await pool.query(
                `INSERT INTO users (username, email, password, role, status, unique_token, created_at, updated_at)
                 VALUES ($1, $2, $3, $4, 'ACTIVE', $5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
                 RETURNING userid, username, email, role`,
                [username, email, `google_${googleId}`, 'customer', uniqueToken]
            );
            userQuery = result;

            await pool.query(
                `INSERT INTO clients (userid, is_verified, is_online, completed_jobs, cancelled_jobs)
                 VALUES ($1, true, false, 0, 0)`,
                [userQuery.rows[0].userid]
            );
        }

        const userData = userQuery.rows[0];

        const token = jwt.sign(
            { userId: userData.userid, email: userData.email, role: userData.role },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            message: 'Google login successful',
            token: token,
            user: {
                id: userData.userid,
                username: userData.username,
                email: userData.email,
                role: userData.role
            }
        });

    } catch (error) {
        console.error('Google login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// ============================================
// HEALTH CHECK
// ============================================
const healthCheck = (req, res) => {
    res.json({ status: 'OK', message: 'Server is running', timestamp: new Date().toISOString() });
};

// ============================================
// EXPORTS
// ============================================
module.exports = {
    providerSignUp,
    customerSignUp,
    loginUser,
    forgotPassword,
    resendOtp,
    verifyOtp,
    resetPassword,
    getUserProfile,
    getAllClients,
    getAllProviders,
    registerClient,
    registerProvider,
    getDashboardStats,
    getServiceCategories,
    getDistricts,
    updateWorkerDetails,
    uploadDocument,
    getVerificationStatus,
    getLoginAttempts,
    googleLogin,
    healthCheck
};