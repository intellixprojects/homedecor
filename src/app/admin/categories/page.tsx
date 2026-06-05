"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import {
  FiGrid,
  FiPackage,
  FiTag,
  FiTrendingUp,
  FiMoreVertical,
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiX,
  FiAlertTriangle,
  FiCheck,
  FiSearch,
  FiInbox,
} from "react-icons/fi";

type CategoryStat = {
  name: string;
  count: number;
  totalValue: number;
  avgPrice: number;
  topProduct: string;
  topImage: string;
};

type DbCategory = {
  _id: string;
  name: string;
};

const COLORS = [
  "bg-violet-100 text-violet-700",
  "bg-amber-100  text-amber-700",
  "bg-emerald-100 text-emerald-700",
  "bg-blue-100   text-blue-700",
  "bg-rose-100   text-rose-700",
  "bg-orange-100 text-orange-700",
];

function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-[#eef0f3] bg-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.04)] animate-pulse">
      <div className="flex items-start gap-3">
        <div className="h-[52px] w-[52px] shrink-0 rounded-xl bg-[#f3f4f6]" />
        <div className="flex-1 space-y-2 pt-1">
          <div className="h-4 w-2/3 rounded-full bg-[#f3f4f6]" />
          <div className="h-3 w-1/3 rounded-full bg-[#f3f4f6]" />
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="h-14 rounded-xl bg-[#f3f4f6]" />
        <div className="h-14 rounded-xl bg-[#f3f4f6]" />
      </div>
    </div>
  );
}

