# Arnes startsida

A simple home page in Swedish with big buttons, made for Grandpa. It's a single `index.html` with no build step, so GitHub Pages can host it for free.

## Put it on GitHub Pages

1. Create a new **public** repository on GitHub, for example `arne-startsida`.
2. Push this folder to it:
   ```sh
   git init
   git add .
   git commit -m "Arnes startsida"
   git branch -M main
   git remote add origin git@github.com:<your-username>/arne-startsida.git
   git push -u origin main
   ```
3. On GitHub, open **Settings → Pages**. Under *Build and deployment*, set **Source: Deploy from a branch**, choose **Branch: main**, folder **/ (root)**, and click Save.
4. After a minute or so the page is live at `https://<your-username>.github.io/arne-startsida/`.

## Make it his browser's home page

- **Chrome:** Settings → On startup → *Open a specific page* → add the URL. Also go to Settings → Appearance → *Show home button* and paste the URL there.
- **Edge:** Settings → Start, home, and new tabs → *When Edge starts* → open these pages → add the URL. Turn on *Show home button* and set it to the URL.
- **Firefox:** Settings → Home → *Homepage and new windows* → Custom URLs → paste the URL.
- **Safari (Mac):** Settings → General → Homepage → paste the URL.
- **iPad/iPhone:** Open the page in Safari → Share → *Add to Home Screen*. You get an app icon that opens the page.

## Change the buttons

Open `index.html` and find the `<ul class="knappar">` list. Each button is one `<li>` block:

```html
<li>
  <a class="knapp gron" href="https://www.example.se/">
    <span class="ikon" aria-hidden="true">🏦</span>
    <span class="namn">Banken</span>
    <span class="beskrivning">Swedbank</span>
  </a>
</li>
```

Colors: `bla`, `rod`, `gron`, `lila`, `orange`, `turkos`, `brun`, `gra`. Commit and push, and the live page updates within a minute or two.
