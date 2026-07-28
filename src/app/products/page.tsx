"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  FiSearch,
  FiSliders,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiX,
  FiGrid,
  FiCheck,
} from "react-icons/fi";

// import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import ProductCard from "@/components/products/ProductCard";

import { useSearchParams } from "next/navigation";

const PRODUCTS_PER_PAGE = 16;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
      delay,
    },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
      delay,
    },
  }),
};

const slideLeft = {
  hidden: { opacity: 0, x: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
      delay,
    },
  }),
};

const gridContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

const gridItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const sortOptions = [
  { value: "default", label: "Default Sorting" },
  { value: "low", label: "Price Low To High" },
  { value: "high", label: "Price High To Low" },
  { value: "rating", label: "Top Rated" },
];

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const categoryFromURL = searchParams?.get("category");

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  // FETCH PRODUCTS
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetch("/api/products", { cache: "no-store" });
        const data = await res.json();
        if (data.success) {
          setProducts(data.products);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  // FETCH CATEGORIES FROM MongoDB
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await fetch("/api/categories", { cache: "no-store" });
        const data = await res.json();
        if (data.success && data.categories.length > 0) {
          const names = data.categories.map((c: any) => c.name);
          setCategories(["All", ...names]);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    loadCategories();
  }, []);

  // CATEGORY FROM URL
  useEffect(() => {
    if (categoryFromURL) {
      setSelectedCategory(decodeURIComponent(categoryFromURL));
    }
  }, [categoryFromURL]);

  // CLOSE SORT DROPDOWN ON OUTSIDE CLICK
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // FILTERED PRODUCTS
  const filteredProducts = useMemo(() => {
    if (!Array.isArray(products)) return [];

    let filtered = products.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "All"
          ? true
          : product.category?.trim().toLowerCase() === selectedCategory.trim().toLowerCase();

      return matchesSearch && matchesCategory;
    });

    if (sortBy === "low") filtered.sort((a, b) => a.price - b.price);
    if (sortBy === "high") filtered.sort((a, b) => b.price - a.price);
    if (sortBy === "rating") filtered.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));

    return filtered;
  }, [products, search, selectedCategory, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(start, start + PRODUCTS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const pageNumbers = useMemo(() => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 4) return [1, 2, 3, 4, 5, "...", totalPages];
    if (currentPage >= totalPages - 3)
      return [1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
  }, [currentPage, totalPages]);

  const activeFilterCount =
    (search ? 1 : 0) + (selectedCategory !== "All" ? 1 : 0) + (sortBy !== "default" ? 1 : 0);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const goToPage = (page: number) => {
    setCurrentPage(page);
    scrollToTop();
  };

  const clearAllFilters = () => {
    setSearch("");
    setSelectedCategory("All");
    setSortBy("default");
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <>
        <section className="min-h-screen bg-[#f8f5f0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-16 sm:pb-20">
            {/* Skeleton heading */}
            <div className="mb-10 sm:mb-12 animate-pulse">
              <div className="h-3 w-40 bg-[#e5ddd0] rounded-full mb-6" />
              <div className="h-16 sm:h-20 w-2/3 bg-[#e5ddd0] rounded-2xl mb-4" />
              <div className="h-4 w-1/2 bg-[#e5ddd0] rounded-full" />
            </div>
            {/* Skeleton filter bar */}
            <div className="bg-white rounded-2xl md:rounded-3xl border border-black/5 p-4 sm:p-5 mb-7 animate-pulse">
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <div className="flex-1 h-12 md:h-13 bg-[#f0ece3] rounded-xl" />
                <div className="w-full sm:w-52.5 h-12 md:h-13 bg-[#f0ece3] rounded-xl" />
              </div>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-9 md:h-10 w-24 bg-[#f0ece3] rounded-[10px]" />
                ))}
              </div>
            </div>
            {/* Skeleton grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="rounded-[28px] bg-[#e5ddd0] h-[320px] mb-3" />
                  <div className="h-3 bg-[#e5ddd0] rounded-full w-1/3 mb-2" />
                  <div className="h-5 bg-[#e5ddd0] rounded-full w-3/4 mb-4" />
                  <div className="h-6 bg-[#e5ddd0] rounded-full w-1/4" />
                </div>
              ))}
            </div>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>

      <section className="min-h-screen bg-[#f8f5f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-16 sm:pb-20">

          {/* HEADING */}
          <div className="mb-10 sm:mb-12">
            <motion.p
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              custom={0}
              className="flex items-center gap-3 text-[11px] uppercase tracking-[4px] text-[#c9a96e] font-medium mt-10 sm:mt-14 mb-4 sm:mb-5"
            >
              <motion.span
                className="w-5 h-px bg-[#c9a96e] block"
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.2 }}
              />
              Luxury Collection
              <motion.span
                className="w-5 h-px bg-[#c9a96e] block"
                initial={{ scaleX: 0, originX: 1 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.2 }}
              />
            </motion.p>

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 sm:gap-5 mb-8 sm:mb-10">
              <div className="overflow-hidden">
                <motion.h1
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={0.15}
                  className="font-bold text-[#1a1a18] leading-none tracking-[-2px] text-[clamp(44px,8vw,80px)]"
                >
                  Explore
                  <br />
                  <motion.span
                    className="inline-block"
                    style={{
                      WebkitTextStroke: "2px #1a1a18",
                      WebkitTextFillColor: "transparent",
                    }}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.8,
                      ease: [0.22, 1, 0.36, 1] as const,
                      delay: 0.35,
                    }}
                  >
                    Products
                  </motion.span>
                </motion.h1>
              </div>

              <motion.p
                variants={slideLeft}
                initial="hidden"
                animate="visible"
                custom={0.45}
                className="text-[14px] sm:text-[15px] text-[#6b6560] leading-[1.8] mb-2 sm:mb-2.5 md:text-right md:max-w-90"
              >
                Discover premium ceramic and marble decor handcrafted for elegant
                interiors, timeless beauty, and sophisticated modern living.
              </motion.p>
            </div>
          </div>

          {/* FILTERS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white rounded-2xl md:rounded-3xl border border-black/5 p-4 sm:p-5 mb-6 sm:mb-7 shadow-[0_4px_24px_rgba(0,0,0,0.03)]"
          >
            <div className="flex flex-col sm:flex-row gap-3 mb-4">

              {/* SEARCH */}
              <div className="flex-1 flex items-center gap-3 bg-[#f7f4ef] rounded-xl h-12 md:h-13 px-4 sm:px-4.5 transition-all duration-300 focus-within:ring-2 focus-within:ring-[#c9a96e]/40 focus-within:bg-white focus-within:border focus-within:border-[#c9a96e]/50">
                <FiSearch className="text-[#9a8f82] shrink-0" />
                <input
                  type="text"
                  placeholder="Search luxury products..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="bg-transparent outline-none w-full text-[#1a1a18]"
                />
                <AnimatePresence>
                  {search && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.7 }}
                      onClick={() => { setSearch(""); setCurrentPage(1); }}
                      className="w-5 h-5 rounded-full bg-[#e0dacd] flex items-center justify-center text-[#6b6560] shrink-0 hover:bg-[#1a1a18] hover:text-white transition-colors duration-200"
                    >
                      <FiX className="text-[11px]" />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

              {/* SORT — Custom Dropdown */}
              <div className="relative w-full sm:w-56" ref={sortRef}>
                <button
                  onClick={() => setSortOpen((prev) => !prev)}
                  className={`flex items-center gap-3 w-full h-12 md:h-13 rounded-xl px-4 sm:px-4.5 transition-all duration-300 ${
                    sortOpen
                      ? "bg-white border border-[#c9a96e]/60 ring-2 ring-[#c9a96e]/30"
                      : "bg-[#f7f4ef] border border-transparent hover:border-black/10"
                  }`}
                >
                  <FiSliders className={`shrink-0 transition-colors duration-300 ${sortOpen ? "text-[#c9a96e]" : "text-[#9a8f82]"}`} />
                  <span className="text-[13px] sm:text-[14px] font-medium text-[#1a1a18] flex-1 text-left truncate">
                    {sortOptions.find((o) => o.value === sortBy)?.label}
                  </span>
                  <motion.span
                    animate={{ rotate: sortOpen ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <FiChevronDown className="text-[#9a8f82]" />
                  </motion.span>
                </button>

                <AnimatePresence>
                  {sortOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.98 }}
                      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white rounded-xl border border-black/5 shadow-[0_16px_40px_rgba(26,26,24,0.12)] overflow-hidden z-30 py-1.5"
                    >
                      {sortOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => {
                            setSortBy(option.value);
                            setCurrentPage(1);
                            setSortOpen(false);
                          }}
                          className={`flex items-center justify-between w-full text-left px-4 py-2.5 text-[13px] sm:text-[14px] transition-colors duration-150 ${
                            sortBy === option.value
                              ? "bg-[#f7f4ef] text-[#1a1a18] font-semibold"
                              : "text-[#4a4540] hover:bg-[#f7f4ef]/70"
                          }`}
                        >
                          {option.label}
                          {sortBy === option.value && (
                            <FiCheck className="text-[#c9a96e] text-[14px]" />
                          )}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* CATEGORIES */}
            <div className="flex flex-wrap items-center gap-2">
              <FiGrid className="text-[#c4b8a3] text-[15px] mr-1 hidden sm:block" />
              {categories.map((cat) => (
                <motion.button
                  key={cat}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setCurrentPage(1);
                  }}
                  className={`h-9 md:h-10 rounded-[10px] border text-[13px] md:text-[14px] font-medium transition-all duration-250 px-3 sm:px-4 ${
                    selectedCategory === cat
                      ? "bg-[#1a1a18] text-white border-[#1a1a18] shadow-[0_4px_14px_rgba(26,26,24,0.25)]"
                      : "bg-transparent text-[#4a4540] border-black/10 hover:bg-[#f7f4ef] hover:border-black/20"
                  }`}
                >
                  {cat}
                </motion.button>
              ))}

              <AnimatePresence>
                {activeFilterCount > 0 && (
                  <motion.button
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    onClick={clearAllFilters}
                    className="h-9 md:h-10 rounded-[10px] text-[12px] md:text-[13px] font-semibold text-[#b0473c] hover:text-white hover:bg-[#b0473c] border border-[#b0473c]/30 transition-all duration-250 px-3 sm:px-4 flex items-center gap-1.5 ml-1"
                  >
                    <FiX className="text-[12px]" />
                    Clear
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* RESULT COUNT */}
          {filteredProducts.length > 0 && (
            <p className="text-[13px] text-[#8a8175] mb-5 -mt-1">
              Showing <span className="font-semibold text-[#1a1a18]">{paginatedProducts.length}</span> of{" "}
              <span className="font-semibold text-[#1a1a18]">{filteredProducts.length}</span> products
              {selectedCategory !== "All" && (
                <> in <span className="font-semibold text-[#1a1a18]">{selectedCategory}</span></>
              )}
            </p>
          )}

          {/* PRODUCTS GRID */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedCategory}-${sortBy}-${search}-${currentPage}`}
              variants={gridContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-8"
            >
              {paginatedProducts.map((product) => (
                <motion.div key={product._id || product.id} variants={gridItem}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* EMPTY STATE */}
          {!loading && filteredProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white text-center rounded-[28px] sm:rounded-4xl px-5 sm:px-6 py-14 sm:py-16"
            >
              <div className="w-16 h-16 rounded-full bg-[#f7f4ef] flex items-center justify-center mx-auto mb-5">
                <FiSearch className="text-[26px] text-[#c4b8a3]" />
              </div>
              <h2 className="font-bold text-black text-3xl mb-3">No Products Found</h2>
              <p className="text-[#8a8175] text-[14px] mb-7 max-w-sm mx-auto">
                We couldn't find anything matching your filters. Try adjusting your search or browse all products.
              </p>
              <button
                onClick={clearAllFilters}
                className="h-12.5 rounded-full px-8 font-medium bg-black text-white hover:bg-[#2a2420] transition-colors duration-300"
              >
                Reset Filters
              </button>
            </motion.div>
          )}

          {/* PAGINATION */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center flex-wrap gap-2 mt-12 sm:mt-16"
            >
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center gap-2 font-medium text-[14px] h-11 rounded-xl px-4 border border-black/10 bg-white disabled:opacity-40 disabled:cursor-not-allowed hover:enabled:bg-[#1a1a18] hover:enabled:text-white hover:enabled:border-[#1a1a18] transition-all duration-250"
              >
                <FiChevronLeft size={16} />
                Prev
              </button>

              {pageNumbers.map((page, i) =>
                page === "..." ? (
                  <span key={i} className="px-2 text-[#8a8175]">···</span>
                ) : (
                  <motion.button
                    key={page}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => goToPage(page as number)}
                    className={`w-11 h-11 rounded-xl font-medium transition-all duration-250 ${
                      currentPage === page
                        ? "bg-black text-white shadow-[0_4px_14px_rgba(0,0,0,0.25)]"
                        : "bg-white border border-black/10 hover:bg-[#f7f4ef] hover:border-black/20"
                    }`}
                  >
                    {page}
                  </motion.button>
                )
              )}

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center gap-2 font-medium text-[14px] h-11 rounded-xl px-4 border border-black/10 bg-white disabled:opacity-40 disabled:cursor-not-allowed hover:enabled:bg-[#1a1a18] hover:enabled:text-white hover:enabled:border-[#1a1a18] transition-all duration-250"
              >
                Next
                <FiChevronRight size={16} />
              </button>
            </motion.div>
          )}

        </div>
      </section>

      <Footer />
    </>
  );
}