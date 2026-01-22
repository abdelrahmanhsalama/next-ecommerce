"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import axios from "axios";
import OrderItem from "@/components/OrderItem";
import Loading from "@/components/Loading";

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

export type OrderItem = {
  id: number;
  quantity: number;
};

export interface Order {
  orderId: number;
  items: OrderItem[];
}

export type DetailedOrderItem = Product & { quantity: number };

export interface DetailedOrder {
  orderId: number;
  items: DetailedOrderItem[];
}

const Account = () => {
  const { data: session } = useSession();
  const [productsInOrder, setProductsInOrder] = useState<DetailedOrder[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

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
    try {
      const stored =
        typeof window !== "undefined"
          ? (JSON.parse(localStorage.getItem("orders") || "[]") as Order[])
          : [];
      setOrders(stored);
    } catch {
      console.error("Failed to parse orders from localStorage");
      setOrders([]);
    }
  }, []);

  useEffect(() => {
    const fetchOrdersItems = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const detailedOrders = await Promise.all(
          orders.map(async (order) => {
            const detailedItems = await Promise.all(
              order.items.map(async (item) => {
                const data = await fetchProductDetails(item.id.toString());
                return data ? { ...data, quantity: item.quantity } : null;
              }),
            );
            return {
              orderId: order.orderId,
              items: detailedItems.filter(Boolean) as (Product & {
                quantity: number;
              })[],
            };
          }),
        );

        setProductsInOrder(detailedOrders);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Unknown Error!");
      } finally {
        setIsLoading(false);
      }
    };

    if (orders.length > 0) {
      fetchOrdersItems();
    } else {
      setProductsInOrder([]);
    }
  }, [orders]);

  const subtotals = productsInOrder.map((order) =>
    order.items.reduce((total, p) => total + p.price * p.quantity, 0),
  );

  if (session) {
    return (
      <div className="mx-auto my-4 w-5/6 space-y-4">
        <h2 className="text-xl font-bold">Account</h2>
        <div className="flex items-center gap-2">
          <Image
            src={session.user?.image || "/avatar.png"}
            width={100}
            height={100}
            className="aspect-auto rounded-full object-cover"
            alt={`${session.user?.name}'s Image`}
          ></Image>
          <div>
            <p className="text-xl font-bold">{session.user?.name}</p>
            <p>{session.user?.email}</p>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Orders</h3>
          {isLoading ? (
            <Loading />
          ) : error ? (
            <p className="text-red-500">Error: {error}</p>
          ) : orders.length > 0 ? (
            productsInOrder.map((order, i) => (
              <div
                key={order.orderId}
                className="p-4 rounded space-y-4 shadow-md bg-gray-100"
              >
                <p className="font-medium">Order #{order.orderId}</p>
                <ul className="space-y-2">
                  {order.items.map((p) => (
                    <OrderItem product={p} quantity={p.quantity} key={p.id} />
                  ))}
                </ul>
                <p className="text-right">Subtotal: ${subtotals[i]}</p>
              </div>
            ))
          ) : (
            <p>
              You still haven&apos;t made any orders 😭!{" "}
              <Link href="/products" className="text-blue-500">
                Browse Products Now
              </Link>
              .
            </p>
          )}
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="py-4 w-5/6 flex mx-auto justify-center items-center flex-grow">
        <button
          className="text-white bg-black border-2 border-black rounded-md py-2 px-4 lg:hover:text-black lg:hover:bg-white transition duration-250 cursor-pointer"
          onClick={() => signIn("google")}
        >
          Sign In with Google
        </button>
      </div>
    );
  }
};

export default Account;
