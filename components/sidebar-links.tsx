"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/clients", label: "Clients", icon: Users },
  { href: "/profile", label: "Profile", icon: User },
];

export function SidebarLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1 px-3">
      {navItems.map(({ href, label, icon: Icon }) => {
        const active = pathname === href || pathname.startsWith(href + "/");
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-stone-100 text-stone-900"
                : "text-stone-500 hover:bg-stone-50 hover:text-stone-800",
            )}
          >
            <Icon className="size-4 shrink-0" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
