# Arnes startsida

A simple home page in Swedish with big buttons, made for Grandpa. Plain HTML, CSS and JavaScript with no build step, so GitHub Pages can host it for free. The icons and font are stored in the repo, so the page never depends on another server.

## Put it on GitHub Pages

1. Create a new **public** repository on GitHub, for example `arne_hjalpsida`.
2. Push this folder to it:
   ```sh
   git init
   git add .
   git commit -m "Arnes startsida"
   git branch -M main
   git remote add origin git@github.com:drakeaxelrod/arne_hjalpsida.git
   git push -u origin main
   ```
3. On GitHub, open **Settings → Pages**. Under *Build and deployment*, set **Source: Deploy from a branch**, choose **Branch: main**, folder **/ (root)**, and click Save.
4. After a minute or so the page is live at `https://drakeaxelrod.github.io/arne_hjalpsida/`.

## Make it his browser's home page

- **Chrome:** Settings → On startup → *Open a specific page* → add the URL. Also go to Settings → Appearance → *Show home button* and paste the URL there.
- **Edge:** Settings → Start, home, and new tabs → *When Edge starts* → open these pages → add the URL. Turn on *Show home button* and set it to the URL.
- **Firefox:** Settings → Home → *Homepage and new windows* → Custom URLs → paste the URL.
- **Safari (Mac):** Settings → General → Homepage → paste the URL.
- **iPad/iPhone:** Open the page in Safari → Share → *Add to Home Screen*. You get an app icon that opens the page.

## Add or remove buttons

All buttons live in `links.js`, one line each, in the order they appear:

```js
{ name: "Banken", description: "Länsförsäkringar", icon: "bank", color: "blue", url: "https://secure246.lansforsakringer.se/nim" },
```

- **Remove** a button: delete its line.
- **Add** a button: copy a line and change the text. Keep the comma at the end.
- `icon` is a name from the list at the top of `icons.js` (`weather`, `news`, `tv`, `email`, `mailbox`, `bank`, `stocks`, `health`, `phone`, `home`, `web`, `radio`, `music`, `photos`, …). An emoji also works. An unknown name shows a globe.
- `color` is one of `blue`, `red`, `green`, `purple`, `orange`, `teal`, `brown`, `gray`.

You can edit it straight on github.com (open `links.js` and click the ✏️ pencil), even from your phone. The live page updates within a minute or two. If a line is broken, that button is skipped; if the whole file is broken, the page shows a short Swedish message instead of a blank screen. The browser console says what went wrong.

## How the buttons open

Every button (and the search) opens in one shared extra tab. When Grandpa is done, he closes it with ✕ and is back on his start page. Clicking another button reuses that same tab, so tabs don't pile up.

(Opening sites in a pop-up box on the page isn't possible: SVT, Gmail, Facebook, 1177, Kivra and banks all block being shown inside another page.)

## Files

| File | What it is |
|---|---|
| `index.html` | Page structure |
| `style.css` | Look, colors and animations (animations turn off if the device asks for reduced motion) |
| `app.js` | Builds the buttons, greeting, date and clock |
| `links.js` | **The buttons — edit this one** |
| `icons.js` | Icons from [Phosphor Icons](https://phosphoricons.com) (MIT) |
| `fonts/` | [Atkinson Hyperlegible](https://www.brailleinstitute.org/freefont/), a font made for readers with low vision (OFL) |

Note: opening `index.html` directly from disk works, but the font only loads when served over http (GitHub Pages, or `python3 -m http.server` locally).
