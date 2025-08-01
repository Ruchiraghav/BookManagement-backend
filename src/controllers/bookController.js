import { Books } from "../models/books.models.js";

export const createBook = async (req, res) => {
  try {
    const book = new Books(req.body);

    await book.save();

    res.status(201).json(book);
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAllBooks = async (req, res) => {
  try {
    
    const books = await Books.find().populate("genre");

    res.json(books);
  } catch (error) {
    console.error("Error getting books:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedBook = await Books.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(updatedBook);
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBook = await Books.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
