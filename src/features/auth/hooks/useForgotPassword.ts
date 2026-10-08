import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { authService } from "@/features/auth/services/auth.service";
import type { ForgotPasswordPayload } from "@/types/auth";

export function useForgotPassword() {
  return useMutation({
    mutationFn: (payload: ForgotPasswordPayload) => authService.forgotPassword(payload),
    onSuccess: (response) => {
      if (response.statusCode === 200) {
        toast.success(response.message || "Password reset link sent successfully!");
      }
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || "Failed to send reset link";
      toast.error(errorMessage);
    },
  });
}
