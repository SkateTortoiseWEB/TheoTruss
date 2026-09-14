import { Link } from "react-router-dom";
import { projects, getDims } from "@/data/projects";
import { Image } from "@/components/ui/image";

export default function Home() {
  return (
    <section aria-label="project index" className="w-full">
      <div className="columns-1 gap-3 px-6 py-8 sm:columns-2 md:columns-3 md:px-12 md:py-12 lg:columns-4">
        {projects.map((p, i) => {
          const d = getDims(p.cover);
          return (
            <Link
              key={p.id}
              to={`/project/${p.id}`}
              aria-label={`open project: ${p.title}`}
              className="group relative mb-3 block w-full cursor-pointer break-inside-avoid overflow-hidden bg-black/5 transition-opacity duration-200 hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#FF0000]"
            >
              <Image
                src={p.cover}
                alt={`${p.typology} — ${p.title}, ${p.year}`}
                fittingType="fill"
                originWidth={d?.w}
                originHeight={d?.h}
                className="w-full"
              />
              <span className="pointer-events-none absolute left-0 top-0 px-2 py-1 text-[10px] lowercase tracking-[0.1em] text-white mix-blend-difference">
                {String(i + 1).padStart(2, "0")}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}