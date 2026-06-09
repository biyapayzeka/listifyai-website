# ListifyAI — FLAGSHIP landing redesign SPEC ("Stüdyo Evreni")

Build ONE self-contained, award-tier (Awwwards/FWA caliber), mobile-first marketing landing page.
Goal: make a fashion/e-commerce seller go **"wow"** in the first 2 seconds AND understand the app's full
breadth. Premium, innovative, dense with REAL content — never generic AI-template feeling.

This is the SOURCE OF TRUTH. Build exactly to it. Do not invent facts beyond it.

---

## 0. POSITIONING & VOICE
- Product: **ListifyAI** — an AI content studio for fashion & e-commerce sellers (mobile app, iOS + Android).
  Tek bir ürün/kıyafet fotoğrafından profesyonel görsel, video ve pazaryeri içeriği üretir.
- Audience: KOBİ moda satıcıları + e-ticaret satıcıları + bağımsız tasarımcılar/atölyeler (TR pazarı).
- Language: **ALL copy in Turkish.** Confident, premium, short. NO flattery, no exclamation spam,
  no "hayalini gerçekleştir" cliché. Brand voice = quiet authority. (Decimal = Turkish comma "4,7".)
- Wordmark: `listifyai` lowercase, the "ai" in the sage/primary accent.
- Domain: listifyai.com.tr.
- IMPORTANT POSITIONING NOTE: the *current* live site sells ONLY the fashion angle. This flagship intentionally
  widens to the app's FULL breadth (fashion + e-commerce product + video + marketplace) because the goal is
  "tüm kullanıcı özelliklerini en iyi şekilde aktarmak." Keep fashion as the hero, but give e-commerce/video/UGC
  real space.

## 1. VERIFIED FEATURE INVENTORY (use ONLY these; exact names & numbers)
**4 ANA HUB (üretim çekirdeği):**
- **Ürün Çekim** — tek çekimden 10 profesyonel ürün fotoğrafı, farklı sahnelerde.
- **Moda** — 11 araçlık moda stüdyosu (aşağıda).
- **Ürün Video** — sinematik hareket/efektle özel ürün videosu.
- **Moda Video** — kıyafet fotoğrafından video şablonlarıyla profesyonel moda videosu.

**MODA — 11 araç:**
1. Editöryal Şablonlar — **63** küratör-seçimi editoryal sahne şablonu.
2. AI Lookbook (Product-to-Model) — tek ürün fotoğrafını gerçekçi AI mankene, çoklu poz/sahne.
3. Moda Stüdyosu — tek kıyafet fotoğrafından konfigüre edilebilir yüz/arka plan/poz ile lookbook.
4. Moda Video Şablon — **99+** hazır video şablonu, otomatik manken/sahne üretimi.
5. Sanal Deneme (Virtual Try-On) — kıyafeti mevcut manken fotoğrafına giydir (yüz/poz korunur, hızlı).
6. Aksesuar Deneme — çanta/kolye/küpe/saat/şapka vb. mankene; tek-ürün odaklı (14 aksesuar tipi).
7. Stilist Çizimi → Elbise (Sketch-to-Garment) — tasarım eskizini giyilebilir kıyafete çevirir (ayakkabı/aksesuar/şapka da).
8. Kumaş → Kıyafet (Fabric Vision) — kumaş dokusu fotoğrafından tam kıyafet tasarımı (~15 sn).
9. Video Stüdyosu — moda/ürün görsellerini özel prompt'la tanıtım videosuna.
10. Hızlı Moda Video — tek fotoğraftan 5-fazlı AI pipeline ile pro moda videosu (~3 dk).
11. AI Upscaler — düşük çözünürlüğü 2K/4K'ya çıkar, detay kaybı yok.
**(Sketch-to-Garment ve Fabric Vision AYRI araçlardır — karıştırma.)**

**MODA — düzenleme araçları (mevcut sonucu düzenle):** Model Değiştir · Poz Değiştir · Arka Plan Değiştir · AI Model Oluştur · Hızlı Düzenleme (Reframe).

**E-TİCARET:**
- Ürün İçeriği — ürün fotoğrafından SEO/GEO uyumlu başlık, açıklama, anahtar kelime, SSS üretir.
- Ürün Stüdyo — ürüne profesyonel arka plan ekler, **600+ sahne**, toplu işlem.
- Marketplace Export — **7 platform**: Trendyol, Shopify, Amazon, Etsy, Hepsiburada, N11, WooCommerce. Platforma özel CSV/XLSX format + otomatik sütun eşleme. (DİREKT API push DEĞİL — dosya export.)

