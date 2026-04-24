#!/usr/bin/env python3
"""
PNG → WebP dönüşümü (gallery için).
Quality 82, boyut ~%90 düşer, görsel kalite kaybı minimum.
"""
import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("Pillow missing: pip3 install pillow", file=sys.stderr)
    sys.exit(1)

GALLERY = Path("/home/ekremcyc/projects/listifyai-website/assets/fashion/gallery")
QUALITY = 82
DELETE_PNG = True  # convert edildikten sonra PNG'yi sil

def main():
    pngs = sorted(GALLERY.glob("*.png"))
    if not pngs:
        print("No PNG files found.")
        return

    total_in = 0
    total_out = 0
    print(f"Converting {len(pngs)} PNG → WebP (q={QUALITY})...")
    for p in pngs:
        in_size = p.stat().st_size
        total_in += in_size
        out = p.with_suffix(".webp")
        try:
            img = Image.open(p)
            # Web için boyut makul tut: max 1600px uzun kenar
            if max(img.size) > 1600:
                ratio = 1600 / max(img.size)
                new_size = (int(img.size[0] * ratio), int(img.size[1] * ratio))
                img = img.resize(new_size, Image.LANCZOS)
            img.save(out, "WEBP", quality=QUALITY, method=6)
            out_size = out.stat().st_size
            total_out += out_size
            pct = (1 - out_size / in_size) * 100
            print(f"  ✓ {p.name}  {in_size//1024}KB → {out_size//1024}KB  (-{pct:.0f}%)")
            if DELETE_PNG:
                p.unlink()
        except Exception as e:
            print(f"  ✗ {p.name}: {e}")

    saved = (total_in - total_out) / 1024 / 1024
    print(f"\nTotal: {total_in//1024//1024}MB → {total_out//1024//1024}MB  (saved {saved:.1f}MB)")

if __name__ == "__main__":
    main()
