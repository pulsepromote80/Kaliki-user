import { apiClient } from "@/lib/api-client";

export interface OrderHistoryItem {
  Authlogin: string;
  FullName: string;
  ProductId: string;
  RDate: string;
  ProductName: string;
  Rkprice: number;
  PackageName: string;
  CreatedDate: string;
  IsDist: string | null;
  Paymentmode: string;
  IsExpire: string | null;
  Remark: string;
  Active: boolean;
}

export const orderHistoryService = {
  list: (type?: string) =>
    apiClient.get<{ statusCode: number; message: string; data: OrderHistoryItem[] }>(
      "/FundManager/getUserRechargeDetails",
      { params: type ? { Type: type } : undefined }
    ),
};
