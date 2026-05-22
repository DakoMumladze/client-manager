import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { SidebarLinks } from "@/components/sidebar-links";
import { MobileNav } from "@/components/mobile-nav";
import { SignOutButton } from "@/components/sign-out-button";
import { ThemeToggle } from "@/components/theme-toggle";
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
    <div className="flex min-h-screen bg-background">
      <aside className="hidden border-r border-border bg-card lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-56 lg:flex-col">
        <div className="flex h-14 items-center justify-between border-b border-border px-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-base font-semibold text-foreground"
          >
            <span className="flex size-6 items-center justify-center rounded-md bg-primary text-xs font-bold text-primary-foreground">
              C
            </span>
            Client Manager
          </Link>
          <ThemeToggle />
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <SidebarLinks />
        </div>

        <div className="border-t border-border p-4">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium text-foreground">
              {getInitials(displayName, email)}
            </div>
            <div className="min-w-0">
              {displayName && (
                <p className="truncate text-sm font-medium text-foreground">
                  {displayName}
                </p>
              )}
              <p className="truncate text-xs text-muted-foreground">{email}</p>
            </div>
          </div>
          <SignOutButton />
        </div>
      </aside>

      <MobileNav displayName={displayName} email={email} />

      <div className="flex min-h-screen w-full flex-col lg:pl-56">
        <main className="flex-1 pt-14 lg:pt-0">{children}</main>
      </div>
    </div>
  );
}
