"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import {
  FiMail,
  FiLock,
  FiArrowRight,
  FiEye,
  FiEyeOff,
  FiShield,
  FiArrowLeft,
} from "react-icons/fi";

import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [step, setStep] = useState<"email" | "reset">("email");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const startResendCooldown = () => {
    setResendCooldown(30);
    const interval = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // STEP 1 — SEND OTP
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Enter valid email");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!data.success) {
        setEmailError(data.message);
        return;
      }

      setStep("reset");
      startResendCooldown();
    } catch (error) {
      console.log(error);
      setEmailError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendCooldown > 0) return;
    try {
      setLoading(true);
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!data.success) {
        alert(data.message);
        return;
      }
      startResendCooldown();
    } finally {
      setLoading(false);
    }
  };

  // STEP 2 — VERIFY OTP + RESET PASSWORD
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      setOtpError("Enter complete 6-digit OTP");
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: otpValue, newPassword }),
      });

      const data = await res.json();

      if (!data.success) {
        if (data.message?.toLowerCase().includes("otp")) {
          setOtpError(data.message);
        } else {
          setPasswordError(data.message);
        }
        return;
      }

      alert("Password reset successful! Please login with your new password.");
      router.push("/login");
    } catch (error) {
      console.log(error);
      setOtpError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setOtpError("");

    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  return (
    <>
      <section className="min-h-screen overflow-hidden bg-[#f8f5f0]">
        <div className="mx-auto flex min-h-screen max-w-[560px] items-center px-4 pb-16 pt-[110px] sm:px-6 lg:px-8 lg:pb-20">

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative w-full overflow-hidden rounded-[28px] bg-white p-6 shadow-[0_15px_50px_rgba(0,0,0,0.06)] sm:rounded-[36px] sm:p-8 md:p-10"
          >
            <div className="absolute -right-16 -top-16 h-[180px] w-[180px] rounded-full bg-[#f3e4d1] opacity-40 blur-3xl" />

            <div className="relative z-10">

              <Link
                href="/login"
                className="mb-6 inline-flex items-center gap-2 text-[13px] font-semibold text-gray-500 hover:text-black transition sm:mb-7"
              >
                <FiArrowLeft className="text-sm" />
                Back to Login
              </Link>

              {step === "email" ? (
                <>
                  <div className="mb-8 sm:mb-9">
                    <h2 className="mb-2 text-[28px] font-black text-[#111827] sm:text-[36px]">
                      Forgot Password?
                    </h2>
                    <p className="text-[14px] text-gray-500 sm:text-[15px]">
                      Enter your email, we'll send you a code to reset it.
                    </p>
                  </div>

                  <form onSubmit={handleSendOtp} className="flex flex-col gap-5">
                    <div>
                      <label className="mb-2.5 block text-[13px] font-semibold text-[#111827] sm:text-[14px]">
                        Email Address
                      </label>
                      <div
                        className={`flex h-[56px] items-center gap-3 rounded-[16px] border bg-[#f8f5f0] px-4 transition sm:h-[60px] sm:rounded-[18px] sm:px-5 ${
                          emailError ? "border-red-400" : "border-transparent focus-within:border-black"
                        }`}
                      >
                        <FiMail className="shrink-0 text-[18px] text-gray-400" />
                        <input
                          type="email"
                          placeholder="Enter your email"
                          className="w-full bg-transparent text-[14px] text-black outline-none placeholder:text-gray-400 sm:text-[15px]"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setEmailError("");
                          }}
                        />
                      </div>
                      {emailError && (
                        <p className="mt-1.5 text-[12px] font-medium text-red-500">{emailError}</p>
                      )}
                    </div>

                    <motion.button
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={loading}
                      className="mt-1 flex h-[56px] items-center justify-center gap-3 rounded-full bg-black text-[14px] font-semibold text-white transition-all duration-300 hover:bg-[#1f1f1f] disabled:opacity-60 sm:h-[60px] sm:text-[15px]"
                    >
                      {loading ? "Sending OTP..." : "Send Reset Code"}
                      {!loading && <FiArrowRight />}
                    </motion.button>
                  </form>
                </>
              ) : (
                <>
                  <div className="mb-8 sm:mb-9 text-center">
                    <div className="mx-auto mb-5 flex h-[56px] w-[56px] items-center justify-center rounded-full bg-[#f8f5f0] text-[#c9a96e]">
                      <FiShield className="text-[24px]" />
                    </div>
                    <h2 className="mb-2 text-[26px] font-black text-[#111827] sm:text-[32px]">
                      Reset Password
                    </h2>
                    <p className="text-sm text-gray-500 sm:text-[15px]">
                      Enter the code sent to <span className="font-semibold text-black">{email}</span>
                    </p>
                  </div>

                  <form onSubmit={handleResetPassword} className="flex flex-col gap-6">
                    <div className="flex justify-center gap-2 sm:gap-3">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          ref={(el) => {
                            otpRefs.current[index] = el;
                          }}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(index, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(index, e)}
                          className={`h-[52px] w-[42px] sm:h-[60px] sm:w-[48px] rounded-[14px] border-2 bg-[#f8f5f0] text-center text-[20px] font-bold text-black outline-none transition sm:rounded-[16px] ${
                            otpError ? "border-red-400" : "border-transparent focus:border-black"
                          }`}
                        />
                      ))}
                    </div>
                    {otpError && (
                      <p className="-mt-3 text-center text-[12px] font-medium text-red-500">{otpError}</p>
                    )}

                    <div>
                      <label className="mb-2.5 block text-[13px] font-semibold text-[#111827] sm:text-[14px]">
                        New Password
                      </label>
                      <div
                        className={`flex h-[56px] items-center gap-3 rounded-[16px] border bg-[#f8f5f0] px-4 transition sm:h-[60px] sm:px-5 ${
                          passwordError ? "border-red-400" : "border-transparent focus-within:border-black"
                        }`}
                      >
                        <FiLock className="shrink-0 text-[18px] text-gray-400" />
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter new password"
                          className="w-full bg-transparent text-[14px] text-black outline-none placeholder:text-gray-400 sm:text-[15px]"
                          value={newPassword}
                          onChange={(e) => {
                            setNewPassword(e.target.value);
                            setPasswordError("");
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                          className="shrink-0 text-gray-400 hover:text-black transition-colors duration-200"
                        >
                          {showPassword ? (
                            <FiEyeOff className="text-[18px]" />
                          ) : (
                            <FiEye className="text-[18px]" />
                          )}
                        </button>
                      </div>
                      {passwordError && (
                        <p className="mt-1.5 text-[12px] font-medium text-red-500">{passwordError}</p>
                      )}
                    </div>

                    <motion.button
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={loading}
                      className="flex h-[56px] items-center justify-center gap-3 rounded-full bg-black text-[14px] font-semibold text-white transition-all duration-300 hover:bg-[#1f1f1f] disabled:opacity-60 sm:h-[60px] sm:text-[15px]"
                    >
                      {loading ? "Resetting..." : "Reset Password"}
                      {!loading && <FiArrowRight />}
                    </motion.button>

                    <div className="flex items-center justify-between text-sm">
                      <button
                        type="button"
                        onClick={() => setStep("email")}
                        className="font-semibold text-gray-500 hover:text-black transition"
                      >
                        ← Change email
                      </button>

                      <button
                        type="button"
                        onClick={handleResendOtp}
                        disabled={resendCooldown > 0}
                        className="font-semibold text-black hover:text-[#c9a96e] transition disabled:text-gray-400 disabled:cursor-not-allowed"
                      >
                        {resendCooldown > 0 ? `Resend OTP (${resendCooldown}s)` : "Resend OTP"}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}