#!/usr/bin/env node
/**
 * One-off migration: pull every remote portfolio image into the repo and
 * rewrite src/data/projects.js to point at the local copies.
 *
 *   node scripts/localise-images.mjs            # webp, max 2000px
 *   node scripts/localise-images.mjs --width 2600
 *   node scripts/localise-images.mjs --original # download untouched originals
 *   node scripts/localise-images.mjs --keep-names # don't strip the CDN hash prefix
 *
 * Run it once, check the site still looks right, then commit
 * public/images/projects/ and the rewritten src/data/projects.js.
 * After that the CDN is never contacted again.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { argv } from "node:process";
import path from "node:path";

const DATA_FILE = "src/data/projects.js";
const OUT_DIR = "public/images/projects";
const PUBLIC_PREFIX = "images/projects";

const args = argv.slice(2);
const original = args.includes("--original");
const keepNames = args.includes("--keep-names");
const widthArg = args.indexOf("--width");
const maxWidth = widthArg === -1 ? 2000 : Number(args[widthArg + 1]);

// Any absolute image URL in the data file. Covers the current CDN host and
// anything else that might be pasted in later.
const URL_RE = /https:\/\/[^"'\s)]+\.(?:jpe?g|png|webp|gif)/gi;

/** Uploaded files carry a CDN hash prefix ("a1b2c3d4e_name.jpg"); drop it. */
function tidyName(name) {
  return keepNames ? name : name.replace(/^[0-9a-f]{6,12}_/i, "");
}

/** The CDN resizes on the fly; ask it for a bounded webp so the repo stays small. */
function optimisedUrl(url) {
  const u = new URL(url);
  const dir = u.pathname.replace(/\/[^/]+$/, "");
  const file = u.pathname.split("/").pop();
  const stem = file.replace(/\.[a-z0-9]+$/i, "");
  const params = [
    `w_${maxWidth}`,
    `h_${maxWidth}`,
    "q_85",
    "usm_0.66_1.00_0.01",
    "enc_webp",
    "quality_auto",
  ].join(",");
  return `${u.origin}${dir}/v1/fit/${params}/${stem}.webp`;
}

async function download(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 1024) throw new Error(`suspiciously small (${buf.length} bytes)`);
  await writeFile(dest, buf);
  return buf.length;
}

const source = await readFile(DATA_FILE, "utf8");
const urls = [...new Set(source.match(URL_RE) ?? [])];

if (urls.length === 0) {
  console.log("No remote image URLs left in " + DATA_FILE + " — nothing to do.");
  process.exit(0);
}

await mkdir(OUT_DIR, { recursive: true });
console.log(`${urls.length} images → ${OUT_DIR}\n`);

/** original filename -> filename actually written to disk */
const renamed = new Map();
let bytes = 0;
const failures = [];

for (const url of urls) {
  const srcName = decodeURIComponent(url.split("/").pop());
  const base = tidyName(srcName);
  const webpName = base.replace(/\.[a-z0-9]+$/i, "") + ".webp";
  const plainName = base;
  const taken = [...renamed.values()];
  if (taken.includes(webpName) || taken.includes(plainName)) {
    failures.push(`${srcName}: name collision on ${base} — rerun with --keep-names`);
    console.log(`  FAIL ${srcName} — name collision on ${base}`);
    continue;
  }

  if (!original) {
    try {
      const n = await download(optimisedUrl(url), path.join(OUT_DIR, webpName));
      renamed.set(srcName, webpName);
      bytes += n;
      console.log(`  ok   ${webpName}  ${(n / 1024).toFixed(0)} kB`);
      continue;
    } catch (err) {
      console.log(`  warn ${srcName} — webp failed (${err.message}), trying original`);
    }
  }

  try {
    const n = await download(url, path.join(OUT_DIR, plainName));
    renamed.set(srcName, plainName);
    bytes += n;
    console.log(`  ok   ${plainName}  ${(n / 1024).toFixed(0)} kB`);
  } catch (err) {
    failures.push(`${srcName}: ${err.message}`);
    console.log(`  FAIL ${srcName} — ${err.message}`);
  }
}

if (failures.length) {
  console.error(
    `\n${failures.length} image(s) could not be downloaded. ` +
      `Fix those before rewriting the data file:\n  ` +
      failures.join("\n  ")
  );
  process.exit(1);
}

// Rewrite the data file: filenames first (this also fixes the imageDims and
// imageRotation keys, which are keyed by filename), then the URL prefix.
let out = source;
for (const [from, to] of renamed) {
  if (from !== to) out = out.split(from).join(to);
}
out = out.replace(/https:\/\/[^"'\s)]+\/([^/"'\s)]+\.(?:jpe?g|png|webp|gif))/gi, `${PUBLIC_PREFIX}/$1`);

await writeFile(DATA_FILE, out);

console.log(
  `\nDone. ${renamed.size} files, ${(bytes / 1024 / 1024).toFixed(1)} MB total.\n` +
    `${DATA_FILE} now points at ${PUBLIC_PREFIX}/.\n` +
    `Check with: npm run build && npm run preview`
);
