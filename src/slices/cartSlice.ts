import { createSlice } from '@reduxjs/toolkit';
import type { ProductsInCartEntity } from '@/services/domain/entities';

export interface CartState {
    currentCartId: string;
    currentCartItems: ProductsInCartEntity[];
    currentWishlistId: string;
    currentWishlistItems: ProductsInCartEntity[];
    totalItems: number;
    totalWishlistItems: number;
}

const initialState: CartState = {
    currentCartId: '',
    currentCartItems: [],
    currentWishlistId: '',
    currentWishlistItems: [],
    totalItems: 0,
    totalWishlistItems: 0
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCurrentCartId: (state, action) => {
            state.currentCartId = action.payload;
        },
        setTotalItems: (state, action) => {
            state.totalItems = action.payload;
        },
        setCurrentWishListId: (state, action) => {
            state.currentWishlistId = action.payload;
        },
        setTotalWishListItems: (state, action) => {
            state.totalWishlistItems = action.payload;
        },
        setCurrentCartItems: (state, action) => {
            state.currentCartItems = action.payload;
            state.totalItems = state.currentCartItems.reduce((sum, item) => sum + (item.quantity ?? 1), 0);
        },
        setCurrentWishlistItems: (state, action) => {
            state.currentWishlistItems = action.payload;
        },
        // TODO: Only use if save state in local
        addCurrentCartItem: (state, action) => {
            const newItem = action.payload;
            if (Array.isArray(newItem)) {
                const cartItems = state.currentCartItems ?? [];

                newItem.forEach(item => {
                    const existingIndex = cartItems.findIndex(cartItem => cartItem.id === item.id);

                    if (existingIndex !== -1) {
                        cartItems[existingIndex] = item;
                    } else {
                        cartItems.push(item);
                    }
                });

                state.currentCartItems = cartItems;
                state.totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

                return;
            }
        },
        moveAllItemsToCart: (state, action) => {
            const newItem = action.payload;

            if (Array.isArray(newItem)) {
                const cartItems = state.currentCartItems ?? [];

                newItem.forEach(item => {
                    const existingIndex = cartItems.findIndex(cartItem => cartItem.id === item.id);

                    if (existingIndex !== -1) {
                        cartItems[existingIndex].quantity += 1;
                        cartItems[existingIndex].total = cartItems[existingIndex].quantity * cartItems[existingIndex].price;
                    } else {
                        const newItemWithQuantity = { ...item, quantity: 1, total: item.price };
                        cartItems.push(newItemWithQuantity);
                    }
                });

                state.currentCartItems = cartItems;
                state.totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
                state.currentWishlistItems = [];
                state.totalWishlistItems = 0;
                return;
            }
        },
        moveSingleItemToCart: (state, action) => {
            const newItem = action.payload;
            const cartItems = state.currentCartItems ?? [];
            const existingIndex = cartItems.findIndex(cartItem => cartItem.id === newItem.id);
            if (existingIndex !== -1) {
                cartItems[existingIndex].quantity += 1;
                cartItems[existingIndex].total = cartItems[existingIndex].quantity * cartItems[existingIndex].price;
            } else {
                const newItemWithQuantity = { ...newItem, quantity: 1, total: newItem.price };
                cartItems.push(newItemWithQuantity);
            }
            state.currentCartItems = cartItems;
            state.totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
            state.currentWishlistItems = state.currentWishlistItems?.filter(item => item.id !== newItem.id) || [];
            state.totalWishlistItems = state.currentWishlistItems?.length || 0;
        },
        removeCurrentCartItem: (state, action) => {
            if (state.currentCartItems) {
                state.currentCartItems = state.currentCartItems.filter(item => item !== action.payload);
            }
        },
        addCurrentWishlistItem: (state, action) => {
            if (!state.currentWishlistItems) {
                state.currentWishlistItems = [];
            }
            state.currentWishlistItems.push(action.payload);
        },
        removeCurrentWishlistItem: (state, action) => {
            if (state.currentWishlistItems) {
                state.currentWishlistItems = state.currentWishlistItems.filter(item => item !== action.payload);
            }
        },
        clearCart: (state) => {
            state.currentCartItems = [];
            state.totalItems = 0;
        }
    }
});

export const { setCurrentCartId, setTotalItems } = cartSlice.actions;