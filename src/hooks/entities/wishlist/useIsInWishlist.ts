import type { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export function useIsInWishlist(productId: string): { isInWishlist: boolean } {
    const [isInWishlist, setIsInWishlist] = useState<boolean>(false);
    const currentWishlistItems = useSelector((state: RootState) => state.root.cart.currentWishlistItems);
    const currentWishlistId = useSelector((state: RootState) => state.root.cart.currentWishlistId);

    useEffect(() => {
        const checkWishlist = () => {
            const isInWishlist = currentWishlistItems.some((item) => item.id === productId && item.quantity !== 0);
            setIsInWishlist(isInWishlist);
        };

        checkWishlist();
    }, [currentWishlistItems, productId]);

    useEffect(() => {
        if (!currentWishlistId || currentWishlistItems.length === 0) {
            setIsInWishlist(false);
        }
    }, [currentWishlistId, currentWishlistItems]);

    return { isInWishlist };
}