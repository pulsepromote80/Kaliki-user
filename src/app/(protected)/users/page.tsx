"use client";

import { PageHeader } from "@/components/common/PageHeader";
import { PageLoader } from "@/components/common/PageLoader";
import { UsersTable } from "@/features/users/components/UsersTable";
import { useUsers } from "@/features/users/hooks/useUsers";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";
import { useState } from "react";

export default function UsersPage() {
  const [page, setPage] = useState(1);
  const { isLoading } = useUsers({ page, pageSize: DEFAULT_PAGE_SIZE });

  if (isLoading) {
    return <PageLoader message="Loading users..." />;
  }

  return (
    <>
      <PageHeader title="Users" description="Manage who has access to this workspace." />
      <UsersTable page={page} onPageChange={setPage} />
    </>
  );
}
