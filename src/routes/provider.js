import express from "express";
import { protect } from "../middleware/authMiddleware.js";

import {
  // PROFILE
  getProfile,
  updateProfile,

  // AVAILABILITY
  getAvailability,
  updateAvailability,

  // SERVICES (STEP-3)
  getServices,
  addService,
  updateService,
  toggleServiceStatus,
  deleteService,
  getDashboardStats,
  addProviderRating,
  getProviderRatings
} from "../controllers/providerController.js";

const router = express.Router();

/* ======================
   PROVIDER PROFILE
====================== */
router.get("/profile", protect(["provider"]), getProfile);
router.put("/profile", protect(["provider"]), updateProfile);

/* ======================
   PROVIDER AVAILABILITY
====================== */
router.get("/availability", protect(["provider"]), getAvailability);
router.put("/availability", protect(["provider"]), updateAvailability);

/* ======================
   PROVIDER SERVICES
====================== */
router.get("/services", protect(["provider"]), getServices);

router.post("/services", protect(["provider"]), addService);

router.put(
  "/services/:serviceId",
  protect(["provider"]),
  updateService
);

router.patch(
  "/services/:serviceId/status",
  protect(["provider"]),
  toggleServiceStatus
);

router.delete(
  "/services/:serviceId",
  protect(["provider"]),
  deleteService
);
/* PROVIDER DASHBOARD */
router.get(
  "/dashboard",
  protect(["provider"]),
  getDashboardStats
);
/* ======================
   PROVIDER RATINGS
====================== */

// Customer adds rating
router.post("/ratings", addProviderRating);

// Provider views ratings
router.get(
  "/ratings",
  protect(["provider"]),
  getProviderRatings
);


export default router;
