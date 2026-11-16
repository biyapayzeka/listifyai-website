# SCOPE — Çerez onayı + gizlilik sağlayıcı listesi + EN gizlilik (2026-11-16)

- [x] assets/js/consent.js: bağımlılıksız TR+EN banner; kabul = reddet eşit; tercih saklanır; Meta Pixel yalnız kabulden sonra
- [x] Kabul öncesi hiçbir facebook/connect isteği yok (noscript img dahil) — tüm sayfalar (index, en/index, privacy, kvkk, terms, support, yedek index*)
- [x] Lead tıklama ölçümü consent.js içine taşındı (yalnız onaylı)
- [x] Footer "Çerez tercihleri" / "Cookie preferences" bağlantısı (index, en/index, privacy, kvkk, terms, support, en/privacy)
- [x] Tracker sınıflandırması (Pixel, Singular sng.link, Google Fonts, cdnjs GSAP, GA yok) kaynakla — rapor
- [x] privacy-policy.html Bölüm 3 sağlayıcıları K9'a göre (Google, KIE, PiAPI, Replicate, OpenRouter, ElevenLabs; FASHN/Ideogram/fal düşer)
- [x] privacy-policy.html web çerezleri bölümü
- [x] kvkk.html 4.2 tablo sağlayıcıları K9'a göre + çerez satırı
- [x] en/privacy-policy.html (§10.3 tabanlı, TR ile tutarlı); en/index footer bağlantısı
- [x] Taslaklarda privacy@ → info@; K9 listesi taslaklara işlendi; app_links.dart privacyEmail notu (rapor)
- [x] TUTULAN: saklama metni, KVKK yurt dışı güvence metni, OpenRouter saklamama iddiası → TODO yorumları
- [x] (varsayılan) HTML doğrulama + headless ağ testi
- [x] (varsayılan) critic denetimi, BLOCKER düzeltme
- [x] (varsayılan) yalnız kendi dosyalarım commit, push yok, deploy yok
