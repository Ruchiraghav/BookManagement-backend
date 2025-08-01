
import express from "express";
import {
  createClub,
  getAllClubs,
  getClubBooks,
  updateClub,
  deleteClub,
} from "../controllers/clubController.js";
import { protect } from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/",protect, createClub);


router.get("/",protect, getAllClubs);


router.get("/:id",protect, getClubBooks);


router.put("/:id",protect, updateClub);


router.delete("/:id",protect,deleteClub);

export default router;

