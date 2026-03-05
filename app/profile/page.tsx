import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Header } from "@/components/header";
import { getInitials } from "@/lib/utils";

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/sign-in");
  }

  const displayName = user.user_metadata?.display_name || "";
  const email = user.email || "";
  const avatarUrl = user.user_metadata?.avatar_url || "";
  const initials = getInitials(displayName, email);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="text-3xl font-semibold text-stone-800">Profile</h1>
        <p className="mt-1 text-sm text-stone-500">
          Your account information
        </p>

        <div className="mt-8 flex items-center gap-6">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={displayName || "Avatar"}
              className="h-20 w-20 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-stone-100 text-2xl font-semibold text-stone-600">
              {initials}
            </div>
          )}
          <div>
            <p className="text-xl font-semibold text-stone-800">
              {displayName || "No name set"}
            </p>
            <p className="text-sm text-stone-500">{email}</p>
          </div>
        </div>

        <div className="mt-8 border-t border-stone-200 pt-8">
          <h2 className="text-lg font-semibold text-stone-800">
            Account Details
          </h2>
          <dl className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-medium text-stone-400">
                Display Name
              </dt>
              <dd className="mt-1 text-sm text-stone-800">
                {displayName || "Not set"}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-stone-400">Email</dt>
              <dd className="mt-1 text-sm text-stone-800">{email}</dd>
            </div>
          </dl>
        </div>
      </main>
    </div>
  );
}
