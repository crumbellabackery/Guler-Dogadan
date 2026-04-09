import { readCatalog, toPricingData } from "@/lib/catalog";

export async function GET() {
  const catalog = await readCatalog();
  return Response.json(toPricingData(catalog.products.filter((product) => product.active !== false)));
}
