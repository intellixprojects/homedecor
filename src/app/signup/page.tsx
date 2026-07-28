"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import {
  FiUser,
  FiMail,
  FiLock,
  FiArrowRight,
  FiHeart,
  FiPhone,
  FiEye,
  FiEyeOff,
  FiShield,
} from "react-icons/fi";

import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [step, setStep] = useState<"form" | "otp">("form");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  // STEP 1 — VALIDATE + SEND OTP
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setPasswordError("Password must contain uppercase letter");
      return;
    }
    if (!/[0-9]/.test(password)) {
      setPasswordError("Password must contain number");
      return;
    }
    if (!/[!@#$%^&*]/.test(password)) {
      setPasswordError("Password must contain special character");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Enter valid email");
      return;
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      setPhoneError("Enter valid mobile number");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, phone }),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message);
        return;
      }

      setStep("otp");
      startResendCooldown();
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // STEP 2 — VERIFY OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      setOtpError("Enter complete 6-digit OTP");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: otpValue }),
      });

      const data = await res.json();

      if (!data.success) {
        setOtpError(data.message);
        return;
      }

      alert("Account created successfully!");
      router.push("/login");
    } catch (error) {
      console.log(error);
      setOtpError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendCooldown > 0) return;
    try {
      setLoading(true);
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, phone }),
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
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 pb-16 pt-[110px] sm:px-6 md:gap-14 lg:grid-cols-2 lg:gap-20 lg:px-8 lg:pb-20">

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[4px] text-[#c9a96e] sm:mb-5 sm:text-[12px]">
              Join NishMee
            </p>

            <h1 className="mb-5 text-[38px] font-black leading-[1.02] tracking-[-2px] text-[#111827] sm:text-[52px] md:text-[64px] lg:text-[72px]">
              Create Your
              <br />
              Luxury Account
            </h1>

            <p className="mx-auto mb-8 max-w-[580px] text-[15px] leading-8 text-gray-600 sm:mb-10 sm:text-[16px] lg:mx-0">
              Save your favorite handcrafted ceramic &
              marble decor, manage orders, build your
              wishlist, and enjoy a premium luxury
              shopping experience.
            </p>

            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:max-w-[540px]">
              {["Save Wishlist", "Track Orders", "Fast Checkout", "Premium Experience"].map(
                (item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 rounded-[18px] border border-[#ece7df] bg-white px-4 py-4 sm:px-5"
                  >
                    <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-[#f8f5f0] text-[#c9a96e]">
                      <FiHeart />
                    </div>
                    <p className="text-sm font-semibold text-[#111827]">{item}</p>
                  </motion.div>
                )
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto w-full max-w-[520px] rounded-[28px] bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.06)] sm:rounded-[34px] sm:p-8 md:p-10"
          >
            {step === "form" ? (
              <>
                <div className="mb-8 sm:mb-9">
                  <h2 className="mb-2 text-[30px] font-black text-[#111827] sm:mb-3 sm:text-[38px]">
                    Sign Up
                  </h2>
                  <p className="text-sm text-gray-500 sm:text-[15px]">
                    Create your account to continue shopping.
                  </p>
                </div>

                <form onSubmit={handleSendOtp} className="flex flex-col gap-5">
                  <div>
                    <label className="mb-2.5 block text-[13px] font-semibold text-[#111827] sm:text-[14px]">
                      Full Name
                    </label>
                    <div className="flex h-[56px] items-center gap-3 rounded-[16px] border border-transparent bg-[#f8f5f0] px-4 transition focus-within:border-black sm:h-[60px] sm:px-5">
                      <FiUser className="shrink-0 text-[18px] text-gray-400" />
                      <input
                        type="text"
                        placeholder="Enter your name"
                        className="w-full bg-transparent text-[14px] text-black outline-none placeholder:text-gray-400 sm:text-[15px]"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* EMAIL */}
                  <div>
                    <label className="mb-2.5 block text-[13px] font-semibold text-[#111827] sm:text-[14px]">
                      Email Address
                    </label>
                    <div
                      className={`flex h-[56px] items-center gap-3 rounded-[16px] border bg-[#f8f5f0] px-4 transition sm:h-[60px] sm:px-5 ${
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

                  {/* PASSWORD */}
                  <div>
                    <label className="mb-2.5 block text-[13px] font-semibold text-[#111827] sm:text-[14px]">
                      Password
                    </label>
                    <div
                      className={`flex h-[56px] items-center gap-3 rounded-[16px] border bg-[#f8f5f0] px-4 transition sm:h-[60px] sm:px-5 ${
                        passwordError ? "border-red-400" : "border-transparent focus-within:border-black"
                      }`}
                    >
                      <FiLock className="shrink-0 text-[18px] text-gray-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Create password"
                        className="w-full bg-transparent text-[14px] text-black outline-none placeholder:text-gray-400 sm:text-[15px]"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
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

                    {password.length > 0 && (
                      <div className="mt-2">
                        <div className="flex gap-1 mb-1.5">
                          {[
                            password.length >= 8,
                            /[A-Z]/.test(password),
                            /[0-9]/.test(password),
                            /[!@#$%^&*]/.test(password),
                          ].map((passed, i) => (
                            <div
                              key={i}
                              className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                                passed ? "bg-emerald-500" : "bg-[#e5e7eb]"
                              }`}
                            />
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-x-3 gap-y-1">
                          {[
                            { text: "8+ characters", passed: password.length >= 8 },
                            { text: "Uppercase", passed: /[A-Z]/.test(password) },
                            { text: "Number", passed: /[0-9]/.test(password) },
                            { text: "Special char", passed: /[!@#$%^&*]/.test(password) },
                          ].map(({ text, passed }) => (
                            <span
                              key={text}
                              className={`text-[11px] font-medium ${
                                passed ? "text-emerald-600" : "text-gray-400"
                              }`}
                            >
                              {passed ? "✓" : "○"} {text}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* PHONE */}
                  <div>
                    <label className="mb-2.5 block text-[13px] font-semibold text-[#111827] sm:text-[14px]">
                      Mobile Number
                    </label>
                    <div
                      className={`flex h-[56px] items-center gap-3 rounded-[16px] border bg-[#f8f5f0] px-4 transition sm:h-[60px] sm:px-5 ${
                        phoneError ? "border-red-400" : "border-transparent focus-within:border-black"
                      }`}
                    >
                      <FiPhone className="shrink-0 text-[18px] text-gray-400" />
                      <input
                        type="tel"
                        placeholder="Enter your mobile number"
                        maxLength={10}
                        className="w-full bg-transparent text-[14px] text-black outline-none placeholder:text-gray-400 sm:text-[15px]"
                        value={phone}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, "");
                          setPhone(val);
                          setPhoneError("");
                        }}
                      />
                    </div>
                    {phoneError && (
                      <p className="mt-1.5 text-[12px] font-medium text-red-500">{phoneError}</p>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="mt-2 flex h-[56px] items-center justify-center gap-3 rounded-full bg-black text-[14px] font-semibold text-white transition-all duration-300 hover:bg-[#1f1f1f] disabled:opacity-60 sm:h-[60px] sm:text-[15px]"
                  >
                    {loading ? "Sending OTP..." : "Create Account"}
                    {!loading && <FiArrowRight />}
                  </motion.button>
                </form>

                <div className="mt-6 text-center sm:mt-7">
                  <p className="text-sm text-gray-500 sm:text-[15px]">
                    Already have an account?{" "}
                    <Link href="/login" className="font-semibold text-black transition hover:text-[#c9a96e]">
                      Login
                    </Link>
                  </p>
                </div>
              </>
            ) : (
              <>
                {/* OTP STEP */}
                <div className="mb-8 sm:mb-9 text-center">
                  <div className="mx-auto mb-5 flex h-[56px] w-[56px] items-center justify-center rounded-full bg-[#f8f5f0] text-[#c9a96e]">
                    <FiShield className="text-[24px]" />
                  </div>
                  <h2 className="mb-2 text-[26px] font-black text-[#111827] sm:text-[32px]">
                    Verify Your Email
                  </h2>
                  <p className="text-sm text-gray-500 sm:text-[15px]">
                    We've sent a 6-digit code to <span className="font-semibold text-black">{email}</span>
                  </p>
                </div>

                <form onSubmit={handleVerifyOtp} className="flex flex-col gap-6">
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
                    <p className="text-center text-[12px] font-medium text-red-500">{otpError}</p>
                  )}

                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="flex h-[56px] items-center justify-center gap-3 rounded-full bg-black text-[14px] font-semibold text-white transition-all duration-300 hover:bg-[#1f1f1f] disabled:opacity-60 sm:h-[60px] sm:text-[15px]"
                  >
                    {loading ? "Verifying..." : "Verify & Create Account"}
                    {!loading && <FiArrowRight />}
                  </motion.button>

                  <div className="flex items-center justify-between text-sm">
                    <button
                      type="button"
                      onClick={() => setStep("form")}
                      className="font-semibold text-gray-500 hover:text-black transition"
                    >
                      ← Edit details
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
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}