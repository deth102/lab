# Lab Gallery

Drop image files directly into this folder, then reference them in
[`../../data/gallery.ts`](../../data/gallery.ts).

Example:
1. Save `team-2026.jpg` here.
2. Add to `data/gallery.ts`:
   ```ts
   { src: "/gallery/team-2026.jpg", alt: "ITD Lab team, 2026", caption: "Team · 2026" }
   ```

Tips:
- Square-ish photos look best (grid is 4:3).
- Keep file size under ~500 KB. Use `.jpg` for photos, `.webp` for smaller files.
