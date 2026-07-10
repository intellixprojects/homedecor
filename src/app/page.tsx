import Navbar from "@/components/navbar/Navbar";
import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Collections from "@/components/home/Collections";
import TrustBadges from "@/components/home/TrustBadges";
import Footer from "@/components/footer/Footer";

export default function HomePage() {
  return (
    <>

      <Hero />
      <Categories />
      <FeaturedProducts />
      <Collections />
      <TrustBadges />
      <Footer />
    </>
  );
}
