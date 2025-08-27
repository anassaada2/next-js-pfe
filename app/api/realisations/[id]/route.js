import { NextResponse } from "next/server";

import Realisation from "@/models/realisation";
import { connectToDatabase } from "@/lib/db";

export async function PUT(req, { params }) {
  const { id } = await params;
  const data = await req.json();

  try {
    await connectToDatabase();

    await Realisation.findByIdAndUpdate(id, {
      title: data.title,
      brief: data.brief,
      year: data.year || null,
    });

    return NextResponse.json({ message: "Realisation updated" });
  } catch (error) {
    console.error("PUT realisation error:", error);
    return NextResponse.json({ message: "Error updating realisation" }, { status: 500 });
  }
}
