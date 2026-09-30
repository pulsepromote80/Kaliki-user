import type { NavItem } from "@/types/common";
import { APP_ROUTES } from "@/lib/constants";

export const primaryNav: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",

  },

  {
    label: "AI Strategy",
    href: "/ai-strategy",
   
  },
  // {
  //   label: "Agents",
  //   href: "/agents",
    
  //   isDropdown: true,
  //   dropdownItems: [
  //     { label: "Buy Agent License", href: "/buy-agent-license" },
  //     { label: "Purchase Compute Credits", href: "/purchase-credits" },
  //     { label: "Deploy AI Agents", href: "/deploy-agents" },
  //     { label: "License Purchase History", href: "/license-purchase-history" },
  //     { label: "Agent Deployment Report", href: "/my-deployments" },
  //   ]
  // },
  {
    label: "Fund Director",
    href: "/fund-director",
   
  },
  {
    label: "Events",
    href: "/event-booking",
      
    },
  {
    label: "Analytics",
    href: "/analytics",
   
  },
  {
    label: "Affiliate",
    href: "/affiliate",
   
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
   
    isDropdown: true,
    dropdownItems: [
      { label: "Income Report", href: "/transaction-history" },
      { label: "Wallet Manager", href: "/reports" },
    ],
  },
];
