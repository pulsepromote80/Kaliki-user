"use client";

import { Menu, User, Moon, Sun, Wallet, Bell, ChevronDown, UserRound, ChevronUp, Check, Copy, Headphones, LogOut, X, Briefcase, TrendingUp, BarChart3, ShieldCheck } from "lucide-react";
import { useAuthStore } from "@/store/auth.store";
import { primaryNav } from "@/config/navigation";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";
import { useDashboardSummary } from "@/features/dashboard/hooks/useDashboardSummary";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { useTheme } from "next-themes";
import Image from "next/image";

export function Navbar() {
  const user = useAuthStore((state) => state.user);
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [walletOpen, setWalletOpen] = useState(false); 
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(null);
  const [authLoginCopied, setAuthLoginCopied] = useState(false);
  
  const accountMenuRef = useRef<HTMLDivElement>(null);
  const walletRef = useRef<HTMLDivElement>(null);
  
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const logout = useLogout();

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: dashboardData } = useDashboardSummary();
  const displayAuthLogin = dashboardData?.data?.[0]?.AuthLogin || user?.name || 'Account';
  const walletData = dashboardData?.data?.[0];

  const handleLogout = () => {
    logout.mutate();
  };

  const copyAuthLogin = () => {
    if (displayAuthLogin) {
      navigator.clipboard.writeText(displayAuthLogin);
      setAuthLoginCopied(true);
      setTimeout(() => setAuthLoginCopied(false), 2000);
    }
  };

  // Click Outside Logic (Account Menu + Wallet Menu)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (accountMenuRef.current && !accountMenuRef.current.contains(event.target as Node)) {
        setAccountMenuOpen(false);
      }
      if (walletRef.current && !walletRef.current.contains(event.target as Node)) {
        setWalletOpen(false);
      }
    };

    if (accountMenuOpen || walletOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [accountMenuOpen, walletOpen]);

  // Wallet Data (Screenshot ke hisaab se)
 const wallets = [
  { 
    id: 'deposit', 
    name: 'Deposit Wallet', 
    balance: walletData?.DepositWalletBal ? `$${Number(walletData.DepositWalletBal).toFixed(4)}` : '$0.0000', 
    icon: Briefcase, 
    color: '#0ea5e9', 
    bg: '#e0f2fe' 
  },
  { 
    id: 'performance', 
    name: 'Performance Wallet', 
    balance: walletData?.IncomeWalletbal ? `$${Number(walletData.IncomeWalletbal).toFixed(4)}` : '$0.0000', 
    icon: TrendingUp, 
    color: '#8b5cf6', 
    bg: '#ede9fe' 
  },
  { 
    id: 'yield', 
    name: 'Yield Wallet', 
    balance: walletData?.RentWalletBal ? `$${Number(walletData.RentWalletBal).toFixed(4)}` : '$0.0000', 
    icon: BarChart3, 
    color: '#10b981', 
    bg: '#d1fae5' 
  },
  { 
    id: 'legacy', 
    name: 'Legacy Wallet', 
    balance: walletData?.LegacyWallet ? `$${Number(walletData.LegacyWallet).toFixed(4)}` : '$0.0000', 
    icon: ShieldCheck, 
    color: '#f59e0b', 
    bg: '#fef3c7' 
  },
];

  return (
    <header className="flex h-16 items-center justify-between border-b px-4 sm:px-6 bg-white dark:bg-[#0B1021] border-gray-200 dark:border-[#1E293B]">
      <button
        className="rounded-md p-2 hover:bg-gray-100 dark:hover:bg-white/5 lg:hidden"
        onClick={() => setMobileNavOpen(true)}
        aria-label="Open menu"
        style={{ color: '#f5c451' }}
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="flex items-center gap-4 sm:gap-8 flex-1">
        <div className="flex items-center gap-2">
          <Image
            src="/logos/kalki-horizontal-logo.png"
            alt="KALKII Logo"
            width={150}
            height={40}
            className="h-10 w-auto object-contain"
          />
        </div>

        <nav className="hidden lg:flex items-center gap-6 sm:gap-10 flex-1 justify-center">
          {primaryNav.map((item) => {
            const isActive = pathname.startsWith(item.href);

            if (item.isDropdown && item.dropdownItems) {
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    className={cn(
                      "flex items-center gap-2 text-sm font-medium transition-colors",
                      isActive ? "" : "hover:text-[#f5c451]",
                    )}
                    style={{ color: isActive ? '#f5c451' : (!mounted || theme === 'dark') ? '#E2E8F0' : '#334155' }}
                  >
                    {item.img && (
                      <img
                        src={item.img}
                        alt={item.label}
                        className="h-5 w-5"
                      />
                    )}
                    {item.label}
                    <ChevronDown className="h-4 w-4" />
                  </button>

                  {openDropdown === item.label && (
                    <div className="absolute left-0 top-full z-50 mt-2 w-56 rounded-md border shadow-lg bg-white dark:bg-[#0B1021] border-gray-200 dark:border-[#1E293B]">
                      <div className="py-2">
                        {item.dropdownItems.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.href}
                            href={dropdownItem.href}
                            className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-white/5"
                            style={{ color: (!mounted || theme === 'dark') ? '#E2E8F0' : '#334155' }}
                          >
                            {dropdownItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 text-sm font-medium transition-colors",
                  isActive ? "" : "hover:text-[#f5c451]",
                )}
                style={{ color: isActive ? '#f5c451' : (!mounted || theme === 'dark') ? '#E2E8F0' : '#334155' }}
              >
                {item.img && (
                  <img
                    src={item.img}
                    alt={item.label}
                    className="h-5 w-5"
                  />
                )}
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <button
          className="rounded-md p-2 hover:bg-gray-100 dark:hover:bg-white/5"
          aria-label="Toggle theme"
          style={{ color: '#f5c451' }}
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {mounted && theme === 'dark' ? <Sun className="h-4 sm:h-5 w-4 sm:w-5" /> : <Moon className="h-4 sm:h-5 w-4 sm:w-5" />}
        </button>

        {/* ================= WALLET DROPDOWN START ================= */}
        <div ref={walletRef} className="relative hidden sm:block">
          <button 
            onClick={() => setWalletOpen((open) => !open)}
            className="rounded-md p-2 hover:bg-gray-100 dark:hover:bg-white/5" 
            aria-label="Wallet" 
            style={{ color: '#f5c451' }}
          >
            <Wallet className="h-5 w-5" />
          </button>

          {walletOpen && (
            <div className="absolute right-0 top-full z-50 mt-3 w-[320px] rounded-2xl border shadow-2xl bg-white dark:bg-[#0B1021] border-gray-200 dark:border-[#1E293B] dark:shadow-black/50 overflow-hidden">
              
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-[#1E293B]">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <Wallet size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white">Wallet Balance</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Your current balances</p>
                  </div>
                </div>
                <button 
                  onClick={() => setWalletOpen(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Wallet List */}
              <div className="p-4 space-y-3">
                {wallets.map((wallet) => (
                  <div 
                    key={wallet.id}
                    className="flex items-center justify-between p-3 rounded-xl transition-colors hover:opacity-90"
                    style={{ backgroundColor: wallet.bg }}
                  >
                    <div className="flex items-center gap-3">
                      {/* Colored Dot */}
                      <div className="h-2 w-2 rounded-full" style={{ backgroundColor: wallet.color }} />
                      
                      {/* Icon & Name */}
                      <wallet.icon size={18} style={{ color: wallet.color }} />
                      <span className="text-sm font-semibold" style={{ color: wallet.color }}>
                        {wallet.name}
                      </span>
                    </div>
                    
                    {/* Balance */}
                    <span className="text-sm font-bold" style={{ color: wallet.color }}>
                      {wallet.balance}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        {/* ================= WALLET DROPDOWN END ================= */}

        <button className="relative rounded-md p-2 hover:bg-gray-100 dark:hover:bg-white/5" aria-label="Notifications" style={{ color: '#f5c451' }}>
          <Bell className="h-4 sm:h-5 w-4 sm:w-5" />
          <span className="absolute right-0 top-0 flex h-3 w-3 sm:h-4 sm:w-4 items-center justify-center rounded-full text-[10px] font-medium text-white" style={{ background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)' }}>
            1
          </span>
        </button>

        <div ref={accountMenuRef} className="relative">
          <button
            type="button"
            onClick={() => setAccountMenuOpen((open) => !open)}
            className="flex h-10 items-center gap-2 rounded-full border px-2 py-1.5 text-xs transition hover:border-[#f5c451] hover:bg-gray-100 dark:hover:bg-white/5 sm:px-2.5 bg-white dark:bg-[#0B1021] border-gray-200 dark:border-[#1E293B]"
            style={{ color: '#f5c451' }}
            aria-expanded={accountMenuOpen}
            aria-label="Open account menu"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full" style={{ background: 'linear-gradient(145deg, #f5c451, #d4a017)', color: '#0B1021' }}>
              <UserRound size={17} strokeWidth={2} />
            </span>
            <span className="hidden sm:block max-w-[96px] truncate font-semibold ">{displayAuthLogin || 'Account'}</span>
            {accountMenuOpen ? <ChevronUp size={15} strokeWidth={2} /> : <ChevronDown size={15} strokeWidth={2} />}
          </button>
          
          {accountMenuOpen && (
            <div className="absolute right-0 top-full z-20 mt-3 w-[min(280px,calc(100vw-1.5rem))] overflow-hidden rounded-2xl border shadow-2xl bg-white dark:bg-[#0B1021] border-gray-200 dark:border-[#1E293B] dark:shadow-black/50">
              <div className="p-4 sm:p-5">
                <div className="mb-3 text-[11px] font-semibold tracking-[0.18em]" style={{ color: theme === 'dark' ? '#64748B' : '#6B7280' }}>YOUR USER ID</div>
                <button type="button" onClick={copyAuthLogin} className="flex w-full items-center justify-between gap-3 rounded-xl p-2 text-left transition-transform hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-[#f5c451]" style={{ background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)', color: '#FFFFFF' }} aria-label="Copy your user ID">
                  <span className="flex min-w-0 items-center gap-3">
                    <span className="shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold tracking-wide" style={{ background: 'rgba(255,255,255,0.22)' }}>ID</span>
                    <span className="truncate text-base font-semibold tracking-wide">{displayAuthLogin || 'Not available'}</span>
                  </span>
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-lg" style={{ background: 'rgba(255,255,255,0.22)' }}>
                    {authLoginCopied ? <Check size={17} /> : <Copy size={17} />}
                  </span>
                </button>
                <div className="mt-2 text-center text-xs" style={{ color: theme === 'dark' ? '#64748B' : '#6B7280' }}>Click to copy your ID</div>
              </div>
              <div className="border-t py-1 border-gray-200 dark:border-[#1E293B]">
                <Link
                  href="/profile"
                  onClick={() => setAccountMenuOpen(false)}
                  className="flex w-full items-center gap-3 px-5 py-3.5 text-left text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-white/5"
                  style={{ color: theme === 'dark' ? '#E2E8F0' : '#334155' }}
                >
                  <UserRound size={18} strokeWidth={1.8} />
                  Profile
                </Link>

                <Link
                  href="/support"
                  onClick={() => setAccountMenuOpen(false)}
                  className="flex w-full items-center gap-3 px-5 py-3.5 text-left text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-white/5"
                  style={{ color: theme === 'dark' ? '#E2E8F0' : '#334155' }}
                >
                  <Headphones size={18} strokeWidth={1.8} />
                  Support
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 px-5 py-3.5 text-left text-sm font-medium transition-colors hover:bg-red-500/10"
                  style={{ color: '#F87171' }}
                >
                  <LogOut size={18} strokeWidth={1.8} />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setMobileNavOpen(false)} />
          <div className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-[#0B1021] shadow-xl overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-[#1E293B]">
              <span className="font-bold" style={{ color: '#f5c451' }}>Menu</span>
              <button
                onClick={() => setMobileNavOpen(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-md"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="p-4 space-y-2">
              {primaryNav.map((item) => {
                const isActive = pathname.startsWith(item.href);
                const isDropdownOpen = mobileDropdownOpen === item.label;

                if (item.isDropdown && item.dropdownItems) {
                  return (
                    <div key={item.label}>
                      <button
                        onClick={() => setMobileDropdownOpen(isDropdownOpen ? null : item.label)}
                        className={cn(
                          "w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                          isActive ? "bg-[#f5c451]/10 text-[#f5c451]" : "hover:bg-gray-100 dark:hover:bg-white/5"
                        )}
                        style={{ color: isActive ? '#f5c451' : (!mounted || theme === 'dark') ? '#E2E8F0' : '#334155' }}
                      >
                        <div className="flex items-center gap-3">
                          {item.img && (
                            <img
                              src={item.img}
                              alt={item.label}
                              className="h-5 w-5"
                            />
                          )}
                          {item.label}
                        </div>
                        <ChevronDown className={cn("h-4 w-4 transition-transform", isDropdownOpen ? "rotate-180" : "")} />
                      </button>
                      {isDropdownOpen && (
                        <div className="ml-4 mt-2 space-y-1">
                          {item.dropdownItems.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.href}
                              href={dropdownItem.href}
                              onClick={() => {
                                setMobileNavOpen(false);
                                setMobileDropdownOpen(null);
                              }}
                              className="block px-4 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-white/5"
                              style={{ color: (!mounted || theme === 'dark') ? '#E2E8F0' : '#334155' }}
                            >
                              {dropdownItem.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileNavOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                      isActive ? "bg-[#f5c451]/10 text-[#f5c451]" : "hover:bg-gray-100 dark:hover:bg-white/5"
                    )}
                    style={{ color: isActive ? '#f5c451' : (!mounted || theme === 'dark') ? '#E2E8F0' : '#334155' }}
                  >
                    {item.img && (
                      <img
                        src={item.img}
                        alt={item.label}
                        className="h-5 w-5"
                      />
                    )}
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}