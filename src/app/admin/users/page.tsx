"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import Image from "next/image";

import {
  FiUsers,
  FiUserCheck,
  FiUserPlus,
  FiSearch,
  FiMoreVertical,
  FiMail,
  FiShoppingBag,
  FiEye,
  FiSlash,
  FiUserX,
  FiRefreshCcw,
} from "react-icons/fi";

export default function AdminUsersPage() {
  const router = useRouter();

  const [usersData, setUsersData] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  // LOAD USERS
  useEffect(() => {
    const storedUsers = localStorage.getItem("users");

    if (storedUsers) {
      const parsedUsers = JSON.parse(storedUsers);

      const formattedUsers = parsedUsers.map(
        (user: any, index: number) => ({
          id: user.id || Date.now() + index,

          name: user.name || "Unknown User",

          email: user.email || "No Email",

          image:
            user.image ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              user.name || "User"
            )}&background=111827&color=fff`,

          orders: user.orders || 0,

          spent: user.spent || 0,

          joined:
            user.joined ||
            new Date().toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }),

          status: user.status || "Active",
        })
      );

      setUsersData(formattedUsers);
    }
  }, []);

  // FILTER USERS
  const filteredUsers = useMemo(() => {
    return usersData.filter((user) => {
      const matchesSearch =
        user.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        user.email
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesFilter =
        filter === "All"
          ? true
          : filter === "Blocked"
          ? user.status === "Blocked"
          : user.status === "Active";

      return matchesSearch && matchesFilter;
    });
  }, [search, filter, usersData]);

  // STATS
  const totalUsers = usersData.length;

  const activeUsers = usersData.filter(
    (u) => u.status === "Active"
  ).length;

  const blockedUsers = usersData.filter(
    (u) => u.status === "Blocked"
  ).length;

  const currentMonth = new Date().getMonth();

  const currentYear = new Date().getFullYear();

  const newUsers = usersData.filter((user) => {
    const joinedDate = new Date(user.joined);

    return (
      joinedDate.getMonth() === currentMonth &&
      joinedDate.getFullYear() === currentYear
    );
  }).length;

  // BLOCK USER
  const handleBlockUser = (id: number) => {
    const updatedUsers = usersData.map((user) =>
      user.id === id
        ? {
            ...user,
            status:
              user.status === "Blocked"
                ? "Active"
                : "Blocked",
          }
        : user
    );

    setUsersData(updatedUsers);

    localStorage.setItem(
      "users",
      JSON.stringify(updatedUsers)
    );
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
              Monitor registered users,
              manage customer access and
              track user activity from one
              dashboard.
            </p>

          </div>

        </div>

        {/* STATS */}
        <div className="mb-5 grid grid-cols-2 gap-3 xl:grid-cols-4">

          {/* CARD */}
          <div className="rounded-2xl bg-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">

            <div className="flex items-start justify-between">

              <div>

                <p className="text-[12px] font-medium text-[#6b7280]">
                  Total Users
                </p>

                <h2 className="mt-2 text-[24px] sm:text-[28px] font-black text-[#111827]">
                  {totalUsers}
                </h2>

              </div>

              <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-[#f3f4f6] text-[20px] text-[#111827]">
                <FiUsers />
              </div>

            </div>

          </div>

          {/* CARD */}
          <div className="rounded-2xl bg-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">

            <div className="flex items-start justify-between">

              <div>

                <p className="text-[12px] font-medium text-[#6b7280]">
                  Active Users
                </p>

                <h2 className="mt-2 text-[24px] sm:text-[28px] font-black text-[#111827]">
                  {activeUsers}
                </h2>

              </div>

              <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-[#f3f4f6] text-[20px] text-[#111827]">
                <FiUserCheck />
              </div>

            </div>

          </div>

          {/* CARD */}
          <div className="rounded-2xl bg-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">

            <div className="flex items-start justify-between">

              <div>

                <p className="text-[12px] font-medium text-[#6b7280]">
                  Blocked Users
                </p>

                <h2 className="mt-2 text-[24px] sm:text-[28px] font-black text-[#111827]">
                  {blockedUsers}
                </h2>

              </div>

              <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-[#f3f4f6] text-[20px] text-[#111827]">
                <FiSlash />
              </div>

            </div>

          </div>

          {/* CARD */}
          <div className="rounded-2xl bg-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">

            <div className="flex items-start justify-between">

              <div>

                <p className="text-[12px] font-medium text-[#6b7280]">
                  New This Month
                </p>

                <h2 className="mt-2 text-[24px] sm:text-[28px] font-black text-[#111827]">
                  {newUsers}
                </h2>

              </div>

              <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-[#f3f4f6] text-[20px] text-[#111827]">
                <FiUserPlus />
              </div>

            </div>

          </div>

        </div>

        {/* USERS SECTION */}
        <div className="rounded-2xl bg-white p-4 sm:p-5 shadow-[0_10px_40px_rgba(0,0,0,0.05)]">

          {/* TOP */}
          <div className="mb-4 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">

            <div>

              <h2 className="text-[20px] sm:text-[24px] font-black text-[#111827]">
                All Users
              </h2>

              <p className="mt-1 text-[12px] text-[#6b7280]">
                {filteredUsers.length} users
                found
              </p>

            </div>

            <div className="flex flex-col gap-3 lg:flex-row">

              {/* SEARCH */}
              <div className="relative w-full lg:w-[240px]">

                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[14px] text-[#9ca3af]" />

                <input
                  type="text"
                  placeholder="Search users..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  className="h-[42px] w-full rounded-full border border-[#e5e7eb] bg-[#fafafa] pl-10 pr-4 text-[13px] outline-none transition-all duration-200 focus:border-[#111827]"
                />

              </div>

              {/* FILTERS */}
              <div className="flex gap-2 overflow-x-auto pb-1">

                {[
                  "All",
                  "Active",
                  "Blocked",
                ].map((item) => (
                  <button
                    key={item}
                    onClick={() =>
                      setFilter(item)
                    }
                    className={`h-[38px] whitespace-nowrap rounded-full px-4 text-[12px] font-semibold transition-all duration-200 ${
                      filter === item
                        ? "bg-[#111827] text-white"
                        : "bg-[#f3f4f6] text-[#6b7280]"
                    }`}
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

              <h3 className="text-[20px] font-black text-[#111827]">
                No Users Found
              </h3>

              <p className="mt-2 text-[13px] text-[#6b7280]">
                Try another search or filter.
              </p>

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
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">

                    {/* LEFT */}
                    <div className="flex min-w-0 items-start gap-3">

                      <div className="relative h-[56px] w-[56px] shrink-0 overflow-hidden rounded-xl bg-[#f3f4f6]">

                        <Image
                          src={user.image}
                          alt={user.name}
                          fill
                          className="object-cover"
                        />

                      </div>

                      <div className="min-w-0">

                        <h3 className="truncate text-[16px] sm:text-[18px] font-black text-[#111827]">
                          {user.name}
                        </h3>

                        <div className="mt-1.5 flex items-center gap-2 text-[12px] text-[#6b7280]">

                          <FiMail className="shrink-0" />

                          <p className="truncate">
                            {user.email}
                          </p>

                        </div>

                        <div className="mt-2 flex flex-wrap gap-2">

                          <span className="rounded-full bg-[#f3f4f6] px-2.5 py-1 text-[10px] font-semibold text-[#111827]">
                            Joined {user.joined}
                          </span>

                          <span
                            className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                              user.status ===
                              "Active"
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-red-100 text-red-600"
                            }`}
                          >
                            {user.status}
                          </span>

                        </div>

                      </div>

                    </div>

                    {/* ACTIONS */}
                    <div className="flex flex-wrap gap-2">

                      {/* VIEW BUTTON */}
                      <button
                        onClick={() =>
                          router.push(
                            `/admin/users/${user.id}`
                          )
                        }
                        className="flex h-9 items-center justify-center gap-2 rounded-full border border-[#dbe1ea] bg-white px-3 text-[12px] font-semibold text-[#111827] transition-all duration-300 hover:border-[#111827]"
                      >
                        <FiEye />

                        View
                      </button>

                      <button
                        onClick={() =>
                          handleBlockUser(
                            user.id
                          )
                        }
                        className={`flex h-9 items-center justify-center gap-2 rounded-full px-3 text-[12px] font-semibold text-white transition-all duration-300 ${
                          user.status ===
                          "Blocked"
                            ? "bg-emerald-500 hover:bg-emerald-600"
                            : "bg-red-500 hover:bg-red-600"
                        }`}
                      >

                        {user.status ===
                        "Blocked" ? (
                          <>
                            <FiRefreshCcw />
                            Unblock
                          </>
                        ) : (
                          <>
                            <FiSlash />
                            Block
                          </>
                        )}

                      </button>

                      <button className="flex h-9 w-9 items-center justify-center rounded-full border border-[#dbe1ea] bg-white text-[#111827]">
                        <FiMoreVertical />
                      </button>

                    </div>

                  </div>

                  {/* BOTTOM STATS */}
                  <div className="grid grid-cols-3 gap-2">

                    <div className="rounded-xl bg-white p-3">

                      <p className="text-[10px] font-medium uppercase tracking-[1px] text-[#9ca3af]">
                        Orders
                      </p>

                      <div className="mt-1.5 flex items-center gap-1.5">

                        <FiShoppingBag className="text-[14px] text-[#111827]" />

                        <h4 className="text-[16px] font-black text-[#111827]">
                          {user.orders}
                        </h4>

                      </div>

                    </div>

                    <div className="rounded-xl bg-white p-3">

                      <p className="text-[10px] font-medium uppercase tracking-[1px] text-[#9ca3af]">
                        Spent
                      </p>

                      <h4 className="mt-1.5 text-[16px] font-black text-[#111827]">
                        ₹
                        {Number(
                          user.spent
                        ).toLocaleString()}
                      </h4>

                    </div>

                    <div className="rounded-xl bg-white p-3">

                      <p className="text-[10px] font-medium uppercase tracking-[1px] text-[#9ca3af]">
                        Status
                      </p>

                      <h4 className="mt-1.5 text-[16px] font-black text-[#111827]">
                        {user.status}
                      </h4>

                    </div>

                  </div>

                </div>

              </div>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
}