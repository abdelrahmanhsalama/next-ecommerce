import HomeProductsList from "@/components/HomeProductsList";
import type { Metadata } from "next";
import CategoriesCarousel from "@/components/CategoriesCarousel";
import Hero from "@/components/Hero";

export const metadata: Metadata = {
  title: "Home | NextShop",
  description:
    "Shop your favorite products online with ease – discover great deals, fast delivery, and a smooth, secure shopping experience all in one place.",
};

export default async function Home() {
  return (
    <>
      <div className="mx-auto w-5/6">
        <section id="categories" className="mb-8">
          <Hero />
        </section>
        <section id="categories" className="mb-8">
          <CategoriesCarousel />
        </section>
        <section id="featured-products" className="mb-8">
          <HomeProductsList />
        </section>
      </div>
    </>
  );
}
