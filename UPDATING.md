# Updating the Sign Depot Training Site (The Manual)

Plain instructions for keeping this site current. Written for Bobby and for any
AI chat working on the site. Follow this and every update lands the same way.

## The basics

- **Live site:** https://portal.thesigndepot.com (since Nov 9, 2026; the old
  https://unmxd.github.io/signdepot-training/ address forwards there)
- **DNS:** thesigndepot.com lives in Cloudflare now, not GoDaddy. The portal
  record points at the GitHub Pages site and runs through Cloudflare. The
  website host (108.178.20.198) and all email records were carried over
  unchanged. Make DNS changes in Cloudflare. A Cloudflare Access login wall
  for the portal is planned but NOT enabled yet (Bobby enables Zero Trust in
  the Cloudflare dashboard first).
- **Repo:** github.com/UNMXD/signdepot-training (public)
- **Local source:** `~/workspace/3m-film-management/github-site/` — this folder IS
  the site. Every chat working on the site edits these same files.
- **Publishing:** upload the changed files to the repo through GitHub's web UI.
  GitHub Pages rebuilds by itself in about a minute. Then open the live page
  and check it before saying it is done.

## Rules that never change

1. **Build on top, never from scratch.** Read the current file before editing
   it. Other chats update these pages too. A change adds to what is there; it
   never replaces a page with a fresh copy that loses their work.
2. **One publish at a time.** If another chat is mid-publish, wait. Two
   publishes at once can tangle the repo.
3. **English + Spanish together.** Every page has a twin in `es/` with the same
   file name. A change is not done until both are updated in the same publish.
4. **The site is public.** No real customer names, prices, or order details in
   any picture or video. Shoot EVO captures on test estimates only, and blur
   list rows and anything behind a dialog before a capture goes on the site.
5. **Super simple design.** Steps, not levels. No gamification. One action per
   step card, big type, plain words, a big checkbox per step. Step numbers come
   from the style sheet and renumber themselves when steps are added or removed.

## How a lesson page is built

Every lesson page uses the same pieces, in this order: top bar, blue hero band,
Back button, a "short version" note, then one section per Part. Each Part is:
a heading, a video (if the Part has one), the progress counter, and step cards.

**Add a step** — paste one more block inside `<div class="steps">`:

```html
<label class="step">
  <input type="checkbox" class="stepcheck">
  <span>
    <span class="steptitle">TITLE OF THE STEP</span>
    <p>One action, in plain words.</p>
  </span>
</label>
```

Nothing else to wire up: the number, the counter, and the progress saving all
update themselves (styles.css counters + steps.js).

**Add a video** — save the file in `videos/` and paste:

```html
<div class="videowrap">
  <video class="lessonvideo" controls preload="metadata" src="videos/FILE-NAME.mp4"></video>
</div>
```

On a Spanish page the path is `../videos/FILE-NAME-es.mp4` — the Spanish
version is the same video with translated captions, never a reshoot.

**Replace a video** (fix or redo) — upload the new file with the SAME name,
overwriting the old one. The page does not change at all.

**Add a photo** — file goes in `images/`. On a card: `<img class="cardimg" ...>`.
Big home-page panel: `<div class="heropanel"><img ...></div>`.

