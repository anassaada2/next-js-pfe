import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
};

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        addProduct: (state, { payload }) => {
            const isExist = state.products.some(
                (product) => product.id === payload.id
            );

            if (isExist) {
                state.products = state.products.map((product) =>
                    product.id === payload.id
                        ? { ...product, qty: product.qty + 1 }
                        : product
                );
                return;
            }

            if (payload.qty) {
                state.products = [...state.products, { ...payload }];
                return;
            }

            state.products = [...state.products, { ...payload, qty: 1 }];
        },
        removeProduct: (state, { payload }) => {
            state.products = state.products.filter(
                (product) => product.id !== payload
            );
        },
        incProduct: (state, { payload }) => {
            state.products = state.products.map((product) =>
                product.id === payload
                    ? { ...product, qty: product.qty + 1 }
                    : product
            );
        },
        decProduct: (state, { payload }) => {
            state.products = state.products.map((product) =>
                product.id === payload
                    ? { ...product, qty: product.qty - 1 }
                    : product
            );
        },
    },
});

export const { addProduct, removeProduct, incProduct, decProduct } =
    productSlice.actions;
export default productSlice.reducer;
