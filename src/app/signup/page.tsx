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
} from "react-icons/fi";

import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSignup = async (
  e: React.FormEvent
) => {
  e.preventDefault();

  // PASSWORD VALIDATION
  if (password.length < 8) {

    setPasswordError(
      "Password must be at least 8 characters"
    );

    return;
  }
  if (!/[A-Z]/.test(password)) {

    setPasswordError(
      "Password must contain uppercase letter"
    );

    return;
  }
  if (!/[0-9]/.test(password)) {

    setPasswordError(
      "Password must contain number"
    );

    return;
  }
  if (!/[!@#$%^&*]/.test(password)) {

    setPasswordError(
      "Password must contain special character"
    );
    return;
  }

  // EMAIL VALIDATION

  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    setEmailError(
      "Enter valid email"
    );
    return;
  }

  // PHONE VALIDATION
  const phoneRegex =
    /^[6-9]\d{9}$/;
  if (!phoneRegex.test(phone)) {
    setPhoneError(
      "Enter valid mobile number"
    );

    return;
  }

  try {
    setLoading(true);
    const res = await fetch(
      "/api/auth/signup",
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({

          name,
          email,
          password,
          phone

        })

      }
    );

    const data = await res.json();

    if(!data.success){

      alert(data.message);

      return;

    }

    alert(
      "Account created successfully!"
    );

    router.push("/login");

  }
  catch(error){

    console.log(error);

    alert(
      "Something went wrong"
    );

  }

  finally{

    setLoading(false);

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

            {/* FEATURES */}
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:max-w-[540px]">
              {[
                "Save Wishlist",
                "Track Orders",
                "Fast Checkout",
                "Premium Experience",
              ].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: index * 0.1,
                  }}
                  className="flex items-center gap-3 rounded-[18px] border border-[#ece7df] bg-white px-4 py-4 sm:px-5"
                >
                  <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-[#f8f5f0] text-[#c9a96e]">
                    <FiHeart />
                  </div>

                  <p className="text-sm font-semibold text-[#111827]">
                    {item}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto w-full max-w-[520px] rounded-[28px] bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.06)] sm:rounded-[34px] sm:p-8 md:p-10"
          >

            <div className="mb-8 sm:mb-9">
              <h2 className="mb-2 text-[30px] font-black text-[#111827] sm:mb-3 sm:text-[38px]">
                Sign Up
              </h2>

              <p className="text-sm text-gray-500 sm:text-[15px]">
                Create your account to continue
                shopping.
              </p>
            </div>

            <form
              onSubmit={handleSignup}
              className="flex flex-col gap-5"
            >

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
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div>
                <label className="mb-2.5 block text-[13px] font-semibold text-[#111827] sm:text-[14px]">
                  Email Address
                </label>

                <div className={`flex h-[56px] items-center gap-3 rounded-[16px] border bg-[#f8f5f0] px-4 transition sm:h-[60px] sm:px-5 ${emailError ? "border-red-400" : "border-transparent focus-within:border-black"}`}>
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

                <div className={`flex h-[56px] items-center gap-3 rounded-[16px] border bg-[#f8f5f0] px-4 transition sm:h-[60px] sm:px-5 ${passwordError ? "border-red-400" : "border-transparent focus-within:border-black"}`}>
                  <FiLock className="shrink-0 text-[18px] text-gray-400" />
                  <input
                    type="password"
                    placeholder="Create password"
                    className="w-full bg-transparent text-[14px] text-black outline-none placeholder:text-gray-400 sm:text-[15px]"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setPasswordError("");
                    }}
                  />
                </div>

                {/* ERROR MESSAGE */}
                {passwordError && (
                  <p className="mt-1.5 text-[12px] font-medium text-red-500">
                    {passwordError}
                  </p>
                )}

                {/* STRENGTH INDICATOR */}
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
                          className={`h-1 flex-1 rounded-full transition-all duration-300 ${passed ? "bg-emerald-500" : "bg-[#e5e7eb]"
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
                        <span key={text} className={`text-[11px] font-medium ${passed ? "text-emerald-600" : "text-gray-400"}`}>
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
                <div className={`flex h-[56px] items-center gap-3 rounded-[16px] border bg-[#f8f5f0] px-4 transition sm:h-[60px] sm:px-5 ${phoneError ? "border-red-400" : "border-transparent focus-within:border-black"}`}>
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
                {loading ? "Creating Account..." : "Create Account"}

                {!loading && <FiArrowRight />}
              </motion.button>
            </form>

            {/* LOGIN */}
            <div className="mt-6 text-center sm:mt-7">
              <p className="text-sm text-gray-500 sm:text-[15px]">
                Already have an account?{" "}

                <Link
                  href="/login"
                  className="font-semibold text-black transition hover:text-[#c9a96e]"
                >
                  Login
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}