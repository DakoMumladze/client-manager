import Link from "next/link";
import { Check } from "lucide-react";
import { SignUpForm } from "@/components/sign-up-form";

const features = [
  "Free to get started — no credit card",
  "Centralized client profiles",
  "Fast, clean, distraction-free",
];

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-[45%] bg-stone-900 flex-col justify-between p-12">
        <Link href="/" className="text-lg font-semibold text-white tracking-tight">
          Client Manager
        </Link>
        <div>
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white leading-snug mb-3">
              Start managing your clients smarter
            </h2>
            <p className="text-stone-400 text-sm leading-relaxed">
              Join professionals who use Client Manager to keep their client
              relationships organized and thriving.
            </p>
          </div>
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
            <h1 className="text-2xl font-bold text-stone-900">Create your account</h1>
            <p className="mt-1.5 text-sm text-stone-500">
              Free forever. No credit card required.
            </p>
          </div>

          <SignUpForm />

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
