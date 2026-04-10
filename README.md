# Güler Doğadan

Doğal köy ürünleri sipariş ve paket yönetimi için Next.js tabanlı web uygulaması.

## GitHub üzerinden canlı katalog güncelleme

Canlı ortamda `data/catalog.json` yazılamadığı için admin panelde değişiklik yapmak için GitHub API kullanılır.

Aşağıdaki ortam değişkenlerini ayarlaman gerekir:

- `GITHUB_TOKEN` — GitHub kişisel erişim belirteci (repo erişimi olmalı)
- `GITHUB_REPO_OWNER` — `crumbellabackery`
- `GITHUB_REPO_NAME` — `Guler-Dogadan`
- `GITHUB_BRANCH` — isteğe bağlı, varsayılan `main`

Admin panelde ürün eklediğinde veya fiyat değiştirdiğinde bu değişiklik GitHub üzerindeki `data/catalog.json` dosyasına yazılır.

# Guler-Dogadan
