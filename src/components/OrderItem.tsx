"use client";

import Image from "next/image";
import Link from "next/link";

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

const OrderItem = ({
  product,
  quantity,
}: {
  product: Product;
  quantity: number;
}) => {
  return (
    <div className="flex lg:flex-row flex-col items-center justify-between rounded p-2 bg-white shadow-md">
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
      <p>
        ${product.price} * {quantity} = ${product.price * quantity}
      </p>
    </div>
  );
};

export default OrderItem;
