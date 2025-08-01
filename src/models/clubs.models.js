import mongoose from "mongoose";

const clubSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    owner: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    genre: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Genre",
      },
    ],
    clubCode: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true, 
  }
);

export const Clubs = mongoose.model("Clubs", clubSchema);