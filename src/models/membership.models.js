import mongoose from "mongoose";

const membershipSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    club: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Clubs",
      required: true
    },
    validUpto: {
      type: Number, // months
      required: true
    },
    expiresAt: {
      type: Date,
      required: true
    }
  },
  { timestamps: true }
);


membershipSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const Membership = mongoose.model("Membership", membershipSchema);
