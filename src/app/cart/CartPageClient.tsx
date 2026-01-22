"use client";

import { useState, useEffect } from "react";
import CartItem from "@/components/CartItem";
import { useCartStore } from "@/store/cartStore";
import axios from "axios";
import Loading from "@/components/Loading";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSession } from "next-auth/react";
import { Flip, ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

interface Inputs {
  firstName: string;
  lastName?: string;
  email: string;
  phone: string;
  streetName: string;
  building: string;
  city: string;
  area: string;
  addressDetails: string;
}

const cityAreas: Record<string, string[]> = {
  Cairo: ["Nasr City", "Heliopolis", "Maadi", "Zamalek", "New Cairo"],
  Giza: ["Dokki", "Mohandessin", "Haram", "Sheikh Zayed", "6th of October"],
  Alexandria: ["Sidi Gaber", "Sporting", "Gleem", "Stanley", "Smouha"],
};

const CartPageClient = () => {
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);
  const [productsInCart, setProductsInCart] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<number>(1);

  const { data } = useSession();
  const userData = data?.user;
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = () => {
    toast("Order Placed Successfully!", { type: "success" });
    localStorage.setItem(
      "orders",
      JSON.stringify([
        ...JSON.parse(localStorage.getItem("orders") || "[]"),
        { orderId: Date.now(), items: cart },
      ])
    );
    clearCart();
    setTimeout(() => {
      router.push("/");
    }, 2750);
  };

  const fetchProductDetails = async (id: string) => {
    try {
      const { data } = await axios.get(`https://dummyjson.com/products/${id}`);
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error:", error.message);
      } else {
        console.error("An unknown error occurred:", error);
      }
      return null;
    }
  };

  useEffect(() => {
    const fetchCartProducts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const fetchResults = await Promise.all(
          cart.map((item) => fetchProductDetails(item.id.toString()))
        );
        setProductsInCart(fetchResults.filter(Boolean) as Product[]);
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
    fetchCartProducts();
  }, [cart]);

  const subtotal = cart.reduce((total, item) => {
    const product = productsInCart.find((product) => product.id === item.id);
    if (!product) return total;
    return total + product.price * item.quantity;
  }, 0);

  const delivery = 0;
  const total = subtotal + delivery;

  const formattedSubtotal = subtotal.toFixed(2);
  const formattedTotal = total.toFixed(2);

  const selectedCity = watch("city");
  const availableAreas = selectedCity ? cityAreas[selectedCity] : [];

  useEffect(() => {
    setValue("area", "");
  }, [selectedCity, setValue]);

  return (
    <div className="mx-auto my-8 w-5/6">
      <div className="flex lg:flex-row flex-col lg:gap-8">
        <div className="flex-2 flex flex-col">
          {step === 1 ? (
            <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>
          ) : (
            <h2 className="flex justify-between items-center">
              <span className="text-xl font-bold mb-4">Checkout</span>
              <span className="text-sm text-gray-800">
                Please fill in all the fields.
              </span>
            </h2>
          )}
          {isLoading ? (
            <Loading />
          ) : error ? (
            <p className="text-red-500">Error: {error}</p>
          ) : step === 1 ? (
            cart.length > 0 ? (
              cart.map((item) => {
                const product = productsInCart.find(
                  (product) => product.id === item.id
                );
                return product ? (
                  <CartItem
                    product={product}
                    quantity={item.quantity}
                    key={product.id}
                  />
                ) : null;
              })
            ) : (
              "There are no items in your cart! 😢"
            )
          ) : (
            <>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                <h3 className="text-lg font-medium">Personal Information</h3>
                <div className="flex gap-2">
                  <label className="flex-1 space-y-1">
                    <p>First Name</p>
                    <input
                      placeholder="First Name"
                      {...register("firstName", { required: true })}
                      className="border border-gray-500 rounded p-2 w-full"
                      defaultValue={userData?.name?.split(" ")[0] ?? ""}
                    />
                    <p
                      className={
                        (errors.firstName
                          ? "opacity-100 max-h-4"
                          : "opacity-0  max-h-0") +
                        " text-red-500 text-sm duration-200 ease-in-out"
                      }
                    >
                      Please fill in this field.
                    </p>
                  </label>
                  <label className="flex-1 space-y-1">
                    <p>Last Name</p>
                    <input
                      placeholder="Last Name"
                      {...register("lastName")}
                      className="border border-gray-500 rounded p-2 w-full"
                      defaultValue={userData?.name?.split(" ")[1] ?? ""}
                    />
                  </label>
                </div>
                <div className="flex gap-2">
                  <label className="flex-1 space-y-1">
                    <p>Email</p>
                    <input
                      type="email"
                      placeholder="Email"
                      {...register("email", {
                        required: true,
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Please enter a valid email address.",
                        },
                      })}
                      className="border border-gray-500 rounded p-2 w-full"
                      defaultValue={userData?.email ?? ""}
                      autoComplete="email"
                      inputMode="email"
                    />
                    <p
                      className={
                        (errors.email
                          ? "opacity-100 max-h-4"
                          : "opacity-0  max-h-0") +
                        " text-red-500 text-sm duration-200 ease-in-out"
                      }
                    >
                      {errors.email?.message || "Please fill in this field."}
                    </p>
                  </label>
                  <label className="flex-1 space-y-1">
                    <p>Phone</p>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 select-none">
                        +201
                      </span>
                      <input
                        type="tel"
                        placeholder="XXXXXXXXX"
                        {...register("phone", {
                          required: true,
                          pattern: {
                            value: /^\d{9}$/,
                            message: "Please enter 9 digits after +201.",
                          },
                        })}
                        className="border border-gray-500 rounded p-2 w-full pl-12"
                        inputMode="tel"
                        autoComplete="tel"
                      />
                    </div>
                    <p
                      className={
                        (errors.phone
                          ? "opacity-100 max-h-4"
                          : "opacity-0 max-h-0") +
                        " text-red-500 text-sm duration-200 ease-in-out"
                      }
                    >
                      {errors.phone?.message || "Please fill in this field."}
                    </p>
                  </label>
                </div>
                <h3 className="text-lg font-medium">Address</h3>
                <div className="flex gap-2">
                  <label className="flex-1 space-y-1">
                    <p>Street Name</p>
                    <input
                      placeholder="Street Name"
                      {...register("streetName", { required: true })}
                      className="border border-gray-500 rounded p-2 w-full"
                      defaultValue=""
                    />
                    <p
                      className={
                        (errors.streetName
                          ? "opacity-100 max-h-4"
                          : "opacity-0  max-h-0") +
                        " text-red-500 text-sm duration-200 ease-in-out"
                      }
                    >
                      Please fill in this field.
                    </p>
                  </label>
                  <label className="flex-1 space-y-1">
                    <p>Building Number/Name</p>
                    <input
                      placeholder="Building Number/Name"
                      {...register("building", { required: true })}
                      className="border border-gray-500 rounded p-2 w-full"
                      defaultValue=""
                    />
                    <p
                      className={
                        (errors.building
                          ? "opacity-100 max-h-4"
                          : "opacity-0  max-h-0") +
                        " text-red-500 text-sm duration-200 ease-in-out"
                      }
                    >
                      Please fill in this field.
                    </p>
                  </label>
                </div>
                <div className="flex gap-2">
                  <label className="flex-1 space-y-1">
                    <p>City</p>
                    <select
                      {...register("city", { required: true })}
                      className="border border-gray-500 rounded p-2 w-full"
                    >
                      <option value=""></option>
                      <option value="Cairo">Cairo</option>
                      <option value="Giza">Giza</option>
                      <option value="Alexandria">Alexandria</option>
                    </select>
                    <p
                      className={
                        (errors.city
                          ? "opacity-100 max-h-4"
                          : "opacity-0  max-h-0") +
                        " text-red-500 text-sm duration-200 ease-in-out"
                      }
                    >
                      Please fill in this field.
                    </p>
                  </label>
                  <label className="flex-1 space-y-1">
                    <p>Area</p>
                    <select
                      {...register("area", { required: true })}
                      className="border border-gray-500 rounded p-2 w-full disabled:text-gray-500"
                      disabled={availableAreas.length === 0}
                    >
                      {availableAreas.length > 0 ? (
                        <>
                          <option value="" disabled>
                            Select Area
                          </option>
                          {availableAreas.map((area) => (
                            <option key={area} value={area}>
                              {area}
                            </option>
                          ))}
                        </>
                      ) : (
                        <option value="">Select a city first</option>
                      )}
                    </select>
                    <p
                      className={
                        (errors.area
                          ? "opacity-100 max-h-4"
                          : "opacity-0  max-h-0") +
                        " text-red-500 text-sm duration-200 ease-in-out"
                      }
                    >
                      Please fill in this field.
                    </p>
                  </label>
                </div>
                <label className="flex-1 space-y-1">
                  <p>Address Details</p>
                  <div>
                    <input
                      type="text"
                      placeholder="Address Details"
                      {...register("addressDetails", {
                        required: true,
                      })}
                      className="border border-gray-500 rounded p-2 w-full"
                    />
                  </div>
                  <p
                    className={
                      (errors.addressDetails
                        ? "opacity-100 max-h-4"
                        : "opacity-0 max-h-0") +
                      " text-red-500 text-sm duration-200 ease-in-out"
                    }
                  >
                    Please fill in this field.
                  </p>
                </label>
              </form>
            </>
          )}
        </div>
        <div className="flex-1 border border-[#EBEBEB] rounded-md p-4 flex flex-col gap-4 h-min">
          <h1 className="text-xl font-bold">Order Summary</h1>
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p>${formattedSubtotal}</p>
          </div>
          <div>
            <div className="flex justify-between">
              <p>Delivery</p>
              <p>${delivery}</p>
            </div>
            <p className="text-green-600 text-xs">
              Delivery is free for all orders for a limited time! 😄
            </p>
          </div>
          <div className="flex justify-between">
            <p>Total</p>
            <p>${formattedTotal}</p>
          </div>
          <button
            className={
              cart.length > 0
                ? "text-white bg-black border-2 border-black rounded-md p-2 cursor-pointer lg:hover:text-black lg:hover:bg-white transition duration-250"
                : "cursor-not-allowed bg-[#D4D4D4] border-[#D4D4D4] rounded-md p-2 transition duration-250"
            }
            onClick={() => {
              if (step === 1) {
                setStep(2);
              } else {
                handleSubmit(onSubmit)();
              }
            }}
          >
            {step === 1 ? "Checkout" : "Place Order"}
          </button>
          {step === 1 ? (
            <button
              className={
                cart.length > 0
                  ? "text-white bg-red-500 border-2 border-red-500 rounded-md p-2 cursor-pointer lg:hover:text-red-500 lg:hover:bg-white transition duration-250"
                  : "cursor-not-allowed bg-[#D4D4D4] border-[#D4D4D4] rounded-md p-2 transition duration-250"
              }
              onClick={clearCart}
            >
              Clear Cart
            </button>
          ) : null}
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={2500}
        hideProgressBar
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="light"
        transition={Flip}
        toastClassName="!text-black"
      />
    </div>
  );
};

export default CartPageClient;
