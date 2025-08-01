import { Clubs } from "../models/clubs.models.js";
import { Books } from "../models/books.models.js";
import { Genre } from "../models/genres.models.js";
import { Membership } from "../models/membership.models.js";



function generateClubCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

export const createClub = async (req, res) => {
  const { name, genre, clubCode } = req.body;
  const ownerId = req.user._id; // This is the owner of the club

  try {
    // Check if the club name or code already exists
    const existingClub = await Clubs.findOne({ $or: [{ name }, { clubCode }] });

    if (existingClub) {
      return res.status(400).json({ message: "A club with this name or code already exists." });
    }

    // Create a new club with the owner's ID and the provided data
    const newClub = new Clubs({
      name,
      owner: ownerId, // Associate the club with the logged-in user
      genre, // The array of genre IDs from the frontend
      clubCode,
    });

    await newClub.save();

    res.status(201).json({
      message: "Club created successfully!",
      club: newClub,
    });
  } catch (error) {
    console.error("Error creating club:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const getAllClubs = async (req, res) => {
  try {
    const clubs = await Clubs.find().populate("genre");
    res.json(clubs);
  } catch (error) {
    console.error("Error getting clubs:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const getClubBooks = async (req, res) => {
  try {
    const club = await Clubs.findById({
      _id: req.params.id,
      users: req.user._id
    })
      .populate("users")
      .populate("genre");

    if (!club) return res.status(404).json({ message: "Club not found" });

    const books = await Books.find({
      genre: { $in: club.genre },
    }).populate("genre");

    res.json({ club, books });
  } catch (error) {
    console.error("Error getting club books:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const updateClub = async (req, res) => {
  try {
    const { id } = req.params;

     const club = await Clubs.findOne({  users: req.user._id });
    if (!club) {
      return res.status(403).json({ message: "Unauthorized or club not found" });
    }

    const updatedClub = await Clubs.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate("users")
      .populate("genre");

    if (!updatedClub) {
      return res.status(404).json({ message: "Club not found" });
    }

    res.status(200).json(updatedClub);
  } catch (error) {
    console.error("Error updating club:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteClub = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedClub = await Clubs.findByIdAndDelete({
       _id: id,
      users:req.user._id
    });

    if (!deletedClub) {
      return res.status(404).json({ message: "Club not found" });
    }

    res.status(200).json({ message: "Club deleted successfully" });
  } catch (error) {
    console.error("Error deleting club:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



export const joinClubByCode = async (req, res) => {
  try {
    const { clubCode } = req.body;

    if (!clubCode) {
      return res.status(400).json({ message: "Club code is required" });
    }

    const club = await Clubs.findOne({ clubCode });
    if (!club) {
      return res.status(404).json({ message: "Invalid club code" });
    }

    const alreadyJoined = await Membership.findOne({
      user: req.user._id,
      club: club._id,
    });

    if (alreadyJoined) {
      return res.status(400).json({ message: "Already a member of this club" });
    }

    const membership = new Membership({
      user: req.user._id,
      club: club._id,
    });

    await membership.save();

    res.status(200).json({ message: "Successfully joined the club", club });
  } catch (error) {
    console.error("Error joining club:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

