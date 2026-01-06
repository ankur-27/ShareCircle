import express from "express";
import { protect } from "../middleware/authMiddleware.js"; // ✅ ADD THIS
import { getCustomerProfile } from "../controllers/customerController.js";

const router = express.Router();

/* CUSTOMER PROFILE */
router.get("/profile", protect(["customer"]), getCustomerProfile);

export default router;
