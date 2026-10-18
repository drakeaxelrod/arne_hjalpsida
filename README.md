# Arnes startsida

A simple home page in Swedish with big buttons, made for Grandpa. It's a single `index.html` with no build step, so GitHub Pages can host it for free.

## Put it on GitHub Pages

1. Create a new **public** repository on GitHub, for example `arne_hjalpside`.
2. Push this folder to it:
   ```sh
   git init
   git add .
   git commit -m "Arnes startsida"
   git branch -M main
   git remote add origin git@github.com:drakeaxelrod/arne_hjalpside.git
   git push -u origin main
   ```
3. On GitHub, open **Settings → Pages**. Under *Build and deployment*, set **Source: Deploy from a branch**, choose **Branch: main**, folder **/ (root)**, and click Save.
4. After a minute or so the page is live at `https://drakeaxelrod.github.io/arne_hjalpside/`.

## Make it his browser's home page

- **Chrome:** Settings → On startup → *Open a specific page* → add the URL. Also go to Settings → Appearance → *Show home button* and paste the URL there.
- **Edge:** Settings → Start, home, and new tabs → *When Edge starts* → open these pages → add the URL. Turn on *Show home button* and set it to the URL.
- **Firefox:** Settings → Home → *Homepage and new windows* → Custom URLs → paste the URL.
- **Safari (Mac):** Settings → General → Homepage → paste the URL.
- **iPad/iPhone:** Open the page in Safari → Share → *Add to Home Screen*. You get an app icon that opens the page.

## Add or remove buttons

All buttons live in `lankar.js`, one line each, in the order they appear:

```js
{ namn: "Banken", beskrivning: "Swedbank", ikon: "🏦", farg: "gron", adress: "https://www.swedbank.se/" },
```

- **Remove** a button: delete its line.
- **Add** a button: copy a line and change the text. Keep the comma at the end.
- `farg` is one of `bla`, `rod`, `gron`, `lila`, `orange`, `turkos`, `brun`, `gra`.

You can edit it straight on github.com (open `lankar.js` and click the ✏️ pencil), even from your phone. The live page updates within a minute or two. If the buttons disappear after an edit, a comma or quote mark is probably missing.

## How the buttons open

Every button opens its site in one shared extra tab. When Grandpa is done, he closes it with ✕ and is back on his start page. Clicking another button reuses that same tab, so tabs don't pile up.

(Opening sites in a pop-up box on the page isn't possible: SVT, Gmail, Facebook, YouTube, 1177 and banks all block being shown inside another page.)
