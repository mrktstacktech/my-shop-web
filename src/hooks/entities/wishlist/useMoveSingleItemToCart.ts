import { useState, useCallback } from 'react';
import { store } from '@/store/store';
import type { ProductsInCartEntity } from '@/services/domain/entities';

export function useMoveSingleItemToCart(items: ProductsInCartEntity) {
    const [loading, setLoading] = useState(false);

    const moveSingleItem = useCallback(() => {
        if (!items) {
            alert("No item to move to bag.");
            return;
        }
        setLoading(true);
        store.dispatch({ type: 'cart/moveSingleItemToCart', payload: items });
        setLoading(false);
    }, [items]);

    return { loading, moveSingleItem };
}