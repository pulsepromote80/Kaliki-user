import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authService } from "@/features/auth/services/auth.service";
import { QUERY_KEYS } from "@/lib/constants";
import type { RegistrationPayload, Country, ReferralData } from "@/types/auth";

export function useRegistration() {
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: RegistrationPayload) => authService.register(payload),
    onSuccess: (response) => {
      if (response.success) {
        toast.success("Account created successfully!");
        router.push("/welcome-letter");
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Registration failed. Please try again.");
    },
  });
}

export function useCountries() {
  return useQuery({
    queryKey: ["countries"],
    queryFn: () => authService.getCountries(),
  });
}

export function useValidateReferral() {
  return useMutation({
    mutationFn: (referralId: string) => authService.validateReferral(referralId),
    onSuccess: (response) => {
      if (response.statusCode === 200) {
        toast.success("Referral ID validated successfully!");
      } else {
        toast.error(response.message || "Referral ID not found");
      }
    },
    onError: () => {
      toast.error("Invalid referral ID");
    },
  });
}

export function useSendOtp() {
  return useMutation({
    mutationFn: ({ loginID, password }: { loginID: string; password: string }) => 
      authService.sendOtp(loginID, password),
    onSuccess: () => {
      toast.success("OTP sent successfully!");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to send OTP. Please try again.");
    },
  });
}
