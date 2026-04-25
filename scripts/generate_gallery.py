#!/usr/bin/env python3
"""
ListifyAI Gallery Generator
Üretir: 12 editoryal moda görseli, PiAPI nano-banana-pro ile
Kaydeder: /listifyai-website/assets/fashion/gallery/NN_name.png

PIAPI_KEY: /home/ekremcyc/projects/.env.secrets'tan okunur.

Kullanım:
    python3 generate_gallery.py
    python3 generate_gallery.py --only 01 02   # sadece belirli idx'ler
    python3 generate_gallery.py --dry-run      # prompt'ları göster, üretme
"""
import os
import sys
import time
import json
import base64
import argparse
from pathlib import Path
from io import BytesIO

try:
    import requests
except ImportError:
    print("requests module missing. Install: pip3 install requests pillow", file=sys.stderr)
    sys.exit(1)

try:
    from PIL import Image
except ImportError:
    print("Pillow missing. Install: pip3 install pillow", file=sys.stderr)
    sys.exit(1)


# ──────────────────────────── CONFIG ────────────────────────────
UPLOAD_URL = "https://upload.theapi.app/api/ephemeral_resource"
TASK_URL = "https://api.piapi.ai/api/v1/task"
POLL_INTERVAL = 6  # seconds
POLL_TIMEOUT = 240  # seconds per task
MODEL_TYPE = "nano-banana-pro"  # better quality for editorial
RESOLUTION = "2K"
ASPECT = "3:4"

OUT_DIR = Path("/home/ekremcyc/projects/listifyai-website/assets/fashion/gallery")
SEED_PATH = Path("/tmp/listifyai_seed_canvas.png")
SECRETS_PATH = Path("/home/ekremcyc/projects/.env.secrets")


# ──────────────────────────── PROMPTS ────────────────────────────
# Her prompt ~180-250 kelime. Stil: editorial fashion, sage/beige/ink paleti,
# mocky'den tamamen farklı sahneler, TR+global mix.
COMMON_NEGATIVES = (
    "No text, no captions, no logos, no watermarks, no ugly artifacts, no distorted faces, "
    "no extra fingers or limbs, no oversaturated colors, no heavy digital filter look, "
    "no harsh shadows, no low-quality plastic skin. "
    "Ignore the neutral grey reference canvas — it is only a blank placeholder; "
    "generate the scene from scratch following the exact description below."
)

