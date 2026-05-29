'use client';

import { useState } from 'react';

export default function Home() {
  const [payload, setPayload] = useState('{\n  "status": "success",\n  "message": "Hello from Mockingbird!",\n  "data": {\n    "id": 1,\n    "name": "John Doe"\n  }\n}');
  const [httpStatus, setHttpStatus] = useState(200);
  const [delayMs, setDelayMs] = useState(0);
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setGeneratedUrl('');
    setCopied(false);

    // 1. Validate JSON on the client side first
    let parsedPayload;
    try {
      parsedPayload = JSON.parse(payload);
    } catch (err) {
      setError('Invalid JSON format. Please verify your brackets, quotes, and commas.');
      setLoading(false);
      return;
    }

    try {
      // 2. Fire the POST request to our creation backend route
      const res = await fetch('/api/endpoints', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          payload: parsedPayload,
          httpStatus: Number(httpStatus),
          delayMs: Number(delayMs),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      // 3. Set the live endpoint URL returned by the backend
      setGeneratedUrl(data.mockUrl);
    } catch (err: any) {
      setError(err.message || 'Failed to connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!generatedUrl) return;
    const absoluteUrl = typeof window !== 'undefined' ? `${window.location.origin}${generatedUrl}` : generatedUrl;
    navigator.clipboard.writeText(absoluteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="relative min-h-screen bg-[#030712] overflow-hidden flex flex-col items-center py-20 px-6">
      {/* Background Glows */}
      <div className="absolute top-0 right-1/4 w-[30rem] h-[30rem] bg-teal-500/10 rounded-full blur-[128px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-0 left-1/4 w-[30rem] h-[30rem] bg-purple-500/10 rounded-full blur-[128px] pointer-events-none mix-blend-screen" />

      <div className="relative z-10 w-full max-w-4xl space-y-8 animate-fade-in-up">
        
        {/* Header Section */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-400 to-teal-500">
            Create Endpoint
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Configure your mock response below. We'll generate a unique, live URL you can instantly use in your application.
          </p>
        </div>

        {/* Configuration Board */}
        <div className="glass border border-slate-700/50 rounded-2xl p-8 shadow-2xl relative">
          <form onSubmit={handleGenerate} className="space-y-8">
            
            {/* JSON Input Window */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-slate-300">
                Response JSON Body
              </label>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl blur opacity-20 group-focus-within:opacity-50 transition duration-500" />
                <textarea
                  value={payload}
                  onChange={(e) => setPayload(e.target.value)}
                  rows={10}
                  className="relative w-full font-mono text-sm p-5 bg-[#0a0f1c] border border-slate-700/50 rounded-xl text-teal-400 focus:outline-none focus:border-teal-500/50 transition-all shadow-inner"
                  placeholder={'{\n  "key": "value"\n}'}
                />
              </div>
            </div>

            {/* Response Settings Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* HTTP Status Code Selector */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-slate-300">
                  HTTP Status Code
                </label>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl blur opacity-20 group-focus-within:opacity-50 transition duration-500" />
                  <select
                    value={httpStatus}
                    onChange={(e) => setHttpStatus(Number(e.target.value))}
                    className="relative w-full p-4 bg-[#0a0f1c] border border-slate-700/50 rounded-xl text-slate-200 focus:outline-none focus:border-teal-500/50 transition-all appearance-none shadow-inner"
                  >
                    <option value={200}>200 - OK</option>
                    <option value={201}>201 - Created</option>
                    <option value={400}>400 - Bad Request</option>
                    <option value={401}>401 - Unauthorized</option>
                    <option value={403}>403 - Forbidden</option>
                    <option value={404}>404 - Not Found</option>
                    <option value={500}>500 - Internal Server Error</option>
                  </select>
                </div>
              </div>

              {/* Network Latency Control */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-slate-300">
                  Artificial Latency (ms)
                </label>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl blur opacity-20 group-focus-within:opacity-50 transition duration-500" />
                  <input
                    type="number"
                    min={0}
                    max={10000}
                    value={delayMs}
                    onChange={(e) => setDelayMs(Math.max(0, Number(e.target.value)))}
                    className="relative w-full p-4 bg-[#0a0f1c] border border-slate-700/50 rounded-xl text-slate-200 focus:outline-none focus:border-teal-500/50 transition-all shadow-inner"
                    placeholder="0 (No Delay)"
                  />
                </div>
              </div>

            </div>

            {/* Error Message Display */}
            {error && (
              <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm rounded-xl animate-fade-in">
                {error}
              </div>
            )}

            {/* Submit Action Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full inline-flex items-center justify-center disabled:opacity-70"
              >
                {!loading && <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl blur opacity-60 group-hover:opacity-100 transition duration-500 animate-pulse-glow" />}
                <div className="relative w-full flex items-center justify-center gap-2 px-8 py-4 bg-[#030712] rounded-xl border border-teal-500/30 text-white font-bold text-lg hover:bg-slate-900 transition-colors">
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-teal-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      Creating Endpoint...
                    </span>
                  ) : (
                    'Generate Live Mock URL'
                  )}
                </div>
              </button>
            </div>

          </form>
        </div>

        {/* Dynamic Results Presentation */}
        {generatedUrl && (
          <div className="glass border border-emerald-500/30 rounded-2xl p-8 space-y-4 animate-slide-up">
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Endpoint Successfully Provisioned!</h3>
            <p className="text-sm text-slate-400">
              Send an HTTP GET request to this dynamic URL from any application to receive your configured payload:
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 bg-[#0a0f1c] p-4 rounded-xl border border-emerald-500/20 shadow-inner">
              <span className="font-mono text-sm text-slate-200 break-all select-all flex-1">
                {typeof window !== 'undefined' ? `${window.location.origin}${generatedUrl}` : generatedUrl}
              </span>
              <button
                onClick={copyToClipboard}
                className="py-2.5 px-6 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap border border-slate-700"
              >
                {copied ? 'Copied! ✓' : 'Copy Link'}
              </button>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}