"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import Image from "next/image";

import { motion } from "framer-motion";

import {
  FiShoppingBag,
  FiCalendar,
  FiClock,
  FiChevronRight,
  FiArrowRight,
  FiXCircle,
  FiAlertTriangle,
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
  totalAmount?: number;
  subtotal?: number;
  shipping?: number;
  discount?: number;
  status: string;
  items: OrderItem[];
  shippingAddress: string;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancelConfirmId, setCancelConfirmId] = useState<string | null>(null);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

        if (!currentUser?.email) {
          setLoading(false);
          return;
        }

        const res = await fetch(`/api/orders/user?email=${encodeURIComponent(currentUser.email)}`);
        const data = await res.json();

        if (data.success) {
          setOrders(data.orders);
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-GB", {
      day: "2-digit", month: "short", year: "numeric",
    });

  const handleCancelOrder = async (id: string) => {
    setCancelling(true);
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Cancelled" }),
      });
      const data = await res.json();
      if (data.success) {
        setOrders((prev) =>
          prev.map((o) => o._id === id ? { ...o, status: "Cancelled" } : o)
        );
      }
    } catch (error) {
      console.error("Failed to cancel order:", error);
    }
    setCancelling(false);
    setCancelConfirmId(null);
  };

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-[#f8f5f0] pb-16 pt-[115px]">
        <div className="mx-auto max-w-6xl px-4 sm:px-5">

          {/* TOP */}
          <div className="mb-8">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[4px] text-[#c9a96e]">
              Premium Orders
            </p>
            <h1 className="text-[34px] font-black leading-none text-[#111827] sm:text-[48px]">
              Order History
            </h1>
            <p className="mt-4 max-w-[620px] text-[14px] leading-7 text-[#6b7280]">
              View your orders, track deliveries, and explore purchased products.
            </p>
          </div>

          {/* LOADING */}
          {loading && (
            <div className="flex min-h-[380px] items-center justify-center">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#111827] border-t-transparent" />
            </div>
          )}

          {/* EMPTY */}
          {!loading && orders.length === 0 && (
            <div className="flex min-h-[380px] flex-col items-center justify-center rounded-[30px] bg-white p-8 text-center shadow-[0_10px_40px_rgba(0,0,0,0.05)]">
              <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#f8f5f0] text-[#c9a96e]">
                <FiShoppingBag size={34} />
              </div>
              <h2 className="mb-2 text-[28px] font-black text-[#111827]">No Orders Found</h2>
              <p className="mb-7 max-w-[430px] text-[14px] leading-7 text-[#6b7280]">
                You haven't placed any orders yet.
              </p>
              <Link
                href="/products"
                className="flex h-[54px] items-center justify-center rounded-full bg-black px-8 text-[14px] font-bold text-white transition hover:bg-[#c9a96e]"
              >
                Start Shopping
              </Link>
            </div>
          )}

          {/* ORDERS */}
          <div className="flex flex-col gap-6">
            {orders.map((order, index) => {
              const calculatedTotal =
                Number(order.totalAmount) ||
                order.items.reduce(
                  (acc, item) => acc + Number(item.price) * Number(item.quantity),
                  0
                );

              return (
                <motion.div
                  key={order._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06 }}
                  className="overflow-hidden rounded-[26px] bg-white shadow-[0_10px_35px_rgba(0,0,0,0.05)]"
                >
                  {/* HEADER */}
                  <div className="border-b border-[#eee7de] p-4 sm:p-5">
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                      {/* LEFT */}
                      <div>
                        <div className="mb-3 flex flex-wrap items-center gap-2">
                          <div className="rounded-full bg-[#111827] px-4 py-2 text-[11px] font-bold text-white">
                            {order.orderId || `NSH-${index + 1}`}
                          </div>
                          <div
                            className={`rounded-full px-4 py-2 text-[11px] font-bold ${
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

                        <div className="flex flex-wrap items-center gap-4 text-[13px] text-[#6b7280]">
                          <div className="flex items-center gap-2">
                            <FiCalendar size={14} />
                            {formatDate(order.createdAt)}
                          </div>
                          {order.estimatedDelivery && (
                            <div className="flex items-center gap-2">
                              <FiClock size={14} />
                              Delivery: {order.estimatedDelivery}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* RIGHT */}
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        <div className="sm:text-right">
                          <p className="text-[12px] text-[#9ca3af]">Total Amount</p>
                          <h2 className="text-[24px] font-black leading-none text-[#111827]">
                            ₹{calculatedTotal.toLocaleString()}
                          </h2>
                        </div>
                        <div className="flex gap-2">
                          <Link
                            href={`/track-order?orderId=${order.orderId}`}
                            className="flex h-[48px] items-center justify-center gap-2 rounded-full bg-[#c9a96e] px-5 text-[13px] font-bold text-black transition hover:bg-[#b8955a]"
                          >
                            Track Order
                            <FiChevronRight />
                          </Link>
                          {order.status !== "Delivered" && order.status !== "Cancelled" && (
                            <button
                              onClick={() => setCancelConfirmId(order._id)}
                              className="flex h-[48px] items-center justify-center gap-2 rounded-full border border-red-200 bg-red-50 px-5 text-[13px] font-bold text-red-600 transition hover:bg-red-100"
                            >
                              <FiXCircle size={15} />
                              Cancel
                            </button>
                          )}
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* PRODUCTS */}
                  <div className="p-4 sm:p-5">
                    <div className="mb-4 flex items-center justify-between">
                      <h2 className="text-[20px] font-black text-[#111827]">Ordered Products</h2>
                      <div className="rounded-full bg-[#f8f5f0] px-4 py-2 text-[12px] font-bold text-[#111827]">
                        {order.items.length} Items
                      </div>
                    </div>

                    <div className="flex flex-col gap-4">
                      {order.items.map((item, itemIndex) => {
                        const itemTotal =
                          Number(item.totalPrice) ||
                          Number(item.price) * Number(item.quantity);

                        return (
                          <Link
                            key={`${order.orderId}-${item.id}-${itemIndex}`}
                            href={`/products/${item.id}`}
                            className="group"
                          >
                            <div className="flex flex-col gap-4 rounded-[22px] border border-[#eee7de] p-4 transition-all duration-300 hover:border-[#c9a96e] hover:bg-[#faf7f2] sm:flex-row sm:items-center">

                              {/* IMAGE */}
                              <div className="relative h-[90px] w-full overflow-hidden rounded-[16px] bg-[#f8f5f0] sm:w-[90px]">
                                <Image
                                  src={item.image}
                                  alt={item.title}
                                  fill
                                  className="object-cover transition duration-500 group-hover:scale-105"
                                />
                              </div>

                              {/* INFO */}
                              <div className="flex-1">
                                <div className="mb-3 flex items-start justify-between gap-4">
                                  <h3 className="max-w-[360px] text-[16px] font-black leading-tight text-[#111827] transition group-hover:text-[#c9a96e]">
                                    {item.title}
                                  </h3>
                                  <div className="hidden items-center gap-2 rounded-full bg-black px-4 py-2 text-[11px] font-bold text-white lg:flex">
                                    View <FiArrowRight />
                                  </div>
                                </div>
                                <div className="flex flex-wrap items-center gap-4 text-[13px] text-[#6b7280]">
                                  <p>Qty: <span className="ml-1 font-bold text-[#111827]">{item.quantity}</span></p>
                                  <p>Price: <span className="ml-1 font-bold text-[#111827]">₹{Number(item.price).toLocaleString()}</span></p>
                                </div>
                              </div>

                              {/* TOTAL */}
                              <div className="sm:text-right">
                                <p className="mb-1 text-[11px] text-[#9ca3af]">Total</p>
                                <h3 className="text-[20px] font-black leading-none text-[#111827]">
                                  ₹{itemTotal.toLocaleString()}
                                </h3>
                              </div>

                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      <Footer />

      {/* CANCEL CONFIRM MODAL */}
      {cancelConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-[24px] bg-white p-6 shadow-2xl">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-500 text-[24px]">
              <FiAlertTriangle />
            </div>
            <h2 className="text-[22px] font-black text-[#111827]">Cancel Order?</h2>
            <p className="mt-2 text-[14px] text-[#6b7280]">
              Are you sure you want to cancel this order? This action cannot be undone.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setCancelConfirmId(null)}
                className="flex h-[48px] flex-1 items-center justify-center rounded-full border border-[#e5e7eb] text-[14px] font-semibold text-[#111827]"
              >
                Keep Order
              </button>
              <button
                onClick={() => handleCancelOrder(cancelConfirmId)}
                disabled={cancelling}
                className="flex h-[48px] flex-1 items-center justify-center rounded-full bg-red-500 text-[14px] font-bold text-white hover:bg-red-600 disabled:opacity-60"
              >
                {cancelling ? "Cancelling..." : "Yes, Cancel"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}