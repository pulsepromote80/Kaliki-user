import Link from "next/link";

export function Hero() {
  return (
    // 1. Outer section is now full width with dark background
    <section className="relative w-full bg-[#050505] text-[#F5F3EE] overflow-hidden  pt-14 sm:pt-20">
      
      {/* 2. Inner container limits the width and centers the content */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-16 pt-28 pb-24">
        
        {/* Background Blobs (Glow Effects) */}
        <div className="absolute w-[420px] h-[420px] -top-32 -left-40 rounded-full blur-[100px] opacity-20 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(47,111,255,0.8), transparent 65%)' }}></div>
        <div className="absolute w-[380px] h-[380px] top-10 right-0 rounded-full blur-[100px] opacity-20 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(232,72,47,0.8), transparent 65%)' }}></div>
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #F5F3EE 1px, transparent 0)', backgroundSize: '26px 26px' }}></div>

        {/* ========================================================= */}
        {/* MAIN HERO GRID (Text + Chart) */}
        {/* ========================================================= */}
        <div className="relative z-10 grid lg:grid-cols-[1.05fr_0.95fr] gap-14 items-center mb-24">
          
          {/* Left Column: Text Content */}
          <div className="relative z-10">
            {/* Tagline */}
            <p className="text-xs tracking-[0.2em] uppercase text-[#2F6FFF] mb-6 flex items-center gap-2 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1FC97D] inline-block animate-pulse"></span>
              Forex Trading Education · Online & Live
            </p>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-[64px] leading-[1.05] mb-6 font-serif tracking-tight">
              Learn the market.<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#F59E0B] italic">
                Master the process.
              </span>
            </h1>

            {/* Description */}
            <p className="text-white/60 text-lg leading-relaxed max-w-lg mb-9">
              Kalkii is a structured path into forex — chart reading, risk, and macro, taught by mentors who trade it themselves. No tips, no signals, just a repeatable process.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-10">
              <Link href="#" className="inline-flex items-center gap-2 bg-[#F5F3EE] text-black px-7 py-3.5 rounded-full font-medium hover:bg-white transition-colors">
                Enroll now 
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </Link>
              <Link href="#curriculum" className="border border-white/20 px-7 py-3.5 rounded-full font-medium hover:border-white/50 transition-colors">
                View curriculum
              </Link>
            </div>

            {/* Features List */}
            <div className="flex flex-wrap gap-4 md:gap-8 text-sm text-white/45 font-medium">
              <span>6 structured phases</span>
              <span className="hidden md:inline">·</span>
              <span>Live & recorded formats</span>
              <span className="hidden md:inline">·</span>
              <span>Mentor-reviewed trades</span>
            </div>
          </div>

          {/* Right Column: TradingView Chart & Floating Cards */}
          <div className="relative z-10 mt-10 lg:mt-0">
            
            {/* Chart Container */}
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-black h-[380px] shadow-2xl">
              <iframe 
                title="EURUSD" 
                src="https://s.tradingview.com/widgetembed/?frameElementId=tv_hero&symbol=FX:EURUSD&interval=60&hidesidetoolbar=1&symboledit=0&saveimage=0&toolbarbg=050505&studies=[]&theme=dark&style=1&timezone=Etc/UTC&withdateranges=0&hidevolume=1" 
                className="w-full h-full" 
                frameBorder="0" 
                loading="lazy"
              ></iframe>
            </div>

            {/* Floating Card 1: Live Pair (Bottom Left) */}
            <div className="absolute -bottom-6 -left-6 hidden sm:block rounded-xl bg-[#0A0E1A] border border-white/10 px-5 py-4 shadow-xl backdrop-blur-md">
              <p className="text-xs text-white/40 tracking-[0.15em] uppercase mb-1 flex items-center gap-1.5 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1FC97D] inline-block animate-pulse"></span>
                Live pair
              </p>
              <p className="font-serif text-lg font-bold text-white">EUR / USD</p>
            </div>

            {/* Floating Card 2: Bullish Structure (Top Right) */}
            <div className="absolute -top-6 -right-4 hidden md:block rounded-xl bg-[#0A0E1A] border border-white/10 px-4 py-3 shadow-xl backdrop-blur-md">
              <div className="flex items-center gap-2 text-xs text-[#1FC97D] font-semibold">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
                Bullish structure
              </div>
            </div>

          </div>
        </div>

        {/* ========================================================= */}
        {/* NEW SECTION: Stats Cards (Added at the very bottom) */}
        {/* ========================================================= */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Phases */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-white/20 transition-colors">
            <div className="text-[#2F6FFF] mb-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/>
                <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/>
                <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>
              </svg>
            </div>
            <p className="font-serif text-4xl font-bold text-white mb-1">6</p>
            <p className="text-white font-semibold text-sm mb-2">Phases</p>
            <p className="text-white/40 text-[10px] tracking-[0.15em] uppercase font-medium leading-relaxed">
              Structured, sequenced<br/>curriculum
            </p>
          </div>

          {/* Card 2: Mentors */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-white/20 transition-colors">
            <div className="text-[#2F6FFF] mb-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <p className="font-serif text-4xl font-bold text-white mb-1">2</p>
            <p className="text-white font-semibold text-sm mb-2">Mentors</p>
            <p className="text-white/40 text-[10px] tracking-[0.15em] uppercase font-medium leading-relaxed">
              Practitioner-led teaching
            </p>
          </div>

          {/* Card 3: Market Access */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-white/20 transition-colors">
            <div className="text-[#2F6FFF] mb-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
            <p className="font-serif text-4xl font-bold text-white mb-1">24/5</p>
            <p className="text-white font-semibold text-sm mb-2">Market access</p>
            <p className="text-white/40 text-[10px] tracking-[0.15em] uppercase font-medium leading-relaxed">
              Live pricing, every session
            </p>
          </div>

          {/* Card 4: Trade Review */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-white/20 transition-colors">
            <div className="text-[#2F6FFF] mb-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            </div>
            <p className="font-serif text-4xl font-bold text-white mb-1">1:1</p>
            <p className="text-white font-semibold text-sm mb-2">Trade review</p>
            <p className="text-white/40 text-[10px] tracking-[0.15em] uppercase font-medium leading-relaxed">
              Real setups, reviewed live
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}