"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

import {
  FiShoppingBag,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiSearch,
  FiMoreVertical,
  FiEye,
  FiTrash2,
  FiAlertTriangle,
  FiX,
  FiPackage,
  FiTruck,
  FiDollarSign,
  FiCalendar,
  FiMapPin,
  FiMail,
} from "react-icons/fi";

const STATUS_STYLES: Record<string, string> = {
  Processing: "bg-blue-100 text-blue-700",
  Shipped:    "bg-amber-100 text-amber-700",
  Delivered:  "bg-emerald-100 text-emerald-700",
  Cancelled:  "bg-red-100 text-red-600",
};

const STATUS_OPTIONS = ["Processing", "Shipped", "Delivered", "Cancelled"];
const FILTER_TABS = ["All", "Processing", "Shipped", "Delivered", "Cancelled"];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [detailOrder, setDetailOrder] = useState<any | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // CLOSE MENU ON OUTSIDE CLICK
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // FETCH ORDERS
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders", { cache: "no-store" });
      const data = await res.json();
      if (data.success) setOrders(data.orders);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  // STATS
  const totalOrders    = orders.length;
  const totalRevenue   = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const pendingOrders  = orders.filter((o) => o.status === "Processing" || o.status === "Shipped").length;
  const deliveredOrders = orders.filter((o) => o.status === "Delivered").length;

  // FILTER
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.orderId?.toLowerCase().includes(search.toLowerCase()) ||
        order.userEmail?.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter === "All" ? true : order.status === filter;
      return matchesSearch && matchesFilter;
    });
  }, [search, filter, orders]);

  // UPDATE STATUS
  const handleStatusChange = async (id: string, status: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (data.success) {
        setOrders((prev) => prev.map((o) => o._id === id ? { ...o, status } : o));
        if (detailOrder?._id === id) setDetailOrder((prev: any) => ({ ...prev, status }));
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    }
    setUpdatingId(null);
    setOpenMenuId(null);
  };

  // DELETE ORDER
  const handleDeleteOrder = async (id: string) => {
    try {
      const res = await fetch(`/api/orders/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setOrders((prev) => prev.filter((o) => o._id !== id));
      }
    } catch (error) {
      console.error("Failed to delete order:", error);
    }
    setDeleteConfirmId(null);
    setOpenMenuId(null);
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-GB", {
      day: "2-digit", month: "short", year: "numeric",
    });

  return (
    <section className="min-h-screen bg-[#f5f7fb]">
      <div className="mx-auto max-w-6xl px-3 py-4 sm:px-4 sm:py-5 lg:px-6">

        {/* HEADER */}
        <div className="mb-5">
          <p className="mb-2 text-[9px] sm:text-[10px] font-bold uppercase tracking-[3px] text-[#c9a96e]">
            Admin Dashboard
          </p>
          <h1 className="text-[26px] leading-none sm:text-[34px] lg:text-[42px] font-black text-[#111827]">
            Orders Management
          </h1>
          <p className="mt-2 max-w-xl text-[12px] sm:text-[13px] leading-6 text-[#6b7280]">
            Track customer orders, update delivery status and manage order history.
          </p>
        </div>

        {/* STATS */}
        <div className="mb-5 grid grid-cols-2 gap-3 xl:grid-cols-4">
          {[
            { label: "Total Orders",    value: totalOrders,                     icon: <FiShoppingBag /> },
            { label: "Total Revenue",   value: `₹${totalRevenue.toLocaleString()}`, icon: <FiDollarSign /> },
            { label: "In Progress",     value: pendingOrders,                   icon: <FiClock /> },
            { label: "Delivered",       value: deliveredOrders,                 icon: <FiCheckCircle /> },
          ].map(({ label, value, icon }) => (
            <div key={label} className="rounded-2xl bg-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[12px] font-medium text-[#6b7280]">{label}</p>
                  <h2 className="mt-2 text-[22px] sm:text-[26px] font-black text-[#111827]">{value}</h2>
                </div>
                <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-[#f3f4f6] text-[20px] text-[#111827]">
                  {icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ORDERS SECTION */}
        <div className="rounded-2xl bg-white p-4 sm:p-5 shadow-[0_10px_40px_rgba(0,0,0,0.05)]">

          {/* TOP BAR */}
          <div className="mb-4 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h2 className="text-[20px] sm:text-[24px] font-black text-[#111827]">All Orders</h2>
              <p className="mt-1 text-[12px] text-[#6b7280]">{filteredOrders.length} orders found</p>
            </div>
            <div className="flex flex-col gap-3 lg:flex-row">
              {/* SEARCH */}
              <div className="relative w-full lg:w-[260px]">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[14px] text-[#9ca3af]" />
                <input
                  type="text"
                  placeholder="Search by Order ID or email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-[42px] w-full rounded-full border border-[#e5e7eb] bg-[#fafafa] pl-10 pr-4 text-[13px] outline-none focus:border-[#111827]"
                />
              </div>
              {/* FILTER TABS */}
              <div className="flex gap-2 flex-wrap">
                {FILTER_TABS.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setFilter(tab)}
                    className={`h-[38px] whitespace-nowrap rounded-full px-4 text-[12px] font-semibold transition-all duration-200 ${filter === tab ? "bg-[#111827] text-white" : "bg-[#f3f4f6] text-[#6b7280]"}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* EMPTY STATE */}
          {filteredOrders.length === 0 && (
            <div className="flex flex-col items-center justify-center py-14 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#f3f4f6] text-[24px] text-[#9ca3af]">
                <FiPackage />
              </div>
              <h3 className="text-[20px] font-black text-[#111827]">No Orders Found</h3>
              <p className="mt-2 text-[13px] text-[#6b7280]">Try another search or filter.</p>
            </div>
          )}

          {/* ORDERS LIST */}
          <div className="flex flex-col gap-3">
            {filteredOrders.map((order) => (
              <div
                key={order._id}
                className="rounded-2xl border border-[#eef0f3] bg-[#fcfcfc] p-3 sm:p-4 transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_10px_25px_rgba(0,0,0,0.05)]"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                  {/* LEFT — ORDER INFO */}
                  <div className="flex min-w-0 items-start gap-3">
                    {/* ITEM THUMBNAIL */}
                    <div className="relative h-[56px] w-[56px] shrink-0 overflow-hidden rounded-xl bg-[#f3f4f6]">
                      {order.items?.[0]?.image ? (
                        <Image src={order.items[0].image} alt="product" fill className="object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-[22px] text-[#9ca3af]">
                          <FiPackage />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-[15px] sm:text-[16px] font-black text-[#111827]">
                          #{order.orderId}
                        </h3>
                        <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${STATUS_STYLES[order.status] ?? "bg-gray-100 text-gray-600"}`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="mt-1.5 flex items-center gap-2 text-[12px] text-[#6b7280]">
                        <FiMail className="shrink-0" />
                        <p className="truncate">{order.userEmail}</p>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className="rounded-full bg-[#f3f4f6] px-2.5 py-1 text-[10px] font-semibold text-[#111827]">
                          {order.items?.length ?? 0} item{order.items?.length !== 1 ? "s" : ""}
                        </span>
                        <span className="rounded-full bg-[#f3f4f6] px-2.5 py-1 text-[10px] font-semibold text-[#111827]">
                          ₹{Number(order.totalAmount).toLocaleString()}
                        </span>
                        <span className="rounded-full bg-[#f3f4f6] px-2.5 py-1 text-[10px] font-semibold text-[#111827]">
                          {formatDate(order.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT — ACTIONS */}
                  <div className="flex items-center gap-2 self-start sm:self-center">
                    {/* STATUS DROPDOWN */}
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      disabled={updatingId === order._id}
                      className="h-[36px] rounded-full border border-[#e5e7eb] bg-white px-3 text-[12px] font-semibold text-[#111827] outline-none cursor-pointer disabled:opacity-50"
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>

                    {/* 3 DOTS MENU */}
                    <div className="relative" ref={openMenuId === order._id ? menuRef : null}>
                      <button
                        onClick={() => setOpenMenuId(openMenuId === order._id ? null : order._id)}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-[#dbe1ea] bg-white text-[#111827] hover:bg-[#f3f4f6] transition-all"
                      >
                        <FiMoreVertical />
                      </button>

                      {openMenuId === order._id && (
                        <div className="absolute right-0 top-11 z-50 w-[190px] overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                          <button
                            onClick={() => { setDetailOrder(order); setOpenMenuId(null); }}
                            className="flex w-full items-center gap-3 px-4 py-3 text-[13px] font-medium text-[#111827] hover:bg-[#f3f4f6] transition-colors"
                          >
                            <FiEye className="text-[15px] text-[#6b7280]" />
                            View Details
                          </button>
                          <div className="h-px bg-[#f3f4f6]" />
                          <button
                            onClick={() => { setDeleteConfirmId(order._id); setOpenMenuId(null); }}
                            className="flex w-full items-center gap-3 px-4 py-3 text-[13px] font-medium text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <FiTrash2 className="text-[15px]" />
                            Delete Order
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== ORDER DETAIL MODAL ===== */}
      {detailOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-[24px] bg-white shadow-2xl max-h-[90vh] overflow-y-auto">

            {/* MODAL HEADER */}
            <div className="flex items-center justify-between border-b border-[#f3f4f6] px-6 py-5">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[3px] text-[#c9a96e]">Order Details</p>
                <h2 className="text-[20px] font-black text-[#111827]">#{detailOrder.orderId}</h2>
              </div>
              <button
                onClick={() => setDetailOrder(null)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f3f4f6] text-[#111827] hover:bg-[#111827] hover:text-white transition-all"
              >
                <FiX />
              </button>
            </div>

            <div className="px-6 py-5 flex flex-col gap-5">

              {/* STATUS + DATE */}
              <div className="flex flex-wrap gap-2 items-center">
                <span className={`rounded-full px-3 py-1.5 text-[11px] font-semibold ${STATUS_STYLES[detailOrder.status] ?? "bg-gray-100 text-gray-600"}`}>
                  {detailOrder.status}
                </span>
                <span className="flex items-center gap-1.5 text-[12px] text-[#6b7280]">
                  <FiCalendar className="text-[13px]" />
                  {formatDate(detailOrder.createdAt)}
                </span>
                {detailOrder.estimatedDelivery && (
                  <span className="flex items-center gap-1.5 text-[12px] text-[#6b7280]">
                    <FiTruck className="text-[13px]" />
                    Est. {detailOrder.estimatedDelivery}
                  </span>
                )}
              </div>

              {/* CUSTOMER INFO */}
              <div className="rounded-2xl bg-[#f8f9fb] p-4 flex flex-col gap-2">
                <p className="text-[10px] font-bold uppercase tracking-[2px] text-[#9ca3af]">Customer</p>
                <div className="flex items-center gap-2 text-[13px] text-[#111827]">
                  <FiMail className="text-[#6b7280]" />
                  {detailOrder.userEmail}
                </div>
                {detailOrder.shippingAddress && (
                  <div className="flex items-start gap-2 text-[13px] text-[#111827]">
                    <FiMapPin className="text-[#6b7280] mt-0.5 shrink-0" />
                    <span>{detailOrder.shippingAddress}</span>
                  </div>
                )}
              </div>

              {/* ORDER ITEMS */}
              <div>
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[2px] text-[#9ca3af]">
                  Items ({detailOrder.items?.length})
                </p>
                <div className="flex flex-col gap-3">
                  {detailOrder.items?.map((item: any, i: number) => (
                    <div key={i} className="flex items-center gap-3 rounded-2xl border border-[#eef0f3] bg-[#fcfcfc] p-3">
                      <div className="relative h-[48px] w-[48px] shrink-0 overflow-hidden rounded-xl bg-[#f3f4f6]">
                        {item.image ? (
                          <Image src={item.image} alt={item.title} fill className="object-cover" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-[18px] text-[#9ca3af]">
                            <FiPackage />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="truncate text-[13px] font-semibold text-[#111827]">{item.title}</p>
                        <p className="text-[12px] text-[#6b7280]">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-[14px] font-black text-[#111827]">₹{Number(item.totalPrice).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* PRICE BREAKDOWN */}
              <div className="rounded-2xl bg-[#f8f9fb] p-4 flex flex-col gap-2">
                <p className="text-[10px] font-bold uppercase tracking-[2px] text-[#9ca3af] mb-1">Price Summary</p>
                {[
                  { label: "Subtotal",  value: detailOrder.subtotal },
                  { label: "Shipping",  value: detailOrder.shipping },
                  { label: "Discount",  value: detailOrder.discount ? -detailOrder.discount : null },
                ].filter((r) => r.value != null).map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between text-[13px] text-[#6b7280]">
                    <span>{label}</span>
                    <span className={value! < 0 ? "text-emerald-600 font-semibold" : ""}>
                      {value! < 0 ? `-₹${Math.abs(value!).toLocaleString()}` : `₹${Number(value).toLocaleString()}`}
                    </span>
                  </div>
                ))}
                <div className="mt-2 flex items-center justify-between border-t border-[#e5e7eb] pt-2">
                  <span className="text-[14px] font-black text-[#111827]">Total</span>
                  <span className="text-[18px] font-black text-[#111827]">₹{Number(detailOrder.totalAmount).toLocaleString()}</span>
                </div>
              </div>

              {/* UPDATE STATUS IN MODAL */}
              <div>
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[2px] text-[#9ca3af]">Update Status</p>
                <div className="flex flex-wrap gap-2">
                  {STATUS_OPTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleStatusChange(detailOrder._id, s)}
                      disabled={updatingId === detailOrder._id}
                      className={`h-[36px] rounded-full px-4 text-[12px] font-semibold transition-all duration-200 disabled:opacity-50 ${
                        detailOrder.status === s
                          ? "bg-[#111827] text-white"
                          : "bg-[#f3f4f6] text-[#6b7280] hover:bg-[#e5e7eb]"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ===== DELETE CONFIRM MODAL ===== */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-[24px] bg-white p-6 shadow-2xl">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-500 text-[24px]">
              <FiAlertTriangle />
            </div>
            <h2 className="text-[22px] font-black text-[#111827]">Delete Order?</h2>
            <p className="mt-2 text-[14px] text-[#6b7280]">
              This action cannot be undone. The order will be permanently removed.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex h-[48px] flex-1 items-center justify-center rounded-full border border-[#e5e7eb] text-[14px] font-semibold text-[#111827]"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteOrder(deleteConfirmId)}
                className="flex h-[48px] flex-1 items-center justify-center rounded-full bg-red-500 text-[14px] font-bold text-white hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}