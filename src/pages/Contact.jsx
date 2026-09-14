import { useState } from "react";
import { base44 } from "@/api/base44Client";
import { cv } from "@/data/projects";

export default function Contact() {
  const [form, setForm] = useState({ name: "", firm: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [error, setError] = useState("");

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const valid = form.name.trim() && form.email.trim() && form.message.trim();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!valid || status === "sending") return;
    setStatus("sending");
    setError("");
    try {
      await base44.integrations.Core.SendEmail({
        to: cv.email,
        subject: `portfolio enquiry — ${form.name}${form.firm ? ` / ${form.firm}` : ""}`,
        text: `name: ${form.name}\nfirm: ${form.firm || "—"}\nemail: ${form.email}\n\n${form.message}`
      });
      setStatus("sent");
      setForm({ name: "", firm: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
      setError("message could not be sent. please email theo directly.");
    }
  };

  const fields = [
  { key: "name", label: "name", type: "text", required: true, full: false },
  { key: "firm", label: "firm", type: "text", required: false, full: false },
  { key: "email", label: "email", type: "email", required: true, full: false }];


  return (
    <section className="w-full">
      <div className="px-6 py-10 md:px-12 md:py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_400px] md:gap-16">
          {/* left: statement */}
          <div className="flex flex-col gap-6">
            <h1 className="text-[13px] font-semibold lowercase tracking-[0.02em]">
              contact
            </h1>
            <p className="max-w-[360px] text-[14px] leading-[1.6] tracking-[-0.01em] text-black">seeking a part 1 placement for 2026. 



            </p>
            <div className="flex flex-col gap-1 text-[11px] lowercase tracking-[0.04em] text-black/60">
              <span>theo truss</span>
              <span>Shrewsbury, uk</span>
              <a
                href={`mailto:${cv.email}`}
                className="underline underline-offset-2 hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF0000] focus-visible:ring-offset-2">
                
                {cv.email}
              </a>
            </div>
          </div>

          {/* right: form */}
          <div className="w-full max-w-[400px]">
            {status === "sent" ?
            <div className="border-l-2 border-[#FF0000] pl-4 text-[13px] lowercase tracking-[0.02em] text-black">
                message sent. theo will reply shortly.
                <button
                onClick={() => setStatus("idle")}
                className="mt-4 block text-[11px] lowercase tracking-[0.06em] text-black/60 underline underline-offset-2 hover:text-black">
                
                  send another
                </button>
              </div> :

            <form onSubmit={onSubmit} className="flex flex-col gap-8" noValidate>
                <div className="grid grid-cols-2 gap-x-6 gap-y-8">
                  {fields.map((f) =>
                <div key={f.key} className={f.full ? "col-span-2" : "col-span-1"}>
                      <label
                    htmlFor={f.key}
                    className="mb-2 block text-[10px] lowercase tracking-[0.14em] text-black/60">
                    
                        {f.label}
                        {f.required ? " *" : ""}
                      </label>
                      <input
                    id={f.key}
                    name={f.key}
                    type={f.type}
                    value={form[f.key]}
                    onChange={update(f.key)}
                    autoComplete="off"
                    className="w-full border-0 border-b border-black bg-transparent px-0 py-2 text-[14px] tracking-[-0.01em] text-black placeholder:text-black/30 focus:border-black focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF0000] focus-visible:ring-offset-2" />
                  
                    </div>
                )}
                </div>

                <div>
                  <label
                  htmlFor="message"
                  className="mb-2 block text-[10px] lowercase tracking-[0.14em] text-black/60">
                  
                    message *
                  </label>
                  <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={update("message")}
                  className="w-full resize-none border-0 border-b border-black bg-transparent px-0 py-2 text-[14px] leading-[1.5] tracking-[-0.01em] text-black placeholder:text-black/30 focus:border-black focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF0000] focus-visible:ring-offset-2" />
                
                </div>

                {error &&
              <p className="text-[11px] lowercase tracking-[0.04em] text-[#FF0000]">
                    {error}
                  </p>
              }

                <button
                type="submit"
                disabled={!valid || status === "sending"}
                className="w-full bg-black py-4 text-[11px] uppercase tracking-[0.14em] lowercase text-white disabled:cursor-not-allowed disabled:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF0000] focus-visible:ring-offset-2">
                
                  {status === "sending" ? "sending" : "send message"}
                </button>
              </form>
            }
          </div>
        </div>
      </div>
    </section>);

}