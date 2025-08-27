import { NextResponse } from "next/server";
import Service from "@/models/service";
import { connectToDatabase } from "@/lib/db";

export async function PUT(req, { params }) {
  const { id } = params;
  const data = await req.json();

  await connectToDatabase();

  await Service.findByIdAndUpdate(id, {
    icon: data.icon,
    title: data.title,
    brief:data.brief,
    description: data.description,
    animation: data.animation,
  });

  return NextResponse.json({ message: "Service updated" });
}
