"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import {
  FiMail, FiShoppingBag, FiUser, FiCalendar,
  FiShield, FiArrowLeft, FiPhone, FiMapPin,
  FiSlash, FiRefreshCcw, FiTrash2, FiAlertTriangle,
} from "react-icons/fi";

export default function UserDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params?.id as string;

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/users/${userId}`, { cache: "no-store" });
        const data = await res.json();
        if (data.success) {
          setUser(data.user);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleBlockUser = async () => {
    const newStatus = user.status === "Blocked" ? "Active" : "Blocked";
    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) setUser({ ...user, status: newStatus });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`/api/users/${userId}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) router.push("/admin/users");
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <section className="min-h-screen bg-[#f5f7fb] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-[#111827] border-t-transparent rounded-full animate-spin" />
      </section>
    );
  }

  if (!user) {
    return (
      <section className="min-h-screen bg-[#f5f7fb] flex items-center justify-center p-6">
        <div className="rounded-[30px] bg-white p-10 text-center shadow-[0_10px_40px_rgba(0,0,0,0.05)]">
          <h2 className="text-[30px] font-black text-[#111827]">User Not Found</h2>
          <p className="mt-3 text-[#6b7280]">No user data available.</p>
          <Link
            href="/admin/users"
            className="mt-6 inline-flex h-[48px] items-center gap-2 rounded-full bg-[#111827] px-6 text-[14px] font-semibold text-white"
          >
            <FiArrowLeft /> Back to Users
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#f5f7fb]">
      <div className="mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">

        {/* BACK */}
        <button
          onClick={() => router.push("/admin/users")}
          className="mb-6 flex items-center gap-2 text-[13px] font-semibold text-[#6b7280] hover:text-[#111827] transition-colors"
        >
          <FiArrowLeft />
          Back to Users
        </button>

        {/* HEADER */}
        <div className="mb-6">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[3px] text-[#c9a96e]">
            User Details
          </p>
          <h1 className="text-[24px] sm:text-[32px] font-black leading-none text-[#111827]">
            Customer Profile
          </h1>
        </div>

        {/* PROFILE CARD */}
        <div className="overflow-hidden rounded-[24px] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.05)] mb-5">

          {/* BANNER */}
          <div className="relative h-[80px] sm:h-[100px] bg-[#111827]" />

          <div className="relative px-4 pb-6 sm:px-6">

            {/* AVATAR */}
            <div className="-mt-[45px] sm:-mt-[55px] relative h-[80px] w-[80px] sm:h-[100px] sm:w-[100px] overflow-hidden rounded-[30px] border-[6px] border-white bg-[#f3f4f6] shadow-xl">
              <Image
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=111827&color=fff&size=200`}
                alt={user.name}
                fill
                className="object-cover"
              />
            </div>

            {/* NAME + STATUS + ACTIONS */}
            <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-[28px] sm:text-[36px] font-black text-[#111827]">
                    {user.name}
                  </h2>
                  <span className={`rounded-full px-4 py-2 text-[12px] font-bold ${user.status === "Blocked" ? "bg-red-100 text-red-600" : "bg-emerald-100 text-emerald-700"}`}>
                    {user.status || "Active"}
                  </span>
                </div>

                {/* INFO */}
                <div className="mt-4 flex flex-col gap-3 text-[14px] text-[#6b7280]">
                  <div className="flex items-center gap-3">
                    <FiMail className="shrink-0 text-[#c9a96e]" />
                    {user.email}
                  </div>
                  {user.phone && (
                    <div className="flex items-center gap-3">
                      <FiPhone className="shrink-0 text-[#c9a96e]" />
                      {user.phone}
                    </div>
                  )}
                  {(user.address || user.city) && (
                    <div className="flex items-center gap-3">
                      <FiMapPin className="shrink-0 text-[#c9a96e]" />
                      {[user.address, user.city, user.state, user.zip].filter(Boolean).join(", ")}
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <FiCalendar className="shrink-0 text-[#c9a96e]" />
                    Joined {new Date(user.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit", month: "short", year: "numeric"
                    })}
                  </div>
                  <div className="flex items-center gap-3">
                    <FiUser className="shrink-0 text-[#c9a96e]" />
                    ID: {user._id}
                  </div>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleBlockUser}
                  className={`flex h-[44px] items-center gap-2 rounded-full px-5 text-[13px] font-semibold text-white transition-all ${user.status === "Blocked" ? "bg-emerald-500 hover:bg-emerald-600" : "bg-orange-500 hover:bg-orange-600"}`}
                >
                  {user.status === "Blocked"
                    ? <><FiRefreshCcw /> Unblock</>
                    : <><FiSlash /> Block User</>
                  }
                </button>
                <button
                  onClick={() => setDeleteConfirm(true)}
                  className="flex h-[44px] items-center gap-2 rounded-full bg-red-500 px-5 text-[13px] font-semibold text-white hover:bg-red-600 transition-all"
                >
                  <FiTrash2 /> Delete
                </button>
              </div>
            </div>

            {/* STATS */}
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { label: "Orders", value: user.orders || 0, icon: <FiShoppingBag /> },
                { label: "Total Spent", value: `₹${Number(user.spent || 0).toLocaleString()}`, icon: null },
                { label: "Account Status", value: user.status || "Active", icon: null },
                { label: "Security", value: "Verified", icon: <FiShield /> },
              ].map(({ label, value, icon }) => (
                <div key={label} className="rounded-[20px] bg-[#f8fafc] p-5">
                  <p className="text-[11px] font-medium uppercase tracking-[1px] text-[#9ca3af]">{label}</p>
                  <div className="mt-3 flex items-center gap-2">
                    {icon && <span className="text-[20px] text-[#111827]">{icon}</span>}
                    <h3 className="text-[22px] font-black text-[#111827]">{value}</h3>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>

      {/* DELETE CONFIRM MODAL */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-[24px] bg-white p-6 shadow-2xl">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-500 text-[24px]">
              <FiAlertTriangle />
            </div>
            <h2 className="text-[22px] font-black text-[#111827]">Delete User?</h2>
            <p className="mt-2 text-[14px] text-[#6b7280]">
              This will permanently delete <strong>{user.name}</strong> and all their data.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setDeleteConfirm(false)}
                className="flex h-[48px] flex-1 items-center justify-center rounded-full border border-[#e5e7eb] text-[14px] font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteUser}
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