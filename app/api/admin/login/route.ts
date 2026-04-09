import { cookies } from "next/headers";
import {
  ADMIN_COOKIE_NAME,
  createAdminSessionValue,
  validateAdminPassword,
} from "@/lib/admin-auth";

export async function POST(request: Request) {
  const body = (await request.json()) as { password?: string };

  if (!body.password || !validateAdminPassword(body.password)) {
    return Response.json({ error: "Hatalı şifre" }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, createAdminSessionValue(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });

  return Response.json({ success: true });
}