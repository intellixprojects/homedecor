"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import {
  FiHeart,
  FiShoppingBag,
  FiStar,
  FiShield,
  FiTruck,
  FiRefreshCcw,
  FiCheck,
  FiMinus,
  FiPlus,
  FiShare2,
  FiArrowUpRight,
  FiPackage,
  FiX,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

import { useDispatch } from "react-redux";

import { addToCart } from "@/store/features/cartSlice";
import { addToWishlist } from "@/store/features/wishlistSlice";

import { products } from "@/data/products";

import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

export default function ProductDetails() {
  const params = useParams();

  const dispatch = useDispatch();

  const product = products.find(
    (item) => item.id === Number(params?.id)
  );

  const [quantity, setQuantity] = useState(1);

  const [mainImage, setMainImage] = useState(
    product?.gallery[0]
  );

  const [wished, setWished] = useState(false);

  const [added, setAdded] = useState(false);

  const [shareCopied, setShareCopied] = useState(false);

  const [activeTab, setActiveTab] = useState<
    "description" | "shipping" | "returns"
  >("description");

  const [previewOpen, setPreviewOpen] = useState(false);

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!product) {
    return (
      <div className="h-screen flex items-center justify-center text-3xl font-bold bg-[#f8f5f0]">
        Product Not Found
      </div>
    );
  }

  const relatedProducts = products.filter(
    (item) =>
      item.category === product.category &&
      item.id !== product.id
  );

  const discount = Math.round(
    ((product.oldPrice - product.price) /
      product.oldPrice) *
      100
  );

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity,
      })
    );

    setAdded(true);

    setTimeout(() => setAdded(false), 2000);
  };

  const handleWishlist = () => {
    setWished(!wished);

    dispatch(
  addToWishlist({
    id: product.id,
    title: product.title,
    price: product.price,
    oldPrice: product.oldPrice,
    image: product.image,
    category: product.category,
    rating: product.rating,
  })
);
  };

  const handleShare = async () => {
    const url =
      typeof window !== "undefined"
        ? window.location.href
        : "";

    if (navigator.share) {
      try {
        await navigator.share({
          title: product.title,
          text: product.description,
          url,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      await navigator.clipboard.writeText(url);

      setShareCopied(true);

      setTimeout(() => {
        setShareCopied(false);
      }, 2000);
    }
  };

  const openPreview = (index: number) => {
    setActiveImageIndex(index);

    setMainImage(product.gallery[index]);

    setPreviewOpen(true);
  };

  const nextImage = () => {
    const nextIndex =
      activeImageIndex === product.gallery.length - 1
        ? 0
        : activeImageIndex + 1;

    setActiveImageIndex(nextIndex);

    setMainImage(product.gallery[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex =
      activeImageIndex === 0
        ? product.gallery.length - 1
        : activeImageIndex - 1;

    setActiveImageIndex(prevIndex);

    setMainImage(product.gallery[prevIndex]);
  };

  const tabContent = {
    description: product.description,

    shipping:
      "Free standard shipping on all orders over ₹500. Express delivery available at checkout. Estimated delivery: 3–7 business days.",

    returns:
      "We offer a hassle-free 7-day return policy. Items must be unused and in original packaging.",
  };

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-[#f8f5f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-20 sm:pb-24">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[13px] text-gray-400 mb-8 sm:mb-9">
            <Link
              href="/"
              className="hover:text-black transition"
            >
              Home
            </Link>

            <span>/</span>

            <Link
              href="/products"
              className="hover:text-black transition"
            >
              Products
            </Link>

            <span>/</span>

            <span className="text-black font-medium truncate max-w-[160px]">
              {product.title}
            </span>
          </div>

          {/* Main Grid */}
          <div className="grid lg:grid-cols-2 gap-10 xl:gap-14 items-start">

            {/* LEFT */}
            <div className="lg:sticky lg:top-28">

              {/* Main Image */}
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
                onClick={() =>
                  openPreview(
                    product.gallery.findIndex(
                      (img) => img === mainImage
                    )
                  )
                }
                className="relative overflow-hidden rounded-[24px] sm:rounded-[32px] bg-white h-[320px] sm:h-[420px] md:h-[500px] mb-4 shadow-[0_4px_40px_rgba(0,0,0,0.08)] cursor-zoom-in group"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={mainImage}
                    initial={{
                      opacity: 0,
                      scale: 1.04,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={mainImage || product.image}
                      alt={product.title}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-500"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Discount */}
                <div className="absolute top-4 left-4 bg-black text-white text-[11px] font-bold tracking-[2px] rounded-full px-4 py-2 z-10">
                  {discount}% OFF
                </div>

                {/* Actions */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">

                  {/* Wishlist */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();

                      handleWishlist();
                    }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all duration-300 ${
                      wished
                        ? "bg-black text-white"
                        : "bg-white text-gray-600 hover:bg-black hover:text-white"
                    }`}
                  >
                    <FiHeart
                      className={`text-sm ${
                        wished ? "fill-white" : ""
                      }`}
                    />
                  </button>

                  {/* Share */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();

                      handleShare();
                    }}
                    className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md text-gray-600 hover:bg-black hover:text-white transition-all duration-300 relative"
                  >
                    <FiShare2 className="text-sm" />

                    {shareCopied && (
                      <span className="absolute right-12 whitespace-nowrap bg-black text-white text-[10px] rounded-full px-3 py-1">
                        Link Copied
                      </span>
                    )}
                  </button>
                </div>
              </motion.div>

              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-3">
                {product.gallery.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setMainImage(img);

                      setActiveImageIndex(index);
                    }}
                    className={`relative overflow-hidden rounded-2xl border-2 bg-white transition-all duration-200 h-[80px] sm:h-[95px] p-1 ${
                      mainImage === img
                        ? "border-black scale-[0.97]"
                        : "border-transparent hover:border-gray-300"
                    }`}
                  >
                    <div className="relative w-full h-full rounded-xl overflow-hidden">
                      <Image
                        src={img}
                        alt=""
                        fill
                        className="object-cover"
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT */}
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55 }}
              className="pt-2 lg:pt-0"
            >

              {/* Category */}
              <div className="flex items-center gap-3 mb-3">
                <span className="w-4 h-px bg-[#c9a96e]" />

                <p className="uppercase tracking-[5px] text-[11px] text-[#c9a96e] font-semibold">
                  {product.category}
                </p>
              </div>

              {/* Title */}
              <h1 className="font-black text-[#111827] leading-[1.05] tracking-tight text-[32px] sm:text-[38px] lg:text-[44px] mb-5">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center flex-wrap gap-4 mb-6">

                <div className="flex items-center gap-1.5">
                  <FiStar className="text-[#c9a96e] fill-[#c9a96e]" />

                  <span className="font-bold text-sm">
                    {product.rating}
                  </span>

                  <span className="text-gray-400 text-sm">
                    / 5
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-emerald-600">
                  <FiCheck />

                  <span className="text-sm font-semibold">
                    In Stock
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-gray-500">
                  <FiPackage />

                  <span className="text-sm">
                    Ships in 2–3 days
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-end gap-4 bg-white rounded-[22px] px-5 sm:px-6 py-5 mb-7">
                <span className="font-black text-[#111827] leading-none text-[38px] sm:text-[46px]">
                  ₹{product.price}
                </span>

                <div className="mb-1">
                  <span className="line-through text-gray-400 text-lg">
                    ₹{product.oldPrice}
                  </span>

                  <span className="block text-[11px] font-bold text-emerald-600 uppercase tracking-wide mt-1">
                    You save ₹
                    {product.oldPrice - product.price}
                  </span>
                </div>
              </div>

              {/* Tabs */}
              <div className="mb-7">

                <div className="flex gap-1 bg-white rounded-[14px] w-fit p-[5px]">
                  {(
                    [
                      "description",
                      "shipping",
                      "returns",
                    ] as const
                  ).map((tab) => (
                    <button
                      key={tab}
                      onClick={() =>
                        setActiveTab(tab)
                      }
                      className={`capitalize text-[13px] font-semibold rounded-[10px] transition-all duration-200 px-4 py-2 ${
                        activeTab === tab
                          ? "bg-black text-white"
                          : "text-gray-500 hover:text-black"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  <motion.p
                    key={activeTab}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-gray-600 leading-[1.9] text-[15px] mt-4"
                  >
                    {tabContent[activeTab]}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Cart Row */}
              <div className="flex items-center gap-4 flex-wrap mb-5">

                {/* Qty */}
                <div className="flex items-center gap-3 bg-white rounded-full px-2 py-1.5">
                  <button
                    onClick={() =>
                      quantity > 1 &&
                      setQuantity(quantity - 1)
                    }
                    className="w-9 h-9 rounded-full bg-[#f5f5f5] hover:bg-black hover:text-white transition flex items-center justify-center"
                  >
                    <FiMinus />
                  </button>

                  <span className="w-6 text-center font-bold text-[16px]">
                    {quantity}
                  </span>

                  <button
                    onClick={() =>
                      setQuantity(quantity + 1)
                    }
                    className="w-9 h-9 rounded-full bg-black text-white hover:scale-110 transition flex items-center justify-center"
                  >
                    <FiPlus />
                  </button>
                </div>

                {/* Add To Cart */}
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAddToCart}
                  className={`flex-1 h-[54px] min-w-[190px] rounded-full font-bold text-[15px] flex items-center justify-center gap-3 transition-all duration-300 ${
                    added
                      ? "bg-emerald-600 text-white"
                      : "bg-black text-white hover:bg-[#1f1f1f]"
                  }`}
                >
                  {added ? (
                    <>
                      <FiCheck />
                      Added to Cart!
                    </>
                  ) : (
                    <>
                      <FiShoppingBag />
                      Add to Cart
                    </>
                  )}
                </motion.button>

                {/* Buy */}
                <button className="h-[54px] rounded-full font-bold text-[15px] border-2 border-black hover:bg-black hover:text-white transition-all duration-300 px-7 w-full sm:w-auto">
                  Buy Now
                </button>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-3 gap-3 mt-7">
                {[
                  {
                    icon: <FiTruck />,
                    label: "Free Delivery",
                    sub: "Orders over ₹500",
                  },
                  {
                    icon: <FiShield />,
                    label: "Secure Pay",
                    sub: "100% protected",
                  },
                  {
                    icon: <FiRefreshCcw />,
                    label: "7-day Returns",
                    sub: "Easy returns",
                  },
                ].map(({ icon, label, sub }) => (
                  <div
                    key={label}
                    className="bg-white rounded-[18px] flex flex-col items-center text-center px-3 py-5"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#f8f5f0] flex items-center justify-center text-[#c9a96e] text-lg mb-3">
                      {icon}
                    </div>

                    <p className="font-bold text-[13px] text-black">
                      {label}
                    </p>

                    <p className="text-[11px] text-gray-400 mt-1">
                      {sub}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Related Products */}
          <div className="mt-24">

            <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-4 h-px bg-[#c9a96e]" />

                  <p className="uppercase tracking-[5px] text-[11px] text-[#c9a96e] font-semibold">
                    Similar Products
                  </p>
                </div>

                <h2 className="font-black text-[#111827] text-[30px] sm:text-[38px]">
                  You May Also Like
                </h2>
              </div>

              <Link
                href="/products"
                className="group flex items-center gap-2 text-[13px] font-semibold text-black border border-black rounded-full hover:bg-black hover:text-white transition-all duration-300 px-5 py-3"
              >
                View All

                <FiArrowUpRight className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition duration-300" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.45,
                    delay: i * 0.08,
                  }}
                  viewport={{ once: true }}
                >
                  <Link
                    href={`/products/${item.id}`}
                    className="group block bg-white overflow-hidden rounded-[26px] hover:-translate-y-1 transition-transform duration-500 p-3 shadow-[0_2px_20px_rgba(0,0,0,0.06)]"
                  >
                    <div className="relative overflow-hidden rounded-[18px] bg-[#f8f5f0] h-[220px] mb-4">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-[1.07] transition duration-700"
                      />
                    </div>

                    <div className="px-2 pb-2">
                      <p className="uppercase tracking-[3px] text-[10px] text-[#c9a96e] font-semibold mb-2">
                        {item.category}
                      </p>

                      <h3 className="font-bold text-[#111827] text-[16px] line-clamp-1 mb-3">
                        {item.title}
                      </h3>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-[19px] font-black">
                            ₹{item.price}
                          </span>

                          <span className="text-[13px] line-through text-gray-400">
                            ₹{item.oldPrice}
                          </span>
                        </div>

                        <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0">
                          <FiArrowUpRight className="text-xs" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* IMAGE POPUP */}
        <AnimatePresence>
          {previewOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[999] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            >

              {/* Close */}
              <button
                onClick={() => setPreviewOpen(false)}
                className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white text-black flex items-center justify-center hover:rotate-90 transition duration-300 z-20"
              >
                <FiX size={20} />
              </button>

              {/* Left */}
              <button
                onClick={prevImage}
                className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition z-20"
              >
                <FiChevronLeft size={22} />
              </button>

              {/* Right */}
              <button
                onClick={nextImage}
                className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition z-20"
              >
                <FiChevronRight size={22} />
              </button>

              {/* Main Preview */}
              <motion.div
                key={product.gallery[activeImageIndex]}
                initial={{
                  opacity: 0,
                  scale: 0.96,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                className="relative w-full max-w-6xl h-[70vh] sm:h-[80vh]"
              >
                <Image
                  src={product.gallery[activeImageIndex]}
                  alt={product.title}
                  fill
                  className="object-contain"
                />
              </motion.div>

              {/* Bottom Scroller */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full max-w-4xl px-4 overflow-x-auto scrollbar-hide">
                <div className="flex items-center gap-3 w-max mx-auto">
                  {product.gallery.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setActiveImageIndex(index);

                        setMainImage(img);
                      }}
                      className={`relative shrink-0 w-20 h-20 sm:w-24 sm:h-24 overflow-hidden rounded-2xl border-2 transition-all duration-300 ${
                        activeImageIndex === index
                          ? "border-white scale-95"
                          : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={img}
                        alt=""
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </section>

      <Footer />
    </>
  );
}