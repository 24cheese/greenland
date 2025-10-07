const mysql = require('mysql2/promise'); // Thêm /promise
require('dotenv').config();

const connectionString = process.env.DATABASE_URL;
let db;

async function connectToDatabase() {
  if (db) return db; // Trả về kết nối nếu đã có

  if (!connectionString) {
    console.error('CRITICAL ERROR: Biến môi trường DATABASE_URL không được thiết lập.');
    process.exit(1);
  }

  try {
    console.log('🟡 Đang kết nối tới MySQL...');
    db = await mysql.createConnection(connectionString);
    console.log('✅ Kết nối MySQL thành công!');
    return db;
  } catch (error) {
    console.error('❌ LỖI KẾT NỐI DATABASE:');
    console.error(error); // In ra toàn bộ lỗi chi tiết
    process.exit(1); // Dừng ứng dụng nếu không kết nối được
  }
}

// Export hàm để các file khác có thể gọi
module.exports = connectToDatabase;