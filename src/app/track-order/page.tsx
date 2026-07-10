"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

import {
  FiPackage,
  FiTruck,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiMapPin,
  FiCalendar,
  FiArrowLeft,
  FiShoppingBag,
  FiMail,
} from "react-icons/fi";

import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

type OrderItem = {
  id: number;
  title: string;
  image: string;
  price: number;
  quantity: number;
  totalPrice?: number;
};

type OrderType = {
  _id: string;
  orderId: string;
  createdAt: string;
  estimatedDelivery: string;
  totalAmount: number;
  subtotal?: number;
  shipping?: number;
  discount?: number;
  status: string;
  items: OrderItem[];
  shippingAddress: string;
  userEmail: string;
};

const STEPS = [
  {
    key: "Processing",
    label: "Order Placed",
    desc: "Your order has been received and is being prepared.",
    icon: FiShoppingBag,
  },
  {
    key: "Shipped",
    label: "Shipped",
    desc: "Your order is on its way to you.",
    icon: FiTruck,
  },
  {
    key: "Delivered",
    label: "Delivered",
    desc: "Your order has been delivered successfully.",
    icon: FiCheckCircle,
  },
];

const STATUS_ORDER = ["Processing", "Shipped", "Delivered"];

function getStepIndex(status: string) {
  const idx = STATUS_ORDER.indexOf(status);
  return idx === -1 ? 0 : idx;
}

