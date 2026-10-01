export function Mentors() {
  return (
    <section id="mentors" className="relative w-full bg-[#050505] text-[#F5F3EE] py-24 overflow-hidden border-t border-white/5">
      
      {/* Subtle Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(circle at 1px 1px, #F5F3EE 1px, transparent 0)', 
          backgroundSize: '26px 26px' 
        }}
      ></div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8">
        
        {/* Top Heading Section */}
        <div className="mb-14">
          <p className="text-xs tracking-[0.2em] uppercase text-[#2F6FFF] mb-5 font-semibold">
            YOUR MENTORS
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-[56px] leading-[1.15] font-serif tracking-tight text-white">
            Practitioners the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B7CF6] via-[#F06D9B] to-[#F5B23A] italic">
              market already
            </span>{" "}
            follows
          </h2>
        </div>

        {/* Mentors List */}
        <div className="flex flex-col gap-6">
          {mentorsData.map((mentor, index) => (
            <div 
              key={index} 
              className="flex flex-col md:flex-row rounded-2xl border border-white/10 bg-[#0A0A0A] overflow-hidden hover:border-white/20 transition-colors duration-300"
            >
              
              {/* Left Side: Initials Box with Gradient */}
              <div className="relative w-full md:w-64 lg:w-72 shrink-0 h-48 md:h-auto flex items-center justify-center bg-gradient-to-br from-[#1a1a2e] via-[#2a1a3e] to-[#3e1a2e]">
                <span className="font-serif text-5xl md:text-6xl font-bold text-white/90 tracking-wider">
                  {mentor.initials}
                </span>
              </div>

              {/* Right Side: Details */}
              <div className="flex flex-col justify-center p-8 md:p-10">
                
                {/* Mentor Number */}
                <p className="text-[10px] tracking-[0.2em] uppercase text-white/40 font-semibold mb-3">
                  {mentor.number}
                </p>

                {/* Name */}
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-1">
                  {mentor.name}
                </h3>

                {/* Role */}
                <p className="text-[10px] tracking-[0.15em] uppercase text-white/50 font-semibold mb-5">
                  {mentor.role}
                </p>

                {/* Description */}
                <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-xl">
                  {mentor.description}
                </p>

                {/* Tag */}
                <div className="inline-flex items-center gap-2 border border-white/10 rounded-full px-4 py-1.5 w-fit">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/40">
                    <path d="M3 3v18h18"/>
                    <path d="M18 17V9"/>
                    <path d="M13 17V5"/>
                    <path d="M8 17v-3"/>
                  </svg>
                  <span className="text-white/50 text-xs font-medium">
                    {mentor.tag}
                  </span>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

// --- Static Data Array ---
const mentorsData = [
  {
    number: "MENTOR NO. 01",
    initials: "AV",
    name: "Aman Verma",
    role: "HEAD OF FOREX CURRICULUM",
    description: "Leads the live cohort, known for breaking down price action and market structure for complete beginners.",
    tag: "12+ yrs forex"
  },
  {
    number: "MENTOR NO. 02",
    initials: "RK",
    name: "Rhea Kapoor",
    role: "MACRO & RISK LEAD",
    description: "Built Kalkii's risk framework — position sizing, drawdown control, and trading through high-impact news.",
    tag: "Prop-desk background"
  }
];