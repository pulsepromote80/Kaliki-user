export function Markets() {
  return (
    <section id="markets" className="relative w-full bg-[#050505] text-[#F5F3EE] py-24 overflow-hidden border-t border-white/5">
      
      {/* Subtle Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(circle at 1px 1px, #F5F3EE 1px, transparent 0)', 
          backgroundSize: '26px 26px' 
        }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16">
        
        {/* Top Heading Section */}
        <div className="mb-14">
          <p className="text-xs tracking-[0.2em] uppercase text-[#2F6FFF] mb-5 font-semibold">
            LIVE MARKETS
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-[56px] leading-[1.15] font-serif tracking-tight text-white mb-6 max-w-3xl">
            Watch the pairs you're about to learn
          </h2>
          <p className="text-white/60 text-lg leading-relaxed max-w-2xl">
            Real-time forex charts, embedded straight from TradingView — the same charts you'll work with in class.
          </p>
        </div>

        {/* 3-Column Grid of Charts */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {marketsData.map((market, index) => (
            <div key={index} className="flex flex-col gap-4">
              
              {/* Chart Header: Name & Live Dot */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUpIcon />
                  <p className="text-white font-semibold text-sm tracking-wide">
                    {market.title}
                  </p>
                </div>
                <span className="w-1.5 h-1.5 rounded-full bg-[#1FC97D] inline-block animate-pulse"></span>
              </div>

              {/* Chart Placeholder Container */}
              {/* 
                ⚠️ NOTE: Senior developer will add the TradingView iframe/script here.
                Ye ek khaali placeholder box hai jisme chart embed hoga.
              */}
              <div className="rounded-xl overflow-hidden border border-white/10 bg-black h-[280px] shadow-xl flex items-center justify-center">
                <p className="text-white/20 text-xs tracking-wider uppercase">
                  Chart Placeholder
                </p>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Divider */}
        <div className="border-t border-white/10 mt-16"></div>

      </div>
    </section>
  );
}

// --- Static Data Array ---
const marketsData = [
  {
    title: "EUR/USD",
  },
  {
    title: "GBP/USD",
  },
  {
    title: "XAU/USD — Gold",
  }
];

// --- Static SVG Icon ---
function TrendingUpIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2F6FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
      <polyline points="16 7 22 7 22 13"/>
    </svg>
  );
}