PROMPTS = [
    {
        "idx": 1,
        "name": "tryon_sage_wall",
        "prompt": (
            "High-fashion Vogue cover editorial photograph. "
            "A stunning Mediterranean woman, mid-20s, with smooth glowing olive-tan skin showing natural "
            "sun-kissed warmth and fine pore texture, sculptural defined cheekbones with subtle bronze "
            "highlight catching the light, sleek wet-look espresso-dark hair pulled tight back from face "
            "with face-framing strands tucked behind ear, full naturally tinted lips with warm berry stain, "
            "sharp dark eyebrows, intense fierce direct gaze straight into camera with quiet powerful attitude. "
            "Strong fashion-editorial pose: standing three-quarter view, one hand confidently on hip, weight "
            "shifted to back leg, shoulders squared and strong, chin slightly lifted in confident stance. "
            "Wearing an oversized structured cream wool blazer with sharp peaked shoulder line and clean "
            "lapels, sleeves casually pushed up forearm, layered over a sleek black silk midi slip dress with "
            "subtle bias-cut drape, three layered fine gold chain necklaces of varying lengths catching light, "
            "small gold cuff earrings. "
            "Background: richly textured warm sage-green hand-troweled plaster wall with dramatic side-lit "
            "shadows revealing organic surface imperfections and patina. "
            "Lighting: strong directional Rembrandt key light from upper left creating sculptural cheekbone "
            "and jaw shadow, subtle fill from right preserving natural skin texture, edge of soft golden "
            "window light grazing the wall. "
            "Color palette: sage green plaster, cream wool, deep black silk, antique gold accents, espresso "
            "hair, glowing warm olive skin. "
            "Shot on Hasselblad H6D medium format with Kodak Portra 400 color emulation, premium fashion "
            "magazine quality, sharp focus on eyes, shallow depth of field, natural skin grain preserved. "
            "3:4 vertical portrait composition, magazine cover crop. "
            + COMMON_NEGATIVES
        ),
    },
    {
        "idx": 2,
        "name": "accessory_jewelry_flatlay",
        "prompt": (
            "Overhead flat lay editorial still-life photography, soft diffused natural daylight from above. "
            "A curated selection of warm-gold and freshwater-pearl jewelry arranged elegantly on a brushed "
            "warm-beige cashmere fabric surface: a pair of sculptural matte-gold hoop earrings, "
            "a layered freshwater-pearl and gold-chain necklace, a minimalist signet ring in brushed gold, "
            "and a delicate thin gold bangle. "
            "Atmospheric props scattered tastefully: a small spool of sage-green cotton thread, "
            "a vintage brass tape measure curled around the edge, a dried eucalyptus sprig in the corner. "
            "Color palette: warm beige, ivory, sage green, antique gold, muted earth tones. "
            "Shallow depth of field with jewelry tack-sharp and background softly blurred. "
            "Editorial still-life magazine aesthetic, no heavy shadows, soft neutral film tones. "
            "3:4 vertical composition. "
            + COMMON_NEGATIVES
        ),
    },
    {
        "idx": 3,
        "name": "accessory_bag_cafe",
        "prompt": (
            "Editorial lifestyle fashion photography, golden hour Mediterranean light. "
            "A woman in her early 30s with olive complexion and dark chestnut hair in a low messy bun, "
            "natural relaxed expression, sitting at a warm cream marble café table, "
            "soft sunlight filtered through overhead vines casting dappled shadows. "
            "She wears a natural cream linen blouse and is resting her hand elegantly on a structured "
            "handbag in warm saddle-brown leather with subtle gold-tone hardware sitting in her lap. "
            "On the table: a chilled glass of water with condensation, a small leather-bound notebook, "
            "and a tiny sprig of fresh olive leaves. "
            "Background: warm terracotta stone wall softly out of focus. "
            "Color palette: saddle brown, cream, sage olive, warm beige, golden amber. "
            "Documentary editorial style, natural skin texture, soft bokeh, subtle film grain. "
            "3:4 vertical portrait framing. "
            + COMMON_NEGATIVES
        ),
    },
    {
        "idx": 4,
        "name": "studio_kombin_4piece",
        "prompt": (
            "Full-length editorial fashion photography, studio composition. "
            "A confident Turkish woman in her late 20s with dark wavy shoulder-length hair, "
            "natural matte makeup, serene direct gaze. "
            "Standing centered in a minimal studio with a warm sage-green seamless paper backdrop. "
            "She wears a complete curated outfit: an oversized ivory wool blazer with clean lapels, "
            "high-waist tailored cream wool trousers, classic black leather ankle boots with subtle heel, "
            "and she holds a structured warm-beige leather shoulder bag. "
            "Stance: relaxed, one leg slightly forward, hand in blazer pocket. "
            "Soft key light from the upper left, subtle fill from the right, clean shadows. "
            "Color palette: sage green backdrop, ivory, cream, warm beige, black leather accent. "
            "Premium magazine editorial aesthetic, natural skin tones, no retouching gloss. "
            "3:4 vertical composition, full body visible. "
            + COMMON_NEGATIVES
        ),
    },
    {
        "idx": 5,
        "name": "pose_change_triptych",
        "prompt": (
            "Editorial triptych composition — three consecutive panels side by side forming a single "
            "3:4 vertical image, separated by thin neutral gaps. "
            "Same young East Asian woman in her mid-20s with a sleek dark bob haircut and minimal "
            "natural makeup appears in all three panels, wearing identical outfit: "
            "a soft warm-beige knit turtleneck sweater and cream wide-leg trousers. "
            "Left panel: she looks downward gently touching her hair with one hand. "
            "Center panel: she looks directly at the camera with a quiet confident expression, "
            "hands relaxed in pockets. "
            "Right panel: she is in profile looking off to the side, chin slightly lifted. "
            "All three against the same off-white plaster wall background, consistent soft studio light. "
            "Color palette: cream, warm beige, off-white, muted neutrals. "
            "Editorial magazine layout, subtle film grain, natural skin. "
            + COMMON_NEGATIVES
        ),
    },
    {
        "idx": 6,
        "name": "model_diversity_row",
        "prompt": (
            "Editorial inclusivity campaign photography. Three different women standing side by side in "
            "a single row against a warm ivory plaster wall with natural texture, all facing the camera. "
            "All three wear the identical outfit: a sage-green oversized chunky knit cardigan left open "
            "over a simple white cotton tee and warm beige wide-leg trousers. "
            "Left: a mature woman in her late 40s with elegant silver-streaked dark hair, natural aging "
            "skin with visible fine lines, soft warm smile. "
            "Center: a young Black woman with natural curly afro hair, warm dark brown skin, confident "
            "direct gaze. "
            "Right: an East Asian woman in her mid-20s with sleek straight black hair, fair skin, "
            "calm serene expression. "
            "Soft neutral daylight, consistent across all three figures. "
            "Color palette: sage green, ivory plaster, white, warm beige, natural skin tones. "
            "Inclusivity editorial, natural poses, minimal makeup, premium magazine quality. "
            "3:4 vertical composition. "
            + COMMON_NEGATIVES
        ),
    },
    {
        "idx": 7,
        "name": "lookbook_plaster_wall",
        "prompt": (
            "Editorial magazine cover-style fashion photography. "
            "A Mediterranean woman in her late 20s with long wavy dark-brown hair cascading over one "
            "shoulder, natural rose-tinted soft makeup, olive skin, confident poised expression. "
            "She wears a warm caramel-brown oversized double-breasted blazer with matching high-waist "
            "wide-leg trousers, a thin delicate gold chain necklace at the collarbone, and no visible "
            "other accessories. "
            "She leans casually with her back against a richly textured warm beige plaster wall with "
            "natural imperfections, subtle cracks and patina. "
            "Shot from slightly below for powerful editorial gravitas, three-quarter body framing. "
            "Soft late-afternoon window light from the left casting gentle directional shadows. "
            "Color palette: caramel brown, warm beige plaster, muted gold, earth tones. "
            "Vogue-level fashion editorial aesthetic, no text overlay, clean composition. "
            "3:4 vertical portrait. "
            + COMMON_NEGATIVES
        ),
    },
    {
        "idx": 8,
        "name": "fabric_vision_texture",
        "prompt": (
            "Editorial diptych composition — a single 3:4 vertical image split vertically into two "
            "equal halves by a thin clean line. "
            "Left half: a macro close-up detail of rich natural linen fabric in warm caramel-beige tone, "
            "showing visible woven weave texture, subtle organic wrinkles and the soft irregularities "
            "of natural fibers. "
            "Right half: a woman with olive complexion in her mid-20s, long dark wavy hair tied back, "
            "natural minimal makeup, wearing a tailored midi-length dress made of the EXACT same "
            "caramel-beige linen fabric shown on the left, in a relaxed three-quarter standing view "
            "against a soft neutral warm-gray concrete wall. "
            "Consistent warm natural lighting across both halves, no harsh shadows. "
            "Color palette: caramel beige, warm gray, natural skin tones, off-white. "
            "Editorial textile campaign style, subtle film grain, premium magazine quality. "
            + COMMON_NEGATIVES
        ),
    },
    {
        "idx": 9,
        "name": "street_motion_editorial",
        "prompt": (
            "Editorial fashion photography with subtle motion-sense, Mediterranean old town setting. "
            "A young Turkish woman in her mid-20s with long dark brown hair slightly lifted by wind, "
            "natural olive complexion, soft confident expression, walking forward confidently across a "
            "sun-dappled narrow cobblestone street between historic warm-limestone building walls. "
            "Subtle motion blur only in her lower legs indicating forward stride. "
            "She wears a flowing sage-green long-sleeve midi dress with a delicate thin tan leather belt "
            "cinching the waist, tan leather mules on her feet, and a small woven natural raffia "
            "shoulder bag. "
            "Golden hour backlight creates a warm rim light on her silhouette and a gentle lens flare. "
            "Color palette: sage green, warm limestone beige, tan, honey golden, muted terracotta. "
            "Documentary fashion street style, natural grain, unposed candid feel. "
            "3:4 vertical portrait composition. "
            + COMMON_NEGATIVES
        ),
    },
    {
        "idx": 10,
        "name": "accessory_watch_wrist",
        "prompt": (
            "Editorial product-on-model close-up still-life photography. "
            "A man's forearm with natural olive complexion, mid-30s, fine dark arm hair visible, "
            "realistic skin texture, resting elegantly on a warm creamy natural linen fabric surface. "
            "He wears a minimalist classic Swiss-style wristwatch with a brushed champagne-tone "
            "stainless steel case, simple off-white dial, and a tonal sand-colored smooth leather strap "
            "with subtle stitching. "
            "Subtle gentle reflection visible on the curved watch glass. "
            "Sleeve of a crisp white cotton button-down shirt casually folded up twice. "
            "Soft natural window light from the left, long gentle shadow to the right. "
            "Shallow depth of field with watch face and stitching razor-sharp, the linen surface "
            "gently falling out of focus. "
            "Color palette: warm cream linen, sand leather, champagne steel, natural skin tones. "
            "Luxury editorial still-life, premium catalog quality. "
            "3:4 vertical composition. "
            + COMMON_NEGATIVES
        ),
    },
    {
        "idx": 11,
        "name": "editorial_portrait_mature",
        "prompt": (
            "Bold beauty editorial close-up portrait, fashion magazine cover style. "
            "A stunning woman in her late 20s with porcelain-pale luminous skin showing fine natural "
            "texture and subtle freckles scattered across the nose bridge, sharp angular jaw catching "
            "the light, prominent sculptural cheekbones with subtle pearl highlight, full pillow lips "
            "with warm rose-nude tint slightly parted, defined arched dark brows, single small gold cuff "
            "earring catching the light. "
            "Hair: wet-look slicked-back dark coffee, pulled tight at temples with subtle face-framing "
            "wisp escaping near cheekbone, ears exposed and clean. "
            "Eye makeup: smudged dark espresso shadow on lid creating soft smoky depth, lashes coated "
            "deep black, subtle inner-corner shimmer, no heavy liner. "
            "Pose & attitude: chin slightly tucked down, eyes lifted to lens with quiet powerful "
            "intensity, lips relaxed and not smiling, conveying mysterious editorial attitude — straight "
            "from a high-fashion magazine cover. "
            "Wearing soft warm camel cashmere turtleneck rolled high covering the neck. "
            "Background: rich textured warm taupe-beige plaster wall with subtle organic patina and "
            "natural grain. "
            "Lighting: strong dramatic Rembrandt sidelight from upper left creating sculptural cheekbone "
            "and jawline shadow with warm golden window glow, shadow side preserving every detail of "
            "skin texture, no digital smoothing. "
            "Color palette: warm taupe plaster, soft camel cashmere, golden highlights, deep amber "
            "shadow, luminous porcelain skin, dark espresso hair. "
            "Shot on Hasselblad medium format, premium beauty editorial quality, ultra-sharp eyes, "
            "natural skin grain fully preserved. "
            "3:4 vertical portrait close-up, magazine cover composition. "
            + COMMON_NEGATIVES
        ),
    },
    {
        "idx": 12,
        "name": "outdoor_golden_hour",
        "prompt": (
            "Cinematic editorial fashion photograph at perfect golden hour. "
            "A confident Mediterranean woman, mid-20s, with sun-kissed warm olive-tan skin glowing "
            "with natural shimmer in golden light, subtle freckles scattered across cheekbones from sun "
            "exposure, sculpted defined cheekbones catching peach-amber rim light, full natural lips "
            "with warm peach-nude tint, dark expressive eyes catching the warm sky reflection, defined "
            "natural brows. "
            "Hair: long sun-bleached caramel-honey waves cascading past shoulders with subtle natural "
            "movement from gentle Mediterranean breeze, face-framing strands lifting slightly, hair "
            "catching golden backlight creating a luminous halo around the head. "
            "Strong fashion-editorial attitude pose: standing confident three-quarter view with hip "
            "cocked to one side, one hand resting deep in oversized blazer pocket, other hand softly "
            "holding the silk dress hem and letting the fabric move with the wind, head turned slightly "
            "toward the sun with eyes half-closed in sensual confidence. "
            "Wearing a flowing sage-green silk slip midi dress with bias-cut drape catching every "
            "breath of light, an oversized warm caramel-tan linen blazer carelessly draped over one "
            "shoulder revealing collarbone, three layered fine gold chain necklaces of varying lengths, "
            "small gold hoop earrings. "
            "Setting: dramatic warm-stone Mediterranean rooftop with weathered terracotta tiles "
            "underfoot, panoramic view of endless honey-amber stone old town buildings stretching to "
            "soft pink-peach sunset sky in the background softly out of focus. "
            "Lighting: strong golden hour backlight creating glowing rim halo around silhouette and "
            "hair, warm directional fill from setting sun creating sculptural skin shimmer, painterly "
            "cinematic atmosphere, fashion-film mood. "
            "Color palette: sage green silk, caramel tan linen, warm terracotta, glowing peach-amber, "
            "antique gold accents, sun-bleached caramel hair. "
            "Shot on Hasselblad medium format with vintage Cooke S8 lens emulation, fashion-film mood, "
            "premium magazine campaign quality. "
            "3:4 vertical portrait composition. "
            + COMMON_NEGATIVES
        ),
    },
]


