"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";

import { login } from "@/store/features/authSlice";
import { loadCart } from "@/store/features/cartSlice";
import { loadWishlist } from "@/store/features/wishlistSlice";

import {
  FiMail,
  FiLock,
  FiArrowRight,
} from "react-icons/fi";

import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const dispatch = useDispatch();

  const router = useRouter();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!data.success) {
        alert(data.message);
        return;
      }

      localStorage.setItem(
        "currentUser",
        JSON.stringify(data.user)
      );

      dispatch(login(data.user));

      dispatch(loadCart());
      dispatch(loadWishlist());

      alert("Login Successful");

      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 300);

    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>

      <section className="min-h-screen overflow-hidden bg-[#f8f5f0]">

        <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-10 px-4 pb-16 pt-[110px] sm:px-6 md:gap-14 lg:grid-cols-2 lg:gap-20 lg:px-8 lg:pb-20">

          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >

            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[4px] text-[#c9a96e] sm:mb-5 sm:text-[12px]">
              Welcome
            </p>

            <h1 className="mb-5 text-[38px] font-black leading-[1.05] tracking-[-2px] text-[#111827] sm:text-[52px] md:text-[64px] lg:text-[62px]">
              Login To Your
              <br />
              Luxury Account
            </h1>

            <p className="mx-auto max-w-[580px] text-[15px] leading-8 text-gray-500 sm:text-[16px] lg:mx-0">
              Access your wishlist, orders, premium
              handcrafted collections, and luxury
              ceramic decor shopping experience.
            </p>

          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-[28px] bg-white p-6 shadow-[0_15px_50px_rgba(0,0,0,0.06)] sm:rounded-[36px] sm:p-8 md:p-10"
          >

            {/* Glow */}
            <div className="absolute -right-16 -top-16 h-[180px] w-[180px] rounded-full bg-[#f3e4d1] opacity-40 blur-3xl" />

            <div className="relative z-10">

              {/* Heading */}
              <div className="mb-8 sm:mb-10">

                <h2 className="mb-2 text-[30px] font-black text-[#111827] sm:mb-3 sm:text-[38px]">
                  Sign In
                </h2>

                <p className="text-[14px] text-gray-500 sm:text-[15px]">
                  Login to continue your luxury
                  shopping journey.
                </p>

              </div>

              {/* Email */}
              <div className="mb-5">

                <label className="mb-2.5 block text-[13px] font-semibold text-[#111827] sm:text-[14px]">
                  Email Address
                </label>

                <div className="flex h-[56px] items-center gap-3 rounded-[16px] border border-transparent bg-[#f8f5f0] px-4 transition focus-within:border-black sm:h-[60px] sm:rounded-[18px] sm:px-5">

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

              {/* Password */}
              <div className="mb-4">

                <label className="mb-2.5 block text-[13px] font-semibold text-[#111827] sm:text-[14px]">
                  Password
                </label>

                <div className="flex h-[56px] items-center gap-3 rounded-[16px] border border-transparent bg-[#f8f5f0] px-4 transition focus-within:border-black sm:h-[60px] sm:rounded-[18px] sm:px-5">

                  <FiLock className="shrink-0 text-[18px] text-gray-400" />

                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-full bg-transparent text-[14px] text-black outline-none placeholder:text-gray-400 sm:text-[15px]"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleLogin();
                      }
                    }}
                  />

                </div>

              </div>

              {/* Forgot Password */}
              {/* <div className="mb-7 flex justify-end sm:mb-8">

                <button className="text-[13px] font-medium text-gray-500 transition hover:text-black sm:text-sm">
                  Forgot Password?
                </button>

              </div> */}

              {/* Login Button */}
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLogin}
                disabled={loading}
                className="mb-6 flex h-[56px] w-full items-center justify-center gap-3 rounded-full bg-black text-[14px] font-semibold text-white transition-all duration-300 hover:bg-[#1f1f1f] disabled:cursor-not-allowed disabled:opacity-70 sm:mb-7 sm:h-[60px] sm:text-[15px]"
              >

                {
                  loading
                    ? "Logging in..."
                    : (
                      <>
                        Login
                        <FiArrowRight />
                      </>
                    )
                }

              </motion.button>

              {/* Bottom */}
              <div className="text-center">

                <p className="text-[14px] text-gray-500 sm:text-[15px]">
                  Don’t have an account?{" "}

                  <Link
                    href="/signup"
                    className="font-semibold text-black transition hover:text-[#c9a96e]"
                  >
                    Create Account
                  </Link>

                </p>

              </div>

            </div>

          </motion.div>

        </div>

      </section>

      <Footer />
    </>
  );
}