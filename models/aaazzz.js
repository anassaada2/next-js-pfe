import mongoose from "mongoose";
const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  avantages: [
    {
      titre: { type: String, required: true },
      description: { type: String, required: true },
    },
  ],
  images: [
    {
      type: String,
    },
  ],
  ecarteur: { type: String },
  specifications: [
    {
      label: { type: String },
      value: { type: String },
    },
  ],
  dessinTechnique: {
    sectionBlocs: String,
    sectionDalle: String,
  },
  pdf: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pdf",
  },
  processusInstallation: [
    {
      etape: { type: Number },
      titre: { type: String },
      description: { type: String },
    },
  ],
  certifications: [
    {
      title: { type: String, required: true },
      description: { type: String, required: true },
    },
  ],
  saviezVous: { type: String },
});

export default mongoose.models.Service ||
  mongoose.model("Service", serviceSchema);
