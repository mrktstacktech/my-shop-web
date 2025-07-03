import { useState, useCallback } from 'react';
import { store } from '@/store/store';
import type { CartEntity } from '@services/domain/entities';
import { WishlistRepository } from '@services/repositories';

export function useRemoveFromWishlist() {
    const [loading, setLoading] = useState(false);
    //TODO : useSelector instead of store.getState()
    // This will allow the component to re-render when the state changes
    const currentWishlistId = store.getState().root.cart.currentWishlistId;

    const removeFromWishlist = useCallback(async (productId: string) => {
        setLoading(true);
        try {
            const wishlistRepo = new WishlistRepository();
            const updatedCart: CartEntity = await wishlistRepo.removeFromWishlist(currentWishlistId, productId);
            const products = (updatedCart.products || []).filter(product => product.quantity > 0);
            // TODO: use useDispatch instead of store.dispatch
            store.dispatch({
                type: 'cart/setCurrentWishlistItems', payload: products
            });
            store.dispatch({ type: 'cart/setTotalWishListItems', payload: products.length });
        } catch (error) {
            console.error("Error removing from wishlist:", error);
        } finally {
            setLoading(false);
        }
    }, [currentWishlistId]);

    return { loading, removeFromWishlist };
}