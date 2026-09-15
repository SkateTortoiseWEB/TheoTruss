# Theo Truss — portfolio

Static React site (Vite + Tailwind) at https://theotruss.com, deployed to
GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`.

## Editing content (no code needed)

Projects and the About page are edited at **https://app.pagescms.org**:
sign in with GitHub, open this repository, and use **Projects** or
**About and contact**. Saving commits to `main`, and the site updates about
two minutes later (progress: the repo's **Actions** tab).

Content lives in plain files:

- `content/projects/<project>.json` — one file per project
- `content/about.json` — About and Contact details
- `public/images/projects/` — uploaded images (originals, any size)

Editor fields are defined in `.pages.yml`.

## How the build uses it

`npm run build` (and `npm run dev`) first runs `scripts/prepare-content.mjs`,
which:

- orients, turns, resizes (max 2000px) and converts every image to WebP in
  `public/img/`
- writes `src/data/content.generated.json`, read by `src/data/projects.js`

Both outputs are generated and git-ignored. A missing image or a project with
no images is skipped with a warning in the build log rather than failing.

`scripts/build-pages.mjs` then writes an HTML file per page (so clean URLs
like `/project/accretion/` work on GitHub Pages), `404.html` and
`sitemap.xml`, and leaves the original uploads out of the published site.

## Run locally

```bash
npm install
npm run dev     # http://localhost:5173
npm run build   # production build into dist/
```

## Notes

- The contact form posts to Web3Forms. The access key in
  `src/pages/Contact.jsx` is public by design.
- Font: Newsreader, self-hosted via `@fontsource-variable/newsreader`.
