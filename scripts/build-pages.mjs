#!/usr/bin/env node
/**
 * Runs after `vite build`. GitHub Pages only serves files that exist, so a
 * visitor (or Google) going straight to theotruss.com/about would get a 404.
 * This writes a copy of dist/index.html for every page of the site, e.g.
 *   dist/about/index.html
 *   dist/project/accretion/index.html
 * each with its own title and canonical address, plus dist/404.html for
 * unknown addresses, and regenerates dist/sitemap.xml to list them all.
 */
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
// Written by scripts/prepare-content.mjs, which runs just before this.
const { projects } = JSON.parse(await readFile("src/data/content.generated.json", "utf8"));

const SITE = "https://theotruss.com";
const DIST = "dist";
const NAME = "Theo Truss";

const pages = [
  { route: "/", title: `${NAME} — Architecture Portfolio` },
  { route: "/about/", title: `About — ${NAME}` },
  { route: "/contact/", title: `Contact — ${NAME}` },
  ...projects.map((p) => ({
    route: `/project/${p.id}/`,
    title: `${p.title} — ${NAME}`,
  })),
];

const escape = (s) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

const template = await readFile(path.join(DIST, "index.html"), "utf8");

function render({ route, title }) {
  const url = SITE + route;
  let html = template
    .replace(/<title>[^<]*<\/title>/, `<title>${escape(title)}</title>`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${escape(title)}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`);
  for (const [label, re] of [
    ["title", /<title>/],
    ["canonical", /rel="canonical"/],
    ["og:url", /property="og:url"/],
  ]) {
    if (!re.test(html)) throw new Error(`build-pages: index.html is missing ${label}`);
  }
  return html;
}

for (const page of pages) {
  const file = path.join(DIST, page.route, "index.html");
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, render(page));
}

// Unknown addresses: GitHub Pages serves 404.html, and the app shows its own
// "not found" page. Search engines are told not to index it.
const notFound = render({ route: "/", title: `Not found — ${NAME}` })
  .replace(/\s*<link rel="canonical"[^>]*>/, "")
  .replace("</head>", '    <meta name="robots" content="noindex" />\n  </head>');
await writeFile(path.join(DIST, "404.html"), notFound);

const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  pages.map((p) => `  <url>\n    <loc>${SITE}${p.route}</loc>\n  </url>\n`).join("") +
  `</urlset>\n`;
await writeFile(path.join(DIST, "sitemap.xml"), sitemap);

// The original uploads (public/images/projects) are only the source for the
// optimised copies in img/. Don't publish them: they can be huge.
await rm(path.join(DIST, "images", "projects"), { recursive: true, force: true });

console.log(`build-pages: wrote ${pages.length} pages, 404.html and sitemap.xml`);
