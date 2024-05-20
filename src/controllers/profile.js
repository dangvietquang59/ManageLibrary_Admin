const User = require("../models/user");

const updateProfile = async (req, res) => {
  const { phoneNumber, address, fullName, userId } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { phoneNumber, address, fullName },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "Không tìm thấy người dùng" });
    }

    res.json(user);
  } catch (error) {
    console.error("Lỗi khi cập nhật thông tin người dùng:", error);
    res
      .status(500)
      .json({ error: "Đã xảy ra lỗi khi cập nhật thông tin người dùng" });
  }
};

module.exports = { updateProfile };
