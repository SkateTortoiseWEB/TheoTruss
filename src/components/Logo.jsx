import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link
      to="/"
      aria-label="theo truss — home"
      className="inline-flex h-8 w-8 shrink-0 items-center justify-center bg-[#CC0000] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000] focus-visible:ring-offset-2"
    >
      {/* The viewBox is sized to the letterforms themselves, so the SVG box and
          the glyphs are the same shape — flex centring is then exact. */}
      <svg
        viewBox="0 0 100 60"
        className="block w-[84%]"
        aria-hidden="true"
        focusable="false"
      >
        <text
          x="50"
          y="59"
          textAnchor="middle"
          textLength="100"
          lengthAdjust="spacingAndGlyphs"
          fontSize="80"
          fontWeight="700"
          fill="#FFFFFF"
        >
          TT
        </text>
      </svg>
    </Link>
  );
}
