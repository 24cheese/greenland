const dbPool = require('../db');

// Lấy tất cả tin tức
exports.getAllNews = async (req, res) => {
  try {
    const [rows] = await dbPool.query("SELECT * FROM `news` ORDER BY date DESC");
    res.json(rows);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
  }
};

// Lấy tin tức theo ID
exports.getNewsById = async (req, res) => {
  try {
    const [rows] = await dbPool.query("SELECT * FROM `news` WHERE id = ?", [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Không tìm thấy tin tức" });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching news by id:', error);
    res.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
  }
};

// Thêm mới tin tức
exports.createNews = async (req, res) => {
  const { title, author, date, content, thumbnail } = req.body;
  try {
    const [result] = await dbPool.query(
      "INSERT INTO `news` (title, author, date, content, thumbnail) VALUES (?, ?, ?, ?, ?)",
      [title, author, date, content, thumbnail]
    );
    res.status(201).json({
      id: result.insertId,
      title,
      author,
      date,
      content,
      thumbnail,
    });
  } catch (error) {
    console.error('Error creating news:', error);
    res.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
  }
};

// Cập nhật tin tức
exports.updateNews = async (req, res) => {
  const { title, author, date, content, thumbnail } = req.body;
  try {
    const [result] = await dbPool.query(
      "UPDATE `news` SET title = ?, author = ?, date = ?, content = ?, thumbnail = ? WHERE id = ?",
      [title, author, date, content, thumbnail, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Không tìm thấy tin tức để cập nhật' });
    }
    res.json({ message: 'Cập nhật tin tức thành công' });
  } catch (error) {
    console.error('Error updating news:', error);
    res.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
  }
};

// Xóa tin tức
exports.deleteNews = async (req, res) => {
  try {
    const [result] = await dbPool.query("DELETE FROM `news` WHERE id = ?", [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Không tìm thấy tin tức để xóa' });
    }
    res.json({ message: 'Xóa tin tức thành công' });
  } catch (error) {
    console.error('Error deleting news:', error);
    res.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
  }
};