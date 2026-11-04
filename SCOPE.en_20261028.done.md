# SCOPE — Web sitesi EN dili (2026-10-28)

Kurucu: "işlevi olsun. en dili lazım. yapılsın eklensin".

- [x] /en/index.html: görünür metin + JS dizileri + head İngilizce (kalan Türkçe yalnız kişi/marka adları)
- [x] TR ↔ EN dil düğmesi iki sayfada gerçek link; mobil menüde English/Türkçe; 360px başlık kuralı
- [x] hreflang (tr, en, x-default) iki sayfada; canonical her sayfa kendine
- [x] Pixel guard /en/ yolunu kapsar (regex); Lead dinleyicisi EN'de de var
- [x] sitemap.xml /en/ eklendi
- [x] Yerel doğrulama: EN 72 yol + 27 JS id eksiksiz; Türkçe kalıntı yalnız ad/marka; iki sayfada konsol hatası 0, JSON-LD ve script sözdizimi geçerli; masaüstü + 390 + 360 px ekran görüntüsü
- [x] critic denetimi: 0 BLOCKER, 0 MAJOR, 1 MINOR (EN "4,7" → "4.7" düzeltildi); 2 MINOR(?) kabul edilmedi: göreli dil linkleri /en → /en/ 301 ile çalışıyor, yorumlar görünmez
- [x] Commit + push + canlı doğrulama: 55680a1 + 81fd476; /en → 301 → /en/ 200 (57 KB), TR düğmesi canlı, EN sayfada 75 görsel yüklendi, Pixel config yüklendi, sitemap /en/ içeriyor
- [x] Geri alma yolu: `git revert <bu commit> && git push origin main` (EN sayfası ve TR dil düğmesi birlikte geri gider)