export default function TrackOrderPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams?.get("orderId") ?? null;

  const [order, setOrder] = useState<OrderType | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!orderId) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    const fetchOrder = async () => {
      try {
        // Fetch user orders and find matching orderId
        const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
        if (!currentUser?.email) {
          setNotFound(true);
          setLoading(false);
          return;
        }

        const res = await fetch(
          `/api/orders/user?email=${encodeURIComponent(currentUser.email)}`,
          { cache: "no-store" }
        );
        const data = await res.json();

        if (data.success) {
          const found = data.orders.find((o: OrderType) => o.orderId === orderId);
          if (found) setOrder(found);
          else setNotFound(true);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error("Failed to fetch order:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-GB", {
      day: "2-digit", month: "short", year: "numeric",
    });

  const isCancelled = order?.status === "Cancelled";
  const currentStep = order ? getStepIndex(order.status) : 0;

  return (
    <>

      <section className="min-h-screen bg-[#f8f5f0] pb-16 pt-[115px]">
        <div className="mx-auto max-w-3xl px-4 sm:px-5">

          {/* BACK */}
          <Link
            href="/orders"
            className="mb-6 inline-flex items-center gap-2 text-[13px] font-semibold text-[#6b7280] hover:text-[#111827] transition"
          >
            <FiArrowLeft />
            Back to Orders
          </Link>

          {/* HEADER */}
          <div className="mb-6">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[4px] text-[#c9a96e]">
              Order Tracking
            </p>
            <h1 className="text-[34px] font-black leading-none text-[#111827] sm:text-[44px]">
              Track Your Order
            </h1>
          </div>

          {/* LOADING */}
          {loading && (
            <div className="flex min-h-[380px] items-center justify-center">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#111827] border-t-transparent" />
            </div>
          )}

          {/* NOT FOUND */}
          {!loading && notFound && (
            <div className="flex min-h-[380px] flex-col items-center justify-center rounded-[30px] bg-white p-8 text-center shadow-[0_10px_40px_rgba(0,0,0,0.05)]">
              <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#f8f5f0] text-[#c9a96e]">
                <FiPackage size={34} />
              </div>
              <h2 className="mb-2 text-[24px] font-black text-[#111827]">Order Not Found</h2>
              <p className="mb-7 text-[14px] text-[#6b7280]">
                We couldn't find an order with ID <span className="font-bold text-[#111827]">{orderId}</span>.
              </p>
              <Link
                href="/orders"
                className="flex h-[50px] items-center justify-center rounded-full bg-black px-8 text-[14px] font-bold text-white transition hover:bg-[#c9a96e]"
              >
                View All Orders
              </Link>
            </div>
          )}

          {/* ORDER FOUND */}
          {!loading && order && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-5"
            >

              {/* ORDER ID + STATUS CARD */}
              <div className="rounded-[26px] bg-white p-5 shadow-[0_10px_35px_rgba(0,0,0,0.05)]">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[3px] text-[#9ca3af]">Order ID</p>
                    <h2 className="mt-1 text-[22px] font-black text-[#111827]">{order.orderId}</h2>
                    <div className="mt-2 flex flex-wrap gap-3 text-[13px] text-[#6b7280]">
                      <span className="flex items-center gap-1.5">
                        <FiCalendar size={13} />
                        Placed on {formatDate(order.createdAt)}
                      </span>
                      {order.estimatedDelivery && !isCancelled && (
                        <span className="flex items-center gap-1.5">
                          <FiClock size={13} />
                          Est. Delivery: {order.estimatedDelivery}
                        </span>
                      )}
                    </div>
                  </div>
                  <div
                    className={`self-start rounded-full px-5 py-2.5 text-[12px] font-bold sm:self-auto ${
                      order.status === "Delivered"
                        ? "bg-emerald-100 text-emerald-700"
                        : order.status === "Shipped"
                        ? "bg-blue-100 text-blue-700"
                        : order.status === "Cancelled"
                        ? "bg-red-100 text-red-600"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {order.status}
                  </div>
                </div>
              </div>

              {/* TRACKING TIMELINE */}
              <div className="rounded-[26px] bg-white p-5 shadow-[0_10px_35px_rgba(0,0,0,0.05)]">
                <h3 className="mb-5 text-[18px] font-black text-[#111827]">
                  {isCancelled ? "Order Cancelled" : "Tracking Progress"}
                </h3>

                {isCancelled ? (
                  /* CANCELLED STATE */
                  <div className="flex items-center gap-4 rounded-2xl bg-red-50 p-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-500 text-[22px]">
                      <FiXCircle />
                    </div>
                    <div>
                      <p className="text-[15px] font-black text-red-600">Order Cancelled</p>
                      <p className="mt-0.5 text-[13px] text-[#6b7280]">
                        This order was cancelled. If you paid, a refund will be processed shortly.
                      </p>
                    </div>
                  </div>
                ) : (
                  /* PROGRESS STEPS */
                  <div className="relative">
                    {STEPS.map((step, index) => {
                      const isCompleted = index <= currentStep;
                      const isActive = index === currentStep;
                      const Icon = step.icon;

                      return (
                        <div key={step.key} className="relative flex gap-4">

                          {/* LINE */}
                          {index < STEPS.length - 1 && (
                            <div className="absolute left-[23px] top-[48px] w-[2px] h-[calc(100%-8px)]">
                              <div className="h-full w-full bg-[#e5e7eb]" />
                              {isCompleted && index < currentStep && (
                                <motion.div
                                  initial={{ height: 0 }}
                                  animate={{ height: "100%" }}
                                  transition={{ duration: 0.5, delay: index * 0.2 }}
                                  className="absolute top-0 left-0 w-full bg-[#111827]"
                                />
                              )}
                            </div>
                          )}

                          {/* ICON */}
                          <div className="relative z-10 mb-6">
                            <motion.div
                              initial={{ scale: 0.8, opacity: 0.5 }}
                              animate={{ scale: isActive ? 1.1 : 1, opacity: 1 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-[20px] transition-all ${
                                isCompleted
                                  ? "bg-[#111827] text-white shadow-[0_4px_14px_rgba(17,24,39,0.25)]"
                                  : "bg-[#f3f4f6] text-[#9ca3af]"
                              } ${isActive ? "ring-4 ring-[#c9a96e]/30" : ""}`}
                            >
                              <Icon />
                            </motion.div>
                          </div>

                          {/* TEXT */}
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="flex-1 pb-6"
                          >
                            <p className={`text-[15px] font-black ${isCompleted ? "text-[#111827]" : "text-[#9ca3af]"}`}>
                              {step.label}
                            </p>
                            <p className={`mt-0.5 text-[13px] ${isCompleted ? "text-[#6b7280]" : "text-[#c4c9d4]"}`}>
                              {step.desc}
                            </p>
                            {isActive && (
                              <span className="mt-2 inline-block rounded-full bg-[#c9a96e]/15 px-3 py-1 text-[11px] font-bold text-[#c9a96e]">
                                Current Status
                              </span>
                            )}
                          </motion.div>

                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* DELIVERY + CUSTOMER INFO */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                {/* SHIPPING */}
                <div className="rounded-[26px] bg-white p-5 shadow-[0_10px_35px_rgba(0,0,0,0.05)]">
                  <div className="mb-3 flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f3f4f6] text-[#111827]">
                      <FiMapPin size={16} />
                    </div>
                    <p className="text-[13px] font-black text-[#111827]">Shipping Address</p>
                  </div>
                  <p className="text-[13px] leading-6 text-[#6b7280]">
                    {order.shippingAddress || "Not provided"}
                  </p>
                </div>

                {/* CONTACT */}
                <div className="rounded-[26px] bg-white p-5 shadow-[0_10px_35px_rgba(0,0,0,0.05)]">
                  <div className="mb-3 flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f3f4f6] text-[#111827]">
                      <FiMail size={16} />
                    </div>
                    <p className="text-[13px] font-black text-[#111827]">Contact</p>
                  </div>
                  <p className="text-[13px] text-[#6b7280]">{order.userEmail}</p>
                  {order.estimatedDelivery && !isCancelled && (
                    <div className="mt-3 flex items-center gap-2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f3f4f6] text-[#111827]">
                        <FiClock size={16} />
                      </div>
                      <div>
                        <p className="text-[11px] text-[#9ca3af]">Estimated Delivery</p>
                        <p className="text-[13px] font-bold text-[#111827]">{order.estimatedDelivery}</p>
                      </div>
                    </div>
                  )}
                </div>

              </div>

              {/* ORDER SUMMARY */}
              <div className="rounded-[26px] bg-white p-5 shadow-[0_10px_35px_rgba(0,0,0,0.05)]">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-[18px] font-black text-[#111827]">Order Summary</h3>
                  <span className="rounded-full bg-[#f8f5f0] px-3 py-1.5 text-[12px] font-bold text-[#111827]">
                    {order.items.length} Items
                  </span>
                </div>

                <div className="flex flex-col gap-3">
                  {order.items.map((item, i) => {
                    const itemTotal = Number(item.totalPrice) || Number(item.price) * Number(item.quantity);
                    return (
                      <Link key={i} href={`/products/${item.id}`} className="group">
                        <div className="flex items-center gap-3 rounded-2xl border border-[#eee7de] p-3 transition-all hover:border-[#c9a96e] hover:bg-[#faf7f2]">
                          <div className="relative h-[60px] w-[60px] shrink-0 overflow-hidden rounded-xl bg-[#f8f5f0]">
                            <Image src={item.image} alt={item.title} fill className="object-cover transition group-hover:scale-105" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="truncate text-[14px] font-black text-[#111827] group-hover:text-[#c9a96e] transition">{item.title}</p>
                            <p className="text-[12px] text-[#6b7280]">Qty: {item.quantity} · ₹{Number(item.price).toLocaleString()} each</p>
                          </div>
                          <p className="text-[15px] font-black text-[#111827]">₹{itemTotal.toLocaleString()}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>

                {/* PRICE BREAKDOWN */}
                <div className="mt-4 rounded-2xl bg-[#f8f9fb] p-4 flex flex-col gap-2">
                  {order.subtotal != null && (
                    <div className="flex justify-between text-[13px] text-[#6b7280]">
                      <span>Subtotal</span>
                      <span>₹{Number(order.subtotal).toLocaleString()}</span>
                    </div>
                  )}
                  {order.shipping != null && (
                    <div className="flex justify-between text-[13px] text-[#6b7280]">
                      <span>Shipping</span>
                      <span>₹{Number(order.shipping).toLocaleString()}</span>
                    </div>
                  )}
                  {order.discount != null && order.discount > 0 && (
                    <div className="flex justify-between text-[13px] text-emerald-600 font-semibold">
                      <span>Discount</span>
                      <span>-₹{Number(order.discount).toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between border-t border-[#e5e7eb] pt-2 mt-1">
                    <span className="text-[15px] font-black text-[#111827]">Total</span>
                    <span className="text-[18px] font-black text-[#111827]">₹{Number(order.totalAmount).toLocaleString()}</span>
                  </div>
                </div>

              </div>

            </motion.div>
          )}

        </div>
      </section>

      <Footer />
    </>
  );
}