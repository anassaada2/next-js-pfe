import { PinataSDK } from "pinata";

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT,
});

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const cid = searchParams.get("cid");

  if (!cid) {
    return new Response(JSON.stringify({ error: "CID is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const files = await pinata.files.public.list().cid(cid);
    return new Response(JSON.stringify({ exists: !!files }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Pinata error:", error);
    return new Response(JSON.stringify({ error: "Failed to check file" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
