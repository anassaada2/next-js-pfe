import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Realisation from "@/models/realisation";

export async function POST(req) {
  try {
    const body = await req.json();
    await connectToDatabase();

    const newRealisation = new Realisation({
      title: body.title,
      brief: body.brief,
      year: body.year || null,
    });

    await newRealisation.save();

    return NextResponse.json({ message: "Realisation created" }, { status: 201 });
  } catch (error) {
    console.error("POST realisation error:", error);
    return NextResponse.json({ message: "Error creating realisation" }, { status: 500 });
  }
}
