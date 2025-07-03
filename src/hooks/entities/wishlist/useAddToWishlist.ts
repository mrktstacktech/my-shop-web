import { useState, useCallback } from 'react';
import { store } from '@/store/store';
import type { CartEntity } from '@services/domain/entities';
import { WishlistRepository } from '@services/repositories';

export function useAddToWishlist() {
    const [loading, setLoading] = useState(false);
    //TODO : useSelector instead of store.getState()
    // This will allow the component to re-render when the state changes
    const currentWishlistId = store.getState().root.cart.currentWishlistId;

    const addToWishlist = useCallback(async (productId: string) => {
        setLoading(true);
        try {
            const wishlistRepo = new WishlistRepository();
            const updatedCart: CartEntity = await wishlistRepo.addToWishlist(currentWishlistId, productId);
            // TODO: use useDispatch instead of store.dispatch
            store.dispatch({ type: 'cart/setCurrentWishlistItems', payload: updatedCart.products });
            store.dispatch({ type: 'cart/setTotalWishListItems', payload: updatedCart.totalProducts });
        } catch (error) {
            console.error("Error adding to wishlist:", error);
        } finally {
            setLoading(false);
        }
    }, [currentWishlistId]);

    return { loading, addToWishlist };
}