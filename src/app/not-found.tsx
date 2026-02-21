import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fafafa]">
      <div className="text-center">
        <p className="font-mono text-sm text-neutral-400">404</p>
        <h1 className="mt-2 text-lg font-semibold text-neutral-900">Page not found</h1>
        <Link
          href="/"
          className="mt-4 inline-block rounded-lg bg-neutral-900 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-neutral-800"
        >
          Back home
        </Link>
      </div>
    </div>
  );
}
