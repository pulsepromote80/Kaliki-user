import { create } from "zustand";
import type { DirectMember } from "@/services/community.service";

interface CommunityState {
  directMemberData: DirectMember[];
  loading: boolean;
  error: string | null;
  setDirectMemberData: (data: DirectMember[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearDirectMemberData: () => void;
}

export const useCommunityStore = create<CommunityState>((set) => ({
  directMemberData: [],
  loading: false,
  error: null,
  setDirectMemberData: (data) => set({ directMemberData: data }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  clearDirectMemberData: () => set({ directMemberData: [], error: null }),
}));
