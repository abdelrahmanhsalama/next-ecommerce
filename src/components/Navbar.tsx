"use client";

import React from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";

const Navbar = ({
    version,
    setHamburgerMenu,
}: {
    version: string;
    setHamburgerMenu?: (hamburgerMenu: boolean) => void;
}) => {
    const cartStateLength = useCartStore((state) => state.cart.length);
    const wishlistStateLength = useWishlistStore(
        (state) => state.wishlist.length
    );
    return (
        <nav className={version === "small" ? "flex flex-col" : "flex gap-4"}>
            <Link
                href="/products"
                onClick={() => setHamburgerMenu?.(false)}
                className="flex items-center gap-2 lg:hover:bg-[#F5F5F5] transition duration-250 cursor-pointer p-2 rounded-md"
            >
                <Icon icon="lucide:shopping-bag" width="20" height="20" />{" "}
                Products
            </Link>
            <Link
                href="/cart"
                onClick={() => setHamburgerMenu?.(false)}
                className="flex items-center gap-2 lg:hover:bg-[#F5F5F5] transition duration-250 cursor-pointer p-2 rounded-md"
            >
                <Icon icon="lucide:shopping-cart" width="20" height="20" /> Cart{" "}
                {cartStateLength > 0 ? `(${cartStateLength})` : ""}
            </Link>
            <Link
                href="/wishlist"
                onClick={() => setHamburgerMenu?.(false)}
                className="flex items-center gap-2 lg:hover:bg-[#F5F5F5] transition duration-250 cursor-pointer p-2 rounded-md"
            >
                <Icon icon="lucide:heart" width="20" height="20" /> Wishlist{" "}
                {wishlistStateLength > 0 ? `(${wishlistStateLength})` : ""}
            </Link>
        </nav>
    );
};

export default Navbar;