**VİDEO/MEDYA:** Özel Ürün Video ("Visia" AI yönetmen akışı) · UGC Video — 6 sanal AI avatar sunucu.

**Toplam: kullanıcının erişebildiği 28 araç.** Hero/sayılar için "28 araç" veya "tek uygulamada onlarca stüdyo" kullanılabilir.

**SAYILAR (gerçek — birebir kullan):** 500+ aktif satıcı · 28 araç · 99+ video şablonu · 63 editöryal şablon · 600+ ürün sahnesi · 7 pazaryeri · 4,7 store puanı (45 yorum, App Store + Google Play).

**FİYAT:** 3 plan — Starter / Pro (En Popüler: 4K+upscale, kalite modu, auto video+yüz referansı, öncelikli kuyruk) / Creator (yüksek hacim, maksimum kredi, bulk export, kredi top-up). ⚠️ **Fiyat/kredi sayısı UYDURMA** — "Detaylı fiyatlandırma uygulamada", "Hediye kredi ile ücretsiz dene, kart yok". Ekip planı: info@listifyai.com.tr.

**GİZLİLİK:** Görseller kullanıcının Firebase Storage'ında şifreli; model eğitiminde KULLANILMAZ.

**STORE (verbatim):** iOS https://apps.apple.com/us/app/listify-ai/id6758052017 · Android https://play.google.com/store/apps/details?id=com.listifyai.listifyai
**İLETİŞİM:** info@listifyai.com.tr · listifyaiapp@gmail.com. Footer legal: privacy-policy.html, kvkk.html, terms.html, support.html.

## 2. BRAND SYSTEM (premium-dark, elevated from current brand)
- Theme: **dark, cinematic, premium.** Base near-black `#08080B` / `#0C0C10`; elevated surfaces `#15151A`, `#1C1D22`.
- Text: `#F5F5F0` primary, `#9CA39C` variant, `#5F6560` muted. (On dark, body text must clear 4.5:1 — keep variant for large/secondary only where needed.)
- Accents: sage **#9EB098** (primary, + bright **#B8CDB0** for glow/links), gold **#C9B88A** (secondary), rose **#E0A3A8** (sparing).
- Fonts (≤2 families): **Alexandria** (Google Fonts, variable 200–900) — used kinetically (thin 200 ↔ black 900) for display + body. Optional **mono** ("JetBrains Mono" or "Geist Mono") for technical eyebrows/labels only.
- Radius: generous (1.25–2.5rem). Hairline borders `rgba(245,245,240,0.08)`. Soft sage/gold radial glows (subtle, not noisy). Film-grain/noise overlay at very low opacity for cinematic texture (cheap, gated on perf).
- AVOID generic AI tells: no center-stacked everything, no identical card grid for whole page, no flat type scale, no purple-blue SaaS gradient, no emoji-as-icon. Use asymmetry, real imagery, editorial restraint + bold moments.

## 3. ASSET MAP (only files that EXIST — enumerate with `ls`/Glob before using; reference with `../assets/...`)
File lives at `redesigns/design-flagship.html` → assets are at `../assets/...`.
- **Fashion result hero shots (3:4):** `../assets/fashion/gallery/01_tryon_sage_wall.webp` … `12_outdoor_golden_hour.webp` (12).
- **Before/After pairs:** `../assets/fashion/{virtual_tryon,accessory_tryon,fashion_studio,lookbook,fabric_vision}/before_product.webp` + `after_product.webp`.
- **Onboarding before/after + product (great for the "drop" proof):** `../assets/app-showcase/onboarding/` → `ecom_before.webp`, `ecom_after.webp`, `fashion_before.webp`, `fashion_after.webp`, `ecom_video_1..4.webp`, `suit_blazer.webp`, `suit_heels.webp`, `suit_pants.webp`.
- **99+ video template wall:** `../assets/app-showcase/templates/` → 56 webp (A01–A10, B01–B05, M-series, W-series). Use ALL in a dense animated wall.
- **Video preview thumbs (camera & model moves):** `../assets/app-showcase/video-previews/` → 24 webp (`cam_*.webp`, `model_*.webp`).
- **Real fashion video clips (mp4, autoplay muted loop playsinline):** `../assets/app-showcase/video/` → `model_catwalk.mp4`, `model_360_turn.mp4`, `model_skirt_twirl.mp4`, `model_outfit_reveal.mp4`, `model_natural_walk.mp4`, `cam_orbital_180.mp4`, `fashion_showcase.mp4`. Plus existing `../assets/video/*.mp4` (hero_fashion, fashion_cafe_terrace, fashion_city_bike, fashion_pool_sunset, fashion_marble_stairs).
- **600+ sahne proof wall:** `../assets/app-showcase/scenes/` → 48 webp (prefixes: luxmarble_, luxhotel_, artdram_, artstudio_, artvivid_, beach_, forest_, mountain_, garden_, living_, bedroom_, studio_). Use as a big parallax scene grid proving "600+ sahne".
- **E-commerce product shots (perfume/serum/cosmetics/food):** `../assets/showcase/` → 52 webp (`product_*_cut.webp`, `*_scene.webp`). Use for the e-commerce/Ürün Çekim section.
- Favicon `../assets/favicon.png`. Store badges `../assets/img/app-store-badge.svg`, `../assets/img/google-play-badge.svg` (or official remote URLs).
**Every <img>/<video> needs meaningful Turkish alt/aria. Verify each path exists (ls) — broken images kill the wow.**

