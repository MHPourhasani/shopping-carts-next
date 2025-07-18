import { ICart } from "@/interfaces/general";
import { createSlice } from "@reduxjs/toolkit";

interface initialState {
    carts: ICart[];
}

const initialState: initialState = {
    carts: [],
};

export const cartsSlice = createSlice({
    name: "carts",
    initialState,
    reducers: {
        addToCarts: (state, action) => {
            state.carts.push(action.payload);
        },
        setCarts: (state, action) => {
            state.carts = action.payload;
        },
        removeAllCarts: (state) => {
            state.carts = [];
        },
    },
});

export const { addToCarts, setCarts, removeAllCarts } = cartsSlice.actions;

export default cartsSlice.reducer;
