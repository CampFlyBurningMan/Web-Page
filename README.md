# Camp Fly — Burning Man Camp Website

A small informational site for Camp Fly: Burgin guide, quick links, and password-protected media albums.

## Tech

- **Next.js 14** (App Router) + **TypeScript** + **Tailwind CSS**
- Mobile-first, accessible (semantic headings, focus states, keyboard-friendly accordions)

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Build with `npm run build`.

---

## How to edit content

Content is kept separate from layout so you can change copy without touching components.

### Burgin Initiation (accordion sections)

- **File:** `src/content/burgin-initiation.ts`
- **Structure:** An array of **sections**. Each section has:
  - `id` — unique, URL-safe (used for “Jump to section” links). Example: `"before-you-go"`.
  - `title` — section heading (e.g. “Before You Go”).
  - `intro` — optional short paragraph above the accordion.
  - `items` — array of accordion items. Each item has:
    - `id` — unique within the page (e.g. `"tickets-and-arrival"`).
    - `title` — text on the accordion button.
    - `body` — paragraph(s) shown when expanded.
    - `children` — optional array of nested accordion items (same shape: `id`, `title`, `body`, `children`).

**To add a new section:** Add a new object to the `burginInitiationContent` array with `id`, `title`, optional `intro`, and `items`.

**To add a new accordion item:** Add a new object to a section’s `items` array (or to an item’s `children` for a nested accordion).

**Example outline (JSON):** See `src/content/burgin-initiation-outline-example.json` for a minimal structure you can copy. The app reads from the TypeScript file; the JSON is a reference for the shape.

### Home page

- **File:** `src/app/page.tsx`
- Edit the intro text, the “Start here” CTA copy, and the `cardLinks` array (title, description, `href`) for the quick-link cards.

### Media albums

- **File:** `src/content/media-albums.ts`
- **Structure:** `mediaAlbumsByYear` is an array of albums. Each album has:
  - `id` — unique (e.g. `"2025"`).
  - `year` — number (e.g. `2025`).
  - `title` — e.g. “Burning Man 2025”.
  - `linkUrl` — URL to the album (e.g. Google Photos shared album link).
  - `thumbnailUrl` — optional image URL for the grid card.
  - `description` — optional short text under the title.

**To add a new year:** Add a new object to `mediaAlbumsByYear` with the album link and optional thumbnail/description.

### Media page password

- Default password is set in `src/components/MediaLogin.tsx` (fallback) and can be overridden with the env var **`NEXT_PUBLIC_MEDIA_PASSWORD`**.
- Create a `.env.local` in the project root and add:  
  `NEXT_PUBLIC_MEDIA_PASSWORD=your-secret-password`  
  (Use a shared password you’re comfortable with; this is not high-security.)

---

## Media storage recommendation (cross‑platform, like Shared Albums)

You want something that works on both iOS and Android and feels like Apple Shared Albums but isn’t Apple-only. Options that work well:

1. **Google Photos — Shared albums**  
   Create a shared album per year, add photos/videos, then “Share” and copy the link. Anyone with the link can view (and you can allow only people with the link). Works on web, Android, and iOS.  
   - **Use on the site:** Put the shared album URL in `linkUrl` in `src/content/media-albums.ts`. The Media page will open it in a new tab. No embed needed; simple and reliable.

2. **Dropbox — Shared folder or album**  
   Create a folder per year, share it with a link. Good for mixed photo/video and works everywhere.  
   - **Use on the site:** Same as above: set `linkUrl` to the shared folder link.

3. **SmugMug / Flickr**  
   If you want a more “gallery” look and optional embedding, SmugMug or Flickr can give you a shareable gallery URL and sometimes an embed code.  
   - **Use on the site:** `linkUrl` for “View album”; if you get an iframe embed code, we could add an optional “embed” field to albums and show an embedded gallery on the Media page (would require a small component change).

**Recommendation:** Start with **Google Photos shared albums**. Create one album per year, share by link, and paste each link into `media-albums.ts`. No backend or upload UI to build; the site just links out. If you later want embedded galleries, we can add support for a single embed URL per album.

### Photo albums from project folders

The Media page shows **photo albums** that are read from subfolders of **`public/photos`**. No upload or cloud storage is required.

- **How it works:** Create subfolders inside `public/photos`, e.g. `public/photos/2025`, `public/photos/2024`. Put image files (jpg, jpeg, png, gif, webp) in each folder. The app lists those folders on the Media page (after login) under “Photo albums.” Each folder name (e.g. 2025) becomes an album; clicking it opens a gallery of the images in that folder.
- **Order:** Albums are sorted by folder name in descending order (e.g. 2025 before 2024).
- **“Albums by year”** below that section still comes from `src/content/media-albums.ts` (links to Google Photos, etc.). You can keep both: local folders for photos you commit to the repo, and external links for other albums.

---

## Project structure

```
src/
  app/              # Routes: layout, page (home), burgin-initiation, media
  components/       # Navbar, Footer, Accordion, SectionTOC, CardLinks, MediaLogin, AlbumGrid
  content/          # burgin-initiation.ts, media-albums.ts, utils, example JSON
```

---

## Scripts

| Command        | Description              |
|----------------|--------------------------|
| `npm run dev`  | Start dev server         |
| `npm run build`| Production build         |
| `npm run start`| Run production build     |
| `npm run lint` | Run ESLint               |

---

## Next steps (checklist)

- [ ] **Run the site:** From the project folder, run `npm install` then `npm run dev`. Open http://localhost:3000. Confirm Home, Burgin Initiation, and Media (with password) work.
- [ ] **Run a production build:** Run `npm run build`. Fix any TypeScript or build errors if they appear.
- [ ] **Edit Burgin content:** Open `src/content/burgin-initiation.ts` and add or edit sections and accordion items. Use the existing `id` / `title` / `body` structure; see README “How to edit content” above.
- [ ] **Set the media password:** Create `.env.local` and add `NEXT_PUBLIC_MEDIA_PASSWORD=your-password`. Or leave unset to use the default in `MediaLogin.tsx`.
- [ ] **Add real media albums:** Create shared albums (e.g. Google Photos), copy each album link, and update `src/content/media-albums.ts` with the real `linkUrl` (and optional `thumbnailUrl` and `description`) for each year.
- [ ] **Customize camp name and copy:** Replace “Camp Fly” and any placeholder text in `src/app/page.tsx`, `src/app/layout.tsx` (metadata), and `src/components/Navbar.tsx` / `Footer.tsx` with your camp name and wording.
- [ ] **Deploy (optional):** Deploy to Vercel, Netlify, or another host. Set `NEXT_PUBLIC_MEDIA_PASSWORD` in the host’s environment variables if you use it.
