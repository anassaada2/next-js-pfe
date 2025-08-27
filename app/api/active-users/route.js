import { getActiveUsers, getActiveUsersForPage } from "@/lib/actions";


export async function GET() {
  const totalActiveUsers = await getActiveUsers();
  const activeUsersCalculateur = await getActiveUsersForPage("/calculateur");

  return Response.json({
    totalActiveUsers,
    activeUsersCalculateur,
  });
}
