"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import axios from "axios";
import ProductCard from "@/components/ProductCard";
import Loading from "@/components/Loading";

interface Product {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
}

interface SearchResponse {
    products: Product[];
}

const searchProducts = async (
    searchParameters: string
): Promise<SearchResponse> => {
    const { data: searchResults } = await axios.get<SearchResponse>(
        `https://dummyjson.com/products/search?q=${searchParameters}`
    );
    return searchResults;
};

const SearchPageContent = () => {
    const [searchKeyword, setSearchKeyword] = useState("");
    const [searchResults, setSearchResults] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const searchParams = useSearchParams();

    useEffect(() => {
        const query = searchParams.get("q");
        setSearchKeyword(query as string);
    }, [searchParams]);

    useEffect(() => {
        const fetchResults = async () => {
            setIsLoading(true);
            setError(null);

            try {
                if (!searchKeyword.trim()) {
                    setSearchResults([]);
                    return;
                }
                const fetchedProducts = await searchProducts(searchKeyword);
                setSearchResults(fetchedProducts.products);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("Unknown Error!");
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchResults();
    }, [searchKeyword]);

    return (
        <div className="mx-auto my-4 w-5/6">
            <h2 className="mb-4">
                Search Results for <strong>{searchKeyword}</strong>.
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {isLoading ? (
                    <Loading />
                ) : error ? (
                    <p className="text-red-500">Error: {error}</p>
                ) : (
                    searchResults.map((product) => (
                        <ProductCard
                            image={product.thumbnail}
                            title={product.title}
                            price={product.price}
                            id={product.id}
                            key={product.id}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default function SearchPageClient() {
    return (
        <Suspense fallback={<Loading />}>
            <SearchPageContent />
        </Suspense>
    );
}
