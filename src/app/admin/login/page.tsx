"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

export default function AdminLoginPage() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {

    if (
      email === "admin@nishmee.com" &&
      password === "admin123"
    ) {

      localStorage.setItem("isAdmin", "true");

      router.push("/admin");

    } else {
      alert("Invalid Admin Credentials");
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-[#f8f5f0] p-4">

      <div className="w-full max-w-md rounded-[32px] bg-white p-8 shadow-sm">

        <p className="mb-3 text-[11px] font-bold uppercase tracking-[4px] text-[#c9a96e]">
          Admin Access
        </p>

        <h1 className="mb-8 text-[42px] font-black text-[#111827]">
          Login
        </h1>

        <div className="mb-5">

          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-[58px] w-full rounded-2xl bg-[#f8f5f0] px-5 outline-none"
          />

        </div>

        <div className="mb-7">

          <input
            type="password"
            placeholder="Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-[58px] w-full rounded-2xl bg-[#f8f5f0] px-5 outline-none"
          />

        </div>

        <button
          onClick={handleLogin}
          className="h-[58px] w-full rounded-full bg-black font-bold text-white"
        >
          Login
        </button>

      </div>

    </section>
  );
}