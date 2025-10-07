require('dotenv').config();
const mysql = require('mysql2');

// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });

// Lấy chuỗi kết nối trực tiếp từ biến môi trường của Railway
const connectionString = process.env.DATABASE_URL;

// Kiểm tra xem biến môi trường có tồn tại không để tránh lỗi
if (!connectionString) {
  console.error('Lỗi: Biến môi trường DATABASE_URL chưa được thiết lập.');
  process.exit(1); // Thoát ứng dụng nếu không có chuỗi kết nối
}

// Thư viện mysql2 có thể nhận trực tiếp chuỗi kết nối này
const db = mysql.createConnection(connectionString);

db.connect((err) => {
  if (err) {
    console.error('Lỗi kết nối MySQL:', err);
  } else {
    console.log('Kết nối MySQL thành công!');
  }
});

module.exports = db;
