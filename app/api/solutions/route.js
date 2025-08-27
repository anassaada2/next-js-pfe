import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import solution from "@/models/solution";

export async function GET() {
  await connectToDatabase();
  const solutions = await solution.find({}, { name: 1 }); // juste les noms

  return NextResponse.json(solutions);
}
