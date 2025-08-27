import mongoose from "mongoose";

const ProjetSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true,
  },
  taches: [
    {
      type: String,
    }
  ]
});

export default mongoose.models.Projet ||
  mongoose.model("Projet", ProjetSchema);
