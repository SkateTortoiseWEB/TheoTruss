import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Download, Globe } from "lucide-react";

const FILE = "/89630879975560535957978716155090/TheoTruss_Bass_Yale.pdf";

const buttonClass =
  "inline-flex w-full items-center gap-4 border border-black px-6 py-5 text-[16px] font-semibold tracking-[0.02em] text-black transition-colors hover:bg-black hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000] focus-visible:ring-offset-2 sm:w-auto";

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

          <div className="flex flex-col items-stretch gap-4 sm:items-start">
            <a href={FILE} download className={buttonClass}>
              <Download className="h-6 w-6 shrink-0" aria-hidden="true" />
              <span>Download application (PDF)</span>
            </a>
            <Link to="/" className={buttonClass}>
              <Globe className="h-6 w-6 shrink-0" aria-hidden="true" />
              <span>View the full portfolio site</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
