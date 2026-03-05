import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Header } from "@/components/header";
import { ResetPasswordForm } from "@/components/reset-password-form";

export default async function ResetPasswordPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/sign-in");
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="flex flex-col items-center px-4 pt-24">
        <div className="w-full max-w-80">
          <h1 className="mb-8 text-center text-3xl font-semibold leading-tight text-stone-800">
            Reset password
          </h1>
          <ResetPasswordForm />
        </div>
      </main>
    </div>
  );
}
