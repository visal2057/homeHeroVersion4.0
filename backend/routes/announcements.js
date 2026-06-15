const express = require('express');
const router = express.Router();
const { pool } = require('../config/db');

// GET all announcements
router.get('/', async (req, res) => {
    try {
        const queryText = `
            SELECT
                id,
                title,
                message,
                target_audience,
                status,
                TO_CHAR(published_date, 'YYYY-MM-DD HH24:MI') AS published_date
            FROM announcements
            ORDER BY id DESC;
        `;
        const result = await pool.query(queryText);
        res.json(result.rows);
    } catch (err) {
        console.error('Database Announcements Fetch Error:', err.message);
        res.status(500).json({ error: 'Server Database Error' });
    }
});

// POST create a new announcement
router.post('/', async (req, res) => {
    const { title, message, target_audience, status, published_date } = req.body;

    if (!title || !message) {
        return res.status(400).json({ error: 'Title and Message fields are required.' });
    }

    try {
        const insertQuery = `
            INSERT INTO announcements (title, message, target_audience, status, published_date)
            VALUES ($1, $2, $3, $4, COALESCE($5, CURRENT_TIMESTAMP))
            RETURNING *;
        `;
        const finalAudience = target_audience ? target_audience.toUpperCase() : 'ALL';
        const finalStatus = status ? status.toUpperCase() : 'ACTIVE';
        const finalPublishDate = published_date || null;

        const result = await pool.query(insertQuery, [title, message, finalAudience, finalStatus, finalPublishDate]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Database Announcement Insert Error:', err.message);
        res.status(500).json({ error: 'Failed to save announcement.' });
    }
});

// PUT update an existing announcement
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, message, target_audience, status, published_date } = req.body;

    if (!title || !message) {
        return res.status(400).json({ error: 'Title and Message fields are required.' });
    }

    try {
        const updateQuery = `
            UPDATE announcements
            SET title = $1,
                message = $2,
                target_audience = $3,
                status = $4,
                published_date = $5
            WHERE id = $6
            RETURNING *;
        `;
        const finalAudience = target_audience ? target_audience.toUpperCase() : 'ALL';
        const finalStatus = status ? status.toUpperCase() : 'ACTIVE';
        const finalPublishDate = published_date || null;

        const result = await pool.query(updateQuery, [title, message, finalAudience, finalStatus, finalPublishDate, id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Announcement not found.' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error('Database Announcement Update Error:', err.message);
        res.status(500).json({ error: 'Failed to update announcement.' });
    }
});

// DELETE an announcement
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM announcements WHERE id = $1 RETURNING id', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Announcement not found.' });
        }
        res.status(200).json({ success: true, message: 'Announcement deleted.' });
    } catch (err) {
        console.error('Database Announcement Delete Error:', err.message);
        res.status(500).json({ error: 'Failed to delete announcement.' });
    }
});

module.exports = router;