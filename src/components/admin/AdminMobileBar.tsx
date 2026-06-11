"use client";

import { usePathname } from "next/navigation";
import { FiMenu } from "react-icons/fi";

const PAGE_NAMES: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/products": "Products",
  "/admin/orders": "Orders",
  "/admin/users": "Users",
  "/admin/categories": "Categories",
};

export default function AdminMobileBar() {
  const pathname = usePathname() ?? "";

  const pageName = Object.entries(PAGE_NAMES)
    .reverse()
    .find(([key]) => pathname.startsWith(key))?.[1] ?? "";

  const openDrawer = () => {
    if (typeof window !== "undefined" && (window as any).__adminOpenSidebar) {
      (window as any).__adminOpenSidebar();
    }
  };

  return (
    <div className="flex md:hidden items-center justify-between px-4 py-3 bg-white border-b border-[#f3f4f6] sticky top-0 z-40 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
      <div>
        <p className="text-[9px] font-bold uppercase tracking-[3px] text-[#c9a96e]">NishMee</p>
        <h1 className="text-[20px] font-black text-[#111827] leading-none">Admin</h1>
      </div>
      <span className="flex-1 text-center text-[13px] font-semibold text-[#6b7280]">
        {pageName}
      </span>
      <button
        onClick={openDrawer}
        aria-label="Open menu"
        className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f3f4f6] text-[#111827] text-[20px] transition hover:bg-[#111827] hover:text-white"
      >
        <FiMenu />
      </button>
    </div>
  );
}