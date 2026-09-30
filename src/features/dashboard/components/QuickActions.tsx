"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export function QuickActions() {
  const actions = [
    { label: "Add Funds", icon: "➕" },
    { label: "Analytics", icon: "📊" },
    { label: "Affiliate", icon: "↗️" },
    { label: "Profile", icon: "👤" },
    { label: "Support", icon: "🎧" },
    { label: "Withdrawal", icon: "💳" },
    { label: "Incomes", icon: "💰" },
    { label: "Wallets", icon: "👛" },
    { label: "Logout", icon: "🚪" },
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
        <div className="flex flex-wrap gap-3">
          {actions.map((action) => (
            <Button
              key={action.label}
              variant="outline"
              className="h-20 flex flex-col items-center justify-center gap-2 hover:bg-green-50 hover:border-green-300"
            >
              <span className="text-2xl">{action.icon}</span>
              <span className="text-xs">{action.label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
