import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getProviderBookings,
  updateBookingStatus
} from "../controllers/providerBookingController.js";

const router = express.Router();

/* PROVIDER BOOKINGS */
router.get(
  "/bookings",
  protect(["provider"]),
  getProviderBookings
);

router.put(
  "/bookings/:bookingId",
  protect(["provider"]),
  updateBookingStatus
);

export default router;
