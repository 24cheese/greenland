const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Chỉ cần require file db.js ở đây.
// Code bên trong db.js sẽ tự động chạy, tạo pool và kiểm tra kết nối.
require('./db.js');

const app = express();

// --- BẮT ĐẦU PHẦN CẤU HÌNH CORS ---
const allowedOrigins = [
  'http://localhost:3000',
  process.env.FRONTEND_URL
];
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));
// --- KẾT THÚC PHẦN CẤU HÌNH CORS ---

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API test
app.get('/', (req, res) => {
  res.send('API đang hoạt động!');
});

// Import routes (giữ nguyên)
const animalsRoutes = require('./routes/animals');
const newsRoutes = require('./routes/news');
const projectsRoutes = require('./routes/projects');
const forestsRoutes = require('./routes/forests');
const contactRoutes = require('./routes/contact');
const authRoutes = require("./routes/auth");
const paymentRoutes = require('./routes/payment');

// Sử dụng routes (giữ nguyên)
app.use('/api/animals', animalsRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/forests-map', forestsRoutes);
app.use("/api/auth", authRoutes);
app.use('/api/payment', paymentRoutes);

// Chạy server trực tiếp
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});