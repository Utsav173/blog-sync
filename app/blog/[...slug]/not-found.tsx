import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
      <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-center mb-4">
        404
      </h1>
      <p className="text-xl text-muted-foreground text-center mb-8">
        Oops! The blog post you're looking for doesn't exist.
      </p>
      <Link
        href="/"
        className="inline-flex items-center rounded-lg bg-zinc-900 px-6 py-3 text-sm font-medium text-zinc-50 hover:bg-zinc-900/90 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
}
