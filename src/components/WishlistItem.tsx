"use client";

import { useWishlistStore } from "@/store/wishlistStore";
import Image from "next/image";
import Link from "next/link";

interface Product {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
}

const WishlistItem = ({ product }: { product: Product }) => {
    const removeFromWishlist = useWishlistStore(
        (state) => state.removeFromWishlist
    );

    if (!product) return <div>Loading...</div>;

    return (
        <div className="flex lg:flex-row flex-col items-center justify-between border-2 border-[#f5f5f5] rounded-md mb-4 p-2">
            <Link href={`products/${product.id}`}>
                <Image
                    width={100}
                    height={100}
                    className="mr-2 ml-1"
                    src={product.thumbnail}
                    alt={product.title}
                ></Image>
            </Link>
            <Link
                href={`products/${product.id}`}
                className="flex-1 lg:text-start text-center"
            >
                <h2>{product.title}</h2>
            </Link>
            <div className="flex items-center flex-1 justify-end">
                <p className="">${product.price}</p>
                <button
                    className="m-1 cursor-pointer hover:bg-[#D9D9D9] rounded-full h-[40px] w-[40px]"
                    onClick={() => removeFromWishlist(product.id)}
                >
                    ×
                </button>
            </div>
        </div>
    );
};

export default WishlistItem;
