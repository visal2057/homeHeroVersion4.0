// Migration script: adds client_id, service_provider_id, address columns to bookings if missing
require('dotenv').config();
const { pool } = require('../config/db');

(async function() {
  try {
    console.log('Checking/adding columns on bookings...');

    await pool.query("ALTER TABLE bookings ADD COLUMN IF NOT EXISTS client_id integer;");
    await pool.query("ALTER TABLE bookings ADD COLUMN IF NOT EXISTS service_provider_id integer;");
    await pool.query("ALTER TABLE bookings ADD COLUMN IF NOT EXISTS address text;");

    console.log('Columns ensured.');
  } catch (err) {
    console.error('Migration error:', err.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
})();
