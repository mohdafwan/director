#!/usr/bin/env python
"""
Derive web logo assets from the supplied FerruleTech artwork.

The source is a screenshot on a white page, so "remove the white background"
means two different things in two places:

  * the page background around the artwork  -> genuinely background, remove it
  * the shape inside the mark               -> a knockout, so it must also
                                               become transparent, otherwise a
                                               white block appears on the dark
                                               site

Both are handled by flood-filling from known-outside seeds, rather than by
deleting every white pixel — the mark's own top-left glow reaches #F2DCFF and
would be eaten by a naive whiteness threshold.

Run:  python scripts/build-logo-assets.py <source.png>
Out:  public/brand/*.png
"""

import sys
from collections import deque
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "brand"

WHITE_TOL = 26  # distance from pure white still counted as background


def is_bg(px, x, y):
    r, g, b = px[x, y][:3]
    return (255 - r) < WHITE_TOL and (255 - g) < WHITE_TOL and (255 - b) < WHITE_TOL


def flood_mask(im, seeds):
    """Binary mask of background-coloured pixels reachable from `seeds`."""
    w, h = im.size
    px = im.load()
    mask = bytearray(w * h)
    q = deque()
    for sx, sy in seeds:
        if 0 <= sx < w and 0 <= sy < h and is_bg(px, sx, sy) and not mask[sy * w + sx]:
            mask[sy * w + sx] = 1
            q.append((sx, sy))
    while q:
        x, y = q.popleft()
        for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
            if 0 <= nx < w and 0 <= ny < h and not mask[ny * w + nx] and is_bg(px, nx, ny):
                mask[ny * w + nx] = 1
                q.append((nx, ny))
    return mask


def apply_mask(im, mask):
    """Transparent where masked; a soft alpha ramp on the 1px antialiased rim."""
    w, h = im.size
    out = im.convert("RGBA")
    op = out.load()
    for y in range(h):
        for x in range(w):
            if mask[y * w + x]:
                op[x, y] = (0, 0, 0, 0)
                continue
            # Feather: an unmasked but very light pixel touching the mask is
            # anti-aliasing against the background — fade it proportionally.
            r, g, b, a = op[x, y]
            lum = (r * 299 + g * 587 + b * 114) // 1000
            if lum > 232:
                touching = any(
                    0 <= x + dx < w and 0 <= y + dy < h and mask[(y + dy) * w + (x + dx)]
                    for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1))
                )
                if touching:
                    op[x, y] = (r, g, b, max(0, min(255, int((255 - lum) * 255 / 23))))
    return out


def recolour_text(im, rgb, from_x):
    """
    Repaint the wordmark for use on a dark ground.

    Alpha is taken straight from inverted luminance, which reproduces the
    original antialiasing exactly instead of guessing at it. Restricted to
    columns right of the mark so the gradient artwork is untouched.
    """
    out = im.copy()
    p = out.load()
    w, h = out.size
    for y in range(h):
        for x in range(from_x, w):
            r, g, b, a = p[x, y]
            if a == 0:
                continue
            lum = (r * 299 + g * 587 + b * 114) // 1000
            p[x, y] = (*rgb, 255 - lum)
    return out


def main() -> None:
    src = Path(sys.argv[1]) if len(sys.argv) > 1 else None
    if not src or not src.exists():
        sys.exit("usage: python scripts/build-logo-assets.py <source.png>")

    OUT.mkdir(parents=True, exist_ok=True)
    im = Image.open(src).convert("RGBA")
    w, h = im.size

    # Measured from the supplied artwork.
    MARK = (1, 5, 269, 272)          # 268 x 267
    HOLE_CENTRE = (135, 138)

    # ── Full lockup, page background removed ──────────────────────────────
    outer = flood_mask(im, [(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1)])
    full_dark = apply_mask(im, outer)          # black type: for light grounds
    full_dark.save(OUT / "ferruletech-lockup-dark.png")
    recolour_text(full_dark, (236, 241, 246), MARK[2] + 12).save(
        OUT / "ferruletech-lockup-light.png"
    )

    # ── Mark only ─────────────────────────────────────────────────────────
    mark = im.crop(MARK)
    hole = flood_mask(mark, [HOLE_CENTRE])
    apply_mask(mark, hole).save(OUT / "ferruletech-mark.png")            # knockout
    mark.convert("RGBA").save(OUT / "ferruletech-mark-solid.png")        # white centre

    # ── Square icon for favicon / app tiles ───────────────────────────────
    icon = apply_mask(mark, hole).resize((512, 512), Image.LANCZOS)
    icon.save(OUT / "ferruletech-icon-512.png")

    for f in sorted(OUT.iterdir()):
        img = Image.open(f)
        print(f"  {f.name:34s} {img.size[0]}x{img.size[1]}  {f.stat().st_size / 1024:6.1f} KB")


if __name__ == "__main__":
    main()
