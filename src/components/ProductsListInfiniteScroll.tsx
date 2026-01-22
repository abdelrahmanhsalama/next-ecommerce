"use client";

import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";
import Loading from "./Loading";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  thumbnail: string;
}

export default function ProductsListInfiniteScroll({
  selectedCategory,
  minPrice,
  maxPrice,
}: {
  selectedCategory: string;
  minPrice: number;
  maxPrice: number;
}) {
  const isFiltering = minPrice !== 0 || maxPrice !== 10000;

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["products", selectedCategory, minPrice, maxPrice],
    queryFn: async ({ pageParam = 0 }) => {
      const apiLink =
        selectedCategory === "all"
          ? isFiltering
            ? `https://dummyjson.com/products?limit=100`
            : `https://dummyjson.com/products?limit=15&skip=${pageParam}`
          : `https://dummyjson.com/products/category/${selectedCategory}?limit=15&skip=${pageParam}`;
      const { data } = await axios.get(apiLink);
      return { products: data.products, total: data.total };
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const totalFetched = allPages.reduce(
        (sum, page) => sum + page.products.length,
        0
      );
      return totalFetched < lastPage.total ? totalFetched : undefined;
    },
    staleTime: 1000 * 60,
  });

  if (isLoading)
    return (
      <div className="w-full flex justify-center min-h-screen">
        <Loading />
      </div>
    );
  if (isError)
    return (
      <p className="text-red-500">
        {error instanceof Error ? error.message : "Unknown error!"}
      </p>
    );

  const products = data?.pages.flatMap((page) => page.products) || [];

  const filteredProducts = products.filter(
    (product) => product.price > minPrice && product.price < maxPrice
  );

  return (
    <>
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4 lg:mb-8">
          {filteredProducts.map((product: Product) => (
            <ProductCard
              image={product.thumbnail}
              title={product.title}
              price={product.price}
              id={product.id}
              key={product.id}
            />
          ))}
        </div>
      ) : (
        <p>No Products Found in Selected Category! 😭</p>
      )}

      {hasNextPage && (
        <div className="flex justify-center">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="px-4 py-2 border-2 border-black lg:hover:text-white lg:hover:bg-black transition duration-250 cursor-pointer rounded-md"
          >
            {isFetchingNextPage ? (
              <div className="loader w-4 h-4 border-[#989898]"></div>
            ) : (
              "Show More"
            )}
          </button>
        </div>
      )}
    </>
  );
}
