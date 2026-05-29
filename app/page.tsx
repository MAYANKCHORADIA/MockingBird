import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-[#030712] overflow-hidden flex flex-col items-center justify-center">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] bg-teal-500/10 rounded-full blur-[128px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-purple-500/10 rounded-full blur-[128px] pointer-events-none mix-blend-screen" />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-12 animate-fade-in-up py-20">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium text-teal-300 mx-auto animate-float cursor-default">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
          </span>
          MockingBird is Live
        </div>

        {/* Hero Title */}
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-500">
          Mock APIs in <br />
          <span className="bg-gradient-to-r from-teal-400 via-emerald-400 to-teal-500 bg-clip-text text-transparent">Seconds.</span>
        </h1>

        {/* Description */}
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 font-medium leading-relaxed">
          Instantly provision dynamic HTTP endpoints for your frontend. Customize JSON payloads, simulate network latency, and test edge cases—no backend code required.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
          <Link href="/create" className="group relative inline-flex items-center justify-center">
            {/* Glow behind button */}
            <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl blur opacity-60 group-hover:opacity-100 transition duration-500 animate-pulse-glow" />

            {/* Button Surface */}
            <div className="relative flex items-center justify-center gap-2 px-8 py-4 bg-[#030712] rounded-xl border border-teal-500/30 text-white font-bold text-lg hover:bg-slate-900 transition-colors">
              <span>Get Started</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-1 transition-transform">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </div>
          </Link>
        </div>

        {/* Stats / Features highlight */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 border-t border-slate-800/50 mt-16 text-left">
          <div className="glass p-6 rounded-2xl space-y-3 hover:-translate-y-1 transition-transform duration-300">
            <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
            </div>
            <h3 className="text-white font-semibold">100% Free</h3>
            <p className="text-sm text-slate-400">Generate as many endpoints as you need without any rate limits or annoying paywalls.</p>
          </div>

          <div className="glass p-6 rounded-2xl space-y-3 hover:-translate-y-1 transition-transform duration-300">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
            </div>
            <h3 className="text-white font-semibold">Custom Latency</h3>
            <p className="text-sm text-slate-400">Simulate slow networks and test your loading states by injecting artificial delays.</p>
          </div>

          <div className="glass p-6 rounded-2xl space-y-3 hover:-translate-y-1 transition-transform duration-300">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 16 4-4-4-4" /><path d="m6 8-4 4 4 4" /><path d="m14.5 4-5 16" /></svg>
            </div>
            <h3 className="text-white font-semibold">Any Payload</h3>
            <p className="text-sm text-slate-400">Return complex JSON structures, arrays, or simple text exactly as you define them.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
