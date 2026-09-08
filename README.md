# TEMUR STUDIO

Tasarım, yazılım ve dijital deneyimi bir arada üreten creative technology studio sitesi.

- Ana sayfa (`/`)
- Proje talep formu (`/start-project`)
- Form gönderimleri e-posta ile iletilir (`POST /api/project-inquiries`)

## Geliştirme

```bash
npm install
cp .env.example .env
npm run dev
```

Uygulama varsayılan olarak `http://localhost:3005` adresinde açılır.

## Yapı

```
server/     Express API + Vite middleware (geliştirme)
shared/     İstemci ve sunucunun ortak şema / tipleri
src/
  pages/                    Rotalar
  features/project-inquiry  Çok adımlı proje formu
  components/layout         Header, footer, sayfa geçişi
  components/sections       Ana sayfa bölümleri
  components/ui             Paylaşılan UI parçaları
  config/                   Site sabitleri
```

## Production

```bash
npm run build
npm start
```

SMTP ve `TEMUR_INQUIRY_TO_EMAIL` değerlerini `.env` içinde tanımlayın. Yerelde e-posta yoksa `VITE_PROJECT_INQUIRY_MOCK=true` ile gönderimi simüle edebilirsiniz.

## Kontroller

```bash
npm test
npm run lint
npm run build
```

Yayında `VITE_PROJECT_INQUIRY_MOCK` değerini `false` tutun. `npm start`, sunucuyu otomatik olarak üretim modunda başlatır.
