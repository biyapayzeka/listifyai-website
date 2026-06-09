# ListifyAI — "STÜDYO EVRENİ" flagship (interactive 3D, photo+video wall)

Direction chosen by client from a concept probe: the **interactive 3D content galaxy** (concept-3). Build it MUCH better and into a full, polished, mobile-clean landing page. Every word of copy is written below — use it verbatim (it's brand-tuned + factually verified). The 3D hero is the centerpiece; the rest of the page delivers the full feature story in the same premium-dark language.

THIS FILE + the verified feature/number/asset facts in `FLAGSHIP_SPEC.md` are the source of truth. Invent NOTHING beyond them.

---

## 0. VISION
An immersive, explorable 3D "galaxy" of the app's real output — a deep field of floating tiles, **mixed photo AND video**, drifting in dark space. The visitor drags/rotates/throws it (touch + cursor), tiles billboard toward camera, hovering/tapping a tile floats it forward, plays it (if video), and labels which feature produced it. It must feel like "the universe this one app can generate from a single photo." Premium, cinematic, techy-but-elegant — NOT a gimmick. Then the page continues into a complete, accurate feature story.

## 1. THE 3D HERO (the make-or-break — get this excellent)
- **Engine:** three.js (CDN). One scene, one renderer, one rAF loop. WebGL2 if available.
- **Layout:** a deep field / curved cylindrical shell / layered rings of tiles (NOT a flat grid). Real depth: near tiles large+sharp, far tiles small, fading into black via fog/vignette → infinite-galaxy feel. ~40–48 tiles desktop, ~18–24 mobile.
- **MIX PHOTO + VIDEO (client requirement):** a subset of tiles are live VIDEO (three.VideoTexture, muted loop playsinline), the rest are photos. Desktop: ≤6 video tiles playing at once; mobile: ≤2 (others show their poster frame). Only attach a VideoTexture / call play() for video tiles that are near the front / in view; pause the rest; pause all on `visibilitychange`/offscreen. This is essential for perf — do NOT play 12 videos at once.
- **Motion:** gentle continuous auto-drift/rotation; cursor parallax (desktop); drag + inertia/throw (pointer + touch). Tiles softly billboard to face camera. Hover/click → selected tile eases forward + scales up + plays (if video) + shows a feature label; neighbors dim slightly. A subtle grain + vignette + soft sage/gold rim light for mood.
- **Scroll handoff:** as the user scrolls out of the hero, the camera gently dollies into/through the field (or the field parts) and fades to the next section — a premium transition, not a hard cut. Keep it cheap.
- **Overlay UI (HTML on top of canvas):** top bar (wordmark + nav + CTA); a lower-left or centered headline block (copy below); the "sürükle · döndür · keşfet" hint near the wall; dual store badges; a "Keşfet ↓" scroll cue. Text must stay readable over the busy 3D (scrim/blur behind text).
- **Fallbacks:** no-WebGL OR `prefers-reduced-motion` OR Save-Data → a static, premium MIX grid (photos + video POSTERS, maybe 1 muted hero video) that still looks intentional. Loader with a hard timeout (~4.5s) so it never hangs; if textures fail, show the static grid.
- **MOBILE 3D rules:** must load + be draggable on a phone; fewer tiles, ≤2 videos (or poster-only). Canvas drag rotates the wall but MUST NOT trap page scroll — vertical scroll still scrolls the page (e.g. rotate on horizontal drag / dedicated gesture; or wall is a bounded zone). No horizontal overflow. `touch-action` set appropriately. Cap devicePixelRatio at 2.

## 2. FULL COPY DECK (Turkish — use verbatim; premium, confident, no flattery, no exclamation spam)
**Wordmark:** `listifyai` (the "ai" in sage).
**Nav:** Stüdyo · Moda · Video · E‑ticaret · Fiyat — CTA button: **Ücretsiz dene**

**HERO**
- Eyebrow: `AI MODA & E‑TİCARET STÜDYOSU`
- H1 (oversized, 2 lines): `Tek kare yükle.` / `Koca bir stüdyo evreni geri al.`
- Sub: `Ürününü ya da kıyafetini yükle — manken, sahne, video ve pazaryeri içeriği saniyeler içinde hazır. Çekim yok, ekip yok, stüdyo kirası yok.`
- Wall hint: `Sürükle · döndür · keşfet`
- CTA microcopy (under badges): `Hediye kredi ile başla · Kart yok · iOS & Android`
- Scroll cue: `Keşfet`
- Tile feature labels (show on hover/focus; map tiles to these): `Sanal Deneme` · `AI Lookbook` · `Kombin Modu` · `Editöryal Şablon` · `Kumaş → Kıyafet` · `Aksesuar Deneme` · `Stilist Çizimi` · `Moda Video` · `Ürün Çekim` · `Poz Değiştir` · `Hızlı Moda Video` · `Ürün Stüdyo`

**S2 — HUB'LAR**
- Eyebrow: `TEK UYGULAMA`
- Title: `Dört stüdyo. Tek cep.`
- Cards:
  - `Ürün Çekim` — `Tek çekimden 10 profesyonel ürün fotoğrafı, farklı sahnelerde.`
  - `Moda` — `11 araçlık moda stüdyosu — denemeden videoya, tek akışta.`
  - `Ürün Video` — `Sinematik hareket ve efektle özel ürün videosu.`
  - `Moda Video` — `Kıyafet fotoğrafından, 99+ şablonla profesyonel moda videosu.`

**S3 — MODA (11 araç)**
- Eyebrow: `MODA STÜDYOSU`
- Title: `Bir gardırop için ne lazımsa.`
- Tools (name — line):
  - `Sanal Deneme` — `Kıyafeti mevcut mankene giydir; yüz ve poz korunur, saniyeler içinde.`
  - `AI Lookbook` — `Tek ürün fotoğrafını gerçekçi AI mankene, çoklu poz ve sahnede.`
  - `Moda Stüdyosu` — `Tek kıyafetten lookbook; yüzü, sahneyi, pozu sen belirle.`
  - `Moda Video Şablon` — `99+ hazır video şablonu — manken ve sahne otomatik.`
  - `Aksesuar Deneme` — `Çanta, saat, küpe, kolye… 14 aksesuar tipi mankende.`
  - `Stilist Çizimi → Elbise` — `Tasarım eskizini giyilebilir kıyafete çevir.`
  - `Kumaş → Kıyafet` — `Kumaş dokusundan tam kıyafet tasarımı — ~15 saniye.`
  - `Editöryal Şablonlar` — `63 küratör sahnesi; ışık, poz, kompozisyon hazır.`
  - `Hızlı Moda Video` — `Tek fotoğraftan pro moda videosu — ~3 dakika, 5 fazlı pipeline.`
  - `Video Stüdyosu` — `Görselini özel prompt'la sinematik tanıtım videosuna.`
  - `AI Upscaler` — `Eski ya da sıkışık görseli 2K–4K'ya çıkar, detay kaybı yok.`
- Edit-tools strip (smaller): `Model Değiştir · Poz Değiştir · Arka Plan Değiştir · AI Model Oluştur · Hızlı Düzenleme`

**S4 — VİDEO EVRENİ**
- Eyebrow: `MODA VİDEO`
- Title: `99+ şablon. 15 saniyede podyum.`
- Sub: `Ürün → manken → sahne → müzik, tamamen otomatik. Reels ve TikTok için dikey, indirip paylaşmaya hazır.`

**S5 — SAHNELER**
- Eyebrow: `ÜRÜN STÜDYO`
- Title: `600+ sahne. Sınırsız atmosfer.`
- Sub: `Stüdyo beyazından sokağa, mermer holden sahile — ürünün her dünyada, tutarlı ışıkta.`

**S6 — E‑TİCARET**
- Eyebrow: `SATIŞA HAZIR`
- Title: `Tek üründen, ilana kadar.`
- Steps: `01 Çekim` → `02 Ürün Stüdyo — 600+ arka plan` → `03 Ürün İçeriği — SEO/GEO başlık, açıklama, anahtar kelime, SSS` → `04 Marketplace Export — 7 pazaryeri`
- Marketplaces line: `Trendyol · Shopify · Amazon · Etsy · Hepsiburada · N11 · WooCommerce`
- Disclaimer (must include): `Platforma özel hazır CSV/XLSX dosyası — doğrudan API bağlantısı değil.`

**S7 — UGC**
- Eyebrow: `UGC VİDEO`
- Title: `Senin yerine konuşan altı yüz.`
- Sub: `6 sanal AI sunucu avatarıyla, kamera karşısına geçmeden samimi tanıtım videosu. "Visia" AI yönetmen akışıyla özel ürün videosu da burada.`

**S8 — SAYILAR (count-up):** `500+ aktif satıcı` · `28 araç` · `99+ video şablonu` · `600+ sahne` · `4,7 store puanı`

**S9 — SOSYAL KANIT**
- Eyebrow: `KULLANICI SESİ`
- Title: `500+ satıcı. 4,7 yıldız.`
- Sub: `App Store ve Google Play'de 4,7 · 45 değerlendirme.`
- 5 testimonials — write realistic short Turkish reviews from KOBİ sellers (butik / atölye / Trendyol / Etsy / Shopify / Laleli toptan), confident tone, NO fake metrics, NO superlatives. Add a small note in-page: `Yorumlar örnek niteliğindedir.`

**S10 — FİYAT**
- Eyebrow: `PLANLAR`
- Title: `Her ölçeğe bir plan.`
- Tiers: `Starter` (yeni başlayan KOBİ) · `Pro` (EN POPÜLER — 4K + upscale, kalite modu, auto video + yüz referansı, öncelikli üretim kuyruğu) · `Creator` (yüksek hacim ve ekipler — maksimum aylık kredi, bulk export, kredi top-up). ⚠️ NO prices/credit numbers. Footnote: `Detaylı fiyatlandırma uygulamada · Hediye kredi ile ücretsiz dene · Ekip planı: info@listifyai.com.tr`

**S11 — SSS** (accordion, 6):
- `Nasıl çalışıyor? Teknik bilgi gerekiyor mu?` — `Hayır. Ürün ya da kıyafet fotoğrafını yükle, modülü seç, birkaç soruyu yanıtla — gerisini AI üretir.`
- `Sonuçlar gerçek çekim kalitesinde mi?` — `Sanal deneme, kombin, aksesuar, editoryal lookbook, kumaş vizyonu ve auto video dahil her modülde stüdyo kalitesinde sonuç üretiyoruz.`
- `Pazaryerlerine nasıl aktarıyorum?` — `Trendyol, Shopify, Amazon, Etsy, Hepsiburada, N11 ve WooCommerce için sütunları otomatik eşlenmiş CSV/XLSX dosyası verir; dosyayı indirip yüklersin. Doğrudan API bağlantısı değil.`
- `Fotoğraflarım nerede saklanıyor?` — `Görseller senin hesabına ait Firebase Storage'da şifreli tutulur ve model eğitiminde kullanılmaz.`
- `iOS ve Android'de aynı mı?` — `Evet. Tüm araçlar iki platformda da aynı; üretim sunucu tarafında, cihaz gücü fark etmez.`
- `Kaç araç var?` — `Tek uygulamada 28 araç: moda, e‑ticaret, video ve pazaryeri içeriği.`

**S12 — FINAL CTA**
- Title: `Stüdyon cebinde.`
- Sub: `Ücretsiz dene — kart yok, hediye kredi seni bekliyor.`
- Dual store badges.

**FOOTER:** wordmark + `AI moda & e‑ticaret stüdyosu.` · columns: Moda (Sanal Deneme, Kombin, Editöryal, Moda Video) / E‑ticaret (Ürün Çekim, Ürün Stüdyo, Ürün İçeriği, Marketplace Export) / Kurumsal (Gizlilik→privacy-policy.html, KVKK→kvkk.html, Şartlar→terms.html, Destek→support.html) / İletişim (info@listifyai.com.tr, listifyaiapp@gmail.com) · `© 2026 ListifyAI` · `iOS · ANDROID`.

## 3. BRAND / VISUAL
- Dark premium: base `#08080B`/`#0C0C10`, surfaces `#15151A`/`#1C1D22`, hairlines `rgba(245,245,240,0.08)`. Text `#F5F5F0` / variant `#9CA39C` / muted **`#8B918B`** (AA-safe — do NOT use #5F6560 for text). Accents sage `#9EB098` (+`#B8CDB0`), gold `#C9B88A`, rose `#E0A3A8` (sparing). Soft sage/gold radial glows, low-opacity grain.
- Font: **Alexandria** (variable 200–900) display+body; optional **JetBrains Mono** for technical eyebrows/labels. ≤2 families. Kinetic weight contrast in headlines.
- Numbers/decimals: Turkish comma ("4,7"). Tabular nums for stats.
- No generic AI tells (no purple SaaS gradient, no center-everything, no emoji icons, no flat type). Asymmetry + real imagery + restraint with bold 3D moment.

## 4. ASSET MAP (reference `../assets/...`; enumerate with `ls` first; only use files that exist)
- **3D wall PHOTO tiles:** `../assets/app-showcase/templates/*.webp` (56) + `../assets/fashion/gallery/01..12_*.webp` (12) + a handful of `../assets/showcase/*_cut.webp`.
- **3D wall VIDEO tiles (mp4):** `../assets/app-showcase/video/{model_catwalk,model_360_turn,model_skirt_twirl,model_outfit_reveal,model_natural_walk,cam_orbital_180,fashion_showcase}.mp4` + `../assets/video/{hero_fashion,fashion_cafe_terrace,fashion_city_bike,fashion_pool_sunset,fashion_marble_stairs}.mp4`. Each video tile needs a POSTER (use a related webp from video-previews/gallery) for load + reduced-motion/mobile.
- **Video preview thumbs (posters):** `../assets/app-showcase/video-previews/*.webp` (24, names `cam_*`,`model_*` — match to clips).
- **Scenes (600+ proof):** `../assets/app-showcase/scenes/*.webp` (48).
- **Before/after + product:** `../assets/app-showcase/onboarding/{fashion_before,fashion_after,ecom_before,ecom_after,suit_*}.webp`; e‑commerce product `../assets/showcase/*.webp` (52).
- Store badges `../assets/img/{app-store-badge,google-play-badge}.svg`; favicon `../assets/favicon.png`. Stores: iOS https://apps.apple.com/us/app/listify-ai/id6758052017 · Android https://play.google.com/store/apps/details?id=com.listifyai.listifyai.
- Every media: Turkish alt/aria. Verify EVERY path exists (ls) — broken tiles kill the wow.

## 5. TECH / PERF / A11Y
- Self-contained .html. CDN: three.js, Tailwind, GSAP+ScrollTrigger, Lenis, Google Fonts. Inline `<style>`+JS. Works on GitHub Pages.
- Perf: 3D tile cap (40-48 / 18-24), video-tile play cap (≤6 / ≤2) + pause offscreen/hidden, dispose on unload, pixelRatio ≤2, lazy-load non-3D images, `preload=metadata/none` on section videos, `content-visibility:auto` on heavy sections, transform/opacity-only DOM motion, Lenis desktop-only. Must not jank on a phone.
- prefers-reduced-motion + Save-Data + no-WebGL: static fallbacks everywhere; reveals visible; videos not autoplayed; count-up → final; 3D → static grid.
- A11y: `<html lang="tr">`, skip link, focus-visible, aria on nav/carousels/accordion, the 3D canvas has an aria-label + a visually-hidden text alternative listing the features; keyboard users get the static grid + can reach all content. Body contrast ≥4.5:1.
- MOBILE-FIRST: design 390px first; NO horizontal overflow at 360/390; 3D works + doesn't trap scroll; sticky bottom download bar; tap targets ≥44px. (Verify at TRUE 360/390 — headless chrome clamps viewport to ~500px, so test via a 390px-wide iframe harness or DevTools-equivalent, not naive --window-size.)
- Head: TR title + meta desc, canonical, OG+Twitter (real asset og:image), theme-color #08080B, favicon, JSON-LD MobileApplication 4,7/45 iOS+Android.
- Ship-ready: no lorem, no TODO, no broken/empty src.

## 6. ACCEPTANCE
- 3D hero: renders, mixes photo+video tiles, draggable desktop+mobile, hover-forward+label works, video tiles actually play (capped), graceful fallback. No console errors.
- Full copy deck present verbatim; all features+numbers accurate (99+, 63, 600+, 7, 10, 28, 4,7); Sketch ≠ Fabric; marketplace = CSV/XLSX file export (+ disclaimer); no invented prices.
- TRUE 360/390 mobile: zero horizontal overflow, hero not empty, scroll not trapped.
- reduced-motion fully neutralizes + stops videos. JS `node --check` clean. All asset paths exist.

## 7. OUTPUT
Write to: `/home/ekremcyc/projects/listifyai-website/redesigns/design-galaxy.html`
