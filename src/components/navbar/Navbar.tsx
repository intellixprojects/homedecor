"use client";

import Link from "next/link";
import Image from "next/image";

import { useState, useEffect, useRef } from "react";

import { motion, AnimatePresence } from "framer-motion";

import {
  FiShoppingBag,
  FiHeart,
  FiMenu,
  FiX,
  FiUser,
  FiSearch,
  FiLogOut,
  FiPackage,
  FiChevronDown,
} from "react-icons/fi";

import { useDispatch, useSelector } from "react-redux";

import { useRouter } from "next/navigation";

import { RootState } from "@/store/store";

import { logout } from "@/store/features/authSlice";

import { clearCartState } from "@/store/features/cartSlice";

import { clearWishlistState } from "@/store/features/wishlistSlice";

const navLinks = [
  { name: "Home", href: "/" },

  {
    name: "Spiritual Decor",
    dropdown: [
      {
        name: "Divine Collection",
        href: "/products?category=divine",
      },
      {
        name: "Buddha & Monk Collection",
        href: "/products?category=buddha-monk",
      },
    ],
  },

   {
    name: "Home Decor",
    dropdown: [
      {
        name: "Luxury Sculptures",
        href: "/products?category=luxury-sculptures",
      },
      {
        name: "Vases",
        href: "/products?category=vases",
      },
      {
        name: "Showpieces",
        href: "/products?category=showpieces",
      },
      {
        name: "Handcraft Idols",
        href: "/products?category=idols",
      },
    ],
  },

  { name: "About", href: "/about" },

  { name: "Contact", href: "/contact" },
];

const profileMenuItems = [
  { name: "Profile", href: "/profile", icon: FiUser },
  { name: "Order History", href: "/orders", icon: FiPackage },
];

