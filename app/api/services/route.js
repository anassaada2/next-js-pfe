import { NextResponse } from "next/server";
import Service from "@/models/service";
import { connectToDatabase } from "@/lib/db";

export async function POST(req) {
  const body = await req.json();
  await connectToDatabase();

  const newService = new Service({
    icon: body.icon,
    title: body.title,
        brief:body.brief,
    
    description: body.description,
    animation: body.animation,
  });

  await newService.save();

  return NextResponse.json({ message: "Service created" }, { status: 201 });
}
