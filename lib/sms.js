import twilio from "twilio";

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

export async function sendPasswordResetSMS(phone, token) {
  await client.messages.create({
    body: `Votre code de réinitialisation est : ${token}`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: phone,
  });
}
