# Vercel Yayınlama Notu

Bu proje Vercel'de iki parçadan oluşur:

- Vite çıktısı (`dist`): site ve istemci tarafı rotaları.
- `api/project-inquiries.ts`: proje talep formunun e-posta gönderim fonksiyonu.

`vercel.json`, SPA rotalarını `index.html` dosyasına yönlendirir. Vercel'in dosya tabanlı rota önceliği sayesinde `/api/project-inquiries` bu yönlendirmeden etkilenmeden fonksiyona ulaşır.

## Vercel ortam değişkenleri

Vercel proje ayarlarından aşağıdaki değerleri **Production** ortamına ekleyin:

- `TEMUR_INQUIRY_TO_EMAIL`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM`
- `VITE_PROJECT_INQUIRY_MOCK=false`

Parola veya SMTP bilgilerini repoya, `.env` dosyasına ya da sohbet mesajına eklemeyin. Preview dağıtımlarında gerçek e-posta göndermek istemiyorsanız yalnızca Preview ortamında `VITE_PROJECT_INQUIRY_MOCK=true` kullanılabilir.

## Yayın öncesi doğrulama

1. Vercel'e Git deposunu içe aktarın; framework ayarı `Vite` olarak algılanır.
2. Preview dağıtımında `/start-project` adresini doğrudan açın ve formu test edin.
3. Production alan adını bağlayıp aynı form testini yapın.
4. Vercel Firewall'da `/api/project-inquiries` için hız sınırlama kuralı açın. Sunucusuz fonksiyonlar yatay ölçeklendiği için uygulama içi bellek tabanlı hız sınırı tek başına yeterli değildir.
