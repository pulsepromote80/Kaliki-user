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
      { label: "Investment Fund ", href: "/investment-amount" },
      { label: "Booster", href: "/booster" },
      { label: "Order History", href: "/order-history" },
      
    ],
   
  },
  
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
      { label: "Downline Partners", href: "/binary-tree" },
      { label: "Downline Tree", href: "/network-tree" },
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
