# Theo Truss — portfolio

Static React site: Vite + Tailwind, deployed to GitHub Pages by
`.github/workflows/deploy.yml` on every push to `main`.

## Run locally

```bash
npm install
npm run dev     # http://localhost:5173
npm run build   # production build into dist/
npm run preview # serve dist/ locally
```

## Content

All copy and project data live in `src/data/projects.js`:

- `projects` — one entry per project (`id`, `title`, `year`, `location`,
  `typology`, `cover`, `images`, `body`)
- `cv` — the About page (statement, education, experience, awards, skills, email)
- `imageDims` / `imageRotation` — natural pixel size and on-screen rotation for
  each image file, keyed by filename

Images live in `public/images/projects/` and are referenced by relative path
(`images/projects/<file>`), never with a leading slash — the site is served from
a sub-path on GitHub Pages, so a leading slash would 404.

To add a project: drop the images in `public/images/projects/`, add their
dimensions to `imageDims`, and add the project object to `projects`.

## Notes

- Routing is `HashRouter`, so URLs look like `/#/project/accretion`. That is what
  makes deep links work on GitHub Pages without a custom 404 fallback.
- The contact form posts to Web3Forms. The access key in `src/pages/Contact.jsx`
  is public by design — it identifies the destination inbox, not an account.
