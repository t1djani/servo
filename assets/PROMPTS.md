# Brand assets — Midjourney prompts

Visual identity for **servo**: a control system, not a mascot. Closed feedback loop, signal damping, a reference line (the oracle) you align against. Precise, technical, secular. Palette leans dark with one warm accent (`#d97757`) or a control-system teal.

Drop generated files here:
- `assets/banner.png` — repo header, referenced by the README (target ~1280×400).
- `assets/logo.png` — square mark for socials / marketplace (target 512×512).

---

## Banner (wide repo header)

```
minimalist tech banner for an open-source developer tool called "servo", a clean closed-loop control diagram crossing the frame left to right, a high-gain signal that overshoots then settles onto a straight reference baseline, thin precise monoline vector strokes, dark charcoal background #15140F, single warm accent #d97757, subtle blueprint grid, generous negative space for a wordmark on the left, modern engineering aesthetic, flat, no text --ar 32:10 --style raw --v 6.1
```

## Logo mark (square)

```
minimal monoline logo mark, a closed feedback loop arrow that doubles as a lowercase letter "s", single continuous stroke, geometric and precise, control-systems engineering feel, dark background, one warm accent color #d97757, flat vector, lots of negative space, no text, app icon --ar 1:1 --style raw --v 6.1
```

## Logo mark — alternate (damping curve)

```
minimal logo, an underdamped step-response curve overshooting and settling to a flat line, enclosed in a soft-edged square, monoline, teal on near-black, precise engineering schematic style, flat vector, no text, no gradients --ar 1:1 --style raw --v 6.1
```

## Notes
- Keep it **secular and technical** — no halos, eyes, oracles-as-mysticism, crystal balls. The "oracle" here is a reference baseline, not a seer.
- Prefer monoline / blueprint over 3D renders; it scales down cleanly to a favicon.
- After generating, run through an upscaler and export PNG with transparent background where possible.
