// models/Pdf.js
import mongoose from "mongoose";

const PdfSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Pdf || mongoose.model("Pdf", PdfSchema);
