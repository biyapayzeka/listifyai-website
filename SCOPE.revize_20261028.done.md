# SCOPE — Web sitesi revize yayını (2026-10-28)

Kurucu onayı: "herşeyi tamamla ve yayınla" (2026-10-28).

- [x] Açık kalanları kapat: EN düğmesi kaldırıldı (işlevsizdi); video yerel assets/ dosyasından (aynı alan adı); pcn tek değere (web_hero) döndü
- [x] Görselleri assets/site/ altına taşı, tüm yolları kök göreli yap (66 yol, 0 eksik)
- [x] Mevcut canlı sayfayı index.prev-20261028.html olarak sakla
- [x] Revizeyi index.html yap; sitemap lastmod güncelle; robots.txt yedekleri ve redesigns/ klasörünü kapattı
- [x] Yerel doğrulama: 66 statik + 27 JS görsel yolu, 0 eksik; konsol hatası 0; masaüstü + mobil ekran görüntüsü kontrol edildi
- [x] critic denetimi: 0 BLOCKER, 1 MAJOR (noscript Pixel geri eklendi), 2 MINOR (ScrollTrigger koşulu, www hostname regex) — üçü de düzeltildi
- [x] Commit + push (main, GitHub Pages): cd31fe2
- [x] Canlı doğrulama: index 200 / 56 KB, görseller-video-AASA-robots 200; Pixel fbevents + config canlı alanda yükleniyor. PageView akışı headless'ta görünmez (bilinen) — Events Manager / Graph stats ile birkaç saat içinde teyit edilmeli
- [x] Geri alma yolu: `git revert cd31fe2 && git push origin main` (eski sayfa ayrıca index.prev-20261028.html olarak duruyor)
