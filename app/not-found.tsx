import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-night px-6 text-center text-on-night">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/55">404</p>
      <h1 className="t-h2 mt-4 text-white">This page isn&apos;t part of the pitch.</h1>
      <Link href="/" className="btn btn-light mt-8">
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Back to the start
      </Link>
    </main>
  );
}
