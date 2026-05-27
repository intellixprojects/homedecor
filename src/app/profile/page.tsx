"use client";

import Link from "next/link";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import {
  FiUser,
  FiMail,
  FiCalendar,
  FiPhone,
  FiEdit2,
  FiSave,
  FiX,
  FiLogOut,
} from "react-icons/fi";

import { RootState } from "@/store/store";
import { logout } from "@/store/features/authSlice";
import { clearCartState } from "@/store/features/cartSlice";
import { clearWishlistState } from "@/store/features/wishlistSlice";

import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

interface ProfileForm {
  name: string;
  email: string;
  phone: string;
  dob: string;
}

export default function ProfilePage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { currentUser } = useSelector((state: RootState) => state.auth);

  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState<ProfileForm>({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    phone: currentUser?.phone || "",
    dob: currentUser?.dob || "",
  });

  const [saved, setSaved] = useState<ProfileForm>({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    phone: currentUser?.phone || "",
    dob: currentUser?.dob || "",
  });

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCartState());
    dispatch(clearWishlistState());
    router.push("/");
  };

  const handleSave = async () => {
    setSaving(true);
    // TODO: dispatch update action / API call here
    await new Promise((r) => setTimeout(r, 600)); // simulate save
    setSaved(form);
    setSaving(false);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setForm(saved);
    setIsEditing(false);
  };

  if (!currentUser) {
    return (
      <>
        <Navbar />
        <section className="min-h-screen bg-[#f8f5f0] flex items-center justify-center px-5">
          <div className="bg-white w-full max-w-md text-center rounded-[30px] px-8 py-14">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#f8f5f0]">
              <FiUser className="text-[36px] text-[#111827]" />
            </div>
            <h1 className="text-3xl font-black text-[#111827] mb-3">
              Please Login
            </h1>
            <p className="text-gray-500 mb-8 text-[15px]">
              Login to access your profile.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center justify-center h-[52px] px-8 rounded-full bg-black text-white text-[15px] font-semibold transition hover:bg-[#c9a96e]"
            >
              Login Now
            </Link>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  const initials = saved.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const fields = [
    {
      key: "name" as keyof ProfileForm,
      label: "Full Name",
      icon: FiUser,
      type: "text",
      placeholder: "Enter your full name",
    },
    {
      key: "email" as keyof ProfileForm,
      label: "Email Address",
      icon: FiMail,
      type: "email",
      placeholder: "Enter your email",
    },
    {
      key: "phone" as keyof ProfileForm,
      label: "Mobile Number",
      icon: FiPhone,
      type: "tel",
      placeholder: "Enter your mobile number",
    },
    {
      key: "dob" as keyof ProfileForm,
      label: "Date of Birth",
      icon: FiCalendar,
      type: "date",
      placeholder: "",
    },
  ];

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-[#f8f5f0] pt-28 pb-20 px-4 sm:px-6">
        <div className="max-w-xl mx-auto space-y-4">

          {/* PROFILE CARD */}
          <div className="bg-white rounded-3xl p-6 sm:p-8">

            {/* HEADER ROW */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#111827] text-white text-xl font-bold uppercase">
                  {initials}
                </div>
                <div>
                  <h1 className="text-[18px] font-black text-[#111827] leading-tight">
                    {saved.name}
                  </h1>
                  <p className="text-[12px] text-gray-400 mt-0.5 truncate max-w-[180px] sm:max-w-xs">
                    {saved.email}
                  </p>
                  <span className="mt-1.5 inline-flex items-center rounded-full border border-green-200 bg-green-50 px-3 py-0.5 text-[11px] font-medium text-green-700">
                    Active Member
                  </span>
                </div>
              </div>

              {/* EDIT / CANCEL BUTTON */}
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-[13px] font-semibold text-[#111827] transition hover:bg-[#f8f5f0] hover:border-[#c9a96e] hover:text-[#c9a96e]"
                >
                  <FiEdit2 className="text-[13px]" />
                  Edit
                </button>
              ) : (
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-[13px] font-semibold text-gray-500 transition hover:bg-[#f8f5f0]"
                >
                  <FiX className="text-[13px]" />
                  Cancel
                </button>
              )}
            </div>

            {/* FIELDS */}
            <div className="divide-y divide-[#f5f0ea] border-t border-[#f5f0ea]">
              {fields.map(({ key, label, icon: Icon, type, placeholder }) => (
                <div key={key} className="flex items-center gap-3 py-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#f8f5f0] text-gray-400">
                    <Icon className="text-[15px]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] text-gray-400 mb-0.5">{label}</p>
                    {isEditing ? (
                      <input
                        type={type}
                        value={form[key]}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            [key]: e.target.value,
                          }))
                        }
                        placeholder={placeholder}
                        className="w-full rounded-xl border border-gray-200 bg-[#f8f5f0] px-3 py-2 text-[14px] font-semibold text-[#111827] outline-none focus:border-[#c9a96e] focus:ring-1 focus:ring-[#c9a96e] transition placeholder:text-gray-300"
                      />
                    ) : (
                      <p className="text-[14px] font-semibold text-[#111827] truncate">
                        {key === "dob" && form[key]
                          ? new Date(form[key]).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })
                          : form[key] || (
                              <span className="text-gray-300 font-normal">
                                Not added
                              </span>
                            )}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* SAVE BUTTON */}
            {isEditing && (
              <button
                onClick={handleSave}
                disabled={saving}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-black py-3.5 text-[15px] font-semibold text-white transition hover:bg-[#c9a96e] disabled:opacity-60"
              >
                {saving ? (
                  <>
                    <svg
                      className="h-4 w-4 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      />
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <FiSave className="text-[16px]" />
                    Save Changes
                  </>
                )}
              </button>
            )}
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}