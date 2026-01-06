import User from "../models/User.js";

/* =========================
   GET PROVIDER PROFILE
========================= */
export const getProfile = async (req, res) => {
  try {
    const provider = await User.findById(req.user.id).select("-password");

    if (!provider || provider.role !== "provider") {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json(provider);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   UPDATE PROVIDER PROFILE
========================= */
export const updateProfile = async (req, res) => {
  try {
    const provider = await User.findById(req.user.id);

    if (!provider || provider.role !== "provider") {
      return res.status(403).json({ message: "Access denied" });
    }

    provider.profile = {
      ...provider.profile,
      ...req.body
    };

    await provider.save();

    res.json({
      message: "Profile updated successfully",
      profile: provider.profile
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   GET PROVIDER AVAILABILITY
========================= */
export const getAvailability = async (req, res) => {
  try {
    const provider = await User.findById(req.user.id);

    if (!provider || provider.role !== "provider") {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json(provider.availability || {});
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   UPDATE PROVIDER AVAILABILITY
========================= */
export const updateAvailability = async (req, res) => {
  try {
    const provider = await User.findById(req.user.id);

    if (!provider || provider.role !== "provider") {
      return res.status(403).json({ message: "Access denied" });
    }

    provider.availability = {
      ...provider.availability,
      ...req.body
    };

    await provider.save();

    res.json({
      message: "Availability updated successfully",
      availability: provider.availability
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   GET PROVIDER SERVICES
========================= */
export const getServices = async (req, res) => {
  try {
    const provider = await User.findById(req.user.id);

    if (!provider || provider.role !== "provider") {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json({
      services: provider.services || []
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   ADD PROVIDER SERVICE
========================= */
export const addService = async (req, res) => {
  try {
    const provider = await User.findById(req.user.id);

    if (!provider || provider.role !== "provider") {
      return res.status(403).json({ message: "Access denied" });
    }

    provider.services.push(req.body);
    await provider.save();

    res.status(201).json({
      message: "Service added successfully"
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   UPDATE PROVIDER SERVICE
========================= */
export const updateService = async (req, res) => {
  try {
    const provider = await User.findById(req.user.id);
    const service = provider.services.id(req.params.serviceId);

    Object.assign(service, req.body);
    await provider.save();

    res.json({ message: "Service updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   TOGGLE SERVICE STATUS
========================= */
export const toggleServiceStatus = async (req, res) => {
  try {
    const provider = await User.findById(req.user.id);
    const service = provider.services.id(req.params.serviceId);

    service.active = !service.active;
    await provider.save();

    res.json({ active: service.active });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   DELETE PROVIDER SERVICE
========================= */
export const deleteService = async (req, res) => {
  try {
    const provider = await User.findById(req.user.id);

    provider.services = provider.services.filter(
      s => s._id.toString() !== req.params.serviceId
    );

    await provider.save();

    res.json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
/* =========================
   PROVIDER DASHBOARD STATS
========================= */
export const getDashboardStats = async (req, res) => {
  try {
    const provider = await User.findById(req.user.id);

    if (!provider || provider.role !== "provider") {
      return res.status(403).json({ message: "Access denied" });
    }

    // Active services count
    const activeServices = provider.services.filter(s => s.active).length;

    // Total earnings
    const totalEarnings = provider.wallet?.totalEarned || 0;

    // This month earnings
    const currentMonth = new Date().getMonth();
    const thisMonthEarnings = provider.bookings
      .filter(b => {
        const bookingDate = new Date(b.createdAt);
        return bookingDate.getMonth() === currentMonth && b.status === "Completed";
      })
      .length * 500; // demo logic (can replace later)

    // Average rating
    const totalRatings = provider.ratings.reduce((sum, r) => sum + r.rating, 0);
    const avgRating =
      provider.ratings.length > 0
        ? (totalRatings / provider.ratings.length).toFixed(1)
        : "0.0";

    // Recent bookings (last 5)
    const recentBookings = provider.bookings
      .slice(-5)
      .reverse();

    res.json({
      totalEarnings,
      thisMonthEarnings,
      activeServices,
      avgRating,
      recentBookings
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
/* =========================
   ADD PROVIDER RATING
========================= */
export const addProviderRating = async (req, res) => {
  try {
    const { providerId, customerName, rating, review } = req.body;

    if (!providerId || !rating) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const provider = await User.findById(providerId);

    if (!provider || provider.role !== "provider") {
      return res.status(404).json({ message: "Provider not found" });
    }

    provider.ratings.push({
      customerName,
      rating,
      review
    });

    await provider.save();

    res.status(201).json({
      message: "Rating submitted successfully"
    });
  } catch (error) {
    console.error("Rating error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
/* =========================
   GET PROVIDER RATINGS
========================= */
export const getProviderRatings = async (req, res) => {
  try {
    const provider = await User.findById(req.user.id);

    if (!provider || provider.role !== "provider") {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json({
      ratings: provider.ratings || []
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
