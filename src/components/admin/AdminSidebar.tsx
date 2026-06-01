"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  FiGrid,
  FiShoppingBag,
  FiUsers,
  FiMenu,
  FiX,
} from "react-icons/fi";

const links = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: FiGrid,
  },
  {
    name: "Products",
    href: "/admin/products",
    icon: FiShoppingBag,
  },
  {
    name: "Users",
    href: "/admin/users",
    icon: FiUsers,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname() ?? "";
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* ===== MOBILE TOPBAR ===== */}
      <div className="flex md:hidden items-center justify-between px-4 py-3 bg-white border-b border-[#f3f4f6] sticky top-0 z-40">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[3px] text-[#c9a96e]">
            NishMee
          </p>
          <h1 className="text-[20px] font-black text-[#111827] leading-none">
            Admin
          </h1>
        </div>

        <button
          onClick={() => setMobileOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f3f4f6] text-[#111827] text-[20px] transition hover:bg-[#111827] hover:text-white"
        >
          <FiMenu />
        </button>
      </div>

      {/* ===== MOBILE OVERLAY ===== */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ===== MOBILE DRAWER ===== */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-[260px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* DRAWER HEADER */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#f3f4f6]">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#c9a96e]">
              NishMee
            </p>
            <h1 className="text-[28px] font-black text-[#111827] leading-none">
              Admin
            </h1>
          </div>

          <button
            onClick={() => setMobileOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f3f4f6] text-[#111827] text-[18px] hover:bg-[#111827] hover:text-white transition"
          >
            <FiX />
          </button>
        </div>

        {/* DRAWER LINKS */}
        <nav className="flex flex-col gap-1 px-4 py-5">
          {links.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3.5 text-[15px] font-semibold transition-all duration-200 ${
                  active
                    ? "bg-[#111827] text-white shadow-[0_4px_14px_rgba(17,24,39,0.25)]"
                    : "text-[#6b7280] hover:bg-[#f8f5f0] hover:text-[#111827]"
                }`}
              >
                <item.icon
                  className={`text-[18px] flex-shrink-0 ${
                    active ? "text-white" : "text-[#9ca3af]"
                  }`}
                />
                <span>{item.name}</span>
                {active && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#c9a96e]" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* ===== DESKTOP SIDEBAR ===== */}
      <div className="hidden md:flex md:flex-col md:w-[260px] md:min-h-screen md:flex-shrink-0 bg-white border-r border-[#eee]">

        {/* BRAND */}
        <div className="px-6 pt-8 pb-8 border-b border-[#f3f4f6]">
          <p className="mb-1 text-[10px] font-bold uppercase tracking-[4px] text-[#c9a96e]">
            NishMee
          </p>
          <h1 className="text-[32px] font-black text-[#111827] leading-none">
            Admin
          </h1>
        </div>

        {/* DESKTOP LINKS */}
        <nav className="flex flex-col gap-1 px-4 py-5">
          {links.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3.5 text-[15px] font-semibold w-full transition-all duration-200 ${
                  active
                    ? "bg-[#111827] text-white shadow-[0_4px_14px_rgba(17,24,39,0.25)]"
                    : "text-[#6b7280] hover:bg-[#f8f5f0] hover:text-[#111827]"
                }`}
              >
                <item.icon
                  className={`text-[18px] flex-shrink-0 ${
                    active ? "text-white" : "text-[#9ca3af]"
                  }`}
                />
                <span>{item.name}</span>
                {active && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#c9a96e]" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}