## 4. SECTIONS + WOW MOTION CHOREOGRAPHY (desktop + MOBILE behavior each)
Use **GSAP + ScrollTrigger + Lenis** (smooth scroll) via CDN. Light WebGL = OPTIONAL cheap canvas gradient-mesh OR animated CSS conic/mesh; NO three.js, NO heavy shaders. All motion transform/opacity only.

**MOBILE-FIRST RULE (the previous attempt failed here):** design each section for a 390px phone FIRST, then enhance for desktop. Touch targets ≥44px. Horizontal-pinned desktop sections become **vertical scroll-snap carousels** with swipe on mobile (NOT scroll-jacked). Disable Lenis + heavy parallax + the canvas mesh on touch/coarse pointers and when `(max-width:768px)` if perf-risky. Sticky **bottom** download bar on mobile. Test reflow at 360/390/768/1280.

1. **HERO** — full viewport. Behind a massive kinetic headline (Alexandria 200↔900, clamp huge), a slow-drifting **infinite content wall** built from the 56 template thumbs + fashion shots (low opacity, GSAP-marquee in 2–3 directions, OR a subtle WebGL/CSS gradient mesh + a tighter content strip). Headline e.g. «Tek fotoğraf. / Bir stüdyo dolusu / sonuç.» with "ai" accent. Subline: tek cümle değer önermesi. Dual store badges + "Hediye kredi · kart yok". Scroll cue. MOBILE: headline scales, content wall becomes a single tasteful drifting row, badges stack, no scroll-jack.
2. **THE DROP (kanıt)** — pinned scroll-scrubbed BEFORE→AFTER reveal using `onboarding/ecom_before→after` and `fashion_before→after`: as user scrolls, a clip-path wipe morphs raw → AI result, with a one-line caption. Two beats (e-com sonra moda). MOBILE: becomes a draggable before/after slider (touch) — no pin/scrub.
3. **4 HUB** — "Dört stüdyo. Tek uygulama." Ürün Çekim / Moda / Ürün Video / Moda Video as 4 large editorial cards (asymmetric, NOT equal grid), each with a real image/looping video + 1-line desc + the headline number (10 foto, 11 araç, sinematik, 99+ şablon). Hover (desktop) = video plays + lift; tap (mobile) = expand.
4. **MODA — 11 araç** — horizontal pinned scroll gallery on desktop (GSAP ScrollTrigger horizontal pin) through 11 tool cards, each real asset + TR name + 1-line + the right number (63, 99+, ~15sn, ~3dk, 2K/4K…). MOBILE: vertical scroll-snap carousel, swipeable, dot indicator. This is the breadth showcase — make it feel rich, not a boring list.
5. **VİDEO EVRENİ** — the **99+ template wall**: dense animated grid/marquee of all 56 template thumbs (multi-row opposing marquees) + one featured large autoplay reel (model_catwalk / fashion_showcase). Caption "99+ video şablonu · Reels & TikTok için dikey · 15 sn". MOBILE: 2-row marquee + featured reel.
6. **600+ SAHNE** — parallax scene wall from the 48 scene webp (categories: lüks, sanatsal, doğa, ev içi, stüdyo). Headline "600+ sahne, sınırsız atmosfer." Subtle depth parallax on scroll. MOBILE: compact masonry, reduced parallax.
7. **E-TİCARET pipeline** — "Tek üründen, satışa hazır." A horizontal pipeline viz: Ürün foto → Ürün Stüdyo (600+ arka plan) → Ürün İçeriği (SEO/GEO başlık+açıklama) → Marketplace Export (7 platform CSV/XLSX). Use `showcase/` product images. Show the 7 marketplace names/logos-as-text. Make clear it's file export (CSV/XLSX), not API push.
8. **UGC** — "Senin yerine konuşan 6 avatar." UGC video with 6 avatars (use video-previews or a tasteful representation; if no avatar images, use a clean 6-tile layout with labels). Keep honest: 6 sanal AI avatar.
9. **SAYILAR band** — animated count-up: 500+ · 28 · 99+ · 600+ · 4,7. Tabular nums. Once, IntersectionObserver, reduced-motion → static.
10. **SOSYAL KANIT** — 4,7 + App Store & Google Play marks + a horizontal testimonial slider. Testimonials: write realistic short Turkish reviews from KOBİ sellers (butik/atölye/Trendyol/Etsy/Shopify/toptan) in the confident existing tone — NO fake metrics, NO superlatives. Mark internally these are illustrative.
11. **FİYAT** — 3 tiers (Starter / Pro-popular / Creator), no numbers, "uygulamada", "hediye kredi".
12. **FAQ** — accordion (6): nasıl çalışır / kalite / pazaryeri export (CSV/XLSX, 7 platform) / görseller nerede saklanıyor (Firebase, model eğitiminde kullanılmaz) / iOS+Android / kaç araç var.
13. **FINAL CTA** — "Stüdyon cebinde." dual stores, hediye kredi.
14. **FOOTER** — wordmark, kısa açıklama, feature link columns (Moda / E-ticaret / Video), legal (privacy/kvkk/terms/support), iletişim emails, © 2026.

