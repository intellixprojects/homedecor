"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden bg-cover bg-center bg-no-repeat min-h-screen flex items-center"
      style={{
        backgroundImage: "url('/images/hero-bg.jpeg')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Gradient Glow */}
      <div className="absolute top-[-120px] left-[-120px] h-[320px] w-[320px] rounded-full bg-[#d6bfa7]/20 blur-3xl" />

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 lg:pt-24 pb-14 sm:pb-16">
        <div className="grid lg:grid-cols-2 items-center gap-12 lg:gap-8">

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="text-center lg:text-left"
          >
            {/* Small Tag */}
            <div className="inline-flex items-center gap-3 mb-5">
              <span className="w-8 h-px bg-[#d6bfa7]" />

              <p className="uppercase tracking-[4px] text-[10px] sm:text-xs text-[#d6bfa7] font-semibold">
                Luxury Decor • Corporate Gifts
              </p>

              <span className="w-8 h-px bg-[#d6bfa7]" />
            </div>

            {/* Heading */}
            <h1 className="text-white font-black leading-[1.05] text-3xl sm:text-4xl md:text-5xl lg:text-[56px] max-w-xl mx-auto lg:mx-0">
              Where Luxury

              <span className="block text-[#e7d9c9] mt-1">
                Meets Lifestyle
              </span>

              <span className="block text-[#e7d9c9]">
                & Meaningful Gifting
              </span>
            </h1>

            {/* Description */}
            <p className="mt-6 text-sm sm:text-base lg:text-lg leading-7 sm:leading-8 text-white/75 max-w-xl mx-auto lg:mx-0">
              Discover handcrafted spiritual decor, elegant home accents, premium sculptures, and thoughtfully curated corporate gifts designed to inspire, impress, and leave a lasting impression.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link href="/products">
                <button className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#d6bfa7] text-black text-xs sm:text-sm font-semibold uppercase tracking-[3px] transition-all duration-300 hover:bg-white hover:scale-105">
                  Shop now
                </button>
              </Link>

              <Link href="/collections">
                <button className="w-full sm:w-auto px-7 py-3 rounded-full border border-white/40 text-white text-xs sm:text-sm font-semibold uppercase tracking-[3px] hover:bg-white hover:text-black transition-all duration-300">
                  Explore
                </button>
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-8">
              {[
                { number: "Trusted", label: "Craftsmanship" },
                { number: "Spiritual", label: "Collection" },
                { number: "Premium", label: "Decor Pieces" },
              ].map((item, index) => (
                <div key={index}>
                  <h3 className="text-white text-2xl sm:text-3xl font-bold">
                    {item.number}
                  </h3>

                  <p className="text-white/60 text-xs sm:text-sm mt-1">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Images */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative hidden lg:flex items-center justify-center h-[480px]"
          >
            {/* Main Image */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="relative z-20"
            >
              <Image
                src="/images/hero1.jpeg"
                alt="Luxury Decor"
                width={210}
                height={420}
                className="rounded-[36px] object-cover shadow-2xl border border-white/10"
              />
            </motion.div>

            {/* Top Image */}
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute top-0 right-8 z-20 "
            >
              <Image
                src="/images/buddha/buddha1.png"
                alt="Decor"
                width={190}
                height={220}
                className="rounded-[28px] object-cover shadow-xl border border-white/10"
              />
            </motion.div>

            {/* Bottom Image */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="absolute bottom-6 left-4 z-10 mb-5"
            >
              <Image
                src="/images/monk/monk1.jpeg"
                alt="Decor"
                width={190}
                height={250}
                className="rounded-[28px] object-cover shadow-xl border border-white/10"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}