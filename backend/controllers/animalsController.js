// Import pool kết nối từ file db.js
const dbPool = require('../db');

// Lấy tất cả động vật
exports.getAllAnimals = async (req, res) => {
  try {
    const [rows] = await dbPool.query('SELECT * FROM `animals`');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching animals:', error);
    res.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
  }
};

// Lấy 1 động vật theo id
exports.getAnimalById = async (req, res) => {
  try {
    const [rows] = await dbPool.query('SELECT * FROM `animals` WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Không tìm thấy động vật' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching animal by id:', error);
    res.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
  }
};

// Thêm động vật
exports.createAnimal = async (req, res) => {
  const { name, image_url, link, red_list, red_level } = req.body;
  try {
    await dbPool.query(
      'INSERT INTO `animals` (name, image_url, link, red_list, red_level) VALUES (?, ?, ?, ?, ?)',
      [name, image_url, link, red_list, red_level]
    );
    res.status(201).json({ message: 'Thêm động vật thành công' });
  } catch (error) {
    console.error('Error creating animal:', error);
    res.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
  }
};

// Cập nhật động vật
exports.updateAnimal = async (req, res) => {
  const { name, image_url, link, red_list, red_level } = req.body;
  try {
    const [result] = await dbPool.query(
      'UPDATE `animals` SET name=?, image_url=?, link=?, red_list=?, red_level=? WHERE id=?',
      [name, image_url, link, red_list, red_level, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Không tìm thấy động vật để cập nhật' });
    }
    res.json({ message: 'Cập nhật thành công' });
  } catch (error) {
    console.error('Error updating animal:', error);
    res.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
  }
};

// Xóa động vật
exports.deleteAnimal = async (req, res) => {
  try {
    const [result] = await dbPool.query('DELETE FROM `animals` WHERE id=?', [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Không tìm thấy động vật để xóa' });
    }
    res.json({ message: 'Xóa thành công' });
  } catch (error) {
    console.error('Error deleting animal:', error);
    res.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
  }
};