import { NextResponse } from "next/server";
import { Resend } from "resend";
import twilio from "twilio";
import jwt from "jsonwebtoken";
import User from "@/models/user";
import PasswordReset from "@/models/PasswordReset";
import { connectToDatabase } from "@/lib/db";

const resend = new Resend(process.env.RESEND_API_KEY);
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export async function POST(req) {
  await connectToDatabase();

  try {
    const { email, phone } = await req.json();

    if (!email && !phone) {
      return NextResponse.json(
        { error: "Email ou téléphone requis" },
        { status: 400 }
      );
    }

    if (email) {
      // Traitement par email
      const user = await User.findOne({ email });
      if (!user) {
        return NextResponse.json(
          { error: "Aucun compte associé à cet email" },
          { status: 404 }
        );
      }

      const token_reset = jwt.sign(
        { userId: user._id.toString() },
        process.env.JWT_SECRET,
        { expiresIn: "15m" }
      );

      // Enregistrement du token en DB
      await PasswordReset.create({
        userId: user._id,
        code: token_reset,
        expiresAt: new Date(Date.now() + 15 * 60 * 1000),
      });

      // Envoi de l'email
      const resetLink = `${process.env.NEXTAUTH_URL}/auth/reset-password/${token_reset}`;
      await resend.emails.send({
        from: "AFEC <onboarding@resend.dev>",
        to: email,
        subject: "Réinitialisation de mot de passe",
        html: `
          <h2>Réinitialisation de mot de passe</h2>
          <p>Cliquez sur le lien ci-dessous pour réinitialiser votre mot de passe :</p>
          <a href="${resetLink}" style="display: inline-block; padding: 12px 24px; background-color: #2563eb; color: white; text-decoration: none; border-radius: 4px;">Réinitialiser le mot de passe</a>
          <p style="margin-top: 24px; color: #6b7280;">Ce lien expirera dans 15 minutes.</p>
        `,
      });

      return NextResponse.json(
        { message: "Email envoyé avec succès" },
        { status: 200 }
      );
    } else {
      // Traitement par SMS
      const user = await User.findOne({ phone });
      if (!user) {
        return NextResponse.json(
          { error: "Aucun compte associé à ce numéro" },
          { status: 404 }
        );
      }

      const code = Math.floor(100000 + Math.random() * 900000);

      // Stocker le code en base
      await PasswordReset.create({
        userId: user._id,
        code: code.toString(),
        expiresAt: new Date(Date.now() + 15 * 60 * 1000),
      });

      await twilioClient.messages.create({
        body: `Votre code de réinitialisation AFEC : ${code}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phone,
      });

      return NextResponse.json({
        message: "SMS envoyé avec succès",
        phone: encodeURIComponent(phone),
      });
    }
  } catch (error) {
    console.error("Erreur serveur:", error);
    return NextResponse.json(
      { error: "Erreur lors du traitement de la demande" },
      { status: 500 }
    );
  }
}
