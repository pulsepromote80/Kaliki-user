import { apiClient } from "@/lib/api-client";

export interface DirectMember {
  Urid?: string;
  name?: string;
  loginid?: string;
  mobile?: string;
  email?: string;
  regDate?: string;
  position?: string;
  topupStatus?: string;
  subscriptionAmount?: number;
  leaseAmount?: number;
  topupDate?: string;
  binaryLBuss?: number;
  binaryRBuss?: number;
}

export interface DirectMemberResponse {
  statusCode: number;
  message: string;
  data?: DirectMember[];
}

export const communityService = {
  getDirectMember: (body: { urid: string; statusId: string; loginid: string }) =>
    apiClient.post<DirectMemberResponse>("/Community/getDirectMember", body),
};
