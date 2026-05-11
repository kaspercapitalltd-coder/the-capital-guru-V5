import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <h1 className="text-9xl font-black text-gold-500/10 absolute -z-10 select-none">404</h1>
      <h2 className="text-4xl font-bold mb-4">Signal Lost</h2>
      <p className="text-white/60 mb-8 max-w-md">
        The page you are looking for doesn&apos;t exist or has been moved to a private terminal.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-gold-500 text-black px-6 py-3 rounded-sm font-bold hover:bg-gold-600 transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>
    </div>
  );
}
