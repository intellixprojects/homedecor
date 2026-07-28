"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

import {
  FiHeart,
  FiTrash2,
  FiShoppingBag,
  FiArrowLeft,
  FiStar,
} from "react-icons/fi";

import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist, clearWishlist } from "@/store/features/wishlistSlice";
import { addToCart } from "@/store/features/cartSlice";
import { RootState } from "@/store/store";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

export default function WishlistPage() {
  const dispatch = useDispatch();
  const { wishlistItems } = useSelector((state: RootState) => state.wishlist);

  return (
    <>

      <section className="min-h-screen bg-[#f8f5f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-28 pb-20 sm:pb-24">

          {/* ── Top Section ── */}
          <div className="flex items-center justify-between flex-wrap gap-4 mb-8 sm:mb-1">
            <div>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-gray-500 hover:text-black transition text-[14px] mb-3.5"
              >
                <FiArrowLeft className="text-sm" />
                Continue Shopping
              </Link>
            </div>
 
            {wishlistItems.length > 0 && (
              <button
                onClick={() => dispatch(clearWishlist())}
                className="h-11 sm:h-[44px] px-5 rounded-full border border-red-200 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 font-semibold text-[14px]"
              >
                Clear Wishlist
              </button>
            )}
          </div>

          {/* ── Empty Wishlist ── */}
          {wishlistItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white text-center rounded-[28px] sm:rounded-[40px] px-5 sm:px-8 py-16 sm:py-20 lg:py-24 shadow-[0_10px_40px_rgba(0,0,0,0.05)]"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#f8f5f0] flex items-center justify-center mx-auto mb-6">
                <FiHeart className="text-[26px] sm:text-[32px] text-[#c9a96e]" />
              </div>

              <h2 className="font-black text-[#111827] text-[clamp(34px,5vw,52px)] mb-4 sm:mb-5">
                Your Wishlist Is Empty
              </h2>

              <p className="text-gray-500 mx-auto leading-8 text-[15px] sm:text-[17px] max-w-xs sm:max-w-md lg:max-w-[550px] mb-8 sm:mb-9">
                Save your favorite handcrafted ceramic and marble decor
                products here for future shopping.
              </p>

              <Link
                href="/products"
                className="inline-flex items-center justify-center h-[52px] sm:h-[58px] px-8 sm:px-9 rounded-full bg-black text-white hover:bg-[#1f1f1f] transition-all duration-300 font-semibold"
              >
                Explore Products
              </Link>
            </motion.div>

          ) : (
            <>
              {/* ── Products Count ── */}
              <div className="flex items-center justify-between flex-wrap gap-4 mb-7 sm:mb-8">
                <div>
                  <h2 className="font-bold text-black text-[22px] sm:text-[28px]">
                    {wishlistItems.length} Saved Products
                  </h2>
                </div>
              </div>

              {/* ── Wishlist Grid ── */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 lg:gap-7">
                {wishlistItems.map((item, index) => {
                  const discount =
                    item.oldPrice && item.oldPrice > item.price
                      ? Math.round(((item.oldPrice - item.price) / item.oldPrice) * 100)
                      : 0;

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
                      className="group relative"
                    >
                      <div
                        className="relative overflow-hidden rounded-[28px] bg-[#faf8f5] border border-[#ede9e3] transition-all duration-500 group-hover:border-[#d4c9b8] group-hover:shadow-[0_18px_40px_rgba(26,20,15,0.09)]"
                        style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}
                      >
                        {/* IMAGE */}
                        <Link
                          href={`/products/${item.id}`}
                          className="block relative overflow-hidden bg-[#f2ede6]"
                          style={{ height: "280px" }}
                        >
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                          />

                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                          {discount > 0 && (
                            <div className="absolute top-4 left-4 bg-black text-white text-[11px] font-semibold tracking-[2px] uppercase rounded-full" style={{ padding: "6px 10px" }}>
                              {discount}% OFF
                            </div>
                          )}

                          {/* Remove Button */}
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              dispatch(removeFromWishlist(item.id));
                            }}
                            className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center bg-white/80 text-gray-600 backdrop-blur-sm hover:bg-red-500 hover:text-white transition-all duration-300"
                          >
                            <FiTrash2 className="text-sm" />
                          </button>
                        </Link>

                        <div className="h-px bg-[#ede9e3] group-hover:bg-[#c9b99a] transition-colors duration-500" />

                        {/* CONTENT */}
                        <div style={{ padding: "20px 24px 24px" }}>
                          <p className="uppercase tracking-[3.5px] text-[10px] text-[#a89b88] font-semibold" style={{ marginBottom: "8px" }}>
                            {item.category}
                          </p>

                          <Link href={`/products/${item.id}`}>
                            <h3 className="font-bold text-[#1a1714] text-[18px] leading-[1.25] tracking-[-0.3px] group-hover:text-black transition-colors duration-200 line-clamp-2" style={{ marginBottom: "16px" }}>
                              {item.title}
                            </h3>
                          </Link>

                          <div className="flex items-center justify-between gap-3">
                            <div className="flex flex-col">
                              <div className="flex items-baseline gap-[10px]">
                                <span className="text-[22px] font-extrabold text-[#1a1714] tracking-[-0.5px]">₹{item.price}</span>
                                {item.oldPrice && item.oldPrice > item.price && (
                                  <span className="text-[13px] text-[#b0a898] line-through">₹{item.oldPrice}</span>
                                )}
                              </div>
                              {discount > 0 && (
                                <span className="text-[11px] font-semibold text-[#2d6a4f]">
                                  You save ₹{item.oldPrice! - item.price}
                                </span>
                              )}
                            </div>

                            <button
                              onClick={() =>
                                dispatch(
                                  addToCart({
                                    id: item.id,
                                    title: item.title,
                                    image: item.image,
                                    price: item.price,
                                    quantity: 1,
                                  })
                                )
                              }
                              className="flex items-center justify-center w-[44px] h-[44px] rounded-full bg-black text-white hover:bg-[#2a2420] transition-all duration-300 shadow-sm shrink-0"
                            >
                              <FiShoppingBag className="text-[15px]" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}