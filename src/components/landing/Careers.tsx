export function Careers() {
  return (
    <section id="careers" className="relative w-full bg-[#050505] text-[#F5F3EE] py-24 overflow-hidden border-t border-white/5">
      
      {/* Subtle Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(circle at 1px 1px, #F5F3EE 1px, transparent 0)', 
          backgroundSize: '26px 26px' 
        }}
      ></div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8 text-center">
        
        {/* Briefcase Icon */}
        <div className="flex justify-center mb-6">
          <BriefcaseIcon />
        </div>

        {/* Main Heading */}
        <h2 className="text-4xl md:text-5xl lg:text-[56px] leading-[1.15] font-serif tracking-tight text-white mb-6">
          Careers at Kalkii
        </h2>

        {/* Description */}
        <p className="text-white/60 text-lg leading-relaxed max-w-xl mx-auto mb-10">
          We're a small team of traders and educators. If you'd like to teach or build with us, reach out — we're not actively hiring, but we always read every note.
        </p>

        {/* CTA Button */}
        <a 
          href="#contact" 
          className="inline-flex items-center gap-2 border border-white/20 text-white px-8 py-4 rounded-full font-medium hover:border-white/50 transition-colors text-base"
        >
          Get in touch
          <ArrowUpRightIcon />
        </a>

        {/* Bottom Divider */}
        <div className="border-t border-white/10 mt-16"></div>

      </div>
    </section>
  );
}

// --- Static SVG Icons ---
function BriefcaseIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2F6FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2"/>
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    </svg>
  );
}

function ArrowUpRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17 17 7"/>
      <path d="M7 7h10v10"/>
    </svg>
  );
}