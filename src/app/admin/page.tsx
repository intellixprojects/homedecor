"use client";

import { useEffect, useState, useMemo, ReactNode } from "react";
import Link from "next/link";
import {
  FiPackage, FiUsers, FiShoppingBag, FiDollarSign,
  FiTrendingUp, FiArrowUpRight, FiGrid, FiRefreshCcw,
  FiClock, FiCheckCircle, FiXCircle, FiTruck,
  FiArrowUp, FiArrowDown,
} from "react-icons/fi";

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: ReactNode }> = {
  Processing: { label: "Processing", color: "bg-amber-100 text-amber-700", icon: <FiClock className="text-[11px]" /> },
  Shipped:    { label: "Shipped",    color: "bg-blue-100 text-blue-700",   icon: <FiTruck className="text-[11px]" /> },
  Delivered:  { label: "Delivered",  color: "bg-emerald-100 text-emerald-700", icon: <FiCheckCircle className="text-[11px]" /> },
  Cancelled:  { label: "Cancelled",  color: "bg-red-100 text-red-600",    icon: <FiXCircle className="text-[11px]" /> },
};

// ── Helper: get YYYY-MM-DD string in local time ──
function toLocalDateStr(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

// ── Build last-7-days buckets keyed by local date ───
function buildLast7(orders: any[]) {
  const today = new Date();
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (6 - i)); // 6 days ago → today
    return {
      dateStr: toLocalDateStr(d),
      label: i === 6
        ? "Today"
        : i === 5
        ? "Yesterday"
        : d.toLocaleDateString("en-IN", { weekday: "short" }),
      shortDate: d.toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
      revenue: 0,
      orders: 0,
    };
  });

  orders.forEach((o) => {
    const orderDate = toLocalDateStr(new Date(o.createdAt));
    const bucket = days.find((d) => d.dateStr === orderDate);
    if (bucket) {
      bucket.revenue += o.totalAmount || 0;
      bucket.orders  += 1;
    }
  });

  return days;
}

