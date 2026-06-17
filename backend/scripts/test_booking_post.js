// Test script: generate JWT and POST a booking to /api/booking-actions
require('dotenv').config();
const jwt = require('jsonwebtoken');
const http = require('http');

const JWT_SECRET = process.env.JWT_SECRET || 'homehero_super_secret_key_2026';

(async function() {
  try {
    const token = jwt.sign({ userId: 10, email: 'malith@example.com', role: 'Client' }, JWT_SECRET, { expiresIn: '7d' });
    console.log('Using token:', token);

    const postData = JSON.stringify({
      service_provider_id: 23,
      service_provider_name: 'kamal_p',
      service_category: 'Gardening',
      job_type: 'Direct job',
      job_description: 'Test booking from script',
      booking_date: '2026-06-20',
      booking_time: '10:00',
      address: 'Test address'
    });

    const opts = {
      hostname: 'localhost',
      port: 5000,
      path: '/api/booking-actions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = http.request(opts, res => {
      let body = '';
      console.log('STATUS', res.statusCode);
      res.on('data', c => body += c);
      res.on('end', () => {
        console.log('BODY', body);
      });
    });

    req.on('error', e => console.error('ERR', e.message));
    req.write(postData);
    req.end();
  } catch (err) {
    console.error(err);
  }
})();
