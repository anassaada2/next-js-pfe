import { NextResponse } from "next/server";
import PasswordReset from "@/models/PasswordReset";
import User from "@/models/user";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "@/lib/db";

export async function POST(req) {
  await connectToDatabase();

  try {
    const { phone, code } = await req.json();

    if (!phone || !code) {
      return NextResponse.json(
        { error: "Téléphone et code requis" },
        { status: 400 }
      );
    }

    const resetRecord = await PasswordReset.findOne({
      code: code.toString(),
      expiresAt: { $gt: new Date() },
    });

    if (!resetRecord) {
      return NextResponse.json(
        { error: "Code invalide ou expiré" },
        { status: 400 }
      );
    }

    // Générer un JWT après validation du code
    const token_reset = jwt.sign(
      { userId: resetRecord.userId.toString() },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    return NextResponse.json({ token_reset }, { status: 200 });
  } catch (error) {
    console.error("Erreur serveur:", error);
    return NextResponse.json(
      { error: "Erreur lors de la validation du code" },
      { status: 500 }
    );
  }
}
