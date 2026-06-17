const express = require('express');
const router = express.Router();
// Grabs the pool object from your existing db config destructured properly
const { pool } = require('../config/db'); 
const { authenticateToken } = require('../middleware/auth');

// ── 1. FETCH CURRENT MEMBERSHIP AND HISTORY ──
router.get('/my-status', authenticateToken, async (req, res) => {
  const userid = req.query.userid || req.user.id; // Prefer authenticated session context but allow test query fallback

  try {
    const statusCheck = await pool.query(
      `SELECT end_date, status FROM memberships WHERE userid = $1`,
      [userid]
    );

    if (statusCheck.rows.length > 0) {
      const currentStatus = statusCheck.rows[0];
      if (new Date() > new Date(currentStatus.end_date) && currentStatus.status === 'ACTIVE') {
        await pool.query(
          `UPDATE memberships SET status = 'EXPIRED', updated_at = CURRENT_TIMESTAMP WHERE userid = $1`,
          [userid]
        );
      }
    }

    const membershipResult = await pool.query(
      `SELECT start_date, end_date, status FROM memberships WHERE userid = $1`,
      [userid]
    );

    const historyResult = await pool.query(
      `SELECT invoice_number, payment_date, amount, payment_method 
       FROM membership_payments 
       WHERE userid = $1 
       ORDER BY payment_date DESC`,
      [userid]
    );

    res.json({
      membership: membershipResult.rows[0] || null,
      history: historyResult.rows
    });

  } catch (error) {
    console.error('Error fetching membership profile:', error.message);
    res.status(500).json({ error: 'Internal server error while processing billing query.' });
  }
});

// ── 2. PROCESS MANUAL SUBSCRIPTION PAYMENT ──
router.post('/renew', authenticateToken, async (req, res) => {
  const paymentMethod = req.body.paymentMethod || req.body.payment_method;
  const userid = req.user?.id || req.user?.userid;

  console.log('membership renew request', { userid, paymentMethod, body: req.body, user: req.user });

  if (!paymentMethod) {
    return res.status(400).json({ error: 'Payment method configuration snapshot required. Use paymentMethod or payment_method.' });
  }

  if (!userid) {
    return res.status(401).json({ error: 'Authenticated user id missing.' });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    await client.query(
      `INSERT INTO membership_payments (userid, payment_method) VALUES ($1, $2)`,
      [userid, paymentMethod]
    );

    await client.query(
      `INSERT INTO memberships (userid, start_date, end_date, status)
       VALUES ($1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '1 month', 'ACTIVE')
       ON CONFLICT (userid) 
       DO UPDATE SET 
          start_date = CURRENT_TIMESTAMP,
          end_date = CURRENT_TIMESTAMP + INTERVAL '1 month',
          status = 'ACTIVE',
          updated_at = CURRENT_TIMESTAMP`,
      [userid]
    );

    await client.query('COMMIT');
    res.status(200).json({ message: 'Subscription successfully initialized or extended.' });

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Transaction failed processing subscription payment:', error.message);
    res.status(500).json({ error: 'Transaction execution aborted due to deep processing fault.' });
  } finally {
    client.release();
  }
});

module.exports = router;