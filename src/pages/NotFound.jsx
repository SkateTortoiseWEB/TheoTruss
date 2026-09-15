import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="w-full">
      <div className="px-6 py-24 md:px-12">
        <div className="flex max-w-[400px] flex-col gap-6">
          <div className="flex items-baseline gap-3 text-[11px] lowercase tracking-[0.06em] text-black/50">
            <span>404</span>
            <span className="h-px flex-1 bg-black/20" aria-hidden="true" />
          </div>
          <h1 className="text-[18px] font-semibold tracking-[0.02em]">Page not found</h1>
          <p className="text-[14px] leading-[1.6] tracking-[-0.01em] text-black/70">
            That page doesn&rsquo;t exist.
          </p>
          <Link
            to="/"
            className="inline-flex items-baseline gap-2 text-[11px] lowercase tracking-[0.06em] text-black/60 hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000] focus-visible:ring-offset-2"
          >
            <span>return to gallery</span>
            <span className="h-px w-6 bg-black/40" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
