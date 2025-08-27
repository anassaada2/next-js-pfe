import { NextResponse } from "next/server";
import { pinata } from "@/utils/config";

export async function POST(request) {
  try {
    const data = await request.formData();
    const file = data.get("file");

    // Vérification du type MIME pour Excel
    const mimeType = file.type;
    const isExcel =
      mimeType === "application/vnd.ms-excel" || // .xls
      mimeType ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"; // .xlsx

    if (!isExcel) {
      return NextResponse.json(
        { error: "Only Excel files are allowed (.xls or .xlsx)." },
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
