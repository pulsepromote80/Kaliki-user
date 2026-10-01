import type { NavItem } from "@/types/common";
import { APP_ROUTES } from "@/lib/constants";

export const primaryNav: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",

  },

  {
    label: "Packages",
    href: "/",
    isDropdown: true,
    dropdownItems: [
      { label: "Trading Fund ", href: "/package-1" },
      { label: "MIP", href: "/package-2" },
      { label: "Booster", href: "/package-3" },
      { label: "Legacy Reborn", href: "/package-4" },
      { label: "Purchase History", href: "/package-5" },
      
    ],
   
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
    label: "AI Engine",
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
      { label: "Business Dashboard", href: "/ai-business-hub" },
      { label: "Direct Partners", href: "/direct-partners" },
      { label: "Level Partners", href: "/level-partners" },
      { label: "Level Partners Tree", href: "/intelligent-partner-view" },
      { label: "Downline Partners", href: "/community-partners" },
      { label: "Downline Tree", href: "/community-team" },
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
