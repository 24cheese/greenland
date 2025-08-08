require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

//Kết nối CSDL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error('❌ Lỗi kết nối DB:', err);
  } else {
    console.log('✅ Kết nối MySQL thành công!');
  }
});

//API đơn giản test
app.get('/', (req, res) => {
  res.send('✅ API đang hoạt động!');
});

//Chạy server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});

// Import routes
const animalsRoutes = require('./routes/animals');

// Sử dụng routes
app.use('/api/animals', animalsRoutes);

//API GET tất cả bài báo
app.get('/api/news', (req, res) => {
  const query = 'SELECT * FROM news ORDER BY date DESC';
  db.query(query, (err, results) => {
    if (err) {
      console.error('❌ Lỗi truy vấn:', err);
      return res.status(500).json({ error: 'Lỗi truy vấn CSDL' });
    }
    res.json(results);
  });
});

//API Chi tiết bài báo
app.get('/api/news/:slug', (req, res) => {
  const slug = req.params.slug;
  const query = 'SELECT * FROM news WHERE slug = ? LIMIT 1';

  db.query(query, [slug], (err, results) => {
    if (err) {
      console.error('❌ Lỗi truy vấn slug:', err);
      return res.status(500).json({ error: 'Lỗi truy vấn CSDL' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Không tìm thấy bài viết' });
    }
    res.json(results[0]);
  });
});

// API POST lưu thông tin liên hệ
app.post('/api/contact', (req, res) => {
  const { firstName, lastName, email, message } = req.body;

  const query = 'INSERT INTO contacts (first_name, last_name, email, message) VALUES (?, ?, ?, ?)';
  db.query(query, [firstName, lastName, email, message], (err, result) => {
    if (err) {
      console.error('❌ Lỗi lưu liên hệ:', err);
      return res.status(500).json({ error: 'Không thể lưu thông tin liên hệ' });
    }
    res.json({ success: true, message: 'Liên hệ đã được gửi thành công' });
  });
});

// ✅ Gửi mail xác nhận liên hệ
app.post('/api/contact/verify', (req, res) => {
  const { firstName, lastName, email, message } = req.body;
  if (!firstName || !lastName || !email || !message) {
    return res.status(400).json({ error: 'Vui lòng điền đầy đủ thông tin' });
  }

  const tokenData = { firstName, lastName, email, message };
  const token = Buffer.from(JSON.stringify(tokenData)).toString('base64');
  const confirmLink = `http://localhost:${process.env.PORT || 5001}/api/contact/confirm?token=${token}`;

  // Gửi email xác nhận
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,       // email của bạn
      pass: process.env.EMAIL_PASSWORD,   // mật khẩu ứng dụng (App Password)
    },
  });

  const mailOptions = {
    from: `"GreenLand" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Xác nhận liên hệ GreenLand',
    html: `
      <p>Xin chào ${firstName} ${lastName},</p>
      <p>Bạn đã gửi yêu cầu liên hệ với GreenLand. Vui lòng xác nhận bằng cách bấm vào liên kết sau:</p>
      <a href="${confirmLink}">Xác nhận liên hệ</a>
      <p>Nếu bạn không thực hiện hành động này, vui lòng bỏ qua email.</p>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('❌ Lỗi gửi email:', error);
      return res.status(500).json({ error: 'Gửi email thất bại' });
    }
    res.json({ message: 'Đã gửi email xác nhận' });
  });
});

// ✅ API xác nhận liên hệ → lưu vào DB
app.get('/api/contact/confirm', (req, res) => {
  const token = req.query.token;
  if (!token) return res.status(400).send('Thiếu token xác nhận');

  try {
    const json = Buffer.from(token, 'base64').toString('utf-8');
    const data = JSON.parse(json);
    const { firstName, lastName, email, message } = data;

    const query = 'INSERT INTO contacts (first_name, last_name, email, message) VALUES (?, ?, ?, ?)';
    db.query(query, [firstName, lastName, email, message], (err) => {
      if (err) {
        console.error('❌ Lỗi khi lưu contact:', err);
        return res.status(500).send('Lỗi khi lưu thông tin liên hệ');
      }

      res.send(`<h2 style="color:green">✅ Xác nhận thành công!</h2><p>Chúng tôi đã nhận được thông tin của bạn.</p>`);
    });
  } catch (err) {
    console.error('❌ Token không hợp lệ:', err);
    return res.status(400).send('❌ Token không hợp lệ');
  }
});

console.log('🧪 EMAIL_USER:', process.env.EMAIL_USER);
console.log('🧪 EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD ? 'Đã có mật khẩu' : '❌ Chưa có');

// app.get('/api/animals', (req, res) => {
//   const query = 'SELECT * FROM animals';
//   db.query(query, (err, results) => {
//     if (err) {
//       console.error('❌ Lỗi truy vấn động vật:', err);
//       return res.status(500).json({ error: 'Lỗi truy vấn CSDL' });
//     }
//     res.json(results);
//   });
// });

app.get('/api/projects', (req, res) => {
  const query = 'SELECT * FROM projects';
  db.query(query, (err, results) => {
    if (err) {
      console.error('❌ Lỗi truy vấn projects:', err);
      return res.status(500).json({ error: 'Lỗi truy vấn CSDL' });
    }
    res.json(results);
  });
});

app.get('/api/projects/:slug', (req, res) => {
  const slug = req.params.slug;
  const query = 'SELECT * FROM projects WHERE slug = ? LIMIT 1';
  db.query(query, [slug], (err, results) => {
    if (err) return res.status(500).json({ error: 'Lỗi truy vấn CSDL' });
    if (results.length === 0) return res.status(404).json({ error: 'Không tìm thấy dự án' });
    res.json(results[0]);
  });
});

//API GET tất cả rừng
app.get('/api/forests-map', (req, res) => {
  const query = 'SELECT * FROM forests';
  db.query(query, (err, results) => {
    if (err) {
      console.error('❌ Lỗi truy vấn:', err);
      return res.status(500).json({ error: 'Lỗi truy vấn CSDL' });
    }
    res.json(results);
  });
});