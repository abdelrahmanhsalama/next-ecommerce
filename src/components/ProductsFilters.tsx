"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import { Icon } from "@iconify/react";

interface ProductsFilterProps {
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  setMinPrice: (value: number) => void;
  setMaxPrice: (value: number) => void;
}

const fetchCategories = async () => {
  const { data: categories } = await axios.get(
    "https://dummyjson.com/products/categories",
  );
  return categories;
};

const ProductsFilters = ({
  selectedCategory,
  setSelectedCategory,
  setMinPrice,
  setMaxPrice,
}: ProductsFilterProps) => {
  const [categories, setCategories] = useState([
    {
      slug: "all",
      name: "All",
      url: "https://dummyjson.com/products?limit=15",
    },
  ]);

  const [isLoading, setIsLoading] = useState(true);
  const [folded, setFolded] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const handleFold = () => {
    setFolded(!folded);
  };

  useEffect(() => {
    const getCategories = async () => {
      const fetchedCategories = await fetchCategories();
      setCategories((prev) => [...prev, ...fetchedCategories]);
      setIsLoading(false);
    };

    getCategories();
  }, []);

  const [tempMinPrice, setTempMinPrice] = useState("");
  const [tempMaxPrice, setTempMaxPrice] = useState("");

  const applyFilters = () => {
    setMinPrice(Number(tempMinPrice) || 0);
    setMaxPrice(Number(tempMaxPrice) || 10000);
  };

  const clearFilters = () => {
    setMinPrice(0);
    setMaxPrice(10000);
    setTempMinPrice("");
    setTempMaxPrice("");
  };

  const handleFiltersOpen = () => {
    setFiltersOpen(!filtersOpen);
  };

  const handleChangeCategory = (category: string) => {
    setSelectedCategory(category);
    clearFilters();
  };

  return (
    <div>
      <button
        className="border lg:hover:bg-black lg:hover:text-white px-4 py-2 rounded-md cursor-pointer w-max transition duration-250 flex gap-2 items-center lg:hidden mb-4"
        onClick={handleFiltersOpen}
      >
        <Icon icon="lucide:filter" width="16" height="16" /> Filter Products
      </button>
      <div className="hidden lg:block">
        <p className="text-xl mb-2">Filter Products</p>
        <p className="text-lg mb-2">Categories</p>
      </div>
      <div className="lg:block transition-all duration-250 ease-in-out">
        {isLoading ? (
          <div className="w-full flex justify-center">
            <Loading />
          </div>
        ) : (
          <ul className="list-none mb-2">
            {(folded ? categories.slice(0, 6) : categories).map(
              (category, i) => (
                <li key={i} className="mb-1">
                  <label className="cursor-pointer flex items-center gap-1 w-max group">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === category.slug}
                      onChange={() => handleChangeCategory(category.slug)}
                      className="appearance-none border-1 border-black w-3 h-3 rounded-full checked:bg-black cursor-pointer"
                    ></input>
                    <p className="group-hover:font-medium">{category.name}</p>
                  </label>
                </li>
              ),
            )}
            <div
              onClick={handleFold}
              className="cursor-pointer lg:hover:font-medium"
            >
              {folded ? (
                <div className="flex items-center gap-1">
                  <Icon
                    icon="lucide:circle-plus"
                    width="12"
                    height="12"
                    color="black"
                  />
                  <p>Show All Categories</p>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <Icon
                    icon="lucide:circle-minus"
                    width="12"
                    height="12"
                    color="black"
                  />
                  <p>Show Less Categories</p>
                </div>
              )}
            </div>
          </ul>
        )}
        <div className="flex flex-col mb-4 max-w-[250px]">
          <p className="text-lg mb-2">Price Range</p>
          <input
            type="text"
            placeholder="Min Price"
            className="border p-1 rounded-md mb-2 w-full"
            value={tempMinPrice}
            onChange={(e) => setTempMinPrice(e.target.value)}
          ></input>
          <input
            type="text"
            placeholder="Max Price"
            className="border p-1 rounded-md mb-2 w-full"
            value={tempMaxPrice}
            onChange={(e) => setTempMaxPrice(e.target.value)}
          ></input>
          <div className="flex gap-1">
            <button
              className="border bg-black text-white lg:hover:bg-white lg:hover:text-black px-2 py-1 rounded-md cursor-pointer w-max mb-1 transition duration-250 flex-1"
              onClick={applyFilters}
            >
              Apply
            </button>
            <button
              className="border lg:hover:bg-black lg:hover:text-white px-2 py-1 rounded-md cursor-pointer w-max mb-1 transition duration-250 flex-1"
              onClick={clearFilters}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsFilters;
