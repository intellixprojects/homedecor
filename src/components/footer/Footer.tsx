import Link from "next/link";
import {
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiYoutube,
  FiArrowUpRight,
} from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0d0d0d] text-white mt-16 sm:mt-20">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 h-[220px] w-[220px] sm:h-[300px] sm:w-[300px] rounded-full bg-white/5 blur-3xl opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 pb-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-14 border-b border-white/10 pb-12">
          {/* Brand */}
          <div>
            <h2 className="text-3xl sm:text-3xl font-black tracking-wide mb-5">
              NISH
              <span className="flex-row text-[#c9a96e]">MEE</span>
            </h2>

            <p className="text-gray-400 leading-7 sm:leading-8 text-sm sm:text-base mb-7">
              Transform your home with premium ceramic decor, marble dust art,
              luxury mugs, idols, wall decor, and handcrafted pieces designed
              for timeless elegance.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 sm:gap-4">
              {[FiFacebook, FiInstagram, FiTwitter, FiYoutube].map(
                (Icon, index) => (
                  <button
                    key={index}
                    className="h-11 w-11 rounded-full bg-white/10 hover:bg-[#d6bfa7] hover:text-black flex items-center justify-center transition-all duration-300 hover:scale-110"
                  >
                    <Icon size={18} />
                  </button>
                )
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-6">
              Quick Links
            </h3>

            <div className="flex flex-col gap-4 text-gray-400 text-sm sm:text-base">
              {[
                { name: "Home", path: "/" },
                { name: "Shop", path: "/products" },
                { name: "Collections", path: "/collections" },
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

          {/* Categories */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-6">
              Categories
            </h3>

            <div className="flex flex-col gap-4 text-gray-400 text-sm sm:text-base">
              {[
                { name: "Lamps", path: "/category/" },
                { name: "Chairs", path: "/category/chairs" },
                { name: "Vases", path: "/category/vases" },
                { name: "Wall Decor", path: "/category/wall-decor" },
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

          {/* Newsletter */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-6">
              Stay Updated
            </h3>

            <p className="text-gray-400 leading-7 text-sm sm:text-base mb-6">
              Subscribe for luxury decor inspiration and exclusive offers.
            </p>

            <div className="bg-white/10 border border-white/10 rounded-2xl sm:rounded-full p-2 flex items-center overflow-hidden">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-transparent text-white placeholder:text-gray-500 outline-none px-4 h-12 text-sm sm:text-base min-w-0"
              />

              <button className="shrink-0 h-12 px-5 sm:px-6 rounded-xl sm:rounded-full bg-[#d6bfa7] text-black font-semibold hover:bg-white transition duration-300 flex items-center justify-center">
                <span className="hidden sm:block">Join</span>

                <FiArrowUpRight className="text-lg sm:hidden" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-7 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-500 text-sm sm:text-base">
          <p className="text-center md:text-left">
            © 2026 NISHMEE. All Rights Reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-5">
            <Link
              href="/"
              className="hover:text-white transition duration-300"
            >
              Privacy Policy
            </Link>

            <Link
              href="/"
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