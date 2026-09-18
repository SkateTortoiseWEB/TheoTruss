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
const { projects, about } = JSON.parse(await readFile("src/data/content.generated.json", "utf8"));

const SITE = "https://theotruss.com";
const DIST = "dist";
const NAME = "Theo Truss";

// Structured data (schema.org), read by Google but invisible to visitors.
// The homepage carries the Person and the list of projects and is marked as
// the main page about him; the other pages get lighter markup that points
// back to it, so the homepage is the one Google leads with for his name.
const person = {
  "@type": "Person",
  "@id": `${SITE}/#person`,
  name: NAME,
  url: `${SITE}/`,
  mainEntityOfPage: `${SITE}/`,
  image: `${SITE}/og-image.jpg`,
  description: about.statement || "Part I Architecture graduate from the University of Cambridge.",
  jobTitle: "Architectural designer",
  alumniOf: { "@type": "CollegeOrUniversity", name: "University of Cambridge" },
  award: about.awards.map((a) => [a.title, a.years].filter(Boolean).join(" ")),
  knowsAbout: about.skills.length ? about.skills : ["Architecture"],
  ...(about.email ? { email: `mailto:${about.email}` } : {}),
  ...(about.location ? { address: { "@type": "PostalAddress", addressLocality: about.location } } : {}),
};

const website = {
  "@type": "WebSite",
  "@id": `${SITE}/#website`,
  url: `${SITE}/`,
  name: `${NAME} — Architecture Portfolio`,
  inLanguage: "en-GB",
  publisher: { "@id": person["@id"] },
};

const page = (route, type, extra = {}) => ({
  "@type": type,
  "@id": `${SITE}${route}#page`,
  url: SITE + route,
  isPartOf: { "@id": website["@id"] },
  about: { "@id": person["@id"] },
  ...extra,
});

const crumbs = (name, route) => ({
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Gallery", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name, item: SITE + route },
  ],
});

const homeGraph = [
  website,
  person,
  page("/", "CollectionPage", {
    name: `${NAME} — Architecture Portfolio`,
    mainEntity: {
      "@type": "ItemList",
      name: "Projects",
      itemListElement: projects.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: p.title,
        url: `${SITE}/project/${p.id}/`,
      })),
    },
  }),
];

const projectGraph = (p) => [
  page(`/project/${p.id}/`, "WebPage", { name: `${p.title} — ${NAME}` }),
  {
    "@type": "CreativeWork",
    name: p.title,
    url: `${SITE}/project/${p.id}/`,
    creator: { "@id": person["@id"] },
    ...(p.year ? { dateCreated: p.year } : {}),
    ...(p.location ? { locationCreated: { "@type": "Place", name: p.location } } : {}),
    ...(p.typology ? { genre: p.typology } : {}),
    ...(p.body.length ? { description: p.body[0] } : {}),
    image: `${SITE}/${p.cover}`,
  },
  crumbs(p.title, `/project/${p.id}/`),
];

const pages = [
  { route: "/", title: `${NAME} — Architecture Portfolio`, graph: homeGraph },
  {
    route: "/about/",
    title: `About — ${NAME}`,
    graph: [page("/about/", "WebPage", { name: `About — ${NAME}` }), crumbs("About", "/about/")],
  },
  {
    route: "/contact/",
    title: `Contact — ${NAME}`,
    graph: [page("/contact/", "ContactPage", { name: `Contact — ${NAME}` }), crumbs("Contact", "/contact/")],
  },
  ...projects.map((p) => ({
    route: `/project/${p.id}/`,
    title: `${p.title} — ${NAME}`,
    graph: projectGraph(p),
  })),
];

const escape = (s) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

const template = await readFile(path.join(DIST, "index.html"), "utf8");

function render({ route, title, graph }) {
  const url = SITE + route;
  const jsonLd = JSON.stringify({ "@context": "https://schema.org", "@graph": graph ?? [website, person] }, null, 2)
    .replace(/</g, "\\u003c"); // can't end the <script> block early
  let html = template
    .replace(/<title>[^<]*<\/title>/, `<title>${escape(title)}</title>`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${escape(title)}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
    .replace(
      /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
      `<script type="application/ld+json">\n${jsonLd}\n    </script>`,
    );
  for (const [label, re] of [
    ["title", /<title>/],
    ["canonical", /rel="canonical"/],
    ["og:url", /property="og:url"/],
    ["structured data", /application\/ld\+json/],
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
