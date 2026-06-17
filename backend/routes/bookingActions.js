const express = require('express');
const router = express.Router();
const { pool } = require('../config/db');
const { authenticateToken } = require('../middleware/auth');

const generateBookingReference = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let ref = 'HH-';
    for (let i = 0; i < 8; i++) {
        ref += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return ref;
};

router.post('/', authenticateToken, async (req, res) => {
    const {
        service_provider_id,
        service_provider_name,
        service_category,
        job_type,
        job_description,
        booking_date,
        booking_time,
        address
    } = req.body;

    if (!service_provider_id || !service_provider_name || !service_category || !job_type || !booking_date || !booking_time || !address) {
        return res.status(400).json({ error: 'Missing required booking fields' });
    }

    try {
        const clientResult = await pool.query(
            'SELECT username FROM users WHERE userid = $1',
            [req.user.id]
        );

        if (clientResult.rows.length === 0) {
            return res.status(404).json({ error: 'Client user not found' });
        }

        const clientName = clientResult.rows[0].username;
        const bookingReference = generateBookingReference();
        const bookingDateTime = new Date(`${booking_date}T${booking_time}`);

        const insertQuery = `
            INSERT INTO bookings (
                booking_reference,
                service_category,
                job_type,
                client_id,
                client_name,
                service_provider_id,
                service_provider_name,
                job_description,
                address,
                status,
                booking_date,
                created_at,
                updated_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
            RETURNING booking_id, booking_reference, service_category, job_type, client_id, client_name, service_provider_id, service_provider_name, job_description, address, status, booking_date, created_at, updated_at;
        `;

        const values = [
            bookingReference,
            service_category,
            job_type,
            req.user.id,
            clientName,
            service_provider_id,
            service_provider_name,
            job_description,
            address,
            'Pending',
            bookingDateTime
        ];

        const { rows } = await pool.query(insertQuery, values);
        res.status(201).json(rows[0]);
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ error: 'Failed to create booking' });
    }
});

module.exports = router;
