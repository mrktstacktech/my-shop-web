import { createSlice } from '@reduxjs/toolkit';
// TODO: save list carts & wishlists to state
export interface CartState {
    currentCartId: string;
    currentWishlistId: string;
    totalItems: number;
    totalWishlistItems?: number;
}

const initialState: CartState = {
    currentCartId: '',
    currentWishlistId: '',
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
        }
    }
});

export const { setCurrentCartId, setTotalItems } = cartSlice.actions;