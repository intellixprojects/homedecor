"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const categories = [
  { id: 4, title: "Divine Collection", image: "/images/ganesh/ganesh1.jpeg", slug: "ganesh" },
  { id: 5, title: "Buddha & Monk", image: "/images/monk/monk1.jpeg", slug: "buddha-monk" },
  { id: 6, title: "Luxury Sculptures", image: "/images/panther/panther1.jpeg", slug: "luxury-sculptures" },
  { id: 1, title: "Artisan Vases", image: "/images/Vases/Vase1.jpeg", slug: "vases" },
  { id: 2, title: "Luxury Showpieces", image: "/images/showpieces/showpiece1.jpeg", slug: "showpieces" },
  { id: 3, title: "Handcrafted Idols", image: "/images/Idols/idols1.jpeg", slug: "idols" },
];

export default function Categories() {

  const router = useRouter();

  return (
    <section
      className="relative overflow-hidden bg-[#faf9f7]"
      style={{ padding: "60px 0 100px" }}
    >
      {/* Background Texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, rgba(180,160,120,0.06) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(120,100,80,0.05) 0%, transparent 50%)",
        }}
      />

      <div
        className="relative max-w-[1320px] mx-auto"
        style={{ padding: "0 32px" }}
      >
        {/* Heading */}
        <div className="text-center" style={{ marginBottom: "64px" }}>
          <div
            className="inline-flex items-center"
            style={{ gap: "14px", marginBottom: "16px" }}
          >
            <span className="block w-10 h-[1px] bg-[#b8a07a]" />

            <p
              className="uppercase text-[#b8a07a] font-medium"
              style={{
                fontSize: "11px",
                letterSpacing: "6px",
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                margin: 0,
              }}
            >
              Luxury • Spiritual • Handcrafted
            </p>

            <span className="block w-10 h-[1px] bg-[#b8a07a]" />
          </div>

          <h2
            className="text-[#1a1612] leading-none"
            style={{
              fontSize: "clamp(36px, 5vw, 58px)",
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 300,
              letterSpacing: "-0.5px",
              margin: 0,
            }}
          >
            Explore Our{" "}
            <em className="italic font-semibold">Collections</em>
          </h2>

          <p
            className="text-[#6b6258] max-w-2xl mx-auto mt-5"
            style={{
              fontSize: "16px",
              lineHeight: "1.8",
            }}
          >
            Discover luxury decor, spiritual idols, handcrafted
            sculptures and timeless pieces curated to elevate every
            corner of your home.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: index * 0.15,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              viewport={{ once: true }}
              whileHover="hover"
              className="relative overflow-hidden rounded-md cursor-pointer aspect-[3/4] group"
            >

              {/* Image */}
              <motion.div
                variants={{ hover: { scale: 1.08 } }}
                transition={{
                  duration: 0.8,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="absolute inset-0"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </motion.div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[rgba(10,8,6,0.85)] via-[rgba(10,8,6,0.3)] to-[rgba(10,8,6,0.05)]" />

              {/* Hover Overlay */}
              <motion.div
                variants={{ hover: { opacity: 1 } }}
                initial={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 z-[2] bg-[rgba(184,160,122,0.15)]"
              />

              {/* Content */}
              <div
                className="absolute bottom-0 left-0 right-0 z-[3]"
                style={{ padding: "32px 28px" }}
              >

                {/* Title */}
                <h3
                  className="text-white leading-tight"
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: "26px",
                    fontWeight: 400,
                    letterSpacing: "0.3px",
                    margin: "0 0 20px 0",
                  }}
                >
                  {item.title}
                </h3>

                {/* Divider + Button */}
                <div
                  className="flex items-center"
                  style={{ gap: "16px" }}
                >
                  <div className="flex-1 h-[1px] bg-white/20" />

                  <motion.button
                    onClick={() => router.push(`/products?category=${item.slug}`)}
                    variants={{
                      hover: {
                        backgroundColor: "#b8a07a",
                        borderColor: "#b8a07a",
                        color: "#1a1612",
                      },
                    }}
                    transition={{ duration: 0.3 }}
                    className="uppercase border rounded-sm whitespace-nowrap"
                    style={{
                      fontFamily:
                        "'Cormorant Garamond', Georgia, serif",
                      fontSize: "11px",
                      letterSpacing: "3px",
                      color: "#ffffff",
                      background: "transparent",
                      border: "1px solid rgba(255,255,255,0.5)",
                      padding: "10px 20px",
                      cursor: "pointer",
                    }}
                  >
                    Explore
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}