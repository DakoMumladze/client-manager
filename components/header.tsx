import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { SignOutButton } from "@/components/sign-out-button";

export async function Header() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="border-b border-stone-200 bg-white">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="text-lg font-semibold text-stone-800">
          Client Manager
        </Link>
        <nav className="flex items-center gap-4">
          {user ? (
            <>
              <Link
                href="/clients"
                className="text-sm font-medium text-stone-600 hover:text-stone-800 transition-colors"
              >
                Clients
              </Link>
              <Link
                href="/profile"
                className="text-sm font-medium text-stone-600 hover:text-stone-800 transition-colors"
              >
                Profile
              </Link>
              <SignOutButton />
            </>
          ) : (
            <>
              <Link
                href="/auth/sign-in"
                className="text-sm font-medium text-stone-600 hover:text-stone-800 transition-colors"
              >
                Sign in
              </Link>
              <Link
                href="/auth/sign-up"
                className="h-9 rounded-md bg-blue-500 px-4 text-sm font-medium text-white hover:bg-blue-600 transition-colors inline-flex items-center"
              >
                Sign up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
