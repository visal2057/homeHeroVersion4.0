const { pool, testConnection } = require('./config/db');

async function testDatabase() {
    console.log("🔄 Testing database connection...");
    
    const connected = await testConnection();
    
    if (connected) {
        try {
            // Test query to get current time
            const timeResult = await pool.query('SELECT NOW() as current_time');
            console.log("📅 Current database time:", timeResult.rows[0].current_time);
            
            // Get user count
            const userCount = await pool.query('SELECT COUNT(*) FROM users');
            console.log("👥 Total users in database:", userCount.rows[0].count);
            
            // Get client count
            const clientCount = await pool.query('SELECT COUNT(*) FROM clients');
            console.log("👤 Total clients:", clientCount.rows[0].count);
            
            // Get provider count
            const providerCount = await pool.query('SELECT COUNT(*) FROM service_providers');
            console.log("🔧 Total service providers:", providerCount.rows[0].count);
            
            // Get booking count
            const bookingCount = await pool.query('SELECT COUNT(*) FROM bookings');
            console.log("📅 Total bookings:", bookingCount.rows[0].count);
            
            console.log("\n✅ Database is working correctly!");
            
            // Show sample users
            const users = await pool.query('SELECT userid, username, email, role FROM users LIMIT 5');
            console.log("\n📋 Sample users:");
            users.rows.forEach(user => {
                console.log(`   - ${user.username} (${user.email}) - Role: ${user.role}`);
            });
            
        } catch (err) {
            console.error("❌ Query failed:", err.message);
        }
    }
    
    await pool.end();
}

testDatabase();