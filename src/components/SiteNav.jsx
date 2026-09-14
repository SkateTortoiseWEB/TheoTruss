import { Link, useLocation } from "react-router-dom";
import Logo from "@/components/Logo";

const nav = [
  { label: "index", to: "/" },
  { label: "about", to: "/about" },
  { label: "contact", to: "/contact" },
];

export default function SiteNav() {
  const { pathname } = useLocation();
  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      <div className="flex items-center gap-6 px-6 py-4 md:px-12 md:py-5">
        <Logo />
        <nav className="flex items-center gap-5" aria-label="primary">
          {nav.map((item) => {
            const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={
                  "text-[11px] uppercase tracking-[0.14em] lowercase focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF0000] focus-visible:ring-offset-2 " +
                  (active ? "text-black" : "text-black/50 hover:text-black")
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="h-px w-full bg-black" aria-hidden="true" />
    </header>
  );
}