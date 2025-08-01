import { Review } from "../models/review.models.js";
import { User } from "../models/user.models.js";
import { Books } from "../models/books.models.js";


export const createReview = async (req, res) => {
  try {
    const { user, book, comment, rating } = req.body;

    if (!user || !book || !comment || !rating) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const [foundUser, foundBook] = await Promise.all([
      User.findById(user),
      Books.findById(book),
    ]);

    if (!foundUser || !foundBook) {
      return res.status(404).json({ message: "User or Book not found" });
    }

    const newReview = new Review({ user, book, comment, rating });
    await newReview.save();

    res.status(201).json(newReview);
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("user", "username")
      .populate("book", "title");

    res.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate("user", "username")
      .populate("book", "title");

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.json(review);
  } catch (error) {
    console.error("Error fetching review:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const updateReview = async (req, res) => {
  try {
    const { comment, rating } = req.body;

    const updated = await Review.findByIdAndUpdate(
      req.params.id,
      { comment, rating },
      { new: true, runValidators: true }
    )
      .populate("user", "username")
      .populate("book", "title");

    if (!updated) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.json(updated);
  } catch (error) {
    console.error("Error updating review:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete review
export const deleteReview = async (req, res) => {
  try {
    const deleted = await Review.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
