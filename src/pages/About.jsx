import { cv } from "@/data/projects";

function Section({ label, children }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline gap-3">
        <span className="text-[10px] lowercase tracking-[0.14em] text-black/50">{label}</span>
        <span className="h-px flex-1 bg-black/15" aria-hidden="true" />
      </div>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}

export default function About() {
  return (
    <section className="w-full">
      <div className="px-6 py-10 md:px-12 md:py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_400px] md:gap-16">
          {/* left: statement */}
          <div className="flex flex-col gap-8 md:justify-between">
            <div className="flex flex-col gap-6">
              <h1 className="text-[14px] font-semibold tracking-[0.02em]">About</h1>
              <p className="max-w-[520px] text-[12px] leading-[1.6] tracking-[-0.01em] text-black">
                {cv.statement}
              </p>
            </div>
            <div className="flex flex-col gap-1 text-[11px] lowercase tracking-[0.04em] text-black/60">
              <span>theo truss</span>
              <span>shrewsbury, uk</span>
              <a
                href={`mailto:${cv.email}`}
                className="underline underline-offset-2 hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF0000] focus-visible:ring-offset-2"
              >
                {cv.email}
              </a>
            </div>
          </div>

          {/* right: cv */}
          <div className="flex w-full max-w-[400px] flex-col gap-10">
            <Section label="education">
              {cv.education.map((e, i) => (
                <div key={i} className="flex items-baseline justify-between gap-4 text-[13px] lowercase tracking-[-0.01em]">
                  <span className="text-black">{e.title}</span>
                  <span className="text-right text-black/50">{e.place} — {e.years}</span>
                </div>
              ))}
            </Section>

            <Section label="experience">
              {cv.experience.map((e, i) => (
                <div key={i} className="flex items-baseline justify-between gap-4 text-[13px] lowercase tracking-[-0.01em]">
                  <span className="text-black">{e.role}</span>
                  <span className="text-right text-black/50">{e.place} — {e.years}</span>
                </div>
              ))}
            </Section>

            <Section label="skills">
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-[13px] lowercase tracking-[-0.01em] text-black">
                {cv.skills.map((s, i) => (
                  <span key={i}>
                    {s}
                    {i < cv.skills.length - 1 ? <span className="text-black/30"> ·</span> : null}
                  </span>
                ))}
              </div>
            </Section>
          </div>
        </div>
      </div>
    </section>
  );
}