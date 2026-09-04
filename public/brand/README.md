# FerruleTech brand assets

## The logo the site uses

`ferruletech-logo.png` — the supplied "Ferruletech®" wordmark, with its flat
near-black ground knocked out to transparency.

    python scripts/logo-knockout.py       public/brand/ferruletech-logo-source.png       public/brand/ferruletech-logo.png

`ferruletech-logo-source.png` is the untouched original, kept so the step is
repeatable.

**Why the ground had to go.** The artwork sits on rgb(10,10,10). That is close
enough to the page background (#07090C) to be invisible in the header, but the
footer uses the elevated surface (#0B0E13) and the scrolled header is
translucent — on both, an opaque rectangle was clearly visible around the type.
Alpha is derived from luminance rather than by thresholding, so the letterform
antialiasing is preserved exactly and the artwork is otherwise untouched. It
also took the file from 89 KB to 23 KB.

Rendered by `src/components/layout/Wordmark.tsx` at 44px in the header, the
mobile menu and the footer. Sized by height with width auto, so the 4.54:1
aspect is never distorted. Note the artwork carries ~25px of its own padding
top and bottom, so the type reads at about 66% of the rendered height.

---

## Earlier artwork (the square mark lockup)

Kept for print and email; not used by the website. Rebuild with:

    python scripts/build-logo-assets.py <source.png>

| File | Use |
| --- | --- |
| `ferruletech-mark.png` | Mark only, transparent background **and** transparent aperture |
| `ferruletech-mark-solid.png` | Mark with the aperture left white — light grounds only |
| `ferruletech-lockup-dark.png` | Mark + FERRULE TECH, black type — light backgrounds, print |
| `ferruletech-lockup-light.png` | Same, reversed to near-white type — dark backgrounds, slides |
| `ferruletech-icon-512.png` | Square icon for app tiles and social profiles |

`src/app/icon.svg` (the favicon) is still the square mark, drawn as vector.
It is the only place that mark now appears on the site — worth deciding whether
you want it to stay, or to be replaced with something derived from the new
wordmark.

### Mark geometry

    frame        268 × 267 px, square corners
    wall         42 px on all four sides (15.7% of width)
    aperture     184 × 183 px, centred
    corners      top-right and bottom-left rounded ~44px; other two square

Gradient, 135° top-left to bottom-right:

    0%    #F0E0FF   pale lavender rim
    10%   #9046E2   violet
    32%   #6B4A96
    52%   #1B1140   near-black
    72%   #2A2086   indigo
    90%   #0F6FD0   blue
    100%  #8FB8DA   pale blue rim

Mirrored in `site.brand` in `src/config/site.ts`.

---

**Please get the original vector** (`.ai`, `.svg`, `.eps`) from whoever designed
these. Everything here is derived from screenshots — fine on screen, not what
you want on a panel label or anything printed large.
