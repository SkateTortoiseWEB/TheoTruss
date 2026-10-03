import { privacy } from "@/data/projects";

export default function Privacy() {
  return (
    <section className="w-full">
      <div className="px-6 py-10 md:px-12 md:py-16">
        <div className="flex max-w-[620px] flex-col gap-10">
          <div className="flex flex-col gap-3">
            <h1 className="text-[18px] font-semibold tracking-[0.02em]">Privacy</h1>
            {privacy.updated ? (
              <p className="text-[11px] lowercase tracking-[0.04em] text-black/60">
                last updated {privacy.updated}
              </p>
            ) : null}
          </div>

          {privacy.sections.map((s, i) => (
            <div key={i} className="flex flex-col gap-3">
              <div className="flex items-baseline gap-3">
                <h2 className="text-[10px] lowercase tracking-[0.14em] text-black/60">{s.heading}</h2>
                <span className="h-px flex-1 bg-black/15" aria-hidden="true" />
              </div>
              <div className="flex flex-col gap-4">
                {s.body.map((p, j) => (
                  <p key={j} className="text-[16px] leading-[1.6] tracking-[-0.01em] text-black">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
