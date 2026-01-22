import React from "react";
import Link from "next/link";

const Footer = () => {
  const servicesLinks = [
    "Order Tracking",
    "Shipping & Delivery",
    "Returns & Exchanges",
    "Gift Cards",
    "Size Guide",
    "Product Warranty",
    "Store Locator",
    "Affiliate Program",
  ];
  const customerSupportLinks = [
    "Help Center",
    "Contact Us",
    "FAQs",
    "Payment Options",
    "Account Login / Signup",
    "Report an Issue",
    "Live Chat Support",
  ];
  return (
    <footer className="py-6 lg:py-12 w-full bg-black text-sm">
      <div className="w-5/6 mx-auto">
        <div className="flex flex-col lg:flex-row">
          <div className="flex flex-col flex-2">
            <p className="text-2xl font-bold text-white">NextShop</p>
            <p className="text-[#CFCFCF] mt-2 w-[90%]">
              Shop your favorite products online with ease – discover great
              deals, fast delivery, and a smooth, secure shopping experience all
              in one place.
            </p>
          </div>
          <div className="flex flex-col flex-1 mt-6 lg:mt-0">
            <p className="text-xl font-bold text-white">Services</p>
            <ul className="list-none">
              {servicesLinks.map((link, index) => {
                return (
                  <li className="text-[#CFCFCF] mt-2" key={index}>
                    <Link href="/about">{link}</Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="flex flex-col flex-1 mt-6 lg:mt-0">
            <p className="text-xl font-bold text-white">Customer Support</p>
            <ul className="list-none">
              {customerSupportLinks.map((link, index) => {
                return (
                  <li className="text-[#CFCFCF] mt-2" key={index}>
                    <Link href="/about">{link}</Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <p className="text-white mt-6 lg:mt-0">
          &copy; {new Date().getFullYear()} NextShop -{" "}
          <Link
            className="underline"
            href="https://www.figma.com/design/g6XFOjZggonojEjfpQLfaj/E-Store---Mobile-web--Community-"
          >
            Figma Design
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
