import User from "../models/User.js";

/* =========================
   GET DONOR PROFILE
========================= */
export const getDonorProfile = async (req, res) => {
  try {
    const donor = await User.findById(req.user.id).select("-password");

    if (!donor || donor.role !== "donor") {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json(donor);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   UPDATE DONOR PROFILE
========================= */
export const updateDonorProfile = async (req, res) => {
  try {
    const donor = await User.findById(req.user.id);

    if (!donor || donor.role !== "donor") {
      return res.status(403).json({ message: "Access denied" });
    }

    donor.profile = { ...donor.profile, ...req.body };
    await donor.save();

    res.json({ message: "Profile updated successfully" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   DONATE FOOD (FIXED)
========================= */
export const donateFood = async (req, res) => {
  try {
    const donor = await User.findById(req.user.id);
    if (!donor || donor.role !== "donor") {
      return res.status(403).json({ message: "Access denied" });
    }

    const {
      foodName,
      quantity,
      foodType,
      expiry,
      address,
      phone,
      note
    } = req.body;

    // 🔒 Validation (VERY IMPORTANT)
    if (!foodName || !quantity || !expiry || !address || !phone) {
      return res.status(400).json({ message: "All required fields missing" });
    }

    donor.foodDonations.push({
      foodName,
      quantity,
      foodType,
      expiry,
      address,
      phone,
      note
    });

    await donor.save();

    res.status(201).json({
      message: "Food donated successfully",
      foodDonations: donor.foodDonations
    });
  } catch (error) {
    console.error("Donate Food Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


/* =========================
   GET MY DONATIONS
========================= */
export const getMyDonations = async (req, res) => {
  try {
    const donor = await User.findById(req.user.id);

    if (!donor || donor.role !== "donor") {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json({
      donations: donor.foodDonations || []
    });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   DONOR DASHBOARD
========================= */
export const getDonorDashboard = async (req, res) => {
  try {
    const donor = await User.findById(req.user.id);

    const total = donor.foodDonations.length;
    const available = donor.foodDonations.filter(f => f.status === "Available").length;
    const collected = donor.foodDonations.filter(f => f.status === "Collected").length;
    const expired = donor.foodDonations.filter(f => f.status === "Expired").length;

    res.json({
      total,
      available,
      collected,
      expired
    });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   CUSTOMER FOOD FEED
========================= */
export const getFoodFeed = async (req, res) => {
  try {
    const donors = await User.find({ role: "donor" });

    const foods = donors.flatMap(d =>
      (d.foodDonations || []).filter(f => f.status === "Available")
    );

    res.json({ foods });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   CLAIM FOOD
========================= */
export const claimFood = async (req, res) => {
  try {
    const { donorId, foodId } = req.body;

    const donor = await User.findById(donorId);
    const food = donor.foodDonations.id(foodId);

    food.status = "Collected";
    await donor.save();

    res.json({ message: "Food claimed successfully" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};
