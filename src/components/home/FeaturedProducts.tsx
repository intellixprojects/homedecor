"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products", { cache: "no-store" });
        const data = await res.json();
        if (data.success) {
          setProducts(data.products);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

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
              Explore premium ceramic vases, marble dust decor,
              luxury mugs, handcrafted idols, hanging plates,
              wall decor, and elegant decorative pieces crafted
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

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {products.slice(0, 8).map((product) => (
            <motion.div key={product._id || product.id} variants={itemVariants}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}