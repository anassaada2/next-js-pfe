import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../features/products/productSlice";
import toggleSlice from "../features/toggles/toggleSlice";

export const store = configureStore({
    reducer: {
        product: productSlice,
        toggle: toggleSlice,
    },
});
