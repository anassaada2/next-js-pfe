import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "@/models/user";
import PasswordReset from "@/models/PasswordReset";
import { connectToDatabase } from "@/lib/db";

export async function POST(req) {
  await connectToDatabase();

  try {
    const { token, password, confirmPassword } = await req.json();

    if (!token) {
      return NextResponse.json({ error: "Token manquant" }, { status: 400 });
    }

    if (!password || password !== confirmPassword) {
      return NextResponse.json(
        { error: "Les mots de passe ne correspondent pas ou sont manquants" },
        { status: 400 }
      );
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return NextResponse.json(
        { error: "Token invalide ou expiré" },
        { status: 401 }
      );
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    user.password = await bcrypt.hash(password, 12);
    await user.save();

    // Supprimer le token de réinitialisation après usage
    await PasswordReset.deleteMany({ userId: user._id });

    return NextResponse.json({
      message: "Mot de passe réinitialisé avec succès",
    });
  } catch (error) {
    console.error("Erreur serveur:", error);
    return NextResponse.json(
      { error: "Erreur lors de la réinitialisation du mot de passe" },
      { status: 500 }
    );
  }
}
