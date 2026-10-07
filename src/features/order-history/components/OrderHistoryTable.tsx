"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { DataTable } from "@/components/common/DataTable";
import { useOrderHistory } from "@/features/order-history/hooks/useOrderHistory";
import { formatCurrency } from "@/lib/utils";
import type { OrderHistoryItem } from "@/services/order-history.service";
import type { TableColumn } from "@/components/ui/Table";

const columns: TableColumn<OrderHistoryItem>[] = [
  { key: "sno", header: "S.No", render: (_, index) => index + 1 },
  { key: "Authlogin", header: "Auth Login", render: (item) => item.Authlogin },
  { key: "FullName", header: "Full Name", render: (item) => item.FullName },
  { key: "ProductName", header: "Package", render: (item) => item.ProductName },
  { key: "Rkprice", header: "Price", render: (item) => formatCurrency(item.Rkprice) },
  { key: "Paymentmode", header: "Payment Mode", render: (item) => item.Paymentmode },
  { key: "RDate", header: "Registration Date", render: (item) => item.RDate },
  { key: "CreatedDate", header: "Created Date", render: (item) => item.CreatedDate },
  {
    key: "Active",
    header: "Status",
    render: (item) => (
      <Badge variant={item.Active ? "success" : "destructive"}>
        {item.Active ? "Active" : "Inactive"}
      </Badge>
    ),
  },
  { key: "Remark", header: "Remark", render: (item) => item.Remark },
];

type FilterType = "1" | "2" | "3" | null;

const FILTER_OPTIONS: { value: string; label: string }[] = [
  { value: "1", label: "Normal" },
  { value: "2", label: "Legacy Reborn" },
  { value: "3", label: "Legacy Reborn 2.0" },
];

export function OrderHistoryTable() {
  const [filterType, setFilterType] = useState<FilterType>(null);
  const { data, isLoading, isError, refetch } = useOrderHistory(filterType ?? undefined);

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <select
          value={filterType ?? ""}
          onChange={(e) => setFilterType(e.target.value as FilterType || null)}
          className="px-4 py-2 border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Type</option>
          {FILTER_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <DataTable<OrderHistoryItem>
        columns={columns}
        data={data?.data ?? []}
        getRowId={(item) => item.ProductId}
        isLoading={isLoading}
        isError={isError}
        onRetry={() => refetch()}
        emptyTitle="No order history found"
      />
    </div>
  );
}
