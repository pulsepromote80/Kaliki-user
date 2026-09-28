import type { NavItem } from "@/types/common";
import { APP_ROUTES } from "@/lib/constants";

/**
 * Single source of truth for primary navigation, consumed by both the
 * desktop Sidebar and the MobileSidebar so they never drift apart.
 */
export const primaryNav: NavItem[] = [
  { label: "Dashboard", href: APP_ROUTES.dashboard, icon: "LayoutDashboard" },
  { label: "Users", href: APP_ROUTES.users, icon: "Users" },
  { label: "Transactions", href: APP_ROUTES.transactions, icon: "Receipt" },
  { label: "Settings", href: APP_ROUTES.settings, icon: "Settings" },
];
