import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authService } from "@/features/auth/services/auth.service";
import { useAuthStore } from "@/store/auth.store";
import { QUERY_KEYS } from "@/lib/constants";

export function useLogout() {
  const queryClient = useQueryClient();
  const clearUser = useAuthStore((state) => state.clearUser);
  const router = useRouter();

  const handleLogout = async () => {
    // Clear user state immediately
    clearUser();
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.auth.me });
    
    // Fire and forget the API call - don't wait for it
    authService.logout().catch((error) => {
      console.error("Logout API call failed:", error);
    });
    
    // Redirect immediately without waiting for API
    router.push("/login");
    router.refresh();
  };

  return {
    mutate: handleLogout,
    isPending: false,
  };
}
