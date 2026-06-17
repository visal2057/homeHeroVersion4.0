require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { pool, testConnection } = require('./config/db');

// Route files
const authRoutes         = require('./routes/auth');
const workerRoutes      = require('./routes/worker');
const usersRoutes       = require('./routes/users');
const bookingsRoutes    = require('./routes/bookings');
const bookingActionsRoutes = require('./routes/bookingActions');
const serviceProviderRoutes = require('./routes/serviceProviders');
const announcementsRoutes = require('./routes/announcements');
const membershipRoutes  = require('./routes/membership'); // Added membership route file reference

const { getUserProfile, getAllClients, getAllProviders, getDashboardStats, registerClient, registerProvider } = require('./controllers/AuthController');

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';


const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174',
    process.env.CLIENT_URL // This reads your string variable cleanly from above
].filter(Boolean);

// ==================== MIDDLEWARE ====================
app.use(cors({
    origin: CLIENT_URL,
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ==================== ROUTE MOUNTS ====================
app.use('/api/auth',          authRoutes);
app.use('/api/worker',        workerRoutes);
app.use('/api/admin/users',   usersRoutes);
app.use('/api/bookings',      bookingsRoutes);
app.use('/api/service-providers', serviceProviderRoutes);
app.use('/api/booking-actions', bookingActionsRoutes);
app.use('/api/announcements', announcementsRoutes);
app.use('/api/membership',    membershipRoutes); // Mounted membership endpoints cleanly to the core API

// ==================== ADMIN STANDALONE ROUTES ====================
app.get('/api/auth/user/:userId',           getUserProfile);
app.post('/api/auth/register/client',       registerClient);
app.post('/api/auth/register/provider',     registerProvider);
app.get('/api/admin/clients',               getAllClients);
app.get('/api/admin/providers',             getAllProviders);
app.get('/api/admin/stats',                 getDashboardStats);

// Complaints route (supports missing table gracefully)
app.get('/api/admin/complaints', async (req, res) => {
    try {
        const tableCheck = await pool.query(`
            SELECT EXISTS (
                SELECT FROM information_schema.tables
                WHERE table_name = 'complaints'
            )
        `);
        if (tableCheck.rows[0].exists) {
            const result = await pool.query('SELECT * FROM complaints ORDER BY id DESC');
            res.json(result.rows);
        } else {
            res.json([
                { id: 1, complainant_name: 'John Doe', target_name: 'Service Provider', issue_description: 'Service quality issue', status: 'pending' },
                { id: 2, complainant_name: 'Jane Smith', target_name: 'Another Provider', issue_description: 'Late arrival', status: 'pending' }
            ]);
        }
    } catch (err) {
        console.error('Error fetching complaints:', err.message);
        res.status(500).json({ error: 'Server Error' });
    }
});

// ==================== HEALTH CHECK ====================
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running', timestamp: new Date().toISOString() });
});

// ==================== 404 HANDLER ====================
app.use((req, res) => {
    res.status(404).json({ error: `Route ${req.method} ${req.path} not found` });
});

// ==================== START SERVER ====================
const startServer = async () => {
    const dbConnected = await testConnection();

    app.listen(PORT, () => {
        console.log(`
╔══════════════════════════════════════════════════════════╗
║     🚀 HomeHero Backend Server Started                   ║
╠══════════════════════════════════════════════════════════╣
║  Port: ${PORT}                                            ║
║  URL: http://localhost:${PORT}                            ║
║  Database: ${dbConnected ? '✅ Connected' : '❌ Failed'}   ║
╚══════════════════════════════════════════════════════════╝
        `);
    });
};

startServer();