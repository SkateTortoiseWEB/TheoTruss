import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProject, projects, getDisplayDims } from "@/data/projects";
import PlateImage from "@/components/PlateImage";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Tallest the carousel stage may be: most of the screen, leaving room for the
// sticky header, the arrows and the slide counter.
const stageCap = (viewportH) => Math.max(220, Math.min(viewportH - 200, 760));

// Size an image to fit a box of maxW x maxH without enlarging it past its
// natural pixel size. dims are the on-screen (post-rotation) dimensions.
function fit(dims, maxW, maxH) {
  if (!dims) return { w: maxW, h: maxH };
  const scale = Math.min(1, maxW / dims.w, maxH / dims.h);
  return { w: dims.w * scale, h: dims.h * scale };
}

// Width of an element and the viewport height, kept up to date on resize.
function useStageSize() {
  const ref = useRef(null);
  const [size, setSize] = useState({ w: 0, vh: typeof window === "undefined" ? 800 : window.innerHeight });
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setSize({ w: el.clientWidth, vh: window.innerHeight });
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);
  return [ref, size];
}

export default function ProjectDetail() {
  const { id } = useParams();
  const project = getProject(id);
  const [slide, setSlide] = useState(0);
  const [stageRef, stage] = useStageSize();

  useEffect(() => {
    window.scrollTo(0, 0);
    setSlide(0);
  }, [id]);

  if (!project) {
    return (
      <div className="px-6 py-24 md:px-12">
        <p className="text-[12px] lowercase tracking-[0.04em] text-black/60">
          project not found.{" "}
          <Link to="/" className="underline underline-offset-2">
            return to gallery
          </Link>
        </p>
      </div>
    );
  }

  const index = projects.findIndex((p) => p.id === project.id);
  const next = projects[(index + 1) % projects.length];

  const main = project.images[0];
  const mainDims = getDisplayDims(main);
  const rest = project.images.slice(1);
  const safeSlide = rest.length === 0 ? 0 : Math.min(slide, rest.length - 1);
  const current = rest[safeSlide];
  const currentDims = current ? getDisplayDims(current) : null;

  // One fixed stage height for the whole carousel: the tallest slide once each
  // is fitted to the column width and the screen-height cap. The box then stays
  // the same size as you click through, and no slide runs off the screen.
  const cap = stageCap(stage.vh);
  const stageH = stage.w
    ? Math.max(...rest.map((src) => fit(getDisplayDims(src), stage.w, cap).h))
    : 0;
  const slideBox = stage.w && current ? fit(currentDims, stage.w, cap) : null;

  return (
    <article className="w-full">
      {/* meta line */}
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-6 py-4 md:px-12">
        <h1 className="text-[15px] font-semibold tracking-[0.02em]">
          {project.title}
        </h1>
        <div className="flex flex-wrap gap-x-6 gap-y-1 text-[12px] lowercase tracking-[0.04em] text-black/60">
          <span>{project.typology}</span>
          <span>{project.location}</span>
          <span>{project.year}</span>
        </div>
      </div>
      <div className="h-px w-full bg-black" aria-hidden="true" />

      {/* split body */}
      <div className="flex flex-col md:flex-row">
        {/* left: images */}
        <div className="md:w-1/2 md:sticky md:top-[73px] md:self-start">
          <div className="flex flex-col gap-4">
            {/* main photo */}
            <div className="w-full">
              <div
                className="mx-auto w-full"
                style={mainDims ? { maxWidth: `${mainDims.w}px` } : undefined}
              >
                <PlateImage
                  src={main}
                  alt={`${project.title} — plate 1`}
                />
              </div>
            </div>

            {/* carousel for the rest */}
            {current && (
              <div className="w-full" ref={stageRef}>
                <div
                  className="group relative flex w-full items-center justify-center"
                  style={stageH ? { height: `${stageH}px` } : undefined}
                >
                  <div style={slideBox ? { width: `${slideBox.w}px` } : { width: "100%" }}>
                    <PlateImage
                      key={current}
                      src={current}
                      alt={`${project.title} — plate ${safeSlide + 2}`}
                    />
                  </div>
                  {rest.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          setSlide((s) => (s - 1 + rest.length) % rest.length)
                        }
                        aria-label="previous image"
                        className="absolute left-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-white/70 text-black opacity-100 transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF0000] md:opacity-0 md:group-hover:opacity-100"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setSlide((s) => (s + 1) % rest.length)}
                        aria-label="next image"
                        className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-white/70 text-black opacity-100 transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF0000] md:opacity-0 md:group-hover:opacity-100"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </>
                  )}
                </div>
                {rest.length > 1 && (
                  <div className="mt-2 text-center text-[11px] lowercase tracking-[0.1em] text-black/40">
                    {safeSlide + 1} / {rest.length}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* right: text */}
        <div className="md:w-1/2">
          <div className="px-6 py-10 md:mx-auto md:max-w-[440px] md:px-0 md:py-16">
            <div className="mb-8 flex items-baseline gap-3 text-[12px] lowercase tracking-[0.06em] text-black/50">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <span className="h-px flex-1 bg-black/20" aria-hidden="true" />
              <span>{project.year}</span>
            </div>
            <div className="flex flex-col gap-5 text-[16px] leading-[1.6] tracking-[-0.01em] text-black">
              {project.body.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div className="mt-10 border-t border-black pt-4">
              <Link
                to={`/project/${next.id}/`}
                className="inline-flex items-baseline gap-2 text-[12px] tracking-[0.06em] text-black/60 hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF0000] focus-visible:ring-offset-2"
              >
                <span>next</span>
                <span className="h-px w-6 bg-black/40" aria-hidden="true" />
                <span>{next.title}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}