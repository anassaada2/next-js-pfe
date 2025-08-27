import { NextResponse } from "next/server";
import { PinataSDK } from "pinata";

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT,
  pinataGateway: process.env.NEXT_PUBLIC_GATEWAY_URL,
});

const extractCID = (url) => {
  const parts = url.split("/");
  return parts[parts.length - 1];
};

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  try {
    const cid = extractCID(url);
    const response = await pinata.files.public.list().cid(cid);

    if (!response?.files || response.files.length === 0) {
      return NextResponse.json(
        { error: "No file found for the provided CID" },
        { status: 404 }
      );
    }

    const fileName = response.files[0].name; // Extract the 'name' property
    console.log("File name:", fileName);
    return NextResponse.json({ fileName }, { status: 200 });
  } catch (error) {
    console.error("Error fetching Pinata file:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