// ── Stat Card ────
function StatCard({
  label, value, sub, icon, color, href, trend, trendUp,
}: {
  label: string; value: string | number; sub?: string;
  icon: ReactNode; color: string; href: string;
  trend?: string; trendUp?: boolean;
}) {
  return (
    <Link
      href={href}
      className="group rounded-[22px] bg-white p-5 shadow-[0_4px_24px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_12px_32px_rgba(0,0,0,0.09)] flex flex-col gap-4"
    >
      <div className="flex items-start justify-between">
        <p className="text-[13px] font-semibold text-[#6b7280]">{label}</p>
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl text-[18px] ${color}`}>
          {icon}
        </div>
      </div>
      <div>
        <h2 className="text-[28px] sm:text-[32px] font-black text-[#111827] leading-none">{value}</h2>
        {sub && <p className="mt-1 text-[12px] text-[#9ca3af]">{sub}</p>}
      </div>
      {trend && (
        <div className={`flex items-center gap-1 text-[12px] font-semibold ${trendUp ? "text-emerald-600" : "text-red-500"}`}>
          {trendUp ? <FiArrowUp className="text-[11px]" /> : <FiArrowDown className="text-[11px]" />}
          {trend}
          <span className="ml-1 font-normal text-[#9ca3af]">vs last month</span>
        </div>
      )}
    </Link>
  );
}

// ── Revenue Chart ───
function RevenueChart({ data }: {
  data: { dateStr: string; label: string; shortDate: string; revenue: number; orders: number }[]
}) {
  const max     = Math.max(...data.map((d) => d.revenue), 1);
  const total   = data.reduce((s, d) => s + d.revenue, 0);
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div>
      {/* Header */}
      <div className="flex items-end justify-between mb-6">
        <div>
          <p className="text-[13px] font-semibold text-[#6b7280]">Revenue — Last 7 Days</p>
          <h3 className="mt-1 text-[26px] font-black text-[#111827]">
            ₹{total.toLocaleString()}
          </h3>
        </div>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-700 flex items-center gap-1 self-start">
          <FiTrendingUp className="text-[11px]" /> Live
        </span>
      </div>

      {/* Bars */}
      <div className="flex items-end gap-2" style={{ height: "120px" }}>
        {data.map((d, i) => {
          const pct      = max > 0 ? (d.revenue / max) * 100 : 0;
          const isToday  = d.label === "Today";
          const isActive = hovered === i || isToday;

          return (
            <div
              key={d.dateStr}
              className="relative flex flex-1 flex-col items-center cursor-pointer"
              style={{ height: "100%" }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Tooltip */}
              {hovered === i && (
                <div className="absolute z-20 w-[120px] rounded-2xl bg-[#111827] px-3 py-2.5 text-center shadow-2xl"
                  style={{ bottom: "calc(100% + 10px)", left: "50%", transform: "translateX(-50%)" }}
                >
                  <p className="text-[10px] font-semibold text-white/50 mb-0.5">{d.shortDate}</p>
                  <p className="text-[14px] font-black text-white">₹{d.revenue.toLocaleString()}</p>
                  <p className="text-[10px] text-white/50 mt-0.5">
                    {d.orders} order{d.orders !== 1 ? "s" : ""}
                  </p>
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-3 w-3 rotate-45 bg-[#111827]" />
                </div>
              )}

              {/* Bar wrapper */}
              <div className="w-full flex items-end rounded-t-lg overflow-hidden" style={{ height: "100px" }}>
                <div
                  className="w-full rounded-t-lg transition-all duration-500"
                  style={{
                    height: d.revenue > 0 ? `${Math.max(pct, 5)}%` : "3px",
                    background: isActive ? "#111827" : "#e5e7eb",
                    opacity: d.revenue === 0 ? 0.3 : 1,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Labels */}
      <div className="flex gap-2 mt-3">
        {data.map((d, i) => (
          <div key={d.dateStr} className="flex-1 text-center">
            <p className={`text-[10px] font-bold leading-tight ${d.label === "Today" ? "text-[#111827]" : "text-[#9ca3af]"}`}>
              {d.label}
            </p>
            <p className="text-[9px] text-[#c9c9c9] mt-0.5">{d.shortDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main Dashboard ───
export default function AdminDashboard() {
  const [products,   setProducts]   = useState<any[]>([]);
  const [users,      setUsers]      = useState<any[]>([]);
  const [orders,     setOrders]     = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading,    setLoading]    = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchAll = async (silent = false) => {
    if (!silent) setLoading(true);
    else setRefreshing(true);
    try {
      const [p, u, o, c] = await Promise.all([
        fetch("/api/products",   { cache: "no-store" }).then((r) => r.json()),
        fetch("/api/users",      { cache: "no-store" }).then((r) => r.json()),
        fetch("/api/orders",     { cache: "no-store" }).then((r) => r.json()),
        fetch("/api/categories", { cache: "no-store" }).then((r) => r.json()),
      ]);
      setProducts(p.products   || []);
      setUsers(u.users         || []);
      setOrders(o.orders       || []);
      setCategories(c.categories || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  // Derived metrics
  const totalRevenue    = useMemo(() => orders.reduce((s, o) => s + (o.totalAmount || 0), 0), [orders]);
  const inventoryValue  = useMemo(() => products.reduce((s, p) => s + (p.price || 0), 0), [products]);
  const processingCount = useMemo(() => orders.filter((o) => o.status === "Processing").length, [orders]);
  const deliveredCount  = useMemo(() => orders.filter((o) => o.status === "Delivered").length, [orders]);
  const cancelledCount  = useMemo(() => orders.filter((o) => o.status === "Cancelled").length, [orders]);
  const shippedCount    = useMemo(() => orders.filter((o) => o.status === "Shipped").length, [orders]);

  // FIXED: proper local-date bucketing
  const chartData = useMemo(() => buildLast7(orders), [orders]);

  // Top selling products
  const topProducts = useMemo(() => {
    const map = new Map<string, { title: string; image: string; qty: number; revenue: number }>();
    orders.forEach((o) => {
      (o.items || []).forEach((item: any) => {
        const key      = item.id || item.title;
        const existing = map.get(key) || { title: item.title, image: item.image, qty: 0, revenue: 0 };
        map.set(key, {
          ...existing,
          qty:     existing.qty + (item.quantity || 1),
          revenue: existing.revenue + (item.totalPrice || 0),
        });
      });
    });
    return Array.from(map.values()).sort((a, b) => b.revenue - a.revenue).slice(0, 5);
  }, [orders]);

  const recentOrders = useMemo(() => orders.slice(0, 8), [orders]);
  const recentUsers  = useMemo(() => users.slice(0, 5),  [users]);

  const greeting = (() => {
    const h = new Date().getHours();
    return h < 12 ? "Good Morning" : h < 17 ? "Good Afternoon" : "Good Evening";
  })();

  if (loading) {
    return (
      <section className="min-h-screen bg-[#f5f7fb] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-[#111827] border-t-transparent rounded-full animate-spin" />
          <p className="text-[13px] text-[#6b7280] font-medium">Loading dashboard...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#f5f7fb]">
      <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">

        {/* HEADER */}
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#c9a96e]">Admin Dashboard</p>
            <h1 className="mt-1 text-[28px] sm:text-[36px] font-black leading-tight text-[#111827]">
              {greeting}
            </h1>
            <p className="mt-1 text-[14px] text-[#6b7280]">Here's what's happening with your store.</p>
          </div>
          <button
            onClick={() => fetchAll(true)}
            disabled={refreshing}
            className="flex items-center gap-2 self-start rounded-full border border-[#e5e7eb] bg-white px-4 py-2.5 text-[13px] font-semibold text-[#111827] shadow-sm hover:bg-[#f3f4f6] transition-all sm:self-auto"
          >
            <FiRefreshCcw className={`text-[14px] ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>

        {/* STAT CARDS */}
        <div className="mb-6 grid grid-cols-2 gap-4 xl:grid-cols-4">
          <StatCard
            label="Total Revenue"
            value={`₹${totalRevenue.toLocaleString()}`}
            sub={`${orders.length} total orders`}
            icon={<FiDollarSign />}
            color="bg-emerald-50 text-emerald-600"
            href="/admin/orders"
            trend={orders.length > 0 ? "Active" : "No orders yet"}
            trendUp={orders.length > 0}
          />
          <StatCard
            label="Total Orders"
            value={orders.length}
            sub={`${processingCount} processing`}
            icon={<FiShoppingBag />}
            color="bg-blue-50 text-blue-600"
            href="/admin/orders"
          />
          <StatCard
            label="Total Products"
            value={products.length}
            sub={`${categories.length} categories`}
            icon={<FiPackage />}
            color="bg-violet-50 text-violet-600"
            href="/admin/products"
          />
          <StatCard
            label="Total Customers"
            value={users.length}
            sub={`${users.filter((u) => u.status !== "Blocked").length} active`}
            icon={<FiUsers />}
            color="bg-amber-50 text-amber-600"
            href="/admin/users"
          />
        </div>

        {/* CHARTS ROW */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

          {/* Revenue Chart */}
          <div className="sm:col-span-2 rounded-[22px] bg-white p-5 shadow-[0_4px_24px_rgba(0,0,0,0.05)]">
            {orders.length === 0 ? (
              <div>
                <p className="text-[13px] font-semibold text-[#6b7280] mb-1">Revenue — Last 7 Days</p>
                <h3 className="text-[26px] font-black text-[#111827] mb-4">₹0</h3>
                <div className="flex h-[120px] items-center justify-center rounded-xl bg-[#f8f9fb]">
                  <p className="text-[13px] text-[#9ca3af]">No revenue data yet — orders will appear here</p>
                </div>
              </div>
            ) : (
              <RevenueChart data={chartData} />
            )}
          </div>

          {/* Order Status */}
          <div className="rounded-[22px] bg-white p-5 shadow-[0_4px_24px_rgba(0,0,0,0.05)]">
            <p className="mb-4 text-[13px] font-semibold text-[#6b7280]">Order Status</p>
            {orders.length === 0 ? (
              <div className="flex h-[100px] items-center justify-center rounded-xl bg-[#f8f9fb]">
                <p className="text-[13px] text-[#9ca3af]">No orders yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {[
                  { label: "Processing", count: processingCount, color: "bg-amber-400" },
                  { label: "Delivered",  count: deliveredCount,  color: "bg-emerald-400" },
                  { label: "Shipped",    count: shippedCount,    color: "bg-blue-400" },
                  { label: "Cancelled",  count: cancelledCount,  color: "bg-red-400" },
                ].map(({ label, count, color }) => (
                  <div key={label}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[12px] font-medium text-[#6b7280]">{label}</span>
                      <span className="text-[12px] font-black text-[#111827]">{count}</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-[#f3f4f6]">
                      <div
                        className={`h-1.5 rounded-full ${color} transition-all duration-700`}
                        style={{ width: `${(count / orders.length) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-5 rounded-xl bg-[#f8f9fb] p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#9ca3af]">Inventory Value</p>
              <p className="mt-1 text-[20px] font-black text-[#111827]">₹{inventoryValue.toLocaleString()}</p>
              <p className="text-[11px] text-[#9ca3af]">{products.length} products</p>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* RECENT ORDERS */}
          <div className="lg:col-span-2 rounded-[22px] bg-white p-5 shadow-[0_4px_24px_rgba(0,0,0,0.05)]">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-[18px] font-black text-[#111827]">Recent Orders</h2>
                <p className="mt-0.5 text-[12px] text-[#6b7280]">{orders.length} total orders</p>
              </div>
              <Link
                href="/admin/orders"
                className="flex items-center gap-1 rounded-full border border-[#e5e7eb] px-3 py-1.5 text-[12px] font-semibold text-[#111827] hover:bg-[#111827] hover:text-white transition-all"
              >
                View All <FiArrowUpRight />
              </Link>
            </div>

            {recentOrders.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <FiShoppingBag className="text-[40px] text-[#e5e7eb] mb-3" />
                <p className="text-[14px] font-semibold text-[#6b7280]">No orders yet</p>
                <p className="mt-1 text-[12px] text-[#9ca3af]">Orders will appear here when customers purchase</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#f3f4f6]">
                      {["Order ID", "Customer", "Amount", "Items", "Status", "Date"].map((h) => (
                        <th key={h} className="pb-3 text-left text-[11px] font-bold uppercase tracking-wider text-[#9ca3af] pr-3">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f8f9fb]">
                    {recentOrders.map((order) => {
                      const s = STATUS_CONFIG[order.status] || STATUS_CONFIG["Processing"];
                      return (
                        <tr key={order._id} className="hover:bg-[#fafafa] transition-colors">
                          <td className="py-3 pr-3">
                            <p className="text-[12px] font-bold text-[#111827]">#{order.orderId?.slice(-6) || "------"}</p>
                          </td>
                          <td className="py-3 pr-3">
                            <p className="text-[12px] font-medium text-[#111827] truncate max-w-[100px]">{order.userEmail?.split("@")[0]}</p>
                          </td>
                          <td className="py-3 pr-3">
                            <p className="text-[13px] font-black text-[#111827]">₹{order.totalAmount?.toLocaleString()}</p>
                          </td>
                          <td className="py-3 pr-3">
                            <p className="text-[12px] text-[#6b7280]">{order.items?.length || 0} items</p>
                          </td>
                          <td className="py-3 pr-3">
                            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold ${s.color}`}>
                              {s.icon}{s.label}
                            </span>
                          </td>
                          <td className="py-3">
                            <p className="text-[11px] text-[#9ca3af]">
                              {new Date(order.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })}
                            </p>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-6">

            {/* TOP PRODUCTS */}
            <div className="rounded-[22px] bg-white p-5 shadow-[0_4px_24px_rgba(0,0,0,0.05)]">
              <h2 className="mb-4 text-[18px] font-black text-[#111827]">Top Products</h2>
              {topProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <FiPackage className="text-[32px] text-[#e5e7eb] mb-2" />
                  <p className="text-[12px] text-[#9ca3af]">No sales data yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {topProducts.map((p, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-[11px] font-black text-[#9ca3af] w-4 shrink-0">{i + 1}</span>
                      <div
                        className="h-10 w-10 shrink-0 rounded-xl bg-[#f3f4f6] bg-cover bg-center"
                        style={{ backgroundImage: p.image ? `url(${p.image})` : undefined }}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[12px] font-bold text-[#111827]">{p.title}</p>
                        <p className="text-[11px] text-[#9ca3af]">{p.qty} sold</p>
                      </div>
                      <p className="shrink-0 text-[12px] font-black text-[#111827]">₹{p.revenue.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* RECENT CUSTOMERS */}
            <div className="rounded-[22px] bg-white p-5 shadow-[0_4px_24px_rgba(0,0,0,0.05)]">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-[18px] font-black text-[#111827]">New Customers</h2>
                <Link href="/admin/users" className="text-[12px] font-semibold text-[#c9a96e] hover:text-[#111827] transition-colors">
                  View All
                </Link>
              </div>
              {recentUsers.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <FiUsers className="text-[32px] text-[#e5e7eb] mb-2" />
                  <p className="text-[12px] text-[#9ca3af]">No customers yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentUsers.map((user) => (
                    <Link
                      key={user._id}
                      href={`/admin/users/${user._id}`}
                      className="flex items-center gap-3 rounded-xl p-2 hover:bg-[#fafafa] transition-colors"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#111827] text-[12px] font-black text-white">
                        {user.name?.[0]?.toUpperCase() || "U"}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[13px] font-bold text-[#111827]">{user.name}</p>
                        <p className="truncate text-[11px] text-[#9ca3af]">{user.email}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-[11px] font-bold text-[#111827]">₹{(user.spent || 0).toLocaleString()}</p>
                        <p className="text-[10px] text-[#9ca3af]">{user.orders || 0} orders</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>

        {/* BOTTOM BANNER */}
        <div className="mt-6 rounded-[22px] bg-[#111827] p-6 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[3px] text-[#c9a96e]">Store Overview</p>
              <h2 className="mt-2 text-[22px] sm:text-[26px] font-black text-white">
                {products.length} Products · {categories.length} Categories · {users.length} Customers
              </h2>
              <p className="mt-1 text-[13px] text-white/50">
                Inventory: ₹{inventoryValue.toLocaleString()} · Revenue: ₹{totalRevenue.toLocaleString()}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/products" className="flex h-[44px] items-center gap-2 rounded-full bg-white px-5 text-[13px] font-bold text-[#111827] hover:bg-[#c9a96e] transition-colors">
                View Store
              </Link>
              <Link href="/admin/products" className="flex h-[44px] items-center gap-2 rounded-full border border-white/20 px-5 text-[13px] font-bold text-white hover:bg-white/10 transition-colors">
                <FiGrid /> Manage
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}