import User from "../models/User.js";

export const getCustomerProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("name email");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
/* =========================
   GET ALL AVAILABLE FOOD
========================= */
export const getFoodFeed = async (req, res) => {
  try {
    const donors = await User.find(
      {
        role: "donor",
        "foodDonations.status": "Available"
      },
      {
        name: 1,
        foodDonations: 1
      }
    );

    // Extract available food
    const foodFeed = [];

    donors.forEach(donor => {
      donor.foodDonations.forEach(food => {
        if (food.status === "Available") {
          foodFeed.push({
            donorName: donor.name,
            foodId: food._id,
            foodName: food.foodName,
            quantity: food.quantity,
            foodType: food.foodType,
            expiry: food.expiry,
            address: food.address,
            phone: food.phone,
            note: food.note,
            createdAt: food.createdAt
          });
        }
      });
    });

    res.json(foodFeed);
  } catch (error) {
    console.error("Food feed error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
/* =========================
   CUSTOMER VIEW PROVIDERS
========================= */
export const getProviders = async (req, res) => {
  try {
    const providers = await User.find(
      { role: "provider", "services.0": { $exists: true } },
      {
        name: 1,
        profile: 1,
        services: 1,
        ratings: 1
      }
    );

    const providerList = [];

    providers.forEach(provider => {
      const avgRating =
        provider.ratings.length > 0
          ? (
              provider.ratings.reduce((a, b) => a + b.rating, 0) /
              provider.ratings.length
            ).toFixed(1)
          : "0.0";

      provider.services.forEach(service => {
        if (service.active) {
          providerList.push({
            providerId: provider._id,
            providerName: provider.name,
            serviceId: service._id,
            serviceTitle: service.title,
            category: service.description || "General",
            price: service.basePrice || 0,
            area: provider.profile?.area || "",
            district: provider.profile?.district || "",
            rating: avgRating
          });
        }
      });
    });

    res.json({
      count: providerList.length,
      providers: providerList
    });
  } catch (error) {
    console.error("Provider Fetch Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};