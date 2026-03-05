import { Header } from "@/components/header";
import { SignInForm } from "@/components/sign-in-form";

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string }>;
}) {
  const { message } = await searchParams;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="flex flex-col items-center px-4 pt-24">
        <div className="w-full max-w-80">
          <h1 className="mb-8 text-center text-3xl font-semibold leading-tight text-stone-800">
            Sign in
          </h1>
          {message === "password-updated" && (
            <div className="mb-4 w-full rounded-lg border border-green-200 bg-green-50 px-4 py-3">
              <p className="text-sm text-green-800">
                Your password has been updated. Sign in with your new password.
              </p>
            </div>
          )}
          <SignInForm />
          <p className="mt-8 text-center text-xs leading-relaxed text-stone-400">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </main>
    </div>
  );
}
