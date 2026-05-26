"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { clearCartState } from "@/store/features/cartSlice";
import { clearWishlistState } from "@/store/features/wishlistSlice";

import {
  FiShoppingBag,
  FiHeart,
  FiMenu,
  FiX,
  FiUser,
  FiSearch,
  FiLogOut,
} from "react-icons/fi";

import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/store/store";

import { logout } from "@/store/features/authSlice";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/products" },
  { name: "Collections", href: "/collections" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const dispatch = useDispatch();

  const [mobileOpen, setMobileOpen] = useState(false);

  const { cartItems } = useSelector(
    (state: RootState) => state.cart
  );

  const { wishlistItems } = useSelector(
    (state: RootState) => state.wishlist
  );

  const { currentUser } = useSelector(
    (state: RootState) => state.auth
  );

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="fixed top-0 left-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-xl"
      >
        <div className="container-custom flex h-[74px] sm:h-20 items-center justify-between">

          {/* LEFT */}
          <div className="flex items-center gap-4 lg:gap-10">

            {/* Mobile Menu Button */}
            <button
              className="flex lg:hidden items-center justify-center text-[22px] text-black transition hover:scale-110"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label="Toggle Menu"
            >
              {mobileOpen ? <FiX /> : <FiMenu />}
            </button>

            {/* Logo */}
            <Link href="/">
              <div className="flex flex-col items-center justify-center">

                <div className="relative h-10 w-20 sm:h-12 sm:w-24">
                  <Image
                    src="/images/LOGO.png"
                    alt="NishMee Logo"
                    fill
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

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-[15px] font-medium text-[#111827] transition hover:text-[#c9a96e]"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3 sm:gap-4">

            {/* Search */}
            <button className="hidden sm:flex text-[20px] text-black transition hover:scale-110">
              <FiSearch />
            </button>

            {/* Desktop Auth */}
            {currentUser ? (

              <div className="hidden md:flex items-center gap-3">

                {/* Profile */}
                <Link
                  href="/profile"
                  className="flex h-11 items-center gap-2 rounded-full bg-black px-5 text-sm font-semibold text-white transition hover:bg-[#c9a96e]"
                >
                  <FiUser className="text-[16px]" />

                  <span className="max-w-[120px] truncate">
                    {currentUser.name}
                  </span>
                </Link>

                {/* Logout */}
                <button
                  onClick={() => {
                    dispatch(logout());
                    dispatch(clearCartState());
                    dispatch(clearWishlistState());
                  }}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-300 text-[18px] text-black transition hover:bg-black hover:text-white"
                >
                  <FiLogOut />
                </button>

              </div>

            ) : (

              <Link
                href="/login"
                className="hidden md:flex items-center justify-center text-[22px] text-black transition hover:scale-110"
              >
                <FiUser />
              </Link>

            )}

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative flex items-center justify-center text-[20px] text-black transition hover:scale-110"
            >
              <FiHeart />

              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] text-white">
                {wishlistItems.length}
              </span>
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative flex items-center justify-center text-[20px] text-black transition hover:scale-110"
            >
              <FiShoppingBag />

              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] text-white">
                {cartItems.length}
              </span>
            </Link>

          </div>
        </div>
      </motion.header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (

          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3 }}
              className="fixed left-0 top-0 z-50 flex h-screen w-[82%] max-w-[340px] flex-col overflow-y-auto bg-white shadow-2xl lg:hidden"
            >

              {/* Top */}
              <div className="flex items-center justify-between border-b border-gray-200 px-5 py-5">

                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                >
                  <div className="flex flex-col">

                    <div className="relative h-10 w-20">
                      <Image
                        src="/images/LOGO.png"
                        alt="NishMee Logo"
                        fill
                        className="object-contain"
                      />
                    </div>

                    <div className="flex items-center leading-none">
                      <span className="text-[9px] font-black uppercase tracking-[5px] text-[#111827]">
                        nish
                      </span>

                      <span className="text-[9px] font-black uppercase tracking-[5px] text-[#c9a96e]">
                        mee
                      </span>
                    </div>

                  </div>
                </Link>

                <button
                  onClick={() => setMobileOpen(false)}
                  className="text-[24px] text-black"
                >
                  <FiX />
                </button>

              </div>

              {/* Mobile User Info */}
              {currentUser ? (

                <div className="border-b border-gray-200 bg-[#f8f5f0] px-5 py-5">

                  <div className="flex items-center gap-3">

                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white">
                      <FiUser className="text-[18px]" />
                    </div>

                    <div>
                      <p className="text-[13px] text-gray-500">
                        Logged in as
                      </p>

                      <h3 className="max-w-[180px] truncate text-[16px] font-bold text-[#111827]">
                        {currentUser.name}
                      </h3>
                    </div>

                  </div>

                  {/* Mobile Profile Button */}
                  <Link
                    href="/profile"
                    onClick={() => setMobileOpen(false)}
                    className="mt-4 flex h-11 items-center justify-center rounded-full bg-black text-sm font-semibold text-white transition hover:bg-[#c9a96e]"
                  >
                    View Profile
                  </Link>

                </div>

              ) : (

                <div className="border-b border-gray-200 px-5 py-5">

                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="flex h-12 items-center justify-center gap-2 rounded-full bg-black text-sm font-semibold text-white transition hover:bg-[#c9a96e]"
                  >
                    <FiUser />
                    Login / Signup
                  </Link>

                </div>

              )}

              {/* Nav Links */}
              <nav className="flex flex-1 flex-col py-3">

                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center px-5 py-4 text-[15px] font-medium text-[#111827] transition hover:bg-[#f8f5f0] hover:text-[#c9a96e]"
                  >
                    {link.name}
                  </Link>
                ))}

              </nav>

              {/* Bottom Logout */}
              {currentUser && (

                <div className="border-t border-gray-200 p-5">

                  <button
                    onClick={() => {
                      dispatch(logout());
                      dispatch(clearCartState());
                      dispatch(clearWishlistState());
                      setMobileOpen(false);
                    }}
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-full border border-red-200 bg-red-50 text-sm font-semibold text-red-500 transition hover:bg-red-500 hover:text-white"
                  >
                    <FiLogOut />
                    Logout
                  </button>

                </div>

              )}

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}