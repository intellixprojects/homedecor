import Navbar from "@/components/navbar/Navbar";
import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import Collections from "@/components/home/Collections";
import TrustBadges from "@/components/home/TrustBadges";
import Footer from "@/components/footer/Footer";
import BestSellers from "@/components/home/BestSeller";
import NewArrivals from "@/components/home/NewArrivals";
import FeaturedProducts from "@/components/home/FeaturedProducts";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Categories />
      <BestSellers />
      <NewArrivals />
      <FeaturedProducts />
      <Collections />
      <TrustBadges />
      <Footer />
    </>
  );
}