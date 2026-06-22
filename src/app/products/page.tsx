"use client";

import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";

import {
  FiSearch,
  FiSliders,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

import Navbar from "@/components/navbar/Navbar";
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
      const formattedCategory =
        categoryFromURL === "vases"
          ? "Vases"
          : categoryFromURL === "showpieces"
          ? "Showpieces"
          : categoryFromURL === "idols"
          ? "Handcraft Idols"
          : categoryFromURL === "buddha-monk"
          ? "Buddha & Monk"
          : categoryFromURL === "luxury-sculptures"
          ? "Luxury Sculptures"
          : categoryFromURL === "divine"
          ? "Divine Collection"
          : categoryFromURL === "ganesh"
          ? "Divine Collection"
          : "All";
      setSelectedCategory(formattedCategory);
    }
  }, [categoryFromURL]);

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
          : product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    if (sortBy === "low") filtered.sort((a, b) => a.price - b.price);
    if (sortBy === "high") filtered.sort((a, b) => b.price - a.price);

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

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const goToPage = (page: number) => {
    setCurrentPage(page);
    scrollToTop();
  };

  if (loading) {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#f8f5f0] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-[#e5ddd0] border-t-[#c9a96e] rounded-full animate-spin"></div>

        <p className="text-sm font-medium text-gray-500 tracking-wide">
          Loading Product...
        </p>
      </div>
      <Footer />
    </>
  );
}

  return (
    <>
      <Navbar />

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
          <div className="bg-white rounded-2xl md:rounded-3xl border border-black/5 p-4 sm:p-5 mb-6 sm:mb-7">
            <div className="flex flex-col sm:flex-row gap-3 mb-4">

              {/* SEARCH */}
              <div className="flex-1 flex items-center gap-3 bg-[#f7f4ef] rounded-xl h-12 md:h-13 px-4 sm:px-4.5">
                <FiSearch className="text-[#9a8f82]" />
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
              </div>

              {/* SORT */}
              <div className="flex items-center gap-3 bg-[#f7f4ef] rounded-xl h-12 md:h-13 relative w-full sm:w-52.5 px-4 sm:px-4.5">
                <FiSliders className="text-[#9a8f82]" />
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="bg-transparent outline-none appearance-none w-full"
                >
                  <option value="default">Default Sorting</option>
                  <option value="low">Price Low To High</option>
                  <option value="high">Price High To Low</option>
                  <option value="rating">Top Rated</option>
                </select>
                <FiChevronDown className="absolute right-4 text-[#9a8f82]" />
              </div>
            </div>

            {/* CATEGORIES */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setCurrentPage(1);
                  }}
                  className={`h-9 md:h-10 rounded-[10px] border text-[13px] md:text-[14px] font-medium transition-all duration-200 px-3 sm:px-4 ${
                    selectedCategory === cat
                      ? "bg-[#1a1a18] text-white border-[#1a1a18]"
                      : "bg-transparent text-[#4a4540] border-black/10 hover:bg-[#f7f4ef]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* PRODUCTS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-8">
            {paginatedProducts.map((product) => (
              <ProductCard key={product._id || product.id} product={product} />
            ))}
          </div>

          {/* EMPTY STATE */}
          {!loading && filteredProducts.length === 0 && (
            <div className="bg-white text-center rounded-[28px] sm:rounded-4xl px-5 sm:px-6 py-14 sm:py-16">
              <h2 className="font-bold text-black text-3xl mb-3">No Products Found</h2>
              <button
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("All");
                  setSortBy("default");
                }}
                className="h-12.5 rounded-full px-8 font-medium bg-black text-white"
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center flex-wrap gap-2 mt-12 sm:mt-16">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center gap-2 font-medium text-[14px] h-11 rounded-xl px-4 border border-black/10 bg-white disabled:opacity-50"
              >
                <FiChevronLeft size={16} />
                Prev
              </button>

              {pageNumbers.map((page, i) =>
                page === "..." ? (
                  <span key={i} className="px-2">...</span>
                ) : (
                  <button
                    key={page}
                    onClick={() => goToPage(page as number)}
                    className={`w-11 h-11 rounded-xl ${
                      currentPage === page
                        ? "bg-black text-white"
                        : "bg-white border border-black/10"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center gap-2 font-medium text-[14px] h-11 rounded-xl px-4 border border-black/10 bg-white disabled:opacity-50"
              >
                Next
                <FiChevronRight size={16} />
              </button>
            </div>
          )}

        </div>
      </section>

      <Footer />
    </>
  );
}