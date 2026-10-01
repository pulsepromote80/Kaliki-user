"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { useTheme } from "next-themes";

export function QuickActions() {
  const logout = useLogout();
  const { theme } = useTheme();

  const actions = [
    { label: "Add Funds", icon: "➕" },
    { label: "Analytics", icon: "📊" },
    { label: "Affiliate", icon: "↗️" },
    { label: "Profile", icon: "👤" },
    { label: "Support", icon: "🎧" },
    { label: "Withdrawal", icon: "💳" },
    { label: "Incomes", icon: "💰" },
    { label: "Wallets", icon: "👛" },
    { label: "Logout", icon: "🚪", action: () => logout.mutate() },
    { label: "Transactions", icon: "📋" },
    { label: "Settings", icon: "⚙️" },
    { label: "History", icon: "📜" },
    { label: "Reports", icon: "📈" },
    { label: "Referrals", icon: "👥" },
    { label: "Notifications", icon: "🔔" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-2 sm:gap-3">
          {actions.map((action) => (
            <Button
              key={action.label}
              variant="outline"
              className="h-16 sm:h-20 flex flex-col items-center justify-center gap-1 sm:gap-2 hover:bg-green-50 dark:hover:bg-green-900/20 hover:border-green-300 dark:hover:border-green-700"
              onClick={action.action}
            >
              <span className="text-xl sm:text-2xl">{action.icon}</span>
              <span className="text-[10px] sm:text-xs">{action.label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