export default function Navbar() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [mobileProfileOpen, setMobileProfileOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);

  const { cartItems } = useSelector(
    (state: RootState) => state.cart
  );

  const { wishlistItems } = useSelector(
    (state: RootState) => state.wishlist
  );

  const reduxUser = useSelector(
    (state: RootState) => state.auth.currentUser
  );

  const [currentUser, setCurrentUser] = useState<any>(null);

  const [activeDropdown, setActiveDropdown] =
    useState<string | null>(null);

  const [mobileDropdown, setMobileDropdown] =
    useState<string | null>(null);

  const [allProducts, setAllProducts] = useState<any[]>([]);

  /* FIX MOBILE LOGIN PERSIST */
  useEffect(() => {
    if (reduxUser) {
      setCurrentUser(reduxUser);
      localStorage.setItem(
        "currentUser",
        JSON.stringify(reduxUser)
      );
    } else {
      const savedUser = localStorage.getItem("currentUser");

      if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
      }
    }
  }, [reduxUser]);

  /* LOCK BODY SCROLL */
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileOpen]);

  /* CLOSE DESKTOP DROPDOWN */
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileDropdownOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res  = await fetch("/api/products", { cache: "no-store" });
      const data = await res.json();
      if (data.success) setAllProducts(data.products);
    } catch (err) {
      console.error(err);
    }
  };
  fetchProducts();
}, []);
  

  /* SEARCH FILTER */
  const filteredProducts = allProducts.filter((item: any) => {
    const term = searchTerm.toLowerCase();

    return (
      item.title.toLowerCase().includes(term) ||
      item.category.toLowerCase().includes(term)
    );
  });

  const matchedCategories = Array.from(
    new Set(
      allProducts
        .filter((item: any) =>
          item.category
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        )
        .map((item: any) => item.category)
    )
  );

  const handleProductClick = (id: string) => {
    router.push(`/products/${id}`);
    setSearchOpen(false);
    setSearchTerm("");
  };

  const handleCategorySearch = (category: string) => {
    router.push(
      `/products?category=${encodeURIComponent(category)}`
    );

    setSearchOpen(false);
    setSearchTerm("");
  };

  const handleLogout = () => {
    dispatch(logout());

    dispatch(clearCartState());

    dispatch(clearWishlistState());

    localStorage.removeItem("currentUser");

    setCurrentUser(null);

    setProfileDropdownOpen(false);

    setMobileOpen(false);

    router.push("/login");
  };

  return (
    <>
      {/* HEADER */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="fixed top-0 left-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-xl"
      >
        <div className="container-custom flex h-[74px] sm:h-20 items-center justify-between">
          {/* LEFT */}
          <div className="flex items-center gap-8">
            {/* LOGO */}
            <Link href="/">
              <div className="flex flex-col items-start justify-center">
                <div className="relative h-10 w-20 sm:h-12 sm:w-24">
                  <Image
                    src="/images/LOGO.png"
                    alt="NishMee Logo"
                    fill
                    sizes="200px"
                    priority
                    className="object-contain"
                  />
                </div>

                <div className="flex items-center leading-none">
                  <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[5px] text-[#111827]">
                    nish
                  </span>

                  <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[5px] text-[#c9a96e]">
                    mee
                  </span>
                </div>
              </div>
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden lg:flex items-center gap-7 xl:gap-10 ml-44">
              {navLinks.map((link: any) =>
                link.dropdown ? (
                  <div
                    key={link.name}
                    className="relative"
                    onMouseEnter={() =>
                      setActiveDropdown(link.name)
                    }
                    onMouseLeave={() =>
                      setActiveDropdown(null)
                    }
                  >
                    <button className="flex items-center gap-1 text-[15px] font-medium text-[#111827] hover:text-[#c9a96e] transition">
                      {link.name}
                      <FiChevronDown size={14} />
                    </button>

                    <AnimatePresence>
                      {activeDropdown === link.name && (
                        <motion.div
                          initial={{
                            opacity: 0,
                            y: 10,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          exit={{
                            opacity: 0,
                            y: 10,
                          }}
                          className="absolute left-0 top-full mt-3 w-60 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl"
                        >
                          {link.dropdown.map(
                            (item: any) => (
                              <Link
                                key={item.name}
                                href={item.href}
                                className="block px-5 py-3 text-[14px] text-[#111827] hover:bg-[#f8f5f0] hover:text-[#c9a96e]"
                              >
                                {item.name}
                              </Link>
                            )
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-[15px] font-medium text-[#111827] hover:text-[#c9a96e]"
                  >
                    {link.name}
                  </Link>
                )
              )}
            </nav>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* SEARCH */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center justify-center text-[19px] sm:text-[20px] text-black transition hover:scale-110"
            >
              <FiSearch />
            </button>

            {/* DESKTOP AUTH */}
            {currentUser ? (
              <div className="hidden md:flex items-center gap-3">
                <div
                  ref={profileRef}
                  className="relative"
                >
                  <button
                    onClick={() =>
                      setProfileDropdownOpen(
                        (prev) => !prev
                      )
                    }
                    className="flex h-11 items-center gap-2 rounded-full bg-black px-5 text-sm font-semibold text-white transition hover:bg-[#c9a96e]"
                  >
                    <FiUser className="text-[16px]" />

                    <span className="max-w-[120px] truncate">
                      {currentUser.name}
                    </span>

                    <svg
                      className={`ml-1 h-3 w-3 transition-transform duration-200 ${profileDropdownOpen
                        ? "rotate-180"
                        : ""
                        }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  <AnimatePresence>
                    {profileDropdownOpen && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          y: 8,
                          scale: 0.96,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          scale: 1,
                        }}
                        exit={{
                          opacity: 0,
                          y: 8,
                          scale: 0.96,
                        }}
                        transition={{
                          duration: 0.18,
                        }}
                        className="absolute right-0 top-[calc(100%+10px)] z-[999] w-52 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl"
                      >
                        <div className="border-b border-gray-100 px-4 py-3">
                          <p className="text-[13px] font-semibold text-[#111827] truncate">
                            {currentUser.name}
                          </p>

                          <p className="text-[11px] text-gray-400 truncate">
                            {currentUser.email}
                          </p>
                        </div>

                        <div className="py-1">
                          {profileMenuItems.map(
                            (item) => (
                              <Link
                                key={item.name}
                                href={item.href}
                                onClick={() =>
                                  setProfileDropdownOpen(
                                    false
                                  )
                                }
                                className="flex items-center gap-3 px-4 py-3 text-[14px] font-medium text-[#111827] transition hover:bg-[#f8f5f0] hover:text-[#c9a96e]"
                              >
                                <item.icon className="text-[16px] shrink-0" />

                                {item.name}
                              </Link>
                            )
                          )}
                        </div>

                        <div className="border-t border-gray-100 py-1">
                          <button
                            onClick={handleLogout}
                            className="flex w-full items-center gap-3 px-4 py-3 text-[14px] font-medium text-red-500 transition hover:bg-red-50"
                          >
                            <FiLogOut className="text-[16px] shrink-0" />
                            Logout
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden md:flex items-center justify-center text-[22px] text-black transition hover:scale-110"
              >
                <FiUser />
              </Link>
            )}

            {/* WISHLIST */}
            <Link
              href="/wishlist"
              className="relative flex items-center justify-center text-[19px] sm:text-[20px] text-black transition hover:scale-110"
            >
              <FiHeart />

              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] text-white">
                {wishlistItems.length}
              </span>
            </Link>

            {/* CART */}
            <Link
              href="/cart"
              className="relative flex items-center justify-center text-[19px] sm:text-[20px] text-black transition hover:scale-110"
            >
              <FiShoppingBag />

              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] text-white">
                {cartItems.length}
              </span>
            </Link>

            {/* MOBILE MENU BUTTON */}
            <button
              type="button"
              aria-label="Toggle Menu"
              className="relative z-[999] flex lg:hidden items-center justify-center text-[24px] text-black transition active:scale-95"
              onClick={() =>
                setMobileOpen((prev) => !prev)
              }
            >
              {mobileOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* SEARCH MODAL */}
      <AnimatePresence>
        {searchOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSearchOpen(false)}
              className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.3 }}
              className="fixed left-1/2 top-24 z-[70] w-[92%] max-w-2xl -translate-x-1/2 rounded-3xl bg-white p-5 shadow-2xl"
            >
              <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-[#f8f5f0] px-4 py-4">
                <FiSearch className="text-[20px] text-gray-500" />

                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) =>
                    setSearchTerm(e.target.value)
                  }
                  placeholder="Search products or categories..."
                  className="w-full bg-transparent text-[15px] text-black placeholder:text-gray-400 outline-none"
                />

                <button
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchTerm("");
                  }}
                  className="text-[20px] text-gray-500 transition hover:text-black"
                >
                  <FiX />
                </button>
              </div>

              {searchTerm && (
                <div className="mt-4 max-h-[420px] overflow-y-auto rounded-2xl border border-gray-100 bg-white">
                  {matchedCategories.length > 0 && (
                    <div className="border-b border-gray-100 p-3">
                      <p className="mb-3 px-2 text-[11px] font-bold uppercase tracking-[2px] text-gray-400">
                        Categories
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {matchedCategories.map(
                          (category: any, index) => (
                            <button
                              key={index}
                              onClick={() =>
                                handleCategorySearch(
                                  category
                                )
                              }
                              className="rounded-full bg-[#f8f5f0] px-4 py-2 text-[13px] font-medium text-[#111827] transition hover:bg-[#c9a96e] hover:text-white"
                            >
                              {category}
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  )}

                  {filteredProducts.length > 0 ? (
                    filteredProducts.map(
                      (item: any) => (
                        <button
                          key={item._id}
                          onClick={() =>
                            handleProductClick(item._id)
                          }
                          className="flex w-full items-center gap-4 border-b border-gray-100 px-4 py-4 text-left transition hover:bg-[#f8f5f0]"
                        >
                          <div className="relative h-16 w-16 overflow-hidden rounded-xl bg-gray-100">
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              className="object-cover"
                            />
                          </div>

                          <div className="flex-1">
                            <h3 className="text-[15px] font-semibold text-[#111827]">
                              {item.title}
                            </h3>

                            <p className="mt-1 text-[13px] text-gray-500">
                              {item.category}
                            </p>

                            <p className="mt-1 text-[14px] font-bold text-[#c9a96e]">
                              ₹{item.price}
                            </p>
                          </div>
                        </button>
                      )
                    )
                  ) : matchedCategories.length === 0 ? (
                    <div className="px-4 py-6 text-center text-sm text-gray-500">
                      No products or categories found
                    </div>
                  ) : null}
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-[998] bg-black/40 lg:hidden"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
              className="fixed right-0 top-0 z-[999] flex h-screen w-[82%] max-w-[340px] flex-col overflow-y-auto bg-white shadow-2xl lg:hidden"
            >
              {/* TOP */}
              <div className="flex items-center justify-between border-b border-gray-200 px-5 py-5">
                <span className="text-[13px] font-semibold uppercase tracking-widest text-gray-400">
                  Menu
                </span>

                <button
                  onClick={() =>
                    setMobileOpen(false)
                  }
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-[22px] text-black transition hover:bg-black hover:text-white"
                >
                  <FiX />
                </button>
              </div>

              {/* USER */}
              {currentUser ? (
                <div className="border-b border-gray-100 px-5 py-4">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-white text-[14px] font-semibold uppercase">
                      {currentUser.name?.charAt(0)}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-[14px] font-semibold text-[#111827]">
                        {currentUser.name}
                      </p>

                      <p className="truncate text-[12px] text-gray-400">
                        {currentUser.email}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      setMobileProfileOpen(
                        (prev) => !prev
                      )
                    }
                    className="flex w-full items-center justify-between rounded-xl bg-[#f8f5f0] px-4 py-3 text-[13px] font-medium text-[#111827]"
                  >
                    <span className="flex items-center gap-2">
                      <FiUser className="text-[15px]" />
                      Account
                    </span>

                    <svg
                      className={`h-3.5 w-3.5 transition-transform duration-200 ${mobileProfileOpen
                        ? "rotate-180"
                        : ""
                        }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  <AnimatePresence>
                    {mobileProfileOpen && (
                      <motion.div
                        initial={{
                          height: 0,
                          opacity: 0,
                        }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                        }}
                        transition={{
                          duration: 0.22,
                        }}
                        className="overflow-hidden"
                      >
                        <div className="mt-2 rounded-xl border border-gray-100 overflow-hidden">
                          {profileMenuItems.map(
                            (item) => (
                              <Link
                                key={item.name}
                                href={item.href}
                                onClick={() =>
                                  setMobileOpen(false)
                                }
                                className="flex items-center gap-3 border-b border-gray-100 px-4 py-3 text-[14px] font-medium text-[#111827] transition hover:bg-[#f8f5f0]"
                              >
                                <item.icon className="text-[16px] shrink-0" />

                                {item.name}
                              </Link>
                            )
                          )}

                          <button
                            onClick={handleLogout}
                            className="flex w-full items-center gap-3 px-4 py-3 text-[14px] font-medium text-red-500 transition hover:bg-red-50"
                          >
                            <FiLogOut className="text-[16px] shrink-0" />
                            Logout
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="border-b border-gray-100 px-5 py-4">
                  <Link
                    href="/login"
                    onClick={() =>
                      setMobileOpen(false)
                    }
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-black py-3 text-[14px] font-semibold text-white transition hover:bg-[#c9a96e]"
                  >
                    <FiUser />
                    Login / Sign up
                  </Link>
                </div>
              )}

              {/* NAV LINKS */}
              {/* NAV LINKS */}
              <nav className="flex flex-1 flex-col py-3">
                {navLinks.map((link: any) =>
                  link.dropdown ? (
                    <div key={link.name}>
                      <button
                        onClick={() =>
                          setMobileDropdown((prev) =>
                            prev === link.name ? null : link.name
                          )
                        }
                        className="flex w-full items-center justify-between px-5 py-4 text-[15px] font-medium text-[#111827] transition hover:bg-[#f8f5f0] hover:text-[#c9a96e]"
                      >
                        <span>{link.name}</span>
                        <svg
                          className={`h-4 w-4 transition-transform duration-200 ${mobileDropdown === link.name ? "rotate-180" : ""
                            }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>

                      <AnimatePresence>
                        {mobileDropdown === link.name && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.22 }}
                            className="overflow-hidden bg-[#f8f5f0]"
                          >
                            {link.dropdown.map((item: any) => (
                              <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => {
                                  setMobileOpen(false);
                                  setMobileDropdown(null);
                                }}
                                className="flex items-center gap-2 border-t border-gray-200 px-8 py-3 text-[14px] font-medium text-[#444] transition hover:text-[#c9a96e]"
                              >
                                <span className="h-1 w-1 rounded-full bg-[#c9a96e]" />
                                {item.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center px-5 py-4 text-[15px] font-medium text-[#111827] transition hover:bg-[#f8f5f0] hover:text-[#c9a96e]"
                    >
                      {link.name}
                    </Link>
                  )
                )}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}