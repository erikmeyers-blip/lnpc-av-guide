# LNPC Sanctuary AV Training Webapp

A mobile-first guide to the sanctuary sound, streaming and hearing assistance
system at Lake Nokomis Presbyterian Church. Built to be reached by scanning a QR
code on a phone, with no login, no install and no app store.

It is a plain static site: HTML, one stylesheet, two scripts. No build step, no
dependencies, no framework. You can open `index.html` directly in a browser and
it works.

## The five doors in

The home screen asks what you're here to do, and each answer is a complete path
rather than a chapter of a manual:

| Tile | Route | For |
|---|---|---|
| I'm running sound & streaming | `#/operator` | The Sunday volunteer, start to finish |
| I'm playing or singing | `#/musician` | Musicians and guest performers |
| I want to hear better | `#/listening` | Congregation, forks into Auracast vs. borrowed receiver |
| Something's not working | `#/help` | Symptom-first troubleshooting |
| Full reference | `#/reference` | Everything on one page, for trained techs |

Persona paths link sideways into troubleshooting where it helps. The Zoom
settings step links straight to the "no sound on the stream" entry, for example,
so nobody has to go back to the home screen mid-service.

## Editing the content

**All of the words live in `assets/js/content.js`.** To fix a typo, add a step,
or add a troubleshooting entry, that is the only file you need to touch. It has
a comment block at the top explaining the handful of formatting options.

`assets/js/app.js` decides how content is put on screen and `assets/css/styles.css`
is how it looks. Neither needs changing to update text.

The full reference page is assembled from the same content the persona pages
use, so it cannot drift out of date. Add a troubleshooting entry once and it
shows up in both places.

## After you edit: bump the version

The stylesheet and both scripts are loaded with a `?v=` number in
`index.html`. **When you change `content.js`, `app.js` or `styles.css`,
increase that number on all three.**

GitHub Pages tells browsers to cache those files for about ten minutes.
Without the bump, you push a change, reload, and see the old page, and
so does anyone who visited recently. Changing `?v=2` to `?v=3` makes it a
new URL, so every browser fetches it immediately.

Adding or replacing a photo in `assets/img/` doesn't need a bump unless
you reuse an existing filename.

## Deliberately not published

Two things were kept off this site on purpose, matching the decision already
made for the printed cards and Quick-Start Guide:

- **The PC login PIN.** The site says "ask a tech team member."
- **The AV Net wi-fi password.** The site points at the sticker on the router.

Please don't add either one, even to a private repo, because this content ends up
behind a public QR code taped to a cart.

Open questions from the training are flagged in purple "Still being confirmed"
boxes rather than guessed at. They are listed together at `#/open-items` and in
the full reference. When one gets answered, edit the relevant entry in
`content.js` and delete the flag.

## Viewing it locally

```bash
node serve.js
```

Then open <http://localhost:4173>. `serve.js` is a small preview server for
local work only. It is not part of the published site and does not need to be
deployed. You can also just double-click `index.html`; hash routing means it
works from the filesystem too.

## Publishing to GitHub Pages

1. Create a repository on GitHub and push this folder to it.
2. In the repository, go to **Settings → Pages**.
3. Under **Source**, choose **Deploy from a branch**, pick your branch and the
   `/ (root)` folder, and save.
4. Wait a minute or two. Your URL will be
   `https://<username>.github.io/<repository>/`.

`.nojekyll` is already in place so GitHub serves the files as-is.

### After the first deploy

The QR codes printed on the station cards currently point at a placeholder URL.
Once the real URL exists, regenerate those QR codes. That is a separate job from
this repo.

## What's in the folder

```
index.html               the shell: header, footer, script tags
404.html                 friendly landing for a mistyped or stale link
manifest.webmanifest     lets people add it to a phone home screen
.nojekyll                tells GitHub Pages to serve files untouched
serve.js                 local preview server (not deployed)
assets/css/styles.css    all styling, light and dark
assets/js/content.js     ← all the words live here
assets/js/app.js         router and renderers
assets/img/              church logo and favicon
_source/                 transcripts, vendor manuals, site photos. NOT published
```

`_source/` is listed in `.gitignore`. It holds the raw training transcripts and
the Listen Technologies and Yamaha manuals, which should not go into a public
repository. Keep it that way.

## Notes on the build

- Works offline once loaded, and is small enough to load fast on church wi-fi.
- Light and dark mode. By default the site follows the phone's own setting; the
  **Appearance** control in the footer lets a reader force Light or Dark and
  remembers the choice. A tiny inline script in the head of `index.html` applies
  the saved choice before the first paint, so there's no flash of the wrong
  theme, which is why it is inline rather than in `app.js`.
- Every color in `styles.css` is a token. The dark palette is written twice: once
  under `prefers-color-scheme: dark` and once under `[data-theme="dark"]`, and
  **the two blocks must be kept in sync.** Nothing outside those blocks should
  name a raw color; add a token instead. Text contrast is above 7:1 (WCAG AAA)
  in both themes.
- Touch targets are at least 44px; the startup checklist can be tapped through
  with a thumb.
- The startup and receiver checklists remember what you've ticked off for twelve
  hours, then clear themselves, so next Sunday starts fresh.
- Real links and buttons throughout, so screen readers and keyboards work.
