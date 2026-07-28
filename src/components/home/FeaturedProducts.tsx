"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowUpRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import ProductCard from "../products/ProductCard";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  },
};

export default function FeaturedProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products", { cache: "no-store" });
        const data = await res.json();
        if (data.success) {
          const featured = data.products
            .filter((p: any) => p.isFeatured)
            .sort(
              (a: any, b: any) =>
                new Date(a.featuredAt).getTime() - new Date(b.featuredAt).getTime()
            );
          setProducts(featured);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  const updateScrollButtons = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    updateScrollButtons();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollButtons);
    window.addEventListener("resize", updateScrollButtons);
    return () => {
      el.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, [products]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector("[data-card]")?.clientWidth || 280;
    const gap = 24;
    const scrollAmount = (cardWidth + gap) * 2;
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  if (products.length === 0) return null;

  return (
    <section
      className="bg-[#f8f5f0] rounded-[40px] overflow-hidden"
      style={{ padding: "40px 0 80px" }}
    >
      <div className="container-custom">

        {/* Header */}
        <div
          className="flex items-end justify-between flex-wrap gap-6"
          style={{ marginBottom: "60px" }}
        >
          <div>
            <div
              className="flex items-center gap-3"
              style={{ marginBottom: "12px", marginLeft: "6px" }}
            >
              <span className="w-5 h-px bg-[#c9a96e]" />
              <p className="uppercase tracking-[5px] text-[11px] text-[#c9a96e] font-semibold">
                Handcrafted Products
              </p>
              <span className="w-5 h-px bg-[#c9a96e]" />
            </div>

            <h2
              className="font-bold text-[#111827] leading-[1.1] tracking-[-1.5px]"
              style={{ fontSize: "52px", marginBottom: "14px" }}
            >
              Featured Decor
            </h2>

            <p
              className="text-[#6b7280] leading-[1.8] max-w-[520px]"
              style={{ fontSize: "15px" }}
            >
              Explore premium ceramic vases, marble dust decor, handcrafted idols and elegant decorative pieces crafted
              for timeless interiors.
            </p>
          </div>

          <Link href="/products">
            <motion.button
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.22 }}
              className="group flex items-center gap-2 border border-black rounded-full bg-transparent text-black font-semibold tracking-wide hover:bg-black hover:text-white transition-colors duration-300 cursor-pointer"
              style={{ padding: "13px 28px", fontSize: "14px", marginBottom: "40px" }}
            >
              View Products
              <FiArrowUpRight className="text-base transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </motion.button>
          </Link>
        </div>

        {/* Slider with floating side arrows */}
        <div className="relative">

          {/* Left Arrow — floats on left edge of products */}
         {/* Left Arrow */}
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#e5e7eb] bg-white text-[#111827] shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all duration-300 hover:bg-[#111827] hover:text-white hover:scale-105"
            >
              <FiChevronLeft className="text-[20px]" />
            </button>
          )}

          {/* Right Arrow */}
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#e5e7eb] bg-white text-[#111827] shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all duration-300 hover:bg-[#111827] hover:text-white hover:scale-105"
            >
              <FiChevronRight className="text-[20px]" />
            </button>
          )}

          <motion.div
            ref={scrollRef}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="flex gap-6 overflow-x-auto scroll-smooth pb-2"
            style={{
              scrollSnapType: "x mandatory",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {products.map((product) => (
              <motion.div
                key={product._id || product.id}
                data-card
                variants={itemVariants}
                className="flex-shrink-0"
                style={{
                  scrollSnapAlign: "start",
                  width: "280px",
                }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>

        </div>

      </div>

      {/* hide scrollbar (webkit) */}
      <style jsx>{`
        section :global(.overflow-x-auto::-webkit-scrollbar) {
          display: none;
        }
      `}</style>
    </section>
  );
}