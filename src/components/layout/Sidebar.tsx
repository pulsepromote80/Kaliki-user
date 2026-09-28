"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Icons from "lucide-react";
import { primaryNav } from "@/config/navigation";
import { useSidebarStore } from "@/store/sidebar.store";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();
  const isCollapsed = useSidebarStore((state) => state.isCollapsed);

  return (
    <aside
      className={cn(
        "hidden shrink-0 border-r border-border bg-background lg:block",
        isCollapsed ? "w-16" : "w-60",
      )}
    >
      <nav className="flex flex-col gap-1 p-3">
        {primaryNav.map((item) => {
          const Icon = item.icon ? (Icons[item.icon as keyof typeof Icons] as Icons.LucideIcon) : null;
          const isActive = pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                isActive ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted",
              )}
            >
              {Icon && <Icon className="h-4 w-4 shrink-0" aria-hidden />}
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
