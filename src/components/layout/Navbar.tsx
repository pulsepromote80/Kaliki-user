"use client";

import { Menu, User, Moon, Sun, Wallet, Bell, ChevronDown, UserRound, ChevronUp, Check, Copy, Headphones, LogOut } from "lucide-react";
import { useSidebarStore } from "@/store/sidebar.store";
import { useAuthStore } from "@/store/auth.store";
import { primaryNav } from "@/config/navigation";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";
import { useDashboardSummary } from "@/features/dashboard/hooks/useDashboardSummary";
import { authService } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

export function Navbar() {
  const setMobileOpen = useSidebarStore((state) => state.setMobileOpen);
  const user = useAuthStore((state) => state.user);
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [authLoginCopied, setAuthLoginCopied] = useState(false);
  const accountMenuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: dashboardData } = useDashboardSummary();
  const displayAuthLogin = dashboardData?.data?.[0]?.AuthLogin || user?.name || 'Account';

  const handleLogout = async () => {
    try {
      await authService.logout();
      useAuthStore.getState().clearUser();
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const copyAuthLogin = () => {
    if (displayAuthLogin) {
      navigator.clipboard.writeText(displayAuthLogin);
      setAuthLoginCopied(true);
      setTimeout(() => setAuthLoginCopied(false), 2000);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (accountMenuRef.current && !accountMenuRef.current.contains(event.target as Node)) {
        setAccountMenuOpen(false);
      }
    };

    if (accountMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [accountMenuOpen]);

  return (
    <header className="flex h-16 items-center justify-between border-b px-6" style={{ background: '#0B1021', borderColor: '#1E293B' }}>
      <button
        className="rounded-md p-2 hover:bg-white/5 lg:hidden"
        onClick={() => setMobileOpen(true)}
        aria-label="Open menu"
        style={{ color: '#f5c451' }}
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)' }}>
            <div className="h-4 w-4 rounded-full" style={{ background: '#f5c451' }} />
          </div>
          <span className="text-xl font-bold" style={{ color: '#f5c451' }}>KALKII</span>
        </div>

        <nav className="hidden lg:flex items-center gap-6">
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
                    style={{ color: isActive ? '#f5c451' : '#E2E8F0' }}
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
                    <div className="absolute left-0 top-full z-50 mt-2 w-56 rounded-md border shadow-lg" style={{ background: '#0B1021', borderColor: '#1E293B' }}>
                      <div className="py-2">
                        {item.dropdownItems.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.href}
                            href={dropdownItem.href}
                            className="block px-4 py-2 text-sm hover:bg-white/5"
                            style={{ color: '#E2E8F0' }}
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
                style={{ color: isActive ? '#f5c451' : '#E2E8F0' }}
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

      <div className="flex items-center gap-4">
        <button
          className="rounded-md p-2 hover:bg-white/5"
          aria-label="Toggle theme"
          style={{ color: '#f5c451' }}
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {mounted && theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>

        <button className="rounded-md p-2 hover:bg-white/5" aria-label="Wallet" style={{ color: '#f5c451' }}>
          <Wallet className="h-5 w-5" />
        </button>

        <button className="relative rounded-md p-2 hover:bg-white/5" aria-label="Notifications" style={{ color: '#f5c451' }}>
          <Bell className="h-5 w-5" />
          <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-medium text-white" style={{ background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)' }}>
            1
          </span>
        </button>

        <div ref={accountMenuRef} className="relative">
          <button
            type="button"
            onClick={() => setAccountMenuOpen((open) => !open)}
            className="flex h-10 items-center gap-2 rounded-full border px-2 py-1.5 text-xs transition hover:border-[#f5c451] hover:bg-white/5 sm:px-2.5"
            style={{ background: '#0B1021', borderColor: '#1E293B', color: '#f5c451' }}
            aria-expanded={accountMenuOpen}
            aria-label="Open account menu"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full" style={{ background: 'linear-gradient(145deg, #f5c451, #d4a017)', color: '#0B1021' }}>
              <UserRound size={17} strokeWidth={2} />
            </span>
            <span className="max-w-[96px] truncate font-semibold ">{displayAuthLogin || 'Account'}</span>
            {accountMenuOpen ? <ChevronUp size={15} strokeWidth={2} /> : <ChevronDown size={15} strokeWidth={2} />}
          </button>
          {accountMenuOpen && (
            <div className="absolute right-0 top-full z-20 mt-3 w-[min(280px,calc(100vw-1.5rem))] overflow-hidden rounded-2xl border shadow-2xl" style={{ background: '#0B1021', borderColor: '#1E293B', boxShadow: '0 18px 50px rgba(0,0,0,0.45)' }}>
              <div className="p-4 sm:p-5">
                <div className="mb-3 text-[11px] font-semibold tracking-[0.18em]" style={{ color: '#64748B' }}>YOUR USER ID</div>
                <button type="button" onClick={copyAuthLogin} className="flex w-full items-center justify-between gap-3 rounded-xl p-2 text-left transition-transform hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-[#f5c451]" style={{ background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)', color: '#FFFFFF' }} aria-label="Copy your user ID">
                  <span className="flex min-w-0 items-center gap-3">
                    <span className="shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold tracking-wide" style={{ background: 'rgba(255,255,255,0.22)' }}>ID</span>
                    <span className="truncate text-base font-semibold tracking-wide">{displayAuthLogin || 'Not available'}</span>
                  </span>
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-lg" style={{ background: 'rgba(255,255,255,0.22)' }}>
                    {authLoginCopied ? <Check size={17} /> : <Copy size={17} />}
                  </span>
                </button>
                <div className="mt-2 text-center text-xs" style={{ color: '#64748B' }}>Click to copy your ID</div>
              </div>
              <div className="border-t py-1" style={{ borderColor: '#1E293B' }}>
                <Link
                  href="/profile"
                  onClick={() => setAccountMenuOpen(false)}
                  className="flex w-full items-center gap-3 px-5 py-3.5 text-left text-sm font-medium transition-colors hover:bg-white/5"
                  style={{ color: '#E2E8F0' }}
                >
                  <UserRound size={18} strokeWidth={1.8} />
                  Profile
                </Link>

                <Link
                  href="/support"
                  onClick={() => setAccountMenuOpen(false)}
                  className="flex w-full items-center gap-3 px-5 py-3.5 text-left text-sm font-medium transition-colors hover:bg-white/5"
                  style={{ color: '#E2E8F0' }}
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
    </header>
  );
}
