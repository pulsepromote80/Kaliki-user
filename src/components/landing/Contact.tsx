export function Contact() {
    return (
        <section id="contact" className="relative w-full bg-[#050505] text-[#F5F3EE] py-24 overflow-hidden border-t border-white/5">

            {/* Subtle Grid Pattern */}
            <div
                className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, #F5F3EE 1px, transparent 0)',
                    backgroundSize: '26px 26px'
                }}
            ></div>

            <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">

                {/* Top Heading Section */}
                <div className="mb-14">
                    <p className="text-xs tracking-[0.2em] uppercase text-[#2F6FFF] mb-5 font-semibold">
                        CONTACT
                    </p>
                    <h2 className="text-4xl md:text-5xl lg:text-[56px] leading-[1.15] font-serif tracking-tight text-white mb-5">
                        Let's{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B7CF6] via-[#F06D9B] to-[#F5B23A] italic">
                            talk
                        </span>
                        .
                    </h2>
                    <p className="text-white/60 text-lg leading-relaxed max-w-lg">
                        Questions about the curriculum, formats, or enrolment? Send us a note and a mentor or advisor will reply.
                    </p>
                </div>

                {/* Main Grid: Form + Info Cards */}
                <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">

                    {/* Left Column: Contact Form */}
                    <div className="rounded-2xl border border-white/10 bg-[#0A0A0A] p-8 md:p-10">
                        <form className="flex flex-col gap-6">

                            {/* Full Name */}
                            <div>
                                <label className="block text-[10px] tracking-[0.2em] uppercase text-white/40 font-semibold mb-3">
                                    FULL NAME
                                </label>
                                <input
                                    type="text"
                                    placeholder="Your name"
                                    className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#2F6FFF] transition-colors"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-[10px] tracking-[0.2em] uppercase text-white/40 font-semibold mb-3">
                                    EMAIL
                                </label>
                                <input
                                    type="email"
                                    placeholder="you@email.com"
                                    className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#2F6FFF] transition-colors"
                                />
                            </div>

                            {/* Interested In (Select) */}
                            <div>
                                <label className="block text-[10px] tracking-[0.2em] uppercase text-white/40 font-semibold mb-3">
                                    I'M INTERESTED IN
                                </label>
                                <div className="relative">
                                    <select
                                        className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-3 text-white text-sm appearance-none focus:outline-none focus:border-[#2F6FFF] transition-colors cursor-pointer"
                                        defaultValue="Full curriculum"
                                    >
                                        <option>Full curriculum</option>
                                        <option>Individual phases</option>
                                        <option>Mentorship only</option>
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/40">
                                        <ChevronDownIcon />
                                    </div>
                                </div>
                            </div>

                            {/* Message */}
                            <div>
                                <label className="block text-[10px] tracking-[0.2em] uppercase text-white/40 font-semibold mb-3">
                                    MESSAGE
                                </label>
                                <textarea
                                    rows={4}
                                    placeholder="How can we help?"
                                    className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#2F6FFF] transition-colors resize-none"
                                ></textarea>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="button"
                                className="inline-flex items-center justify-center gap-2 bg-[#F5C451] text-black px-7 py-3.5 rounded-full font-medium hover:bg-[#E5B33F] transition-colors w-fit"
                            >
                                Send message
                                <SendIcon />
                            </button>

                        </form>
                    </div>

                    {/* Right Column: Info Cards */}
                    <div className="flex flex-col gap-6">

                        {/* Card 1: Email */}
                        <div className="rounded-2xl border border-white/10 bg-[#0A0A0A] p-6">
                            <div className="text-[#2F6FFF] mb-4">
                                <MailIcon />
                            </div>
                            <p className="text-white font-semibold text-sm mb-1">Email</p>
                            <p className="text-white/50 text-sm">support@kalkii.com</p>
                        </div>

                        {/* Card 2: Response Time */}
                        <div className="rounded-2xl border border-white/10 bg-[#0A0A0A] p-6">
                            <div className="text-[#2F6FFF] mb-4">
                                <ClockIcon />
                            </div>
                            <p className="text-white font-semibold text-sm mb-1">Response time</p>
                            <p className="text-white/50 text-sm">Usually within one business day.</p>
                        </div>

                        {/* Card 3: Quick Answers */}
                        <div className="rounded-2xl border border-white/10 bg-[#0A0A0A] p-6">
                            <div className="text-[#2F6FFF] mb-4">
                                <HelpIcon />
                            </div>
                            <p className="text-white font-semibold text-sm mb-1">Quick answers</p>
                            <p className="text-white/50 text-sm">
                                Check the <a href="#faq" className="text-[#2F6FFF] hover:underline">FAQ</a> first — most questions are covered.
                            </p>
                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}

// --- Static SVG Icons ---
function ChevronDownIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6" />
        </svg>
    );
}

function SendIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m22 2-7 20-4-9-9-4Z" />
            <path d="M22 2 11 13" />
        </svg>
    );
}

function MailIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
    );
}

function ClockIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
        </svg>
    );
}

function HelpIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <path d="M12 17h.01" />
        </svg>
    );
}