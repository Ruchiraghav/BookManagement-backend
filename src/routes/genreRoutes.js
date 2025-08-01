
import express from "express";
import {
  createGenre,
  getGenres,
  getGenreById,
  updateGenre,
  deleteGenre,
} from "../controllers/genreController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/",protect, createGenre);
router.get("/",protect, getGenres);
router.get("/:id",protect, getGenreById);
router.put("/:id",protect, updateGenre);
router.delete("/:id",protect, deleteGenre);

export default router;


