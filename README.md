# Shadi Vandeventer – CV

Personal CV site built with vanilla HTML, CSS, and JavaScript. No build step required.

## Files

```
index.html   ← Entry point
style.css    ← All styles (dark theme, glass cards, responsive)
main.js      ← CV data + DOM rendering + photo upload logic
```

## Deploying to GitHub Pages

1. Create a new GitHub repository (e.g. `cv` or `shadi-cv`).
2. Push all three files to the `main` branch (root of the repo).
3. Go to **Settings → Pages**.
4. Under **Source**, select **Deploy from a branch** → `main` → `/ (root)`.
5. Hit **Save**. Your site will be live at:
   ```
   https://<your-username>.github.io/<repo-name>/
   ```

## Customisation

- **CV content** — edit the `cv` object at the top of `main.js`.
- **Colors / fonts** — edit CSS variables in the `:root` block of `style.css`.
- **Photos** — click any slot in the Photos section to upload from your device. Images are persisted in `localStorage` (browser-local only; not committed to git).

## Adding real photos to the repo

If you want photos to be part of the site (not just browser-local):

1. Create an `assets/` folder and place your images there.
2. In `main.js`, update the `cv.photos` array:
   ```js
   { src: 'assets/parkour.jpg', caption: 'Parkour training' },
   ```
3. In `applyImage`, the `src` parameter will resolve to the file path automatically.
