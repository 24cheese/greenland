const dbPool = require('../db');

// Lấy tất cả dự án
exports.getAllProjects = async (req, res) => {
  try {
    const query = 'SELECT * FROM `projects`';
    const [rows] = await dbPool.query(query);
    res.json(rows);
  } catch (error) {
    console.error('❌ Lỗi khi lấy danh sách dự án:', error);
    res.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
  }
};

// Lấy dự án theo ID
exports.getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await dbPool.query("SELECT * FROM `projects` WHERE id = ?", [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Không tìm thấy dự án" });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('❌ Lỗi khi lấy dự án theo ID:', error);
    res.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
  }
};

// Thêm dự án
exports.createProject = async (req, res) => {
  try {
    const { title, description, image_url, progress, goal } = req.body;
    const [result] = await dbPool.query(
      "INSERT INTO `projects` (title, description, image_url, progress, goal) VALUES (?, ?, ?, ?, ?)",
      [title, description, image_url, progress, goal]
    );
    res.status(201).json({
      id: result.insertId,
      title,
      description,
      image_url,
      progress,
      goal,
    });
  } catch (error) {
    console.error('❌ Lỗi khi thêm dự án:', error);
    res.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
  }
};

// Cập nhật dự án
exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image_url, progress, goal } = req.body;
    const [result] = await dbPool.query(
      "UPDATE `projects` SET title = ?, description = ?, image_url = ?, progress = ?, goal = ? WHERE id = ?",
      [title, description, image_url, progress, goal, id] // Đã sửa lỗi thiếu id
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Không tìm thấy dự án để cập nhật' });
    }
    res.json({ message: 'Cập nhật dự án thành công' });
  } catch (error) {
    console.error('❌ Lỗi khi cập nhật dự án:', error);
    res.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
  }
};

// Xóa dự án
exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await dbPool.query("DELETE FROM `projects` WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Không tìm thấy dự án để xóa' });
    }
    res.json({ message: 'Xóa dự án thành công' });
  } catch (error) {
    console.error('❌ Lỗi khi xóa dự án:', error);
    res.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
  }
};