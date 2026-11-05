# Sign Depot USA — Crew Training

Internal training site for the Sign Depot USA crew, published with GitHub Pages.

## Pages

- `index.html` — the Training Library home page, listing every category
- `installation.html` — the Installation category page, listing its trainings
- `safety-film.html` — 3M Safety & Security Film Installation (videos + checklist)
- `styles.css` — shared styling for all pages (Sign Depot brand colors: orange #F45501, blue #0A1D93)
- `logo.jpg` — Sign Depot USA logo used in the header of every page

## Adding a new training

Structure is three levels: home page → category page → training page.

1. Copy `safety-film.html` to a new file named for the training (for example `vehicle-wraps.html`) and replace its content: title, videos in order, the spec that matters, and the checklist.
2. On the training's category page (for example `installation.html`), copy the training card block (marked with a comment) and update the tag, title, description, and link to point at the new page.
3. For a whole new category, copy `installation.html` to the new category file and add a category card for it on `index.html`.
4. Commit and push. GitHub Pages updates the live site automatically within a minute or two.

Every training page follows the same pattern: videos in watch order, the written spec (the spec wins over any video), and a per-job checklist.
