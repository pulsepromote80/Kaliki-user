"use client";

import { Menu, User } from "lucide-react";
import { useSidebarStore } from "@/store/sidebar.store";
import { useAuthStore } from "@/store/auth.store";
import { Dropdown } from "@/components/ui/Dropdown";

export function Navbar() {
  const setMobileOpen = useSidebarStore((state) => state.setMobileOpen);
  const user = useAuthStore((state) => state.user);

  return (
    <header className="flex h-14 items-center justify-between border-b border-border bg-background px-4">
      <button
        className="rounded-md p-2 hover:bg-muted lg:hidden"
        onClick={() => setMobileOpen(true)}
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="ml-auto">
        <Dropdown
          trigger={
            <button className="flex items-center gap-2 rounded-md p-2 hover:bg-muted">
              <User className="h-5 w-5" aria-hidden />
              <span className="text-sm text-foreground">{user?.name ?? "Account"}</span>
            </button>
          }
          items={[
            { label: "Profile", onSelect: () => {} },
            { label: "Settings", onSelect: () => {} },
            { label: "Sign out", onSelect: () => {}, destructive: true },
          ]}
        />
      </div>
    </header>
  );
}