## 5. TECH + QUALITY CONSTRAINTS
- ONE self-contained `.html`. CDN allowed: Tailwind (`https://cdn.tailwindcss.com`), GSAP + ScrollTrigger (`https://cdnjs.cloudflare.com/.../gsap` + ScrollTrigger), Lenis (`https://cdn.jsdelivr.net/npm/lenis/dist/lenis.min.js` or unpkg), Google Fonts. Inline `<style>` + inline JS. No other libs. Works on GitHub Pages (static).
- **prefers-reduced-motion**: a real JS gate — disable Lenis smooth scroll, kill all GSAP timelines/ScrollTriggers (or set to instant), `document.querySelectorAll('video[autoplay]').forEach(v=>{v.removeAttribute('autoplay');v.pause();})`, stop marquees, count-up jumps to final, content all visible without motion. Also respect `(prefers-reduced-data: reduce)` / Save-Data by not autoplaying videos.
- **Performance**: lazy-load offscreen images (`loading="lazy" decoding="async"`), `preload="metadata"`/`none` on non-hero video, cap concurrent autoplay videos, use `content-visibility:auto` on heavy sections, throttle scroll work to rAF (GSAP handles). Mobile must not jank — disable the canvas mesh + Lenis on coarse pointer if needed. No layout-shift (set aspect ratios on media).
- **Accessibility**: `<html lang="tr">`, semantic landmarks, skip link, visible focus rings, aria on tabs/accordion/sliders, alt text on every image, color contrast ≥4.5:1 for body. Keyboard operable carousels/accordion.
- **SEO/head**: Turkish `<title>` + meta description, canonical, Open Graph + Twitter card (use a real asset for og:image), theme-color `#08080B`, favicon, JSON-LD MobileApplication (name ListifyAI, OS Android+iOS, aggregateRating 4.7/45).
- Ship-ready: NO lorem, NO "TODO", NO placeholder boxes, NO broken/empty src. Every section complete.

## 6. ACCEPTANCE CRITERIA (builder must self-verify before returning)
- Renders with zero broken asset paths (verify each `../assets/...` exists on disk via ls).
- Genuinely mobile-first: looks intentional and complete at 390px; no horizontal overflow; no scroll-jacking on touch.
- All 4 hubs + 11 fashion tools + e-commerce (content/studio/export) + video + UGC are represented accurately with correct numbers (99+, 63, 600+, 7, 10, 28, 4,7). Sketch-to-Garment and Fabric Vision shown as DISTINCT.
- No invented prices/credits/features/marketplaces. Marketplace = CSV/XLSX file export wording.
- prefers-reduced-motion fully neutralizes motion + stops videos. JS parses clean (node --check the extracted script).
- Feels award-tier and premium, not a generic template.

## 7. OUTPUT
Write the complete file to: `/home/ekremcyc/projects/listifyai-website/redesigns/design-flagship.html`