# ──────────────────────────── API HELPERS ────────────────────────────
def load_api_key():
    key = os.environ.get("PIAPI_KEY", "").strip()
    if key:
        return key
    if SECRETS_PATH.exists():
        for line in SECRETS_PATH.read_text().splitlines():
            line = line.strip()
            if line.startswith("PIAPI_KEY="):
                return line.split("=", 1)[1].strip()
    print("ERROR: PIAPI_KEY not found (checked env + .env.secrets)", file=sys.stderr)
    sys.exit(1)


def ensure_seed():
    """Create a small neutral-gray 3:4 canvas once. Used as required ref image."""
    if SEED_PATH.exists():
        return
    # Warm light gray, 3:4 ratio, small but legal size
    img = Image.new("RGB", (768, 1024), color=(228, 226, 220))
    img.save(SEED_PATH, "PNG", optimize=True)


def upload_seed(api_key: str) -> str:
    ensure_seed()
    b64 = base64.b64encode(SEED_PATH.read_bytes()).decode()
    r = requests.post(
        UPLOAD_URL,
        json={"file_name": "seed.png", "file_data": b64},
        headers={"x-api-key": api_key, "Content-Type": "application/json"},
        timeout=45,
    )
    r.raise_for_status()
    data = r.json()
    url = data.get("data", {}).get("url")
    if not url:
        raise RuntimeError(f"Upload failed: {json.dumps(data)[:400]}")
    return url


