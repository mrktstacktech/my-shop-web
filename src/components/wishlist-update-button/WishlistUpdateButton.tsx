import { HeartIcon } from "@/constants";
import { useAddToWishlist, useRemoveFromWishlist, useIsInWishlist } from "@/hooks";
import { useState, useCallback } from "react";
import './style.scss';

export function WishlistUpdateButton({
    productId,
    className = ''
}: {
    productId: string;
    className?: string;
}) {
    const [isInWishlist, setIsInWishlist] = useState(useIsInWishlist(productId));

    if (isInWishlist) {
        console.log(`Product ${productId} is already in the wishlist.`);
    }
    else {
        console.log(`Product ${productId} is not in the wishlist.`);
    }

    const { addToWishlist } = useAddToWishlist();
    const { removeFromWishlist } = useRemoveFromWishlist();

    const handleWishlistToggle = useCallback(async () => {
        setIsInWishlist(!isInWishlist);

        if (isInWishlist) {
            await removeFromWishlist(productId);
        } else {
            await addToWishlist(productId);
        }
    }, [isInWishlist, productId, addToWishlist, removeFromWishlist]);

    return (
        <button onClick={() => handleWishlistToggle()} className={`${isInWishlist ? 'wishlist-button--exists' : 'wishlist-button--not-exists'} ${className}`}>
            {HeartIcon}
        </button>
    )
}