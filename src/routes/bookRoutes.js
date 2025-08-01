import express from "express";
import {
  createBook,
  getAllBooks,
  updateBook,
  deleteBook,
} from "../controllers/bookController.js";
import { protect } from "../middleware/authMiddleware.js"; 

const router = express.Router();

router.post("/",protect, createBook);
router.get("/",protect, getAllBooks);
router.put("/:id", protect,updateBook);
router.delete("/:id",protect, deleteBook);

export default router;
