"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import {
  FiUsers, FiUserCheck, FiUserPlus, FiSearch,
  FiMoreVertical, FiMail, FiShoppingBag, FiEye,
  FiSlash, FiUserX, FiRefreshCcw, FiTrash2,
  FiAlertTriangle,
} from "react-icons/fi";

export default function AdminUsersPage() {
  const router = useRouter();

  const [usersData, setUsersData] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // CLOSE MENU ON OUTSIDE CLICK
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // FETCH USERS
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users", { cache: "no-store" });
      const data = await res.json();
      if (data.success) {
        const formattedUsers = data.users.map((user: any) => ({
          id: user._id,
          name: user.name || "Unknown User",
          email: user.email || "No Email",
          image: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || "User")}&background=111827&color=fff`,
          orders: user.orders || 0,
          spent: user.spent || 0,
          joined: new Date(user.createdAt).toLocaleDateString("en-GB", {
            day: "2-digit", month: "short", year: "numeric",
          }),
          status: user.status || "Active",
        }));
        setUsersData(formattedUsers);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  // FILTER USERS
  const filteredUsers = useMemo(() => {
    return usersData.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase());
      const matchesFilter =
        filter === "All" ? true :
        filter === "Blocked" ? user.status === "Blocked" :
        user.status === "Active";
      return matchesSearch && matchesFilter;
    });
  }, [search, filter, usersData]);

  // STATS
  const totalUsers = usersData.length;
  const activeUsers = usersData.filter((u) => u.status === "Active").length;
  const blockedUsers = usersData.filter((u) => u.status === "Blocked").length;
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const newUsers = usersData.filter((user) => {
    const d = new Date(user.joined);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  }).length;

  // BLOCK / UNBLOCK
  const handleBlockUser = async (id: string) => {
    try {
      const user = usersData.find((u) => u.id === id);
      const newStatus = user?.status === "Blocked" ? "Active" : "Blocked";
      const res = await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setUsersData((prev) =>
          prev.map((u) => u.id === id ? { ...u, status: newStatus } : u)
        );
      }
    } catch (error) {
      console.error("Failed to update user:", error);
    }
    setOpenMenuId(null);
  };

  // DELETE USER
  const handleDeleteUser = async (id: string) => {
    try {
      const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setUsersData((prev) => prev.filter((u) => u.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
    setDeleteConfirmId(null);
    setOpenMenuId(null);
  };

  return (
    <section className="min-h-screen bg-[#f5f7fb]">
      <div className="mx-auto max-w-6xl px-3 py-4 sm:px-4 sm:py-5 lg:px-6">

        {/* HEADER */}
        <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="mb-2 text-[9px] sm:text-[10px] font-bold uppercase tracking-[3px] text-[#c9a96e]">
              Admin Dashboard
            </p>
            <h1 className="text-[26px] leading-none sm:text-[34px] lg:text-[42px] font-black text-[#111827]">
              Users Management
            </h1>
            <p className="mt-2 max-w-xl text-[12px] sm:text-[13px] leading-6 text-[#6b7280]">
              Monitor registered users, manage customer access and track user activity.
            </p>
          </div>
        </div>

        {/* STATS */}
        <div className="mb-5 grid grid-cols-2 gap-3 xl:grid-cols-4">
          {[
            { label: "Total Users", value: totalUsers, icon: <FiUsers /> },
            { label: "Active Users", value: activeUsers, icon: <FiUserCheck /> },
            { label: "Blocked Users", value: blockedUsers, icon: <FiSlash /> },
            { label: "New This Month", value: newUsers, icon: <FiUserPlus /> },
          ].map(({ label, value, icon }) => (
            <div key={label} className="rounded-2xl bg-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[12px] font-medium text-[#6b7280]">{label}</p>
                  <h2 className="mt-2 text-[24px] sm:text-[28px] font-black text-[#111827]">{value}</h2>
                </div>
                <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-[#f3f4f6] text-[20px] text-[#111827]">
                  {icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* USERS SECTION */}
        <div className="rounded-2xl bg-white p-4 sm:p-5 shadow-[0_10px_40px_rgba(0,0,0,0.05)]">

          {/* TOP BAR */}
          <div className="mb-4 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h2 className="text-[20px] sm:text-[24px] font-black text-[#111827]">All Users</h2>
              <p className="mt-1 text-[12px] text-[#6b7280]">{filteredUsers.length} users found</p>
            </div>
            <div className="flex flex-col gap-3 lg:flex-row">
              <div className="relative w-full lg:w-[240px]">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[14px] text-[#9ca3af]" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-[42px] w-full rounded-full border border-[#e5e7eb] bg-[#fafafa] pl-10 pr-4 text-[13px] outline-none focus:border-[#111827]"
                />
              </div>
              <div className="flex gap-2">
                {["All", "Active", "Blocked"].map((item) => (
                  <button
                    key={item}
                    onClick={() => setFilter(item)}
                    className={`h-[38px] whitespace-nowrap rounded-full px-4 text-[12px] font-semibold transition-all duration-200 ${filter === item ? "bg-[#111827] text-white" : "bg-[#f3f4f6] text-[#6b7280]"}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* EMPTY */}
          {filteredUsers.length === 0 && (
            <div className="flex flex-col items-center justify-center py-14 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#f3f4f6] text-[24px] text-[#9ca3af]">
                <FiUserX />
              </div>
              <h3 className="text-[20px] font-black text-[#111827]">No Users Found</h3>
              <p className="mt-2 text-[13px] text-[#6b7280]">Try another search or filter.</p>
            </div>
          )}

          {/* USERS GRID */}
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="rounded-2xl border border-[#eef0f3] bg-[#fcfcfc] p-3 sm:p-4 transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_10px_25px_rgba(0,0,0,0.05)]"
              >
                <div className="flex flex-col gap-3">

                  {/* TOP */}
                  <div className="flex items-start justify-between gap-3">

                    {/* LEFT */}
                    <div className="flex min-w-0 flex-1 items-start gap-3">
                      <div className="relative h-[56px] w-[56px] shrink-0 overflow-hidden rounded-xl bg-[#f3f4f6]">
                        <Image src={user.image} alt={user.name} fill className="object-cover" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="truncate text-[16px] sm:text-[18px] font-black text-[#111827]">
                          {user.name}
                        </h3>
                        <div className="mt-1.5 flex items-center gap-2 text-[12px] text-[#6b7280]">
                          <FiMail className="shrink-0" />
                          <p className="truncate">{user.email}</p>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          <span className="rounded-full bg-[#f3f4f6] px-2.5 py-1 text-[10px] font-semibold text-[#111827]">
                            Joined {user.joined}
                          </span>
                          <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${user.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"}`}>
                            {user.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="flex flex-wrap gap-2">

                      {/* 3 DOTS */}
                      <div className="relative" ref={openMenuId === user.id ? menuRef : null}>
                        <button
                          onClick={() => setOpenMenuId(openMenuId === user.id ? null : user.id)}
                          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#dbe1ea] bg-white text-[#111827] hover:bg-[#f3f4f6] transition-all"
                        >
                          <FiMoreVertical />
                        </button>

                        {openMenuId === user.id && (
                          <div className="absolute right-0 top-11 z-50 w-[200px] overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.12)]">

                            <button
                              onClick={() => { router.push(`/admin/users/${user.id}`); setOpenMenuId(null); }}
                              className="flex w-full items-center gap-3 px-4 py-3 text-[13px] font-medium text-[#111827] hover:bg-[#f3f4f6] transition-colors"
                            >
                              <FiEye className="text-[15px] text-[#6b7280]" />
                              View Profile
                            </button>

                            <button
                              onClick={() => handleBlockUser(user.id)}
                              className="flex w-full items-center gap-3 px-4 py-3 text-[13px] font-medium text-[#111827] hover:bg-[#f3f4f6] transition-colors"
                            >
                              {user.status === "Blocked"
                                ? <><FiRefreshCcw className="text-[15px] text-emerald-500" /> Unblock User</>
                                : <><FiSlash className="text-[15px] text-orange-500" /> Block User</>
                              }
                            </button>

                            <div className="h-px bg-[#f3f4f6]" />

                            <button
                              onClick={() => { setDeleteConfirmId(user.id); setOpenMenuId(null); }}
                              className="flex w-full items-center gap-3 px-4 py-3 text-[13px] font-medium text-red-600 hover:bg-red-50 transition-colors"
                            >
                              <FiTrash2 className="text-[15px]" />
                              Delete User
                            </button>

                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* BOTTOM STATS */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="rounded-xl bg-white p-3">
                      <p className="text-[10px] font-medium uppercase tracking-[1px] text-[#9ca3af]">Orders</p>
                      <div className="mt-1.5 flex items-center gap-1.5">
                        <FiShoppingBag className="text-[14px] text-[#111827]" />
                        <h4 className="text-[16px] font-black text-[#111827]">{user.orders}</h4>
                      </div>
                    </div>
                    <div className="rounded-xl bg-white p-3">
                      <p className="text-[10px] font-medium uppercase tracking-[1px] text-[#9ca3af]">Spent</p>
                      <h4 className="mt-1.5 text-[16px] font-black text-[#111827]">₹{Number(user.spent).toLocaleString()}</h4>
                    </div>
                    <div className="rounded-xl bg-white p-3">
                      <p className="text-[10px] font-medium uppercase tracking-[1px] text-[#9ca3af]">Status</p>
                      <h4 className="mt-1.5 text-[16px] font-black text-[#111827]">{user.status}</h4>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* DELETE CONFIRM MODAL */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-[24px] bg-white p-6 shadow-2xl">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-500 text-[24px]">
              <FiAlertTriangle />
            </div>
            <h2 className="text-[22px] font-black text-[#111827]">Delete User?</h2>
            <p className="mt-2 text-[14px] text-[#6b7280]">
              This action cannot be undone. User data will be permanently removed.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex h-[48px] flex-1 items-center justify-center rounded-full border border-[#e5e7eb] text-[14px] font-semibold text-[#111827]"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteUser(deleteConfirmId)}
                className="flex h-[48px] flex-1 items-center justify-center rounded-full bg-red-500 text-[14px] font-bold text-white hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}