export function Testimonials() {
  return (
    <section id="reviews" className="relative w-full bg-[#050505] text-[#F5F3EE] py-24 overflow-hidden border-t border-white/5">
      
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
          <h2 className="text-4xl md:text-5xl lg:text-[56px] leading-[1.15] font-serif tracking-tight text-white">
            In their own words
          </h2>
        </div>

        {/* 2x2 Grid of Testimonial Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {testimonialsData.map((testimonial, index) => (
            <div 
              key={index} 
              className="rounded-2xl border border-white/10 bg-[#0A0A0A] p-8 md:p-10 hover:border-white/20 transition-colors duration-300 flex flex-col justify-between"
            >
              {/* Quote Icon */}
              <div className="text-[#2F6FFF] mb-6">
                <QuoteIcon />
              </div>

              {/* Testimonial Text - Normal weight, correct size */}
              <p className="text-white/70 text-base md:text-[17px] leading-relaxed mb-8 flex-grow">
                "{testimonial.quote}"
              </p>

              {/* Author Info */}
              <div>
                <p className="text-white font-bold text-sm mb-1">
                  {testimonial.name}
                </p>
                <p className="text-white/40 text-[10px] tracking-[0.15em] uppercase font-semibold">
                  {testimonial.location}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

// --- Static Data Array ---
const testimonialsData = [
  {
    quote: "Before this, I struggled with chart reading. It's explained so clearly that my confidence in analysing the market has actually improved.",
    name: "Ankit K.",
    location: "DELHI"
  },
  {
    quote: "Very useful for anyone serious about learning forex. The concepts are step by step and easy to apply on live charts.",
    name: "Pooja Singh",
    location: "UTTAR PRADESH"
  },
  {
    quote: "The guidance on entries, stop-loss and risk management has been extremely helpful — I stopped guessing.",
    name: "Ravi Kumar",
    location: "GURUGRAM"
  },
  {
    quote: "The focus on execution and discipline changed how I look at trading completely.",
    name: "Arjun Singh",
    location: "PUNJAB"
  }
];

// --- Static SVG Icon ---
function QuoteIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M9.5 8.5c-1.5 0-2.5 1-2.5 2.5 0 1.4 1 2.5 2.5 2.5.3 0 .5 0 .8-.1-.3 1.2-1.3 2-2.6 2.3l.4 1.6c2.5-.5 4.3-2.5 4.3-5.2 0-2.3-1.3-3.6-2.9-3.6zM16.5 8.5c-1.5 0-2.5 1-2.5 2.5 0 1.4 1 2.5 2.5 2.5.3 0 .5 0 .8-.1-.3 1.2-1.3 2-2.6 2.3l.4 1.6c2.5-.5 4.3-2.5 4.3-5.2 0-2.3-1.3-3.6-2.9-3.6z"/>
    </svg>
  );
}