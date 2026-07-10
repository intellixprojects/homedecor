"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import {
  FiArrowRight,
  FiCheck,
  FiTruck,
  FiShield,
  FiAward,
  FiStar,
} from "react-icons/fi";

import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

const collections = [
  {
    id: 1,
    title: "Ceramic Elegance",
    subtitle: "Ceramic vases and mugs Collection",
    image: "/images/ceremicvasesandmugs.jpeg",
    description:
      "Discover handcrafted ceramic vases and luxury mugs designed with timeless elegance, artistic craftsmanship, and refined details to elevate every modern living space.",
  },
  {
    id: 2,
    title: "Premium Wall Decor",
    subtitle: "Premium wall decor in square box designs.",
    image: "/images/premiumwalldecor.jpeg",
    description:
      "Enhance your interiors with handcrafted ceramic and marble wall decor featuring elegant square designs crafted for timeless luxury and modern living spaces.",
  },
  {
    id: 3,
    title: "Colorful Decor",
    subtitle: "Elegant idols & hanging plates.",
    image: "/images/printedplates.jpeg",
    description:
      "Enhance your interiors with elegant handcrafted idols and decorative hanging plates created for luxurious and modern living spaces.",
  },
];

export default function CollectionsPage() {
  return (
    <>

      <section className="bg-[#f8f5f0] overflow-hidden">

        {/* ── HERO ── */}
        <div className="relative overflow-hidden px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20 lg:pb-24">

          {/* Blur Effects */}
          <div className="absolute top-0 left-0 w-64 sm:w-80 lg:w-[500px] h-64 sm:h-80 lg:h-[500px] bg-[#e7d8c8] rounded-full blur-3xl opacity-40 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-56 sm:w-72 lg:w-[450px] h-56 sm:h-72 lg:h-[450px] bg-[#d8c3ae] rounded-full blur-3xl opacity-30 pointer-events-none" />

          <div className="max-w-7xl mx-auto w-full relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-center"
            >
              <p className="uppercase tracking-[5px] sm:tracking-[6px] text-xs sm:text-sm text-gray-500 font-medium mb-4 sm:mb-5">
                Premium Collections
              </p>

              <h1 className="text-[42px] sm:text-[52px] md:text-[60px] lg:text-[68px] font-bold text-black leading-[1.1] mb-5 sm:mb-6">
                Crafted For
                <br />
                Timeless Elegance
              </h1>

              <p className="text-[15px] sm:text-[16px] lg:text-[18px] text-gray-600 mx-auto leading-8 max-w-xl sm:max-w-2xl lg:max-w-[760px] mb-8 sm:mb-10">
                Discover our handcrafted ceramic and marble collections, thoughtfully
                designed to bring elegance, artistry, and luxury into every space with
                timeless decor pieces made for modern living.
              </p>

              <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-3 h-[50px] sm:h-[54px] rounded-full px-6 sm:px-7 text-[14px] sm:text-[15px] font-semibold bg-black text-white hover:bg-[#1f1f1f] transition duration-300"
                >
                  Explore Products
                  <FiArrowRight />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 h-[50px] sm:h-[54px] rounded-full px-6 sm:px-7 text-[14px] sm:text-[15px] font-semibold border border-black text-black hover:bg-black hover:text-white transition duration-300"
                >
                  Contact Us
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── STATS ── */}
        <div className="px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 lg:pb-24">
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {[
                { number: "25K+", title: "Happy Customers" },
                { number: "120+", title: "Luxury Collections" },
                { number: "5+",   title: "Years Experience" },
                { number: "99%",  title: "Positive Reviews" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white shadow-sm hover:shadow-xl transition duration-500 text-center px-4 py-6 sm:py-7 rounded-[20px] sm:rounded-[24px]"
                >
                  <h2 className="text-[28px] sm:text-[34px] lg:text-[42px] font-bold text-black mb-2 sm:mb-2.5">
                    {item.number}
                  </h2>
                  <p className="text-gray-500 text-sm sm:text-base">{item.title}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ── COLLECTIONS ── */}
        <div className="px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 lg:pb-24">
          <div className="max-w-7xl mx-auto w-full">

            {/* Section Header */}
            <div className="text-center mb-12 sm:mb-14 lg:mb-16">
              <p className="uppercase tracking-[5px] text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
                Featured Collections
              </p>
              <h2 className="text-[34px] sm:text-[42px] md:text-[48px] lg:text-[52px] font-bold leading-tight mb-4 sm:mb-5">
                Discover Premium
                <br />
                Ceramic & Marble Collections
              </h2>
              <p className="text-gray-600 mx-auto leading-8 text-sm sm:text-base max-w-xl sm:max-w-2xl lg:max-w-[720px]">
                Explore our handcrafted ceramic and marble collections, designed with
                timeless artistry, elegant details, and premium craftsmanship to bring
                luxury and sophistication into every space.
              </p>
            </div>

            <div className="flex flex-col gap-12 sm:gap-14 lg:gap-16">
              {collections.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 80 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-14 items-center ${
                    index % 2 !== 0 ? "lg:grid-flow-col-dense" : ""
                  }`}
                >
                  {/* IMAGE */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.5 }}
                    className={`relative overflow-hidden h-[300px] sm:h-[420px] lg:h-[520px] rounded-[22px] sm:rounded-[28px] ${
                      index % 2 !== 0 ? "lg:col-start-2" : ""
                    }`}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover hover:scale-110 transition duration-700"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                  </motion.div>

                  {/* CONTENT */}
                  <div>
                    <div className="inline-flex items-center gap-2 bg-white shadow-sm px-4 sm:px-[18px] py-2.5 rounded-full mb-5 sm:mb-6 text-sm sm:text-base">
                      <FiStar />
                      Premium Collection
                    </div>

                    <h2 className="text-[30px] sm:text-[38px] md:text-[42px] lg:text-[48px] font-bold leading-tight mb-4">
                      {item.title}
                    </h2>

                    <p className="text-black font-semibold text-[16px] sm:text-[18px] mb-4">
                      {item.subtitle}
                    </p>

                    <p className="text-gray-600 leading-8 text-sm sm:text-base mb-7 sm:mb-8">
                      {item.description}
                    </p>

                    {/* FEATURES */}
                    <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 mb-7 sm:mb-8">
                      {[
                        "Handcrafted Quality",
                        "Timeless Design",
                        "Luxury Ceramic Art",
                        "Refined Finishing",
                      ].map((feature) => (
                        <div
                          key={feature}
                          className="flex items-center gap-3 bg-white p-3.5 sm:p-[14px] rounded-[18px] sm:rounded-[20px]"
                        >
                          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                            <FiCheck />
                          </div>
                          <p className="font-medium text-gray-700 text-sm">{feature}</p>
                        </div>
                      ))}
                    </div>

                    <Link
                      href="/products"
                      className="inline-flex items-center gap-3 h-[50px] sm:h-[54px] rounded-full px-6 sm:px-7 font-semibold text-[14px] bg-black text-white hover:bg-[#1f1f1f] transition duration-300"
                    >
                      Shop Collection
                      <FiArrowRight />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ── WHY CHOOSE US ── */}
        <div className="bg-white px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="max-w-7xl mx-auto w-full">

            <div className="text-center mb-12 sm:mb-14 lg:mb-16">
              <p className="uppercase tracking-[5px] text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
                Why Choose Us
              </p>
              <h2 className="text-[34px] sm:text-[42px] md:text-[48px] lg:text-[52px] font-bold leading-tight">
                Premium Experience
                <br />
                Built For Luxury
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {[
                { icon: <FiTruck />,  title: "Fast Delivery",   text: "Premium delivery services with secure packaging and fast shipping." },
                { icon: <FiShield />, title: "Secure Payments", text: "Trusted checkout systems designed for secure luxury shopping." },
                { icon: <FiAward />,  title: "Premium Quality", text: "Crafted with elegant premium materials and luxury craftsmanship." },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-[#f8f5f0] hover:bg-black hover:text-white transition duration-500 group p-6 sm:p-7 lg:p-[30px] rounded-[24px] sm:rounded-[28px]"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white text-black flex items-center justify-center text-xl sm:text-2xl mb-5 sm:mb-6">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-[22px] sm:text-[26px] mb-3 sm:mb-3.5">
                    {item.title}
                  </h3>
                  <p className="leading-8 text-gray-500 group-hover:text-gray-300 transition text-sm sm:text-base">
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

      </section>

      <Footer />
    </>
  );
}