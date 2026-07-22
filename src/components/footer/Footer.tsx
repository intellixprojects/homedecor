import Link from "next/link";
import {
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiArrowUpRight,
  FiMail,
  FiPhone,
  FiMapPin,
} from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0d0d0d] text-white mt-16 sm:mt-20">
      <div className="absolute top-0 left-0 h-55 w-55 sm:h-75 sm:w-75 rounded-full bg-white/5 blur-3xl opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-14 border-b border-white/10 pb-12">
          {/* Brand — same as before */}
          <div>
            <h2 className="text-3xl sm:text-3xl font-black tracking-wide mb-5">
              NISH<span className="text-[#c9a96e]">MEE</span>
            </h2>

            <p className="text-gray-400 leading-7 sm:leading-8 text-sm sm:text-base mb-7">
              NishMee brings divine craftsmanship into your living space —
              spiritual idols, marble dust masterpieces, and luxury decor rooted
              in India's sacred art traditions.
            </p>

            <div className="flex items-center gap-3 sm:gap-4">
              {[
                {
                  icon: FiFacebook,
                  link: "https://www.facebook.com/share/1FGBZkimmz/",
                },
                {
                  icon: FiInstagram,
                  link: "https://www.instagram.com/shopnishmee/",
                },
                {
                  icon: FiTwitter,
                  link: "https://x.com/shopnishmee",
                },
              ].map(({ icon: Icon, link }, index) => (
                <a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-11 w-11 rounded-full bg-white/10 hover:bg-[#d6bfa7] hover:text-black flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links — same as before */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-6">Quick Links</h3>
            <div className="flex flex-col gap-4 text-gray-400 text-sm sm:text-base">
              {[
                { name: "Home", path: "/" },
                { name: "Shop", path: "/products" },
                { name: "Collections", path: "/collections" },
                { name: "About", path: "/about" },
                { name: "Contact", path: "/contact" },
              ].map((item, index) => (
                <Link
                  key={index}
                  href={item.path}
                  className="group flex items-center gap-2 transition duration-300 hover:text-white w-fit"
                >
                  {item.name}
                  <FiArrowUpRight className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </Link>
              ))}
            </div>
          </div>

          {/* Categories — same as before */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-6">Categories</h3>
            <div className="flex flex-col gap-4 text-gray-400 text-sm sm:text-base">
              {[
                {
                  name: "Divine Collection",
                  path: "/products?category=divine",
                },
                {
                  name: "Buddha & Monk Collection",
                  path: "/products?category=buddha-monk",
                },
                {
                  name: "Luxury Sculptures",
                  path: "/products?category=luxury-sculptures",
                },
                { name: "Vases", path: "/products?category=vases" },
                { name: "Showpieces", path: "/products?category=showpieces" },
                { name: "Handcraft Idols", path: "/products?category=idols" },
              ].map((item, index) => (
                <Link
                  key={index}
                  href={item.path}
                  className="group flex items-center gap-2 transition duration-300 hover:text-white w-fit"
                >
                  {item.name}
                  <FiArrowUpRight className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </Link>
              ))}
            </div>
          </div>

          {/* ── 4TH COLUMN — Contact & Promise (NAYA) ── */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-6">Contact Us</h3>

            <div className="flex flex-col gap-4 mb-8">
              {[
                { icon: FiMail, text: "info@nishmee.in" },
                { icon: FiPhone, text: "+91 9818185270" },
                { icon: FiMapPin, text: "Fast & Secure Delivery" },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-3 text-gray-400 text-sm"
                >
                  <div className="w-8 h-8 rounded-full bg-white/8 flex items-center justify-center shrink-0">
                    <Icon size={14} className="text-[#c9a96e]" />
                  </div>
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom — same as before */}
        <div className="pt-7 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-500 text-sm sm:text-base">
          <p className="text-center md:text-left">
            © 2026 NISHMEE. All Rights Reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-5">
            <Link
              href="/privacy-policy"
              className="hover:text-white transition duration-300"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-white transition duration-300"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
