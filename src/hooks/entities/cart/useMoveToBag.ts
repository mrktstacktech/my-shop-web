import { useCallback } from 'react';
import { store } from '@/store/store';
import type { ProductsInCartEntity } from '@/services/domain/entities';

interface MoveToBagHook {
    moveToBag: () => void;
}

export function useMoveToBag(items: ProductsInCartEntity[] = []): MoveToBagHook {
    const moveToBag = useCallback(() => {
        if (items.length === 0) {
            alert("No items to move to bag.");
            return;
        }
        store.dispatch({ type: 'cart/moveAllItemsToCart', payload: items });
    }, [items]);

    return { moveToBag };
}