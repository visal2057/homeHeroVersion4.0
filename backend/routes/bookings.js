const express = require('express');
const router = express.Router();
const { pool } = require('../config/db');

// GET all bookings
router.get('/', async (req, res) => {
    try {
        const queryText = `
            SELECT
                booking_id,
                booking_reference,
                service_category,
                job_type,
                client_name,
                COALESCE(service_provider_name, 'Unassigned') AS service_provider_name,
                job_description,
                status,
                booking_date,
                created_at,
                updated_at
            FROM bookings
            ORDER BY created_at DESC;
        `;
        const { rows } = await pool.query(queryText);
        res.json(rows);
    } catch (error) {
        console.error('Error fetching bookings:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET single booking by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM bookings WHERE booking_id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching booking:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;