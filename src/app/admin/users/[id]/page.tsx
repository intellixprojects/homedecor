"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

import { useParams } from "next/navigation";

import {
  FiMail,
  FiShoppingBag,
  FiUser,
  FiCalendar,
  FiShield,
} from "react-icons/fi";

export default function UserDetailsPage() {
  const params = useParams();

  const [user, setUser] =
    useState<any>(null);

  useEffect(() => {
    const storedUsers =
      localStorage.getItem("users");

    if (storedUsers) {
      const parsedUsers =
        JSON.parse(storedUsers);

      const foundUser =
        parsedUsers.find(
          (u: any) =>
            String(u.id) ===
            String(params.id)
        );

      setUser(foundUser);
    }
  }, [params.id]);

  if (!user) {
    return (
      <section className="min-h-screen bg-[#f5f7fb] flex items-center justify-center p-6">
        <div className="rounded-[30px] bg-white p-10 text-center shadow-[0_10px_40px_rgba(0,0,0,0.05)]">
          <h2 className="text-[30px] font-black text-[#111827]">
            User Not Found
          </h2>

          <p className="mt-3 text-[#6b7280]">
            No user data available.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#f5f7fb]">
      <div className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8">

        {/* HEADER */}
        <div className="mb-6">

          <p className="mb-2 text-[10px] font-bold uppercase tracking-[3px] text-[#c9a96e]">
            User Details
          </p>

          <h1 className="text-[24px] sm:text-[32px] font-black leading-none text-[#111827]">
            Customer Profile
          </h1>

          <p className="mt-3 text-[14px] text-[#6b7280]">
            Detailed customer information
            and activity overview.
          </p>

        </div>

        {/* PROFILE CARD */}
        <div className="overflow-hidden rounded-[24px] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.05)]">

          {/* TOP */}
          <div className="relative h-[80px] sm:h-[100px] bg-[#111827]" />

          <div className="relative px-4 pb-5 sm:px-6 sm:pb-6">

            {/* IMAGE */}
            <div className="-mt-[45px] sm:-mt-[55px] relative h-[80px] w-[80px] sm:h-[100px] sm:w-[100px] overflow-hidden rounded-[30px] border-[6px] border-white bg-[#f3f4f6] shadow-xl">

              <Image
                src={
                  user.image ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    user.name
                  )}&background=111827&color=fff`
                }
                alt={user.name}
                fill
                className="object-cover"
              />

            </div>

            {/* USER INFO */}
            <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

              <div>

                <div className="flex flex-wrap items-center gap-3">

                  <h2 className="text-[32px] sm:text-[40px] font-black text-[#111827]">
                    {user.name}
                  </h2>

                  <span
                    className={`rounded-full px-4 py-2 text-[12px] font-bold ${
                      user.status ===
                      "Blocked"
                        ? "bg-red-100 text-red-600"
                        : "bg-emerald-100 text-emerald-700"
                    }`}
                  >
                    {user.status || "Active"}
                  </span>

                </div>

                <div className="mt-4 flex flex-col gap-3 text-[15px] text-[#6b7280]">

                  <div className="flex items-center gap-3">
                    <FiMail />

                    {user.email}
                  </div>

                  <div className="flex items-center gap-3">
                    <FiCalendar />

                    Joined {user.joined}
                  </div>

                  <div className="flex items-center gap-3">
                    <FiUser />

                    Customer ID: {user.id}
                  </div>

                </div>

              </div>

            </div>

            {/* STATS */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

              {/* CARD */}
              <div className="rounded-[24px] bg-[#f8fafc] p-5">

                <p className="text-[12px] font-medium uppercase tracking-[1px] text-[#9ca3af]">
                  Orders
                </p>

                <div className="mt-3 flex items-center gap-3">

                  <FiShoppingBag className="text-[22px] text-[#111827]" />

                  <h3 className="text-[30px] font-black text-[#111827]">
                    {user.orders || 0}
                  </h3>

                </div>

              </div>

              {/* CARD */}
              <div className="rounded-[24px] bg-[#f8fafc] p-5">

                <p className="text-[12px] font-medium uppercase tracking-[1px] text-[#9ca3af]">
                  Total Spent
                </p>

                <h3 className="mt-3 text-[30px] font-black text-[#111827]">
                  ₹
                  {Number(
                    user.spent || 0
                  ).toLocaleString()}
                </h3>

              </div>

              {/* CARD */}
              <div className="rounded-[24px] bg-[#f8fafc] p-5">

                <p className="text-[12px] font-medium uppercase tracking-[1px] text-[#9ca3af]">
                  Account Status
                </p>

                <h3 className="mt-3 text-[26px] font-black text-[#111827]">
                  {user.status || "Active"}
                </h3>

              </div>

              {/* CARD */}
              <div className="rounded-[24px] bg-[#f8fafc] p-5">

                <p className="text-[12px] font-medium uppercase tracking-[1px] text-[#9ca3af]">
                  Security
                </p>

                <div className="mt-3 flex items-center gap-3">

                  <FiShield className="text-[22px] text-[#111827]" />

                  <h3 className="text-[24px] font-black text-[#111827]">
                    Verified
                  </h3>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}