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
      <Navbar />

      <section className="min-h-screen bg-[#f8f5f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-28 pb-20 sm:pb-24">

          {/* ── Top Section ── */}
          <div className="flex items-center justify-between flex-wrap gap-4 mb-8 sm:mb-9">
            <div>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-gray-500 hover:text-black transition text-[14px] mb-3.5"
              >
                <FiArrowLeft className="text-sm" />
                Continue Shopping
              </Link>

              <div className="flex items-center gap-3">
                {/* Icon */}
                <div className="w-11 h-11 sm:w-[52px] sm:h-[52px] bg-black text-white text-lg sm:text-xl rounded-full flex items-center justify-center shrink-0">
                  <FiHeart />
                </div>

                {/* Text */}
                <div>
                  <p className="uppercase tracking-[3px] text-gray-400 font-medium text-[10px] mb-1">
                    Saved Products
                  </p>
                  <h1 className="font-black text-[#111827] leading-none text-[clamp(28px,4vw,42px)]">
                    My Wishlist
                  </h1>
                </div>
              </div>
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
                  <p className="text-gray-500 mt-1.5">
                    Luxury handcrafted pieces saved for your collection.
                  </p>
                </div>
              </div>

              {/* ── Wishlist Grid ── */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 lg:gap-7">
                {wishlistItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 35 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: index * 0.08 }}
                    className="group bg-white overflow-hidden relative rounded-[24px] sm:rounded-[32px] p-3 sm:p-[14px] shadow-[0_10px_35px_rgba(0,0,0,0.06)]"
                  >
                    {/* Product Image */}
                    <Link href={`/products/${item.id}`}>
                      <div className="relative overflow-hidden bg-[#f8f5f0] h-[240px] sm:h-[280px] lg:h-[300px] rounded-[18px] sm:rounded-[24px] mb-4 sm:mb-5">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-110 transition duration-700"
                        />

                        {/* Remove Button */}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            dispatch(removeFromWishlist(item.id));
                          }}
                          className="absolute top-3.5 right-3.5 w-10 h-10 sm:w-[42px] sm:h-[42px] rounded-full bg-white text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 flex items-center justify-center shadow-lg"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </Link>

                    {/* Content */}
                    <div className="px-1.5 pb-1.5">
                      <p className="uppercase tracking-[3px] text-[#c9a96e] font-semibold text-[11px] mb-2.5">
                        {item.category}
                      </p>

                      <Link href={`/products/${item.id}`}>
                        <h3 className="font-bold text-[#111827] hover:text-black transition leading-snug text-[18px] sm:text-[20px] lg:text-[22px] mb-3.5">
                          {item.title}
                        </h3>
                      </Link>

                      {/* Price */}
                      <div className="flex items-center gap-3 mb-5 sm:mb-6">
                        <span className="text-2xl sm:text-3xl font-black text-black">
                          ${item.price}
                        </span>
                        <span className="text-base sm:text-lg text-gray-400 line-through">
                          ${item.oldPrice}
                        </span>
                      </div>

                      {/* Add To Cart */}
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
                        className="w-full h-12 sm:h-[56px] rounded-full bg-black text-white hover:bg-[#1f1f1f] transition-all duration-300 flex items-center justify-center gap-3 font-semibold text-sm sm:text-base"
                      >
                        <FiShoppingBag />
                        Add To Cart
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}