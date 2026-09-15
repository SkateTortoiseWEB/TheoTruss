// Site content. Do not edit projects or About text here: they are edited in
// Pages CMS (https://app.pagescms.org) and stored in content/. The build step
// scripts/prepare-content.mjs turns that into content.generated.json, which
// this file reads.
import content from "./content.generated.json";

export const projects = content.projects.map((p) => ({
  ...p,
  images: p.images.map((img) => img.src),
}));

export const cv = content.about;

// On-screen pixel size of each image, keyed by its path.
const imageDims = new Map(
  content.projects.flatMap((p) => p.images.map((img) => [img.src, { w: img.w, h: img.h }])),
);

export const getDims = (url) => imageDims.get(url) ?? null;

// Images are turned upright during the build, so nothing is rotated in the
// browser any more. Kept so PlateImage keeps working unchanged.
export const getRotation = () => 0;

export const getDisplayDims = (url) => getDims(url);

export const getProject = (id) => projects.find((p) => p.id === id);
