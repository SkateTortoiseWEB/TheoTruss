import { Image } from "@/components/ui/image";
import { getDims, getRotation } from "@/data/projects";

/**
 * A portfolio plate. Wraps the base44 Image and applies the per-image rotation
 * recorded in src/data/projects.js.
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
      <Image
        src={src}
        alt={alt}
        fittingType="fill"
        originWidth={dims?.w}
        originHeight={dims?.h}
        className={`w-full ${rotation === 180 ? "rotate-180" : ""} ${className}`}
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
        <Image
          src={src}
          alt={alt}
          fittingType="fill"
          originWidth={dims?.w}
          originHeight={dims?.h}
          className="w-full"
        />
      </div>
    </div>
  );
}
