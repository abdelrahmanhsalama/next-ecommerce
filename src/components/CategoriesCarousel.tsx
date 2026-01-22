"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";

const categories = [
    { name: "Beauty", slug: "beauty", icon: "💄" },
    { name: "Furniture", slug: "furniture", icon: "🛋️" },
    { name: "Groceries", slug: "groceries", icon: "🍎" },
    { name: "Laptops", slug: "laptops", icon: "💻" },
    { name: "Mens Shirts", slug: "mens-shirts", icon: "👕" },
    { name: "Mens Shoes", slug: "mens-shoes", icon: "👞" },
    { name: "Mens Watches", slug: "mens-watches", icon: "⌚" },
    { name: "Mobile Accessories", slug: "mobile-accessories", icon: "📱" },
    { name: "Skin Care", slug: "skin-care", icon: "🧴" },
    { name: "Smartphones", slug: "smartphones", icon: "📱" },
    { name: "Sports Accessories", slug: "sports-accessories", icon: "🏋️" },
    { name: "Sunglasses", slug: "sunglasses", icon: "🕶️" },
    { name: "Tablets", slug: "tablets", icon: "📱" },
    { name: "Womens Bags", slug: "womens-bags", icon: "👜" },
    { name: "Womens Dresses", slug: "womens-dresses", icon: "👗" },
    { name: "Womens Jewellery", slug: "womens-jewellery", icon: "💍" },
    { name: "Womens Shoes", slug: "womens-shoes", icon: "👠" },
    { name: "Womens Tops", slug: "tops", icon: "👚" },
    { name: "Womens Watches", slug: "womens-watches", icon: "⌚" },
];

const CategoriesCarousel = () => {
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const cardRef = useRef<HTMLAnchorElement | null>(null);
    const [cardWidth, setCardWidth] = useState(0);

    useEffect(() => {
        if (cardRef.current) {
            const cardEl = cardRef.current;
            const cardGap = 8;

            const fullWidth = cardEl.offsetWidth + cardGap;

            setCardWidth(fullWidth);
        }
    }, []);

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: -cardWidth,
                behavior: "smooth",
            });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });
        }
    };

    return (
        <>
            <div className="flex justify-between mb-4">
                <h2 className="text-xl font-bold">Browse by Category</h2>
                <div className="flex gap-1">
                    <Icon
                        icon="lucide:chevron-left"
                        width="24"
                        height="24"
                        className="cursor-pointer lg:hover:bg-[#D9D9D9] rounded-full p-0.5"
                        onClick={scrollLeft}
                    />
                    <Icon
                        icon="lucide:chevron-right"
                        width="24"
                        height="24"
                        className="cursor-pointer lg:hover:bg-[#D9D9D9] rounded-full p-0.5"
                        onClick={scrollRight}
                    />
                </div>
            </div>
            <div className="flex overflow-x-hidden gap-2" ref={scrollRef}>
                {categories.map((category, i) => (
                    <Link
                        ref={i === 0 ? cardRef : null}
                        className="bg-[#F6F6F6] rounded-md grow-0 shrink-0 basis-[calc((100%-8px)/2)] lg:basis-[calc((100%-56px)/8)] flex flex-col px-4 py-16 items-center justify-center text-center"
                        key={i}
                        href={`/products?category=${category.slug}`}
                    >
                        <p className="text-[2rem]">{category.icon}</p>
                        <p>{category.name}</p>
                    </Link>
                ))}
            </div>
        </>
    );
};

export default CategoriesCarousel;
