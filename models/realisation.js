import mongoose from "mongoose";

const realisationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    brief: {
      type: String,
    },
    year: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const Realisation =
  mongoose.models.Realisation || mongoose.model("Realisation", realisationSchema);

export default Realisation;
