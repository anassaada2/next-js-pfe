import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI; // Assure-toi que cette variable est bien définie dans .env

if (!MONGO_URI)
  throw new Error("Please define the MONGO_URI environment variable");

let isConnected = false; // Évite les connexions multiples

export async function connectToDatabase() {
  if (isConnected) {
    console.log("✅ Already connected to MongoDB");
    return;
  }

  try {
    const db = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = db.connections[0].readyState === 1;
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw new Error("Failed to connect to database");
  }
}
