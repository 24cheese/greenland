const dbPool = require('../db');

// 📌 Lấy danh sách tất cả rừng
exports.getAllForests = async (req, res) => {
  try {
    const query = 'SELECT * FROM `forests` ORDER BY id DESC';
    const [rows] = await dbPool.query(query);
    res.json(rows);
  } catch (error) {
    console.error('❌ Lỗi khi lấy danh sách rừng:', error);
    res.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
  }
};

// 📌 Lấy chi tiết 1 rừng theo ID
exports.getForestById = async (req, res) => {
  const { id } = req.params;
  try {
    const query = 'SELECT * FROM `forests` WHERE id = ? LIMIT 1';
    const [rows] = await dbPool.query(query, [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Không tìm thấy rừng' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('❌ Lỗi khi lấy chi tiết rừng:', error);
    res.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
  }
};

// 📌 Thêm rừng mới
exports.createForest = async (req, res) => {
  const { name, lat, lng, square, description, info, image_url } = req.body;
  if (!name || !lat || !lng) {
    return res.status(400).json({ error: 'Vui lòng nhập đầy đủ tên và tọa độ' });
  }
  try {
    const query = 'INSERT INTO `forests` (name, lat, lng, square, description, info, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const [result] = await dbPool.query(query, [name, lat, lng, square, description, info, image_url]);
    res.status(201).json({ message: 'Thêm rừng thành công', id: result.insertId });
  } catch (error) {
    console.error('❌ Lỗi thêm rừng:', error);
    res.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
  }
};

// 📌 Cập nhật thông tin rừng
exports.updateForest = async (req, res) => {
  const { id } = req.params;
  const { name, lat, lng, square, description, info, image_url } = req.body;
  try {
    const query = 'UPDATE `forests` SET name=?, lat=?, lng=?, square=?, description=?, info=?, image_url=? WHERE id=?';
    const [result] = await dbPool.query(query, [name, lat, lng, square, description, info, image_url, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Không tìm thấy rừng để cập nhật' });
    }
    res.json({ message: 'Cập nhật rừng thành công' });
  } catch (error) {
    console.error('❌ Lỗi cập nhật rừng:', error);
    res.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
  }
};

// 📌 Xóa rừng
exports.deleteForest = async (req, res) => {
  const { id } = req.params;
  try {
    const query = 'DELETE FROM `forests` WHERE id = ?';
    const [result] = await dbPool.query(query, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Không tìm thấy rừng để xóa' });
    }
    res.json({ message: 'Xóa rừng thành công' });
  } catch (error) {
    console.error('❌ Lỗi xóa rừng:', error);
    res.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
  }
};