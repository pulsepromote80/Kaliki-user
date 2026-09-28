import { PageHeader } from "@/components/common/PageHeader";
import { UsersTable } from "@/features/users/components/UsersTable";

export default function UsersPage() {
  return (
    <>
      <PageHeader title="Users" description="Manage who has access to this workspace." />
      <UsersTable />
    </>
  );
}
