import { Link } from "react-router-dom";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full">
      <div className="h-px w-full bg-black" aria-hidden="true" />
      <div className="flex flex-col gap-1 px-6 py-6 text-[11px] lowercase tracking-[0.04em] text-black/70 md:flex-row md:items-center md:justify-between md:px-12">
        <span>© {year} theo truss. all images and drawings are his own work.</span>
        <Link
          to="/privacy/"
          className="hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF0000] focus-visible:ring-offset-2"
        >
          privacy
        </Link>
      </div>
    </footer>);

}