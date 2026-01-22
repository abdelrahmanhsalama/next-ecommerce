"use client";

import { useCartStore } from "@/store/cartStore";
import { useSession } from "next-auth/react";
import { useState } from "react";
import SigninModal from "./SigninModal";

const CartButton = ({
  className,
  productId,
}: {
  className?: string;
  productId: number;
}) => {
  const [buttonState, setButtonState] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const isInCart = useCartStore((state) => state.isInCart);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { status: authStatus } = useSession();
  const isLoggedIn = authStatus === "authenticated";

  const handleClick = () => {
    if (isLoggedIn) {
      if (isInCart(productId)) {
        removeFromCart(productId);
        setButtonState(!buttonState);
      } else {
        addToCart(productId);
        setButtonState(!buttonState);
      }
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <button
        className={`text-white bg-black border-2 border-black rounded-md px-4 py-2 cursor-pointer lg:hover:text-black lg:hover:bg-white transition duration-250 ${className}`}
        onClick={handleClick}
      >
        {isInCart(productId) ? "Remove from Cart" : "Add to Cart"}
      </button>
      <SigninModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default CartButton;
