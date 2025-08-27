import { v4 as uuidv4 } from "uuid";

export function getOrCreateAnonUserId() {
  if (typeof window === "undefined") return null;

  let anonId = localStorage.getItem("anon_user_id");
  if (!anonId) {
    anonId = uuidv4();
    localStorage.setItem("anon_user_id", anonId);
  }
  return anonId;
}
