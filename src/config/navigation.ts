import type { NavItem } from "@/types/common";
import { APP_ROUTES } from "@/lib/constants";

export const primaryNav: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    img: "https://imagedelivery.net/nq9qT5FHZv9Sg48UUnD1-A/bd85e7b8-c7c1-4ab2-10fa-2893f5027900/public",
  },
  {
    label: "Agents",
    href: "/agents",
    img: "https://imagedelivery.net/nq9qT5FHZv9Sg48UUnD1-A/c72bec26-dba2-4af8-9217-59d8cf651300/public",
    isDropdown: true,
    dropdownItems: [
      { label: "Buy Agent License", href: "/buy-agent-license" },
      { label: "Purchase Compute Credits", href: "/purchase-credits" },
      { label: "Deploy AI Agents", href: "/deploy-agents" },
      { label: "License Purchase History", href: "/license-purchase-history" },
      { label: "Agent Deployment Report", href: "/my-deployments" },
    ]
  },
  {
    label: "Fund Director",
    href: "/fund-director",
    img: "https://imagedelivery.net/nq9qT5FHZv9Sg48UUnD1-A/880cd4e3-a53a-41d4-30bb-425298d5cd00/public",
  },
  {
    label: "Events",
    href: "/event-booking",
    img: "https://imagedelivery.net/nq9qT5FHZv9Sg48UUnD1-A/c7bd12cc-b142-4472-8e01-de3841d4af00/public",
  },
  {
    label: "Analytics",
    href: "/analytics",
    img: "https://imagedelivery.net/nq9qT5FHZv9Sg48UUnD1-A/2068afbc-3671-4a55-9cab-e3c909cc5300/public",
  },
  {
    label: "Affiliate",
    href: "/affiliate",
    img: "https://imagedelivery.net/nq9qT5FHZv9Sg48UUnD1-A/c50cc896-48bc-4309-33fa-fbfae3b0ef00/public",
    isDropdown: true,
    dropdownItems: [
      { label: "AI Business Hub", href: "/ai-business-hub" },
      { label: "Direct Partners", href: "/direct-partners" },
      { label: "Team Growth Matrix", href: "/team-growth-matrix" },
      { label: "Intelligent Partner View", href: "/intelligent-partner-view" },
      { label: "Community Partners", href: "/community-partners" },
      { label: "Community Team", href: "/community-team" },
    ],
  },
  {
    label: "Reports",
    href: "/reports",
    img: "https://imagedelivery.net/nq9qT5FHZv9Sg48UUnD1-A/f13c779d-1591-41c4-ca52-9d51708fc100/public",
    isDropdown: true,
    dropdownItems: [
      { label: "Income Report", href: "/transaction-history" },
      { label: "Wallet Manager", href: "/reports" },
    ],
  },
];