def generate_one(idx: int, name: str, prompt: str, seed_url: str, api_key: str):
    payload = {
        "model": "gemini",
        "task_type": MODEL_TYPE,
        "input": {
            "prompt": prompt,
            "image_urls": [seed_url],
            "output_format": "png",
            "aspect_ratio": ASPECT,
            "resolution": RESOLUTION,
        },
    }
    r = requests.post(
        TASK_URL, json=payload,
        headers={"x-api-key": api_key, "Content-Type": "application/json"},
        timeout=30,
    )
    r.raise_for_status()
    task_id = r.json().get("data", {}).get("task_id")
    if not task_id:
        return False, f"no task_id: {r.text[:300]}", None

    print(f"  [{idx:02d}] task {task_id[:12]}… polling")
    start = time.time()
    while time.time() - start < POLL_TIMEOUT:
        time.sleep(POLL_INTERVAL)
        try:
            pr = requests.get(
                f"{TASK_URL}/{task_id}",
                headers={"x-api-key": api_key}, timeout=15,
            )
            pr.raise_for_status()
            d = pr.json().get("data", {})
            status = (d.get("status") or "").lower()
            elapsed = int(time.time() - start)
            if status in ("completed", "success"):
                out = d.get("output") or {}
                url = out.get("image_url") or (out.get("image_urls") or [None])[0]
                if not url:
                    return False, f"completed but no url: {json.dumps(out)[:300]}", None
                ir = requests.get(url, timeout=60)
                ir.raise_for_status()
                out_path = OUT_DIR / f"{idx:02d}_{name}.png"
                out_path.write_bytes(ir.content)
                return True, f"{len(ir.content)//1024}KB in {elapsed}s", str(out_path)
            if status in ("failed",):
                err = (d.get("error") or {}).get("message", "unknown")
                return False, f"failed: {err}", None
            print(f"     status={status} ({elapsed}s)")
        except requests.HTTPError as e:
            print(f"     poll HTTP error (retrying): {e}")
        except Exception as e:
            print(f"     poll error (retrying): {e}")
    return False, "timeout", None


