import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    icon: { type: String, required: true },
    title: { type: String, required: true, trim: true },
    brief: { type: String, required: true },
    description: { type: String, required: true },
    animation: { type: Number, default: 500 },
  },
  { timestamps: true }
);

const Service =
  mongoose.models.Service || mongoose.model("Service", serviceSchema);

export default Service;
