"use client";

import { PageLoader } from "@/components/common/PageLoader";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";

export function ProtectedContent({ children }: { children: React.ReactNode }) {
  const { isLoading } = useCurrentUser();

  if (isLoading) {
    return <PageLoader message="Loading..." />;
  }

  return <>{children}</>;
}
