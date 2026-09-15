import { getDims, getRotation } from "@/data/projects";

// Images live in public/images/projects and are referenced without a leading
// slash, so BASE_URL keeps them working under a GitHub Pages sub-path.
const resolve = (src) =>
  /^(https?:)?\/\//.test(src) ? src : import.meta.env.BASE_URL + src.replace(/^\//, "");

function Plate({ src, alt, dims, className = "" }) {
  return (
    <img
      src={resolve(src)}
      alt={alt}
      width={dims?.w}
      height={dims?.h}
      loading="lazy"
      decoding="async"
      className={className}
    />
  );
}

/**
 * A portfolio plate. Applies the per-image rotation recorded in
 * src/data/projects.js.
 *
 * For a quarter turn the rendered box swaps width and height, so the outer div
 * carries the rotated aspect ratio and the inner div is sized so that, once
 * turned, it fills that box exactly — no cropping, no gaps.
 */
export default function PlateImage({ src, alt, className = "" }) {
  const dims = getDims(src);
  const rotation = getRotation(src);

  if (rotation === 0 || rotation === 180) {
    return (
      <Plate
        src={src}
        alt={alt}
        dims={dims}
        className={`block h-auto w-full ${rotation === 180 ? "rotate-180" : ""} ${className}`}
      />
    );
  }

  const innerWidth = dims ? `${(dims.w / dims.h) * 100}%` : "100%";

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={dims ? { aspectRatio: `${dims.h} / ${dims.w}` } : undefined}
    >
      <div
        className="absolute left-1/2 top-1/2"
        style={{
          width: innerWidth,
          transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
        }}
      >
        <Plate src={src} alt={alt} dims={dims} className="block h-auto w-full" />
      </div>
    </div>
  );
}
