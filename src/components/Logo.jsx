import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link
      to="/"
      aria-label="theo truss — home"
      className="inline-flex h-8 w-8 shrink-0 items-center justify-center bg-[#CC0000] text-white font-bold text-[16px] leading-none tracking-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000] focus-visible:ring-offset-2"
    >
      TT
    </Link>
  );
}