"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FiArrowUpRight } from "react-icons/fi";

const categories = [
  { id: 4, title: "Divine Collection", category: "Divine Collection", subtitle: "Sacred idols & spiritual pieces", image: "/images/ganesh/ganesh1.jpeg", slug: "divine" },
  { id: 5, title: "Buddha & Monk", category: "Buddha & Monk", subtitle: "Serenity for every space", image: "/images/monk/monk1.jpeg", slug: "buddha-monk" },
  { id: 6, title: "Luxury Sculptures", category: "Luxury Sculptures", subtitle: "Statement pieces, crafted fine", image: "/images/panther/panther1.jpeg", slug: "luxury-sculptures" },
  { id: 1, title: "Artisan Vases", category: "Vases", subtitle: "Handmade ceramic elegance", image: "/images/Vases/Vase1.jpeg", slug: "vases" },
  { id: 2, title: "Luxury Showpieces", category: "Showpieces", subtitle: "Curated to elevate interiors", image: "/images/showpieces/showpiece1.jpeg", slug: "showpieces" },
  { id: 3, title: "Handcrafted Idols", category: "Handcraft Idols", subtitle: "Timeless craftsmanship", image: "/images/Idols/idols1.jpeg", slug: "idols" },
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
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              viewport={{ once: true, margin: "-40px" }}
              whileHover="hover"
              onClick={() => router.push(`/products?category=${encodeURIComponent(item.category)}`)} 
              className="relative overflow-hidden rounded-[20px] cursor-pointer aspect-[3/4] group"
              style={{
                boxShadow: "0 20px 50px rgba(26,22,18,0.08)",
              }}
            >

              {/* Image */}
              <motion.div
                variants={{ hover: { scale: 1.08 } }}
                transition={{
                  duration: 1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="absolute inset-0"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </motion.div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[rgba(10,8,6,0.9)] via-[rgba(10,8,6,0.25)] to-[rgba(10,8,6,0.1)]" />

              {/* Content */}
              <div
                className="absolute bottom-0 left-0 right-0 z-[3]"
                style={{ padding: "30px 26px" }}
              >
                {/* Subtitle */}
                <motion.p
                  variants={{ hover: { opacity: 1, y: 0 } }}
                  initial={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[#e8dcc8]"
                  style={{
                    fontSize: "12px",
                    letterSpacing: "1px",
                    marginBottom: "8px",
                    fontStyle: "italic",
                  }}
                >
                  {item.subtitle}
                </motion.p>

                {/* Title */}
                <h3
                  className="text-white leading-tight"
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: "27px",
                    fontWeight: 400,
                    letterSpacing: "0.3px",
                    margin: "0 0 18px 0",
                  }}
                >
                  {item.title}
                </h3>

                {/* Divider + Button */}
                <div
                  className="flex items-center justify-between"
                  style={{ gap: "16px" }}
                >
                  <motion.div
                    variants={{ 
                      initial: { width: "24px", backgroundColor: "rgba(255,255,255,0.25)" },
                      hover: { width: "100%", backgroundColor: "rgba(184,160,122,0.6)" } 
                    }}
                    initial="initial"
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="h-[1px]"
                  />

                  <motion.div
                    variants={{
                      hover: {
                        backgroundColor: "#b8a07a",
                        borderColor: "#b8a07a",
                        color: "#1a1612",
                        gap: "10px",
                      },
                    }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center uppercase border rounded-full whitespace-nowrap flex-shrink-0"
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: "11px",
                      letterSpacing: "2.5px",
                      color: "#ffffff",
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.4)",
                      padding: "11px 18px",
                      gap: "6px",
                    }}
                  >
                    Explore
                    <FiArrowUpRight
                      style={{ fontSize: "13px" }}
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}