import nodemailer from "nodemailer";

export async function sendPasswordResetEmail(email, token) {
  const transporter = nodemailer.createTransport({
    service: "gmail", // Ou tout autre service
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Réinitialisation de mot de passe",
    text: `Voici votre code de réinitialisation : ${token}`,
  };

  await transporter.sendMail(mailOptions);
}
