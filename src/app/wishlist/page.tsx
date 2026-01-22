import React from "react";
import WishlistPageClient from "./WishlistPageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Wishlist | NextShop",
    description:
        "Shop your favorite products online with ease – discover great deals, fast delivery, and a smooth, secure shopping experience all in one place.",
};

const WishlistPageServer = () => {
    return <WishlistPageClient />;
};

export default WishlistPageServer;
