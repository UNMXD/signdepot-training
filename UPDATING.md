# Updating the Sign Depot Training Site (The Manual)

Plain instructions for keeping this site current. Written for Bobby and for any
AI chat working on the site. Follow this and every update lands the same way.

## The basics

- **Live site:** https://unmxd.github.io/signdepot-training/
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

**Add a new Part to a lesson** — copy the Part A section of
`take-in-a-sale.html` (heading, video block, progress counter, steps, the green
"done" line), change the words, done. The Spanish twin gets the same Part the
same day. Each Part's counter and green done line work on their own: steps.js
runs every .steps block as its own group. A step photo goes inside the step
card as <img class="stepimg" src="...">, marked with a thin box + letter
badge before it is added.

## Video standard (for EVO walkthroughs)

Narrated videos: Aria's voice reads the same lines the captions show
(Bobby's calls, Nov 6: a woman's voice, the same voice on every video), and
the captions stay on as a subtitle track. Real screenshots with an animated
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
- Tell the other chats what you changed (files + what the change does) so the
  next update builds on it instead of over it.
