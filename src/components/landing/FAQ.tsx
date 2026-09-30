export function FAQ() {
  return (
    <section id="faq" className="relative w-full bg-[#050505] text-[#F5F3EE] py-24 overflow-hidden border-t border-white/5">

      {/* Subtle Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #F5F3EE 1px, transparent 0)',
          backgroundSize: '26px 26px'
        }}
      ></div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8">

        {/* Top Heading Section */}
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.2em] uppercase text-[#2F6FFF] mb-5 font-semibold">
            QUESTIONS
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-[56px] leading-[1.15] font-serif tracking-tight text-white">
            Frequently asked questions
          </h2>
        </div>

        {/* FAQ List */}
        <div className="flex flex-col gap-4">
          {faqsData.map((faq, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/10 bg-[#0A0A0A] px-6 py-5 flex items-center justify-between hover:border-white/20 transition-colors duration-300"
            >
              <p className="text-white font-semibold text-base pr-4">
                {faq.q}
              </p>
              <div className="text-[#2F6FFF] shrink-0">
                <PlusIcon />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

// --- Static Data Array (Exactly as per the image) ---
const faqsData = [
  {
    q: "Do I need any prior trading experience?"
  },
  {
    q: "Is the class live, recorded, or both?"
  },
  {
    q: "Will Kalkii give me trade signals or tips?"
  },
  {
    q: "What pairs and markets are covered?"
  },
  {
    q: "How much time should I set aside each week?"
  }
];

// --- Static SVG Icon ---
function PlusIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}