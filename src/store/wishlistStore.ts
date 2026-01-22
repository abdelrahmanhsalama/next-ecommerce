import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistItem {
    id: number;
}

interface WishlistState {
    wishlist: WishlistItem[];
    addToWishlist: (id: number) => void;
    removeFromWishlist: (id: number) => void;
    clearWishlist: () => void;
    isInWishlist: (id: number) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
    persist<WishlistState>(
        (set, get) => ({
            wishlist: [],

            addToWishlist: (id: number) => {
                set((state) => {
                    const itemExists = get().isInWishlist(id);

                    if (itemExists) {
                        return state;
                    } else {
                        return {
                            wishlist: [...state.wishlist, { id }],
                        };
                    }
                });
            },

            removeFromWishlist: (id: number) => {
                set((state) => ({
                    wishlist: state.wishlist.filter((item) => item.id !== id),
                }));
            },

            clearWishlist: () => set({ wishlist: [] }),

            isInWishlist: (id: number) => {
                return get().wishlist.some((item) => item.id === id);
            },
        }),
        { name: "wishlist-state" }
    )
);
