"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { SidebarLinks } from "@/components/sidebar-links";
import { SignOutButton } from "@/components/sign-out-button";
import { Button } from "@/components/ui/button";
import { getInitials } from "@/lib/utils";

type MobileNavProps = {
  displayName: string;
  email: string;
};

export function MobileNav({ displayName, email }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile top bar */}
      <header className="fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between border-b border-stone-200 bg-white px-4 lg:hidden">
        <Link href="/" className="text-base font-semibold text-stone-800">
          Client Manager
        </Link>
        <Button
          variant="secondary"
          onClick={() => setOpen(true)}
          className="w-auto border-none p-1.5 text-stone-500 hover:bg-stone-100 hover:text-stone-800"
          aria-label="Open menu"
        >
          <Menu className="size-5" />
        </Button>
      </header>

      {/* Mobile drawer overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-stone-200 bg-white transition-transform duration-200 lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-14 items-center justify-between border-b border-stone-200 px-4">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="text-base font-semibold text-stone-800"
          >
            Client Manager
          </Link>
          <Button
            variant="secondary"
            onClick={() => setOpen(false)}
            className="w-auto border-none p-1.5 text-stone-500 hover:bg-stone-100"
            aria-label="Close menu"
          >
            <X className="size-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <SidebarLinks onNavigate={() => setOpen(false)} />
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
    </>
  );
}
