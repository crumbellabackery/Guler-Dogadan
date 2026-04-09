import { readCatalog } from "@/lib/catalog";

export async function GET() {
  const catalog = await readCatalog();
  return Response.json(catalog.packages);
}
