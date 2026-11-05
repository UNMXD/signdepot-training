# Sign Depot USA — Crew Training

Internal training site for the Sign Depot USA crew, published with GitHub Pages.

## Pages

- `index.html` — the Training Library home page, listing every category
- `installation.html` — the Installation category page, listing its trainings
- `machines.html` — the Machines & Equipment category page (laminator + Colex trainings coming soon)
- `safety-film.html` — 3M Safety & Security Film Installation (videos + checklist + the installer kit)
- `machines/<slug>.html` — one page per machine (Colex, Summa, Flora, Epson, Canon, Laminator, Mounting Table, Bucket Truck, Ranger, NV200, F-150), each a living stub filled with videos/instructions over time; mirrored in Spanish under `es/machines/`
- `ai.html` — the knowledge page for AI assistants (deliberately NOT in the nav; linked quietly from the home page footer). Operational know-how only — never add customer data, financials, or credentials to it.
- `es/` — the full Spanish version of the site (same file names; every page links to its twin with the EN/ES toggle in the top bar)

Every page has the same sticky top bar: click the logo to go home, use the nav links, flip EN/ES with the toggle, and use the blue Back button on category and training pages.
- `styles.css` — shared styling for all pages (Sign Depot brand colors: orange #F45501, blue #0A1D93)
- `logo.jpg` — Sign Depot USA logo used in the header of every page

## Adding a new training

Structure is organized BY DEPARTMENT (Management, Sales, Design, Production, Installation): home page → department page → training page. Machines & Equipment (machines.html + machines/) is a section inside Production. Department pages: sales.html, design.html, production.html, installation.html (doubles as a department page), management.html — each with a Spanish twin in es/. Planned next sections: EVO & Sales Workflow (order entry with screenshots) and Managers (sensitive manager documents belong behind a real sign-in, e.g. a private Drive folder linked from the site — a password typed into a public static page is NOT real security).

BILINGUAL RULE: every page exists in English (root) and Spanish (`es/`). When you add or change a page, update BOTH versions in the same commit, and keep the EN/ES toggle links pointing at the twin file.

1. Copy `safety-film.html` to a new file named for the training (for example `vehicle-wraps.html`) and replace its content: title, videos in order, the spec that matters, and the checklist.
2. On the training's category page (for example `installation.html`), copy the training card block (marked with a comment) and update the tag, title, description, and link to point at the new page.
3. For a whole new category, copy `installation.html` to the new category file and add a category card for it on `index.html`.
4. Commit and push. GitHub Pages updates the live site automatically within a minute or two.

Every training page follows the same pattern: videos in watch order, the written spec (the spec wins over any video), and a per-job checklist.
