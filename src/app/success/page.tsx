"use client";

import Link from "next/link";

import { motion } from "framer-motion";

import {
  FiCheckCircle,
  FiShoppingBag,
  FiArrowRight,
  FiTruck,
  FiShield,
  FiHome,
} from "react-icons/fi";

import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

export default function SuccessPage() {
  return (
    <>

      <section className="min-h-screen bg-[#f8f5f0] pt-[100px] pb-[50px] px-4">

        <div className="max-w-3xl mx-auto">

          {/* SUCCESS CARD */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden rounded-[28px] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.05)]"
          >

            {/* TOP */}
            <div className="relative overflow-hidden bg-black px-5 py-10 text-center md:px-8 md:py-12">

              {/* Glow */}
              <div className="absolute top-[-80px] right-[-80px] h-[180px] w-[180px] rounded-full bg-[#c9a96e]/20 blur-3xl" />

              <div className="relative z-10">

                {/* Icon */}
                <div className="mx-auto mb-5 flex h-[78px] w-[78px] items-center justify-center rounded-full bg-[#c9a96e] text-black shadow-lg">
                  <FiCheckCircle className="text-[40px]" />
                </div>

                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[4px] text-[#c9a96e]">
                  Order Confirmed
                </p>

                <h1 className="mb-3 text-[clamp(30px,5vw,52px)] font-black leading-none text-white">
                  Payment Successful
                </h1>

                <p className="mx-auto max-w-xl text-[14px] leading-7 text-white/70">
                  Thank you for shopping with NishMee. Your order has been
                  placed successfully and is now being prepared for delivery.
                </p>

              </div>

            </div>

            {/* CONTENT */}
            <div className="px-4 py-7 md:px-7 md:py-8">

              {/* ORDER INFO */}
              <div className="grid gap-4 md:grid-cols-3">

                {/* Order */}
                <div className="rounded-[22px] border border-[#ece7df] bg-[#faf8f5] p-5">

                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#c9a96e] shadow-sm">
                    <FiShoppingBag className="text-[20px]" />
                  </div>

                  <h3 className="mb-1 text-[17px] font-black text-[#111827]">
                    Order Placed
                  </h3>

                  <p className="text-[13px] leading-6 text-gray-500">
                    Your order has been confirmed successfully.
                  </p>

                </div>

                {/* Shipping */}
                <div className="rounded-[22px] border border-[#ece7df] bg-[#faf8f5] p-5">

                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#c9a96e] shadow-sm">
                    <FiTruck className="text-[20px]" />
                  </div>

                  <h3 className="mb-1 text-[17px] font-black text-[#111827]">
                    Fast Delivery
                  </h3>

                  <p className="text-[13px] leading-6 text-gray-500">
                    Your products will be delivered soon.
                  </p>

                </div>

                {/* Secure */}
                <div className="rounded-[22px] border border-[#ece7df] bg-[#faf8f5] p-5">

                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#c9a96e] shadow-sm">
                    <FiShield className="text-[20px]" />
                  </div>

                  <h3 className="mb-1 text-[17px] font-black text-[#111827]">
                    Secure Payment
                  </h3>

                  <p className="text-[13px] leading-6 text-gray-500">
                    Your payment was processed securely.
                  </p>

                </div>

              </div>

              {/* MESSAGE */}
              <div className="mt-7 rounded-[24px] bg-[#111827] px-5 py-6 text-center md:px-7">

                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[3px] text-[#c9a96e]">
                  Luxury Experience
                </p>

                <h2 className="mb-3 text-[24px] font-black text-white">
                  Thank You For Your Purchase
                </h2>

                <p className="mx-auto max-w-xl text-[14px] leading-7 text-white/70">
                  Your handcrafted decor pieces are being carefully prepared
                  with premium packaging and quality assurance.
                </p>

              </div>

              {/* BUTTONS */}
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">

                {/* Continue Shopping */}
                <Link
                  href="/products"
                  className="flex h-[52px] items-center justify-center gap-2 rounded-full bg-[#c9a96e] px-6 text-[14px] font-bold text-black transition-all duration-300 hover:bg-[#b8955a]"
                >
                  Continue Shopping
                  <FiArrowRight />
                </Link>

                {/* Home */}
                <Link
                  href="/"
                  className="flex h-[52px] items-center justify-center gap-2 rounded-full border border-[#d9d1c5] bg-white px-6 text-[14px] font-bold text-[#111827] transition-all duration-300 hover:bg-black hover:text-white"
                >
                  Back To Home
                  <FiHome />
                </Link>

              </div>

            </div>

          </motion.div>

        </div>

      </section>

      <Footer />
    </>
  );
}