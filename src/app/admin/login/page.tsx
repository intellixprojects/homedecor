"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiMail, FiLock, FiAlertCircle } from "react-icons/fi";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    if (!email || !password) { setError("Please fill in all fields"); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    if (email === "admin@nishmee.com" && password === "admin123") {
      localStorage.setItem("isAdmin", "true");
      router.push("/admin");
    } else {
      setError("Invalid email or password");
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-[#f8f5f0] p-4">
      <div className="w-full max-w-[400px]">

        {/* Brand logo */}
        <div className="mb-8 flex flex-col items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-[20px] bg-[#111827] mb-4">
            <span className="text-[22px] font-black text-[#c9a96e]">N</span>
          </div>
          <p className="text-[11px] font-bold uppercase tracking-[4px] text-[#c9a96e]">NishMee</p>
          <h1 className="text-[28px] font-black text-[#111827] leading-tight">Admin Login</h1>
        </div>

        {/* Card */}
        <div className="rounded-[28px] bg-white p-7 shadow-sm border border-[#f0ece6]">

          <div className="flex flex-col gap-3">

            {/* Email */}
            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9ca3af] text-[17px] pointer-events-none" />
              <input
                type="email"
                placeholder="Admin email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                onKeyDown={handleKeyDown}
                className="h-[54px] w-full rounded-2xl bg-[#f8f5f0] pl-11 pr-4 text-[14px] text-[#111827] placeholder:text-[#9ca3af] outline-none focus:ring-2 focus:ring-[#c9a96e]/30 transition-all"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9ca3af] text-[17px] pointer-events-none" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                onKeyDown={handleKeyDown}
                className="h-[54px] w-full rounded-2xl bg-[#f8f5f0] pl-11 pr-4 text-[14px] text-[#111827] placeholder:text-[#9ca3af] outline-none focus:ring-2 focus:ring-[#c9a96e]/30 transition-all"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 rounded-xl bg-red-50 border border-red-100 px-4 py-2.5">
                <FiAlertCircle className="text-red-500 text-[15px] flex-shrink-0" />
                <p className="text-[13px] font-semibold text-red-600">{error}</p>
              </div>
            )}

            {/* Button */}
            <button
              onClick={handleLogin}
              disabled={loading}
              className="mt-1 flex h-[54px] w-full items-center justify-center gap-2 rounded-2xl bg-[#111827] font-bold text-[14px] text-white transition-all hover:bg-[#1f2937] active:scale-[0.98] disabled:opacity-70"
            >
              {loading ? (
                <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
              ) : "Sign in"}
            </button>

          </div>
        </div>

        <p className="mt-5 text-center text-[12px] text-[#b0a99a]">
          Restricted access · NishMee Store
        </p>

      </div>
    </section>
  );
}