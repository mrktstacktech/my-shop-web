import { cartSlice } from "@slices/index";
import { combineSlices, configureStore } from "@reduxjs/toolkit";

const rootReducer = combineSlices({
    cart: cartSlice.reducer,
});

export const store = configureStore({
    reducer: rootReducer
});
