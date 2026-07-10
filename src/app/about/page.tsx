"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiArrowUpRight,
  FiHeart,
  FiStar,
  FiShield,
  FiTruck,
  FiCheck,
  FiAward,
} from "react-icons/fi";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

const values = [
  {
    icon: <FiAward />,
    title: "Sacred Craftsmanship",
    desc: "Every idol and spiritual piece is handcrafted with devotion, precision, and deep artistic reverence.",
  },
  {
    icon: <FiHeart />,
    title: "Divine Aesthetics",
    desc: "Designs rooted in spiritual tradition, elevated with luxury materials for modern sacred spaces.",
  },
  {
    icon: <FiShield />,
    title: "Blessed Quality",
    desc: "Premium marble dust, ceramic, and resin — durable materials that honor the sanctity of each piece.",
  },
  {
    icon: <FiTruck />,
    title: "Safe Sacred Delivery",
    desc: "Every spiritual piece is packed with care and shipped securely to your doorstep, worldwide.",
  },
];

const highlights = [
  "Handcrafted Spiritual Idols",
  "Luxury Marble Dust Art",
  "Sacred Wall Decor",
  "Divine Ceramic Collection",
  "Premium Pooja Decor",
  "Modern Devotional Designs",
];

export default function AboutPage() {
  return (
    <>

      <main className="bg-[#f8f5f0] overflow-hidden">

        {/* ── HERO ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-32 pb-16 sm:pb-20">
          <div className="grid lg:grid-cols-2 items-center gap-10 lg:gap-16">

            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="text-center lg:text-left"
            >
              <span className="inline-block mb-5 px-4 py-1.5 rounded-full text-[#c9a96e] text-[11px] font-bold uppercase tracking-[4px]">
                About NishMee
              </span>

              <h1 className="font-black text-[#111827] leading-[1.1] text-[clamp(36px,6vw,64px)] mb-6">
                Where Luxury
                <br />
                <span className="text-[#c9a96e]">Meets the Divine</span>
              </h1>

              <p className="text-gray-500 leading-[1.9] text-[15px] max-w-[540px] mx-auto lg:mx-0 mb-8">
                NishMee brings together the sacred and the beautiful — handcrafted
                spiritual idols, marble dust masterpieces, and luxury decor that
                transform your home into a space of divine elegance and inner peace.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <Link
                  href="/products"
                  className="h-[52px] px-7 rounded-full text-[14px] font-bold bg-[#111827] text-white hover:bg-[#1f2937] transition-all duration-300 flex items-center gap-2"
                >
                  Shop Collection
                  <FiArrowUpRight />
                </Link>
              </div>
            </motion.div>

            {/* Right image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="relative bg-white rounded-[28px] sm:rounded-[34px] p-3 sm:p-[14px] shadow-[0_12px_50px_rgba(0,0,0,0.08)]">
                <div className="relative w-full h-[340px] sm:h-[420px] lg:h-[500px] overflow-hidden rounded-[20px] sm:rounded-[26px]">
                  <Image
                    src="/images/Idols/idols1.jpeg"
                    alt="Spiritual luxury decor"
                    fill
                    className="object-cover hover:scale-105 transition duration-700"
                  />
                  {/* Gold overlay strip */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-[20px]" />
                </div>

                {/* Floating badge */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm px-4 py-3.5 rounded-[18px] shadow-[0_8px_30px_rgba(0,0,0,0.10)]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#f8f5f0] rounded-full flex items-center justify-center shrink-0">
                      <FiStar className="text-[#c9a96e] text-[16px]" />
                    </div>
                    <div>
                      <p className="font-black text-[#111827] text-[13px] leading-none mb-0.5">Divine Handcrafted Art</p>
                      <p className="text-gray-400 text-[11px]">Spiritual · Luxury · Timeless</p>
                    </div>
                    <div className="ml-auto text-right">
                      <p className="font-black text-[#111827] text-[18px] leading-none">500+</p>
                      <p className="text-gray-400 text-[10px] uppercase tracking-wider">Products</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── DIVIDER ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-[#e5ddd3]" />
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#c9a96e]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#c9a96e]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#c9a96e]" />
            </div>
            <div className="flex-1 h-px bg-[#e5ddd3]" />
          </div>
        </div>

        {/* ── OUR STORY ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="grid lg:grid-cols-2 items-center gap-10 lg:gap-16">

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="order-2 lg:order-1"
            >
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="relative h-[200px] sm:h-[260px] lg:h-[300px] rounded-[20px] sm:rounded-[24px] overflow-hidden">
                  <Image src="/images/showpieces/showpiece1.jpeg" alt="Spiritual decor" fill className="object-cover" />
                </div>
                <div className="relative h-[200px] sm:h-[260px] lg:h-[300px] rounded-[20px] sm:rounded-[24px] overflow-hidden mt-6 sm:mt-8">
                  <Image src="/images/Idols/idols1.jpeg" alt="Luxury idol" fill className="object-cover" />
                </div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center lg:text-left order-1 lg:order-2"
            >
              <p className="uppercase text-[#c9a96e] font-bold tracking-[4px] text-[11px] mb-1">
                Our Story
              </p>

              <h2 className="font-black text-[#111827] leading-[1.15] text-[clamp(28px,5vw,48px)] mb-5">
                Born from Devotion,
                <br />Crafted with Soul
              </h2>

              <p className="text-gray-500 leading-[1.9] text-[15px] mb-4">
                NishMee was born from a deep reverence for India's spiritual heritage and
                its extraordinary craft traditions. We saw an opportunity to bring
                hand-made devotional art into contemporary homes — not as mere objects,
                but as living expressions of faith and beauty.
              </p>

              <p className="text-gray-500 leading-[1.9] text-[15px] mb-8">
                From intricately sculpted Ganesha idols and radiant Lakshmi figurines
                to marble dust wall art and sacred pooja décor — every NishMee piece
                carries the energy of the artisan's hands and the intention of something
                greater than the material itself.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {highlights.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2.5 bg-white px-4 py-3 rounded-[14px]"
                  >
                    <div className="w-5 h-5 bg-[#111827] text-white rounded-full flex items-center justify-center shrink-0">
                      <FiCheck className="text-[10px]" />
                    </div>
                    <span className="font-semibold text-[#111827] text-[12px] leading-tight">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── VALUES ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="text-center mb-12 sm:mb-16">
            <p className="uppercase text-[#c9a96e] font-bold tracking-[4px] text-[11px] mb-3">
              Why Choose NishMee
            </p>
            <h2 className="font-black text-[#111827] text-[clamp(28px,5vw,50px)] mb-4 leading-tight">
              The NishMee Promise
            </h2>
            <p className="text-gray-500 mx-auto leading-[1.9] text-[15px] max-w-[580px]">
              Every piece we create is an act of devotion — to craft, to beauty,
              and to the sacred spaces you call home.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {values.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group bg-white hover:-translate-y-2 transition-all duration-500 px-6 py-7 rounded-[24px] sm:rounded-[26px]"
              >
                <div className="w-12 h-12 bg-[#111827] text-[#c9a96e] text-[20px] rounded-2xl flex items-center justify-center mb-5 group-hover:bg-[#c9a96e] group-hover:text-[#111827] transition-colors duration-300">
                  {item.icon}
                </div>
                <h3 className="font-black text-[#111827] text-[16px] mb-3">{item.title}</h3>
                <p className="text-gray-500 leading-[1.8] text-[13px]">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 lg:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-[#111827] rounded-[28px] sm:rounded-[34px] px-8 sm:px-12 lg:px-16 py-12 sm:py-14 text-center"
          >
            <p className="uppercase text-[#c9a96e] font-bold tracking-[4px] text-[11px] mb-4">
              Begin Your Journey
            </p>
            <h2 className="font-black text-white text-[clamp(26px,5vw,46px)] leading-tight mb-5">
              Bring the Sacred Home
            </h2>
            <p className="text-gray-400 leading-[1.9] text-[15px] max-w-[500px] mx-auto mb-8">
              Discover our complete collection of spiritual idols, luxury decor,
              and handcrafted art pieces — each one made with devotion and love.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 h-[52px] px-8 rounded-full bg-[#c9a96e] text-[#111827] font-bold text-[14px] hover:bg-[#b8935a] transition-all duration-300"
            >
              Shop the Collection
              <FiArrowUpRight />
            </Link>
          </motion.div>
        </section>

      </main>

      <Footer />
    </>
  );
}