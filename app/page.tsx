import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <main className="flex w-full max-w-lg flex-col items-center gap-6 px-4 text-center">
        <span className="text-6xl">🗂️</span>
        <h1 className="text-5xl font-bold leading-tight text-stone-800">
          Client Manager
        </h1>
        <p className="text-xl text-stone-500 leading-relaxed">
          Manage your clients, projects, and tasks — all in one place.
        </p>
        <Link
          href="/auth/sign-up"
          className="mt-2 h-11 rounded-md bg-blue-500 px-6 text-base font-medium text-white hover:bg-blue-600 transition-colors inline-flex items-center"
        >
          Get started free
        </Link>
      </main>
    </div>
  );
}
