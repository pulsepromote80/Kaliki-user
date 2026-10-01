"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { useTheme } from "next-themes";

export function RecentActivity() {
  const { theme } = useTheme();
  const activities = [
    { action: "Subscription Activated", time: "2 minutes ago", status: "success" },
    { action: "Wallet withdrawal", time: "15 minutes ago", status: "success" },
    { action: "Team member joined", time: "1 hour ago", status: "success" },
    { action: "Recent Withdrawal", time: "3 hours ago", status: "success" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 sm:mt-2 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{activity.action}</p>
                <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