# ──────────────────────────── MAIN ────────────────────────────
def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--only", nargs="+", help="only generate these idx numbers (01 02 ...)")
    ap.add_argument("--dry-run", action="store_true", help="show prompts, do not call API")
    args = ap.parse_args()

    only = set()
    if args.only:
        only = {int(x) for x in args.only}

    if args.dry_run:
        for p in PROMPTS:
            if only and p["idx"] not in only:
                continue
            print(f"\n=== [{p['idx']:02d}] {p['name']} ===")
            print(p["prompt"][:400] + "…")
        return

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    api_key = load_api_key()
    print(f"PIAPI_KEY loaded (…{api_key[-6:]})")
    print(f"Model: {MODEL_TYPE} @ {RESOLUTION} {ASPECT}")
    print(f"Out: {OUT_DIR}")

    print("\nUploading seed canvas…")
    seed_url = upload_seed(api_key)
    print(f"  seed: {seed_url[:80]}…")

    results = []
    total_start = time.time()
    for p in PROMPTS:
        if only and p["idx"] not in only:
            continue
        print(f"\n=== [{p['idx']:02d}] {p['name']} ===")
        ok, info, path = generate_one(p["idx"], p["name"], p["prompt"], seed_url, api_key)
        results.append({
            "idx": p["idx"], "name": p["name"],
            "ok": ok, "info": info, "path": path,
        })
        if ok:
            print(f"  ✓ {path}  ({info})")
        else:
            print(f"  ✗ FAIL: {info}")
        time.sleep(2)  # gentle pacing

    total = int(time.time() - total_start)
    manifest = OUT_DIR / "manifest.json"
    manifest.write_text(json.dumps({
        "generated_at": time.strftime("%Y-%m-%dT%H:%M:%S"),
        "total_seconds": total,
        "model": MODEL_TYPE,
        "resolution": RESOLUTION,
        "aspect": ASPECT,
        "results": results,
    }, indent=2))

    print(f"\n=== DONE in {total}s ===")
    ok_count = sum(1 for r in results if r["ok"])
    print(f"Success: {ok_count}/{len(results)}")
    for r in results:
        marker = "✓" if r["ok"] else "✗"
        print(f"  {marker} [{r['idx']:02d}] {r['name']}: {r['info']}")


if __name__ == "__main__":
    main()
