"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

export function GlobalInfrastructure() {
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
              className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
            >
              <div>
                <p className="font-medium">{region.name}</p>
                <p className="text-sm text-gray-500">{region.nodes} Active Nodes</p>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  region.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
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
