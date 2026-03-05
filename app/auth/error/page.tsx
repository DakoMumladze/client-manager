import Link from "next/link";
import { Header } from "@/components/header";

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="flex flex-col items-center px-4 pt-24">
        <div className="flex w-full max-w-80 flex-col items-center gap-3 text-center">
          <h1 className="text-3xl font-semibold leading-tight text-stone-800">
            Something went wrong
          </h1>
          <p className="text-sm text-stone-500">
            We couldn&apos;t verify your request. The link may have expired.
          </p>
          <div className="mt-4 flex flex-col items-center gap-2">
            <Link
              href="/auth/forgot-password"
              className="text-sm text-blue-500 hover:underline"
            >
              Request a new password reset link
            </Link>
            <Link
              href="/auth/sign-up"
              className="text-sm text-blue-500 hover:underline"
            >
              Try signing up again
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
