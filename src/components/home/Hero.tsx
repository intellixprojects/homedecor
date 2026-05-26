"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden pt-20 pb-16 sm:pt-24 sm:pb-20 lg:pt-28 lg:pb-20 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://plus.unsplash.com/premium_photo-1681412205156-bb506a4ea970?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Background Blur */}
      <div className="absolute top-0 left-0 w-72 h-72 sm:w-96 sm:h-96 lg:w-[500px] lg:h-[500px] bg-[#e7d9c9] rounded-full blur-3xl opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-center">

        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="text-center lg:text-left"
        >
          <p className="uppercase tracking-[5px] text-[11px] text-[#c9a96e] font-semibold mb-4">
            Handcrafted Ceramic & Marble Art
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl leading-tight font-black text-white">
            Elegant Decor
            <span className="block text-[#e5d7c8]">
              Crafted For Timeless Spaces
            </span>
          </h1>

          <p className="max-w-lg mx-auto lg:mx-0 mt-6 leading-8 text-white/80 text-base sm:text-lg">
            Transform your home with premium ceramic decor, marble dust art, luxury mugs, idols, wall decor, and handcrafted pieces designed for timeless elegance.
          </p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex flex-wrap justify-center lg:justify-start gap-4 mt-7"
          >
            <button className="px-6 py-2 bg-[#d6bfa7] text-black text-sm tracking-[3px] uppercase rounded-full hover:bg-white transition-all duration-300 hover:scale-105 font-semibold font-[Jost,sans-serif]">
              Shop Now
            </button>

            <button className="px-8 py-4 border border-white text-white text-sm tracking-[3px] uppercase rounded-full hover:bg-white hover:text-black transition-all duration-500 font-semibold font-[Jost,sans-serif]">
              Explore
            </button>
          </motion.div>
        </motion.div>

        {/* Right Images */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="relative h-[500px] sm:h-[600px] lg:h-[700px] hidden lg:block"
        >
          {/* Main Image */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-24 left-10"
          >
            <Image
              src="/images/hero1.jpeg"
              alt="Decor"
              width={250}
              height={300}
              className="rounded-[40px] object-cover shadow-2xl border border-white/10"
            />
          </motion.div>

          {/* Second Image */}
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute bottom-28 right-0"
          >
            <Image
              src="/images/hero2.jpeg"
              alt="Decor"
              width={250}
              height={300}
              className="rounded-[40px] object-cover shadow-2xl border border-white/10"
            />
          </motion.div>

          {/* Third Image */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute top-52 right-32"
          >
            <Image
              src="/images/hero3.jpeg"
              alt="Decor"
              width={250}
              height={300}
              className="rounded-[40px] object-cover shadow-2xl border border-white/10"
            />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}