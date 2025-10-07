const dbPool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Lấy SECRET_KEY từ biến môi trường để bảo mật hơn
const SECRET_KEY = process.env.JWT_SECRET || "ban-nen-thay-key-nay-trong-file-env";

// Đăng ký
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin." });
  }

  try {
    // 1. Kiểm tra xem email đã tồn tại chưa
    const [existingUsers] = await dbPool.query("SELECT * FROM `users` WHERE email = ?", [email]);

    if (existingUsers.length > 0) {
      return res.status(400).json({ message: "Email đã tồn tại." });
    }

    // 2. Băm mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Thêm người dùng mới vào CSDL
    await dbPool.query(
      "INSERT INTO `users` (name, email, password_hash) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    return res.status(201).json({ message: "Đăng ký thành công!" });

  } catch (error) {
    console.error('Error during registration:', error);
    return res.status(500).json({ message: "Lỗi máy chủ nội bộ." });
  }
};

// Đăng nhập
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Vui lòng nhập email và mật khẩu." });
  }

  try {
    // 1. Tìm người dùng bằng email
    const [users] = await dbPool.query("SELECT * FROM `users` WHERE email = ?", [email]);

    if (users.length === 0) {
      return res.status(401).json({ message: "Sai email hoặc mật khẩu." });
    }

    const user = users[0];
    
    // 2. So sánh mật khẩu đã nhập với mật khẩu đã băm trong CSDL
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({ message: "Sai email hoặc mật khẩu." });
    }

    // 3. Tạo JWT token nếu mật khẩu khớp
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      SECRET_KEY,
      { expiresIn: "1h" } // Token hết hạn sau 1 giờ
    );

    return res.json({
      message: "Đăng nhập thành công!",
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });

  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: "Lỗi máy chủ nội bộ." });
  }
};