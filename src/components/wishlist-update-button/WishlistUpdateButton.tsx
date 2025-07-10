import { HeartIcon } from "@/constants";
import { useAddToWishlist, useRemoveFromWishlist, useIsInWishlist } from "@/hooks";
import { useCallback } from "react";
import './style.scss';
import { useAuthContext } from "@/context/auth-hook";
import { useNavigate, useLocation } from "react-router-dom";

export function WishlistUpdateButton({
    productId,
    className = ''
}: {
    productId: string;
    className?: string;
}) {
    const {isInWishlist} = useIsInWishlist(productId);
    const { addToWishlist } = useAddToWishlist();
    const { removeFromWishlist } = useRemoveFromWishlist();
    const { isAuthenticated } = useAuthContext();
    const navigate = useNavigate();
    const location = useLocation();

    const handleWishlistToggle = useCallback(() => {
        if (!isAuthenticated) {
            navigate('/login', {
                state: { from: location },
                replace: true
            });
            return;
        }
        if (isInWishlist) {
            removeFromWishlist(productId);
        } else {
            addToWishlist(productId);
        }
    }, [isInWishlist, productId, addToWishlist, removeFromWishlist, isAuthenticated, navigate]);

    return (
        <button onClick={(e) => {
            e.preventDefault();
            handleWishlistToggle();
        }} className={`wishlist-button ${isInWishlist ? 'wishlist-button--exists' : 'wishlist-button--not-exists'} ${className}`}>
            {HeartIcon}
        </button>
    )
}