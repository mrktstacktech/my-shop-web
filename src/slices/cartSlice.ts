import { createSlice } from '@reduxjs/toolkit';

interface CartState {
    currentCartId: string;
    totalItems: number;
}

const initialState: CartState = {
    currentCartId: '',
    totalItems: 0,
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
        }
    },
});

export const {setCurrentCartId, setTotalItems} = cartSlice.actions;