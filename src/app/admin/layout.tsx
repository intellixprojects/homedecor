"use client";

import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isLoginPage =
    pathname === "/admin/login";

  return (
    <div className="min-h-screen flex bg-[#f8f5f0]">

      {!isLoginPage && (
        <AdminSidebar />
      )}

      <div className="flex-1">
        {children}
      </div>

    </div>
  );
}