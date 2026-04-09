import { promises as fs } from "fs";
import path from "path";

export type PortionOption = {
  portionType: string;
  unitPrice: number;
};

export type ProductItem = {
  id: string;
  name: string;
  description?: string;
  portionOptions: PortionOption[];
  image?: string;
  active?: boolean;
};

export type PricingData = Record<string, ProductItem>;

export type PackageItem = {
  id: string;
  name: string;
  description: string;
  items: string;
  emoji: string;
  price: number;
};

export type CatalogData = {
  products: ProductItem[];
  packages: PackageItem[];
};

const catalogPath = path.join(process.cwd(), "data", "catalog.json");

function normalizeCatalog(catalog: CatalogData): CatalogData {
  return {
    ...catalog,
    products: catalog.products.map((product) => ({
      ...product,
      active: product.active ?? true,
    })),
  };
}

export async function readCatalog(): Promise<CatalogData> {
  const raw = await fs.readFile(catalogPath, "utf8");
  return normalizeCatalog(JSON.parse(raw) as CatalogData);
}

export async function writeCatalog(catalog: CatalogData) {
  await fs.writeFile(catalogPath, `${JSON.stringify(normalizeCatalog(catalog), null, 2)}\n`, "utf8");
}

export function toPricingData(products: ProductItem[]): PricingData {
  return products.reduce<PricingData>((acc, product) => {
    acc[product.id] = product;
    return acc;
  }, {});
}