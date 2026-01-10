# ListifyAI Website

ListifyAI mobil uygulaması için resmi web sitesi. GitHub Pages üzerinde barındırılmaktadır.

## Sayfalar

- **index.html** - Ana sayfa (landing page)
- **privacy-policy.html** - Gizlilik Politikası (KVKK + GDPR uyumlu)
- **terms.html** - Kullanım Şartları
- **kvkk.html** - KVKK Aydınlatma Metni
- **support.html** - Destek Merkezi

## GitHub Pages Kurulumu

### 1. Repository Oluştur
1. GitHub'da yeni bir repository oluştur: `listifyai-website`
2. Public olarak ayarla

### 2. Kodu Yükle
```bash
cd /home/ekremcyc/projects/listifyai-website
git init
git add .
git commit -m "Initial commit: ListifyAI website"
git branch -M main
git remote add origin https://github.com/KULLANICI_ADIN/listifyai-website.git
git push -u origin main
```

### 3. GitHub Pages Aktifleştir
1. Repository ayarlarına git (Settings)
2. Sol menüden "Pages" seç
3. Source: "Deploy from a branch" seç
4. Branch: "main" ve "/ (root)" seç
5. Save'e tıkla

### 4. Custom Domain Ayarla
1. GitHub Pages ayarlarında "Custom domain" kısmına `listifyai.com.tr` yaz
2. "Enforce HTTPS" kutucuğunu işaretle

### 5. DNS Ayarları (Domain Sağlayıcında)
Domain sağlayıcının DNS ayarlarına git ve şu kayıtları ekle:

**A Records (@ için):**
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

**CNAME Record (www için):**
```
www -> KULLANICI_ADIN.github.io
```

### 6. Doğrulama
- DNS yayılması 24-48 saat sürebilir
- `https://listifyai.com.tr` adresini kontrol et

## Yapılacaklar

- [ ] og-image.png ekle (sosyal medya paylaşımları için 1200x630px)
- [ ] Google Search Console'a site ekle
- [ ] Google Analytics entegrasyonu

## İletişim

- **Destek:** support@listifyai.com.tr
- **Gizlilik:** privacy@listifyai.com.tr
- **Faturalama:** billing@listifyai.com.tr
