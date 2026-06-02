"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import {
  FiUser,
  FiMail,
  FiLock,
  FiArrowRight,
  FiHeart,
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

  const handleSignup = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name,
          email,
          password,
        }),
      }
    );

    const data = await res.json();

    if (!data.success) {
      alert(data.message || "signup failed. please try again.");
      return;
    }

    alert("Account created successfully!");

    router.push("/login");

    } catch (error) {
      console.log("Signup error:", error);

      alert("Something went wrong. please try again.");
    }
  };

  return (
    <>
      <Navbar />

      <section className="min-h-screen overflow-hidden bg-[#f8f5f0]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 pb-16 pt-[110px] sm:px-6 md:gap-14 lg:grid-cols-2 lg:gap-20 lg:px-8 lg:pb-20">
          
          {/* LEFT SIDE */}
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

          {/* RIGHT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto w-full max-w-[520px] rounded-[28px] bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.06)] sm:rounded-[34px] sm:p-8 md:p-10"
          >
            
            {/* TOP */}
            <div className="mb-8 sm:mb-9">
              <h2 className="mb-2 text-[30px] font-black text-[#111827] sm:mb-3 sm:text-[38px]">
                Sign Up
              </h2>

              <p className="text-sm text-gray-500 sm:text-[15px]">
                Create your account to continue
                shopping.
              </p>
            </div>

            {/* FORM */}
            <form
              onSubmit={handleSignup}
              className="flex flex-col gap-5"
            >
              
              {/* NAME */}
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

                <div className="flex h-[56px] items-center gap-3 rounded-[16px] border border-transparent bg-[#f8f5f0] px-4 transition focus-within:border-black sm:h-[60px] sm:px-5">
                  <FiMail className="shrink-0 text-[18px] text-gray-400" />

                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full bg-transparent text-[14px] text-black outline-none placeholder:text-gray-400 sm:text-[15px]"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <label className="mb-2.5 block text-[13px] font-semibold text-[#111827] sm:text-[14px]">
                  Password
                </label>

                <div className="flex h-[56px] items-center gap-3 rounded-[16px] border border-transparent bg-[#f8f5f0] px-4 transition focus-within:border-black sm:h-[60px] sm:px-5">
                  <FiLock className="shrink-0 text-[18px] text-gray-400" />

                  <input
                    type="password"
                    placeholder="Create password"
                    className="w-full bg-transparent text-[14px] text-black outline-none placeholder:text-gray-400 sm:text-[15px]"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                  />
                </div>
              </div>

              {/* BUTTON */}
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="mt-2 flex h-[56px] items-center justify-center gap-3 rounded-full bg-black text-[14px] font-semibold text-white transition-all duration-300 hover:bg-[#1f1f1f] sm:h-[60px] sm:text-[15px]"
              >
                Create Account
                <FiArrowRight />
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