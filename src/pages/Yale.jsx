import { useEffect } from "react";
import { Link } from "react-router-dom";

const FILE = "/yale/TheoTruss_Bass_Yale.pdf";

const linkClass =
  "inline-flex items-baseline gap-2 text-[11px] lowercase tracking-[0.06em] text-black/60 hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000] focus-visible:ring-offset-2";

export default function Yale() {
  // Unlisted page: keep it out of search results (the prerendered HTML carries
  // the same tag for crawlers that don't run scripts).
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);

  return (
    <section className="w-full">
      <div className="px-6 py-10 md:px-12 md:py-16">
        <div className="flex max-w-[620px] flex-col gap-8">
          <div className="flex flex-col gap-3">
            <h1 className="text-[18px] font-semibold tracking-[0.02em]">Application for Yale</h1>
            <p className="text-[16px] leading-[1.6] tracking-[-0.01em] text-black">
              Theo Truss &mdash; application portfolio (PDF, 20 pages, 22&nbsp;MB).
            </p>
          </div>

          <div className="flex flex-col items-start gap-4">
            <a href={FILE} download className={linkClass}>
              <span>download application (pdf)</span>
              <span className="h-px w-6 bg-black/40" aria-hidden="true" />
            </a>
            <Link to="/" className={linkClass}>
              <span>view the full portfolio site</span>
              <span className="h-px w-6 bg-black/40" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
