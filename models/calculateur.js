// File: models/calculateur.js
import mongoose from "mongoose";

const CalculateurSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  telechargement: {
    type: Number,
    default: 0, // Compteur de téléchargements, initialisé à 0
  },
  views: {
    total: {
      type: Number,
      default: 0, // Compteur total de vues
    },
    users: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User", // Référence au modèle User
        },
        viewedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
});

export default mongoose.models.Calculateur ||
  mongoose.model("Calculateur", CalculateurSchema);
