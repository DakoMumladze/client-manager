import Link from "next/link";
import { Header } from "@/components/header";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="flex flex-col items-center gap-6 px-4 pt-32 text-center">
        <span className="text-6xl">🗂️</span>
        <h1 className="text-5xl font-bold leading-tight text-stone-800">
          Client Manager
        </h1>
        <p className="text-xl leading-relaxed text-stone-500">
          Manage your clients, projects, and tasks — all in one place.
        </p>
        <Link
          href="/auth/sign-up"
          className="mt-2 inline-flex h-11 items-center rounded-md bg-blue-500 px-6 text-base font-medium text-white transition-colors hover:bg-blue-600"
        >
          Get started free
        </Link>
      </main>
    </div>
  );
}
