"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { SidebarLinks } from "@/components/sidebar-links";
import { SignOutButton } from "@/components/sign-out-button";
import { ThemeToggle } from "@/components/theme-toggle";
import { getInitials } from "@/lib/utils";

type MobileNavProps = {
  displayName: string;
  email: string;
};

export function MobileNav({ displayName, email }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between border-b border-border bg-card px-4 lg:hidden">
        <Link href="/" className="text-base font-semibold text-foreground">
          Client Manager
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </button>
        </div>
      </header>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/50 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-card transition-transform duration-200 lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-14 items-center justify-between border-b border-border px-4">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="text-base font-semibold text-foreground"
          >
            Client Manager
          </Link>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            aria-label="Close menu"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <SidebarLinks onNavigate={() => setOpen(false)} />
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
    </>
  );
}
