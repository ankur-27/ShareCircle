import express from "express";
import { protect } from "../middleware/authMiddleware.js";

import {
  getDonorProfile,
  updateDonorProfile,
  donateFood,
  getMyDonations,
  getDonorDashboard,
  getFoodFeed,
  claimFood
} from "../controllers/donorController.js";

const router = express.Router();

/* PROFILE */
router.get("/profile", protect(["donor"]), getDonorProfile);
router.put("/profile", protect(["donor"]), updateDonorProfile);

/* DONATE FOOD */
router.post("/donate", protect(["donor"]), donateFood);

/* MY DONATIONS */
router.get("/my-donations", protect(["donor"]), getMyDonations);

/* DASHBOARD */
router.get("/dashboard", protect(["donor"]), getDonorDashboard);

/* CUSTOMER FOOD FEED */
router.get("/food-feed", getFoodFeed);

/* CUSTOMER CLAIM FOOD */
router.post("/claim-food", protect(["customer"]), claimFood);

export default router;
