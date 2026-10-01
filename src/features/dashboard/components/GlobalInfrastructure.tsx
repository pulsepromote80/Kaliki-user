"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { useTheme } from "next-themes";

export function GlobalInfrastructure() {
  const { theme } = useTheme();
  const regions = [
    { name: "North America", status: "Active", nodes: 124 },
    { name: "Europe", status: "Active", nodes: 89 },
    { name: "Asia Pacific", status: "Active", nodes: 156 },
    { name: "South America", status: "Maintenance", nodes: 45 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Global AI Infrastructure</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {regions.map((region) => (
            <div
              key={region.name}
              className={`flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg gap-2 ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
              }`}
            >
              <div>
                <p className="font-medium text-sm">{region.name}</p>
                <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{region.nodes} Active Nodes</p>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-[10px] sm:text-xs font-medium w-fit ${
                  region.status === "Active"
                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                }`}
              >
                {region.status}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
