// pages/api/track-visitor.js
import { connectToDatabase } from "@/lib/db";
import Visitor from "@/models/Visitor";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await connectToDatabase();
      const { ip, path, visitedAt } = req.body;
      const session = await getSession({ req });
      const userId = session?.user?.id || null;

      let visitor = await Visitor.findOne({ ip, sessionEnd: null });

      if (!visitor) {
        visitor = await Visitor.create({
          ip,
          userId,
          visitedPages: [{ path, visitedAt }],
        });
      } else {
        visitor.visitedPages.push({ path, visitedAt });
        await visitor.save();
      }

      return res.status(200).json({ visitorId: visitor._id });
    } catch (error) {
      console.error("Error in track-visitor:", error);
      return res.status(500).json({ error: "Failed to track visitor" });
    }
  }
  return res.status(405).json({ error: "Method not allowed" });
}