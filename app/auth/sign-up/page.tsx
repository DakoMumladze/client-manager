import { Header } from "@/components/header";
import { SignUpForm } from "@/components/sign-up-form";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="flex flex-col items-center px-4 pt-24">
        <div className="w-full max-w-80">
          <h1 className="mb-8 text-center text-3xl font-semibold leading-tight text-stone-800">
            Sign up
          </h1>
          <SignUpForm />
          <p className="mt-8 text-center text-xs leading-relaxed text-stone-400">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </main>
    </div>
  );
}
