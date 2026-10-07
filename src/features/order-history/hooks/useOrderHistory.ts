import { useQuery } from "@tanstack/react-query";
import { orderHistoryService } from "@/services/order-history.service";
import { QUERY_KEYS } from "@/lib/constants";

export function useOrderHistory(type?: string) {
  return useQuery({
    queryKey: [...QUERY_KEYS.orderHistory.all, type],
    queryFn: () => orderHistoryService.list(type),
  });
}
