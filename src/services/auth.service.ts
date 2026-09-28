import { apiClient } from "@/lib/api-client";
import type {
  LoginCredentials,
  AuthenticatedUser,
  ForgotPasswordPayload,
  ResetPasswordPayload,
  RegistrationPayload,
  Country,
  ReferralData,
} from "@/types/auth";

/**
 * Browser-facing auth service. Every call goes through our own
 * `/api/auth/*` Route Handlers, never the .NET backend directly.
 */
export const authService = {
  login: (credentials: LoginCredentials) =>
    apiClient.post<AuthenticatedUser, LoginCredentials>(
      "/auth/login",
      credentials,
    ),

  logout: () => apiClient.post<{ success: true }>("/auth/logout"),

  me: () => apiClient.get<AuthenticatedUser>("/auth/me"),

  forgotPassword: (payload: ForgotPasswordPayload) =>
    apiClient.post<{ success: true }, ForgotPasswordPayload>(
      "/auth/forgot-password",
      payload,
    ),

  resetPassword: (payload: ResetPasswordPayload) =>
    apiClient.post<{ success: true }, ResetPasswordPayload>(
      "/auth/reset-password",
      payload,
    ),

  register: (payload: RegistrationPayload) =>
    apiClient.post<{ success: true }, RegistrationPayload>(
      "/auth/register",
      payload,
    ),

  getCountries: () => apiClient.get<{ data: Country[] }>("/auth/countries"),

  validateReferral: (referralId: string) =>
    apiClient.get<ReferralData>(`/auth/referral?referralId=${referralId}`),

  sendOtp: (loginID: string, password: string) =>
    apiClient.post<{ success: true }, { loginID: string, password: string }>(
      "/auth/send-otp",
      { loginID, password },
    ),
};
