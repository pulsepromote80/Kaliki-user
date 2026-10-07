import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/Skeleton";

export interface TableColumn<T> {
  key: string;
  header: string;
  render: (row: T, index: number) => ReactNode;
  className?: string;
}

export interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  getRowId: (row: T) => string;
  isLoading?: boolean;
}

export function Table<T>({ columns, data, getRowId, isLoading }: TableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-md border border-border">
      <table className="w-full text-left text-xs sm:text-sm">
        <thead className="border-b border-border bg-muted/50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={cn("px-2 sm:px-4 py-2 sm:py-3 font-medium text-muted-foreground whitespace-nowrap", column.className)}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column) => (
                  <td key={column.key} className={cn("px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap", column.className)}>
                    <Skeleton className="h-4 w-full" />
                  </td>
                ))}
              </tr>
            ))
          ) : (
            data.map((row, index) => (
              <tr key={getRowId(row)} className="hover:bg-muted/30">
                {columns.map((column) => (
                  <td key={column.key} className={cn("px-2 sm:px-4 py-2 sm:py-3 text-foreground whitespace-nowrap", column.className)}>
                    {column.render(row, index)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
