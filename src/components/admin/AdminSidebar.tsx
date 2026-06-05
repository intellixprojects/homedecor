"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FiGrid,
  FiShoppingBag,
  FiUsers,
  FiMenu,
  FiX,
  FiPackage,
  FiTag,
  FiLogOut,
  FiChevronRight,
} from "react-icons/fi";

const links = [
  { name: "Dashboard",  href: "/admin",            icon: FiGrid,        badge: null },
  { name: "Products",   href: "/admin/products",   icon: FiShoppingBag, badge: null },
  { name: "Orders",     href: "/admin/orders",     icon: FiPackage,     badge: "3"  },
  { name: "Users",      href: "/admin/users",      icon: FiUsers,       badge: null },
  { name: "Categories", href: "/admin/categories", icon: FiTag,         badge: null },
];

export default function AdminSidebar() {
  const pathname   = usePathname() ?? "";
  const router     = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  const handleLogout = async () => {
    setLoggingOut(true);
    router.push("/admin/login");
  };

  const NavLinks = ({ onNav }: { onNav?: () => void }) => (
    <nav className="flex flex-col gap-1 px-3 py-4">
      {links.map((item) => {
        const active = isActive(item.href);
        return (
          <Link
            key={item.name}
            href={item.href}
            onClick={onNav}
            className={`group relative flex items-center gap-3 rounded-2xl px-4 py-3 text-[14px] font-semibold transition-all duration-200 ${
              active
                ? "bg-[#111827] text-white shadow-[0_4px_14px_rgba(17,24,39,0.2)]"
                : "text-[#6b7280] hover:bg-[#f8f5f0] hover:text-[#111827]"
            }`}
          >
            {/* Gold left bar on active */}
            {active && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 rounded-r-full bg-[#c9a96e]" />
            )}

            <item.icon
              className={`text-[17px] flex-shrink-0 transition-colors ${
                active ? "text-[#c9a96e]" : "text-[#9ca3af] group-hover:text-[#111827]"
              }`}
            />

            <span className="flex-1">{item.name}</span>

            {/* Badge */}
            {item.badge && (
              <span
                className={`flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-[10px] font-black ${
                  active
                    ? "bg-[#c9a96e] text-[#111827]"
                    : "bg-[#111827] text-white"
                }`}
              >
                {item.badge}
              </span>
            )}

            {/* Chevron hint on hover */}
            {!active && (
              <FiChevronRight className="text-[13px] text-[#d1d5db] opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0" />
            )}
          </Link>
        );
      })}
    </nav>
  );

  const LogoutBtn = () => (
    <button
      onClick={handleLogout}
      disabled={loggingOut}
      className="group flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-[14px] font-semibold text-[#6b7280] transition-all duration-200 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
    >
      <FiLogOut className="text-[17px] flex-shrink-0 text-[#9ca3af] transition-colors group-hover:text-red-500" />
      <span>{loggingOut ? "Logging out…" : "Logout"}</span>
    </button>
  );

  return (
    <>
      <div className="flex md:hidden items-center justify-between px-4 py-3 bg-white border-b border-[#f3f4f6] sticky top-0 z-40 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[3px] text-[#c9a96e]">NishMee</p>
          <h1 className="text-[20px] font-black text-[#111827] leading-none">Admin</h1>
        </div>

        {/* Show current page name in center */}
        <span className="flex-1 text-center text-[13px] font-semibold text-[#6b7280]">
          {links.find((l) => isActive(l.href))?.name ?? ""}
        </span>

        <button
          onClick={() => setMobileOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f3f4f6] text-[#111827] text-[20px] transition hover:bg-[#111827] hover:text-white"
        >
          <FiMenu />
        </button>
      </div>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 z-50 flex h-full w-[280px] flex-col bg-white shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#f3f4f6]">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#c9a96e]">NishMee</p>
            <h1 className="text-[28px] font-black text-[#111827] leading-none">Admin</h1>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f3f4f6] text-[#111827] text-[18px] hover:bg-[#111827] hover:text-white transition"
          >
            <FiX />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <NavLinks onNav={() => setMobileOpen(false)} />
        </div>

        <div className="border-t border-[#f3f4f6] px-3 py-4">
          <LogoutBtn />
        </div>
      </div>

      <div className="hidden md:flex md:flex-col md:w-[240px] md:min-h-screen md:flex-shrink-0 bg-white border-r border-[#eeeeee]">

        {/* Brand */}
        <div className="px-6 pt-8 pb-7 border-b border-[#f3f4f6]">
          <p className="mb-1 text-[10px] font-bold uppercase tracking-[4px] text-[#c9a96e]">NishMee</p>
          <h1 className="text-[30px] font-black text-[#111827] leading-none">Admin</h1>
        </div>

        {/* Menu label */}
        <p className="px-7 pt-5 pb-1 text-[9px] font-bold uppercase tracking-[3px] text-[#d1d5db]">
          Menu
        </p>

        {/* Nav */}
        <div className="flex-1">
          <NavLinks />
        </div>

        {/* Admin info + logout */}
        <div className="border-t border-[#f3f4f6] px-3 py-4 space-y-1">
          <div className="flex items-center gap-3 rounded-2xl px-4 py-3 bg-[#f8f9fb]">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#111827] text-[11px] font-black text-[#c9a96e]">
              A
            </div>
            <div className="min-w-0">
              <p className="truncate text-[13px] font-black text-[#111827]">Admin</p>
              <p className="truncate text-[11px] text-[#9ca3af]">NishMee Store</p>
            </div>
          </div>
          <LogoutBtn />
        </div>
      </div>
    </>
  );
}