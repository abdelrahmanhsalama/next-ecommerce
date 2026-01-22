import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="mb-8 w-full lg:grid lg:grid-rows-2 lg:h-[calc(100vh-80px)]">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 flex flex-col lg:flex-row justify-between items-center px-8 pt-8 lg:pt-0 lg:px-32 lg:relative">
        <div className="text-white flex flex-col gap-4">
          <p className="text-[2rem]">Shop Latest Products!</p>
          <p className="text-xl">
            Enjoy the latest products with the best prices on the market!
          </p>
          <Link
            className="border border-white p-2 rounded-md cursor-pointer lg:hover:bg-white lg:hover:text-indigo-600 active:bg-white active:text-indigo-600 transition duration-250 w-max"
            href="/products"
          >
            Shop Now
          </Link>
        </div>
        <div className="relative lg:absolute h-[250px] w-[250px] lg:bottom-0 lg:right-0 lg:mr-32">
          <Image src="/phone.png" fill className="object-cover" alt="Phone" />
        </div>
      </div>
      <div className="lg:grid lg:grid-cols-2">
        <div className="lg:grid">
          <div className="lg:grid lg:grid-cols-2">
            <Link
              className="bg-gradient-to-br from-rose-400 to-pink-500 flex flex-col lg:flex-row items-center justify-center text-white lg:text-lg p-4"
              href="/products?category=womens-dresses"
            >
              <div className="relative h-[200px] w-[200px]">
                <Image
                  src="/dress.png"
                  fill
                  className="object-cover"
                  alt="Dress"
                />
              </div>
              <p className="text-center lg:text-start">
                Trendy
                <span className="inline lg:hidden"> </span>
                <span className="hidden lg:inline">
                  <br />
                </span>
                Women Dresses
              </p>
            </Link>

            <Link
              className="bg-gradient-to-br from-blue-500 to-cyan-500 flex flex-col lg:flex-row items-center justify-center text-white lg:text-lg p-4"
              href="/products?category=mens-shirts"
            >
              <div className="relative h-[200px] w-[200px]">
                <Image
                  src="/shirt.png"
                  fill
                  className="object-cover"
                  alt="Shirt"
                />
              </div>
              <p className="text-center lg:text-start">
                Fashionable
                <span className="inline lg:hidden"> </span>
                <span className="hidden lg:inline">
                  <br />
                </span>
                Men Shirts
              </p>
            </Link>
          </div>
        </div>
        <Link
          className="bg-gradient-to-br from-amber-500 to-orange-500 flex flex-col lg:flex-row justify-center items-center text-white lg:text-xl p-4"
          href="/products?category=furniture"
        >
          <div className="relative h-[250px] w-[250px]">
            <Image src="/chair.png" fill className="object-cover" alt="Chair" />
          </div>
          <p className="text-center lg:text-start">
            Elegant
            <span className="inline lg:hidden"> </span>
            <span className="hidden lg:inline">
              <br />
            </span>
            Home Furniture
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
