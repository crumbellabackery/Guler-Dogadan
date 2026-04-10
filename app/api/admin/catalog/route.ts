import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, isValidAdminSession } from "@/lib/admin-auth";
import { readCatalog, writeCatalog, type CatalogData } from "@/lib/catalog";

async function ensureAdmin() {
  const cookieStore = await cookies();
  const sessionValue = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  return isValidAdminSession(sessionValue);
}

export async function GET() {
  if (!(await ensureAdmin())) {
    return Response.json({ error: "Yetkisiz" }, { status: 401 });
  }

  const catalog = await readCatalog();
  return Response.json(catalog);
}

export async function PUT(request: Request) {
  if (!(await ensureAdmin())) {
    return Response.json({ error: "Yetkisiz" }, { status: 401 });
  }

  let body: CatalogData;

  try {
    body = (await request.json()) as CatalogData;
  } catch {
    return Response.json({ error: "Geçersiz JSON" }, { status: 400 });
  }

  if (!Array.isArray(body.products) || !Array.isArray(body.packages)) {
    return Response.json({ error: "Gecersiz veri" }, { status: 400 });
  }

  try {
    await writeCatalog(body);
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof Error
            ? `Dosyaya yazılamadı: ${error.message}`
            : "Dosyaya yazılamadı.",
      },
      { status: 500 },
    );
  }

  return Response.json({ success: true });
}