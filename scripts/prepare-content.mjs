#!/usr/bin/env node
/**
 * Runs automatically before `npm run dev` and `npm run build`.
 *
 * The site's content is edited in Pages CMS (https://app.pagescms.org), which
 * saves plain files into this repo:
 *   content/projects/<project>.json   one file per project
 *   content/about.json                the About / Contact details
 *   public/images/projects/...        uploaded images, any size, jpg/png/webp
 *
 * This script turns those into what the site actually uses:
 *   - every image is auto-oriented (phone photos), turned if the editor asked
 *     for it, shrunk to at most 2000px and converted to WebP in public/img/
 *   - src/data/content.generated.json with the projects in order, image sizes
 *     and paragraphs, which src/data/projects.js reads.
 *
 * It never stops the site from building because of one bad entry: a missing
 * image or an empty project is skipped with a warning in the build log.
 * Both outputs are generated on every build and are not committed to git.
 */
import { createHash } from "node:crypto";
import { mkdir, readdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const PROJECTS_DIR = path.join(ROOT, "content/projects");
const ABOUT_FILE = path.join(ROOT, "content/about.json");
const PUBLIC_DIR = path.join(ROOT, "public");
const OUT_DIR = path.join(PUBLIC_DIR, "img");
const OUT_JSON = path.join(ROOT, "src/data/content.generated.json");
const MAX_SIZE = 2000;
const QUALITY = 82;
const TURNS = { none: 0, right: 90, "upside-down": 180, left: 270 };

const warnings = [];
const warn = (msg) => {
  warnings.push(msg);
  console.warn(`  ! ${msg}`);
};

async function readJson(file) {
  try {
    return JSON.parse(await readFile(file, "utf8"));
  } catch (err) {
    warn(`Could not read ${path.relative(ROOT, file)}: ${err.message}`);
    return null;
  }
}

const text = (v) => (typeof v === "string" ? v.trim() : v == null ? "" : String(v).trim());

// "Some text\n\nMore text" -> ["Some text", "More text"]
const paragraphs = (v) =>
  text(v)
    .split(/\n\s*\n/)
    .map((p) => p.replace(/\s*\n\s*/g, " ").trim())
    .filter(Boolean);

const slugify = (s) =>
  s
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "image";

const produced = new Set();

/** Optimise one uploaded image. Returns { src, w, h } or null if unusable. */
async function processImage(entry, where) {
  const rawPath = typeof entry === "string" ? entry : entry?.image;
  if (!text(rawPath)) return null; // an empty slot in the list: ignore quietly
  const turnName = (typeof entry === "object" && entry?.turn) || "none";
  const turn = TURNS[turnName] ?? 0;

  const rel = decodeURIComponent(text(rawPath)).replace(/^\/+/, "");
  const file = path.join(PUBLIC_DIR, rel);
  if (!file.startsWith(PUBLIC_DIR + path.sep)) {
    warn(`${where}: image path "${rawPath}" is outside the site, skipped`);
    return null;
  }

  let input;
  try {
    input = await readFile(file);
  } catch {
    warn(`${where}: image "${rawPath}" was not found, skipped`);
    return null;
  }

  const hash = createHash("sha1").update(input).update(`|${turn}|${MAX_SIZE}|${QUALITY}`).digest("hex").slice(0, 10);
  const name = `${slugify(path.parse(rel).name)}-${hash}.webp`;
  const outFile = path.join(OUT_DIR, name);
  produced.add(name);

  try {
    let meta;
    const exists = await stat(outFile).then(() => true, () => false);
    if (exists) {
      meta = await sharp(outFile).metadata();
    } else {
      const source = await sharp(input).metadata();
      const small = Math.max(source.width, source.height) <= MAX_SIZE;
      if (source.format === "webp" && turn === 0 && small && (source.orientation ?? 1) === 1) {
        // Already a web-sized WebP: copy as-is so it is not re-compressed.
        await writeFile(outFile, input);
        meta = source;
      } else {
        // Two passes: honour the camera's own orientation first, then apply
        // the turn chosen in the editor.
        const upright = await sharp(input).rotate().toBuffer();
        const info = await sharp(upright)
          .rotate(turn)
          .resize({ width: MAX_SIZE, height: MAX_SIZE, fit: "inside", withoutEnlargement: true })
          .webp({ quality: QUALITY })
          .toFile(outFile);
        meta = info;
      }
    }
    return { src: `img/${name}`, w: meta.width, h: meta.height };
  } catch (err) {
    warn(`${where}: image "${rawPath}" could not be processed (${err.message}), skipped`);
    return null;
  }
}

async function loadProjects() {
  let files = [];
  try {
    files = (await readdir(PROJECTS_DIR)).filter((f) => f.endsWith(".json")).sort();
  } catch {
    warn("content/projects folder is missing");
  }

  const projects = [];
  for (const f of files) {
    const id = f.replace(/\.json$/, "");
    const data = await readJson(path.join(PROJECTS_DIR, f));
    if (!data) continue;
    const title = text(data.title) || id;
    const where = `Project "${title}"`;

    const images = [];
    for (const entry of Array.isArray(data.images) ? data.images : []) {
      const img = await processImage(entry, where);
      if (img) images.push(img);
    }
    if (!images.length) {
      warn(`${where} has no usable images, so it is hidden from the site`);
      continue;
    }

    const position = Number(data.position);
    projects.push({
      id,
      title,
      year: text(data.year),
      location: text(data.location),
      typology: text(data.type),
      position: Number.isFinite(position) ? position : Infinity,
      cover: images[0].src,
      images,
      body: paragraphs(data.description),
    });
  }

  projects.sort((a, b) => a.position - b.position || a.title.localeCompare(b.title));
  return projects.map(({ position, ...p }) => p);
}

async function loadAbout() {
  const a = (await readJson(ABOUT_FILE)) || {};
  const list = (v) => (Array.isArray(v) ? v : []);
  return {
    statement: text(a.statement),
    location: text(a.location),
    email: text(a.email),
    education: list(a.education)
      .map((e) => ({ title: text(e?.course), place: text(e?.place), years: text(e?.years) }))
      .filter((e) => e.title || e.place),
    experience: list(a.experience)
      .map((e) => ({ role: text(e?.role), place: text(e?.place), years: text(e?.years) }))
      .filter((e) => e.role || e.place),
    awards: list(a.awards)
      .map((e) => ({ title: text(e?.title), years: text(e?.year) }))
      .filter((e) => e.title),
    skills: list(a.skills).map(text).filter(Boolean),
  };
}

await mkdir(OUT_DIR, { recursive: true });
const projects = await loadProjects();
const about = await loadAbout();

// Remove optimised images that nothing uses any more.
for (const f of await readdir(OUT_DIR)) {
  if (!produced.has(f)) await rm(path.join(OUT_DIR, f), { force: true });
}

await mkdir(path.dirname(OUT_JSON), { recursive: true });
await writeFile(OUT_JSON, JSON.stringify({ projects, about }, null, 2) + "\n");

const imageCount = projects.reduce((n, p) => n + p.images.length, 0);
console.log(
  `prepare-content: ${projects.length} projects, ${imageCount} images` +
    (warnings.length ? `, ${warnings.length} warning(s) above` : ""),
);
