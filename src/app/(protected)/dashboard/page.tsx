"use client";

import { PageHeader } from "@/components/common/PageHeader";
import { PageLoader } from "@/components/common/PageLoader";
import { SummaryCards } from "@/features/dashboard/components/SummaryCards";
import { Banner } from "@/features/dashboard/components/Banner";
import { QuickActions } from "@/features/dashboard/components/QuickActions";
import { GlobalInfrastructure } from "@/features/dashboard/components/GlobalInfrastructure";
import { RecentActivity } from "@/features/dashboard/components/RecentActivity";
import { useDashboardSummary } from "@/features/dashboard/hooks/useDashboardSummary";

export default function DashboardPage() {
  const { isLoading } = useDashboardSummary();

  if (isLoading) {
    return <PageLoader message="Loading dashboard..." />;
  }

  return (
    <>
      <PageHeader title="Dashboard" />
      <Banner />
      <SummaryCards />
      <QuickActions />
      <div className="grid grid-cols-1 gap-6 mt-6 lg:grid-cols-2">
        <GlobalInfrastructure />
        <RecentActivity />
      </div>
    </>
  );
}
