"use client";

import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminMobileBar from "@/components/admin/AdminMobileBar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  return (
    <div className="min-h-screen bg-[#f8f5f0]">
      {!isLoginPage && <AdminMobileBar />}

      <div className="flex min-h-screen">
        {!isLoginPage && <AdminSidebar />}
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}