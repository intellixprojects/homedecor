"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import {
  FiArrowUpRight,
  FiAward,
  FiHeart,
  FiStar,
  FiShield,
  FiTruck,
  FiCheck,
} from "react-icons/fi";

import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

const values = [
  {
    icon: <FiAward />,
    title: "Premium Craftsmanship",
    desc: "Every ceramic and marble decor piece is handcrafted with precision and artistic excellence.",
  },
  {
    icon: <FiHeart />,
    title: "Elegant Designs",
    desc: "Luxury handcrafted decor designed to enhance modern interiors with timeless beauty.",
  },
  {
    icon: <FiShield />,
    title: "Trusted Quality",
    desc: "We use durable premium materials to ensure every product feels luxurious and long-lasting.",
  },
  {
    icon: <FiTruck />,
    title: "Worldwide Delivery",
    desc: "Fast and secure shipping experience with safe premium packaging for every order.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <section className="bg-[#f8f5f0] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-28 pb-16 sm:pb-20">

          {/* ── HERO ── */}
          <div className="grid lg:grid-cols-2 items-center gap-10 lg:gap-12 mb-16 sm:mb-20 lg:mb-24">

            {/* LEFT */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="text-center lg:text-left order-1"
            >
              <p className="uppercase text-[#c9a96e] font-semibold tracking-[4px] text-[11px] mb-4">
                About Our Brand
              </p>

              <h1 className="font-black text-[#111827] leading-tight text-[clamp(34px,6vw,62px)] mb-5">
                Handcrafted Ceramic
                <br />& Marble Art
              </h1>

              <p className="text-gray-600 leading-8 text-[15px] max-w-[560px] mx-auto lg:mx-0 mb-7">
                Transform your home with premium ceramic decor, marble dust art,
                luxury mugs, idols, wall decor, and handcrafted pieces designed
                for timeless elegance. Our collections are carefully curated to
                bring warmth, sophistication, and artistic beauty into every space.
              </p>

              {/* BUTTONS */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5">
                <Link
                  href="/products"
                  className="h-[50px] px-6 sm:px-7 rounded-full text-[14px] font-semibold bg-black text-white hover:bg-[#222] transition-all duration-300 flex items-center justify-center"
                >
                  Explore Collection
                </Link>

                <Link
                  href="/collections"
                  className="h-[50px] px-5 sm:px-6 rounded-full text-[14px] font-semibold border border-black hover:bg-black hover:text-white transition-all duration-300 flex items-center gap-2"
                >
                  View Collections
                  <FiArrowUpRight />
                </Link>
              </div>
            </motion.div>

            {/* RIGHT IMAGE */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="order-2"
            >
              <div className="relative overflow-hidden bg-white h-[340px] sm:h-[420px] lg:h-[500px] rounded-[24px] sm:rounded-[30px] p-3 sm:p-[14px] shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
                <div className="relative w-full h-full overflow-hidden rounded-[18px] sm:rounded-[24px]">
                  <Image
                    src="/images/Idols/idols1.jpeg"
                    alt="About"
                    fill
                    className="object-cover hover:scale-105 transition duration-700"
                  />
                </div>

                {/* FLOATING CARD */}
                <div className="absolute bottom-5 sm:bottom-6 left-5 sm:left-6 bg-white px-4 sm:px-[18px] py-3.5 sm:py-4 rounded-[18px] sm:rounded-[20px] shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 sm:w-[46px] sm:h-[46px] bg-[#f8f5f0] rounded-full flex items-center justify-center shrink-0">
                      <FiStar className="text-[#c9a96e]" />
                    </div>

                    <div>
                      <h4 className="font-bold text-black text-[13px] sm:text-[15px] mb-0.5">
                        Luxury Handcrafted Art
                      </h4>

                      <p className="text-gray-500 text-[11px] sm:text-[12px]">
                        Elegant premium decor collection
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── OUR STORY ── */}
          <div className="grid lg:grid-cols-2 items-center gap-10 lg:gap-14 mb-16 sm:mb-20 lg:mb-24">

            {/* CONTENT */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center lg:text-left order-1 lg:order-2"
            >
              <p className="uppercase text-[#c9a96e] font-semibold tracking-[4px] text-[11px] mb-3.5">
                Our Story
              </p>

              <h2 className="font-black text-[#111827] leading-tight text-[clamp(30px,5vw,50px)] mb-5">
                Crafted For
                <br />
                Timeless Spaces
              </h2>

              <p className="text-gray-600 leading-8 text-[15px] mb-4">
                We believe home decor should feel artistic, luxurious, and meaningful.
                Our handcrafted ceramic and marble art collections are inspired by
                timeless aesthetics, traditional craftsmanship, and modern interior trends.
              </p>

              <p className="text-gray-600 leading-8 text-[15px] mb-7">
                From premium mugs and decorative idols to elegant wall decor and luxury
                handcrafted accents, every product is designed to create a sophisticated
                and warm atmosphere in your home.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  "Premium Ceramic Decor",
                  "Luxury Marble Dust Art",
                  "Elegant Wall Decor",
                  "Modern Handmade Designs",
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-white flex items-center gap-3 p-4 rounded-[18px]"
                  >
                    <div className="w-[30px] h-[30px] bg-black text-white rounded-full flex items-center justify-center shrink-0">
                      <FiCheck className="text-sm" />
                    </div>

                    <span className="font-semibold text-black text-[14px]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* IMAGE */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="order-2 lg:order-1"
            >
              <div className="relative overflow-hidden h-[300px] sm:h-[380px] lg:h-[450px] rounded-[24px] sm:rounded-[30px]">
                <Image
                  src="/images/showpieces/showpiece1.jpeg"
                  alt="Story"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>

          {/* ── VALUES ── */}
          <div>
            <div className="text-center mb-12 sm:mb-14">
              <p className="uppercase text-[#c9a96e] font-semibold tracking-[4px] text-[11px] mb-3">
                Why Choose Us
              </p>

              <h2 className="font-black text-[#111827] text-[clamp(30px,5vw,52px)] mb-3.5">
                Luxury Decor Experience
              </h2>

              <p className="text-gray-500 mx-auto leading-8 text-[15px] max-w-[560px] sm:max-w-[650px]">
                Experience premium handcrafted decor made with elegance, creativity,
                and attention to every artistic detail.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              {values.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white hover:-translate-y-2 transition-all duration-500 px-5 sm:px-[22px] py-6 sm:py-7 rounded-[24px] sm:rounded-[26px] shadow-[0_4px_25px_rgba(0,0,0,0.05)]"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#f8f5f0] text-[#c9a96e] text-xl sm:text-[22px] rounded-full flex items-center justify-center mb-5">
                    {item.icon}
                  </div>

                  <h3 className="font-bold text-black text-[16px] sm:text-[18px] mb-3">
                    {item.title}
                  </h3>

                  <p className="text-gray-500 leading-7 text-[14px]">
                    {item.desc}
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