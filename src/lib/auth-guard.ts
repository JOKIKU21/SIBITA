import { getServerSession } from "@/lib/auth-server";
import { redirect } from "next/navigation";

/**
 * Require a specific role to access a page/layout.
 * If the user is not authenticated, they will be redirected to /masuk.
 * If their role does not match, they will be redirected to their own dashboard.
 */
export async function requireRole(allowedRole: string) {
  const session = await getServerSession();

  if (!session) {
    redirect("/masuk");
  }

  if (session.user.role !== allowedRole) {
    const rolePaths: Record<string, string> = {
      student: "/dashboard/mahasiswa",
      lecturer: "/dashboard/dosen",
      admin: "/dashboard/admin",
      superadmin: "/dashboard/superadmin",
    };
    const targetPath = rolePaths[session.user.role] || "/dashboard/mahasiswa";
    redirect(targetPath);
  }

  return session;
}
