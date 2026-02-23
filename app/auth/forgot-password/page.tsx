import { ForgotPasswordForm } from "@/components/forgot-password-form";

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="flex w-full max-w-80 flex-col items-center px-4">
        <h1 className="mb-2 text-3xl font-semibold leading-tight text-stone-800">
          Forgot password?
        </h1>
        <p className="mb-8 text-sm text-stone-500 text-center">
          Enter your email and we&apos;ll send you a reset link.
        </p>
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
