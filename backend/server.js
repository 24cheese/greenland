require('dotenv').config();
require('./db.js');
const express = require('express')
const cors = require('cors')
const connectToDatabase = require('./db.js');
const app = express()
// --- BẮT ĐẦU PHẦN CẤU HÌNH CORS MỚI ---

// Danh sách các domain được phép truy cập API
const allowedOrigins = [
  'http://localhost:3000', // Cho phép frontend local
  process.env.FRONTEND_URL   // Đọc domain của frontend từ biến môi trường
];

const corsOptions = {
  origin: (origin, callback) => {
    // Nếu domain gọi đến có trong danh sách allowedOrigins (hoặc là request không có origin như Postman)
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Cho phép gửi cookie nếu cần
};

app.use(cors(corsOptions)); // Sử dụng cors với cấu hình mới

// --- KẾT THÚC PHẦN CẤU HÌNH CORS ---
app.use(express.json())
app.use(express.urlencoded({ extended: true })); // Nếu gửi form-data
//API test
app.get('/', (req, res) => {
  res.send('API đang hoạt động!')
});

//Chạy server
const PORT = process.env.PORT || 5001
// Hàm để khởi động server
async function startServer() {
  // Đợi kết nối database thành công
  await connectToDatabase();

  // Sau khi có kết nối DB, mới bắt đầu lắng nghe request
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
}

// Gọi hàm để bắt đầu toàn bộ quá trình
startServer();

// Import routes
const animalsRoutes = require('./routes/animals')
const newsRoutes = require('./routes/news')
const projectsRoutes = require('./routes/projects')
const forestsRoutes = require('./routes/forests')
const contactRoutes = require('./routes/contact')
const authRoutes = require("./routes/auth");
const paymentRoutes = require('./routes/payment');


// Sử dụng routes
app.use('/api/animals', animalsRoutes)
app.use('/api/news', newsRoutes)
app.use('/api/projects', projectsRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/forests-map', forestsRoutes)
app.use("/api/auth", authRoutes);
app.use('/api/payment', paymentRoutes);