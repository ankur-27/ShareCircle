import User from "../models/User.js";

/* =========================
   GET ALL USERS
========================= */
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   GET USERS BY ROLE
========================= */
export const getUsersByRole = async (req, res) => {
  try {
    const { role } = req.params;

    const users = await User.find({ role }).select("-password");

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   BLOCK / UNBLOCK USER
========================= */
export const toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.status = user.status === "active" ? "blocked" : "active";
    await user.save();

    res.json({
      message: `User ${user.status}`,
      status: user.status
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
