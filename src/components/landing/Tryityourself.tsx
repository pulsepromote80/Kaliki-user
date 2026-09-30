export function Tryityourself() {
    return (
        <section className="relative w-full bg-[#050505] text-[#F5F3EE] py-24 overflow-hidden border-t border-white/5">

            {/* Subtle Grid Pattern */}
            <div
                className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, #F5F3EE 1px, transparent 0)',
                    backgroundSize: '26px 26px'
                }}
            ></div>

            <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">

                {/* Top Heading Section */}
                <div className="text-center mb-14">
                    <p className="text-xs tracking-[0.2em] uppercase text-[#2F6FFF] mb-5 font-semibold">
                        TRY IT YOURSELF
                    </p>
                    <h2 className="text-4xl md:text-5xl lg:text-[56px] leading-[1.15] font-serif tracking-tight text-white mb-6">
                        Can you read this chart?
                    </h2>
                    <p className="text-white/60 text-lg leading-relaxed max-w-xl mx-auto">
                        Call the move, then see the reasoning — the way our students learn every session.
                    </p>
                </div>

                {/* Interactive Chart Card */}
                <div className="rounded-2xl border border-white/10 bg-[#0A0A0A] p-8 md:p-12 shadow-2xl">

                    {/* Card Header */}
                    <div className="mb-10">
                        <p className="text-[10px] tracking-[0.2em] uppercase text-[#2F6FFF] mb-3 font-semibold">
                            READ THE MARKET · ROUND 1 OF 1
                        </p>
                        <h3 className="font-serif text-2xl md:text-3xl font-bold text-white">
                            The ceiling test
                        </h3>
                    </div>

                    {/* Custom SVG Chart (Static) */}
                    <div className="relative w-full h-[300px] mb-8">
                        <svg viewBox="0 0 800 300" className="w-full h-full" preserveAspectRatio="xMidYMid meet">

                            {/* Resistance Line (Dashed) */}
                            <line x1="80" y1="110" x2="720" y2="110" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.6" />

                            {/* Resistance Label */}
                            <text x="640" y="100" fill="#3B82F6" fontSize="12" fontWeight="600" fontFamily="sans-serif">
                                Resistance
                            </text>

                            {/* Candlesticks (Uptrend then hitting resistance) */}
                            {/* Candle 1 */}
                            <g>
                                <line x1="120" y1="200" x2="120" y2="260" stroke="#3B82F6" strokeWidth="1.5" />
                                <rect x="112" y="210" width="16" height="40" fill="#3B82F6" rx="2" />
                            </g>
                            {/* Candle 2 */}
                            <g>
                                <line x1="170" y1="180" x2="170" y2="240" stroke="#3B82F6" strokeWidth="1.5" />
                                <rect x="162" y="190" width="16" height="40" fill="#3B82F6" rx="2" />
                            </g>
                            {/* Candle 3 */}
                            <g>
                                <line x1="220" y1="160" x2="220" y2="220" stroke="#3B82F6" strokeWidth="1.5" />
                                <rect x="212" y="170" width="16" height="40" fill="#3B82F6" rx="2" />
                            </g>
                            {/* Candle 4 */}
                            <g>
                                <line x1="270" y1="145" x2="270" y2="205" stroke="#3B82F6" strokeWidth="1.5" />
                                <rect x="262" y="155" width="16" height="40" fill="#3B82F6" rx="2" />
                            </g>
                            {/* Candle 5 */}
                            <g>
                                <line x1="320" y1="135" x2="320" y2="195" stroke="#3B82F6" strokeWidth="1.5" />
                                <rect x="312" y="145" width="16" height="40" fill="#3B82F6" rx="2" />
                            </g>
                            {/* Candle 6 */}
                            <g>
                                <line x1="370" y1="120" x2="370" y2="180" stroke="#3B82F6" strokeWidth="1.5" />
                                <rect x="362" y="130" width="16" height="40" fill="#3B82F6" rx="2" />
                            </g>
                            {/* Candle 7 */}
                            <g>
                                <line x1="420" y1="112" x2="420" y2="172" stroke="#3B82F6" strokeWidth="1.5" />
                                <rect x="412" y="122" width="16" height="40" fill="#3B82F6" rx="2" />
                            </g>
                            {/* Candle 8 */}
                            <g>
                                <line x1="470" y1="110" x2="470" y2="170" stroke="#3B82F6" strokeWidth="1.5" />
                                <rect x="462" y="120" width="16" height="40" fill="#3B82F6" rx="2" />
                            </g>
                            {/* Candle 9 (Hitting resistance) */}
                            <g>
                                <line x1="520" y1="108" x2="520" y2="168" stroke="#3B82F6" strokeWidth="1.5" />
                                <rect x="512" y="118" width="16" height="40" fill="#3B82F6" rx="2" />
                            </g>
                            {/* Candle 10 (Pulling back) */}
                            <g>
                                <line x1="570" y1="115" x2="570" y2="175" stroke="#3B82F6" strokeWidth="1.5" />
                                <rect x="562" y="125" width="16" height="40" fill="#3B82F6" rx="2" />
                            </g>
                            {/* Candle 11 (Pulling back more) */}
                            <g>
                                <line x1="620" y1="125" x2="620" y2="185" stroke="#3B82F6" strokeWidth="1.5" />
                                <rect x="612" y="135" width="16" height="40" fill="#3B82F6" rx="2" />
                            </g>

                        </svg>
                    </div>

                    {/* Question Section */}
                    <div className="border-t border-white/10 pt-6">
                        <p className="text-white/50 text-sm leading-relaxed">
                            Price has pushed into the same ceiling three times. What does this structure usually suggest?
                        </p>
                    </div>

                </div>

            </div>
        </section>
    );
}