**Add a new section to a lesson** — copy the first section of
`take-in-a-sale.html` (heading, video block, progress counter, steps, the green
"done" line), change the words, done. Sections carry real titles, never
Part A/B letters (Bobby's call, Nov 6). The Spanish twin gets the same
section the same day. Each section's counter and green done line work on
their own: steps.js
runs every .steps block as its own group. A step photo goes inside the step
card as <img class="stepimg" src="...">, marked with a thin box + letter
badge before it is added.

## The Onboarding rule (Bobby, Nov 6)

If EVO's own Onboarding can teach it, we do NOT build our own version.
Link to the Onboarding page (https://evo.corebridge.net/my-profile/training/onboarding)
and name the section/stage instead. We only build lessons for what is ours:
our workflow, our standards, our machines, our shop. Every department page
carries a short Onboarding pointer list (the department's stage picks) next
to our own lessons. Getting there: tap your name (bottom left in EVO), then
Onboarding. Department picks live in
`~/workspace/3m-film-management/onboarding/department-picks.md`.

## Machines placement (Bobby, Nov 6)
There is no central Machines page. Each machine is listed on the page of
the department that RUNS it, with a photo card: Printing = Flora, Epson,
Canon, Summa, Colex (the print tech runs the Colex and the Summa, that is
why they sit in Printing); Production = Laminator, Mounting Table;
Installation = Bucket Truck (just "Bucket Truck" — no year or model).
The old Ranger, NV200 and F-150 pages were deleted Nov 6.

## Video standard (for EVO walkthroughs)

Narrated videos: Aria's voice reads the same lines the captions show
(Bobby's calls, Nov 6: a woman's voice, the same voice on every video) —
that is for the ENGLISH videos. PRONUNCIATION (Bobby, Nov 10): EVO is
pronounced "EEVO". It is still spelled EVO everywhere on screen and in
captions; only the narration script the voice reads spells it "Eevo" so
she says it right. Her Spanish is NOT used: it comes and goes,
sometimes native and sometimes wrong (Bobby's catch, Nov 6), so Spanish
narration is parked until a consistently native woman's voice is picked.
Spanish videos stay silent with Spanish captions meanwhile; a voice track
can be added to them later without rebuilding anything. Real screenshots with an animated
big cursor (black arrow, pink ring) that glides to each tap, a pink click flash
(#E6007E) at the tap, and a caption on every screen worded as an exact
instruction (verb + the exact on-screen target). Captions ship as a subtitle
track (a .vtt file next to the video, set as the video tag's default track),
never burned into the picture: the player's control gradient washes burned-in
words out, worst in full screen. A thin orange box + badge A = the main
thing, a thin blue box + badge B = the second thing (Bobby's calls: circles
were out on Nov 5, thick underlines were out on Nov 6 — a thin box around
the section is the mark; the letters A and B stay); badges sit in the margin
so they cover nothing. The small real cursor baked into screenshots gets blurred out of video
frames. End frames: cursor leaves before the A/B marks get the screen alone.
Slow pace, about 2 seconds per screen. Full detail lives in
`~/workspace/3m-film-management/EVO-Sales-Workflow-Draft.md` and
`EVO-Putting-In-An-Estimate-Shooting-Script.md`.

## When you finish an update

- Verify the live pages (EN + ES) actually show the change; Pages takes about
  a minute and browsers cache, so reload once.
- REPLACING A VIDEO: give the new file a NEW name (handoffs-v2.mp4) and
  update the page's source/track paths. Browsers cache video files hard at
  the same URL, so a same-name swap leaves viewers watching the old video
  (bit us Nov 10: the Handoffs redo was live in the repo while Bobby's
  browser kept playing the cached old version).
- PUBLISH ORDER for new video files: upload the video/caption files FIRST
  and the page that points at them LAST, in the same batch. If a live page
  ever points at a video address that is not up yet, browsers cache the
  failure and keep showing an empty player even after the file lands
  (bit us Nov 10 with handoffs-v2; fixed by moving to a fresh v3 name).
- Tell the other chats what you changed (files + what the change does) so the
  next update builds on it instead of over it.

## Management gate and private files (Nov 6)

- Management pages (EN + ES) are gated by gate.js: clicking any
  management.html link (or landing on the page) asks for the shared
  manager password (set by Bobby — ask him, never write it in docs).
  It is a LIGHT lock, not security: the site is public and the password
  sits in the page code. Sensitive files NEVER go on this site.
- The real protection is the private Drive folder "SD-Management"
  (Bobby's Drive, shared by name with managers only). The portal does
  NOT link to it: Bobby had the link removed from the Management pages
  on Nov 7, 2026, until he sorts the folder's sharing himself. Do not
  re-add the link without his word. The master password list lives
  there, along with Management Roles, Inventory, Materials and the
  rest. If a manager file matters, it lives in SD-Management, never
  on this public site.
- Department pages carry the full planned section map as cards
  (coming-soon cards included), so the whole curriculum is visible
  before each piece is built. Sales = the 8 our-workflow topics;
  Management = GM / Sales Manager / Production Manager role sections,
  Scheduling Installs, Inventory; Design includes Prepare a Job for
  Print and the File System section; Printing includes Finding Print
  Files; Production and Installation carry their board pieces.
- Source doc behind those sections: SD File System v1.1, Bobby's.
  (A second manual described a system the shop does not use; Bobby
  ordered every trace of it removed from the Portal on Nov 11, 2026.
  The Portal standard is EVO-first: jobs and job talk live in EVO.)
- The cursor-trail trial ended Nov 6: trail.js removed at Bobby's call.

## The name (Bobby, Nov 6)

The site is the **SDUSA Portal** — Training Library is retired as the
name because the site is becoming the company hub, not just training
(training is one part of it). Header brand, home title, and back
buttons all say SDUSA Portal (ES: Portal SDUSA). The repo and the
github.io address keep their old names for now; a future move to our
own domain with per-employee login (hub.thesigndepot.com + Cloudflare
Access is the leading route) is planned but NOT approved yet — no DNS
changes without Bobby's explicit word.

## Images everywhere (Bobby, Nov 6)

Every card and section gets a picture — the site must be easy at a
glance, not walls of text. Photos show the work or the action, never
finished-product beauty shots, and no people's faces (crop them out).
Stock photos must be free-license only (Unsplash, Pexels, Wikimedia
Commons). Real shop photos from Bobby can replace any stock photo by
overwriting the same file name in images/topics/.

## Product guides (Bobby, Nov 6)

Instructions are organized BY PRODUCT: each product gets ONE page with
its full instructions, finishing and installing together (everything
about banners lives on the Banners page, never split across
departments). Production carries a "Most Common Jobs" section at the
top with the top products — Banners first (our most important product),
then Yard Signs & H-Stakes, Vehicle Wraps, Perf Vinyl. Build the
product pages one at a time, Banners first.

## Chente's Production additions (Nov 6)

Chente (Production Manager) asked for these on the Production page:
RTA Preparation (RTA = Ready To Apply, for cut vinyl: weeding, masking,
ready to install), Laminating a Job, Working With Max Metal, and
Transporting Aluminum. They sit in Production's trainings as
coming-soon cards until their content is built with Chente.

## Photos must read instantly (Bobby, Nov 6)

A card photo has to SAY the topic at a glance, not just be vaguely
related. Vehicle Wrap = a wrap actually going on a vehicle. Perf Vinyl
= the perforated dot pattern on glass. Safety Film = broken glass held
together by the film. Generic "hands touching film" does not pass.
When Bobby sends example images, match that kind of shot (free-license
versions for the public site).

## Guides are progressions (Bobby, Nov 12)

A guide does not open as one long page. It opens on a hub page that
lists its numbered chunks (1, 2, 3...), with chunk 1 highlighted as
the start. Each chunk is its own page: small, one topic, with its
video and steps. At the bottom of each chunk page, a big Next button
names the next chunk and takes you to its page. The last chunk ends
with a Done button back to the hub. First used on the Sales Quick
Start Guide (hub sales-quick-start.html, chunks
quick-start-*.html). Build new guides this way, and split an older
long guide into chunks when it gets reworked.

## Crop pictures tight (Bobby, Nov 11)

Portal pictures and screenshots get cropped tight to the information
they are showing. No huge full-page or full-screen images where the
real content is a small part of the frame. Crop first, then place, so
someone sees the relevant part immediately with no wasted screen
around it.

## Videos get players (Bobby, Nov 6)

On training pages, videos play ON the page: YouTube and Vimeo links
become embedded players (youtube-nocookie embeds, .video wrapper in
styles.css), and direct video files (.mp4) become native players.
Links that cannot embed cleanly (a video inside another site's page,
Facebook reels, non-video pages) stay as buttons. The EVO Onboarding
Map stays links on purpose: it is an index into EVO's own lessons.

## Production & Install merged (Bobby, Nov 6)

Production and Installation are ONE department now: "Production &
Install" (ES: Producción e Instalación), because product guides kept
crossing the line (wrap installs, banner hanging). production.html is
the merged page (Most Common Jobs, Trainings, Installing, Machines &
Equipment incl. Bucket Truck and Banner Welder). installation.html and
es/installation.html are "we moved" stubs pointing to it. The portal
has FIVE departments: Management, Sales, Design, Printing,
Production & Install. This merges the site sections only — people's
jobs and the job stages (Production, Install) stay as they are.

## Drive stays OFF Management (Bobby, reaffirmed Nov 8)

The SD-Management Drive folder is NOT linked from the Management
pages (the Private Manager Documents card was removed Nov 7, EN+ES,
live-verified again Nov 8: no Drive link or folder URL anywhere in
the site). Do not re-add any Drive link to Management until Bobby
says the portal is fully up and running and he has sorted the
folder's security/sharing himself.

## Monthly Insights on Management (Bobby, Nov 10, SUPERSEDES the Sales Reports section above)

Bobby's final shape: Management carries a "Monthly Insights"
section (ES: Resumen Mensual) near the TOP of the page, refreshed
monthly, at-a-glance only. It holds a short summary card for the
current month (spot check themes, with the title-and-link card
into the Drive Doc) and a short "how we did" card for last month's
sales report. Headline numbers from the monthly sales report are
OK here at Bobby's direction; the FULL reports still live in
Drive only. Do NOT stack every report as cards down the page;
when a new month lands, refresh the two cards in place.

The one linked report DOCUMENT: the spot check Doc in Drive
(SD-Management > Sales > Spot Checks), linked from inside the
Monthly Insights card above; Drive permissions are the lock.
This does NOT reopen linking the Drive folder itself, which
stays off (rule above).

## Banners guide live (Nov 9)
banners.html (+ ES twin) is the first full product guide: Weld the
Hems (Miller Weldmaster T-300 video) -> Add the Grommets (Stimpson
press videos) -> Hang It, each part with checkbox steps. The shop
welder is a Miller Weldmaster T-300 (machine page says so, manual
linked). Grommet press is a simple manual press.

## Safety Film page FINAL shape (Nov 9, Bobby, later same day)
Page is now ONLY: the two RC videos + the 10-step checklist built
from them + the installer kit (contents only, NO prices). The
written 3M spec checklist, red flags, and sources line came OFF
the page; the spec text is archived verbatim at
~/workspace/3m-film-management/safety-film-spec-archive.md
(restorable). Kit cost ($221.25, EPD) lives as a card in the
Management Resources section next to the Accent training card.

- **Yard Signs guide** (yard-signs.html, EN+ES, Nov 9, 2026): Bobby renamed the card from "Yard Signs & H-Stakes" to just "Yard Signs." Two sections: cutting coroplast down with an exacto blade (steps only — no clean sign-shop cutting video exists; a 30-second shop-filmed cut would drop in) and H-stake installation with the UZ Marketing video (lgJENfaIGM0: both methods, foot on the middle bar, no stomping).

**Tips & Tricks rule (Bobby, Nov 9, 2026):** every product guide gets a "Tips & Tricks" section (ES: Consejos y Trucos) at the end, IF we have real tips for that job. Never filler: a page with no genuine tips gets no section. Banners, Yard Signs, and Safety Film have theirs.
