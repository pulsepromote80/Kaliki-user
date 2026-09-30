"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

export function RecentActivity() {
  const activities = [
    { action: "Agent deployed", time: "2 minutes ago", status: "success" },
    { action: "Wallet withdrawal", time: "15 minutes ago", status: "success" },
    { action: "Team member joined", time: "1 hour ago", status: "success" },
    { action: "License purchased", time: "3 hours ago", status: "success" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <div className="flex-1">
                <p className="text-sm font-medium">{activity.action}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
