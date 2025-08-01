
import { Genre } from "../models/genres.models.js";
export const createGenre = async (req, res) => {
  try {
    const { name } = req.body;
    const genre = new Genre({ name });
    await genre.save();
    res.status(201).json({ success: true, message: "Genre created", genre });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getGenres = async (req, res) => {
  try {
    const genres = await Genre.find().sort({ name: 1 });
    res.status(200).json({ success: true, genres });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getGenreById = async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).json({ success: false, message: "Genre not found" });
    res.status(200).json({ success: true, genre });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};


export const updateGenre = async (req, res) => {
  try {
    const { name } = req.body;
    const genre = await Genre.findByIdAndUpdate(req.params.id, { name }, { new: true });
    if (!genre) return res.status(404).json({ success: false, message: "Genre not found" });
    res.status(200).json({ success: true, message: "Genre updated", genre });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};


export const deleteGenre = async (req, res) => {
  try {
    const genre = await Genre.findByIdAndDelete(req.params.id);
    if (!genre) return res.status(404).json({ success: false, message: "Genre not found" });
    res.status(200).json({ success: true, message: "Genre deleted" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

