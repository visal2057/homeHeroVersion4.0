const express = require('express');
const router = express.Router();
const { pool } = require('../config/db');

// GET all users (clients + providers) for admin user management
router.get('/', async (req, res) => {
    try {
        const queryText = `
            SELECT
                u.userid,
                u.username AS name,
                u.email,
                u.role,
                u.status,
                u.unique_token,
                COALESCE(c.is_verified, sp.is_verified) AS is_verified,
                COALESCE(c.is_online, sp.is_online) AS is_online,
                COALESCE(c.completed_jobs, sp.completed_jobs) AS completed_jobs,
                COALESCE(c.cancelled_jobs, sp.cancelled_jobs) AS cancelled_jobs,
                sp.category,
                sp.rejected_requests
            FROM public.users u
            LEFT JOIN public.clients c ON u.userid = c.userid
            LEFT JOIN public.service_providers sp ON u.userid = sp.userid
            WHERE u.role IN ('customer', 'provider')
            ORDER BY u.userid DESC;
        `;
        const result = await pool.query(queryText);
        res.json(result.rows);
    } catch (err) {
        console.error('Database fetch error in users route:', err.message);
        res.status(500).json({ error: 'Internal Database Server Error' });
    }
});

// POST suspend a user account
router.post('/ban', async (req, res) => {
    const { userid, duration } = req.body;
    if (!userid) {
        return res.status(400).json({ error: 'userid is required' });
    }
    try {
        await pool.query(
            `UPDATE public.users SET status = 'SUSPENDED' WHERE userid = $1`,
            [userid]
        );
        console.log(`User ${userid} suspended for: ${duration}`);
        res.json({ success: true, message: 'User status updated to SUSPENDED' });
    } catch (err) {
        console.error('Database update error in ban route:', err.message);
        res.status(500).json({ error: 'Failed to process account suspension' });
    }
});

module.exports = router;