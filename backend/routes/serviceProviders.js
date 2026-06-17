const express = require('express');
const router = express.Router();
const { pool } = require('../config/db');

const normalizeCategory = (rawCategory) => {
    if (!rawCategory) return rawCategory;
    const normalized = rawCategory.trim().toLowerCase();
    switch (normalized) {
        case 'handiwork':
            return 'handywork';
        case 'ac repair':
        case 'acrepair':
            return 'AC repair';
        case 'petcare':
            return 'petcare';
        case 'cleaning':
            return 'cleaning';
        case 'gardening':
            return 'gardening';
        case 'general':
            return 'General';
        default:
            return rawCategory;
    }
};

router.get('/', async (req, res) => {
    const category = normalizeCategory(req.query.category);

    try {
        const queryText = `
            SELECT
                u.userid,
                u.username,
                u.email,
                u.district,
                u.role,
                sp.category,
                sp.is_verified,
                sp.is_online,
                sp.rejected_requests,
                sp.completed_jobs,
                sp.cancelled_jobs
            FROM public.service_providers sp
            JOIN public.users u ON u.userid = sp.userid
            WHERE sp.is_verified = true
            ${category ? `AND sp.category ILIKE $1` : ''}
            ORDER BY sp.is_online DESC NULLS LAST, sp.completed_jobs DESC NULLS LAST, u.username ASC;
        `;

        const values = [];
        if (category) {
            values.push(category);
        }

        const { rows } = await pool.query(queryText, values);
        res.json(rows);
    } catch (error) {
        console.error('Error fetching service providers:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
