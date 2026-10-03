import { create } from "zustand";
import type { DirectMember } from "@/services/community.service";

interface PersonalTeamMember {
  uLvl?: number;
  Loginid?: string;
  SponsorId?: string;
  Name?: string;
  RegDate?: string;
  Email?: string;
  Mobile?: string;
  Urank?: string;
  status?: string;
  SubscriptionAmount?: number;
  SubscribeDate?: string;
  DeployDate?: string;
  TeamBusiness?: number;
  ActiveTeam?: number;
  totTeam?: number;
  CountryFlag?: string;
  CountryId?: number;
}

interface CommunityState {
  directMemberData: DirectMember[];
  personalTeamData: PersonalTeamMember[];
  loading: boolean;
  error: string | null;
  setDirectMemberData: (data: DirectMember[]) => void;
  setPersonalTeamData: (data: PersonalTeamMember[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearDirectMemberData: () => void;
  clearPersonalTeamData: () => void;
}

export const useCommunityStore = create<CommunityState>((set) => ({
  directMemberData: [],
  personalTeamData: [],
  loading: false,
  error: null,
  setDirectMemberData: (data) => set({ directMemberData: data }),
  setPersonalTeamData: (data) => set({ personalTeamData: data }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  clearDirectMemberData: () => set({ directMemberData: [], error: null }),
  clearPersonalTeamData: () => set({ personalTeamData: [], error: null }),
}));
