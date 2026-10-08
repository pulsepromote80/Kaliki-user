import { apiClient } from "@/lib/api-client";

export interface TransactionHistory {
  CreatedDate?: string;
  credit?: string;
  Remark?: string;
  message?: string;
}

export const walletReportService = {
  getTransactionHistory: async (transType: string): Promise<TransactionHistory[]> => {
    const response = await apiClient.post<{ data?: TransactionHistory[] }>(
      "/api/wallet-manager/income",
      { transtype: transType }
    );
    return response.data || [];
  },
};
