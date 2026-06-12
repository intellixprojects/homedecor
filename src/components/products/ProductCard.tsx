"use client";

import Image from "next/image";
import Link from "next/link";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

import {
  FiHeart,
  FiShoppingBag,
  FiArrowUpRight,
  FiStar,
} from "react-icons/fi";

import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/store/features/cartSlice";
import { addToWishlist, removeFromWishlist } from "@/store/features/wishlistSlice";
import { RootState } from "@/store/store";

interface ProductProps {
  product: {
    id?: number;
    _id?: string;
    title: string;
    category: string;
    price: number;
    oldPrice?: number;
    image: string;
    inStock?: boolean;
    stock?: number | null;
    description?: string;
    gallery?: string[];
    width?: string;
    height?: string;
  };
}

export default function ProductCard({ product }: ProductProps) {
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);

  const wishlistItems = useSelector((state: RootState) => state.wishlist.wishlistItems);
  const isWished = wishlistItems.some(
    (item: any) => item.id === product._id || item.id === product.id
  );

  const isOutOfStock = product.inStock === false || (product.stock != null && product.stock <= 0);

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    dispatch(
      addToCart({
        id: product._id || "",
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
        stock: product.stock ?? null,
      })
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const handleWishlist = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isWished) {
      dispatch(removeFromWishlist(product._id || product.id || ""));
    } else {
      dispatch(
        addToWishlist({
          id: product._id || product.id || "",
          title: product.title,
          category: product.category,
          price: product.price,
          oldPrice: product.oldPrice || 0,
          image: product.image,
        })
      );
    }
  };

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      style={{ margin: "12px 0" }}
      className="group relative"
    >
      <div
        className="relative overflow-hidden rounded-[28px] bg-[#faf8f5] border border-[#ede9e3] transition-all duration-500 group-hover:border-[#d4c9b8]"
        style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}
      >
        {/* IMAGE */}
        <Link
          href={`/products/${product._id}`}
          className="block relative overflow-hidden bg-[#f2ede6]"
          style={{ height: "320px" }}
        >
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06] ${isOutOfStock ? "opacity-60 grayscale" : ""}`}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Out of stock overlay */}
          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-black/70 text-white text-[12px] font-bold uppercase tracking-[2px] px-4 py-2 rounded-full">
                Out of Stock
              </span>
            </div>
          )}

          {discount > 0 && (
            <div className="absolute top-4 left-4 bg-black text-white text-[11px] font-semibold tracking-[2px] uppercase rounded-full" style={{ padding: "6px 10px" }}>
              {discount}% OFF
            </div>
          )}

          {/* Wishlist Button */}
          <button
            onClick={handleWishlist}
            className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm ${isWished ? "bg-black text-white scale-110" : "bg-white/80 text-gray-600 hover:bg-black hover:text-white"
              }`}
          >
            <FiHeart className={`text-sm transition-all ${isWished ? "fill-white" : ""}`} />
          </button>

          {/* View Details */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
            <div className="bg-white/95 backdrop-blur-md rounded-full flex items-center gap-2 text-[13px] font-medium text-black shadow-lg whitespace-nowrap" style={{ padding: "10px 20px" }}>
              <FiArrowUpRight className="text-base" />
              View Details
            </div>
          </div>
        </Link>

        <div className="h-px bg-[#ede9e3] group-hover:bg-[#c9b99a] transition-colors duration-500" />

        {/* CONTENT */}
        <div style={{ padding: "22px 24px 24px" }}>
          <p className="uppercase tracking-[3.5px] text-[10px] text-[#a89b88] font-semibold" style={{ marginBottom: "8px" }}>
            {product.category}
          </p>

          <Link href={`/products/${product._id}`}>
            <h3 className="font-bold text-[#1a1714] text-[20px] leading-[1.25] tracking-[-0.3px] group-hover:text-black transition-colors duration-200 line-clamp-2" style={{ marginBottom: "16px" }}>
              {product.title}
            </h3>
          </Link>

          <div className="flex items-center justify-between gap-3">
            <div className="flex items-baseline gap-[10px]">
              <span className="text-[24px] font-extrabold text-[#1a1714] tracking-[-0.5px]">₹{product.price}</span>
              {product.oldPrice && (
                <span className="text-[14px] text-[#b0a898] line-through">₹{product.oldPrice}</span>
              )}
            </div>

            <motion.button
              whileTap={{ scale: isOutOfStock ? 1 : 0.94 }}
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`flex items-center gap-[8px] h-[44px] rounded-full text-[13px] font-semibold transition-all duration-300 shadow-sm ${isOutOfStock
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : added
                    ? "bg-[#2d6a4f] text-white"
                    : "bg-black text-white hover:bg-[#2a2420]"
                }`}
              style={{ padding: "0 20px" }}
            >
              <FiShoppingBag className={`text-[14px] transition-transform duration-300 ${added ? "" : "group-hover:rotate-12"}`} />
              <AnimatePresence mode="wait">
                <motion.span
                  key={isOutOfStock ? "out" : added ? "added" : "cart"}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.18 }}
                >
                  {isOutOfStock ? "Sold Out" : added ? "Added!" : "Add"}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}