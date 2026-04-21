import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { SidebarLinks } from "@/components/sidebar-links";
import { MobileNav } from "@/components/mobile-nav";
import { SignOutButton } from "@/components/sign-out-button";
import { getInitials } from "@/lib/utils";

export async function AppShell({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const displayName = user
    ? ((
        await supabase
          .from("profiles")
          .select("name")
          .eq("id", user.id)
          .single()
      ).data?.name ?? "")
    : "";
  const email = user?.email ?? "";

  return (
    <div className="flex min-h-screen bg-stone-50">
      {/* Desktop sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-56 lg:flex-col border-r border-stone-200 bg-white">
        <div className="flex h-14 items-center border-b border-stone-200 px-4">
          <Link href="/" className="text-base font-semibold text-stone-800">
            Client Manager
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <SidebarLinks />
        </div>

        <div className="border-t border-stone-200 p-4">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-stone-200 text-xs font-medium text-stone-700">
              {getInitials(displayName, email)}
            </div>
            <div className="min-w-0">
              {displayName && (
                <p className="truncate text-sm font-medium text-stone-800">
                  {displayName}
                </p>
              )}
              <p className="truncate text-xs text-stone-500">{email}</p>
            </div>
          </div>
          <SignOutButton />
        </div>
      </aside>

      {/* Mobile nav (header bar + drawer) */}
      <MobileNav displayName={displayName} email={email} />

      {/* Main content — offset for desktop sidebar and mobile top bar */}
      <div className="flex min-h-screen w-full flex-col lg:pl-56">
        <main className="flex-1 pt-14 lg:pt-0">{children}</main>
      </div>
    </div>
  );
}
