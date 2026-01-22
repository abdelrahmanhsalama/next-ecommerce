import CartPageClient from "./CartPageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Cart | NextShop",
    description:
        "Shop your favorite products online with ease – discover great deals, fast delivery, and a smooth, secure shopping experience all in one place.",
};

const CartPageServer = () => {
    return <CartPageClient />;
};

export default CartPageServer;
