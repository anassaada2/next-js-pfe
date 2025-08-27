"use client";
import { useEffect } from "react";
import { getOrCreateAnonUserId } from "@/utils/userId";
import { useSession } from "next-auth/react"; // seulement si tu utilises NextAuth

export default function AnalyticsUserId() {
  const { data: session } = useSession();

  useEffect(() => {
    let userId;

    if (session?.user?.id) {
      // 👤 utilisateur loggé
      userId = session.user.id;
    } else {
      // 👤 visiteur anonyme
      userId = getOrCreateAnonUserId();
    }

    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("set", { user_id: userId });
    }
  }, [session]);

  return null; // pas d'affichage
}
