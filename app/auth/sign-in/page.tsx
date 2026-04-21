import Link from "next/link";
import { Check, CheckCircle } from "lucide-react";
import { SignInForm } from "@/components/sign-in-form";

const features = [
  "Organize client info effortlessly",
  "Quick access to every detail",
  "Built for speed and clarity",
];

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string }>;
}) {
  const { message } = await searchParams;

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-[45%] bg-stone-900 flex-col justify-between p-12">
        <Link href="/" className="text-lg font-semibold text-white tracking-tight">
          Client Manager
        </Link>
        <div>
          <blockquote className="mb-8">
            <p className="text-2xl font-medium text-white leading-snug">
              &ldquo;Everything I need to stay on top of my clients — finally in one place.&rdquo;
            </p>
            <footer className="mt-4 text-stone-400 text-sm">Sarah K., Freelance Consultant</footer>
          </blockquote>
          <ul className="space-y-3">
            {features.map((feat) => (
              <li key={feat} className="flex items-center gap-3 text-stone-300 text-sm">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500 text-white">
                  <Check size={11} strokeWidth={3} />
                </span>
                {feat}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-stone-600 text-xs">© 2026 Client Manager. All rights reserved.</p>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
        <Link href="/" className="mb-10 text-lg font-semibold text-stone-800 tracking-tight lg:hidden">
          Client Manager
        </Link>

        <div className="w-full max-w-[360px]">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-stone-900">Welcome back</h1>
            <p className="mt-1.5 text-sm text-stone-500">
              Sign in to your account to continue
            </p>
          </div>

          {message === "password-updated" && (
            <div className="mb-5 flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 px-4 py-3">
              <CheckCircle size={15} className="mt-0.5 shrink-0 text-green-500" />
              <p className="text-sm text-green-800">
                Your password has been updated. Sign in with your new password.
              </p>
            </div>
          )}

          <SignInForm />

          <p className="mt-8 text-center text-xs leading-relaxed text-stone-400">
            By continuing, you agree to our{" "}
            <span className="underline cursor-default">Terms of Service</span> and{" "}
            <span className="underline cursor-default">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
