"use client";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import ProductsList from "./ProductsList";
import { useState } from "react";
import Loading from "./Loading";

export default function HomeProductsList() {
  const [productsTab, setProductsTab] = useState(0);

  const productTabs = [
    { name: "New Arrivals", id: 0, startingIndex: 0 },
    { name: "Best Sellers", id: 1, startingIndex: 4 },
    { name: "Featured Products", id: 2, startingIndex: 8 },
  ];

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data: products } = await axios.get(
        `https://dummyjson.com/products?limit=12`
      );
      return products.products;
    },
    staleTime: 1000 * 60,
  });

  return (
    <div>
      <ul className="flex gap-4 mb-4">
        {productTabs.map((productTab) => (
          <li
            key={productTab.id}
            onClick={() => setProductsTab(productTab.id)}
            className={`cursor-pointer text-lg transition duration-250 ${
              productTab.id === productsTab
                ? "font-bold text-black"
                : "text-[#909090] lg:hover:text-black transition duration-250"
            }`}
          >
            {productTab.name}
          </li>
        ))}
      </ul>
      {isLoading ? (
        <div className="w-full flex justify-center">
          <Loading />
        </div>
      ) : isError ? (
        <p className="text-red-500">
          Error: {error instanceof Error ? error.message : "Unknown error!"}
        </p>
      ) : (
        <ProductsList
          products={
            data?.slice(
              productTabs[productsTab].startingIndex,
              productTabs[productsTab].startingIndex + 4
            ) || []
          }
        />
      )}
    </div>
  );
}
