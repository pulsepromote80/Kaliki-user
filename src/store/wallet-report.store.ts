import { create } from "zustand";

export interface TransactionHistory {
  CreatedDate?: string;
  credit?: string;
  Remark?: string;
  message?: string;
}

interface WalletReportState {
  transactionhistorydata: TransactionHistory[];
  setTransactionHistory: (data: TransactionHistory[]) => void;
  clearTransactionHistory: () => void;
}

export const useWalletReportStore = create<WalletReportState>((set) => ({
  transactionhistorydata: [],
  setTransactionHistory: (data) => set({ transactionhistorydata: data }),
  clearTransactionHistory: () => set({ transactionhistorydata: [] }),
}));
