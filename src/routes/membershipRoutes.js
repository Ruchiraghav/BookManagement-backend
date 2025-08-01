import express from "express";
import {
  createMembership,
  getAllMemberships,
  getMembershipById,
  updateMembership,
  deleteMembership,
} from "../controllers/membershipController.js";
import { protect } from "../middleware/authMiddleware.js"; 


const router = express.Router();


router.post("/",protect, createMembership);
router.get("/",protect, getAllMemberships);
router.get("/:id",protect, getMembershipById);
router.put("/:id",protect, updateMembership);
router.delete("/:id",protect, deleteMembership);

export default router;
