import express from "express";
import {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
} from "../controllers/reviewController.js";
import { protect } from "../middleware/authMiddleware.js"; 



const router = express.Router();

router.post("/",protect, createReview);
router.get("/",protect, getAllReviews);
router.get("/:id",protect, getReviewById);
router.put("/:id",protect, updateReview);
router.delete("/:id",protect, deleteReview);

export default router;
