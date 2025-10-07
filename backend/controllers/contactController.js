require('dotenv').config();
const dbPool = require('../db');
const nodemailer = require('nodemailer');

// Cấu hình một lần để tái sử dụng
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD, // Nên dùng App Password của Google
  },
});

// Gửi email yêu cầu xác nhận
exports.sendContactVerification = async (req, res) => {
  const { firstName, lastName, email, message } = req.body;

  if (!firstName || !lastName || !email || !message) {
    return res.status(400).json({ error: 'Vui lòng điền đầy đủ thông tin' });
  }

  try {
    const tokenData = { firstName, lastName, email, message };
    const token = Buffer.from(JSON.stringify(tokenData)).toString('base64');

    // Sửa lỗi nghiêm trọng: Lấy URL backend từ biến môi trường
    const backendUrl = process.env.BACKEND_URL || `http://localhost:5001`;
    const confirmLink = `${backendUrl}/api/contact/confirm?token=${token}`;

    const mailOptions = {
      from: `"GreenLand" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Xác nhận yêu cầu liên hệ từ GreenLand',
      html: `
        <p>Xin chào ${firstName} ${lastName},</p>
        <p>Cảm ơn bạn đã liên hệ với GreenLand. Vui lòng xác nhận bằng cách bấm vào liên kết sau:</p>
        <p><a href="${confirmLink}" style="color: green; font-weight: bold;">Xác nhận liên hệ</a></p>
        <p>Nếu bạn không thực hiện hành động này, vui lòng bỏ qua email.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: 'Email xác nhận đã được gửi. Vui lòng kiểm tra hộp thư của bạn.' });

  } catch (error) {
    console.error('❌ Lỗi gửi email:', error);
    res.status(500).json({ error: 'Gửi email thất bại' });
  }
};

// Xác nhận và lưu liên hệ vào DB
exports.confirmContact = async (req, res) => {
  const { token } = req.query;
  if (!token) return res.status(400).send('Thiếu token xác nhận');

  try {
    const json = Buffer.from(token, 'base64').toString('utf-8');
    const { firstName, lastName, email, message } = JSON.parse(json);

    const query = 'INSERT INTO `contacts` (first_name, last_name, email, message) VALUES (?, ?, ?, ?)';
    await dbPool.query(query, [firstName, lastName, email, message]);

    res.send(`<div style="font-family: Arial, sans-serif; text-align: center; padding-top: 50px;">
                <h2 style="color: #28a745;">✅ Xác nhận thành công!</h2>
                <p>Cảm ơn bạn. Chúng tôi đã nhận được thông tin và sẽ phản hồi sớm nhất có thể.</p>
             </div>`);

  } catch (err) {
    console.error('❌ Lỗi token hoặc CSDL:', err);
    return res.status(400).send('❌ Token không hợp lệ hoặc đã có lỗi xảy ra.');
  }
};

// Lấy tất cả liên hệ
exports.getAllContacts = async (req, res) => {
  try {
    const [rows] = await dbPool.query('SELECT * FROM `contacts`');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
  }
};

// Gửi email phản hồi (hàm này đã dùng async/await sẵn, giữ lại và tối ưu)
exports.sendEmail = async (req, res) => {
  const { to, subject, content } = req.body;

  if (!to || !subject || !content) {
    return res.status(400).json({ message: "Thiếu thông tin gửi email" });
  }

  try {
    const mailOptions = {
      from: `"GreenLand Support" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: content,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: "Email đã được gửi thành công" });

  } catch (error) {
    console.error('Error sending reply email:', error);
    res.status(500).json({ message: "Lỗi khi gửi email" });
  }
};