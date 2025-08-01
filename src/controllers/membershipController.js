
import { Membership } from "../models/membership.models.js";


export const createMembership = async (req, res) => {
  try {
    const { user, club, validUpto } = req.body;

    const existing = await Membership.findOne({ user, club });
    if (existing) return res.status(400).json({ message: "Membership already exists" });

    const now = new Date();
    const expiresAt = new Date(now.setMonth(now.getMonth() + validUpto));

    const membership = await Membership.create({
      user,
      club,
      validUpto,
      expiresAt
    });

    res.status(201).json(membership);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const getAllMemberships = async (req, res) => {
  try {
    const memberships = await Membership.find()
      .populate("user", "name email") // populate user fields
      .populate("club", "name description"); // populate club fields
    res.status(200).json(memberships);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getMembershipById = async (req, res) => {
  try {
    const membership = await Membership.findById(req.params.id)
      .populate("user", "name email")
      .populate("club", "name description");

    if (!membership) return res.status(404).json({ message: "Membership not found" });

    res.status(200).json(membership);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateMembership = async (req, res) => {
  try {
    const { user, club } = req.body;

    const membership = await Membership.findByIdAndUpdate(
      req.params.id,
      { user, club },
      { new: true }
    );

    if (!membership) return res.status(404).json({ message: "Membership not found" });

    res.status(200).json(membership);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteMembership = async (req, res) => {
  try {
    const membership = await Membership.findByIdAndDelete(req.params.id);

    if (!membership) return res.status(404).json({ message: "Membership not found" });

    res.status(200).json({ message: "Membership deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


