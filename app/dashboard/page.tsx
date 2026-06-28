// app/profile/page.tsx (Server Component)
import { getSession } from "@/lib/auth-client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await getSession({
    fetchOptions: {
      headers: Object.fromEntries(await headers()), // forward cookies
    },
  });

  if (!session?.data) redirect("/login");

  return <div>Server-side: {session.data.user.email}</div>;
}