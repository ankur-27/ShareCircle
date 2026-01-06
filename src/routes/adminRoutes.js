import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getAllUsers,
  getUsersByRole,
  toggleUserStatus
} from "../controllers/adminController.js";

const router = express.Router();

/* ADMIN ONLY */
router.get("/users", protect(["admin"]), getAllUsers);
router.get("/users/role/:role", protect(["admin"]), getUsersByRole);
router.patch("/users/:userId/status", protect(["admin"]), toggleUserStatus);

export default router;
