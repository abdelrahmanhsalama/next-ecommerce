"use client";

import ProductsFilters from "@/components/ProductsFilters";
import ProductsListInfiniteScroll from "@/components/ProductsListInfiniteScroll";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Loading from "@/components/Loading";

function ProductsPageContent() {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(10000);

    const searchParams = useSearchParams();

    useEffect(() => {
        const qCategory = searchParams.get("category") || "all";
        setSelectedCategory(qCategory);
    }, [searchParams]);

    return (
        <div className="mx-auto w-5/6 lg:grid lg:grid-cols-4 lg:gap-4 my-4 lg:my-8  flex-grow">
            <div className="lg:col-span-1">
                <ProductsFilters
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    setMinPrice={setMinPrice}
                    setMaxPrice={setMaxPrice}
                />
            </div>
            <div className="lg:col-span-3">
                <ProductsListInfiniteScroll
                    selectedCategory={selectedCategory}
                    minPrice={minPrice}
                    maxPrice={maxPrice}
                />
            </div>
        </div>
    );
}

export default function ProductsPageClient() {
    return (
        <Suspense fallback={<Loading />}>
            <ProductsPageContent />
        </Suspense>
    );
}
