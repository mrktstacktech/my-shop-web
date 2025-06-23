import { useState, useCallback, useEffect } from 'react';
import { CartRepository } from '@services/repositories';
import { useSelector } from 'react-redux';
import { useAuthContext } from '@/context/auth-hook';
import { store } from '@/store/store'; // Adjust the import path based on your project structure
import { cartSlice } from '@/slices';
import type { RootState } from '@/store/store';

export function useGetCurrentCart() {
    const [cartId, setCartId] = useState<string>();
    const [totalQuantity, setTotalQuantity] = useState<number>(0);
    const { user } = useAuthContext();
    // const dispatch = useDispatch();
    const currentCartId = useSelector((state: RootState) => state.root.cart.currentCartId); 

    const fetchCurrentCartInfor = useCallback(() => {
        if (!user) {
            console.warn("User is not authenticated, cannot fetch cart information.");
            return;
        }
        if (!user.id) {
            console.warn("User ID is undefined, cannot fetch cart information.");
            return;
        }
        const response = new CartRepository().getCurrentCartInfor(user.id);
        response.then(cart => {
            setCartId(cart.id);
            setTotalQuantity(cart.totalQuantity);
            store.dispatch(cartSlice.actions.setCurrentCartId(cart.id));
            store.dispatch(cartSlice.actions.setTotalItems(cart.totalQuantity));
        }).catch(error => {
            console.error("Error fetching current cart information:", error);
        });
    }, [user]);

    useEffect(() => {
        if (!currentCartId) {
            fetchCurrentCartInfor();
        }
    }, [fetchCurrentCartInfor, currentCartId]);

    return {
        cartId,
        totalQuantity
    };
}