"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import { motion, AnimatePresence } from "framer-motion";

import ReviewSection from "@/components/products/ReviewSection";

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
  FiPackage,
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiCheckCircle,
  FiXCircle,
  FiMaximize2,
} from "react-icons/fi";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { addToCart } from "@/store/features/cartSlice";
import { addToWishlist, removeFromWishlist } from "@/store/features/wishlistSlice";

import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import ProductCard from "@/components/products/ProductCard";

export default function ProductDetails() {
  const params = useParams();
  const dispatch = useDispatch();

  const wishlistItems = useSelector(
    (state: RootState) => state.wishlist.wishlistItems
  );

  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetch("/api/products", { cache: "no-store" });
        const data = await res.json();
        if (data.success) {
          setAllProducts(data.products);
        } else {
          setAllProducts([]);
        }
      } catch (err) {
        console.error(err);
        setAllProducts([]);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const product = useMemo(() => {
    return allProducts.find((item: any) => item._id === params?.id);
  }, [allProducts, params]);

  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState("");
  const [added, setAdded] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"description" | "shipping" | "returns">("description");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (product) {
      setMainImage(product.gallery?.[0] || product.image);
    }
  }, [product]);

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

  if (!loading && !product) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#f8f5f0] flex flex-col items-center justify-center px-4 text-center">
          <h1 className="text-3xl sm:text-5xl font-black text-black mb-4">Product Not Found</h1>
          <p className="text-gray-500 mb-8">This product may have been removed.</p>
          <Link href="/products" className="h-13 px-8 rounded-full bg-black text-white flex items-center justify-center font-semibold hover:bg-[#1f1f1f] transition">
            Back To Products
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  const isInStock = product.inStock !== false && (product.stock == null || product.stock > 0);
  const isLowStock = isInStock && product.stock != null && product.stock <= 5;
  const maxQty = product.stock != null ? product.stock : 999;

  const isWished = wishlistItems.some((item: any) => item._id === product._id);

  const relatedProducts = allProducts.filter(
    (item: any) => item.category === product.category && item._id !== product._id
  );

  const discount =
    product.oldPrice && product.oldPrice > product.price
      ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
      : 0;

  const handleAddToCart = () => {
    if (!isInStock) return;
    dispatch(
      addToCart({
        id: product._id || product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity,
        stock: product.stock ?? null,
      })
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleWishlist = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (isWished) {
      dispatch(removeFromWishlist(product._id || product.id));
    } else {
      dispatch(
        addToWishlist({
          id: product._id || product.id,
          title: product.title,
          category: product.category,
          price: product.price,
          oldPrice: product.oldPrice,
          image: product.image,
        })
      );
    }
  };

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.share) {
      try {
        await navigator.share({ title: product.title, text: product.description, url });
      } catch (error) {
        console.log(error);
      }
    } else {
      await navigator.clipboard.writeText(url);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    }
  };

  const openPreview = (index: number) => {
    const gallery = product.gallery || [];
    if (index < 0 || index >= gallery.length) return;
    setActiveImageIndex(index);
    setMainImage(gallery[index]);
    setPreviewOpen(true);
  };

  const nextImage = () => {
    const nextIndex = activeImageIndex === product.gallery.length - 1 ? 0 : activeImageIndex + 1;
    setActiveImageIndex(nextIndex);
    setMainImage(product.gallery[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = activeImageIndex === 0 ? product.gallery.length - 1 : activeImageIndex - 1;
    setActiveImageIndex(prevIndex);
    setMainImage(product.gallery[prevIndex]);
  };

  const tabContent = {
    description: product.description,
    shipping: "Free standard shipping on all orders over ₹500. Express delivery available at checkout. Estimated delivery: 3–7 business days.",
    returns: "We offer a hassle-free 7-day return policy. Items must be unused and in original packaging.",
  };

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-[#f8f5f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-20 sm:pb-24">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[13px] text-gray-400 mb-8 sm:mb-9">
            <Link href="/" className="hover:text-black transition">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-black transition">Products</Link>
            <span>/</span>
            <span className="text-black font-medium truncate max-w-40">{product.title}</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 xl:gap-14 items-start">

            {/* LEFT — IMAGES */}
            <div className="lg:sticky lg:top-28">
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
                onClick={() => openPreview((product.gallery || []).findIndex((img: string) => img === mainImage))}
                className="relative overflow-hidden rounded-3xl sm:rounded-4xl bg-white h-80 sm:h-105 md:h-125 mb-4 shadow-[0_4px_40px_rgba(0,0,0,0.08)] cursor-zoom-in group"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={mainImage}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={mainImage || product.image}
                      alt={product.title}
                      fill
                      className={`object-cover group-hover:scale-105 transition duration-500 ${!isInStock ? "grayscale opacity-70" : ""}`}
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Low stock badge */}
                {isLowStock && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white text-[11px] font-bold tracking-[1px] rounded-full px-4 py-2 z-10">
                    Only {product.stock} left
                  </div>
                )}

                {/* Discount — only if not low stock */}
                {!isLowStock && discount > 0 && (
                  <div className="absolute top-4 left-4 bg-black text-white text-[11px] font-bold tracking-[2px] rounded-full px-4 py-2 z-10">
                    {discount}% OFF
                  </div>
                )}

                <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                  <button
                    onClick={handleWishlist}
                    className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all duration-300 ${isWished ? "bg-black text-white scale-110" : "bg-white text-gray-600 hover:bg-black hover:text-white"}`}
                  >
                    <FiHeart className={`text-sm transition-all duration-300 ${isWished ? "fill-white" : ""}`} />
                  </button>

                  <button
                    onClick={(e) => { e.stopPropagation(); handleShare(); }}
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

              {/* THUMBNAILS */}
              <div className="grid grid-cols-4 gap-3">
                {(product.gallery || []).map((img: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => { setMainImage(img); setActiveImageIndex(index); }}
                    className={`relative overflow-hidden rounded-2xl border-2 bg-white transition-all duration-200 h-20 sm:h-23.75 p-1 ${mainImage === img ? "border-black scale-[0.97]" : "border-transparent hover:border-gray-300"}`}
                  >
                    <div className="relative w-full h-full rounded-xl overflow-hidden">
                      <Image src={img} alt="" fill className={`object-cover ${!isInStock ? "grayscale opacity-60" : ""}`} />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT — DETAILS */}
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55 }}
              className="pt-2 lg:pt-0"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="w-4 h-px bg-[#c9a96e]" />
                <p className="uppercase tracking-[5px] text-[11px] text-[#c9a96e] font-semibold">{product.category}</p>
              </div>

              <h1 className="font-black text-[#111827] leading-[1.05] tracking-tight text-[32px] sm:text-[38px] lg:text-[44px] mb-5">
                {product.title}
              </h1>

              {/* RATING + STOCK */}
              <div className="flex items-center flex-wrap gap-4 mb-6">

                {isInStock ? (
                  <div className="flex items-center gap-1.5 text-emerald-600">
                    <FiCheckCircle />
                    <span className="text-sm font-semibold">
                      {isLowStock ? `Only ${product.stock} left` : "In Stock"}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-red-500">
                    <FiXCircle />
                    <span className="text-sm font-semibold">Out of Stock</span>
                  </div>
                )}

                {isInStock && (
                  <div className="flex items-center gap-1.5 text-gray-500">
                    <FiPackage />
                    <span className="text-sm">Ships in 2–3 days</span>
                  </div>
                )}
              </div>

              {/* PRICE */}
              <div className="flex items-end gap-4 bg-white rounded-[22px] px-5 sm:px-6 py-5 mb-6">
                <span className="font-black text-[#111827] leading-none text-[38px] sm:text-[46px]">₹{product.price}</span>
                {product.oldPrice && product.oldPrice > product.price && (
                  <div className="mb-1">
                    <span className="line-through text-gray-400 text-lg">₹{product.oldPrice}</span>
                    <span className="block text-[11px] font-bold text-emerald-600 uppercase tracking-wide mt-1">
                      You save ₹{product.oldPrice - product.price}
                    </span>
                  </div>
                )}
              </div>

              {/* SPECS CARD */}
              {(product.width || product.height || product.length || product.weight) && (
                <div className="bg-white rounded-[20px] px-5 py-4 mb-6 flex flex-col gap-4">
                  {(product.width || product.height) && (
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 min-w-32.5">
                        <FiMaximize2 className="text-[#c9a96e] text-[15px]" />
                        <span className="text-[12px] font-semibold text-[#6b7280] uppercase tracking-wider">Dimensions</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        {product.width && <span className="rounded-full bg-[#111827] px-3 py-1 text-[11px] font-semibold text-white">W: {product.width}</span>}
                        {product.height && <span className="rounded-full bg-[#111827] px-3 py-1 text-[11px] font-semibold text-white">H: {product.height}</span>}
                        {product.length && <span className="rounded-full bg-[#111827] px-3 py-1 text-[11px] font-semibold text-white">L: {product.length}</span>}
                      </div>
                    </div>
                  )}
                  {(product.width || product.height) && (product.length || product.weight) && <div className="h-px bg-[#f3f4f6]" />}
                  {(product.length || product.weight) && (
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 min-w-32.5">
                        <FiPackage className="text-[#c9a96e] text-[15px]" />
                        <span className="text-[12px] font-semibold text-[#6b7280] uppercase tracking-wider">Weight</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        {product.weight && <span className="rounded-full bg-[#f3f4f6] border border-[#e5e7eb] px-3 py-1 text-[11px] font-semibold text-[#111827]">{product.weight}</span>}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TABS */}
              <div className="mb-7">
                <div className="flex gap-1 bg-white rounded-[14px] w-fit p-1.25">
                  {(["description", "shipping", "returns"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`capitalize text-[13px] font-semibold rounded-[10px] transition-all duration-200 px-4 py-2 ${activeTab === tab ? "bg-black text-white" : "text-gray-500 hover:text-black"}`}
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

              {/* OUT OF STOCK BANNER */}
              {!isInStock && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 rounded-2xl bg-red-50 border border-red-200 px-5 py-4 mb-5"
                >
                  <FiXCircle className="text-red-500 text-[20px] shrink-0" />
                  <div>
                    <p className="text-[14px] font-bold text-red-600">Currently Unavailable</p>
                    <p className="text-[12px] text-red-400 mt-0.5">This product is out of stock. Check back soon or explore related products below.</p>
                  </div>
                </motion.div>
              )}

              {/* QUANTITY + ADD TO CART */}
              <div className="flex items-center gap-4 flex-wrap mb-5">
                <div className={`flex items-center gap-3 bg-white rounded-full px-2 py-1.5 ${!isInStock ? "opacity-40 pointer-events-none" : ""}`}>
                  <button
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                    disabled={!isInStock}
                    className="w-9 h-9 rounded-full bg-[#f5f5f5] hover:bg-black hover:text-white transition flex items-center justify-center disabled:cursor-not-allowed"
                  >
                    <FiMinus />
                  </button>
                  <span className="w-6 text-center font-bold text-[16px]">{quantity}</span>
                  <button
                    onClick={() => quantity < maxQty && setQuantity(quantity + 1)}
                    disabled={!isInStock || quantity >= maxQty}
                    className={`w-9 h-9 rounded-full text-white transition flex items-center justify-center ${!isInStock || quantity >= maxQty ? "bg-gray-300 cursor-not-allowed" : "bg-black hover:scale-110"}`}
                  >
                    <FiPlus />
                  </button>
                </div>

                <motion.button
                  whileTap={isInStock ? { scale: 0.97 } : {}}
                  onClick={handleAddToCart}
                  disabled={!isInStock}
                  className={`flex-1 h-13.5 min-w-47.5 rounded-full font-bold text-[15px] flex items-center justify-center gap-3 transition-all duration-300 ${!isInStock ? "bg-gray-200 text-gray-400 cursor-not-allowed" : added ? "bg-emerald-600 text-white" : "bg-black text-white hover:bg-[#1f1f1f]"}`}
                >
                  {!isInStock ? <><FiXCircle /> Out of Stock</> : added ? <><FiCheck /> Added to Cart!</> : <><FiShoppingBag /> Add to Cart</>}
                </motion.button>

                <button
                  disabled={!isInStock}
                  onClick={() => {
                    if (!isInStock) return;
                    dispatch(
                      addToCart({
                        id: product._id || product.id,
                        title: product.title,
                        price: product.price,
                        image: product.image,
                        quantity,
                        stock: product.stock ?? null,
                      })
                    );
                    router.push("/checkout");
                  }}
                  className={`h-13.5 rounded-full font-bold text-[15px] transition-all duration-300 px-7 w-full sm:w-auto ${!isInStock ? "border-2 border-gray-200 text-gray-400 cursor-not-allowed bg-white" : "border-2 border-black hover:bg-black hover:text-white"}`}
                >
                  Buy Now
                </button>
              </div>

              {/* TRUST BADGES */}
              <div className="grid grid-cols-3 gap-3 mt-7">
                {[
                  { icon: <FiTruck />, label: "Free Delivery", sub: "Orders over ₹500" },
                  { icon: <FiShield />, label: "Secure Pay", sub: "100% protected" },
                  { icon: <FiRefreshCcw />, label: "7-day Returns", sub: "Easy returns" },
                ].map(({ icon, label, sub }) => (
                  <div key={label} className="bg-white rounded-[18px] flex flex-col items-center text-center px-3 py-5">
                    <div className="w-10 h-10 rounded-full bg-[#f8f5f0] flex items-center justify-center text-[#c9a96e] text-lg mb-3">{icon}</div>
                    <p className="font-bold text-[13px] text-black">{label}</p>
                    <p className="text-[11px] text-gray-400 mt-1">{sub}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RELATED PRODUCTS */}
          {relatedProducts.length > 0 && (
            <div className="mt-24">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="uppercase tracking-[4px] text-[11px] text-[#c9a96e] font-semibold mb-3">More Collection</p>
                  <h2 className="text-3xl sm:text-5xl font-black text-black">Related Products</h2>
                </div>
                <Link href="/products" className="hidden sm:flex h-12.5 px-7 rounded-full border border-black items-center justify-center font-semibold hover:bg-black hover:text-white transition">
                  View All
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.slice(0, 4).map((item: any) => (
                  <ProductCard key={item._id || item.id} product={item} />
                ))}
              </div>
            </div>
          )}
        </div>

         {/* REVIEWS */}
          {params?.id && <ReviewSection productId={params.id as string} />}

        {/* IMAGE POPUP */}
        <AnimatePresence>
          {previewOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-999 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            >
              <button onClick={() => setPreviewOpen(false)} className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white text-black flex items-center justify-center hover:rotate-90 transition duration-300 z-20">
                <FiX size={20} />
              </button>
              <button onClick={prevImage} className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition z-20">
                <FiChevronLeft size={22} />
              </button>
              <button onClick={nextImage} className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition z-20">
                <FiChevronRight size={22} />
              </button>
              <motion.div
                key={product?.gallery?.[activeImageIndex]}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="relative w-full max-w-6xl h-[70vh] sm:h-[80vh]"
              >
                <Image src={product?.gallery?.[activeImageIndex]} alt={product?.title} fill className="object-contain" />
              </motion.div>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full max-w-4xl px-4 overflow-x-auto scrollbar-hide">
                <div className="flex items-center gap-3 w-max mx-auto">
                  {(product?.gallery || []).map((img: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => { setActiveImageIndex(index); setMainImage(img); }}
                      className={`relative shrink-0 w-20 h-20 sm:w-24 sm:h-24 overflow-hidden rounded-2xl border-2 transition-all duration-300 ${activeImageIndex === index ? "border-white scale-95" : "border-transparent opacity-60 hover:opacity-100"}`}
                    >
                      <Image src={img} alt="" fill className="object-cover" />
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