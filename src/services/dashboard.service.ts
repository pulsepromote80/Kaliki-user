import { apiClient } from "@/lib/api-client";

export interface DashboardData {
  statusCode: number;
  message: string;
  ActiveDirectIds: number;
  DirectIds: number;
  FullName: string;
  AuthLogin: string;
  DepositWallet: number;
  PerformanceWallet: number;
  YieldWallet: number;
  LegacyWallet: number;
  PerformanceWithdrawal: number;
  YieldWithdrawal: number;
  MyAgent: number;
  PreviousAgent: number;
  TotalTeam: number;
  ActiveTeam: number;
  LeftBussiness: number;
  RightBussiness: number;
  TotLeftTeam: number | null;
  TotRightTeam: number | null;
  UserRank: string;
  RankIcon: string;
  WalletAdd: string;
  ActiveLicensee: number;
}

export interface DashboardSummary {
  statusCode: number;
  message: string;
  data: DashboardData[];
}

export const dashboardService = {
  getSummary: () => apiClient.get<DashboardSummary>("/dashboard"),
};
