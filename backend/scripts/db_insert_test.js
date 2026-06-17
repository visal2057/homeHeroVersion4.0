require('dotenv').config();
const { pool } = require('../config/db');

(async ()=>{
  try {
    const bookingReference = 'TEST-REF-001';
    const service_category = 'Gardening';
    const job_type = 'Direct job';
    const client_id = 10;
    const client_name = 'malith_r';
    const service_provider_id = 23;
    const service_provider_name = 'kamal_p';
    const job_description = 'Direct DB insert test';
    const address = 'Test address';
    const status = 'Pending';
    const bookingDateTime = new Date('2026-06-20T10:00:00Z');

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

    const values = [bookingReference, service_category, job_type, client_id, client_name, service_provider_id, service_provider_name, job_description, address, status, bookingDateTime];

    const res = await pool.query(insertQuery, values);
    console.log('INSERTED', res.rows[0]);
  } catch (err) {
    console.error('DB INSERT ERROR', err);
  } finally {
    await pool.end();
  }
})();
