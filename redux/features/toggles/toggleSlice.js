import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isSidebarActive: false,
};

export const toggleSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.isSidebarActive = !state.isSidebarActive;
        },
    },
});

export const { toggleSidebar } = toggleSlice.actions;
export default toggleSlice.reducer;
