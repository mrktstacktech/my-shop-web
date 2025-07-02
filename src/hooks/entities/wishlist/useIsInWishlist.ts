import { store } from "@/store/store";
import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export function useIsInWishlist(productId: string): boolean {
    const currentWishlistItems = useSelector((state: RootState) => state.root.cart.currentWishlistItems);
    const currentWishlistId = store.getState().root.cart.currentWishlistId;
    const wishlistItems = useSelector((state: RootState) => state.root.cart.currentWishlistItems);

    console.log("useIsInWishlist", wishlistItems);


    if (!currentWishlistItems || !currentWishlistId) {
        return false;
    }

    return currentWishlistItems.some((item) => item.id === productId && item.quantity !== 0);
}