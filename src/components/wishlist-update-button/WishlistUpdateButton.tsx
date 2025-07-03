import { HeartIcon } from "@/constants";
import { useAddToWishlist, useRemoveFromWishlist, useIsInWishlist } from "@/hooks";
import { useCallback } from "react";
import './style.scss';

export function WishlistUpdateButton({
    productId,
    className = ''
}: {
    productId: string;
    className?: string;
}) {
    const isInWishlist = useIsInWishlist(productId);
    const { addToWishlist } = useAddToWishlist();
    const { removeFromWishlist } = useRemoveFromWishlist();

    const handleWishlistToggle = useCallback(() => {
        if (isInWishlist) {
            removeFromWishlist(productId);
        } else {
            addToWishlist(productId);
        }
    }, [isInWishlist, productId, addToWishlist, removeFromWishlist]);

    return (
        <button onClick={(e) => {
            e.preventDefault();
            handleWishlistToggle();
        }} className={`wishlist-button ${isInWishlist ? 'wishlist-button--exists' : 'wishlist-button--not-exists'} ${className}`}>
            {HeartIcon}
        </button>
    )
}