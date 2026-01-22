import React from "react";
import ProductsPageClient from "./ProductsPageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Products | NextShop",
    description:
        "Shop your favorite products online with ease – discover great deals, fast delivery, and a smooth, secure shopping experience all in one place.",
};

const ProductsPageServer = () => {
    return <ProductsPageClient />;
};

export default ProductsPageServer;
