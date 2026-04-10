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

type GitHubRepoConfig = {
  owner: string;
  repo: string;
  token: string;
  branch: string;
};

function getGitHubRepoConfig(): GitHubRepoConfig | null {
  const owner = process.env.GITHUB_REPO_OWNER;
  const repo = process.env.GITHUB_REPO_NAME;
  const token = process.env.GITHUB_TOKEN;
  if (!owner || !repo || !token) {
    return null;
  }

  return {
    owner,
    repo,
    token,
    branch: process.env.GITHUB_BRANCH ?? "main",
  };
}

async function getGitHubFileSha(path: string, config: GitHubRepoConfig) {
  const response = await fetch(
    `https://api.github.com/repos/${config.owner}/${config.repo}/contents/${encodeURIComponent(path)}?ref=${encodeURIComponent(config.branch)}`,
    {
      headers: {
        Authorization: `Bearer ${config.token}`,
        Accept: "application/vnd.github+json",
      },
    },
  );

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new Error(
      `GitHub içerik okuma hatası: ${response.status} ${response.statusText} ${errorBody?.message ?? ""}`.trim(),
    );
  }

  const data = (await response.json()) as { sha?: string };
  if (!data.sha) {
    throw new Error("GitHub dosya SHA değeri bulunamadı.");
  }

  return data.sha;
}

export async function writeCatalogToGitHub(catalog: CatalogData) {
  const config = getGitHubRepoConfig();
  if (!config) {
    throw new Error("GitHub bağlantısı için GITHUB_REPO_OWNER, GITHUB_REPO_NAME ve GITHUB_TOKEN ayarlanmalı.");
  }

  const filePath = "data/catalog.json";
  const sha = await getGitHubFileSha(filePath, config);
  const content = Buffer.from(`${JSON.stringify(normalizeCatalog(catalog), null, 2)}\n`, "utf8").toString("base64");

  const response = await fetch(`https://api.github.com/repos/${config.owner}/${config.repo}/contents/${encodeURIComponent(filePath)}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${config.token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: "Update catalog from admin panel",
      content,
      sha,
      branch: config.branch,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new Error(
      `GitHub yazma hatası: ${response.status} ${response.statusText} ${errorBody?.message ?? ""}`.trim(),
    );
  }
}

export function toPricingData(products: ProductItem[]): PricingData {
  return products.reduce<PricingData>((acc, product) => {
    acc[product.id] = product;
    return acc;
  }, {});
}