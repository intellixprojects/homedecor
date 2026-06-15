"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiInstagram,
  FiFacebook,
  FiTwitter,
  FiSend,
} from "react-icons/fi";

import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

const contactInfo = [
  {
    icon: <FiPhone />,
    title: "Call Us",
    value: "+91 98765 43210",
    desc: "Mon to Sat • 10AM to 7PM",
  },
  {
    icon: <FiMail />,
    title: "Email Address",
    value: "nishmee@gmail.com",
    desc: "We reply within 24 hours",
  },
  {
    icon: <FiMapPin />,
    title: "Our Office",
    value: "Noida, India",
    desc: "Luxury spiritual and home decor products",
  },
  {
    icon: <FiClock />,
    title: "Working Hours",
    value: "10:00 AM - 7:00 PM",
    desc: "Sunday Closed",
  },
];

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-[#f8f5f0] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-28 pb-16 sm:pb-20">

          {/* ── HERO ── */}
          <div className="text-center mb-14 sm:mb-16 lg:mb-20">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="uppercase text-[#c9a96e] font-semibold tracking-[4px] text-[11px] mb-4"
            >
              Contact Us
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="font-black text-[#111827] leading-tight text-[clamp(30px,5vw,60px)] mb-5"
            >
              Let's Create
              <br />
              Elegant Spaces Together
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-gray-500 mx-auto leading-8 text-[15px] max-w-sm sm:max-w-lg lg:max-w-[700px]"
            >
              Have questions about our handcrafted ceramic and marble decor
              collections? We'd love to help you choose the perfect luxury
              decor pieces for your home.
            </motion.p>
          </div>

          {/* ── CONTACT GRID ── */}
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-6 sm:gap-7 lg:gap-8 mb-14 sm:mb-16 lg:mb-20">

            {/* LEFT INFO */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-white rounded-[24px] sm:rounded-[32px] px-5 sm:px-7 py-7 sm:py-8 shadow-[0_10px_35px_rgba(0,0,0,0.05)]"
            >
              <p className="uppercase text-[#c9a96e] font-semibold tracking-[4px] text-[11px] mb-3.5">
                Get In Touch
              </p>

              <h2 className="font-black text-[#111827] leading-tight text-[clamp(28px,4vw,44px)] mb-4 sm:mb-5">
                We're Here
                <br />
                To Help You
              </h2>

              <p className="text-gray-500 leading-8 text-[14px] mb-7 sm:mb-8">
                Connect with our team for product inquiries, bulk orders,
                collaborations, or personalized decor recommendations.
              </p>

              {/* CONTACT CARDS */}
              <div className="flex flex-col gap-4 sm:gap-[18px]">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-[#f8f5f0] flex items-start gap-4 p-4 sm:p-[18px] rounded-[18px] sm:rounded-[22px]"
                  >
                    <div className="w-12 h-12 sm:w-[54px] sm:h-[54px] bg-white text-[#c9a96e] text-lg sm:text-xl flex items-center justify-center rounded-full shrink-0">
                      {item.icon}
                    </div>

                    <div>
                      <h3 className="font-bold text-black text-[15px] sm:text-[16px] mb-1">
                        {item.title}
                      </h3>
                      <p className="font-semibold text-[#111827] text-[14px] sm:text-[15px] mb-1">
                        {item.value}
                      </p>
                      <p className="text-gray-500 text-[12px] sm:text-[13px]">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* SOCIAL */}
              <div className="mt-8 sm:mt-9">
                <p className="font-semibold text-black text-[14px] sm:text-[15px] mb-4">
                  Follow Us
                </p>
                <div className="flex items-center gap-3">
                  {[FiInstagram, FiFacebook, FiTwitter].map((Icon, index) => (
                    <button
                      key={index}
                      className="w-11 h-11 sm:w-[46px] sm:h-[46px] bg-black text-white hover:scale-110 transition-all duration-300 flex items-center justify-center rounded-full"
                    >
                      <Icon />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* RIGHT FORM */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-white rounded-[24px] sm:rounded-[32px] px-5 sm:px-7 py-7 sm:py-9 shadow-[0_10px_35px_rgba(0,0,0,0.05)]"
            >
              <div className="mb-7 sm:mb-8">
                <p className="uppercase text-[#c9a96e] font-semibold tracking-[4px] text-[11px] mb-3.5">
                  Send Message
                </p>

                <h2 className="font-black text-[#111827] text-[clamp(28px,4vw,46px)] mb-3.5">
                  Contact Form
                </h2>

                <p className="text-gray-500 leading-8 text-[14px]">
                  Fill out the form below and our support team will get back
                  to you shortly.
                </p>
              </div>

              {/* FORM */}
              <form className="flex flex-col gap-5">

                {/* NAME + EMAIL ROW */}
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-semibold text-black text-[14px] mb-2.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      className="w-full h-[52px] sm:h-[56px] bg-[#f8f5f0] rounded-[14px] sm:rounded-[16px] px-4 sm:px-[18px] text-[14px] outline-none border border-transparent focus:border-black transition"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-black text-[14px] mb-2.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full h-[52px] sm:h-[56px] bg-[#f8f5f0] rounded-[14px] sm:rounded-[16px] px-4 sm:px-[18px] text-[14px] outline-none border border-transparent focus:border-black transition"
                    />
                  </div>
                </div>

                {/* SUBJECT */}
                <div>
                  <label className="block font-semibold text-black text-[14px] mb-2.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="Write subject"
                    className="w-full h-[52px] sm:h-[56px] bg-[#f8f5f0] rounded-[14px] sm:rounded-[16px] px-4 sm:px-[18px] text-[14px] outline-none border border-transparent focus:border-black transition"
                  />
                </div>

                {/* MESSAGE */}
                <div>
                  <label className="block font-semibold text-black text-[14px] mb-2.5">
                    Message
                  </label>
                  <textarea
                    placeholder="Write your message..."
                    className="w-full h-[150px] sm:h-[170px] bg-[#f8f5f0] rounded-[18px] sm:rounded-[20px] p-4 sm:p-[18px] text-[14px] outline-none border border-transparent focus:border-black transition resize-none"
                  />
                </div>

                {/* SUBMIT */}
                <button
                  type="submit"
                  className="h-[54px] sm:h-[58px] rounded-full bg-black text-white hover:bg-[#222] transition-all duration-300 flex items-center justify-center gap-3 text-[14px] sm:text-[15px] font-semibold mt-2"
                >
                  Send Message
                  <FiSend />
                </button>
              </form>
            </motion.div>
          </div>

          {/* ── CTA BANNER ── */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden bg-black text-white rounded-[26px] sm:rounded-[36px] px-5 sm:px-8 lg:px-16 py-12 sm:py-14 lg:py-16"
          >
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_#ffffff_0%,_transparent_40%)]" />

            <div className="relative z-10 text-center max-w-xs sm:max-w-xl lg:max-w-[780px] mx-auto">
              <p className="uppercase text-[#c9a96e] font-semibold tracking-[4px] text-[11px] mb-4">
                Luxury Decor Studio
              </p>

              <h2 className="font-black leading-tight text-[clamp(30px,5vw,58px)] mb-4 sm:mb-5">
                Elevate Your Interior
                <br />
                With Artistic Elegance
              </h2>

              <p className="text-gray-300 leading-8 mx-auto text-[14px] sm:text-[15px] max-w-xs sm:max-w-md lg:max-w-[620px] mb-7 sm:mb-8">
                Explore handcrafted ceramic decor, marble dust art, luxury mugs,
                idols, and premium home styling pieces designed for elegant modern
                living.
              </p>

              <Link
                href="/products"
                className="inline-flex items-center justify-center h-[52px] sm:h-[56px] px-7 sm:px-8 rounded-full bg-white text-black hover:bg-[#f2f2f2] transition-all duration-300 text-[14px] sm:text-[15px] font-semibold"
              >
                Explore Products
              </Link>
            </div>
          </motion.div>

        </div>
      </section>

      <Footer />
    </>
  );
}