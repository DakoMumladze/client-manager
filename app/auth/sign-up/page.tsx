import { SignUpForm } from "@/components/sign-up-form";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="flex w-full max-w-80 flex-col items-center px-4">
        <h1 className="mb-8 text-3xl font-semibold leading-tight text-stone-800">
          Sign up
        </h1>
        <SignUpForm />
        <p className="mt-8 text-xs text-stone-400 text-center leading-relaxed">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