function EmptyState({ query, onAdd }: { query: string; onAdd: () => void }) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f3f4f6] text-[28px] text-[#9ca3af]">
        <FiInbox />
      </div>
      <h3 className="mt-4 text-[18px] font-black text-[#111827]">
        {query ? `No results for "${query}"` : "No categories yet"}
      </h3>
      <p className="mt-2 max-w-xs text-[13px] text-[#6b7280]">
        {query ? "Try a different search term." : "Add your first category to start organising your products."}
      </p>
      {!query && (
        <button
          onClick={onAdd}
          className="mt-5 flex items-center gap-2 rounded-full bg-[#111827] px-5 py-3 text-[13px] font-bold text-white transition hover:bg-[#c9a96e] hover:text-black"
        >
          <FiPlus />
          Add Category
        </button>
      )}
    </div>
  );
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<CategoryStat[]>([]);
  const [dbCategories, setDbCategories] = useState<DbCategory[]>([]); // MongoDB categories with _id
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [deleteConfirmName, setDeleteConfirmName] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editCategory, setEditCategory] = useState<string | null>(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [error, setError] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node))
        setOpenMenuId(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    loadAll();
  }, []);

  // FETCH BOTH — categories from DB + products for stats
  const loadAll = async () => {
    setLoading(true);
    try {
      const [catRes, prodRes] = await Promise.all([
        fetch("/api/categories", { cache: "no-store" }),
        fetch("/api/products", { cache: "no-store" }),
      ]);
      const catData = await catRes.json();
      const prodData = await prodRes.json();

      const dbCats: DbCategory[] = catData.success ? catData.categories : [];
      const prods = prodData.products || [];

      setDbCategories(dbCats);
      buildCategories(dbCats, prods);
    } catch {
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  const buildCategories = (dbCats: DbCategory[], prods: any[]) => {
    const map = new Map<string, any[]>();

    // Initialize from DB categories
    dbCats.forEach((c) => map.set(c.name, []));

    // Add products to their categories
    prods.forEach((p) => {
      const cat = p.category || "Uncategorized";
      if (!map.has(cat)) map.set(cat, []);
      map.get(cat)!.push(p);
    });

    const built: CategoryStat[] = Array.from(map.entries()).map(([name, items]) => {
      const totalValue = items.reduce((s, p) => s + (p.price || 0), 0);
      const avgPrice = items.length ? Math.round(totalValue / items.length) : 0;
      const top = [...items].sort((a, b) => (b.rating || 0) - (a.rating || 0))[0];
      return {
        name,
        count: items.length,
        totalValue,
        avgPrice,
        topProduct: top?.title || "",
        topImage: top?.image || "",
      };
    });

    setCategories(built);
  };

  // STATS
  const totalCategories = categories.length;
  const totalProducts = categories.reduce((s, c) => s + c.count, 0);
  const totalValue = categories.reduce((s, c) => s + c.totalValue, 0);
  const largestCategory = categories.length
    ? categories.reduce((a, b) => (a.count > b.count ? a : b))
    : null;

  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => { setShowAddModal(true); setNewCategoryName(""); setError(""); };
  const closeModal = () => { setShowAddModal(false); setEditCategory(null); setError(""); };

  // ✅ ADD CATEGORY — MongoDB me save
  const handleAddCategory = async () => {
    const name = newCategoryName.trim();
    if (!name) { setError("Category name is required."); return; }

    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();

      if (!data.success) { setError(data.message); return; }

      await loadAll(); // Refresh
      setNewCategoryName("");
      setShowAddModal(false);
      setError("");
    } catch {
      setError("Failed to add category.");
    }
  };

  // ✅ RENAME CATEGORY — MongoDB me update
  const handleRename = async () => {
    const name = newCategoryName.trim();
    if (!name) { setError("Name is required."); return; }

    const dbCat = dbCategories.find((c) => c.name === editCategory);
    if (!dbCat) { setError("Category not found."); return; }

    try {
      const res = await fetch(`/api/categories/${dbCat._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();

      if (!data.success) { setError(data.message); return; }

      await loadAll(); // Refresh
      setEditCategory(null);
      setNewCategoryName("");
      setError("");
    } catch {
      setError("Failed to rename category.");
    }
  };

  // ✅ DELETE CATEGORY — MongoDB se delete
  const handleDelete = async (name: string) => {
    const dbCat = dbCategories.find((c) => c.name === name);
    if (!dbCat) {
      setCategories((prev) => prev.filter((c) => c.name !== name));
      setDeleteConfirmName(null);
      return;
    }

    try {
      const res = await fetch(`/api/categories/${dbCat._id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        await loadAll(); // Refresh
      }
    } catch {
      console.error("Failed to delete category");
    }
    setDeleteConfirmName(null);
  };

  return (
    <section className="min-h-screen bg-[#f5f7fb]">
      <div className="mx-auto max-w-6xl px-3 py-4 sm:px-4 sm:py-5 lg:px-6">

        {/* HEADER */}
        <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="mb-2 text-[9px] sm:text-[10px] font-bold uppercase tracking-[3px] text-[#c9a96e]">
              Admin Dashboard
            </p>
            <h1 className="text-[26px] leading-none sm:text-[34px] lg:text-[42px] font-black text-[#111827]">
              Categories
            </h1>
            <p className="mt-2 max-w-xl text-[12px] sm:text-[13px] leading-6 text-[#6b7280]">
              Manage your product categories, track inventory and monitor performance.
            </p>
          </div>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 self-start rounded-full bg-[#111827] px-5 py-3 text-[13px] font-bold text-white transition hover:bg-[#c9a96e] hover:text-black lg:self-auto"
          >
            <FiPlus className="text-[16px]" />
            Add Category
          </button>
        </div>

        {/* STATS */}
        <div className="mb-5 grid grid-cols-2 gap-3 xl:grid-cols-4">
          {[
            { label: "Total Categories", value: totalCategories, icon: <FiGrid /> },
            { label: "Total Products", value: totalProducts, icon: <FiPackage /> },
            { label: "Total Value", value: `₹${totalValue.toLocaleString()}`, icon: <FiTrendingUp /> },
            { label: "Largest Category", value: largestCategory?.name ?? "—", icon: <FiTag /> },
          ].map(({ label, value, icon }) => (
            <div key={label} className="rounded-2xl bg-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[12px] font-medium text-[#6b7280]">{label}</p>
                  <h2 className="mt-2 text-[20px] sm:text-[24px] font-black text-[#111827] leading-tight">
                    {loading
                      ? <span className="inline-block h-6 w-16 animate-pulse rounded-full bg-[#f3f4f6]" />
                      : value}
                  </h2>
                </div>
                <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-[#f3f4f6] text-[20px] text-[#111827]">
                  {icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SEARCH */}
        <div className="mb-4 flex items-center gap-3">
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9ca3af] text-[15px]" />
            <input
              type="text"
              placeholder="Search categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-[44px] w-full rounded-2xl border border-[#e5e7eb] bg-white pl-10 pr-4 text-[13px] text-[#111827] placeholder:text-[#9ca3af] outline-none focus:border-[#111827] transition"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-full bg-[#f3f4f6] text-[#6b7280] hover:bg-[#111827] hover:text-white transition"
              >
                <FiX className="text-[12px]" />
              </button>
            )}
          </div>
          <p className="shrink-0 text-[12px] font-medium text-[#9ca3af]">
            {filtered.length} {filtered.length === 1 ? "category" : "categories"}
          </p>
        </div>

        {/* CATEGORIES GRID */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
            : filtered.length === 0
            ? <EmptyState query={search} onAdd={openAdd} />
            : filtered.map((cat, i) => {
                const pct = totalProducts > 0 ? Math.round((cat.count / totalProducts) * 100) : 0;

                return (
                  <div
                    key={cat.name}
                    className="rounded-2xl border border-[#eef0f3] bg-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_14px_30px_rgba(0,0,0,0.08)]"
                  >
                    {/* TOP ROW */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="relative h-[52px] w-[52px] shrink-0 overflow-hidden rounded-xl bg-[#f3f4f6]">
                          {cat.topImage ? (
                            <Image src={cat.topImage} alt={cat.name} fill className="object-cover" />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-[20px] font-black text-[#9ca3af]">
                              {cat.name[0]}
                            </div>
                          )}
                        </div>
                        <div>
                          <h3 className="text-[16px] font-black text-[#111827]">{cat.name}</h3>
                          <span className={`mt-1 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold ${COLORS[i % COLORS.length]}`}>
                            {cat.count} {cat.count === 1 ? "product" : "products"}
                          </span>
                        </div>
                      </div>

                      {/* 3-dot menu */}
                      <div className="relative" ref={openMenuId === cat.name ? menuRef : null}>
                        <button
                          onClick={() => setOpenMenuId(openMenuId === cat.name ? null : cat.name)}
                          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#dbe1ea] bg-white text-[#111827] hover:bg-[#f3f4f6] transition-all"
                        >
                          <FiMoreVertical />
                        </button>
                        {openMenuId === cat.name && (
                          <div className="absolute right-0 top-11 z-50 w-[180px] overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                            <button
                              onClick={() => { setEditCategory(cat.name); setNewCategoryName(cat.name); setError(""); setOpenMenuId(null); }}
                              className="flex w-full items-center gap-3 px-4 py-3 text-[13px] font-medium text-[#111827] hover:bg-[#f3f4f6] transition-colors"
                            >
                              <FiEdit2 className="text-[14px] text-[#6b7280]" /> Rename
                            </button>
                            <div className="h-px bg-[#f3f4f6]" />
                            <button
                              onClick={() => { setDeleteConfirmName(cat.name); setOpenMenuId(null); }}
                              className="flex w-full items-center gap-3 px-4 py-3 text-[13px] font-medium text-red-600 hover:bg-red-50 transition-colors"
                            >
                              <FiTrash2 className="text-[14px]" /> Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* STATS */}
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <div className="rounded-xl bg-[#f8f9fb] p-3">
                        <p className="text-[10px] font-medium uppercase tracking-[1px] text-[#9ca3af]">Total Value</p>
                        <h4 className="mt-1 text-[15px] font-black text-[#111827]">
                          ₹{cat.totalValue.toLocaleString()}
                        </h4>
                      </div>
                      <div className="rounded-xl bg-[#f8f9fb] p-3">
                        <p className="text-[10px] font-medium uppercase tracking-[1px] text-[#9ca3af]">Avg Price</p>
                        <h4 className="mt-1 text-[15px] font-black text-[#111827]">
                          {cat.avgPrice ? `₹${cat.avgPrice}` : "—"}
                        </h4>
                      </div>
                    </div>

                    {/* PROGRESS BAR */}
                    <div className="mt-3">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-[10px] font-medium uppercase tracking-[1px] text-[#9ca3af]">Share of catalogue</p>
                        <p className="text-[10px] font-bold text-[#111827]">{pct}%</p>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-[#f3f4f6]">
                        <div
                          className="h-1.5 rounded-full bg-[#111827] transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>

                    {/* TOP PRODUCT */}
                    {cat.topProduct ? (
                      <div className="mt-3 rounded-xl border border-[#eef0f3] bg-[#fcfcfc] px-3 py-2.5">
                        <p className="text-[10px] font-medium uppercase tracking-[1px] text-[#9ca3af]">Top Product</p>
                        <p className="mt-0.5 truncate text-[12px] font-semibold text-[#111827]">{cat.topProduct}</p>
                      </div>
                    ) : (
                      <div className="mt-3 rounded-xl border border-dashed border-[#e5e7eb] px-3 py-2.5">
                        <p className="text-[12px] text-[#9ca3af]">No products yet</p>
                      </div>
                    )}
                  </div>
                );
              })}
        </div>
      </div>

      {/* ADD / RENAME MODAL */}
      {(showAddModal || editCategory) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-[24px] bg-white p-6 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-[20px] font-black text-[#111827]">
                {editCategory ? "Rename Category" : "Add Category"}
              </h2>
              <button
                onClick={closeModal}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f3f4f6] text-[#111827] hover:bg-[#111827] hover:text-white transition"
              >
                <FiX />
              </button>
            </div>

            <input
              type="text"
              placeholder="Category name..."
              value={newCategoryName}
              onChange={(e) => { setNewCategoryName(e.target.value); setError(""); }}
              onKeyDown={(e) => e.key === "Enter" && (editCategory ? handleRename() : handleAddCategory())}
              className="h-[48px] w-full rounded-2xl border border-[#e5e7eb] bg-[#fafafa] px-4 text-[14px] outline-none focus:border-[#111827] transition"
              autoFocus
            />
            {error && <p className="mt-2 text-[12px] text-red-500">{error}</p>}

            <div className="mt-4 flex gap-3">
              <button
                onClick={closeModal}
                className="flex h-[48px] flex-1 items-center justify-center rounded-full border border-[#e5e7eb] text-[14px] font-semibold text-[#111827] hover:bg-[#f3f4f6] transition"
              >
                Cancel
              </button>
              <button
                onClick={editCategory ? handleRename : handleAddCategory}
                className="flex h-[48px] flex-1 items-center justify-center gap-2 rounded-full bg-[#111827] text-[14px] font-bold text-white hover:bg-[#c9a96e] hover:text-black transition"
              >
                <FiCheck />
                {editCategory ? "Save" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRM */}
      {deleteConfirmName && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-[24px] bg-white p-6 shadow-2xl">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-500 text-[24px]">
              <FiAlertTriangle />
            </div>
            <h2 className="text-[22px] font-black text-[#111827]">Delete Category?</h2>
            <p className="mt-2 text-[14px] text-[#6b7280]">
              Are you sure you want to delete{" "}
              <span className="font-bold text-[#111827]">"{deleteConfirmName}"</span>?
              This won't delete the products inside it.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setDeleteConfirmName(null)}
                className="flex h-[48px] flex-1 items-center justify-center rounded-full border border-[#e5e7eb] text-[14px] font-semibold text-[#111827] hover:bg-[#f3f4f6] transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmName)}
                className="flex h-[48px] flex-1 items-center justify-center rounded-full bg-red-500 text-[14px] font-bold text-white hover:bg-red-600 transition"
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