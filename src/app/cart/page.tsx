"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/footer/Footer";

import {
  FiPlus,
  FiMinus,
  FiTrash2,
  FiShoppingBag,
  FiTruck,
  FiShield,
  FiArrowLeft,
  FiTag,
  FiChevronRight,
  FiCheck,
  FiLock,
  FiRefreshCcw,
} from "react-icons/fi";

import { useDispatch, useSelector } from "react-redux";

import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "@/store/features/cartSlice";

import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const router = useRouter();

  const dispatch = useDispatch();

  const { cartItems } = useSelector((state: RootState) => state.cart);

  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [removingId, setRemovingId] = useState<string | number | null>(null);

  const [showLoginMessage, setShowLoginMessage] = useState(false);

  const subtotal = cartItems.reduce(
    (acc: number, item: any) => acc + item.price * item.quantity,
    0,
  );

  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0;

  const shipping = subtotal > 500 ? 0 : 40;

  const total = subtotal - discount + shipping;

  const freeShippingLeft = Math.max(0, 500 - subtotal);

  const shippingProgress = Math.min(100, (subtotal / 500) * 100);

  const handleRemove = (id: string | number) => {
    setRemovingId(id);

    setTimeout(() => {
      dispatch(removeFromCart(id));
      setRemovingId(null);
    }, 300);
  };

  const handleCoupon = () => {
    if (coupon.trim().toLowerCase() === "luxury10") {
      setCouponApplied(true);
    }
  };

  const handleCheckout = () => {
    if (!isLoggedIn) {
      setShowLoginMessage(true);

      return;
    }

    router.push("/checkout");
  };

  return (
    <section className="min-h-screen bg-[#f8f5f0]">
      {/* ── Page header bar ── */}
      <div className="border-b border-[#ede9e3] bg-white py-4 sm:py-4.5">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-[13px] font-semibold text-[#a89880] transition-colors hover:text-black"
          >
            <FiArrowLeft size={14} />
            Continue Shopping
          </Link>

          <h1 className="text-[18px] font-black tracking-[-1px] text-[#111827] sm:text-[22px]">
            Shopping Cart
            {cartItems.length > 0 && (
              <span className="ml-2.5 text-[13px] font-semibold text-[#a89880]">
                ({cartItems.length} {cartItems.length === 1 ? "item" : "items"})
              </span>
            )}
          </h1>

          {/* Steps indicator */}
          <div className="hidden items-center gap-2 text-[12px] font-semibold md:flex">
            {["Cart", "Shipping", "Payment"].map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <div
                  className={`flex items-center gap-1.5 ${
                    i === 0 ? "text-black" : "text-[#c4b8a8]"
                  }`}
                >
                  <div
                    className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                      i === 0
                        ? "bg-black text-white"
                        : "bg-[#e8e0d4] text-[#a89880]"
                    }`}
                  >
                    {i === 0 ? <FiCheck size={10} /> : i + 1}
                  </div>

                  {step}
                </div>

                {i < 2 && (
                  <FiChevronRight size={12} className="text-[#c4b8a8]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 sm:pb-16 sm:pt-10 lg:px-8">
        {/* ══ EMPTY STATE ══ */}
        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-4 flex flex-col items-center justify-center rounded-[28px] border border-[#ede9e3] bg-white px-5 py-16 text-center sm:mt-5 sm:rounded-[36px] sm:px-10 sm:py-20"
          >
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-[28px] bg-[#f8f5f0] text-[38px] text-[#c9a96e] sm:mb-7 sm:h-28 sm:w-28 sm:rounded-4xl sm:text-[44px]">
              <FiShoppingBag />
            </div>

            <h2 className="mb-3 text-[28px] font-black tracking-[-1px] text-[#111827] sm:text-[36px]">
              Your Cart Is Empty
            </h2>

            <Link href="/">
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 rounded-full bg-black px-8 py-3.5 text-[14px] font-bold text-white transition-colors hover:bg-[#1a1a1a] sm:px-10 sm:py-4 sm:text-[15px]"
              >
                Shop Now
                <FiChevronRight size={16} />
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_380px] lg:gap-8">
            {/* ── LEFT: Cart items ── */}
            <div>
              {/* Free shipping progress */}
              <div
                className={`mb-4 flex items-center gap-3 rounded-[14px] border px-4 py-3.5 sm:mb-5 sm:gap-4 sm:rounded-2xl sm:px-5 ${
                  freeShippingLeft === 0
                    ? "border-[#b8e6c8] bg-[#f0faf4]"
                    : "border-[#ede9e3] bg-white"
                }`}
              >
                <FiTruck
                  className={`shrink-0 ${
                    freeShippingLeft === 0
                      ? "text-emerald-500"
                      : "text-[#c9a96e]"
                  }`}
                />

                <div className="flex-1">
                  <p
                    className={`mb-2 text-[12px] font-semibold sm:text-[13px] ${
                      freeShippingLeft === 0
                        ? "text-emerald-700"
                        : "text-[#7a6550]"
                    }`}
                  >
                    {freeShippingLeft === 0
                      ? "🎉 You've unlocked FREE shipping!"
                      : `Add ₹${freeShippingLeft} more to get free shipping`}
                  </p>

                  <div className="h-1.25 overflow-hidden rounded-full bg-[#e8e0d4]">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${shippingProgress}%`,
                      }}
                      transition={{
                        duration: 0.8,
                        ease: "easeOut",
                      }}
                      className={`h-full rounded-full ${
                        freeShippingLeft === 0
                          ? "bg-emerald-500"
                          : "bg-[#c9a96e]"
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Items list */}
              <div className="flex flex-col gap-3 sm:gap-4">
                <AnimatePresence>
                  {cartItems.map((item, i) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{
                        opacity: 0,
                        y: 20,
                      }}
                      animate={{
                        opacity: removingId === item.id ? 0 : 1,
                        x: removingId === item.id ? 40 : 0,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        x: 40,
                        height: 0,
                      }}
                      transition={{
                        duration: 0.3,
                        delay: i * 0.06,
                      }}
                      className="overflow-hidden rounded-3xl border border-[#ede9e3] bg-white shadow-[0_2px_16px_rgba(0,0,0,0.04)] sm:rounded-[28px]"
                    >
                      <div className="flex flex-col sm:flex-row">
                        {/* Product image */}
                        <div className="relative h-50 w-full shrink-0 overflow-hidden rounded-t-3xl bg-[#f8f5f0] sm:h-auto sm:w-50 sm:rounded-l-[28px] sm:rounded-t-none">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover transition duration-500 hover:scale-105"
                          />
                        </div>

                        {/* Info */}
                        <div className="flex flex-1 flex-col justify-between p-4 sm:p-5 lg:p-[22px_24px]">
                          {/* Top row */}
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <span className="mb-2.5 inline-block rounded-full bg-[#f8f5f0] px-3 py-1 text-[10px] font-bold uppercase tracking-[3px] text-[#c9a96e]">
                                Premium Collection
                              </span>

                              <h3 className="mb-1.5 text-[17px] font-black leading-[1.2] tracking-[-0.5px] text-[#111827] sm:text-[20px]">
                                {item.title}
                              </h3>

                              <p className="text-[12px] text-[#a89880] sm:text-[13px]">
                                Unit price:{" "}
                                <span className="font-semibold text-black">
                                  ₹{item.price}
                                </span>
                              </p>
                            </div>

                            <button
                              onClick={() => handleRemove(item.id)}
                              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#fad4d4] bg-[#fff5f5] text-[#e07070] transition-all duration-200 hover:border-red-500 hover:bg-red-500 hover:text-white sm:h-9 sm:w-9"
                            >
                              <FiTrash2 size={13} />
                            </button>
                          </div>

                          {/* Divider */}
                          <div className="my-3.5 h-px bg-[#f0ece6] sm:my-4" />

                          {/* Bottom row */}
                          <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
                            {/* Qty stepper */}
                            <div className="flex items-center gap-2 rounded-full bg-[#f8f5f0] p-1 sm:p-1.25">
                              <button
                                onClick={() => {
                                  if (item.quantity === 1) {
                                    handleRemove(item.id);
                                  } else {
                                    dispatch(decreaseQuantity(item.id));
                                  }
                                }}
                                className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#5a4a38] shadow-sm transition-all duration-200 hover:bg-black hover:text-white sm:h-9 sm:w-9"
                              >
                                <FiMinus size={13} />
                              </button>

                              <span className="w-6 text-center text-[15px] font-black text-[#111827] sm:w-7 sm:text-[16px]">
                                {item.quantity}
                              </span>

                              <button
                                onClick={() =>
                                  dispatch(increaseQuantity(item.id))
                                }
                                disabled={
                                  item.stock != null &&
                                  item.quantity >= item.stock
                                }
                                className={`flex h-8 w-8 items-center justify-center rounded-full text-white transition-all duration-200 sm:h-9 sm:w-9 ${
                                  item.stock != null &&
                                  item.quantity >= item.stock
                                    ? "bg-gray-300 cursor-not-allowed"
                                    : "bg-black hover:scale-110"
                                }`}
                              >
                                <FiPlus size={13} />
                              </button>
                            </div>

                            {/* Line total */}
                            <div className="text-right">
                              <p className="text-[22px] font-black leading-none tracking-[-1px] text-[#111827] sm:text-[28px]">
                                ₹{item.price * item.quantity}
                              </p>

                              {item.quantity > 1 && (
                                <p className="mt-0.5 text-[11px] text-[#a89880] sm:mt-0.75">
                                  {item.quantity} × ₹{item.price}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Coupon row */}
              <div className="mt-4 flex gap-3 rounded-[18px] border border-[#ede9e3] bg-white px-4 py-3.5 sm:rounded-[20px] sm:px-5 sm:py-4">
                <div className="flex flex-1 items-center gap-2">
                  <FiTag className="shrink-0 text-[#c9a96e]" size={15} />

                  <input
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder='Have a coupon? Try "LUXURY10"'
                    disabled={couponApplied}
                    className="flex-1 bg-transparent text-[13px] font-medium text-[#111827] outline-none placeholder:text-[#c4b8a8] sm:text-[14px]"
                  />
                </div>

                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={handleCoupon}
                  disabled={couponApplied}
                  className={`rounded-full px-4 py-2.5 text-[12px] font-bold transition-all duration-200 sm:px-5 sm:text-[13px] ${
                    couponApplied
                      ? "bg-emerald-500 text-white"
                      : "bg-black text-white hover:bg-[#333]"
                  }`}
                >
                  {couponApplied ? (
                    <span className="flex items-center gap-1.5">
                      <FiCheck size={13} />
                      Applied!
                    </span>
                  ) : (
                    "Apply"
                  )}
                </motion.button>
              </div>
            </div>

            {/* ══ RIGHT: Order Summary ══ */}
            <div className="sticky top-25 flex flex-col gap-4">
              <div className="rounded-3xl border border-[#ede9e3] bg-white p-5 shadow-[0_4px_30px_rgba(0,0,0,0.06)] sm:rounded-[28px] sm:p-6 lg:p-7">
                {/* Header */}
                <div className="mb-5 flex items-center justify-between sm:mb-6">
                  <h2 className="text-[18px] font-black tracking-[-0.5px] text-[#111827] sm:text-[20px]">
                    Order Summary
                  </h2>

                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f8f5f0] text-[#c9a96e]">
                    <FiTag size={14} />
                  </div>
                </div>

                {/* Line items */}
                <div className="mb-5 flex flex-col gap-3">
                  {[
                    {
                      label: "Subtotal",
                      value: `₹${subtotal}`,
                      sub: `${cartItems.length} items`,
                    },

                    ...(couponApplied
                      ? [
                          {
                            label: "Discount (10%)",
                            value: `-₹${discount}`,
                            sub: "LUXURY10 applied",
                            green: true,
                          },
                        ]
                      : []),

                    {
                      label: "Shipping",
                      value: shipping === 0 ? "Free" : `₹${shipping}`,
                      sub:
                        shipping === 0
                          ? "🎉 You saved ₹40"
                          : "Standard delivery",
                      green: shipping === 0,
                    },
                  ].map((row) => (
                    <div
                      key={row.label}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <p className="text-[13px] font-medium text-[#a89880]">
                          {row.label}
                        </p>

                        {row.sub && (
                          <p
                            className={`mt-0.5 text-[11px] ${
                              row.green ? "text-emerald-600" : "text-[#c4b8a8]"
                            }`}
                          >
                            {row.sub}
                          </p>
                        )}
                      </div>

                      <span
                        className={`text-[14px] font-bold sm:text-[15px] ${
                          row.green ? "text-emerald-600" : "text-[#111827]"
                        }`}
                      >
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div className="mb-5 border-t border-dashed border-[#e8e0d4]" />

                {/* Total */}
                <div className="mb-4 flex items-center justify-between rounded-2xl bg-[#111827] px-5 py-4 sm:mb-5 sm:rounded-[18px] sm:px-5.5 sm:py-4.5">
                  <span className="text-[16px] font-semibold text-white/60 sm:text-[18px]">
                    Total
                  </span>

                  <span className="text-[18px] font-black tracking-[-1px] text-white sm:text-[20px]">
                    ₹{total}
                  </span>
                </div>

                {/* Login Warning */}
                <AnimatePresence>
                  {showLoginMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mb-4 overflow-hidden rounded-[20px] border border-[#e8d7b5] bg-linear-to-r from-[#fffaf2] to-white p-4 shadow-[0_8px_30px_rgba(201,169,110,0.15)]"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#c9a96e]/15 text-[#c9a96e]">
                          <FiLock size={18} />
                        </div>

                        <div className="flex-1">
                          <h3 className="text-[14px] font-bold text-[#111827]">
                            Login Required
                          </h3>

                          <p className="mt-1 text-[13px] leading-5 text-[#7a6550]">
                            Please sign in to continue with your checkout and
                            place your order securely.
                          </p>

                          <Link href="/login">
                            <motion.button
                              whileHover={{ y: -2 }}
                              whileTap={{ scale: 0.97 }}
                              className="mt-4 flex h-11.5 items-center justify-center rounded-full bg-black px-6 text-[13px] font-bold text-white transition-all hover:bg-[#222]"
                            >
                              <FiLock className="mr-2" size={14} />
                              Login to Continue
                            </motion.button>
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Checkout CTA */}
                <motion.button
                  onClick={handleCheckout}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="mb-3 flex h-13 w-full items-center justify-center gap-2 rounded-full bg-[#c9a96e] text-[14px] font-black tracking-[0.3px] text-black transition-colors duration-300 hover:bg-[#b8955a] sm:mb-3.5 sm:h-14 sm:text-[15px]"
                >
                  <FiLock size={14} />
                  Proceed to Checkout
                </motion.button>

                <Link
                  href="/products"
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-full border-2 border-[#111827] text-[13px] font-bold text-[#111827] transition-all duration-300 hover:bg-[#111827] hover:text-white sm:h-12 sm:text-[14px]"
                >
                  Continue Shopping
                </Link>

                {/* Trust row */}
                <div className="mt-4 flex items-center justify-center gap-4 sm:mt-5 sm:gap-5">
                  {[
                    {
                      icon: <FiShield size={12} />,
                      text: "Secure",
                    },
                    {
                      icon: <FiCheck size={12} />,
                      text: "Guaranteed",
                    },
                    {
                      icon: <FiRefreshCcw size={12} />,
                      text: "Easy Returns",
                    },
                  ].map((b) => (
                    <div
                      key={b.text}
                      className="flex items-center gap-1 text-[11px] font-semibold text-[#a89880]"
                    >
                      {b.icon}
                      {b.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </section>
  );
}
