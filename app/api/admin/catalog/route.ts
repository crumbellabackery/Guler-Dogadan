import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, isValidAdminSession } from "@/lib/admin-auth";
import { readCatalog, writeCatalog, writeCatalogToGitHub, type CatalogData } from "@/lib/catalog";

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

  const useGitHub =
    Boolean(process.env.GITHUB_TOKEN) &&
    Boolean(process.env.GITHUB_REPO_OWNER) &&
    Boolean(process.env.GITHUB_REPO_NAME);

  try {
    if (useGitHub) {
      await writeCatalogToGitHub(body);
    } else {
      await writeCatalog(body);
    }
  } catch (error) {
    if (
      error instanceof Error &&
      /(EROFS|read-only file system|EACCES|EPERM)/i.test(error.message)
    ) {
      return Response.json(
        {
          error:
            "Canlı ortamda dosya sistemine yazılamıyor. Ürünleri data/catalog.json içinde elle güncellemeniz ve yeniden deploy etmeniz gerekiyor.",
        },
        { status: 503 },
      );
    }

    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Dosyaya yazılamadı.",
      },
      { status: 500 },
    );
  }

  return Response.json({ success: true });
}