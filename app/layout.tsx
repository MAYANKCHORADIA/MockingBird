import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MockingBird — Instant Mock API Endpoints",
  description: "Generate instant, customizable HTTP mock endpoints for your frontend applications. Define JSON payloads, HTTP statuses, and artificial latency in seconds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-50 text-slate-900">
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">Mockingbird</span>
          </div>
          <nav className="flex items-center gap-6">
            <a href="/" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Dashboard</a>
            <a href="/create" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Create Endpoint</a>
          </nav>
        </header>
        <main className="flex-1 max-w-6xl w-full mx-auto p-8">
          {children}
        </main>
      </body>
    </html>
  );
}
