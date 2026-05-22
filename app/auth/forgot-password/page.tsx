import { Header } from "@/components/header";
import { ForgotPasswordForm } from "@/components/forgot-password-form";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-card">
      <Header />
      <main className="flex flex-col items-center px-4 pt-24">
        <div className="w-full max-w-80">
          <h1 className="mb-2 text-center text-3xl font-semibold leading-tight text-foreground">
            Forgot password?
          </h1>
          <p className="mb-8 text-center text-sm text-muted-foreground">
            Enter your email and we&apos;ll send you a reset link.
          </p>
          <ForgotPasswordForm />
        </div>
      </main>
    </div>
  );
}
