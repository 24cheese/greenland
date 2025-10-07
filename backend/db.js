const mysql = require('mysql2/promise'); // Vẫn dùng /promise
require('dotenv').config();

// Tạo một "pool" kết nối thay vì một kết nối đơn lẻ.
// Pool sẽ tự quản lý việc tạo và tái sử dụng các kết nối.
const pool = mysql.createPool(process.env.DATABASE_URL);

// Kiểm tra kết nối khi ứng dụng khởi động
pool.getConnection()
    .then(connection => {
        console.log('✅ Database pool connected successfully!');
        connection.release(); // Trả kết nối về lại cho pool
    })
    .catch(error => {
        console.error('❌ DATABASE CONNECTION FAILED:', error);
        process.exit(1);
    });

// Export cái pool này ra để các file khác sử dụng
module.exports = pool;