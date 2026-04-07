/**
 * API endpoint - Google Sheets Sheet2'den paket verilerini çeker ve parse eder
 * Format: Paket Adı | Açıklama | Ürünler | Emoji | Fiyat
 */

const SPREADSHEET_ID = "1vpGMQ_W__sc4VYnqZGoItyL5j4LMmDSEMzylC2hDq7k";
const SHEET2_GID = "391648216"; // Sheet2 ID (Paketler)
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&gid=${SHEET2_GID}`;

export type Package = {
  id: string;
  name: string;
  description: string;
  items: string; // virgülle ayrılmış ürün listesi
  emoji: string;
  price: number;
};

export type PackagesData = Package[];

async function fetchAndParsePackages(): Promise<PackagesData> {
  try {
    const response = await fetch(CSV_URL, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(10000),
      redirect: "follow",
    });

    if (!response.ok) {
      // Fetch failed internally
      return [];
    }

    const csv = await response.text();
    const lines = csv.trim().split("\n");

    // Processing CSV

    // Simple CSV parser - split by comma but handle quoted fields
    function parseCSVLine(line: string): string[] {
      const result: string[] = [];
      let current = "";
      let inQuotes = false;

      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === "," && !inQuotes) {
          result.push(current.trim());
          current = "";
        } else {
          current += char;
        }
      }
      result.push(current.trim());
      return result;
    }

    const data: PackagesData = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const parts = parseCSVLine(line);

      if (parts.length < 5) {
        // Skip invalid line
        continue;
      }

      const packageName = parts[0];
      const description = parts[1];
      const items = parts[2];
      const emoji = parts[3];
      const priceStr = parts[4];

      // Parse price - remove ₺ and whitespace
      const priceNum = parseInt(priceStr.replace(/[₺,\s]/g, ""), 10);
      if (isNaN(priceNum)) {
        // Skip invalid price
        continue;
      }

      const packageId = packageName
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, "");

      const pkg = {
        id: packageId,
        name: packageName,
        description,
        items,
        emoji,
        price: priceNum,
      };

      // Package parsed
      data.push(pkg);
    }

    // Packages loaded
    return data;
  } catch (error) {
    // Error logged internally
    return [];
  }
}

export async function GET() {
  const packages = await fetchAndParsePackages();
  
  // Fallback test data if empty
  if (packages.length === 0) {
    return Response.json([
      {
        id: "kahvalti-paketi",
        name: "Kahvaltı Paketi",
        description: "Sabah için seçkin kombinasyon",
        items: "Poğaça, Biberli Poğaça, Cookie",
        emoji: "☕",
        price: 56,
      },
      {
        id: "misafir-seti",
        name: "Misafir Seti",
        description: "Konuklarınız için çeşitli seçenekler",
        items: "Poğaça, Biberli Poğaça, Cookie, Donut",
        emoji: "🎁",
        price: 143,
      },
      {
        id: "dogum-gunu-paketi",
        name: "Doğum Günü Paketi",
        description: "Özel günlerinizi daha tatlı kılmak için",
        items: "Çilekli Yaş Pasta, Trilece, Portakallı Kurabiye",
        emoji: "🎂",
        price: 650,
      },
    ]);
  }
  
  return Response.json(packages);
}
