#!/usr/bin/env python
"""
Knock the flat ground out of a white-on-black wordmark.

The supplied logo sits on rgb(10,10,10). That is close enough to the page
background (#07090C) to be invisible in the header, but the footer uses the
elevated surface (#0B0E13) and the scrolled header is translucent — on both,
an opaque near-black rectangle is visible around the type.

Alpha is taken straight from luminance rather than by thresholding, so the
original antialiasing on the letterforms is preserved exactly. The result is a
white wordmark that sits correctly on any surface.

Run:  python scripts/logo-knockout.py <source.png> <dest.png>
"""

import sys
from pathlib import Path

from PIL import Image

GROUND = 10  # luminance of the artwork's background


def main() -> None:
    if len(sys.argv) != 3:
        sys.exit("usage: python scripts/logo-knockout.py <source.png> <dest.png>")

    src, dest = Path(sys.argv[1]), Path(sys.argv[2])
    im = Image.open(src).convert("RGBA")
    px = im.load()
    w, h = im.size

    for y in range(h):
        for x in range(w):
            r, g, b, _ = px[x, y]
            lum = (r * 299 + g * 587 + b * 114) // 1000
            # Map ground -> fully transparent, white -> fully opaque.
            alpha = max(0, min(255, round((lum - GROUND) * 255 / (255 - GROUND))))
            px[x, y] = (255, 255, 255, alpha)

    dest.parent.mkdir(parents=True, exist_ok=True)
    im.save(dest)
    print(f"  {dest.name}  {w}x{h}  {dest.stat().st_size / 1024:.1f} KB")


if __name__ == "__main__":
    main()
