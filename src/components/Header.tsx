"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "./Navbar";
import Search from "./Search";
import Auth from "./Auth";
import { usePathname } from "next/navigation";

const Header = () => {
  const [hamburgerMenu, setHamburgerMenu] = useState(false);
  const pathname = usePathname();

  return (
    <header
      className={`w-full flex flex-col lg:h-[80px] lg:flex-row lg:items-center ${
        pathname === "/" ? null : "shadow-md"
      }`}
    >
      <div className="lg:hidden w-full px-4 py-8 flex justify-between items-center mx-auto">
        <Link href="/">
          <h1 className="text-2xl font-bold">NextShop</h1>
        </Link>
        <button
          className="text-2xl font-bold cursor-pointer"
          aria-label={hamburgerMenu ? "Close menu" : "Open menu"}
          onClick={() => setHamburgerMenu(!hamburgerMenu)}
        >
          {hamburgerMenu ? "×" : "☰"}
        </button>
      </div>

      <div
        className={`lg:hidden flex flex-col gap-2 px-4 pb-2 transition-all duration-250 ease-in-out overflow-hidden ${
          hamburgerMenu ? "max-h-[1000px]" : "max-h-0"
        }`}
      >
        <Navbar version="small" setHamburgerMenu={setHamburgerMenu} />
        <Search setHamburgerMenu={setHamburgerMenu} />
        <Auth setHamburgerMenu={setHamburgerMenu} />
      </div>

      <div className="hidden lg:flex w-5/6 items-center justify-between mx-auto">
        <Link href="/">
          <h1 className="text-2xl font-bold">NextShop</h1>
        </Link>

        <div className="hidden lg:flex gap-4 items-center">
          <Navbar version="full" />
          <Search />
          <Auth />
        </div>
      </div>
    </header>
  );
};

export default Header;
