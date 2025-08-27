import { NextResponse } from "next/server";
import { pinata } from "@/utils/config";

export async function POST(request) {
  try {
    const data = await request.formData();
    const file = data.get("file");

    // Vérification du type MIME
    const mimeType = file.type;
    const isPDF = mimeType === "application/pdf";
    const isImage = mimeType.startsWith("image/");

    if (!isPDF && !isImage) {
      return NextResponse.json(
        { error: "Only PDF or image files are allowed." },
        { status: 400 }
      );
    }

    const { cid } = await pinata.upload.public.file(file);
    const url = await pinata.gateways.public.convert(cid);

    return NextResponse.json({ url }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
