"use client";

import { Icon } from "@iconify/react";
import { useWishlistStore } from "@/store/wishlistStore";
import { useSession } from "next-auth/react";
import { useState } from "react";
import SigninModal from "./SigninModal";

const WishlistButton = ({
  className,
  style,
  productId,
}: {
  className?: string;
  style: string;
  productId: number;
}) => {
  const [buttonState, setButtonState] = useState(false);
  const addToWishlist = useWishlistStore((state) => state.addToWishlist);
  const removeFromWishlist = useWishlistStore(
    (state) => state.removeFromWishlist
  );
  const isInWishlist = useWishlistStore((state) => state.isInWishlist);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { status: authStatus } = useSession();
  const isLoggedIn = authStatus === "authenticated";

  const handleClick = () => {
    if (isLoggedIn) {
      if (isInWishlist(productId)) {
        removeFromWishlist(productId);
        setButtonState(!buttonState);
      } else {
        addToWishlist(productId);
        setButtonState(!buttonState);
      }
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <button
        className={` ${className} cursor-pointer transition duration-250 ${
          style === "mini"
            ? "absolute right-[5%] top-[5%] lg:hover:text-red-600"
            : "bg-white border-2 border-black rounded-md p-2 lg:hover:bg-black lg:hover:text-white"
        }`}
        onClick={handleClick}
      >
        {style === "full" ? (
          isInWishlist(productId) ? (
            "Remove from Wishlist"
          ) : (
            "Add to Wishlist"
          )
        ) : isInWishlist(productId) ? (
          <Icon icon="lucide:heart-off" width="24" height="24" />
        ) : (
          <Icon icon="lucide:heart" width="24" height="24" />
        )}
      </button>
      <SigninModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default WishlistButton;
